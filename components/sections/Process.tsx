import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";

// Connector through the four step nodes (desktop). Drawn by scaling a clip rect (transform only).
const PATH = "M24 24 C 120 2, 230 2, 336 24 S 552 46, 648 24 S 864 2, 960 24";

export function Process() {
  const steps = siteConfig.process;
  return (
    <section id="process" aria-labelledby="process-title" data-process className="section-pad max-lg:cv-auto relative">
      <div className="container-page">
        <SectionHeading
          id="process-title"
          title="How we work."
          emphasis="work."
          sub="Discover, design, develop, launch: four clear steps, with the same people on WhatsApp from start to finish."
        />

        <div data-process-steps className="relative mt-16">
          {/* Desktop connector: faint track + accent line, revealed by the runtime (fully drawn without it). */}
          <svg aria-hidden="true" viewBox="0 0 1216 48" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-12 w-full lg:block">
            <defs>
              <clipPath id="process-clip">
                <rect data-process-mask-h x="0" y="0" width="1216" height="48" />
              </clipPath>
            </defs>
            <path d={PATH} stroke="rgb(var(--text-rgb) / 0.12)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            <path d={PATH} stroke="var(--accent)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" clipPath="url(#process-clip)" />
          </svg>
          {/* Mobile connector */}
          <div aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-line lg:hidden">
            <div data-process-mask-v className="h-full w-full origin-top bg-accent" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative pl-16 lg:pl-0">
                <div data-process-step className="process-step">
                  <span className="process-node absolute left-0 top-0 grid size-12 place-items-center rounded-full bg-bg font-mono text-sm font-medium text-fg ring-1 ring-accent lg:relative">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] lg:mt-8">{s.title}</h3>
                  <p className="mt-2 max-w-xs text-fg-2">{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
