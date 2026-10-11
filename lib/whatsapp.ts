import { siteConfig } from "@/content/site";

export type WhatsAppMessageKey = keyof typeof siteConfig.whatsappMessages;

/** wa.me link to Teamy's WhatsApp with a pre-filled message. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** A pre-filled message from content/site.ts, with {placeholders} filled in. */
export function whatsAppMessage(key: WhatsAppMessageKey, vars: Record<string, string> = {}): string {
  return Object.entries(vars).reduce<string>((m, [k, v]) => m.replaceAll(`{${k}}`, v), siteConfig.whatsappMessages[key]);
}

/** The contact form's message. */
export function previewRequestMessage(v: { name: string; brand: string; whatsapp: string; instagram?: string }): string {
  return [
    "Hi Teamy! I'd like a free store preview.",
    `Name: ${v.name}`,
    `Brand: ${v.brand}`,
    `WhatsApp: +91${v.whatsapp}`,
    ...(v.instagram ? [`Instagram: @${v.instagram}`] : []),
  ].join("\n");
}

/** Opens WhatsApp: same tab on phones (hands off to the app), new tab on desktop (keeps the site open). */
export function openWhatsApp(url: string) {
  const phone = window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (phone) window.location.href = url;
  else window.open(url, "_blank", "noopener,noreferrer");
}
