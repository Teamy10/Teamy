import { Check } from "lucide-react";
import { FestiveDivider } from "@/components/festive/Motifs";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppLink } from "@/components/ui/TrackedLink";
import { ViewTracker } from "@/components/ui/ViewTracker";
import { formatINR } from "@/lib/format";
import { siteConfig } from "@/site.config";

/** One plan, one price, one CTA. The ₹ figure here is the only price for Teamy on the site. */
export function Pricing() {
  const { plan, addOns } = siteConfig;
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad relative">
      <ViewTracker event="pricing_viewed" />
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="pricing-title"
          align="center"
          title="One plan. One price. Everything included."
          emphasis="Everything included."
          sub="A one-time build price in Indian rupees. You own the store from day one."
        />

        <Reveal className="mx-auto mt-16 max-w-[880px]">
          <article className="card relative overflow-hidden rounded-[32px] p-7 sm:p-12">
            {/* A single soft pool of accent light behind the price. */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.12),transparent)]" />
            <div className="relative text-center">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">{plan.name}</h3>
              <p className="mx-auto mt-2 max-w-md text-fg-2">{plan.forWho}</p>
              <p className="mt-8 flex items-baseline justify-center gap-3">
                <span className="font-display text-[clamp(4rem,2.6rem+5vw,7rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                  <span aria-hidden="true" data-countup={plan.price}>
                    {formatINR(plan.price)}
                  </span>
                  <span className="sr-only">{formatINR(plan.price)}</span>
                </span>
                <span className="label-mono text-fg-3">one-time</span>
              </p>
            </div>

            <ul className="relative mt-12 grid gap-x-8 gap-y-4 border-t border-line pt-10 sm:grid-cols-2">
              {plan.features.map((f, i) => (
                <li key={f} className="stagger-item flex gap-3" style={{ ["--i" as string]: i }}>
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="relative mt-12 flex justify-center">
              <WhatsAppLink
                section="pricing"
                message="bookCall"
                onClickTrack="pricing_cta_click"
                data-magnetic=""
                className={buttonClass("primary", "w-full sm:w-auto sm:min-w-72", "lg")}
              >
                <WhatsAppIcon className="size-5" /> Book a free call
              </WhatsAppLink>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-fg-2">
            <span className="label-mono mr-2 text-fg-3">Add-ons, quoted for your brand</span>
            {addOns.map((a) => a.name).join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
