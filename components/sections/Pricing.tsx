import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { FestiveDivider } from "@/components/festive/Motifs";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ViewTracker } from "@/components/ui/ViewTracker";
import { formatINR } from "@/lib/format";
import { checkoutLinked } from "@/lib/razorpay";
import { siteConfig } from "@/content/site";

const tick = (
  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
  </span>
);

const bigNumber = "font-display text-[clamp(3.25rem,2.4rem+3vw,4.75rem)] font-semibold leading-none tracking-[-0.05em]";

/** One pricing card: name (and badge), who it's for, the price, the feature list, then its buttons. */
function PlanCard({
  name,
  badge,
  forWho,
  price,
  features,
  highlight = false,
  children,
}: {
  name: string;
  badge?: string;
  forWho: string;
  price: ReactNode;
  features: readonly string[];
  highlight?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`card relative flex h-full flex-col overflow-hidden rounded-[32px] p-7 sm:p-10 ${highlight ? "ring-1 ring-inset ring-accent/40" : ""}`}
    >
      {highlight && (
        // A single soft pool of accent light behind the price.
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.12),transparent)]" />
      )}
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <h3 className="text-xl font-semibold tracking-[-0.02em]">{name}</h3>
          {badge && <p className="label-mono rounded-full px-3 py-1.5 text-accent ring-1 ring-inset ring-accent/40">{badge}</p>}
        </div>
        <p className="mt-2 text-fg-2">{forWho}</p>
        <div className="mt-8 min-h-[5.5rem]">{price}</div>
      </div>
      <ul className="relative mt-8 flex-1 space-y-3.5 border-t border-line pt-8">
        {features.map((f, i) => (
          <li key={f} className="stagger-item flex gap-3" style={{ ["--i" as string]: i }}>
            {tick}
            {f}
          </li>
        ))}
      </ul>
      {children}
    </article>
  );
}

/**
 * Four plans: the AI agent add-on for existing stores, a starter store from ₹14,999, the AI store
 * with every agent built in, and custom builds quoted after a free call. Stacked on phones, 2×2 from
 * tablets up: four across (max 1280px) squeezes the prices and buttons. Once Razorpay is set up,
 * brands that approved their free preview can pay for the starter store online from here.
 */
export function Pricing() {
  const { plan, agentPlan, aiStorePlan, customPlan, addOns, pricingNotes } = siteConfig;
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad cv-auto relative">
      <ViewTracker event="pricing_viewed" />
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="pricing-title"
          align="center"
          title="Start from ₹14,999. Scale when you're ready."
          emphasis="Scale when you're ready."
          sub="Clear prices for new stores and AI agents, and custom quotes for bigger builds. You own everything from day one."
        />

        <div className="mx-auto mt-16 grid max-w-[1040px] gap-6 md:grid-cols-2">
          <Reveal>
            <PlanCard
              name={agentPlan.name}
              badge={agentPlan.badge}
              forWho={agentPlan.forWho}
              features={agentPlan.features}
              price={
                <>
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className={`${bigNumber} tabular-nums`}>{formatINR(agentPlan.setup)}</span>
                    <span className="label-mono text-fg-3">setup</span>
                  </p>
                  <p className="mt-3 font-semibold text-fg-2">+ {formatINR(agentPlan.monthly)}/month</p>
                </>
              }
            >
              <a href="#audit" className={buttonClass("secondary", "mt-10 w-full", "lg")}>
                Get a free store audit <ArrowRight className="size-5 text-accent" aria-hidden="true" />
              </a>
            </PlanCard>
          </Reveal>

          <Reveal delay={0.06}>
            <PlanCard
              name={plan.name}
              forWho={plan.forWho}
              features={plan.features}
              price={
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="label-mono text-fg-3">From</span>
                  <span className={`${bigNumber} tabular-nums`}>
                    <span aria-hidden="true" data-countup={plan.price}>
                      {formatINR(plan.price)}
                    </span>
                    <span className="sr-only">{formatINR(plan.price)}</span>
                  </span>
                  <span className="label-mono text-fg-3">one-time</span>
                </p>
              }
            >
              <WhatsAppCTA source="pricing_starter" data-magnetic="" className={buttonClass("primary", "relative mt-10 w-full", "lg")}>
                <WhatsAppIcon className="size-5" /> Get a free quote
              </WhatsAppCTA>
              {checkoutLinked() && (
                <Link
                  href="/checkout"
                  prefetch={false}
                  className="underline-anim relative mt-5 inline-flex min-h-11 items-center gap-1.5 self-center font-semibold text-fg"
                >
                  Approved your preview? Pay online <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </PlanCard>
          </Reveal>

          <Reveal delay={0.12}>
            <PlanCard
              name={aiStorePlan.name}
              badge={aiStorePlan.badge}
              forWho={aiStorePlan.forWho}
              features={aiStorePlan.features}
              highlight
              price={
                <>
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className={`${bigNumber} tabular-nums`}>{formatINR(aiStorePlan.price)}</span>
                    <span className="label-mono text-fg-3">one-time</span>
                  </p>
                  <p className="mt-3 font-semibold text-fg-2">+ optional {formatINR(aiStorePlan.monthly)}/month</p>
                </>
              }
            >
              <WhatsAppCTA source="pricing_ai_store" data-magnetic="" className={buttonClass("primary", "relative mt-10 w-full", "lg")}>
                <WhatsAppIcon className="size-5" /> Get a free quote
              </WhatsAppCTA>
            </PlanCard>
          </Reveal>

          <Reveal delay={0.18}>
            <PlanCard
              name={customPlan.name}
              forWho={customPlan.forWho}
              features={customPlan.features}
              price={
                <>
                  <p className={bigNumber}>Quoted</p>
                  <p className="label-mono mt-2 text-fg-3">after a free call</p>
                </>
              }
            >
              <WhatsAppCTA source="pricing_custom" className={buttonClass("secondary", "mt-10 w-full", "lg")}>
                <WhatsAppIcon className="size-5 text-accent" /> Let&apos;s talk about your project
              </WhatsAppCTA>
            </PlanCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl space-y-4 text-center text-fg-2">
            <p>{pricingNotes.carePlan}</p>
            <p>{pricingNotes.payment}</p>
            <p className="text-sm text-fg-3">{pricingNotes.whatsappFees}</p>
            <p className="pt-2">
              <span className="label-mono mr-2 text-fg-3">Add-ons, quoted for your brand</span>
              {addOns.map((a) => a.name).join(" · ")}
            </p>
          </div>
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
