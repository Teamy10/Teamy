import { Check, Globe, KeyRound, Code2, Users } from "lucide-react";
import type { ReactNode } from "react";
import { icons } from "@/components/ui/IconMap";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, type IconName } from "@/site.config";

/* Small animated visuals per benefit. They animate in when the card is revealed (.pop). */

/** A thin progress track from first call to launch; the fill sweeps across when revealed. */
function DaysVisual() {
  return (
    <div className="mt-8" aria-hidden="true">
      <div className="h-1.5 overflow-hidden rounded-full bg-line-night">
        <div className="grow-on-show h-full origin-left rounded-full bg-[linear-gradient(90deg,var(--accent),var(--sky))]" />
      </div>
      <div className="mt-3 flex justify-between text-sm text-on-night-soft">
        <span>First call</span>
        <span className="font-semibold text-on-night">Live in {siteConfig.launchDays} days</span>
      </div>
    </div>
  );
}

function CheckoutVisual() {
  return (
    <ul className="mt-8 grid grid-cols-3 gap-2 text-sm" aria-hidden="true">
      {["UPI", "Cards", "COD"].map((m, i) => (
        <li
          key={m}
          className="pop flex flex-col items-start gap-2 rounded-xl bg-night-2 p-3 font-semibold text-on-night ring-1 ring-line-night"
          style={{ ["--d" as string]: 150 + i * 120 }}
        >
          <Check className="size-4 text-accent" strokeWidth={3} /> {m}
        </li>
      ))}
    </ul>
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
    <ul className="mt-8 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4" aria-hidden="true">
      {items.map(([icon, label], i) => (
        <li
          key={label}
          className="pop flex items-center gap-2 rounded-xl bg-night-2 px-3 py-2.5 font-semibold text-on-night ring-1 ring-line-night"
          style={{ ["--d" as string]: 150 + i * 110 }}
        >
          <span className="text-accent">{icon}</span> {label}
        </li>
      ))}
    </ul>
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
