import { ArrowUpRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { ClientLogo, logoTile } from "@/components/ui/ClientLogo";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/MaskWords";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { sharkTankProjects } from "@/content/projects";
import { siteConfig } from "@/content/site";

/** Client brands that appeared on Shark Tank India (from content/projects.ts), with the show's logo and a non-affiliation note. */
export function SharkTank() {
  const t = siteConfig.sharkTank;
  if (sharkTankProjects.length === 0) return null;
  return (
    <section id="shark-tank" aria-labelledby="shark-title" className="section-pad max-lg:cv-auto relative">
      <div className="container-page">
        <div className="card relative overflow-hidden rounded-[32px] p-7 sm:p-12 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.10),transparent)]" />
          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- small static logo */}
              <img src="/logos/shark-tank-india.webp" alt="Shark Tank India" width={370} height={480} loading="lazy" className="h-28 w-auto sm:h-32" />
              <Reveal className="reveal-mask mt-8">
                <h2 id="shark-title" className="display-m">
                  <MaskWords text={t.title} emphasis={t.highlight} />
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-md text-lg text-fg-2">{t.sub}</p>
                <WhatsAppCTA source="shark_tank" className={buttonClass("primary", "mt-8")}>
                  <WhatsAppIcon className="size-5" /> Get a free quote
                </WhatsAppCTA>
              </Reveal>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
              {sharkTankProjects.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 0.06}>
                  {p.live ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={`group flex h-full flex-col rounded-2xl p-4 transition-transform duration-[var(--dur-base)] ease-quart hover:-translate-y-1 sm:p-6 ${logoTile(p.slug).className}`}>
                      <SharkTile p={p} />
                      <span className="sr-only"> (opens the {p.name} site in a new tab)</span>
                    </a>
                  ) : (
                    <div className={`flex h-full flex-col rounded-2xl p-4 sm:p-6 ${logoTile(p.slug).className}`}>
                      <SharkTile p={p} />
                    </div>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
          <p className="relative mt-10 text-sm text-fg-3">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}

function SharkTile({ p }: { p: (typeof sharkTankProjects)[number] }) {
  return (
    <>
      <span className="grid h-16 place-items-center sm:h-20">
        <ClientLogo project={p} mono={false} area={5200} />
      </span>
      <span className="mt-4 flex items-center justify-between gap-2 border-t border-current/10 pt-3 text-[13px] sm:text-sm">
        <span className="font-semibold">{p.name}</span>
        <span className="flex shrink-0 items-center gap-1 opacity-70">
          <span className="sm:hidden">S{p.sharkTankSeason}</span>
          <span className="hidden sm:inline">Season {p.sharkTankSeason}</span>
          {p.live && <ArrowUpRight className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />}
        </span>
      </span>
    </>
  );
}
