"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

/** Pause / play for the ticker (WCAG 2.2.2: moving content needs a way to stop it). */
export function MarqueeToggle() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={paused ? "Play the ticker" : "Pause the ticker"}
      onClick={(e) => {
        const next = !paused;
        setPaused(next);
        const m = e.currentTarget.closest<HTMLElement>(".marquee");
        if (m) {
          if (next) m.dataset.paused = "";
          else delete m.dataset.paused;
        }
      }}
      className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-bg/80 text-fg-3 transition-colors hover:text-fg md:right-4"
    >
      {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
    </button>
  );
}
