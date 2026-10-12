/**
 * Shared helpers for the capture scripts (screenshots, logos, videos of client sites).
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "..");
export const publicDir = join(root, "public");

/** CLI filter: `npm run capture:work -- zoff kimti` captures only those slugs. */
export function pickProjects(all) {
  const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const picked = only.length ? all.filter((p) => only.includes(p.slug)) : all;
  if (picked.length === 0) {
    console.error(`No matching projects. Slugs: ${all.map((p) => p.slug).join(", ")}`);
    process.exit(1);
  }
  return picked;
}

export async function readJson(path, fallback = {}) {
  return JSON.parse(await readFile(path, "utf8").catch(() => JSON.stringify(fallback)));
}

/** Loads a site and gets it ready to capture: lazy content loaded, pop-ups and cookie bars hidden. */
export async function preparePage(page, url, { scroll = true, maxHeight = 14000 } = {}) {
  await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  if (scroll) {
    // Scroll to the bottom in steps so lazy images and scroll-reveal content load, then go back up.
    await page.evaluate(async (max) => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y < Math.min(document.documentElement.scrollHeight, max); y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 350));
      }
      window.scrollTo(0, 0);
    }, maxHeight);
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  }
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  await hidePopups(page);
}

/** Hides sign-up modals, their backdrops, cookie bars and chat bubbles that would cover the page. */
export async function hidePopups(page) {
  await page.keyboard.press("Escape").catch(() => {});
  await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.position !== "fixed") continue;
      const r = el.getBoundingClientRect();
      const covers = r.width * r.height > vw * vh * 0.25;
      const cookie = /cookie|consent/i.test(el.textContent ?? "") && r.height < vh * 0.6;
      // Floating chat / WhatsApp bubbles in the bottom corners.
      const bubble = r.width < 180 && r.height < 180 && r.bottom > vh - 220 && (r.left < 120 || r.right > vw - 120);
      if (covers || cookie || bubble) el.style.setProperty("display", "none", "important");
    }
    // Modals often lock scrolling, which would cut a full-page screenshot short.
    for (const el of [document.documentElement, document.body]) el.style.setProperty("overflow", "visible", "important");
  });
  await page.waitForTimeout(300);
}

/**
 * Resizes / crops a PNG and encodes WebP with the browser's own encoder (no image library needed).
 * `jobs`: [{ width, cropHeight? }] → returns [{ width, height, data: base64 }].
 */
export async function encodeWebp(encoderPage, png, jobs, quality = 0.8) {
  return encoderPage.evaluate(
    async ({ b64, jobs, quality }) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      return jobs.map(({ width, cropHeight }) => {
        const srcH = cropHeight ? Math.min(cropHeight, img.naturalHeight) : img.naturalHeight;
        const height = Math.round((srcH * width) / img.naturalWidth);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, img.naturalWidth, srcH, 0, 0, width, height);
        return { width, height, data: canvas.toDataURL("image/webp", quality).split(",")[1] };
      });
    },
    { b64: png.toString("base64"), jobs, quality },
  );
}
