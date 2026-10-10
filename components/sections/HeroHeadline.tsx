"use client";

import { Pause, Play } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { HeroLine } from "@/site.config";

function Line({ line, state }: { line: HeroLine; state: "in" | "out" | "next" }) {
  const words = line.text.split(" ");
  const hl = line.highlight?.split(" ") ?? [];
  // Index of the first highlighted word, so a multi-word highlight stays together.
  const start = hl.length ? words.findIndex((_, i) => hl.every((h, j) => words[i + j] === h)) : -1;
  return (
    <span className="headline-line col-start-1 row-start-1" data-state={state}>
      {words.map((w, i) => {
        const lit = start >= 0 && i >= start && i < start + hl.length;
        // Spaces sit between the inline-block words so lines can still wrap.
        return (
          <Fragment key={i}>
            <span className={`headline-word ${lit ? "text-shine" : ""}`} style={{ ["--i" as string]: i }}>
              {w}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}

/**
 * Rotating hero headline. All lines share one grid cell, so the block is always as tall as
 * the longest line and nothing shifts. Pauses on hover and focus, and with the pause button
 * (WCAG 2.2.2). The first line is server-rendered and visible immediately (fast LCP).
 */
export function HeroHeadline({ lines, rotateMs, srText }: { lines: HeroLine[]; rotateMs: number; srText: string }) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const outTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const paused = hovered || userPaused;

  useEffect(() => {
    if (paused || lines.length < 2) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => {
        setPrev(i);
        return (i + 1) % lines.length;
      });
      clearTimeout(outTimer.current);
      outTimer.current = setTimeout(() => setPrev(null), 700);
    }, rotateMs);
    return () => clearInterval(t);
  }, [paused, rotateMs, lines.length]);

  useEffect(() => () => clearTimeout(outTimer.current), []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <h1 id="hero-title" className="h1-size font-extrabold text-on-night">
        <span className="sr-only">{srText}</span>
        <span aria-hidden="true" className="grid">
          {lines.map((l, i) => (
            <Line key={l.text} line={l} state={i === index ? "in" : i === prev ? "out" : "next"} />
          ))}
        </span>
      </h1>
      {lines.length > 1 && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            {lines.map((l, i) => (
              <span
                key={l.text}
                className={`h-1 rounded-full transition-[width,background-color] duration-500 ${
                  i === index ? "w-8 bg-accent" : "w-3 bg-line-night"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Play rotating headlines" : "Pause rotating headlines"}
            className="grid size-12 place-items-center rounded-full text-on-night-soft transition-colors hover:text-on-night"
          >
            {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
}
