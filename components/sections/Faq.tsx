import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isFilled, type Faq as FaqItem } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/schema";

/** Answers still containing "TODO" are left out (on the page and in the schema). */
export const readyFaqs = (faqs: readonly FaqItem[]) => faqs.filter((f) => isFilled(f.q) && isFilled(f.a) && !f.a.includes("TODO"));

/**
 * FAQ accordion built on <details>/<summary>: keyboard and screen-reader friendly with zero JS.
 * Emits matching FAQPage schema.
 */
export function Faq({
  faqs,
  id = "faq",
  title = "Questions founders ask us.",
  emphasis = "ask us.",
  headingLevel = "h2",
}: {
  faqs: readonly FaqItem[];
  id?: string;
  title?: string;
  emphasis?: string;
  headingLevel?: "h2" | "h3";
}) {
  const items = readyFaqs(faqs);
  if (items.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-pad">
      <JsonLd data={faqSchema(items)} />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          {headingLevel === "h2" ? (
            <SectionHeading id={`${id}-title`} title={title} emphasis={emphasis} size="m" />
          ) : (
            <h3 id={`${id}-title`} className="display-m">
              {title}
            </h3>
          )}
        </div>
        <Reveal className="lg:col-span-8">
          <ul className="border-t border-line">
            {items.map((f) => (
              <li key={f.q} className="border-b border-line">
                <details className="faq group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus
                      aria-hidden="true"
                      className="size-5 shrink-0 text-fg-3 transition-transform duration-[var(--dur-fast)] ease-quart group-open:rotate-45 group-open:text-accent"
                    />
                  </summary>
                  <p className="max-w-2xl pb-6 pr-10 text-fg-2">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
