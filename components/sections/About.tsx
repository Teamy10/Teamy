import { ArrowRight, Clock, Code2, KeyRound, MapPin, MonitorSmartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, type HighlightIcon } from "@/content/site";

const icons: Record<HighlightIcon, LucideIcon> = {
  responsive: MonitorSmartphone,
  code: Code2,
  clock: Clock,
  key: KeyRound,
};

/** "About Teamy": who we are, plus four highlights (2-up on mobile, 4-up on desktop). */
export function About() {
  const { about, contact } = siteConfig;
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad cv-auto">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} emphasis={about.emphasis} />
          </div>
          <Reveal delay={0.12} className="space-y-5 text-lg text-fg-2 lg:col-span-5 lg:pt-12">
            {about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="flex items-center gap-2 text-base text-fg">
              <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
              Based in {contact.address.locality}
            </p>
            <Link href="/ecommerce-website-developer-delhi" className="underline-anim inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-fg">
              Ecommerce website developer in Delhi <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 border-t border-line lg:mt-20 lg:grid-cols-4">
          {about.highlights.map((h, i) => {
            const Icon = icons[h.icon];
            return (
              <Reveal
                as="li"
                key={h.label}
                delay={i * 0.06}
                className="border-b border-line py-8 pr-4 even:border-l even:pl-4 sm:pr-6 sm:even:pl-6 lg:border-b-0 lg:px-6 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
              >
                <span className="grid size-11 place-items-center rounded-full text-accent ring-1 ring-inset ring-line-strong">
                  <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-6 text-lg font-semibold leading-snug tracking-[-0.02em] sm:text-xl">{h.label}</h3>
                <p className="mt-2 text-[15px] text-fg-2 sm:text-base">{h.line}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
