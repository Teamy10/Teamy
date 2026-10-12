import { siteConfig } from "@/content/site";
import { ogSize, renderOg } from "@/lib/og";

export const alt = `${siteConfig.brand}: online stores for D2C brands`;
export const size = ogSize;
export const contentType = "image/png";

export default function OgImage() {
  return renderOg({ kicker: "Web studio · Jaipur, India", title: "Stores that sell while you sleep." });
}
