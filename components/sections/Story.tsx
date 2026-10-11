import { Storefront } from "@/components/mockup/Storefront";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";

/**
 * "Idea → live in 7 days".
 * Desktop with motion: the stage pins and scrubs; each day lights up while its piece of the
 * storefront builds in (see story() in lib/motion-runtime.ts).
 * Mobile, reduced motion, or before the runtime loads: a clean vertical stack, fully visible.
 */
export function Story() {
  const { story } = siteConfig;
  return (
    <section id="story" aria-labelledby="story-title" className="section-pad relative">
      <div className="container-page">
        <SectionHeading id="story-title" title={story.title} emphasis={story.emphasis} sub={story.sub} />
      </div>

      <div data-story-stage className="container-page mt-14 lg:mt-0 lg:flex lg:min-h-[100svh] lg:items-center">
        <div className="grid w-full gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Days */}
          <div className="relative lg:col-span-5">
            {/* Progress rail (scaled by the runtime; fully drawn otherwise). */}
            <div aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-line">
              <div data-story-rail className="h-full w-full origin-top bg-accent" />
            </div>
            <ol className="relative space-y-7 lg:space-y-4">
              {story.days.map((d, i) => (
                <li key={d.title} data-story-day={d.piece} className="story-day group relative pl-10">
                  <span
                    aria-hidden="true"
                    className="story-dot absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full bg-bg ring-1 ring-line-strong"
                  >
                    <span className="size-[7px] rounded-full bg-accent" />
                  </span>
                  <p className="label-mono text-fg-3">Day {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em] lg:mt-0.5 lg:text-lg">{d.title}</h3>
                  <p className="mt-1 max-w-sm text-fg-2 lg:mt-0 lg:text-[15px] lg:leading-snug">{d.line}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* The storefront that builds itself */}
          <figure className="lg:col-span-7">
            <Reveal>
              <div className="px-6 pb-24 pt-14 sm:px-12 lg:px-10">
                <Storefront variant="story" />
              </div>
            </Reveal>
            <figcaption className="label-mono mt-2 text-center text-fg-3">A typical week, illustrative · invented brand</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
