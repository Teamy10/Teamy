"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Back-to-top link, shown after two screens of scrolling. Sits above the floating WhatsApp button. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Back to top"
      inert={!show}
      className={`fixed bottom-[calc(max(16px,env(safe-area-inset-bottom))+68px)] right-[max(20px,calc(env(safe-area-inset-right)+4px))] z-30 grid size-12 place-items-center rounded-full bg-surface-2 text-fg ring-1 ring-line-strong transition-[translate,opacity] duration-[var(--dur-base)] ease-expo hover:text-accent ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </a>
  );
}
