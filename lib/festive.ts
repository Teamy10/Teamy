import { DEFAULT_TOKENS, FESTIVALS, type Festival, type ThemeTokens } from "../config/festive";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const IST = "Asia/Kolkata";

/** Calendar date in India time as YYYY-MM-DD (en-CA formats ISO-style). */
export function istDate(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

function isValid(f: Partial<Festival> | null | undefined): f is Festival {
  return (
    !!f &&
    typeof f.id === "string" &&
    /^[a-z0-9-]+$/.test(f.id) &&
    typeof f.start === "string" &&
    typeof f.end === "string" &&
    DATE_RE.test(f.start) &&
    DATE_RE.test(f.end) &&
    f.start <= f.end &&
    !!f.tokens
  );
}

/**
 * The festival active on `now` (IST, inclusive ranges), or null for the default theme.
 * Malformed entries are skipped, and a missing config falls back to default.
 */
export function resolveFestival(now: Date, festivals: readonly Festival[] | null | undefined = FESTIVALS): Festival | null {
  if (!Array.isArray(festivals)) return null;
  const today = istDate(now);
  return festivals.find((f) => isValid(f) && f.start <= today && today <= f.end) ?? null;
}

/** Theme id for `<html data-theme>`. */
export function resolveThemeId(now: Date, festivals?: readonly Festival[] | null): string {
  return resolveFestival(now, festivals)?.id ?? "default";
}

const TOKEN_VARS: Record<keyof ThemeTokens, string> = {
  night: "--night",
  night2: "--night-2",
  lineNight: "--line-night",
  onNightSoft: "--on-night-soft",
  accent: "--accent",
  accentHover: "--accent-hover",
  accentInk: "--accent-ink",
  shine: "--shine",
  glowA: "--violet",
  glowB: "--sky",
  support: "--support",
  bg: "--bg",
};

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

function declarations(t: ThemeTokens): string {
  const vars = (Object.keys(TOKEN_VARS) as (keyof ThemeTokens)[]).map((k) => `${TOKEN_VARS[k]}:${t[k]}`);
  // RGB channel versions for translucent glows: rgb(var(--accent-rgb) / 0.3).
  vars.push(
    `--night-rgb:${hexToRgb(t.night)}`,
    `--accent-rgb:${hexToRgb(t.accent)}`,
    `--violet-rgb:${hexToRgb(t.glowA)}`,
    `--sky-rgb:${hexToRgb(t.glowB)}`,
  );
  return vars.join(";");
}

/** CSS for every theme, generated from the config so dates and colours live in one file. */
export function themeCss(festivals: readonly Festival[] = FESTIVALS): string {
  const valid = festivals.filter(isValid);
  const rules = [
    `:root{${declarations(DEFAULT_TOKENS)}}`,
    // Festive-only elements (greeting, motifs, dividers) are hidden unless their theme is active.
    `[data-festive],[data-motif],.festive-divider{display:none}`,
    `:root:not([data-theme]) [data-festive="default"],:root[data-theme="default"] [data-festive="default"]{display:block}`,
  ];
  for (const f of valid) {
    const on = `:root[data-theme="${f.id}"]`;
    rules.push(
      `${on}{${declarations(f.tokens)}}`,
      `${on} [data-festive="${f.id}"],${on} [data-motif="${f.motif}"]{display:block}`,
      `${on} .festive-divider{display:flex}`,
    );
  }
  return rules.join("\n");
}

/**
 * Tiny inline script for <head>. Re-resolves the theme on the visitor's device before first paint,
 * so a cached page never shows yesterday's theme, and swaps the favicon. With `allowPreview`
 * (dev builds only) a `?theme=` query param overrides the date.
 */
export function themeBootScript(festivals: readonly Festival[] = FESTIVALS, allowPreview = false): string {
  const data = festivals.filter(isValid).map((f) => ({ id: f.id, s: f.start, e: f.end, i: f.favicon ?? null }));
  const ids = JSON.stringify(["default", ...data.map((d) => d.id)]);
  return `(function(){try{var F=${JSON.stringify(data)};var t=new Intl.DateTimeFormat("en-CA",{timeZone:"${IST}",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());var id="default",ic=null;for(var k=0;k<F.length;k++){if(F[k].s<=t&&t<=F[k].e){id=F[k].id;ic=F[k].i;break}}${
    allowPreview
      ? `var q=new URLSearchParams(location.search).get("theme");if(q&&${ids}.indexOf(q)>-1){id=q;ic=null;for(var j=0;j<F.length;j++){if(F[j].id===q)ic=F[j].i}}`
      : ""
  }var d=document.documentElement;d.setAttribute("data-theme",id);if(ic){var l=document.querySelector('link[rel="icon"]');if(l)l.setAttribute("href",ic)}}catch(e){}})();`;
}
