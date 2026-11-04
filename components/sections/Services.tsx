import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FestiveDivider } from "@/components/festive/Motifs";
import { AnimatedIcon } from "@/components/icons/AnimatedIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";

// Bento rhythm on the 12-column grid: wide / narrow, narrow / wide, then three thirds. On tablets
// (two columns) the seventh tile spans the full row.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-4", "lg:col-span-4", "md:col-span-2 lg:col-span-4"];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-pad max-lg:cv-auto relative">
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
              {/* Each tile links to its service page; focus gets the same spotlight and icon motion as hover. */}
              <Link
                href={`/services/${s.slug}`}
                className="spotlight card group flex h-full min-h-56 flex-col rounded-[24px] p-7 sm:p-8 lg:min-h-64"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-fg-2 transition-colors duration-[var(--dur-fast)] group-hover:text-fg">
                    <AnimatedIcon name={s.icon} />
                  </span>
                  <span className="label-mono text-fg-3">{s.stage}</span>
                </div>
                <div className="mt-auto pt-10">
                  <h3 className="text-[26px] font-semibold leading-tight tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-fg-2">{s.line}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[15px] font-semibold text-fg-2 transition-colors group-hover:text-accent">
                    How it works <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
