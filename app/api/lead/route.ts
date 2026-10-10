import { NextResponse } from "next/server";
import { PLAN_CHOICES, normaliseIndianMobile, normaliseInstagram, type LeadPayload } from "@/lib/leads";

/**
 * Receives leads from the contact form and forwards them to LEAD_WEBHOOK_URL
 * (Google Apps Script, Zapier, Make, Formspree, Slack…). See README.
 */
export async function POST(req: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the honeypot. Pretend it worked.
  if (body.company) return NextResponse.json({ ok: true });

  const whatsapp = normaliseIndianMobile(String(body.whatsapp ?? ""));
  const brand = String(body.brand ?? "").trim().slice(0, 120);
  if (!whatsapp || !brand) {
    return NextResponse.json({ ok: false, error: "Brand and a valid WhatsApp number are required" }, { status: 422 });
  }

  const lead = {
    source: "form",
    name: String(body.name ?? "").trim().slice(0, 120) || undefined,
    brand,
    whatsapp: `+91${whatsapp}`,
    instagram: body.instagram ? normaliseInstagram(String(body.instagram)) ?? undefined : undefined,
    plan: PLAN_CHOICES.find((p) => p === body.plan),
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[lead] LEAD_WEBHOOK_URL is not set. Lead NOT saved:", lead);
      return NextResponse.json({ ok: false, error: "Lead capture is not configured" }, { status: 503 });
    }
    console.info("[lead] (dev, no webhook set)", lead);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[lead] Forwarding failed:", err, lead);
    return NextResponse.json({ ok: false, error: "Could not save lead" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
