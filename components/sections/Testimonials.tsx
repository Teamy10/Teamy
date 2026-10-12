import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoSlot } from "@/components/ui/TodoSlot";
import { isFilled, siteConfig, type Testimonial } from "@/content/site";
import { publicFileExists, showPlaceholders } from "@/lib/assets";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

const ready = (t: Testimonial) => t.permissionGiven && isFilled(t.quote) && isFilled(t.name);

function Avatar({ t, size }: { t: Testimonial; size: number }) {
  return t.photo && publicFileExists(t.photo) ? (
    <Image src={t.photo} alt={t.name} width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-sm text-fg ring-1 ring-line-strong"
      style={{ width: size, height: size }}
    >
      {initials(t.name)}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <p className="flex gap-1 text-accent" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`size-4 ${i < rating ? "fill-current" : "text-fg-3"}`} aria-hidden="true" />
      ))}
    </p>
  );
}

function Byline({ t, size }: { t: Testimonial; size: number }) {
  return (
    <figcaption className="flex items-center gap-4">
      <Avatar t={t} size={size} />
      <span className="min-w-0">
        <span className="block font-semibold">{t.name}</span>
        <span className="label-mono block text-fg-3">
          {t.role}, {t.brand}
        </span>
      </span>
      {t.link && (
        <a
          href={t.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-12 shrink-0 items-center gap-1 text-[15px] font-semibold text-fg-2 hover:text-fg"
        >
          {t.brand} <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">(opens the {t.brand} store in a new tab)</span>
        </a>
      )}
    </figcaption>
  );
}

function FeaturedCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card relative grid gap-10 overflow-hidden rounded-[32px] p-7 sm:p-12 lg:grid-cols-12 lg:gap-8">
      <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-16 font-display text-[16rem] font-semibold leading-none text-fg/[0.04]">
        &rdquo;
      </span>
      <div className="relative lg:col-span-8">
        {t.rating && <Stars rating={t.rating} />}
        <blockquote className="mt-6 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-light leading-[1.2] tracking-[-0.03em]">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>
      <div className="relative self-end border-t border-line pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <Byline t={t} size={56} />
      </div>
    </figure>
  );
}

function SmallCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card flex h-full flex-col rounded-[24px] p-6 sm:p-8">
      {t.rating && <Stars rating={t.rating} />}
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
      <div className="mt-6 border-t border-line pt-5">
        <Byline t={t} size={44} />
      </div>
    </figure>
  );
}

/**
 * Real testimonials only (permissionGiven + real quote). One featured card plus a grid
 * (a swipeable row on mobile), so a single quote still looks intentional. Unfilled slots
 * show as placeholders in dev only.
 */
export function Testimonials() {
  const all = siteConfig.testimonials;
  const items = all.filter(ready);
  const todo = all.filter((t) => !ready(t));
  if (items.length === 0 && !showPlaceholders) return null;
  const featured = items.find((t) => t.featured) ?? items[0];
  const rest = items.filter((t) => t !== featured);

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-pad relative">
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading id="testimonials-title" title="Founders on working with Teamy." emphasis="working with Teamy." />
        {featured && (
          <Reveal className="mt-14">
            <FeaturedCard t={featured} />
          </Reveal>
        )}
      </div>
      {(rest.length > 0 || (showPlaceholders && todo.length > 0)) && (
        <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:container-page md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal as="li" key={`${t.name}-${i}`} delay={i * 0.06} className="w-[85%] shrink-0 snap-center md:w-auto">
              <SmallCard t={t} />
            </Reveal>
          ))}
          {showPlaceholders &&
            todo.map((t) => (
              <li key={`todo-${t.brand}`} className="w-[85%] shrink-0 snap-center md:w-auto">
                <TodoSlot className="h-full">
                  Testimonial slot for <strong>{t.brand}</strong>: add the founder&apos;s own words, name and role in{" "}
                  <code>content/site.ts</code>, then set <code>permissionGiven: true</code>.
                </TodoSlot>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
