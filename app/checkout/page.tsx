import { Check } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { siteConfig } from "@/content/site";
import { checkoutTotal } from "@/lib/checkout";
import { formatINR } from "@/lib/format";
import { paymentsMode } from "@/lib/razorpay";

export const metadata: Metadata = {
  title: { absolute: "Pay for your store | Teamy" },
  description: "Pay for your Teamy starter store securely through Razorpay, with UPI, cards or netbanking.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

/**
 * /checkout: where a brand pays for its starter store, once it has approved its free preview
 * (Teamy sends the link on WhatsApp). Out of search results.
 */
export default async function CheckoutPage() {
  await connection(); // read the Razorpay keys when the page is requested, not at build time
  const mode = paymentsMode();
  const { plan, launchDays, responseHours, checkout } = siteConfig;
  const { amount, gst, total } = checkoutTotal();
  const steps = [
    "Pay securely through Razorpay.",
    `We confirm on WhatsApp within ${responseHours} hours (Monday to Saturday) and plan the build with you.`,
    `Your store goes live in about ${launchDays} days, once we have your products and details.`,
  ];

  return (
    <>
      <Header />
      <main id="main" className="pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
        <section id="top" className="container-page pb-24 pt-12 lg:pt-20">
          {mode === "test" && (
            <p role="status" className="mb-10 rounded-2xl border border-dashed border-accent/60 px-5 py-4 text-[15px] text-fg-2">
              <strong className="text-fg">Test mode:</strong> no real money moves. Pay with the test card 4100 2800 0000 1007,
              any future expiry date, any CVV and any OTP of 4 to 10 digits.
            </p>
          )}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="label-mono text-accent">Checkout</p>
              <h1 className="display-l mt-6">
                Pay for your store. <span className="font-light text-fg-2">Then we build it.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-fg-2">
                For brands that have seen and approved their free preview. Not there yet?{" "}
                <WhatsAppCTA source="checkout_preview" className="font-semibold text-fg underline underline-offset-4">
                  Ask for your free preview
                </WhatsAppCTA>{" "}
                first.
              </p>

              <dl className="card mt-10 rounded-[24px] p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-semibold">{plan.name}</dt>
                  <dd className="tabular-nums">{formatINR(amount)}</dd>
                </div>
                {gst > 0 && (
                  <div className="mt-3 flex items-baseline justify-between gap-4 text-fg-2">
                    <dt>GST ({checkout.gstPercent}%)</dt>
                    <dd className="tabular-nums">{formatINR(gst)}</dd>
                  </div>
                )}
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-5">
                  <dt className="label-mono text-fg-3">Total, one-time</dt>
                  <dd className="font-display text-3xl font-semibold tracking-[-0.03em] tabular-nums">{formatINR(total)}</dd>
                </div>
              </dl>

              <h2 className="label-mono mt-10 text-fg-3">What happens next</h2>
              <ol className="mt-4 space-y-3.5">
                {steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-fg-2">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs text-accent-ink">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {mode === "off" ? (
                <div className="card rounded-[28px] p-6 sm:p-10">
                  <h2 className="text-xl font-semibold tracking-[-0.02em]">Online payment opens soon</h2>
                  <p className="mt-3 text-fg-2">Message us on WhatsApp and we&apos;ll send you a secure payment link.</p>
                  <WhatsAppCTA source="checkout_unavailable" className={buttonClass("primary", "mt-8 w-full", "lg")}>
                    <WhatsAppIcon className="size-5" /> Message us on WhatsApp
                  </WhatsAppCTA>
                </div>
              ) : (
                <CheckoutForm total={total} />
              )}
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-3">
                {["Card and UPI details go to Razorpay only", "One-time, nothing recurring", "Questions? We're on WhatsApp"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-accent" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
