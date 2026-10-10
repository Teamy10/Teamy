import { Check, Globe, KeyRound, Code2, Users } from "lucide-react";
import type { ReactNode } from "react";
import { icons } from "@/components/ui/IconMap";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, type IconName } from "@/site.config";

/* Small animated visuals per benefit. They animate in when the card is revealed (.pop). */

function DaysVisual() {
  const days = Array.from({ length: siteConfig.launchDays }, (_, i) => i + 1);
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2" aria-hidden="true">
      {days.map((d, i) => (
        <span
          key={d}
          className="pop fill-on-show grid h-11 min-w-11 place-items-center rounded-xl bg-accent px-2 text-sm font-bold text-ink"
          style={{ ["--d" as string]: 120 + i * 110 }}
        >
          {i === days.length - 1 ? "Live 🚀" : `D${d}`}
        </span>
      ))}
    </div>
  );
}

function CheckoutVisual() {
  return (
    <div className="mt-8 flex flex-wrap gap-2" aria-hidden="true">
      {["UPI", "Cards", "COD"].map((m, i) => (
        <span
          key={m}
          className="pop inline-flex items-center gap-1.5 rounded-full bg-night-2 px-3.5 py-2 text-sm font-semibold text-on-night ring-1 ring-line-night"
          style={{ ["--d" as string]: 150 + i * 120 }}
        >
          <Check className="size-4 text-accent" strokeWidth={3} /> {m}
        </span>
      ))}
    </div>
  );
}

function OpsVisual() {
  return (
    <ul className="mt-8 space-y-2 text-sm" aria-hidden="true">
      {["Hosting", "Updates", "Fixes"].map((m, i) => (
        <li
          key={m}
          className="pop flex items-center justify-between rounded-xl bg-night-2 px-3.5 py-2.5 text-on-night ring-1 ring-line-night"
          style={{ ["--d" as string]: 150 + i * 120 }}
        >
          {m}
          <span className="flex items-center gap-2 text-on-night-soft">
            <span className="pulse-dot size-2 rounded-full bg-accent" /> handled
          </span>
        </li>
      ))}
    </ul>
  );
}

function OwnVisual() {
  const items: [ReactNode, string][] = [
    [<Globe key="g" className="size-4" />, "Domain"],
    [<Code2 key="c" className="size-4" />, "Code"],
    [<Users key="u" className="size-4" />, "Customer data"],
    [<KeyRound key="k" className="size-4" />, "Logins"],
  ];
  return (
    <div className="mt-8 flex flex-wrap gap-2" aria-hidden="true">
      {items.map(([icon, label], i) => (
        <span
          key={label}
          className="pop inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-ink"
          style={{ ["--d" as string]: 150 + i * 110 }}
        >
          {icon} {label}
        </span>
      ))}
    </div>
  );
}

const visuals: Partial<Record<IconName, () => ReactNode>> = {
  rocket: DaysVisual,
  cart: CheckoutVisual,
  shield: OpsVisual,
  key: OwnVisual,
};

// Bento layout: wide, narrow / narrow, wide.
const spans = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

export function Benefits() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow="Why Teamy"
          title="One team for your whole store."
          highlight="whole store."
          sub="Design, build, payments, WhatsApp and the fixes after launch. You run the brand; we run the tech."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {siteConfig.benefits.map((b, i) => {
            const Icon = icons[b.icon];
            const Visual = visuals[b.icon];
            return (
              <Reveal as="li" key={b.title} delay={i * 0.07} className={spans[i % 4]}>
                <div className="glow-card on-night group relative h-full overflow-hidden rounded-[28px] bg-night p-7 text-on-night ring-1 ring-line-night transition-[translate,box-shadow] duration-300 ease-brand [--glow:rgb(200_242_90/0.14)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(14_23_38/0.8)] sm:p-8">
                  {/* Corner glow + giant faded number for depth. */}
                  <span
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.35),transparent)] transition-transform duration-700 ease-brand group-hover:scale-125"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-0.15em] right-4 font-display text-[9rem] font-extrabold leading-none text-white/[0.04]"
                  >
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <span className="grid size-12 place-items-center rounded-2xl bg-accent text-ink transition-transform duration-500 ease-brand group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-[28px] font-extrabold">{b.title}</h3>
                    <p className="mt-2 max-w-md text-on-night-soft">{b.line}</p>
                    {Visual && <Visual />}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
