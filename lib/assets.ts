import { existsSync } from "node:fs";
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

/** Placeholders and TODO slots are visible only in `npm run dev`, never on the live site. */
export const showPlaceholders = process.env.NODE_ENV !== "production";
