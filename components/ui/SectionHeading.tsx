import type { ReactNode } from "react";
import { MaskWords } from "./MaskWords";
import { Reveal } from "./Reveal";

/** Section heading: masked word reveal for the title, fade-up for the sub line. No eyebrow labels. */
export function SectionHeading({
  id,
  title,
  emphasis,
  sub,
  align = "left",
  size = "l",
}: {
  id: string;
  title: string;
  emphasis?: string;
  sub?: ReactNode;
  align?: "left" | "center";
  size?: "l" | "m";
}) {
  const center = align === "center";
  return (
    <header className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal className="reveal-mask">
        <h2 id={id} className={size === "l" ? "display-l" : "display-m"}>
          <MaskWords text={title} emphasis={emphasis} />
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-lg text-fg-2 ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{sub}</p>
        </Reveal>
      )}
    </header>
  );
}
