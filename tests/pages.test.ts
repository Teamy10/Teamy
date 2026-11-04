import { describe, expect, it } from "vitest";
import { pages, pageBySlug, wordCount } from "../content/pages";
import { projects } from "../content/projects";
import { siteConfig } from "../content/site";

// Pages whose copy was supplied word for word (docs/website-update-kit.md), so shorter than the usual range.
const fixedCopy = new Set(["whatsapp-ai-agent"]);

describe("service & landing pages", () => {
  for (const p of pages) {
    describe(p.path, () => {
      it("title ≤ 60 and description ≤ 160 characters", () => {
        expect(p.title.length, p.title).toBeLessThanOrEqual(60);
        expect(p.description.length, p.description).toBeLessThanOrEqual(160);
      });
      it("600–900 words of copy", () => {
        const n = wordCount(p);
        expect(n, `${n} words`).toBeGreaterThanOrEqual(fixedCopy.has(p.slug) ? 250 : 600);
        expect(n, `${n} words`).toBeLessThanOrEqual(900);
      });
      it("links only to pages that exist, and shows a real portfolio store", () => {
        for (const r of p.related) expect(pageBySlug(r), r).toBeDefined();
        if (p.portfolio) expect(projects.some((s) => s.name === p.portfolio)).toBe(true);
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
