import { DEFAULT_HERO_NOTE, FESTIVALS } from "@/config/festive";

/*
 * Festive motifs. Everything here is rendered on every build and shown/hidden purely by CSS
 * (rules generated from config/festive.ts), so switching themes never changes layout or
 * causes hydration differences. All decorative: aria-hidden, absolutely positioned.
 */

/** Thin-line rangoli: concentric rings, 16 petals and a dotted ring. Stroke uses the theme's gold. */
function Rangoli({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const dots = Array.from({ length: 32 }, (_, i) => i * 11.25);
  return (
    <svg viewBox="-100 -100 200 200" className={className} fill="none" stroke="var(--hero-a)" strokeWidth="0.6">
      <circle r="96" opacity="0.5" />
      <circle r="78" />
      <circle r="40" />
      <circle r="12" />
      {petals.map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 -40 C 10 -55, 10 -68, 0 -78 C -10 -68, -10 -55, 0 -40 Z" />
      ))}
      {petals.map((a) => (
        <path key={`i${a}`} transform={`rotate(${a + 11.25})`} d="M0 -12 C 5 -20, 5 -30, 0 -40 C -5 -30, -5 -20, 0 -12 Z" opacity="0.7" />
      ))}
      {dots.map((a) => (
        <circle key={`d${a}`} transform={`rotate(${a})`} cy="-87" r="1.3" fill="var(--hero-a)" stroke="none" />
      ))}
    </svg>
  );
}

/** A soft diya: clay bowl, wick and a gently flickering flame. */
function Diya({ className = "", idPrefix }: { className?: string; idPrefix: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className}>
      <defs>
        <radialGradient id={`${idPrefix}-glow`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="var(--hero-a)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--hero-a)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-flame`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff4cf" />
          <stop offset="55%" stopColor="var(--hero-a)" />
          <stop offset="100%" stopColor="var(--glow-a)" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="34" r="34" fill={`url(#${idPrefix}-glow)`} />
      <path className="diya-flame" d="M60 12 C 68 24, 68 36, 60 44 C 52 36, 52 24, 60 12 Z" fill={`url(#${idPrefix}-flame)`} />
      <path d="M14 52 Q 60 92 106 52 Q 92 58 60 58 Q 28 58 14 52 Z" fill="var(--accent)" opacity="0.9" />
      <path d="M14 52 Q 60 60 106 52" stroke="var(--hero-a)" strokeWidth="1.2" fill="none" opacity="0.8" />
    </svg>
  );
}

/** Large, faint motif behind the hero visual. */
export function HeroMotif() {
  return (
    <div aria-hidden="true" className="motif-layer pointer-events-none absolute inset-0 overflow-hidden">
      <div data-motif="rangoli" className="absolute -right-48 -top-24 size-[640px] opacity-[0.16] lg:-right-28 lg:top-10">
        <Rangoli className="motif-spin size-full" />
      </div>
      {/* Desktop only: sits in the hero's bottom padding, clear of text and the phone. */}
      <div data-motif="diya">
        <div className="absolute bottom-6 left-[max(20px,calc((100%-1280px)/2+32px))] hidden w-32 opacity-90 lg:block">
          <Diya idPrefix="diya-hero" className="w-full" />
        </div>
      </div>
    </div>
  );
}

/** Tiny glyph used as the greeting's bullet: rangoli flower, diya, or a plain diamond. */
function NoteGlyph({ motif }: { motif?: "rangoli" | "diya" }) {
  if (motif === "diya") return <Diya idPrefix="diya-note" className="mr-2 inline-block h-4 w-5 -translate-y-0.5" />;
  if (motif === "rangoli")
    return (
      <svg viewBox="-10 -10 20 20" className="mr-2 inline-block size-4 -translate-y-0.5" fill="var(--hero-a)">
        {[0, 45, 90, 135].map((r) => (
          <ellipse key={r} rx="2.2" ry="8" transform={`rotate(${r})`} opacity="0.85" />
        ))}
        <circle r="2.4" fill="var(--bg)" />
      </svg>
    );
  return <span className="mr-2 inline-block size-1.5 -translate-y-0.5 rotate-45 bg-accent" />;
}

/**
 * One-line note under the hero sub-headline. Exactly one shows per theme (the active festival's
 * greeting, or the default note), so the hero has the same height in every theme.
 */
export function FestiveHeroNote() {
  const notes = [
    { id: "default", text: DEFAULT_HERO_NOTE, motif: undefined },
    ...FESTIVALS.filter((f) => f.heroNote).map((f) => ({ id: f.id, text: f.heroNote!, motif: f.motif })),
  ];
  return (
    <>
      {notes.map((n) => (
        <p key={n.id} data-festive={n.id} className="festive-note mt-6 max-w-xl text-[15px] text-fg">
          <span aria-hidden="true">
            <NoteGlyph motif={n.motif} />
          </span>
          {n.text}
        </p>
      ))}
    </>
  );
}

/**
 * Thin ornamental divider pinned to the top edge of a section. Absolutely positioned, so it
 * adds no height; visible only while a festival theme is active.
 */
export function FestiveDivider() {
  return (
    <div aria-hidden="true" className="festive-divider pointer-events-none absolute inset-x-0 top-0 z-10 items-center justify-center gap-3 px-6">
      <span className="h-px max-w-64 flex-1 bg-[linear-gradient(90deg,transparent,var(--hero-a))]" />
      <span className="flex -translate-y-px items-center gap-1.5">
        <span className="size-1 rotate-45 bg-[var(--hero-a)]" />
        <span className="size-2 rotate-45 border border-[var(--hero-a)]" />
        <span className="size-1 rotate-45 bg-[var(--hero-a)]" />
      </span>
      <span className="h-px max-w-64 flex-1 bg-[linear-gradient(270deg,transparent,var(--hero-a))]" />
    </div>
  );
}
