"use client";

import { useEffect } from "react";
import { afterIdle } from "@/lib/idle";

/**
 * One shared observer layer for the whole page (no animation library needed):
 *  - `.reveal` elements get [data-shown] once ~20% visible (CSS does the masked / fade-up reveal).
 *  - `[data-loop]` elements get [data-inview] while on screen; CSS pauses their loops otherwise.
 *  - Once the page is idle after load, <html data-fx="on"> lets decorative layers start.
 * Uses data attributes so React never resets them.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0.2 },
    );
    const loops = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) el.dataset.inview = "";
        else delete el.dataset.inview;
      }
    });
    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(".reveal:not([data-shown])").forEach((el) => reveal.observe(el));
      root.querySelectorAll<HTMLElement>("[data-loop]").forEach((el) => loops.observe(el));
    };
    observe(document);
    // Pick up elements inside widgets that mount later (e.g. the contact success state).
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof HTMLElement && observe(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    document.documentElement.dataset.reveal = "on";
    const cancel = afterIdle(() => (document.documentElement.dataset.fx = "on"));
    return () => {
      reveal.disconnect();
      loops.disconnect();
      mo.disconnect();
      cancel();
    };
  }, []);
  return null;
}
