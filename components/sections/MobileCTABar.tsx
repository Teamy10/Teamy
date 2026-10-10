"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { TrackedLink, WhatsAppLink } from "@/components/ui/TrackedLink";

/**
 * Mobile-only bottom bar. Shows after the hero, hides over the contact section,
 * and hides while the on-screen keyboard is open.
 */
export function MobileCTABar() {
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === contact) setContactVisible(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);

    // Keyboard: a text field has focus, or the visual viewport shrank a lot.
    const isField = (el: Element | null) =>
      !!el &&
      (el.tagName === "TEXTAREA" ||
        (el.tagName === "INPUT" && !["range", "checkbox", "radio", "button", "submit"].includes((el as HTMLInputElement).type)));
    const onFocusIn = () => setKeyboard(isField(document.activeElement));
    const onFocusOut = () => setTimeout(() => setKeyboard(isField(document.activeElement)), 50);
    const vv = window.visualViewport;
    const onResize = () => vv && setKeyboard(vv.height < window.innerHeight * 0.75 || isField(document.activeElement));
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    vv?.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      vv?.removeEventListener("resize", onResize);
    };
  }, []);

  const show = pastHero && !contactVisible && !keyboard;

  return (
    <div
      className={`on-night fixed inset-x-0 bottom-0 z-30 border-t border-line-night bg-night/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 ease-brand md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!show}
    >
      <div className="flex gap-3">
        <WhatsAppLink
          section="mobile_cta_bar"
          message="bookCall"
          aria-label="Book a free call on WhatsApp"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-night-2 text-accent ring-1 ring-line-night"
        >
          <WhatsAppIcon className="size-6" />
        </WhatsAppLink>
        <TrackedLink
          href="#contact"
          event="hero_cta_click"
          params={{ location: "mobile_cta_bar" }}
          className={buttonClass("primary", "flex-1")}
        >
          Get a free preview
        </TrackedLink>
      </div>
    </div>
  );
}
