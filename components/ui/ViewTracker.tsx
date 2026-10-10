"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires an analytics event once, the first time its section scrolls into view. Renders nothing visible. */
export function ViewTracker({ event, threshold = 0.25 }: { event: AnalyticsEvent; threshold?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        track(event);
        io.disconnect();
      },
      { threshold },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [event, threshold]);
  return <span ref={ref} hidden />;
}
