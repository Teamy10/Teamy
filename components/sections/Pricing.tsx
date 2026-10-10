import { FestiveDivider } from "@/components/festive/Motifs";
import { ArrowRight, Check } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { icons } from "@/components/ui/IconMap";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { TrackedLink, WhatsAppLink } from "@/components/ui/TrackedLink";
import { ViewTracker } from "@/components/ui/ViewTracker";
import { siteConfig } from "@/site.config";

/** One plan, one price. The ₹ figure here is the only price on the site. */
export function Pricing() {
  const { plan, addOns } = siteConfig;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad relative overflow-hidden [contain-intrinsic-size:auto_1400px]">
      <FestiveDivider />
      <ViewTracker event="pricing_viewed" />
      <div aria-hidden="true" className="glow-blob pointer-events-none absolute left-1/2 top-24 size-[44rem] -translate-x-1/2" />
      <div className="container-page relative">
        <SectionHeading
          id="pricing-title"
          align="center"
          title="One plan. One price. Everything included."
          highlight="Everything included."
          sub="A one-time build price in Indian rupees. You own the store from day one."
        />

        <Reveal className="mx-auto mt-14 max-w-5xl">
          <article className="spin-border rounded-[32px] shadow-[0_40px_80px_-30px_rgb(var(--night-rgb)/0.65)]">
            <div className="on-night glow-card surface-night grid gap-10 rounded-[30px] p-7 text-on-night sm:p-10 md:grid-cols-12 md:gap-8 lg:p-12">
              <div className="flex flex-col md:col-span-5">
                <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                <p className="mt-2 text-on-night-soft">{plan.forWho}</p>
                <p className="mt-8 flex items-baseline gap-2">
                  <span className="text-shine font-display text-[clamp(3.25rem,2.6rem+2.4vw,4.75rem)] font-bold leading-none tracking-[-0.04em]">
                    <CountUp value={plan.price} />
                  </span>
                  <span className="text-on-night-soft">one-time</span>
                </p>
                <div className="mt-8 flex flex-col gap-3 md:mt-auto md:pt-10">
                  <WhatsAppLink
                    section="pricing"
                    message="bookCall"
                    onClickTrack="pricing_cta_click"
                    className={buttonClass("primary", "sheen-idle w-full text-[17px]")}
                  >
                    <WhatsAppIcon className="size-5" /> Book a free call
                  </WhatsAppLink>
                  <TrackedLink
                    href="#contact"
                    event="pricing_cta_click"
                    params={{ location: "pricing_form" }}
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 font-semibold text-on-night-soft underline-offset-4 hover:text-on-night hover:underline"
                  >
                    Or send us your details <ArrowRight className="size-4" aria-hidden="true" />
                  </TrackedLink>
                </div>
              </div>

              <ul className="grid content-start gap-x-6 gap-y-3.5 border-t border-line-night pt-8 sm:grid-cols-2 md:col-span-7 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-6 max-w-5xl">
          <section aria-labelledby="addons-title" className="surface-card rounded-[32px] p-6 sm:p-8">
            <h3 id="addons-title" className="text-2xl font-bold tracking-tight">
              Add-ons, when you need them
            </h3>
            <p className="mt-1 text-ink-soft">Bolt any of these on later. We&apos;ll quote them for your brand.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {addOns.map((a, i) => {
                const Icon = icons[a.icon];
                return (
                  <li
                    key={a.name}
                    className="pop glow-card group flex h-full items-start gap-3 rounded-2xl bg-bg p-4 ring-1 ring-line transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                    style={{ ["--d" as string]: 100 + i * 70 }}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink text-accent transition-transform duration-300 group-hover:-rotate-6">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{a.name}</span>
                      <span className="block text-[15px] leading-snug text-ink-soft">{a.line}</span>
                    </span>
                  </li>
                );
              })}
              <li className="pop" style={{ ["--d" as string]: 100 + addOns.length * 70 }}>
                <a
                  href="#contact"
                  className="group flex h-full min-h-24 items-center justify-between gap-3 rounded-2xl bg-ink p-4 font-semibold text-on-night transition-[translate] duration-300 hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-ink">
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </span>
                    Need something else? Ask us.
                  </span>
                  <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
