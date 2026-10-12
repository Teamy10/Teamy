import { ClientLogo, logoTile } from "@/components/ui/ClientLogo";
import { projects, type Project } from "@/content/projects";
import { siteConfig } from "@/content/site";

function Tile({ project, copy }: { project: Project; copy: boolean }) {
  return (
    <li className={`group grid h-20 w-44 shrink-0 place-items-center rounded-2xl px-5 md:h-24 md:w-52 ${logoTile(project.slug).className} ${copy ? "drift-copy" : ""}`}>
      <ClientLogo project={project} />
    </li>
  );
}

/**
 * Client logo wall: two rows of light tiles drifting in opposite directions (paused on hover,
 * offscreen and with reduced motion, when it becomes a static grid). The moving rows are
 * decorative copies; screen readers get one plain list of the brand names.
 */
export function ClientLogos() {
  const half = Math.ceil(projects.length / 2);
  const rows = [projects.slice(0, half), projects.slice(half)];
  const { facts } = siteConfig;
  return (
    <section aria-labelledby="clients-title" data-loop className="drift-wall relative pb-16 pt-6 md:pb-20 md:pt-8">
      <div className="container-page flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
        <h2 id="clients-title" className="max-w-xl font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-semibold leading-tight tracking-[-0.03em]">
          Brands that trust Teamy with their website.
        </h2>
        <p className="label-mono text-fg-3">
          {facts.projects}+ projects · {facts.years}+ years
        </p>
      </div>
      <ul className="sr-only">
        {projects.map((p) => (
          <li key={p.slug}>{p.name}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-10 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div className={`drift ${r % 2 ? "drift--reverse" : ""}`}>
              {/* Each half holds the row twice, so it's wider than any screen and the loop never shows a gap. */}
              {[0, 1].map((copy) => (
                <ul key={copy} className="drift__half flex shrink-0 gap-4 pr-4">
                  {[...row, ...row].map((p, i) => (
                    <Tile key={`${p.slug}-${i}`} project={p} copy={copy === 1 || i >= row.length} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
