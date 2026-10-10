import { ArrowDown, Check, MessageCircle, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { TrackedLink, WhatsAppLink } from "@/components/ui/TrackedLink";
import { siteConfig } from "@/site.config";
import { HeroHeadline } from "./HeroHeadline";
import { PhoneMockup } from "./PhoneMockup";

/** Small glassy card that floats beside the phone. Decorative only. */
function FloatCard({ className, icon, title, body }: { className: string; icon: ReactNode; title: string; body: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-night-2/80 px-4 py-3 text-on-night shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md ${className}`}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-ink">{icon}</span>
      <span>
        <span className="block text-sm font-semibold leading-tight">{title}</span>
        <span className="block text-[13px] text-on-night-soft">{body}</span>
      </span>
    </div>
  );
}

export function Hero() {
  const { hero } = siteConfig;
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-night relative overflow-hidden bg-night pt-[calc(var(--header-h)+env(safe-area-inset-top)+28px)]"
    >
      {/* Drifting aurora + dot grid. */}
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-16 pb-24 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-32 lg:pt-12">
        <div className="min-w-0">
          <div>
            <HeroHeadline lines={hero.headlines} rotateMs={hero.rotateMs} srText={hero.srHeadline} />
          </div>
          <p className="mt-4 max-w-xl text-lg text-on-night-soft md:text-xl">{hero.sub}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <WhatsAppLink
              section="hero_book_call"
              message="bookCall"
              className={buttonClass("primary", "sheen-idle w-full text-[17px] sm:w-auto")}
            >
              <WhatsAppIcon className="size-5" /> Book a free call
            </WhatsAppLink>
            <TrackedLink
              href="#pricing"
              event="hero_cta_click"
              params={{ location: "hero_pricing" }}
              className={buttonClass("ghost-night", "w-full text-[17px] sm:w-auto")}
            >
              See pricing
              <ArrowDown className="size-4 transition-transform group-hover/btn:translate-y-0.5" aria-hidden="true" />
            </TrackedLink>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-on-night-soft">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-accent" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Phone tilts toward the cursor (desktop); cards float around it. */}
        <div data-tilt-zone className="relative mx-auto w-full max-w-[460px] py-6">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(200_242_90/0.25),transparent)]"
          />
          <div data-tilt className="relative transition-transform duration-500 ease-out will-change-transform">
            <PhoneMockup />
          </div>
          <FloatCard
            className="float -left-1 top-[44%] sm:-left-6"
            icon={<Zap className="size-4" />}
            title="Fast checkout"
            body="UPI · Cards · COD"
          />
          <FloatCard
            className="float-slow -right-1 top-[68%] sm:-right-8"
            icon={<MessageCircle className="size-4" />}
            title="Order shipped"
            body="Sent on WhatsApp"
          />
        </div>
      </div>
    </section>
  );
}
