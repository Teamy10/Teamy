"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping clip that loads nothing until its section is near the viewport: the poster is set
 * then (a <video poster> attribute would download at page load), and the video itself only plays
 * while visible (preload="none", paused off-screen). With prefers-reduced-motion it stays on the poster.
 */
export function InViewVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        if (poster) v.poster = poster;
        near.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(v.closest("section") ?? v);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => near.disconnect();
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => {
      near.disconnect();
      io.disconnect();
    };
  }, [poster]);

  return (
    <video ref={ref} className="h-full w-full object-cover" muted loop playsInline preload="none" aria-label={label}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
