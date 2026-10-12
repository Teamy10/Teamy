#!/usr/bin/env node
/**
 * Takes each live client's logo from its own website header, for the logo wall:
 *
 *   public/logos/clients/<slug>.webp      trimmed, transparent where the site's logo is
 *   public/logos/clients/manifest.json    size, tone ("light" logos are drawn dark on the light tiles)
 *
 * To use an official logo file instead, save it as public/logos/clients/<slug>.webp (or .png/.svg,
 * then update the manifest entry's "file") and skip that slug here.
 *
 * Usage: npm run capture:logos            (every live project)
 *        npm run capture:logos -- zoff     (only the given slugs)
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import { liveProjects } from "../content/projects.ts";
import { hidePopups, pickProjects, preparePage, publicDir, readJson } from "./capture-helpers.mjs";

const outDir = join(publicDir, "logos", "clients");
const manifestPath = join(outDir, "manifest.json");
const targets = pickProjects(liveProjects);
await mkdir(outDir, { recursive: true });
const manifest = await readJson(manifestPath);

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3, reducedMotion: "reduce" });
const encoder = await context.newPage();
let failed = 0;

for (const project of targets) {
  process.stdout.write(`${project.name} … `);
  const page = await context.newPage();
  try {
    await preparePage(page, project.url, { scroll: false });
    // Score the likely logo: "logo" in its alt/class, links home, sits in the header, top-left, not a tiny icon.
    const handle = await page.evaluateHandle(() => {
      const shown = (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width >= 28 && r.height >= 12 && r.width <= 720 && r.height <= 260 && r.top < 260 && r.bottom > 0 && cs.visibility !== "hidden" && Number(cs.opacity) > 0.05;
      };
      const sel = 'header img, header svg, [class*="header" i] img, [class*="header" i] svg, a[href="/"] img, a[href="/"] svg, img[alt*="logo" i], img[class*="logo" i], [class*="logo" i] img, [class*="logo" i] svg';
      let best = null;
      let bestScore = -Infinity;
      for (const el of new Set(document.querySelectorAll(sel))) {
        if (!shown(el)) continue;
        const r = el.getBoundingClientRect();
        const a = el.closest("a");
        const home = !!a && (a.getAttribute("href") === "/" || a.href === `${location.origin}/` || a.href === location.origin);
        const label = `${el.getAttribute("alt") ?? ""} ${el.getAttribute("class") ?? ""} ${el.id} ${el.closest('[class*="logo" i]') ? "logo" : ""}`.toLowerCase();
        let score = 0;
        if (label.includes("logo")) score += 5;
        if (home) score += 4;
        if (el.closest('header, [class*="header" i]')) score += 2;
        if (r.left < window.innerWidth * 0.55) score += 1;
        score += Math.min(3, (r.width * r.height) / 8000);
        if (el.tagName.toLowerCase() === "svg" && r.width < 44) score -= 4; // icons (cart, menu, search)
        if (score > bestScore) {
          bestScore = score;
          best = el;
        }
      }
      // Wordmark logos (custom sites): an icon plus text inside the home link, or text alone.
      const text = (a) => (a.innerText || "").trim();
      const wrap = best?.closest("a");
      if (best && wrap && text(wrap) && shown(wrap) && wrap.getBoundingClientRect().width < 420) best = wrap;
      if (!best) {
        const homes = [...document.querySelectorAll('a[href="/"]')].filter((a) => shown(a) && text(a) && !/^home$/i.test(text(a)));
        best = homes.sort((x, y) => x.getBoundingClientRect().left - y.getBoundingClientRect().left)[0] ?? null;
      }
      return best;
    });
    const el = handle.asElement();
    if (!el) throw new Error("no logo found in the header");
    await hidePopups(page); // some pop-ups only open a few seconds after load
    // Paint only the logo: everything else (header backgrounds, the hero behind a transparent header,
    // loaders, overlays) is hidden, so the capture keeps the logo's own pixels on transparency.
    await page.evaluate((node) => {
      node.setAttribute("data-capture-logo", "");
      const style = document.createElement("style");
      style.textContent =
        "html, body { background: transparent !important; } body * { visibility: hidden !important; } [data-capture-logo], [data-capture-logo] * { visibility: visible !important; }";
      document.head.append(style);
    }, el);
    const png = await el.screenshot({ omitBackground: true, animations: "disabled" });

    // Trim transparent edges, measure tone and transparency, export WebP (max 180px tall).
    const out = await encoder.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
      let minX = width, minY = height, maxX = -1, maxY = -1, solid = 0, lum = 0;
      for (let y = 0; y < height; y++)
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          if (data[i + 3] < 24) continue;
          solid++;
          lum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      if (maxX < 0) return null;
      const w = maxX - minX + 1;
      const h = maxY - minY + 1;
      const scale = Math.min(1, 180 / h);
      const o = document.createElement("canvas");
      o.width = Math.round(w * scale);
      o.height = Math.round(h * scale);
      const octx = o.getContext("2d");
      octx.imageSmoothingQuality = "high";
      octx.drawImage(c, minX, minY, w, h, 0, 0, o.width, o.height);
      return {
        width: o.width,
        height: o.height,
        tone: lum / solid > 0.62 ? "light" : "dark",
        opaque: solid / (w * h) > 0.97,
        data: o.toDataURL("image/webp", 0.92).split(",")[1],
      };
    }, png.toString("base64"));
    if (!out) throw new Error("logo capture was empty");
    await writeFile(join(outDir, `${project.slug}.webp`), Buffer.from(out.data, "base64"));
    manifest[project.slug] = { file: `/logos/clients/${project.slug}.webp`, width: out.width, height: out.height, tone: out.tone, opaque: out.opaque };
    console.log(`done (${out.width}×${out.height}, ${out.tone}${out.opaque ? ", opaque" : ""})`);
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
