import { Fragment, type CSSProperties } from "react";

/**
 * Splits text into words, each in its own clipping box, for the masked "wipe up" reveal.
 * `emphasis` (an exact substring) is set in the light contrast weight; `heroWord` adds the gradient.
 * `offset` continues the stagger index across several lines.
 */
export function MaskWords({
  text,
  emphasis,
  heroWord = false,
  offset = 0,
  emphasisClass = "font-light text-fg-2",
}: {
  text: string;
  emphasis?: string;
  heroWord?: boolean;
  offset?: number;
  emphasisClass?: string;
}) {
  const words = text.split(" ");
  const em = emphasis?.split(" ") ?? [];
  const start = em.length ? words.findIndex((_, i) => em.every((w, j) => words[i + j] === w)) : -1;
  return (
    <>
      {words.map((w, i) => {
        const lit = start >= 0 && i >= start && i < start + em.length;
        return (
          <Fragment key={i}>
            <span className="mask-word">
              <span
                className={`mask-inner ${lit ? (heroWord ? "hero-word" : emphasisClass) : ""}`}
                style={{ "--i": offset + i } as CSSProperties}
              >
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}
