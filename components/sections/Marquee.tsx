import { siteConfig } from "@/site.config";
import { MarqueeToggle } from "./MarqueeToggle";

/** Slow ticker of what Teamy handles. Text only. Pauses on hover, with the button, and offscreen. */
export function Marquee() {
  const items = siteConfig.marquee;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-8 pr-8 font-display text-[22px] font-light tracking-[-0.02em] text-fg-2 md:text-[28px]">
          {t}
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-accent" />
        </li>
      ))}
    </ul>
  );
  return (
    <section id="marquee" aria-label="What Teamy handles" data-loop className="marquee relative border-y border-line">
      <div className="overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <MarqueeToggle />
    </section>
  );
}
