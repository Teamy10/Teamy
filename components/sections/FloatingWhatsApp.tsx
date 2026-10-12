"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

/**
 * Floating WhatsApp button, bottom-right and safe-area aware. Hidden over the hero (which has its
 * own CTA), while the contact section or footer is on screen (so it never covers the form or links),
 * and while the on-screen keyboard is open.
 */
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const covers = [document.getElementById("contact"), document.querySelector("footer")].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting);
        else if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    if (hero) io.observe(hero);
    else requestAnimationFrame(() => setPastHero(true)); // pages without a #top hero: show right away
    covers.forEach((c) => io.observe(c));

    const isField = (el: Element | null) => !!el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT");
    const onFocus = () => setTyping(isField(document.activeElement));
    const onBlur = () => setTimeout(onFocus, 50);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, []);

  const show = pastHero && !blocked && !typing;
  return (
    <div
      className={`fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-[max(16px,env(safe-area-inset-right))] z-30 transition-[translate,opacity] duration-[var(--dur-base)] ease-expo ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      inert={!show}
    >
      <WhatsAppCTA
        source="floating_button"
        aria-label="Chat with Teamy on WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink shadow-[0_12px_40px_-10px_rgb(var(--accent-rgb)/0.6)] transition-[scale] duration-[var(--dur-fast)] hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="size-7" />
      </WhatsAppCTA>
    </div>
  );
}
