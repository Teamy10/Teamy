import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoSlot } from "@/components/ui/TodoSlot";
import { isFilled, siteConfig } from "@/content/site";
import { testimonials, type Testimonial } from "@/content/testimonials";
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
    <Image src={t.photo} alt="" width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
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
  const role = [t.role, t.company].filter(isFilled).join(", ");
  return (
    <figcaption className="flex items-center gap-4">
      <Avatar t={t} size={size} />
      <span className="min-w-0">
        <span className="block font-semibold">{t.name}</span>
        {role && <span className="label-mono block text-fg-3">{role}</span>}
      </span>
      {t.link && (
        <a
          href={t.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-12 shrink-0 items-center gap-1 text-[15px] font-semibold text-fg-2 hover:text-fg"
        >
          {t.company} <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">(opens the {t.company} site in a new tab)</span>
        </a>
      )}
    </figcaption>
  );
}

/** A single testimonial on its own: one large, quiet card. */
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

/** One card in the carousel. */
function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="card relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 sm:p-10">
      <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-10 font-display text-[10rem] font-semibold leading-none text-fg/[0.04]">
        &rdquo;
      </span>
      {t.rating && <Stars rating={t.rating} />}
      <blockquote className="relative mt-6 flex-1 font-display text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] font-light leading-[1.3] tracking-[-0.02em]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="mt-8 border-t border-line pt-6">
        <Byline t={t} size={48} />
      </div>
    </figure>
  );
}

const slide = "w-[86%] shrink-0 snap-start sm:w-[calc(70%-12px)] lg:w-[calc(50%-12px)]";

/**
 * Client testimonials from content/testimonials.ts, real words only. One testimonial shows as a
 * single large card; two or more become a swipeable, keyboard-friendly carousel. Unfilled entries
 * show as placeholders in dev only.
 */
export function Testimonials() {
  const items = testimonials.filter(ready);
  const todo = showPlaceholders ? testimonials.filter((t) => !ready(t)) : [];
  if (items.length === 0 && todo.length === 0) return null;
  const single = items.length === 1 && todo.length === 0;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="section-pad cv-auto relative">
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          title="What our clients say."
          emphasis="clients say."
          sub={
            <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex text-accent" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <span>
                <strong className="font-semibold text-fg">{siteConfig.facts.rating}/5</strong> average rating from our clients
              </span>
              {isFilled(siteConfig.facts.reviewsUrl) && (
                <a href={siteConfig.facts.reviewsUrl} target="_blank" rel="noopener noreferrer" className="underline-anim inline-flex items-center gap-1 font-semibold text-fg">
                  Read the reviews <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              )}
            </span>
          }
        />
        <Reveal className="mt-12">
          {single ? (
            <FeaturedCard t={items[0]!} />
          ) : (
            <Carousel label="Client testimonials" item="testimonial">
              {items.map((t) => (
                <li key={t.name} className={slide}>
                  <Card t={t} />
                </li>
              ))}
              {todo.map((t, i) => (
                <li key={`todo-${i}`} className={slide}>
                  <TodoSlot className="h-full min-h-64">
                    Testimonial from <strong>{isFilled(t.name) ? t.name : t.company}</strong>: paste their exact words (and any
                    missing name, role or company) in <code>content/testimonials.ts</code>, then set{" "}
                    <code>permissionGiven: true</code>.
                  </TodoSlot>
                </li>
              ))}
            </Carousel>
          )}
        </Reveal>
      </div>
    </section>
  );
}
