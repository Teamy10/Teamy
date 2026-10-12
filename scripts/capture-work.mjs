#!/usr/bin/env node
/**
 * Screenshots of every live client site in content/projects.ts, for the "Our work" cards and the hero:
 *
 *   public/work/<slug>.webp          full homepage, 1200px wide (desktop / retina)
 *   public/work/<slug>-600.webp      the same, 600px wide (phones)
 *   public/work/<slug>-top.webp      the first desktop screen, 1200×750 (+ -top-600) (hero browser frame)
 *   public/work/<slug>-mobile.webp   the first phone screen, 780×1688 (+ -mobile-390) (hero phone frame)
 *   public/work/manifest.json        pixel sizes, so cards reserve space and pace the scroll
 *
 * Usage: npm run capture:work            (every live project)
 *        npm run capture:work -- zoff     (only the given slugs)
 * Needs Chromium for Playwright once: npx playwright install chromium
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import { liveProjects } from "../content/projects.ts";
import { encodeWebp, hidePopups, pickProjects, preparePage, publicDir, readJson } from "./capture-helpers.mjs";

const outDir = join(publicDir, "work");
const manifestPath = join(outDir, "manifest.json");
/** Stop at this page height (CSS px) so endless pages don't produce enormous images. */
const MAX_HEIGHT = 14000;

const targets = pickProjects(liveProjects);
await mkdir(outDir, { recursive: true });
const manifest = await readJson(manifestPath);

const browser = await chromium.launch();
// Reduced motion makes most sites skip their entrance animations, so nothing is caught mid-fade.
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "en-IN", reducedMotion: "reduce" });
const phone = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  locale: "en-IN",
  reducedMotion: "reduce",
});
const encoder = await desktop.newPage();
let failed = 0;

for (const project of targets) {
  process.stdout.write(`${project.name} … `);
  const page = await desktop.newPage();
  try {
    await preparePage(page, project.url, { maxHeight: MAX_HEIGHT });
    await hidePopups(page); // some pop-ups only open a few seconds after load
    const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const height = Math.min(fullHeight, MAX_HEIGHT);
    const png = await page.screenshot({
      type: "png",
      fullPage: true,
      // Very long pages (endless product grids) are cut at MAX_HEIGHT.
      clip: fullHeight > MAX_HEIGHT ? { x: 0, y: 0, width: 1440, height } : undefined,
      animations: "disabled",
    });
    const [full, small, top, topSmall] = await encodeWebp(encoder, png, [{ width: 1200 }, { width: 600 }, { width: 1200, cropHeight: 900 }, { width: 600, cropHeight: 900 }]);
    await writeFile(join(outDir, `${project.slug}.webp`), Buffer.from(full.data, "base64"));
    await writeFile(join(outDir, `${project.slug}-600.webp`), Buffer.from(small.data, "base64"));
    await writeFile(join(outDir, `${project.slug}-top.webp`), Buffer.from(top.data, "base64"));
    await writeFile(join(outDir, `${project.slug}-top-600.webp`), Buffer.from(topSmall.data, "base64"));

    const m = await phone.newPage();
    await preparePage(m, project.url, { scroll: false });
    await m.waitForTimeout(2500);
    await hidePopups(m);
    const mpng = await m.screenshot({ type: "png", animations: "disabled" });
    const [mob, mobSmall] = await encodeWebp(encoder, mpng, [{ width: 780 }, { width: 390 }]);
    await writeFile(join(outDir, `${project.slug}-mobile.webp`), Buffer.from(mob.data, "base64"));
    await writeFile(join(outDir, `${project.slug}-mobile-390.webp`), Buffer.from(mobSmall.data, "base64"));
    await m.close();

    manifest[project.slug] = { width: full.width, height: full.height, capturedAt: new Date().toISOString().slice(0, 10) };
    console.log(`done (${full.width}×${full.height}${fullHeight > MAX_HEIGHT ? ", cropped" : ""})`);
  } catch (err) {
    failed++;
    console.log(`failed: ${err instanceof Error ? err.message.split("\n")[0] : err}`);
  } finally {
    await page.close();
  }
}

await browser.close();
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
if (failed) process.exitCode = 1;
