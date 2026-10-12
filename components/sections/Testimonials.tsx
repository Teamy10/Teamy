import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import { FestiveDivider } from "@/components/festive/Motifs";
import { buttonClass } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
/** A quote waiting for the client's OK. It never shows on the site, only in the dev approval panel. */
const draft = (t: Testimonial) => !ready(t) && isFilled(t.quote);

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

/** From this many real testimonials, they show as a drifting wall instead of a carousel. */
const WALL_FROM = 6;

/** A compact review card for the wall: photo or initials, name, stars, role and the quote. */
function WallCard({ t, copy }: { t: Testimonial; copy: boolean }) {
  const role = [t.role, t.company].filter(isFilled).join(", ");
  return (
    <li className={`flex w-[320px] shrink-0 gap-4 rounded-[28px] bg-surface p-5 ring-1 ring-inset ring-line sm:w-[420px] ${copy ? "drift-copy" : ""}`}>
      <Avatar t={t} size={56} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold">{t.name}</span>
          {t.rating && <Stars rating={t.rating} />}
        </div>
        {role && <p className="label-mono mt-1 text-fg-3">{role}</p>}
        <p className="mt-2 line-clamp-8 text-[15px] leading-relaxed text-fg-2">&ldquo;{t.quote}&rdquo;</p>
      </div>
    </li>
  );
}

/**
 * Two rows drifting in opposite directions (paused on hover, offscreen and with reduced motion,
 * when it becomes a static grid). The moving rows are decorative copies; screen readers get one
 * plain list with every quote in full.
 */
function Wall({ items }: { items: Testimonial[] }) {
  const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];
  const card = (t: Testimonial, key: string, copy: boolean) => <WallCard key={key} t={t} copy={copy} />;
  return (
    <>
      <ul className="sr-only">
        {items.map((t) => (
          <li key={t.name}>
            <blockquote>{t.quote}</blockquote> {t.name}, {[t.role, t.company].filter(isFilled).join(", ")}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" data-loop className="drift-wall mt-12 space-y-5 [--drift-dur:140s] [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div className={`drift ${r % 2 ? "drift--reverse" : ""}`}>
              {/* Each half holds the row twice, so it's wider than any screen and the loop never shows a gap. */}
              {[0, 1].map((copy) => (
                <ul key={copy} className="drift__half flex shrink-0 gap-5 pr-5">
                  {[...row, ...row].map((t, i) => card(t, `${copy}-${i}`, copy === 1 || i >= row.length))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** The WhatsApp message that sends a client their draft review to approve (or asks for their own words). */
function approvalMessage(t: Testimonial) {
  const hi = isFilled(t.name) ? `Hi ${t.name.split(" ")[0]}!` : "Hi!";
  const at = isFilled(t.company) ? ` at ${t.company}` : "";
  const brand = isFilled(t.company) ? t.company : "company";
  const ask = isFilled(t.quote)
    ? [
        `We're adding client reviews to the new ${siteConfig.brand} website, and drafted a short one from our work together:`,
        `"${t.quote}"`,
        "If it sounds right, just reply OK. Feel free to change anything, or send your own words instead.",
      ]
    : [`We're adding client reviews to the new ${siteConfig.brand} website. Would you write two or three lines about working with us?`];
  return [
    `${hi} Hope all's well${at}.`,
    ...ask,
    ["Could you also send:", "• your name and role, as you'd like them shown", "• a photo (optional)", "• a rating out of 5"].join("\n"),
    `Your OK means we can show this review on ${new URL(siteConfig.url).host.replace(/^www\./, "")} with your name, role and ${brand}. Thank you!`,
  ].join("\n\n");
}

/**
 * In dev only: the reviews waiting for a client's OK, each with a WhatsApp button that opens the
 * chat picker with the approval request written. None of it is on the site, here or live.
 */
function ApprovalKit({ pending }: { pending: Testimonial[] }) {
  return (
    <div className="container-page">
      <details className="mt-10 rounded-[28px] border border-dashed border-accent/50 p-5 text-[15px] text-fg-2 sm:p-7">
        <summary className="cursor-pointer font-semibold text-fg">
          <span className="label-mono mr-3 text-accent">Dev only</span>
          Get {pending.length} reviews approved on WhatsApp
        </summary>
        <p className="mt-4 max-w-3xl">
          These aren&apos;t on the site. Each button opens WhatsApp with the message written: pick the client&apos;s chat and send.
          When they reply OK, set <code>permissionGiven: true</code> with the name, role and rating they gave in{" "}
          <code>content/testimonials.ts</code>. From {WALL_FROM} approved reviews, the section becomes the two-row wall.
        </p>
        <ul className="mt-5 divide-y divide-line">
          {pending.map((t, i) => (
            <li key={i} className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
              <span className="min-w-0 flex-1 basis-56">
                <strong className="block text-fg">{[t.name, t.company].filter(isFilled).join(", ")}</strong>
                {draft(t) ? <q className="mt-1 block text-fg-3">{t.quote}</q> : "Needs their own words"}
              </span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(approvalMessage(t))}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("secondary")}
              >
                <WhatsAppIcon className="size-5" /> {draft(t) ? "Send for approval" : "Ask for a review"}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

/**
 * Client testimonials from content/testimonials.ts: clients' own words, or drafts they approved.
 * One testimonial shows as a single large card, two to five as a swipeable, keyboard-friendly
 * carousel, and six or more as a drifting wall. Dev shows exactly what's live, plus the approval
 * panel for everything still waiting.
 */
export function Testimonials() {
  const items = testimonials.filter(ready);
  const pending = showPlaceholders ? testimonials.filter((t) => !ready(t)) : [];
  if (items.length === 0 && pending.length === 0) return null;
  const wall = items.length >= WALL_FROM;

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
      </div>
      {wall ? (
        <Wall items={items} />
      ) : items.length > 0 ? (
        <div className="container-page">
          <Reveal className="mt-12">
            {items.length === 1 ? (
              <FeaturedCard t={items[0]!} />
            ) : (
              <Carousel label="Client testimonials" item="testimonial">
                {items.map((t) => (
                  <li key={t.name} className={slide}>
                    <Card t={t} />
                  </li>
                ))}
              </Carousel>
            )}
          </Reveal>
        </div>
      ) : null}
      {pending.length > 0 && <ApprovalKit pending={pending} />}
    </section>
  );
}
