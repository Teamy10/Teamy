import { describe, expect, it } from "vitest";
import { siteConfig } from "../content/site";
import { auditRequestMessage } from "../lib/whatsapp";

describe("free store audit", () => {
  it("writes every field on one line, in the kit's format", () => {
    expect(auditRequestMessage({ url: "zofffoods.com", name: "Asha", number: "+91 98765 43210", platform: "Shopify", orders: "100–1,000" })).toBe(
      "Hi Teamy! I'd like a free store audit. Store: zofffoods.com · Name: Asha · WhatsApp: +91 98765 43210 · Platform: Shopify · Orders/month: 100–1,000",
    );
  });
  it("leaves out the optional fields (and the store, for brands with no store yet) when empty", () => {
    expect(auditRequestMessage({ url: "", name: "Asha", number: "9876543210", platform: "No store yet", orders: "" })).toBe(
      "Hi Teamy! I'd like a free store audit. Name: Asha · WhatsApp: 9876543210 · Platform: No store yet",
    );
  });
  it("the home page FAQ answers the AI agent questions, after the existing ones", () => {
    const qs = siteConfig.faqs.map((f) => f.q);
    expect(qs.slice(-5)).toEqual([
      "What does the WhatsApp AI agent actually do?",
      "Do I need to rebuild my store to add the AI agent?",
      "Will the AI say something wrong to my customers?",
      "What does WhatsApp charge?",
      "How do payments work?",
    ]);
  });
});
