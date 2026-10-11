/**
 * Motion tokens — the ONE place for durations, easings and staggers.
 *
 * GSAP code imports these directly; CSS reads the same values as custom properties
 * (`motionCss()` is injected into <head>), so CSS transitions and GSAP timelines always match.
 * House style: expo / quart "out" curves, nothing bouncy, 0.4–1.2s.
 */

export const duration = {
  fast: 0.4,
  base: 0.7,
  slow: 1,
  slower: 1.2,
} as const;

export const ease = {
  /** Default for entrances: fast start, long soft landing. */
  expoOut: { css: "cubic-bezier(0.16, 1, 0.3, 1)", gsap: "expo.out" },
  /** Slightly calmer than expo; used for UI state changes. */
  quartOut: { css: "cubic-bezier(0.25, 1, 0.5, 1)", gsap: "power3.out" },
  /** Symmetric, for scrubbed timelines and looping movement. */
  expoInOut: { css: "cubic-bezier(0.87, 0, 0.13, 1)", gsap: "expo.inOut" },
} as const;

export const stagger = {
  /** Between words in a masked headline reveal. */
  words: 0.06,
  /** Between items in a list or grid. */
  items: 0.08,
} as const;

/** Distances (px) for fade-up reveals and parallax. */
export const distance = {
  rise: 24,
  tilt: 8, // max degrees of hero mockup tilt
  magnet: 10, // max px a magnetic button moves toward the cursor
} as const;

/** CSS custom properties for the tokens above. */
export function motionCss(): string {
  return `:root{--dur-fast:${duration.fast}s;--dur-base:${duration.base}s;--dur-slow:${duration.slow}s;--dur-slower:${duration.slower}s;--ease-expo-out:${ease.expoOut.css};--ease-quart-out:${ease.quartOut.css};--ease-expo-in-out:${ease.expoInOut.css};--stagger-words:${stagger.words}s;--stagger-items:${stagger.items}s;--rise:${distance.rise}px}`;
}
