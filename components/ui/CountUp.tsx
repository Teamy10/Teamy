"use client";

import { useEffect, useRef } from "react";
import { formatINR } from "@/lib/format";

/**
 * Counts a rupee amount up to `value` the first time it scrolls into view. Server-renders the final value,
 * writes frames straight to the DOM (no re-renders), and skips the animation for reduced motion.
 */
export function CountUp({ value, duration = 1100 }: { value: number; duration?: number }) {
  const format = formatINR;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let start: number | undefined;
        const step = (t: number) => {
          start ??= t;
          const p = Math.min(1, (t - start) / duration);
          el.textContent = format(value * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, format, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {format(value)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}
