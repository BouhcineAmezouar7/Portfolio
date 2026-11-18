import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderContactEmail(name: string, email: string, subject: string, message: string) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <title>New portfolio message</title>
</head>
<body style="margin:0;background:#070707;color:#f2efe7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#070707">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111110"
          style="max-width:600px;border:1px solid #37332f;border-top:4px solid #ff3b1f;color:#f2efe7;">
          <tr>
            <td style="padding:28px 24px;border-bottom:1px solid #37332f;">
              <p style="margin:0 0 12px;color:#ff3b1f;font:12px 'Courier New',monospace;letter-spacing:2px;">PORTFOLIO CONTACT</p>
              <h1 style="margin:0;font-size:32px;line-height:1.1;font-weight:900;letter-spacing:-1px;">NEW MESSAGE<span style="color:#ff3b1f;">.</span></h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;border-bottom:1px solid #37332f;overflow-wrap:anywhere;word-wrap:break-word;">
              <p style="margin:0 0 6px;color:#aaa69e;font:12px 'Courier New',monospace;letter-spacing:2px;">FROM</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.5;">${escapeHtml(name)}<br><span style="color:#aaa69e;">${escapeHtml(email)}</span></p>
              <p style="margin:0 0 6px;color:#aaa69e;font:12px 'Courier New',monospace;letter-spacing:2px;">SUBJECT</p>
              <p style="margin:0;font-size:18px;line-height:1.4;font-weight:bold;">${escapeHtml(subject)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;overflow-wrap:anywhere;word-wrap:break-word;">
              <h2 style="margin:0 0 10px;color:#ff3b1f;font:12px 'Courier New',monospace;letter-spacing:2px;">MESSAGE</h2>
              <p style="margin:0;font-size:16px;line-height:1.65;">${escapeHtml(message).replace(/\r\n?|\n/g, "<br>")}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const { name, email, subject, message, website } = body ?? {};

    if (
      website ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !subject.trim() ||
      !message.trim() ||
      name.length > 120 ||
      subject.length > 120 ||
      email.length > 254 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Please enter valid contact details." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    const to = process.env.CONTACT_EMAIL?.trim();
    const from = process.env.RESEND_FROM_EMAIL?.trim();
    if (!apiKey || !to || !from) {
      console.error("Missing Resend environment variables");
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email.trim(),
      subject: `Portfolio: ${subject.trim().replace(/[\r\n]/g, " ")}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${subject.trim()}\n\nMessage:\n${message.trim()}`,
      html: renderContactEmail(name.trim(), email.trim(), subject.trim(), message.trim()),
    });

    if (error || !data?.id) {
      console.error("Resend send failed:", error);
      return NextResponse.json({ error: "Message could not be sent. Please try again." }, { status: 502 });
    }
    console.info("Resend accepted contact email:", data.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Message could not be sent. Please try again." }, { status: 500 });
  }
}
