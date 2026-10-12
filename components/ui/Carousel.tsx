"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

const GAP = 24;

/**
 * Accessible horizontal carousel: native swipe and scroll-snap, previous / next buttons, and arrow
 * keys when the track is focused. No autoplay, so nothing moves unless the visitor moves it.
 * Children must be <li> elements.
 */
export function Carousel({ label, item = "item", children }: { label: string; item?: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  // Where the last button/key press is heading, so quick repeated presses each move one more card.
  const goal = useRef<number | null>(null);
  const goalTimer = useRef(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    const settle = () => (goal.current = null);
    const frame = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    el.addEventListener("scrollend", settle);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(goalTimer.current);
      el.removeEventListener("scroll", update);
      el.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector("li");
    const step = item ? item.getBoundingClientRect().width + GAP : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    const from = goal.current ?? el.scrollLeft;
    const next = Math.min(max, Math.max(0, Math.round(from / step + dir) * step));
    goal.current = next;
    // Fallback for browsers without "scrollend".
    window.clearTimeout(goalTimer.current);
    goalTimer.current = window.setTimeout(() => (goal.current = null), 700);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next, behavior: reduce ? "auto" : "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  };

  const scrollable = !(edges.start && edges.end);
  const btn =
    "grid size-12 place-items-center rounded-full text-fg ring-1 ring-inset ring-line-strong transition-[background-color,opacity] duration-[var(--dur-fast)] hover:bg-fg/[0.06] disabled:pointer-events-none disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className={`flex justify-end gap-2 ${scrollable ? "" : "invisible"}`}>
        <button type="button" className={btn} onClick={() => go(-1)} disabled={edges.start} aria-label={`Previous ${item}`}>
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" className={btn} onClick={() => go(1)} disabled={edges.end} aria-label={`Next ${item}`}>
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        onKeyDown={onKey}
        aria-label={`${label}. Use the arrow keys to move between them.`}
        className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto px-5 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {children}
      </ul>
    </div>
  );
}
