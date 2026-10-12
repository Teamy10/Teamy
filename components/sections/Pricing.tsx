import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { FestiveDivider } from "@/components/festive/Motifs";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ViewTracker } from "@/components/ui/ViewTracker";
import { formatINR } from "@/lib/format";
import { siteConfig } from "@/content/site";

/** A starter store from ₹8,999, next to custom builds that are quoted after a free call. */
export function Pricing() {
  const { plan, customPlan, addOns } = siteConfig;
  const tick = (
    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
    </span>
  );
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad cv-auto relative">
      <ViewTracker event="pricing_viewed" />
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="pricing-title"
          align="center"
          title="Start from ₹8,999. Scale when you're ready."
          emphasis="Scale when you're ready."
          sub="A clear starting price for new brands, and custom quotes for bigger builds. You own everything from day one."
        />

        <div className="mx-auto mt-16 grid max-w-[1040px] gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card relative flex h-full flex-col overflow-hidden rounded-[32px] p-7 ring-1 ring-inset ring-accent/40 sm:p-10">
              {/* A single soft pool of accent light behind the price. */}
              <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.12),transparent)]" />
              <div className="relative">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
                <p className="mt-2 text-fg-2">{plan.forWho}</p>
                <p className="mt-8 flex items-baseline gap-3">
                  <span className="label-mono text-fg-3">From</span>
                  <span className="font-display text-[clamp(3.25rem,2.4rem+3vw,4.75rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                    <span aria-hidden="true" data-countup={plan.price}>
                      {formatINR(plan.price)}
                    </span>
                    <span className="sr-only">{formatINR(plan.price)}</span>
                  </span>
                  <span className="label-mono text-fg-3">one-time</span>
                </p>
              </div>
              <ul className="relative mt-10 flex-1 space-y-3.5 border-t border-line pt-8">
                {plan.features.map((f, i) => (
                  <li key={f} className="stagger-item flex gap-3" style={{ ["--i" as string]: i }}>
                    {tick}
                    {f}
                  </li>
                ))}
              </ul>
              <WhatsAppCTA source="pricing_starter" data-magnetic="" className={buttonClass("primary", "relative mt-10 w-full", "lg")}>
                <WhatsAppIcon className="size-5" /> Get a free quote
              </WhatsAppCTA>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card flex h-full flex-col rounded-[32px] p-7 sm:p-10">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">{customPlan.name}</h3>
              <p className="mt-2 text-fg-2">{customPlan.forWho}</p>
              <p className="mt-8 font-display text-[clamp(3.25rem,2.4rem+3vw,4.75rem)] font-semibold leading-none tracking-[-0.05em]">
                Quoted
                <span className="label-mono ml-3 align-middle text-fg-3">after a free call</span>
              </p>
              <ul className="mt-10 flex-1 space-y-3.5 border-t border-line pt-8">
                {customPlan.features.map((f, i) => (
                  <li key={f} className="stagger-item flex gap-3" style={{ ["--i" as string]: i }}>
                    {tick}
                    {f}
                  </li>
                ))}
              </ul>
              <WhatsAppCTA source="pricing_custom" className={buttonClass("secondary", "mt-10 w-full", "lg")}>
                <WhatsAppIcon className="size-5 text-accent" /> Let&apos;s talk about your project
              </WhatsAppCTA>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-fg-2">
            <span className="label-mono mr-2 text-fg-3">Add-ons, quoted for your brand</span>
            {addOns.map((a) => a.name).join(" · ")}
          </p>
          <p className="mt-4 text-center">
            <Link href="/shopify-alternative-india" className="underline-anim inline-flex min-h-11 items-center gap-1.5 font-semibold text-fg">
              Comparing with Shopify? See the Shopify alternative for India <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
