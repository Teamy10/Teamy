import { siteConfig } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${siteConfig.brand}: ecommerce websites and WhatsApp AI agents for D2C brands`;
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return renderOg({ kicker: siteConfig.hero.eyebrow, title: siteConfig.hero.lines.map((l) => l.text).join(" ") });
}
