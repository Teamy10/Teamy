"use client";

import { CheckCircle2, IndianRupee, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const notifications = [
  { icon: ShoppingBag, title: "New order · ₹1,499", body: "Mulmul kurta (M) · Jaipur" },
  { icon: IndianRupee, title: "Payment received via UPI", body: "₹2,199 · Order #1042" },
  { icon: CheckCircle2, title: "COD order confirmed", body: "Customer tapped ✅ on WhatsApp" },
];

// Illustrative products for an invented demo brand. Swatches are pure CSS, no images.
const products = [
  { name: "Mulmul kurta", price: "₹1,499", swatch: "repeating-linear-gradient(135deg,#f4c7a1 0 10px,#efb68a 10px 20px)" },
  { name: "Block-print co-ord", price: "₹2,199", swatch: "radial-gradient(circle at 30% 30%,#2f5d50 0 6px,transparent 7px) 0 0/22px 22px,#dfe9e2" },
  { name: "Chanderi dupatta", price: "₹899", swatch: "linear-gradient(160deg,#f7e0a3,#e8b84a)" },
  { name: "Linen shirt", price: "₹1,299", swatch: "repeating-linear-gradient(90deg,#d9d2c5 0 4px,#ece6db 4px 9px)" },
];

export function PhoneMockup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Only cycle notifications while the phone is on screen and the tab is visible.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = (show: boolean) => {
      if (!onScreen || document.hidden) return;
      setVisible(show);
      if (!show) setIndex((i) => (i + 1) % notifications.length);
      timer = setTimeout(() => tick(!show), show ? 2800 : 900);
    };
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      clearTimeout(timer);
      if (onScreen) timer = setTimeout(() => tick(true), 900);
      else setVisible(false);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <figure ref={root} className="relative mx-auto w-[78%] max-w-[320px] lg:w-full">
      <div className="relative aspect-[9/18.5] rounded-[44px] bg-[#05090f] p-[10px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-line-night">
        <div className="relative h-full overflow-hidden rounded-[36px] bg-surface text-ink">
          {/* Notch */}
          <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#05090f]" />

          {/* Demo store */}
          <div className="h-full overflow-hidden pt-9" aria-hidden="true">
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="font-display text-[17px] font-extrabold tracking-tight">kesar threads</span>
              <ShoppingBag className="size-5" />
            </div>
            <div className="mx-4 rounded-2xl bg-[#FFE8D6] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B5450A]">Festive drop · live</p>
              <p className="mt-1 font-display text-xl font-bold leading-tight">The Diwali edit</p>
              <p className="mt-1 text-xs text-ink-soft">Handblock cotton, made in Jaipur</p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4">
              {products.map((p) => (
                <div key={p.name}>
                  <div className="aspect-[4/5] rounded-xl" style={{ background: p.swatch }} />
                  <p className="mt-1.5 truncate text-[12px] font-medium">{p.name}</p>
                  <p className="text-[12px] tabular-nums text-ink-soft">{p.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp-style notifications: spring-ish slide from the top, CSS transforms only. */}
          <div className="absolute inset-x-2 top-8 z-30" aria-hidden="true">
            {notifications.map((item, i) => {
              const Icon = item.icon;
              const active = visible && i === index;
              return (
                <div
                  key={item.title}
                  className={`absolute inset-x-0 top-0 flex items-start gap-2.5 rounded-2xl bg-surface p-3 shadow-lift ring-1 ring-line transition-[translate,opacity] ${
                    active
                      ? "translate-y-0 opacity-100 duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
                      : "-translate-y-24 opacity-0 duration-300 ease-in"
                  }`}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#1F7A5C] text-white">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold leading-tight">{item.title}</span>
                    <span className="block truncate text-[12px] text-ink-soft">{item.body}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-on-night-soft">
        Demo store for illustration · invented brand
      </figcaption>
    </figure>
  );
}
