import { Check, Lock, ShoppingBag } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/Icons";

/*
 * Illustrative storefront for an invented brand ("kesar threads"), built entirely in code.
 * Every piece carries data-piece so the 7-day story can assemble it on scroll.
 * Decorative: the whole mockup is aria-hidden and captioned as illustrative where it's used.
 */

const products = [
  { name: "Mulmul kurta", price: "₹1,499", swatch: "repeating-linear-gradient(135deg,#f1c49c 0 9px,#e9b183 9px 18px)" },
  { name: "Block-print co-ord", price: "₹2,199", swatch: "radial-gradient(circle at 30% 30%,#2f5d50 0 5px,transparent 6px) 0 0/18px 18px,#dfe9e2" },
  { name: "Chanderi dupatta", price: "₹899", swatch: "linear-gradient(160deg,#f6dea0,#e3b347)" },
];

function BrowserBar() {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] bg-[#f3f1ec] px-4 py-2.5">
      <span className="flex gap-1.5">
        <span className="size-2.5 rounded-full bg-[#e5675c]" />
        <span className="size-2.5 rounded-full bg-[#e9b949]" />
        <span className="size-2.5 rounded-full bg-[#6cc66b]" />
      </span>
      <span data-piece="domain" className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white px-2.5 py-1 font-mono text-[11px] text-[#3b3b3b]">
        <Lock className="size-3 shrink-0 text-[#2f7a4f]" />
        <span className="truncate">kesarthreads.in</span>
      </span>
      <span data-piece="live" className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#2f7a4f]">
        <span className="pulse size-1.5 rounded-full bg-[#2f9e5b]" /> Live
      </span>
    </div>
  );
}

function StoreBody() {
  return (
    <div data-piece="storefront" className="bg-white px-5 pb-5 pt-4 text-[#1c1a17]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[15px] font-semibold tracking-tight">kesar threads</span>
        <span className="flex items-center gap-4 text-[11px] text-[#5b5650]">
          <span>New</span>
          <span>Kurtas</span>
          <span>Co-ords</span>
          <ShoppingBag className="size-4 text-[#1c1a17]" />
        </span>
      </div>
      <div className="mt-4 rounded-xl bg-[#fbe9d8] px-4 py-4">
        <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#9a4a12]">Festive drop</p>
        <p className="mt-1 font-display text-[19px] font-semibold leading-tight tracking-tight">Handblock cotton, made in Jaipur</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {products.map((p) => (
          <div key={p.name}>
            <div className="aspect-[4/5] rounded-lg" style={{ background: p.swatch }} />
            <p className="mt-1.5 truncate text-[11px] font-medium">{p.name}</p>
            <p className="font-mono text-[10.5px] text-[#6b655d]">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bottom sheet: UPI / Cards / COD with toggles. */
function CheckoutSheet({ className = "" }: { className?: string }) {
  const rows = [
    { label: "UPI", note: "GPay · PhonePe · Paytm", on: true },
    { label: "Cards", note: "Visa · Mastercard · RuPay", on: false },
    { label: "Cash on delivery", note: "Confirmed on WhatsApp", on: true },
  ];
  return (
    <div data-piece="checkout" className={`w-[220px] rounded-2xl bg-white p-4 sm:w-[260px] text-[#1c1a17] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.55)] ring-1 ring-black/5 ${className}`}>
      <p className="font-display text-[14px] font-semibold tracking-tight">Checkout</p>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 rounded-lg bg-[#f6f4f0] px-3 py-2">
            <span>
              <span className="block text-[12px] font-medium">{r.label}</span>
              <span className="block text-[10px] text-[#6b655d]">{r.note}</span>
            </span>
            <span className={`relative h-[18px] w-8 shrink-0 rounded-full ${r.on ? "bg-[#2f9e5b]" : "bg-[#d9d4cc]"}`}>
              <span className={`absolute top-[2px] size-[14px] rounded-full bg-white shadow-sm ${r.on ? "left-[16px]" : "left-[2px]"}`} />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex h-9 items-center justify-center rounded-lg bg-[#1c1a17] text-[12px] font-semibold text-white">Pay ₹1,499</div>
    </div>
  );
}

function WhatsAppBubble({ className = "" }: { className?: string }) {
  return (
    <div data-piece="whatsapp" className={`w-[200px] rounded-2xl rounded-tl-sm bg-[#dcf8c6] p-3 sm:w-[236px] text-[#13261b] shadow-[0_20px_40px_-18px_rgb(0_0_0/0.6)] ${className}`}>
      <p className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[#1f7a4a]">
        <WhatsAppIcon className="size-3.5" /> kesar threads
      </p>
      <p className="mt-1 text-[12px] leading-snug">Your order #1042 is confirmed. It ships tomorrow, and we&apos;ll share tracking here.</p>
      <p className="mt-1 flex items-center justify-end gap-1 text-[9.5px] text-[#4b6b57]">
        10:42 <Check className="size-3" />
      </p>
    </div>
  );
}

/** Analytics + Pixel card. A shape, not numbers: no invented metrics. */
function AnalyticsCard({ className = "" }: { className?: string }) {
  return (
    <div data-piece="analytics" className={`w-[190px] rounded-2xl bg-[#0f1218] p-3.5 sm:w-[210px] text-white shadow-[0_20px_40px_-18px_rgb(0_0_0/0.7)] ring-1 ring-white/10 ${className}`}>
      <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-white/60">Analytics</p>
      <svg viewBox="0 0 160 46" className="mt-2 w-full" fill="none">
        <path d="M2 40 C 22 38, 30 30, 46 31 S 74 20, 90 22 S 120 10, 134 12 S 152 6, 158 4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        <path d="M2 40 C 22 38, 30 30, 46 31 S 74 20, 90 22 S 120 10, 134 12 S 152 6, 158 4 V46 H2Z" fill="var(--accent)" opacity="0.12" />
      </svg>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/80">
        <span className="size-1.5 rounded-full bg-[#2f9e5b]" /> Meta Pixel connected
      </p>
    </div>
  );
}

function DropCard({ className = "" }: { className?: string }) {
  return (
    <div data-piece="drops" className={`w-[190px] rounded-2xl bg-white p-3.5 sm:w-[210px] text-[#1c1a17] shadow-[0_20px_40px_-18px_rgb(0_0_0/0.55)] ring-1 ring-black/5 ${className}`}>
      <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#9a4a12]">Drop 04 · waitlist open</p>
      <p className="mt-1 font-display text-[14px] font-semibold leading-tight tracking-tight">Monsoon linen, back in stock soon</p>
      <div className="mt-2.5 flex h-8 items-center justify-center rounded-lg bg-[#1c1a17] text-[11px] font-semibold text-white">Notify me</div>
    </div>
  );
}

/**
 * The full composition. `variant="hero"` adds depth layers for the cursor parallax and the looping
 * "order placed" toast; `variant="story"` lays the pieces out so each can build in on its own day.
 */
export function Storefront({ variant }: { variant: "hero" | "story" }) {
  const hero = variant === "hero";
  return (
    <div aria-hidden="true" className="relative select-none">
      {/* Browser window */}
      <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_50px_100px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/10">
        <BrowserBar />
        <div className="relative">
          {/* Skeleton the store builds over (seen on day 1 of the story). */}
          <div className="absolute inset-0 space-y-3 p-5" aria-hidden="true">
            <div className="h-3 w-24 rounded bg-[#ece9e3]" />
            <div className="h-20 rounded-xl bg-[#f3f1ec]" />
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-[4/5] rounded-lg bg-[#f3f1ec]" />
              <div className="aspect-[4/5] rounded-lg bg-[#f3f1ec]" />
              <div className="aspect-[4/5] rounded-lg bg-[#f3f1ec]" />
            </div>
          </div>
          <div className="relative">
            <StoreBody />
          </div>
        </div>
      </div>

      {/* Floating pieces */}
      <div className="absolute -bottom-10 right-[-6%] sm:-bottom-12" data-depth={hero ? "1.6" : undefined}>
        <CheckoutSheet />
      </div>
      <div className="absolute -left-[8%] top-[46%]" data-depth={hero ? "2.2" : undefined}>
        <WhatsAppBubble />
      </div>
      {!hero && (
        <>
          <div className="absolute -right-[7%] top-[14%]">
            <AnalyticsCard />
          </div>
          <div className="absolute -left-[6%] -top-8">
            <DropCard />
          </div>
        </>
      )}

      {/* Decorative "order placed" toast that loops in the corner (hero only). */}
      {hero && (
        <div className="absolute -top-6 right-[-4%]" data-depth="2.6">
          <div className="order-toast flex items-center gap-2.5 rounded-xl bg-[#0f1218]/95 px-3 py-2.5 text-white shadow-[0_20px_40px_-18px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
            <span className="grid size-7 place-items-center rounded-lg bg-accent text-accent-ink">
              <ShoppingBag className="size-3.5" />
            </span>
            <span>
              <span className="block text-[12px] font-semibold leading-tight">Order placed</span>
              <span className="block font-mono text-[10px] text-white/60">₹1,499 · Jaipur · UPI</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
