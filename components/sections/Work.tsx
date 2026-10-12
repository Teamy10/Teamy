import { ArrowUpRight, Lock } from "lucide-react";
import type { CSSProperties } from "react";
import { FestiveDivider } from "@/components/festive/Motifs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { assets, liveProjects, type Project } from "@/content/projects";
import { isFilled } from "@/content/site";
import { showPlaceholders, workShotSize } from "@/lib/assets";

/** A TODO field: hidden on the live site, flagged in dev. */
function Field({ value, className }: { value: string; className: string }) {
  if (isFilled(value)) return <p className={className}>{value}</p>;
  return showPlaceholders ? <p className={`${className} !text-accent`}>{value}</p> : null;
}

/** Until the screenshot is captured: a quiet wireframe of a homepage. */
function PageSkeleton({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-4 p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-fg/10" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-2.5 w-10 rounded bg-fg/10" />
          ))}
        </div>
      </div>
      <div className="grid flex-1 place-items-center rounded-xl bg-fg/[0.05]">
        <span className="font-display text-2xl font-semibold tracking-[-0.03em] text-fg-3">{label}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="aspect-[4/3] rounded-lg bg-fg/[0.05]" />
        ))}
      </div>
    </div>
  );
}

/**
 * A project in a browser frame. The full-page screenshot scrolls top → bottom on hover or keyboard
 * focus (desktop), or while the card is on screen (touch), then returns. The whole card opens the
 * live site in a new tab.
 */
export function WorkCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const shot = workShotSize(project.slug);
  const host = new URL(project.url).hostname.replace(/^www\./, "");
  // How many frame-heights tall the page is (frame is 16:10), so long pages scroll for longer.
  const screens = shot ? (shot.height / shot.width) * 1.6 : 0;
  const style = { "--work-dur": `${Math.min(14, Math.max(3, screens * 0.85)).toFixed(1)}s` } as CSSProperties;
  const { screenshot, screenshotSmall: small } = assets(project.slug);

  return (
    <article className="work-card group relative rounded-[24px] focus-within:outline-2 focus-within:outline-offset-8 focus-within:outline-accent">
      <div className="card overflow-hidden rounded-[22px] transition-[translate,border-color] duration-[var(--dur-base)] ease-quart group-hover:-translate-y-1 group-hover:border-line-strong">
        <div aria-hidden="true" className="flex h-10 items-center gap-3 border-b border-line px-4">
          <span className="flex gap-1.5">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="size-2.5 rounded-full bg-fg/15" />
            ))}
          </span>
          <span className="mx-auto flex h-6 min-w-0 items-center gap-1.5 rounded-full bg-surface-2 px-3 font-mono text-[11.5px] text-fg-3">
            <Lock className="size-3 shrink-0" />
            <span className="truncate">{host}</span>
          </span>
          <span className="w-[42px]" />
        </div>
        <div data-loop className="work-viewport relative aspect-[16/10] overflow-hidden bg-surface-2" style={style}>
          {shot ? (
            // Pre-optimised WebP from `npm run capture:work`; next/image would re-encode these very tall images.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={small}
              srcSet={`${small} 600w, ${screenshot} 1200w`}
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              width={shot.width}
              height={shot.height}
              alt={`${project.name} ecommerce website, full homepage`}
              loading="lazy"
              decoding="async"
              className="work-shot"
            />
          ) : (
            <PageSkeleton label={project.name} />
          )}
        </div>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6 px-1">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <Field value={project.category} className="label-mono text-fg-3" />
            {project.sharkTankSeason && (
              <span className="label-mono rounded-full bg-accent/12 px-2.5 py-1 text-accent ring-1 ring-inset ring-accent/30">
                Shark Tank India · S{project.sharkTankSeason}
              </span>
            )}
          </div>
          <H className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="outline-none after:absolute after:inset-0 after:rounded-[24px] after:content-['']"
            >
              {project.name}
              <span className="sr-only"> (opens the live site in a new tab)</span>
            </a>
          </H>
          <Field value={project.description} className="mt-2 max-w-md text-fg-2" />
        </div>
        <span aria-hidden="true" className="mt-6 inline-flex shrink-0 items-center gap-1 text-[15px] font-semibold text-fg-2 transition-colors group-hover:text-fg">
          Visit site
          <ArrowUpRight className="size-4 transition-transform duration-[var(--dur-fast)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

/** "Our work": one card per live entry in content/projects.ts. */
export function Work() {
  if (liveProjects.length === 0) return null;
  return (
    <section id="work" aria-labelledby="work-title" className="section-pad max-lg:cv-auto relative">
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading
          id="work-title"
          title="Our work."
          emphasis="work."
          sub="Live websites for brands across fashion, jewellery, food, home décor and more. Each card scrolls through the real homepage; open one to see it live."
        />
        <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {liveProjects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
              <WorkCard project={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
