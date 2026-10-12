import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { FestiveDivider } from "@/components/festive/Motifs";
import { PhoneFrame, StoreSkeleton } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, type PortfolioItem } from "@/content/site";
import { publicFileExists } from "@/lib/assets";

export function PortfolioCard({ item, headingLevel = "h3" }: { item: PortfolioItem; headingLevel?: "h2" | "h3" }) {
  const hasImage = publicFileExists(item.image);
  const H = headingLevel;
  return (
    <article className="card grid h-full gap-8 overflow-hidden rounded-[28px] p-6 sm:p-8 md:grid-cols-12 md:items-center md:gap-6">
      <div className="md:col-span-5">
        <PhoneFrame>
          {hasImage ? (
            <Image
              src={item.image}
              alt={`${item.name} storefront on a phone`}
              fill
              sizes="280px"
              className="object-cover object-top"
            />
          ) : (
            <StoreSkeleton label={item.name} />
          )}
        </PhoneFrame>
      </div>
      <div className="md:col-span-7">
        <p className="label-mono text-fg-3">{item.category}</p>
        <H className="mt-3 display-m">{item.name}</H>
        <p className="mt-4 text-fg-2">{item.description}</p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label={`What we built for ${item.name}`}>
          {item.tags.map((t) => (
            <li key={t} className="flex items-center gap-2 text-[15px] text-fg">
              <span aria-hidden="true" className="size-1.5 rotate-45 bg-accent" />
              {t}
            </li>
          ))}
        </ul>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-anim [--u-rest:0.35] mt-8 inline-flex min-h-12 items-center gap-1.5 font-semibold text-fg"
        >
          Visit the {item.name} store <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}

/** "Stores we've built": one large card per entry in content/site.ts → portfolio. */
export function Portfolio() {
  const items = siteConfig.portfolio;
  if (items.length === 0) return null;
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="section-pad relative">
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="portfolio-title"
          title="Stores we've built."
          emphasis="built."
          sub="Live stores we designed and built for founders selling from India to the world."
        />
        <ul className="mt-16 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal as="li" key={item.name} delay={(i % 2) * 0.08}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
