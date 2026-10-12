import { siteConfig } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${siteConfig.brand}: ecommerce website development for India's D2C brands`;
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return renderOg({ kicker: "Web studio · New Delhi, India", title: "The web team behind India's D2C brands." });
}
