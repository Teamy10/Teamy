"use client";

import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { icons } from "@/components/ui/IconMap";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { track } from "@/lib/analytics";
import { formatINR } from "@/lib/format";
import { useInViewOnce } from "@/lib/hooks";
import { PLAN_EVENT } from "@/lib/planEvent";
import { siteConfig, type Plan } from "@/site.config";

function choose(plan: Plan["id"]) {
  track("plan_cta_click", { plan });
  window.dispatchEvent(new CustomEvent(PLAN_EVENT, { detail: plan }));
}

function PlanBody({ plan, featured }: { plan: Plan; featured: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-3xl font-extrabold">{plan.name}</h3>
        {featured && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-bold text-ink">
            <Sparkles className="size-4" aria-hidden="true" /> Recommended
          </span>
        )}
      </div>
      <p className={`mt-2 min-h-12 ${featured ? "text-on-night-soft" : "text-ink-soft"}`}>{plan.forWho}</p>
      <p className="mt-6 flex items-baseline gap-2">
        <span className={`font-display text-[clamp(3rem,2.4rem+2vw,4rem)] font-extrabold leading-none tracking-tight ${featured ? "text-shine" : ""}`}>
          <CountUp value={plan.price} format={formatINR} />
        </span>
        <span className={featured ? "text-on-night-soft" : "text-ink-soft"}>one-time</span>
      </p>
      <ul className={`mt-8 space-y-3 border-t pt-8 ${featured ? "border-line-night" : "border-line"}`}>
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3">
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                featured ? "bg-accent text-ink" : "bg-ink text-accent"
              }`}
            >
              <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-10">
        <a
          href="#contact"
          onClick={() => choose(plan.id)}
          className={buttonClass(featured ? "primary" : "dark", `w-full text-[17px] ${featured ? "sheen-idle" : ""}`)}
        >
          Choose {plan.name}
          <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

export function Pricing() {
  const { plans, addOns } = siteConfig;
  const [ref, seen] = useInViewOnce<HTMLElement>({ threshold: 0.2 });
  useEffect(() => {
    if (seen) track("pricing_viewed");
  }, [seen]);

  const launch = plans.find((p) => !p.recommended) ?? plans[0];
  const growth = plans.find((p) => p.recommended) ?? plans[1];

  return (
    <section ref={ref} id="pricing" aria-labelledby="pricing-title" className="section-pad relative overflow-hidden [contain-intrinsic-size:auto_1600px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 size-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(200_242_90/0.28),transparent)]"
      />
      <div className="container-page relative">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          align="center"
          title="Two plans. One team. No surprises."
          highlight="No surprises."
          sub="One-time build price in Indian rupees. You own the store from day one."
        />

        {/* Equal-height plans, side by side from tablet up. */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 md:items-stretch">
          <Reveal className="h-full">
            <article className="glow-card flex h-full flex-col rounded-[32px] bg-surface p-7 shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-lift sm:p-10">
              <PlanBody plan={launch} featured={false} />
            </article>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <article className="spin-border h-full rounded-[32px] shadow-[0_40px_80px_-30px_rgb(14_23_38/0.65)] transition-transform duration-300 ease-brand hover:-translate-y-1.5">
              <div className="on-night glow-card flex h-full flex-col rounded-[30px] bg-night p-7 text-on-night [--glow:rgb(200_242_90/0.14)] sm:p-10">
                <PlanBody plan={growth} featured />
              </div>
            </article>
          </Reveal>
        </div>

        {/* Add-ons: full width under the plans, so nothing hangs off one column. */}
        <Reveal delay={0.12} className="mx-auto mt-6 max-w-5xl">
          <section aria-labelledby="addons-title" className="rounded-[32px] bg-surface p-6 ring-1 ring-line sm:p-8">
            <h3 id="addons-title" className="text-2xl font-extrabold">
              Add-ons, when you need them
            </h3>
            <p className="mt-1 text-ink-soft">Bolt any of these onto Launch or Growth.</p>
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
                      <span className="mt-1.5 block text-sm font-semibold text-support">
                        {a.price ? `${formatINR(a.price)}${a.per === "month" ? "/month" : ""}` : "Quoted for you"}
                      </span>
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
                    <span className="grid size-10 place-items-center rounded-xl bg-accent text-ink">
                      <MessageCircle className="size-5" aria-hidden="true" />
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
