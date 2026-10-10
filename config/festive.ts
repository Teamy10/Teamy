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
 * Contrast: every token pair used for text (on-night-soft on night, accent-ink on accent,
 * support on white) is checked to pass WCAG AA (≥ 4.5:1). Keep it that way when editing.
 */

export type ThemeTokens = {
  /** Dark section background. */
  night: string;
  /** Raised cards on dark. */
  night2: string;
  /** Borders on dark. */
  lineNight: string;
  /** Secondary text on dark. */
  onNightSoft: string;
  /** CTA background and highlights on dark. */
  accent: string;
  accentHover: string;
  /** Text colour on top of `accent`. */
  accentInk: string;
  /** Mid colour of the shimmering gradient text. */
  shine: string;
  /** Two decorative glow colours. */
  glowA: string;
  glowB: string;
  /** Links and highlights on light sections. */
  support: string;
  /** Light page background. */
  bg: string;
};

export type Festival = {
  id: string;
  name: string;
  /** YYYY-MM-DD, first day (IST), inclusive. */
  start: string;
  /** YYYY-MM-DD, last day (IST), inclusive. */
  end: string;
  tokens: ThemeTokens;
  /** Decorative motif shown in the hero and as section dividers. */
  motif: "rangoli" | "diya";
  /** Optional one-line greeting shown under the hero sub-headline. */
  heroNote?: string;
  /** Favicon file in /public used while the festival is active. */
  favicon?: string;
};

/**
 * Hero note for the default theme. Every theme shows exactly one note in the same slot,
 * so switching themes never changes layout. Keep festive notes about this length.
 */
export const DEFAULT_HERO_NOTE = "Free call and a free store preview before you pay anything.";

/** Premium base theme: Midnight & Lime. Used whenever no festival is active. */
export const DEFAULT_TOKENS: ThemeTokens = {
  night: "#0e1726",
  night2: "#16223a",
  lineNight: "#26334d",
  onNightSoft: "#a8b3c7",
  accent: "#c8f25a",
  accentHover: "#b8e63f",
  accentInk: "#0e1726",
  shine: "#9be7ff",
  glowA: "#7c5cff",
  glowB: "#38bdf8",
  support: "#3b5bdb",
  bg: "#f6f6f1",
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
      night: "#2a0a14", // deep maroon
      night2: "#3d1020",
      lineNight: "#5c2333",
      onNightSoft: "#efcfc0", // 11.9:1 on night
      accent: "#ff9f1c", // saffron
      accentHover: "#ffb347",
      accentInk: "#2a0a14", // 8.9:1 on accent
      shine: "#ffd36b", // gold
      glowA: "#e0218a", // rani pink
      glowB: "#f5b82e", // gold
      support: "#a0153e", // 7.8:1 on white
      bg: "#fbf5ee",
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
      night: "#0b1026", // midnight navy
      night2: "#151c3d",
      lineNight: "#2a3360",
      onNightSoft: "#d4ccb6", // 11.6:1 on night
      accent: "#f4b942", // warm gold
      accentHover: "#f7c967",
      accentInk: "#0b1026", // 10.6:1 on accent
      shine: "#ffe2a1",
      glowA: "#ff8a3d", // diya amber
      glowB: "#ffcf6e",
      support: "#8a5a00", // 5.9:1 on white
      bg: "#faf7f0",
    },
  },
];
