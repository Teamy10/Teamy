"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppLink } from "@/components/ui/TrackedLink";

const links = [
  { href: "#why", label: "Why Teamy" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

/** Dark header that sits on the night hero; gains a blurred backdrop after 40px of scroll. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, close on Escape, keep focus inside the sheet while open.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !sheet.current) return;
      const items = sheet.current.querySelectorAll<HTMLElement>("a,button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="on-night fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b border-line-night bg-night/92 backdrop-blur-xl transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="container-page relative flex h-16 items-center justify-between">
          <a href="#top" aria-label="Teamy, back to top" className="-ml-1 flex min-h-12 items-center px-1">
            <Logo tone="light" className="h-7 w-auto" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-3 text-[15px] font-medium text-on-night-soft transition-colors hover:text-on-night"
              >
                {l.label}
              </a>
            ))}
            <WhatsAppLink
              section="header"
              message="bookCall"
              className={buttonClass("primary", "ml-3 !min-h-11 !px-5 text-[15px]")}
            >
              Book a free call
            </WhatsAppLink>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            <WhatsAppLink
              section="header"
              message="bookCall"
              aria-label="Book a free call on WhatsApp"
              className="grid size-12 place-items-center rounded-full text-accent"
            >
              <WhatsAppIcon className="size-6" />
            </WhatsAppLink>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 grid size-12 place-items-center rounded-full text-on-night"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={sheet}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        // Visibility flips instantly on open (so focus can move in) and only waits for the slide on close.
        className={`on-night night-texture fixed inset-0 z-50 flex flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] duration-400 ease-brand lg:hidden ${
          open ? "visible translate-y-0 transition-[translate]" : "invisible -translate-y-full transition-[translate,visibility]"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Logo tone="light" className="h-7 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="-mr-2 grid size-12 place-items-center rounded-full text-on-night"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col pt-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-16 items-center border-b border-line-night font-display text-[30px] font-bold tracking-tight text-on-night"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-auto pb-6">
            <WhatsAppLink
              section="mobile_menu"
              message="bookCall"
              onClick={() => setOpen(false)}
              className={buttonClass("primary", "w-full text-[17px]")}
            >
              <WhatsAppIcon className="size-5" /> Book a free call
            </WhatsAppLink>
          </div>
        </nav>
      </div>
    </>
  );
}
