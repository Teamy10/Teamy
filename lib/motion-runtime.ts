/**
 * Motion runtime: GSAP + ScrollTrigger + Lenis. Loaded lazily by <MotionRuntime/> after the page is idle.
 *
 * Everything here is progressive enhancement: the server-rendered page already shows every section in
 * its final state. With prefers-reduced-motion there is no smooth scroll, pinning, parallax, cursor,
 * magnetism or count-up; only the (instant) CSS reveal states apply.
 *
 * Only transform and opacity are animated.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { formatINR } from "@/lib/format";
import { distance, duration, ease } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const expoOut = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function initMotion(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const cleanups: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(t: EventTarget, type: K | string, fn: (e: never) => void, opts?: AddEventListenerOptions) => {
    t.addEventListener(type, fn as EventListener, opts);
    cleanups.push(() => t.removeEventListener(type, fn as EventListener, opts));
  };

  /* ---------- Smooth scroll (Lenis), driven by GSAP's ticker so ScrollTrigger stays in sync ---------- */
  let lenis: Lenis | null = null;
  if (!reduce) {
    lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true, anchors: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    cleanups.push(() => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      delete window.__lenis;
    });
  }
  // The mobile menu asks us to freeze scrolling while it's open.
  on(window, "teamy:scroll-lock", () => lenis?.stop());
  on(window, "teamy:scroll-unlock", () => lenis?.start());

  /* ---------- In-page anchors: smooth, header-aware, and focus moves to the target ---------- */
  const headerOffset = () => (q("header")?.getBoundingClientRect().height ?? 72) + 12;
  on(document, "click", (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute("href") ?? "";
    const id = hash.length > 1 ? decodeURIComponent(hash.slice(1)) : "top";
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const focusTarget = () => {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    if (lenis) {
      // Lenis already honours html { scroll-padding-top } (header height), so no extra offset here.
      const dest = id === "top" ? 0 : target;
      const expected = id === "top" || id === "main" ? 0 : headerOffset();
      lenis.scrollTo(dest, {
        duration: duration.slower,
        easing: expoOut,
        onComplete: () => {
          // Correction pass: content above may have changed height mid-flight (fonts, lazy layout).
          const drift = id === "top" ? window.scrollY : target.getBoundingClientRect().top - expected;
          if (Math.abs(drift) > 4) lenis?.scrollTo(dest, { duration: duration.fast, easing: expoOut, onComplete: focusTarget });
          else focusTarget();
        },
      });
    } else {
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      focusTarget();
    }
    if (hash.length > 1) history.pushState(null, "", hash);
  });

  /* ---------- Spotlight borders follow the cursor (hover feedback, not movement) ---------- */
  if (fine) {
    let raf = 0;
    let last: PointerEvent | null = null;
    on(document, "pointermove", (e: PointerEvent) => {
      last = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const card = (last?.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
        if (!card || !last) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${last.clientX - r.left}px`);
        card.style.setProperty("--my", `${last.clientY - r.top}px`);
      });
    }, { passive: true });
  }

  /* ---------- Price count-up, once, when the price scrolls into view ---------- */
  if (!reduce) {
    for (const el of qa("[data-countup]")) {
      const target = Number(el.dataset.countup);
      if (!Number.isFinite(target)) continue;
      // Only animate if it hasn't been seen yet; otherwise leave the final value alone.
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.textContent = formatINR(0);
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          const o = { v: 0 };
          gsap.to(o, { v: target, duration: duration.slower, ease: ease.expoOut.gsap, onUpdate: () => (el.textContent = formatINR(o.v)) });
        },
        { threshold: 0.6 },
      );
      io.observe(el);
      cleanups.push(() => {
        io.disconnect();
        el.textContent = formatINR(target);
      });
    }
  }

  /* ---------- Responsive, motion-safe effects ---------- */
  const mm = gsap.matchMedia();
  mm.add(
    {
      desktop: "(min-width: 1024px)",
      fine: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const c = ctx.conditions as { desktop: boolean; fine: boolean; reduce: boolean };
      if (c.reduce) return; // final states everywhere
      document.documentElement.dataset.motion = "on";
      const teardown: Array<() => void> = [() => delete document.documentElement.dataset.motion];
      if (c.desktop) teardown.push(story());
      teardown.push(processLine(c.desktop));
      teardown.push(lightPools(c.fine));
      if (c.fine) teardown.push(cursor(), tilt(), magnetic());
      return () => teardown.forEach((fn) => fn());
    },
  );
  cleanups.push(() => mm.revert());

  // Fonts change line heights; re-measure pins and triggers once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    cleanups.reverse().forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

/* =====================================================================================
 * Story: "Idea → live in 7 days". Desktop pins the stage and scrubs: each day lights up while
 * its piece of the storefront assembles. Mobile / reduced motion: a static vertical stack.
 * ===================================================================================== */
function story(): () => void {
  const stage = q("[data-story-stage]");
  if (!stage) return () => {};
  const days = qa("[data-story-day]", stage);
  const pieces = days.map((d) => q(`[data-piece="${d.dataset.storyDay}"]`, stage));
  const rail = q("[data-story-rail]", stage);
  const count = days.length;

  const setActive = (i: number) =>
    days.forEach((d, k) => (d.dataset.state = k < i ? "done" : k === i ? "active" : "next"));

  // Day 1's piece is part of the starting frame; later pieces build in.
  const later = pieces.slice(1).filter(Boolean) as HTMLElement[];
  gsap.set(later, { autoAlpha: 0, y: 28 });
  setActive(0);

  const tl = gsap.timeline({
    defaults: { ease: ease.quartOut.gsap, duration: 1 },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * 0.55 * count)}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => setActive(Math.min(count - 1, Math.round(self.progress * (count - 1)))),
    },
  });
  pieces.forEach((p, i) => {
    if (i === 0 || !p) return;
    tl.to(p, { autoAlpha: 1, y: 0 }, i - 1);
  });
  if (rail) tl.fromTo(rail, { scaleY: 1 / count }, { scaleY: 1, ease: "none", duration: count - 1 }, 0);

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set(later, { clearProps: "opacity,visibility,transform" });
    days.forEach((d) => delete d.dataset.state);
  };
}

/* Process: the SVG connector draws as you scroll (a mask rect scales: transform only). */
function processLine(desktop: boolean): () => void {
  const section = q("[data-process]");
  const mask = section && q<SVGElement | HTMLElement>(desktop ? "[data-process-mask-h]" : "[data-process-mask-v]", section);
  const steps = section ? qa("[data-process-step]", section) : [];
  if (!section || !mask) return () => {};
  const axis = desktop ? "scaleX" : "scaleY";
  const tween = gsap.fromTo(
    mask,
    { [axis]: 0, transformOrigin: desktop ? "0% 50%" : "50% 0%" },
    {
      [axis]: 1,
      ease: "none",
      scrollTrigger: { trigger: q("[data-process-steps]", section) ?? section, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
    },
  );
  const triggers = steps.map((step) =>
    ScrollTrigger.create({
      trigger: step,
      start: "top 72%",
      onEnter: () => (step.dataset.lit = ""),
      onLeaveBack: () => delete step.dataset.lit,
    }),
  );
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    triggers.forEach((t) => t.kill());
    gsap.set(mask, { clearProps: "transform" });
    steps.forEach((s) => delete s.dataset.lit);
  };
}

/* Light pools drift slowly toward the cursor (desktop) and with scroll (everywhere). */
function lightPools(fine: boolean): () => void {
  const a = q('[data-pool="a"]');
  const b = q('[data-pool="b"]');
  if (!a || !b) return () => {};
  const drift = [
    gsap.to(a, { yPercent: 35, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.5 } }),
    gsap.to(b, { yPercent: -30, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.5 } }),
  ];
  let off = () => {};
  if (fine) {
    const ax = gsap.quickTo(a, "x", { duration: 2.4, ease: ease.quartOut.gsap });
    const ay = gsap.quickTo(a, "y", { duration: 2.4, ease: ease.quartOut.gsap });
    const bx = gsap.quickTo(b, "x", { duration: 3, ease: ease.quartOut.gsap });
    const move = (e: PointerEvent) => {
      const dx = e.clientX - window.innerWidth / 2;
      const dy = e.clientY - window.innerHeight / 2;
      ax(dx * 0.22);
      ay(dy * 0.22);
      bx(-dx * 0.12);
    };
    window.addEventListener("pointermove", move, { passive: true });
    off = () => window.removeEventListener("pointermove", move);
  }
  return () => {
    off();
    drift.forEach((t) => {
      t.scrollTrigger?.kill();
      t.kill();
    });
    gsap.set([a, b], { clearProps: "transform" });
  };
}

/* A subtle ring + dot that trail the native cursor; the ring grows over interactive elements. */
function cursor(): () => void {
  const ring = q("[data-cursor-ring]");
  const dot = q("[data-cursor-dot]");
  if (!ring || !dot) return () => {};
  const html = document.documentElement;
  const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: ease.quartOut.gsap });
  const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: ease.quartOut.gsap });
  const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
  const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
  let grown = false;
  const move = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    html.dataset.cursor = "on";
    rx(e.clientX);
    ry(e.clientY);
    dx(e.clientX);
    dy(e.clientY);
    const interactive = !!(e.target as Element | null)?.closest?.("a, button, input, textarea, select, label, [data-cursor-grow]");
    if (interactive !== grown) {
      grown = interactive;
      gsap.to(ring, { scale: interactive ? 1.7 : 1, duration: duration.fast, ease: ease.quartOut.gsap });
      gsap.to(dot, { scale: interactive ? 0 : 1, duration: duration.fast, ease: ease.quartOut.gsap });
    }
  };
  const leave = () => delete html.dataset.cursor;
  window.addEventListener("pointermove", move, { passive: true });
  document.documentElement.addEventListener("pointerleave", leave);
  return () => {
    window.removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", leave);
    delete html.dataset.cursor;
  };
}

/* Hero storefront: gentle 3D tilt toward the cursor, with a little depth parallax inside. */
function tilt(): () => void {
  const zone = q("[data-tilt-zone]");
  const el = zone && q("[data-tilt]", zone);
  if (!zone || !el) return () => {};
  const base = { rotationY: -14, rotationX: 7 };
  gsap.set(el, { transformPerspective: 1400, ...base });
  const ry = gsap.quickTo(el, "rotationY", { duration: duration.slower, ease: ease.quartOut.gsap });
  const rx = gsap.quickTo(el, "rotationX", { duration: duration.slower, ease: ease.quartOut.gsap });
  const layers = qa("[data-depth]", zone).map((layer) => ({
    depth: Number(layer.dataset.depth) || 1,
    x: gsap.quickTo(layer, "x", { duration: duration.slower, ease: ease.quartOut.gsap }),
    y: gsap.quickTo(layer, "y", { duration: duration.slower, ease: ease.quartOut.gsap }),
  }));
  const move = (e: PointerEvent) => {
    const r = zone.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry(base.rotationY + px * distance.tilt * 2);
    rx(base.rotationX - py * distance.tilt);
    layers.forEach((l) => {
      l.x(px * 14 * l.depth);
      l.y(py * 10 * l.depth);
    });
  };
  const reset = () => {
    ry(base.rotationY);
    rx(base.rotationX);
    layers.forEach((l) => {
      l.x(0);
      l.y(0);
    });
  };
  zone.addEventListener("pointermove", move, { passive: true });
  zone.addEventListener("pointerleave", reset);
  return () => {
    zone.removeEventListener("pointermove", move);
    zone.removeEventListener("pointerleave", reset);
    gsap.set([el, ...qa("[data-depth]", zone)], { clearProps: "transform" });
  };
}

/* Primary buttons lean toward the cursor a few pixels. */
function magnetic(): () => void {
  const offs = qa("[data-magnetic]").map((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: ease.quartOut.gsap });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: ease.quartOut.gsap });
    const m = distance.magnet;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x(gsap.utils.clamp(-m, m, (e.clientX - (r.left + r.width / 2)) * 0.3));
      y(gsap.utils.clamp(-m, m, (e.clientY - (r.top + r.height / 2)) * 0.4));
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { clearProps: "transform" });
    };
  });
  return () => offs.forEach((fn) => fn());
}
