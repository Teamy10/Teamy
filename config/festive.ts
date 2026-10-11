/**
 * Festive themes — the ONE place to edit festival dates, colours, motifs and copy.
 *
 * How it works
 *  - Dates are calendar days in India time (Asia/Kolkata), inclusive on both ends.
 *  - The first festival whose range contains "today in IST" wins. Otherwise the default theme applies.
 *  - Each theme only changes colour tokens and motifs; layout never changes.
 *  - Preview any theme locally with `?theme=navratri` / `?theme=diwali` / `?theme=default`
 *    (works in `npm run dev` only; the code is stripped from production builds).
 *
 * Contrast: every text token (text, text2, text3) is checked against bg, surface and surface2,
 * and accentInk against accent, to pass WCAG AA (≥ 4.5:1). Keep it that way when editing.
 */

export type ThemeTokens = {
  /** Page base (near-black). */
  bg: string;
  /** Raised surface, level 1 (cards). */
  surface: string;
  /** Raised surface, level 2 (cards on cards, inputs). */
  surface2: string;
  /** Primary text. */
  text: string;
  /** Secondary text. */
  text2: string;
  /** Tertiary text: small mono labels. */
  text3: string;
  /** The single signal colour: primary CTA, active states, tiny highlights. */
  accent: string;
  accentHover: string;
  /** Text on top of `accent`. */
  accentInk: string;
  /** Gradient stops for the one emphasised hero word (gold in festive themes). */
  heroA: string;
  heroB: string;
  /** Soft light-pool colours (used at very low opacity). */
  glowA: string;
  glowB: string;
};

export type Festival = {
  id: string;
  name: string;
  /** YYYY-MM-DD, first day (IST), inclusive. */
  start: string;
  /** YYYY-MM-DD, last day (IST), inclusive. */
  end: string;
  tokens: ThemeTokens;
  /** Decorative motif: a soft hero accent and the ornamental section dividers. */
  motif: "rangoli" | "diya";
  /** Optional one-line greeting under the hero sub-headline (keep it about DEFAULT_HERO_NOTE's length). */
  heroNote?: string;
  /** Favicon file in /public used while the festival is active. */
  favicon?: string;
};

/**
 * Hero note for the default theme. Every theme shows exactly one note in the same slot,
 * so switching themes never changes layout.
 */
export const DEFAULT_HERO_NOTE = "Free call and a free store preview before you pay anything.";

/** Premium base theme: near-black, cool neutrals, one electric lime signal. */
export const DEFAULT_TOKENS: ThemeTokens = {
  bg: "#0a0b0f",
  surface: "#0e1116",
  surface2: "#151922",
  text: "#f3f5f8",
  text2: "#a7aebb", // 8.8:1 on bg
  text3: "#7f8796", // 5.4:1 on bg, 4.8:1 on surface2
  accent: "#c8f25a",
  accentHover: "#d6f77c",
  accentInk: "#0a0b0f", // 14.6:1 on accent
  heroA: "#c8f25a",
  heroB: "#eefcc8",
  glowA: "#7c8db8", // cool slate light
  glowB: "#c8f25a",
};

export const FESTIVALS: Festival[] = [
  {
    id: "navratri",
    name: "Navratri",
    // Ghatasthapana (11 Oct) confirmed on drikpanchang.com; Vijayadashami (20 Oct) per multiple calendars.
    start: "2026-10-11",
    end: "2026-10-20",
    motif: "rangoli",
    heroNote: "Navratri is here. Launch now and be ready for the festive rush.",
    favicon: "/favicon-navratri.svg",
    tokens: {
      bg: "#12060b", // deep maroon-black
      surface: "#1a0a12",
      surface2: "#241019",
      text: "#fbf1ec",
      text2: "#ddbfb4", // 11.5:1 on bg
      text3: "#ad8f85", // 6.6:1 on bg
      accent: "#ff9f1c", // saffron
      accentHover: "#ffb347",
      accentInk: "#12060b",
      heroA: "#f5c451", // gold
      heroB: "#ffe6a3",
      glowA: "#e0218a", // rani pink
      glowB: "#f5b82e", // gold
    },
  },
  {
    id: "diwali",
    name: "Diwali",
    // Dhanteras (6 Nov) to Bhai Dooj (11 Nov), per drikpanchang.com (New Delhi).
    start: "2026-11-06",
    end: "2026-11-11",
    motif: "diya",
    heroNote: "Shubh Deepavali. Make this season's orders land on your own store.",
    favicon: "/favicon-diwali.svg",
    tokens: {
      bg: "#060918", // midnight navy
      surface: "#0b1024",
      surface2: "#121a35",
      text: "#f6f3ea",
      text2: "#cfc6ae", // 11.6:1 on bg
      text3: "#a1998a", // 6.9:1 on bg
      accent: "#f4b942", // warm gold
      accentHover: "#f7c967",
      accentInk: "#060918",
      heroA: "#f4b942",
      heroB: "#ffe7a8",
      glowA: "#ff8a3d", // diya amber
      glowB: "#ffcf6e",
    },
  },
];
