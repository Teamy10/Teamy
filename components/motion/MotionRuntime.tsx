"use client";

import { useEffect } from "react";
import { afterIdle } from "@/lib/idle";

/**
 * Loads the motion runtime (GSAP + ScrollTrigger + Lenis) only after the page has loaded and gone
 * idle, so none of it is in the initial bundle or competes with first paint. Until then, and if it
 * never loads, every section is fully readable in its final state.
 */
export function MotionRuntime() {
  useEffect(() => {
    let dispose: (() => void) | undefined;
    let stopped = false;
    const cancel = afterIdle(() => {
      import("@/lib/motion-runtime")
        .then(({ initMotion }) => {
          if (!stopped) dispose = initMotion();
        })
        .catch(() => {
          /* motion is an enhancement; the page works without it */
        });
    });
    return () => {
      stopped = true;
      cancel();
      dispose?.();
    };
  }, []);
  return null;
}
