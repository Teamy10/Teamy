import type { Project } from "@/content/projects";
import { clientLogo } from "@/lib/assets";

/** Tile colours for a logo: light tiles, or dark ones for white / gold logos made for dark headers. */
export function logoTile(slug: string) {
  return clientLogo(slug)?.tone === "light"
    ? { dark: true, className: "bg-[#14161b] ring-1 ring-inset ring-white/10 text-[#f3f4f6]" }
    : { dark: false, className: "bg-[#f5f4f0] text-[#16181d]" };
}

/**
 * A client's logo for the logo tiles (pair it with logoTile() for the tile colours). Sized by area,
 * not height, so a wide wordmark and a compact mark look equally heavy. Falls back to the brand
 * name until the logo file exists.
 */
export function ClientLogo({ project, mono = true, area = 4600 }: { project: Project; mono?: boolean; area?: number }) {
  const logo = clientLogo(project.slug);
  if (!logo) {
    return <span className="font-display text-xl font-semibold tracking-[-0.02em]">{project.name}</span>;
  }
  const aspect = logo.width / logo.height;
  const height = Math.round(Math.min(46, Math.max(18, Math.sqrt(area / aspect))));
  const classes = ["client-logo", mono && "client-logo--mono", logo.tone === "light" ? "client-logo--light" : logo.opaque && "client-logo--opaque"]
    .filter(Boolean)
    .join(" ");
  return (
    // Pre-optimised small WebP from `npm run capture:logos`.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.file}
      alt={`${project.name} logo`}
      width={logo.width}
      height={logo.height}
      loading="lazy"
      decoding="async"
      className={classes}
      style={{ height, width: "auto" }}
    />
  );
}
