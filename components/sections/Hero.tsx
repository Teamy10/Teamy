import { ArrowDown } from "lucide-react";
import type { CSSProperties } from "react";
import { FestiveHeroNote, HeroMotif } from "@/components/festive/Motifs";
import { Storefront } from "@/components/mockup/Storefront";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/MaskWords";
import { TrackedLink, WhatsAppLink } from "@/components/ui/TrackedLink";
import { siteConfig } from "@/site.config";

const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

export function Hero() {
  const { hero } = siteConfig;
  // Running word index so the stagger continues across both lines.
  const offsets = hero.lines.map((_, i) => hero.lines.slice(0, i).reduce((n, l) => n + l.text.split(" ").length, 0));
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
      <HeroMotif />
      <div className="container-page relative grid grid-cols-1 items-center gap-y-20 pb-24 pt-10 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-12 lg:gap-x-8 lg:pb-28 lg:pt-6">
        <div className="relative z-10 lg:col-span-7">
          {/* Kinetic headline: each word wipes up from a mask, on load, with CSS only. */}
          <h1 id="hero-title" className="hero-mask display-xl">
            {hero.lines.map((line, li) => (
              <span key={li} className="block">
                <MaskWords text={line.text} emphasis={line.emphasis} heroWord={line.heroWord} offset={offsets[li]} emphasisClass="font-light" />
              </span>
            ))}
          </h1>
          <p className="hero-rise mt-8 max-w-xl text-lg text-fg-2 md:text-xl" style={rise(0.45)}>
            {hero.sub}
          </p>
          <div className="hero-rise" style={rise(0.5)}>
            <FestiveHeroNote />
          </div>
          <div className="hero-rise mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7" style={rise(0.6)}>
            <WhatsAppLink
              section="hero_book_call"
              message="bookCall"
              data-magnetic=""
              className={buttonClass("primary", "w-full sm:w-auto", "lg")}
            >
              <WhatsAppIcon className="size-5" /> Book a free call
            </WhatsAppLink>
            <TrackedLink href="#story" event="hero_cta_click" params={{ location: "hero_story" }} className={buttonClass("ghost")}>
              See the 7-day plan <ArrowDown className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
          <ul className="hero-rise label-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-fg-3" style={rise(0.7)}>
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Tilted storefront: cursor parallax on desktop (runtime), static tilt otherwise. */}
        <figure className="hero-rise relative mx-auto w-full max-w-[560px] lg:col-span-5 lg:max-w-none" style={rise(0.35)}>
          <div data-tilt-zone data-loop className="relative px-4 py-10 sm:px-8 lg:-mr-10 lg:px-0">
            <div
              data-tilt
              className="relative [transform:perspective(1400px)_rotateY(-6deg)_rotateX(6deg)] lg:[transform:perspective(1400px)_rotateY(-14deg)_rotateX(7deg)]"
            >
              <Storefront variant="hero" />
            </div>
          </div>
          <figcaption className="label-mono mt-6 text-center text-fg-3 lg:text-left">Illustrative storefront · invented brand</figcaption>
        </figure>
      </div>
    </section>
  );
}
