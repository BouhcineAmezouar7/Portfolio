This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form setup

The contact API checks the form fields and a 40 KiB request-body limit, then checks Upstash Redis and verifies the Turnstile token before sending with Resend. The default limit is three attempts per IP per hour using Upstash's sliding-window algorithm. A request with valid fields and a supplied token counts toward the limit even if verification or delivery later fails. The API returns `429` with a `Retry-After` header when limited, and `503` if it cannot check Redis or Cloudflare. Neither failure sends email.

### Upstash and Vercel

1. Open the [Upstash console](https://console.upstash.com/), choose **Redis**, and create a database. Choose a primary region near the Vercel function region.
2. Open the database's **REST API** section. Copy its REST URL and standard REST token, which needs write access for rate limiting.
3. In the Vercel project, open **Settings → Environment Variables**. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Production. Add them separately to Preview if testing there. Keep the token server-side. The [Upstash Vercel integration](https://upstash.com/docs/redis/howto/vercelintegration) can also add these variables.
4. Keep your existing `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL`, and `RESEND_FROM_EMAIL`. Ensure Vercel exposes its system environment variables so the route can use the Vercel-provided client IP and production hostname.
5. Confirm the production hostname is authorized in your Cloudflare Turnstile widget. The API allows the exact hostname in `VERCEL_PROJECT_PRODUCTION_URL`. Add any extra production aliases or stable preview hostnames to both the widget and `TURNSTILE_ALLOWED_HOSTNAMES` as a comma-separated list of exact hostnames without schemes, paths, or wildcards.
6. Redeploy after saving the variables. The site key is public and is included at build time. Open the deployed contact page, verify the widget, submit a test message, and check the success toast and Resend dashboard. Resend acceptance and final inbox delivery are separate events.

Set `CONTACT_RATE_LIMIT` to a positive integer to override the default of three. Production, Preview, and local development use separate Redis namespaces. Redis keys use an HMAC of the IP rather than the raw address.

### Local testing

1. Keep your existing `.env.local` values backed up and use the names in `.env.example` for local configuration. Add the Upstash REST URL and token for a development database and keep your Resend configuration. If you want to simulate a Resend delivery without an inbox message, set the local recipient to `delivered@resend.dev`.
2. For a local-only success test, use Cloudflare's official visible test site key `1x00000000000000000000AA` and test secret `1x0000000000000000000000000000000AA`. Use a matching hostname in `TURNSTILE_ALLOWED_HOSTNAMES` if testing with a real widget configured for localhost. The official test secrets are accepted only by local `next dev`. See the [Cloudflare testing guide](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) for failure and duplicate-token cases.
3. Run `npm run dev` and open `http://localhost:3000/contact`. Verify that Send is disabled before Turnstile succeeds, there is one request while sending, and the widget resets after a response. Check the success toast, inline errors, and widget layout at desktop and mobile widths.
4. With a fresh local Redis bucket, submit four otherwise valid requests using a fresh token for each attempt. The first three can proceed to Cloudflare. The fourth returns `429` with `Retry-After`. Local development uses one loopback bucket and ignores forwarded-IP headers.

If Turnstile reports `110200`, Cloudflare does not authorize the hostname for that site key. The app's server allowlist does not change Cloudflare's widget settings. On macOS or Linux, stop the existing dev server and run this command to test locally without editing your saved credentials:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA \
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA \
npm run dev
```
