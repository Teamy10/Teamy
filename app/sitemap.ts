import type { MetadataRoute } from "next";
import { pages } from "@/content/pages";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    ...pages.map((p) => ({ url: url(p.path), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...["/privacy", "/terms", "/refund-policy"].map((path) => ({ url: url(path), changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
