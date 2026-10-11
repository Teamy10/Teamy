import { DOT, LOGO_VIEWBOX, WORD_PATH } from "./logoPaths";

/** Teamy wordmark: "teamy" in Bricolage 800 with a lime full stop. */
export function Logo({ className = "h-7 w-auto", tone = "light" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label="Teamy">
      <path fill={tone === "light" ? "var(--text)" : "#0E1726"} d={WORD_PATH} />
      <circle cx={DOT.cx} cy={DOT.cy} r={DOT.r} fill="var(--accent)" />
    </svg>
  );
}
