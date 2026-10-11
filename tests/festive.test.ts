import { describe, expect, it } from "vitest";
import { DEFAULT_TOKENS, FESTIVALS, type Festival } from "../config/festive";
import { contrast, istDate, resolveFestival, resolveThemeId, themeBootScript, themeCss } from "../lib/festive";

/** A moment given as IST wall-clock time ("2026-10-11T00:00:00") → Date. IST is UTC+05:30, no DST. */
const ist = (wall: string) => new Date(`${wall}+05:30`);

describe("istDate", () => {
  it("uses India time, not UTC", () => {
    // 18:30 UTC on 10 Oct is already midnight 11 Oct in India.
    expect(istDate(new Date("2026-10-10T18:30:00Z"))).toBe("2026-10-11");
    expect(istDate(new Date("2026-10-10T18:29:59Z"))).toBe("2026-10-10");
  });
});

describe("resolveFestival — Navratri (2026-10-11 → 2026-10-20)", () => {
  it("is off the day before", () => {
    expect(resolveThemeId(ist("2026-10-10T23:59:59"))).toBe("default");
  });
  it("starts at midnight IST on the first day", () => {
    expect(resolveThemeId(ist("2026-10-11T00:00:00"))).toBe("navratri");
  });
  it("is still on at the last minute of the last day", () => {
    expect(resolveThemeId(ist("2026-10-20T23:59:59"))).toBe("navratri");
  });
  it("is off the day after", () => {
    expect(resolveThemeId(ist("2026-10-21T00:00:00"))).toBe("default");
  });
  it("timezone edge: same UTC day, different IST day", () => {
    // 2026-10-20T18:29Z is 23:59 IST on the 20th (on); 18:30Z is 00:00 IST on the 21st (off).
    expect(resolveThemeId(new Date("2026-10-20T18:29:00Z"))).toBe("navratri");
    expect(resolveThemeId(new Date("2026-10-20T18:30:00Z"))).toBe("default");
  });
});

describe("resolveFestival — Diwali (2026-11-06 → 2026-11-11)", () => {
  it("first day, last day, day after", () => {
    expect(resolveThemeId(ist("2026-11-05T23:59:59"))).toBe("default");
    expect(resolveThemeId(ist("2026-11-06T00:00:00"))).toBe("diwali");
    expect(resolveThemeId(ist("2026-11-11T23:59:59"))).toBe("diwali");
    expect(resolveThemeId(ist("2026-11-12T00:00:00"))).toBe("default");
  });
  it("default between festivals", () => {
    expect(resolveThemeId(ist("2026-10-28T12:00:00"))).toBe("default");
  });
});

describe("fallbacks", () => {
  it("missing or empty config → default", () => {
    expect(resolveFestival(ist("2026-10-12T12:00:00"), null)).toBeNull();
    expect(resolveThemeId(ist("2026-10-12T12:00:00"), [])).toBe("default");
  });
  it("skips malformed entries", () => {
    const bad = [
      { ...FESTIVALS[0], start: "11/10/2026" },
      { ...FESTIVALS[0], id: "Bad Id" },
      { ...FESTIVALS[0], start: "2026-10-20", end: "2026-10-11" },
    ] as Festival[];
    expect(resolveFestival(ist("2026-10-12T12:00:00"), bad)).toBeNull();
  });
  it("first matching festival wins when ranges overlap", () => {
    const overlap = [FESTIVALS[0], { ...FESTIVALS[1], start: "2026-10-01", end: "2026-12-31" }];
    expect(resolveThemeId(ist("2026-10-12T12:00:00"), overlap)).toBe("navratri");
  });
});

describe("generated CSS and boot script", () => {
  it("emits a rule per festival plus the default root", () => {
    const css = themeCss();
    expect(css).toContain(":root{");
    for (const f of FESTIVALS) expect(css).toContain(`:root[data-theme="${f.id}"]{`);
    expect(css).toContain("--accent-rgb:");
  });
  it("only includes the ?theme= preview when allowed", () => {
    expect(themeBootScript(FESTIVALS, false)).not.toContain("URLSearchParams");
    expect(themeBootScript(FESTIVALS, true)).toContain("URLSearchParams");
  });
});

describe("theme tokens meet WCAG AA", () => {
  const themes = [{ id: "default", tokens: DEFAULT_TOKENS }, ...FESTIVALS];
  for (const { id, tokens: t } of themes) {
    it(`${id}: every text colour on every surface ≥ 4.5:1`, () => {
      for (const fg of [t.text, t.text2, t.text3]) {
        for (const bg of [t.bg, t.surface, t.surface2]) {
          expect(contrast(fg, bg), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
        }
      }
    });
    it(`${id}: CTA text on accent ≥ 4.5:1`, () => {
      expect(contrast(t.accentInk, t.accent)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(t.accentInk, t.accentHover)).toBeGreaterThanOrEqual(4.5);
    });
  }
});
