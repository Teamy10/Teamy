import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-only: does a file exist under /public? Checked at build / render time so components can
 * show a real image or video once the owner uploads it, and a tasteful skeleton until then.
 */
export function publicFileExists(publicPath: string): boolean {
  try {
    return existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
  } catch {
    return false;
  }
}

export type ShotSize = { width: number; height: number };

/**
 * Server-only: pixel size of a project's full-page screenshot, from public/work/manifest.json
 * (written by `npm run capture:work`). Null until the screenshot has been captured.
 */
export function workShotSize(slug: string): ShotSize | null {
  try {
    const manifest = JSON.parse(readFileSync(join(process.cwd(), "public", "work", "manifest.json"), "utf8")) as Record<string, ShotSize>;
    const size = manifest[slug];
    return size && publicFileExists(`/work/${slug}.webp`) ? { width: size.width, height: size.height } : null;
  } catch {
    return null;
  }
}

export type ClientLogo = { file: string; width: number; height: number; tone: "light" | "dark"; opaque: boolean };

/**
 * Server-only: a client's logo from public/logos/clients/manifest.json (written by
 * `npm run capture:logos`). Null until the logo exists, so the wall falls back to the brand name.
 */
export function clientLogo(slug: string): ClientLogo | null {
  try {
    const manifest = JSON.parse(readFileSync(join(process.cwd(), "public", "logos", "clients", "manifest.json"), "utf8")) as Record<string, ClientLogo>;
    const logo = manifest[slug];
    return logo && publicFileExists(logo.file) ? logo : null;
  } catch {
    return null;
  }
}

/** Placeholders and TODO slots are visible only in `npm run dev`, never on the live site. */
export const showPlaceholders = process.env.NODE_ENV !== "production";
