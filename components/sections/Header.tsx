"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

// "/#…" so the same links work from service pages (on the home page the motion runtime smooth-scrolls them).
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#audit", label: "Free audit" },
];

/** Sticky header: transparent over the hero, then a blurred dark bar with a hairline once you scroll. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll (native + smooth-scroll runtime), close on Escape, trap focus while open.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("teamy:scroll-lock"));
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
      window.dispatchEvent(new Event("teamy:scroll-unlock"));
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 border-b transition-[opacity,border-color] duration-[var(--dur-base)] ease-quart ${
            scrolled ? "border-line bg-bg/75 opacity-100 backdrop-blur-xl" : "border-transparent opacity-0"
          }`}
        />
        <div className="container-page relative flex h-[72px] items-center justify-between">
          <Link href="/#top" prefetch={false} aria-label="Teamy home" className="-ml-1 flex min-h-12 items-center px-1">
            <Logo className="h-7 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="underline-anim inline-flex min-h-12 items-center text-[15px] text-fg-2 transition-colors hover:text-fg">
                {l.label}
              </a>
            ))}
            <WhatsAppCTA source="header" data-magnetic="" className={buttonClass("primary", "ml-2 !min-h-11 !px-5")}>
              Get a free quote
            </WhatsAppCTA>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            <WhatsAppCTA
              source="header"
              aria-label="Get a free quote on WhatsApp"
              className="grid size-12 place-items-center rounded-full text-accent"
            >
              <WhatsAppIcon className="size-6" />
            </WhatsAppCTA>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 grid size-12 place-items-center rounded-full text-fg"
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
        className={`fixed inset-0 z-50 flex flex-col bg-bg pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] duration-[var(--dur-base)] ease-expo lg:hidden ${
          open ? "visible translate-y-0 opacity-100 transition-[translate,opacity]" : "invisible -translate-y-4 opacity-0 transition-[translate,opacity,visibility]"
        }`}
      >
        <div className="container-page flex h-[72px] items-center justify-between">
          <Logo className="h-7 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="-mr-2 grid size-12 place-items-center rounded-full text-fg"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col pt-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-16 items-center justify-between border-b border-line font-display text-[32px] font-medium tracking-[-0.03em]"
            >
              {l.label}
              <span className="label-mono text-fg-3">{String(i + 1).padStart(2, "0")}</span>
            </a>
          ))}
          <div className="mt-auto pb-6">
            <WhatsAppCTA source="mobile_menu" onClick={() => setOpen(false)} className={buttonClass("primary", "w-full", "lg")}>
              <WhatsAppIcon className="size-5" /> Get a free quote
            </WhatsAppCTA>
          </div>
        </nav>
      </div>
    </>
  );
}
