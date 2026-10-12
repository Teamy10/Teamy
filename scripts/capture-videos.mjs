#!/usr/bin/env node
/**
 * Short vertical (9:16) videos of every live client site: the homepage on a phone, scrolled
 * smoothly from the top. Rendered frame by frame (exact scroll position per frame, sharp 2×
 * screenshots), so the scroll is perfectly smooth however busy the machine is. Two versions:
 *
 *   public/videos/<slug>.mp4 + .webp    540×960, light, for "Our websites, in motion" on the site
 *   media/social/<slug>.mp4             720×1280 with a Teamy caption, ready for Reels / Shorts
 *
 * Usage: npm run capture:videos            (every live project)
 *        npm run capture:videos -- zoff     (only the given slugs)
 * Uses Playwright for the frames and ffmpeg-static to encode H.264.
 */
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";
import { chromium } from "playwright";
import { liveProjects } from "../content/projects.ts";
import { hidePopups, pickProjects, preparePage, publicDir, root } from "./capture-helpers.mjs";

const run = promisify(execFile);
const webDir = join(publicDir, "videos");
const socialDir = join(root, "media", "social");
const FPS = 30;
// 0.6s still at the top, 10.4s of eased scrolling, 1s still at the end: 12s in all.
const HOLD_START = 18;
const SCROLL = 312;
const HOLD_END = 30;

const targets = pickProjects(liveProjects);
await mkdir(webDir, { recursive: true });
await mkdir(socialDir, { recursive: true });
const browser = await chromium.launch();

/** Transparent 720×1280 caption layer for the social cut, drawn with HTML so it uses real fonts. */
async function captionPng(project, dir) {
  const page = await browser.newPage({ viewport: { width: 720, height: 1280 } });
  await page.setContent(`<!doctype html><html><body style="margin:0;width:720px;height:1280px;background:transparent;font-family:Inter,'Segoe UI',Arial,sans-serif">
    <div style="position:absolute;inset:0 0 auto;height:260px;background:linear-gradient(#0a0b0ff5 0%,#0a0b0fd9 55%,#0a0b0f00 100%);padding:46px 44px 0;box-sizing:border-box">
      <div style="font:600 22px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#c8f25a">OUR WORK</div>
      <div style="margin-top:14px;font-weight:800;font-size:54px;letter-spacing:-.03em;color:#fff">${project.name}</div>
    </div>
    <div style="position:absolute;inset:auto 0 0;height:200px;background:linear-gradient(#0a0b0f00,#0a0b0fe8);padding:0 44px 48px;box-sizing:border-box;display:flex;align-items:flex-end;justify-content:space-between">
      <div style="font-weight:800;font-size:46px;letter-spacing:-.04em;color:#fff">teamy<span style="color:#c8f25a">.</span></div>
      <div style="font-weight:600;font-size:26px;color:#e7e9ee">teamy.in</div>
    </div></body></html>`);
  const file = join(dir, "caption.png");
  await page.screenshot({ path: file, omitBackground: true });
  await page.close();
  return file;
}

let failed = 0;
for (const project of targets) {
  process.stdout.write(`${project.name} … `);
  const dir = await mkdtemp(join(tmpdir(), `teamy-${project.slug}-`));
  const context = await browser.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "en-IN" });
  const page = await context.newPage();
  try {
    await preparePage(page, project.url);
    await page.waitForTimeout(1500);
    await hidePopups(page);
    // Scroll through the first ~6 screens (or the whole page if it's shorter).
    const distance = await page.evaluate(() => Math.min(document.documentElement.scrollHeight - window.innerHeight, window.innerHeight * 6));
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const total = HOLD_START + SCROLL + HOLD_END;
    for (let f = 0; f < total; f++) {
      const t = Math.min(1, Math.max(0, (f - HOLD_START) / (SCROLL - 1)));
      await page.evaluate(
        (y) => new Promise((done) => { window.scrollTo(0, y); requestAnimationFrame(() => requestAnimationFrame(done)); }),
        Math.round(distance * ease(t)),
      );
      await page.screenshot({ path: join(dir, `f${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 90 });
    }
    const frames = join(dir, "f%04d.jpg");
    const web = join(webDir, `${project.slug}.mp4`);
    await run(ffmpegPath, ["-y", "-framerate", String(FPS), "-i", frames, "-vf", "scale=540:960:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-crf", "33", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", web]);
    await run(ffmpegPath, ["-y", "-i", join(dir, "f0000.jpg"), "-vf", "scale=540:960:flags=lanczos", "-c:v", "libwebp", "-quality", "80", join(webDir, `${project.slug}.webp`)]);
    const caption = await captionPng(project, dir);
    await run(ffmpegPath, ["-y", "-framerate", String(FPS), "-i", frames, "-i", caption, "-filter_complex", "[0:v]scale=720:1280:flags=lanczos[v];[v][1:v]overlay=0:0", "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", join(socialDir, `${project.slug}.mp4`)]);
    console.log(`done (${(total / FPS).toFixed(0)}s)`);
  } catch (err) {
    failed++;
    console.log(`failed: ${err instanceof Error ? err.message.split("\n")[0] : err}`);
  } finally {
    await context.close().catch(() => {});
    await rm(dir, { recursive: true, force: true });
  }
}

await browser.close();
await writeFile(join(socialDir, "README.txt"), "Vertical 720x1280 clips of client websites with a Teamy caption, made by `npm run capture:videos`.\nReady to post as Instagram Reels or YouTube Shorts.\n");
if (failed) process.exitCode = 1;
