"use client";

import { useEffect } from "react";

/** Marks `.reveal` elements as shown when ~20% visible. Uses a data attribute so React never resets it. */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.2 },
    );
    const observe = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>(".reveal:not([data-shown])").forEach((el) => io.observe(el));
    observe(document);
    // Pick up reveals inside widgets that mount later.
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n instanceof HTMLElement && observe(n.parentNode ?? n));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    document.documentElement.dataset.reveal = "on";
    // Start decorative animations once the browser is idle after load.
    const startFx = () => (document.documentElement.dataset.fx = "on");
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 2500 });
      else setTimeout(cb, 1200); // Safari
    };
    if (document.readyState === "complete") idle(startFx);
    else window.addEventListener("load", () => idle(startFx), { once: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
