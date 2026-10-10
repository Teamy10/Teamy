"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the whole page (fine pointers only, never with reduced motion):
 *  - `.glow-card`: sets --mx/--my so the spotlight follows the cursor.
 *  - `[data-tilt-zone]` → `[data-tilt]`: a gentle 3D tilt toward the cursor.
 * Writes are batched into one rAF, and only CSS variables / transforms change.
 */
export function InteractionFX() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let raf = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;

    const apply = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const card = target?.closest<HTMLElement>(".glow-card");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const zone = target?.closest<HTMLElement>("[data-tilt-zone]");
      const el = zone?.querySelector<HTMLElement>("[data-tilt]") ?? null;
      if (tilted && tilted !== el) tilted.style.transform = "";
      tilted = el;
      if (zone && el) {
        const r = zone.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
