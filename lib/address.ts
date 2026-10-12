import { isFilled, siteConfig } from "@/content/site";

/**
 * The one-line address used everywhere (footer, contact, local page, legal pages), so the NAP stays
 * identical, e.g. "Mehrauli, New Delhi 110030, India". The region is skipped when the city already names it.
 */
export function addressLine() {
  const a = siteConfig.contact.address;
  const city = isFilled(a.postalCode) ? `${a.locality} ${a.postalCode}` : a.locality;
  const region = a.locality.includes(a.region) ? null : a.region;
  return [isFilled(a.street) ? a.street : null, city, region, a.countryName].filter(Boolean).join(", ");
}
