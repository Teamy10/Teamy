import { Fragment, type ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Splits a heading into words that rise in one after another when the section is revealed.
 * `highlight` (exact substring) gets the shimmering lime gradient on dark, indigo on light.
 */
export function SplitWords({ text, highlight, tone }: { text: string; highlight?: string; tone: "light" | "night" }) {
  const words = text.split(" ");
  const hl = highlight?.split(" ") ?? [];
  const start = hl.length ? words.findIndex((_, i) => hl.every((h, j) => words[i + j] === h)) : -1;
  return (
    <>
      {words.map((w, i) => {
        const lit = start >= 0 && i >= start && i < start + hl.length;
        return (
          <Fragment key={i}>
            <span
              className={`rw ${lit ? (tone === "night" ? "text-shine" : "text-support") : ""}`}
              style={{ ["--i" as string]: i }}
            >
              {w}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}

export function SectionHeading({
  id,
  title,
  highlight,
  sub,
  align = "left",
  tone = "light",
}: {
  id: string;
  title: string;
  highlight?: string;
  sub?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "night";
}) {
  const night = tone === "night";
  return (
    <Reveal as="header" className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 id={id} className={`h2-size font-bold ${night ? "text-on-night" : ""}`}>
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          <SplitWords text={title} highlight={highlight} tone={tone} />
        </span>
      </h2>
      {sub && <p className={`mt-4 text-lg ${night ? "text-on-night-soft" : "text-ink-soft"}`}>{sub}</p>}
    </Reveal>
  );
}
