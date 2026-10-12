import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { siteConfig } from "@/content/site";

/** Set at build time: every deploy refreshes lastmod, so search engines re-crawl changed pages sooner. */
const built = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;
  return [
    { url: url("/"), lastModified: built, changeFrequency: "weekly", priority: 1 },
    ...pages.map((p) => ({ url: url(p.path), lastModified: built, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...["/privacy", "/terms", "/refund-policy"].map((path) => ({ url: url(path), lastModified: built, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
