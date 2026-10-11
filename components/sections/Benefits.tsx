import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/site.config";

/** "Why Teamy": four principles in a quiet hairline row. */
export function Benefits() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          title="One team for your whole store."
          emphasis="whole store."
          sub="Design, build, payments, WhatsApp and the fixes after launch. You run the brand; we run the tech."
        />
        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.benefits.map((b, i) => (
            <Reveal
              as="li"
              key={b.title}
              delay={i * 0.08}
              className="border-b border-line py-8 sm:px-6 sm:odd:pl-0 sm:even:border-l lg:border-b-0 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
            >
              <p className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{b.title}</h3>
              <p className="mt-2 text-fg-2">{b.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
