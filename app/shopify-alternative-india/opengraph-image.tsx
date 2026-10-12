import { pageBySlug } from "@/content/pages";
import { ogSize, renderOg } from "@/lib/og";

const page = pageBySlug("shopify-alternative-india")!;
export const size = ogSize;
export const contentType = "image/png";
export const alt = page.name;

export default function Image() {
  return renderOg({ kicker: `Teamy · ${page.name}`, title: page.h1 });
}
