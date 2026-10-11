import { Star } from "lucide-react";
import Image from "next/image";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig, type Testimonial } from "@/site.config";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-auto max-w-4xl text-center">
      {t.rating && (
        <p className="flex justify-center gap-1 text-accent" role="img" aria-label={`Rated ${t.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`size-4 ${i < t.rating! ? "fill-current" : "text-fg-3"}`} aria-hidden="true" />
          ))}
        </p>
      )}
      <blockquote className="mt-8 font-display text-[clamp(1.6rem,1.1rem+1.8vw,2.75rem)] font-light leading-[1.2] tracking-[-0.03em] text-fg">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-10 flex items-center justify-center gap-4">
        {t.photo ? (
          <Image src={t.photo} alt={t.name} width={48} height={48} className="size-12 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-surface-2 font-mono text-sm text-fg ring-1 ring-line-strong">
            {initials(t.name)}
          </span>
        )}
        <span className="text-left">
          <span className="block font-semibold">{t.name}</span>
          <span className="label-mono block text-fg-3">
            {t.role}, {t.brand}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Real testimonials only (permissionGiven). Hidden entirely when there are none. */
export function Testimonials() {
  const items = siteConfig.testimonials.filter((t) => t.permissionGiven && t.quote.trim());
  if (items.length === 0) return null;
  return (
    <section id="testimonials" aria-label="What founders say" className="section-pad relative">
      <FestiveDivider />
      <div className="container-page space-y-24">
        {items.map((t, i) => (
          <Reveal key={`${t.name}-${i}`}>
            <Quote t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
