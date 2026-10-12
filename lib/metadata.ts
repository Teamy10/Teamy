import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/**
 * Per-page metadata: unique title/description, canonical on the primary domain, OG + Twitter.
 * Pages with their own opengraph-image file get it automatically; others pass `sharedImage` to reuse
 * the home card (a page-level `openGraph` otherwise drops the inherited image).
 */
export function pageMetadata({
  title,
  description,
  path,
  sharedImage = false,
}: {
  title: string;
  description: string;
  path: string;
  sharedImage?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: path,
      siteName: siteConfig.brand,
      title,
      description,
      ...(sharedImage && { images: "/opengraph-image" }),
    },
    twitter: { card: "summary_large_image", title, description, ...(sharedImage && { images: "/twitter-image" }) },
  };
}
