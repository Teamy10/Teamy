import { Check } from "lucide-react";
import { icons } from "@/components/ui/IconMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/site.config";

// Each card gets its own glow colour, so the stack reads as three distinct stages.
const glows = ["rgb(200 242 90 / 0.35)", "rgb(56 189 248 / 0.35)", "rgb(124 92 255 / 0.45)"];

/**
 * Sticky stacking cards: each stage pins under the header and the next one slides over it.
 * Pure CSS (position: sticky), so it costs no JS and works on phones too.
 */
export function Services() {
  const groups = siteConfig.services;
  return (
    <section id="services" aria-labelledby="services-title" className="on-night section-pad relative bg-night [contain-intrinsic-size:auto_1800px]">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          tone="night"
          eyebrow={`For ${siteConfig.audience}`}
          title="What we build for D2C brands."
          highlight="D2C brands."
          sub="Three stages, one team. From the first product page to your thousandth repeat order."
        />

        <ol className="mt-14 space-y-6">
          {groups.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.title}
                className="sticky"
                style={{ top: `calc(var(--header-h) + 24px + ${i * 22}px)` }}
              >
                <article
                  className="glow-card relative overflow-hidden rounded-[32px] border border-line-night bg-night-2 p-7 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.8)] sm:p-10 lg:p-12"
                  style={{ ["--glow" as string]: glows[i % glows.length] }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-24 -top-24 size-80 rounded-full"
                    style={{ background: `radial-gradient(closest-side, ${glows[i % glows.length]}, transparent)` }}
                  />
                  <div className="relative grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="grid size-12 place-items-center rounded-2xl bg-accent text-ink">
                          <Icon className="size-6" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-[0.14em] text-on-night-soft">
                          Stage {i + 1} of {groups.length}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-[52px] font-extrabold leading-none text-on-night md:text-7xl">
                        {s.title}
                        <span className="text-accent">.</span>
                      </h3>
                      <p className="mt-4 max-w-md text-lg text-on-night-soft">{s.line}</p>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 rounded-2xl bg-night px-4 py-3.5 text-on-night ring-1 ring-line-night transition-colors duration-300 hover:ring-accent/60"
                        >
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-ink">
                            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
