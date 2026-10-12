import { siteConfig } from "@/content/site";
import { publicFileExists } from "@/lib/assets";
import { MarqueeToggle } from "./MarqueeToggle";

/**
 * "Works with" strip: platforms Teamy integrates (never "clients" or "trusted by").
 * Monochrome logos that take their brand colour on hover; a slow, pausable marquee
 * (static with reduced motion). Platforms without an SVG yet show a plain text wordmark.
 */
export function WorksWith() {
  const items = siteConfig.integrations.filter((i) => i.verified).map((i) => ({ ...i, hasLogo: publicFileExists(i.logo) }));
  if (items.length === 0) return null;

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((i) => (
        <li key={i.name} className="group flex items-center gap-3 px-6 md:px-8" title={i.name}>
          {i.hasLogo ? (
            <>
              {/* Decorative: the name is shown next to it. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed */}
              <img
                src={i.logo}
                alt=""
                width={24}
                height={24}
                loading="lazy"
                className="size-6 opacity-80 transition-[filter,opacity] duration-[var(--dur-fast)] [filter:grayscale(1)_brightness(0)_invert(0.78)] group-hover:opacity-100 group-hover:[filter:none]"
              />
              <span className="whitespace-nowrap text-[15px] font-medium text-fg-2 transition-colors group-hover:text-fg">{i.name}</span>
            </>
          ) : (
            <span className="whitespace-nowrap font-display text-lg font-semibold tracking-[-0.02em] text-fg-2 transition-colors group-hover:text-fg">
              {i.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="works-with-title" data-loop className="marquee relative border-y border-line">
      <div className="flex items-center">
        <h2 id="works-with-title" className="label-mono shrink-0 pl-5 pr-2 text-fg-3 md:pl-8">
          Works with
        </h2>
        <div className="min-w-0 flex-1 overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <div className="marquee-track">
            {row(false)}
            {row(true)}
          </div>
        </div>
        <MarqueeToggle />
      </div>
    </section>
  );
}
