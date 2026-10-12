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

/** Opens WhatsApp: same tab on phones (hands off to the app), new tab on desktop (keeps the site open). */
export function openWhatsApp(url: string) {
  const phone = window.matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (phone) window.location.href = url;
  else window.open(url, "_blank", "noopener,noreferrer");
}
