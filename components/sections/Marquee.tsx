import { Sparkle } from "lucide-react";
import { siteConfig } from "@/site.config";

/** Lime capabilities strip. Words only. Pauses on hover; static with reduced motion. */
export function Marquee() {
  const items = siteConfig.marquee;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {t}
          <Sparkle className="size-5 fill-ink" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What every Teamy store includes" className="marquee relative overflow-hidden border-y border-ink/10 bg-accent py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
