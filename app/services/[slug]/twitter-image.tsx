import { pageBySlug, servicePages } from "@/content/pages";
import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Teamy service";

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const page = pageBySlug((await params).slug);
  return renderOg({ kicker: page ? `Teamy · ${page.name}` : "Teamy", title: page?.h1 ?? "Online stores for D2C brands" });
}
