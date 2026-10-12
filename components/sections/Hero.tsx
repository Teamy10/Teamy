import { ArrowDown, Lock, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { FestiveHeroNote, HeroMotif } from "@/components/festive/Motifs";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/MaskWords";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { assets, projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { publicFileExists } from "@/lib/assets";

const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

/** Real client sites in the hero: a desktop browser frame and a phone, from content/site.ts → hero.showcase. */
function Showcase() {
  const [desk, phone] = siteConfig.hero.showcase.map((slug) => projects.find((p) => p.slug === slug));
  const deskImg = desk && publicFileExists(assets(desk.slug).top) ? assets(desk.slug).top : null;
  const phoneImg = phone && publicFileExists(assets(phone.slug).mobile) ? assets(phone.slug).mobile : null;
  if (!desk || !deskImg) return null;
  return (
    <figure className="hero-rise relative mx-auto w-full max-w-[640px] lg:col-span-5 lg:max-w-none" style={rise(0.3)}>
      <div className="relative pb-10 pl-6 sm:pl-12 lg:pl-10 xl:-mr-8">
        <div className="overflow-hidden rounded-[18px] bg-surface shadow-[0_40px_90px_-30px_rgb(0_0_0/0.85)] ring-1 ring-white/10">
          <div aria-hidden="true" className="flex h-8 items-center gap-3 border-b border-line px-3">
            <span className="flex gap-1.5">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className="size-2 rounded-full bg-fg/20" />
              ))}
            </span>
            <span className="mx-auto flex h-5 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 font-mono text-[10.5px] text-fg-3">
              <Lock className="size-2.5" />
              {new URL(desk.url).hostname.replace(/^www\./, "")}
            </span>
            <span className="w-[30px]" />
          </div>
          {/* Pre-optimised, sized per screen (the hero text, not this image, is the largest paint). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets(desk.slug).topSmall}
            srcSet={`${assets(desk.slug).topSmall} 600w, ${deskImg} 1200w`}
            sizes="(min-width: 1024px) 480px, 80vw"
            alt={`The ${desk.name} homepage`}
            width={1200}
            height={750}
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        {phone && phoneImg && (
          <div className="absolute bottom-0 left-0 w-[30%] min-w-[118px] max-w-[190px] rounded-[26px] bg-[#05070a] p-[6px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/15">
            <div className="overflow-hidden rounded-[21px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets(phone.slug).mobileSmall}
                srcSet={`${assets(phone.slug).mobileSmall} 390w, ${phoneImg} 780w`}
                sizes="(min-width: 1024px) 160px, 30vw"
                alt={`The ${phone.name} homepage on a phone`}
                width={780}
                height={1688}
                decoding="async"
                className="block aspect-[9/19] h-auto w-full object-cover object-top"
              />
            </div>
          </div>
        )}
      </div>
      <figcaption className="label-mono mt-4 text-center text-fg-3 lg:text-right">
        Live client sites · {desk.name}
        {phone ? ` & ${phone.name}` : ""}
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const { hero, facts } = siteConfig;
  // Running word index so the stagger continues across both lines.
  const offsets = hero.lines.map((_, i) => hero.lines.slice(0, i).reduce((n, l) => n + l.text.split(" ").length, 0));
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
      <HeroMotif />
      <div className="container-page relative grid grid-cols-1 items-center gap-y-14 pb-12 pt-10 lg:grid-cols-12 lg:gap-x-10 lg:pb-14 lg:pt-14">
        <div className="relative z-10 lg:col-span-7">
          <p className="hero-rise inline-flex items-center gap-2.5 text-[15px] text-fg-2" style={rise(0.05)}>
            <span className="flex text-accent" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-fg">{facts.rating}/5</strong> from our clients · {facts.projects}+ projects
            </span>
          </p>
          {/* Kinetic headline: each word wipes up from a mask, on load, with CSS only. */}
          <h1 id="hero-title" className="hero-mask display-xl mt-6 lg:text-[clamp(3.5rem,1.2rem+3.6vw,4.4rem)]">
            {hero.lines.map((line, li) => (
              <span key={li} className="block">
                <MaskWords text={line.text} emphasis={line.emphasis} heroWord={line.heroWord} offset={offsets[li]} emphasisClass="font-light" />
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-xl text-lg text-fg-2 md:text-xl">{hero.sub}</p>
          <div className="hero-rise" style={rise(0.5)}>
            <FestiveHeroNote />
          </div>
          <div className="hero-rise mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7" style={rise(0.6)}>
            <WhatsAppCTA source="hero_quote" data-magnetic="" className={buttonClass("primary", "w-full sm:w-auto", "lg")}>
              <WhatsAppIcon className="size-5" /> Get a free quote
            </WhatsAppCTA>
            <TrackedLink href="#work" event="hero_cta_click" params={{ location: "hero_work" }} className={buttonClass("ghost")}>
              See our work <ArrowDown className="size-4" aria-hidden="true" />
            </TrackedLink>
          </div>
          <ul className="hero-rise label-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-fg-3" style={rise(0.7)}>
            {[`${facts.years}+ years`, `${facts.satisfaction}% client satisfaction`, "Shark Tank India brands"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <Showcase />
      </div>
    </section>
  );
}
