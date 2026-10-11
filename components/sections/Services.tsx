import { FestiveDivider } from "@/components/festive/Motifs";
import { AnimatedIcon } from "@/components/icons/AnimatedIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/site.config";

// Bento rhythm on the 12-column grid: wide / narrow, narrow / wide, half / half.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6"];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad relative">
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="services-title"
          title="What we build for D2C brands."
          emphasis="D2C brands."
          sub="Everything from the first product page to your thousandth repeat order. Launch, sell and grow, handled by one team."
        />
        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {siteConfig.services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 2) * 0.08} className={`${spans[i]} h-full`}>
              {/* Focusable so keyboard users get the same spotlight and icon motion as hover. */}
              <article
                tabIndex={0}
                aria-labelledby={`svc-${i}`}
                className="spotlight card group flex h-full min-h-56 flex-col rounded-[24px] p-7 sm:p-8 lg:min-h-64"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-fg-2 transition-colors duration-[var(--dur-fast)] group-hover:text-fg">
                    <AnimatedIcon name={s.icon} />
                  </span>
                  <span className="label-mono text-fg-3">{s.stage}</span>
                </div>
                <div className="mt-auto pt-10">
                  <h3 id={`svc-${i}`} className="text-[26px] font-semibold leading-tight tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-fg-2">{s.line}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
