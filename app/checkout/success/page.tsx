import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PurchaseTracker } from "@/components/checkout/PurchaseTracker";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { siteConfig } from "@/content/site";
import { checkoutTotal } from "@/lib/checkout";
import { formatINR } from "@/lib/format";
import { confirmPayment } from "@/lib/razorpay";

export const metadata: Metadata = {
  title: { absolute: "Payment | Teamy" },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

type Search = Promise<Record<string, string | string[] | undefined>>;

/**
 * Where Checkout lands after a payment. Nothing here is taken on trust from the URL: the signature
 * is checked, and Razorpay is asked whether the payment really went through for this order.
 */
export default async function CheckoutSuccess({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const param = (k: string) => (typeof sp[k] === "string" ? sp[k] : "");
  const paymentId = param("payment");
  const { total } = checkoutTotal();
  const check = await confirmPayment(param("order"), paymentId, param("signature"), total * 100);
  const { plan, responseHours } = siteConfig;
  const brand = check.ok ? check.order.notes?.brand : undefined;
  const firstName = check.ok ? check.order.notes?.name?.split(" ")[0] : undefined;
  const message = check.ok
    ? [`Hi Teamy! I've just paid ${formatINR(total)} for the ${plan.name}.`, `Payment ID: ${paymentId}`, ...(brand ? [`Brand: ${brand}`] : [])].join("\n")
    : [`Hi Teamy! I tried to pay for the ${plan.name} and need help.`, ...(paymentId ? [`Payment ID: ${paymentId}`] : [])].join("\n");

  return (
    <>
      <Header />
      <main id="main" className="pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
        <section id="top" className="container-page max-w-3xl pb-24 pt-12 lg:pt-20">
          {check.ok ? (
            <>
              <PurchaseTracker paymentId={paymentId} value={total} />
              <CircleCheck className="size-12 text-accent" aria-hidden="true" />
              <h1 className="display-l mt-6">
                Payment received. <span className="font-light text-fg-2">Let&apos;s build your store.</span>
              </h1>
              <p className="mt-6 text-lg text-fg-2">
                Thank you{firstName ? `, ${firstName}` : ""}. We&apos;ll message you on WhatsApp within {responseHours} hours (Monday to
                Saturday) to plan the build. Want to start sooner? Message us now.
              </p>
              <dl className="card mt-10 grid gap-4 rounded-[24px] p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <dt className="label-mono text-fg-3">Amount</dt>
                  <dd className="mt-1 font-semibold tabular-nums">{formatINR(check.payment.amount / 100)}</dd>
                </div>
                <div>
                  <dt className="label-mono text-fg-3">Payment ID</dt>
                  <dd className="mt-1 break-all font-mono text-sm">{paymentId}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <h1 className="display-l">We couldn&apos;t confirm this payment.</h1>
              <p className="mt-6 text-lg text-fg-2">
                {check.reason === "invalid"
                  ? "This link doesn't match a payment."
                  : "Razorpay hasn't confirmed it yet. This can take a minute."}{" "}
                If money has left your account, message us on WhatsApp with your payment ID and we&apos;ll check it with you right
                away.
              </p>
            </>
          )}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <WhatsAppCTA source={check.ok ? "checkout_paid" : "checkout_unconfirmed"} message={message} className={buttonClass("primary", "w-full sm:w-auto", "lg")}>
              <WhatsAppIcon className="size-5" /> Message us on WhatsApp
            </WhatsAppCTA>
            <Link href="/" prefetch={false} className={buttonClass("ghost")}>
              Back to the home page
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
