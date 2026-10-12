import { describe, expect, it } from "vitest";
import { siteConfig } from "../content/site";
import { draftFor } from "../content/testimonials";
import { reviewLink, reviewMessage } from "../lib/whatsapp";

describe("client reviews", () => {
  it("the WhatsApp message carries every field and the client's consent", () => {
    const m = reviewMessage({ rating: 4, name: "Asha Verma", role: "Founder", brand: "Kesar Threads", review: "Quick, clear and kind." });
    expect(m).toContain("Rating: 4/5 ★★★★");
    expect(m).not.toContain("★★★★★");
    expect(m).toContain("Name: Asha Verma");
    expect(m).toContain("Role: Founder");
    expect(m).toContain("Brand: Kesar Threads");
    expect(m).toContain('Review: "Quick, clear and kind."');
    expect(m).toMatch(/I agree that Teamy can show this review/);
  });
  it("per-client links fill in brand and name, and skip empty ones", () => {
    expect(reviewLink()).toBe(`${siteConfig.url}/review`);
    expect(reviewLink({ brand: "Gems for Luck", name: "Anuj Agarwal" })).toBe(`${siteConfig.url}/review?brand=Gems+for+Luck&name=Anuj+Agarwal`);
    expect(reviewLink({ brand: "Zoff", name: undefined })).toBe(`${siteConfig.url}/review?brand=Zoff`);
  });
});

describe("review drafts", () => {
  it("a brand's personal link starts from its draft, whatever the case", () => {
    expect(draftFor("zoff")?.company).toBe("Zoff");
    expect(draftFor("Gems for Luck")?.name).toBe("Anuj Agarwal");
  });
  it("never for approved reviews, missing quotes or unknown brands", () => {
    expect(draftFor("Ganges")).toBeUndefined();
    expect(draftFor("TODO: company")).toBeUndefined();
    expect(draftFor("Nobody")).toBeUndefined();
    expect(draftFor("")).toBeUndefined();
  });
});
