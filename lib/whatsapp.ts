import { siteConfig } from "@/site.config";

export function whatsappLink(brand?: string, message?: "bookCall"): string {
  const { whatsappMessages, contact } = siteConfig;
  const text = message
    ? whatsappMessages[message]
    : brand?.trim()
    ? whatsappMessages.withBrand.replace("{brand}", brand.trim())
    : whatsappMessages.default;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
