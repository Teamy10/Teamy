import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, type Testimonial } from "@/site.config";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

function Card({ t, featured }: { t: Testimonial; featured: boolean }) {
  return (
    <figure className="spin-border h-full rounded-[32px]">
      <div className="glow-card relative flex h-full flex-col overflow-hidden rounded-[30px] bg-night-2 p-7 text-on-night sm:p-10 [--glow:rgb(200_242_90/0.12)]">
        {/* Oversized quote mark. */}
        <span aria-hidden="true" className="float-slow absolute right-6 top-5 font-display text-[9rem] font-extrabold leading-[0.8] text-accent/15 sm:right-10">
          &ldquo;
        </span>
        {t.rating && (
          <p className="relative flex gap-1 text-accent" role="img" aria-label={`Rated ${t.rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`size-5 ${i < t.rating! ? "fill-current" : "text-line-night"}`} aria-hidden="true" />
            ))}
          </p>
        )}
        <blockquote
          className={`relative mt-6 flex-1 font-display font-bold leading-snug tracking-tight ${
            featured ? "text-[clamp(1.375rem,1.05rem+1.3vw,2.125rem)]" : "text-2xl"
          }`}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <figcaption className="relative mt-8 flex items-center gap-4 border-t border-line-night pt-6">
          {t.photo ? (
            <Image src={t.photo} alt={t.name} width={56} height={56} className="size-14 rounded-full object-cover" />
          ) : (
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-ink" aria-hidden="true">
              {initials(t.name)}
            </span>
          )}
          <span className="min-w-0">
            <span className="block font-display text-xl font-bold">{t.name}</span>
            <span className="block text-on-night-soft">
              {t.role}, {t.brand}
            </span>
          </span>
          {t.link && (
            <a
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${t.brand}`}
              className="ml-auto grid size-12 shrink-0 place-items-center rounded-full text-accent ring-1 ring-line-night"
            >
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          )}
        </figcaption>
      </div>
    </figure>
  );
}

/** Real testimonials only: entries need permissionGiven. Hidden entirely when there are none. */
export function Testimonials() {
  const items = siteConfig.testimonials.filter((t) => t.permissionGiven && t.quote.trim());
  if (items.length === 0) return null;
  const single = items.length === 1;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="on-night section-pad relative overflow-hidden bg-night">
      <div className="aurora opacity-60" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container-page relative">
        <SectionHeading
          id="testimonials-title"
          tone="night"
          align="center"
          title="Don't take our word for it."
          highlight="our word"
        />
        <ul className={`mt-12 grid gap-6 ${single ? "mx-auto max-w-3xl" : "md:grid-cols-2"}`}>
          {items.map((t, i) => (
            <Reveal as="li" key={`${t.name}-${i}`} delay={i * 0.08}>
              <Card t={t} featured={single} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
