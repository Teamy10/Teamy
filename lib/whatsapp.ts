import { siteConfig, WHATSAPP_MESSAGE } from "@/content/site";

/** wa.me link to Teamy's WhatsApp, pre-filled with the standard message (or a given one). */
export function buildWhatsAppLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** The contact form's message: the standard opener plus the visitor's details. */
export function projectRequestMessage(v: { name: string; projectType: string; message?: string }): string {
  return [WHATSAPP_MESSAGE, "", `Name: ${v.name}`, `Project type: ${v.projectType}`, ...(v.message ? [`Message: ${v.message}`] : [])].join(
    "\n",
  );
}

/** The free store audit request, on one line. Optional fields left empty are left out. */
export function auditRequestMessage(v: { url: string; name: string; number: string; platform?: string; orders?: string }): string {
  const parts = [
    v.url && `Store: ${v.url}`,
    `Name: ${v.name}`,
    `WhatsApp: ${v.number}`,
    v.platform && `Platform: ${v.platform}`,
    v.orders && `Orders/month: ${v.orders}`,
  ].filter(Boolean);
  return `Hi Teamy! I'd like a free store audit. ${parts.join(" · ")}`;
}

/**
 * A client's review, as the WhatsApp message they send from /review: their own words, with their
 * consent written into the message itself.
 */
export function reviewMessage(v: { rating: number; name: string; role: string; brand: string; review: string }): string {
  return [
    `Review for the ${siteConfig.brand} website`,
    "",
    `Rating: ${v.rating}/5 ${"★".repeat(v.rating)}`,
    `Name: ${v.name}`,
    `Role: ${v.role}`,
    `Brand: ${v.brand}`,
    `Review: "${v.review}"`,
    "",
    `I agree that ${siteConfig.brand} can show this review, with my name, role and brand, on its website.`,
  ].join("\n");
}

/** The /review link for one client, with their brand (and name) already filled in. */
export function reviewLink(p: { brand?: string; name?: string } = {}): string {
  const query = new URLSearchParams(Object.entries(p).filter((e): e is [string, string] => !!e[1])).toString();
  return `${siteConfig.url}/review${query ? `?${query}` : ""}`;
}

/** Opens WhatsApp: same tab on phones (hands off to the app), new tab on desktop (keeps the site open). */
export function openWhatsApp(url: string) {
  const phone = window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (phone) window.location.href = url;
  else window.open(url, "_blank", "noopener,noreferrer");
}
