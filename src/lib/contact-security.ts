import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const maxBodyBytes = 40 * 1024;
const verificationTimeoutMs = 5000;
const testSecrets = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA",
]);

let limiter: Ratelimit | undefined;

export async function readContactBody(request: Request): Promise<
  { body: Record<string, unknown> } | { status: 400 | 413 }
> {
  const reader = request.body?.getReader();
  if (!reader) return { status: 400 };

  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let json = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      size += value.byteLength;
      if (size > maxBodyBytes) {
        void reader.cancel().catch(() => {});
        return { status: 413 };
      }
      json += decoder.decode(value, { stream: true });
    }

    const body: unknown = JSON.parse(json + decoder.decode());
    if (!body || typeof body !== "object" || Array.isArray(body)) return { status: 400 };
    return { body: body as Record<string, unknown> };
  } catch {
    void reader.cancel().catch(() => {});
    return { status: 400 };
  } finally {
    reader.releaseLock();
  }
}

function isLocalDevelopment() {
  return process.env.NODE_ENV === "development" && process.env.VERCEL !== "1";
}

export async function checkContactRateLimit(request: Request, secret: string) {
  const ip = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.trim()
    : isLocalDevelopment() ? "127.0.0.1" : undefined;

  if (!ip || !isIP(ip)) throw new Error("Trusted client IP unavailable");

  if (!limiter) {
    const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
    const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
    const max = Number(process.env.CONTACT_RATE_LIMIT ?? "3");
    if (!url || !token || !Number.isSafeInteger(max) || max < 1) {
      throw new Error("Rate limiter configuration missing or invalid");
    }

    limiter = new Ratelimit({
      redis: new Redis({ url, token, retry: false }),
      limiter: Ratelimit.slidingWindow(max, "1 h"),
      prefix: `portfolio:contact:${process.env.VERCEL_PROJECT_ID ?? "local"}:${process.env.VERCEL_ENV ?? "development"}`,
      ephemeralCache: false,
      timeout: verificationTimeoutMs,
    });
  }

  // Canonicalize IPv6 so different spellings of an address share one bucket.
  const normalized = isIP(ip) === 6 ? new URL(`http://[${ip}]`).hostname : ip;
  const identifier = createHmac("sha256", secret).update(normalized).digest("hex");
  const result = await limiter.limit(identifier);
  if (result.reason === "timeout") throw new Error("Rate limiter timed out");
  return result;
}

export async function verifyContactToken(token: string, secret: string) {
  const testSecret = testSecrets.has(secret);
  if (testSecret && !isLocalDevelopment()) throw new Error("Test secret requires local development");

  const hostnames = new Set(
    [process.env.TURNSTILE_ALLOWED_HOSTNAMES, process.env.VERCEL_PROJECT_PRODUCTION_URL]
      .join(",").split(",").map((hostname) => hostname.trim().toLowerCase()).filter(Boolean),
  );
  if (!testSecret && !hostnames.size) throw new Error("Turnstile hostnames unavailable");

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
    signal: AbortSignal.timeout(verificationTimeoutMs),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Turnstile unavailable");

  const result = await response.json() as {
    success?: boolean;
    hostname?: string;
    action?: string;
    "error-codes"?: string[];
  };
  if (
    typeof result?.success !== "boolean" ||
    result["error-codes"]?.some((code) =>
      ["internal-error", "invalid-input-secret", "missing-input-secret"].includes(code),
    )
  ) {
    throw new Error("Turnstile validation unavailable");
  }

  if (!result.success || typeof result.hostname !== "string") return false;
  if (testSecret) return result.hostname === "example.com";
  return result.action === "contact" && hostnames.has(result.hostname.toLowerCase());
}
