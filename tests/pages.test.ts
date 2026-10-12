import { describe, expect, it } from "vitest";
import { pages, pageBySlug, wordCount } from "../content/pages";
import { siteConfig } from "../content/site";

describe("service & landing pages", () => {
  for (const p of pages) {
    describe(p.path, () => {
      it("title ≤ 60 and description ≤ 155 characters", () => {
        expect(p.title.length, p.title).toBeLessThanOrEqual(60);
        expect(p.description.length, p.description).toBeLessThanOrEqual(155);
      });
      it("600–900 words of copy", () => {
        const n = wordCount(p);
        expect(n, `${n} words`).toBeGreaterThanOrEqual(600);
        expect(n, `${n} words`).toBeLessThanOrEqual(900);
      });
      it("links only to pages that exist, and shows a real portfolio store", () => {
        for (const r of p.related) expect(pageBySlug(r), r).toBeDefined();
        expect(siteConfig.portfolio.some((s) => s.name === p.portfolio)).toBe(true);
      });
      it("contains no placeholders", () => {
        expect(JSON.stringify(p)).not.toContain("TODO");
      });
    });
  }
  it("titles and descriptions are unique", () => {
    expect(new Set(pages.map((p) => p.title)).size).toBe(pages.length);
    expect(new Set(pages.map((p) => p.description)).size).toBe(pages.length);
  });
  it("every home bento tile links to a service page", () => {
    for (const s of siteConfig.services) expect(pageBySlug(s.slug), s.slug).toBeDefined();
  });
});
