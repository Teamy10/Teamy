import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/site.config";

export function Process() {
  const steps = siteConfig.process;
  return (
    <section id="process" aria-labelledby="process-title" className="section-pad relative bg-surface">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          title="From first call to first order."
          highlight="first order."
          sub="Four clear steps, with the same people on WhatsApp from start to finish."
        />
        <div className="relative mt-14">
          {/* Track + a gradient line that draws as you scroll (where supported). Desktop only. */}
          <div aria-hidden="true" className="absolute inset-x-7 top-7 hidden h-1 rounded-full bg-line lg:block">
            <div className="draw-line h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--sky),var(--violet))]" />
          </div>
          <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1}>
                <div className="glow-card surface-card group h-full rounded-[28px] p-6 transition-[translate,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-lift lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-0 lg:hover:translate-y-0 lg:hover:shadow-none">
                  <span className="relative grid size-14 place-items-center rounded-full bg-night font-display text-xl font-bold text-accent ring-8 ring-surface transition-transform duration-500 ease-brand group-hover:scale-110">
                    {i + 1}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-ink-soft">{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
