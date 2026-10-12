"use client";

import { useEffect } from "react";

const TRIGGERS = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;

/**
 * Loads the motion runtime (GSAP + ScrollTrigger + Lenis, ~51KB gz) on the visitor's first interaction
 * (pointer, wheel, touch, key or scroll), or when the 7-day story comes within a screen of the viewport,
 * whichever happens first ("import on interaction"). Nothing motion-related competes with first paint,
 * and until it loads every section is already readable in its final state.
 */
export function MotionRuntime() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let stopped = false;
    let started = false;

    const load = (e?: Event) => {
      if (started) return;
      started = true;
      TRIGGERS.forEach((t) => window.removeEventListener(t, load));
      io?.disconnect();
      // If that first interaction was a tap / keypress on an in-page link, the runtime finishes the jump.
      const link = e && e.type !== "scroll" ? (e.target as Element | null)?.closest?.('a[href^="#"], a[href^="/#"]') : null;
      const pendingAnchor = link?.getAttribute("href") ?? undefined;
      import("@/lib/motion-runtime")
        .then(({ initMotion }) => {
          if (!stopped) dispose = initMotion({ pendingAnchor });
        })
        .catch(() => {
          /* motion is an enhancement; the page works without it */
        });
    };

    TRIGGERS.forEach((t) => window.addEventListener(t, load, { passive: true, once: true }));
    const story = document.querySelector("[data-story-stage]");
    const io = story
      ? new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "100% 0px" })
      : null;
    if (story) io!.observe(story);

    return () => {
      stopped = true;
      TRIGGERS.forEach((t) => window.removeEventListener(t, load));
      io?.disconnect();
      dispose?.();
    };
  }, []);
  return null;
}
