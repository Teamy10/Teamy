import { LegalPage, Pending } from "@/components/LegalPage";
import { siteConfig } from "@/content/site";
import { formatINR } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Refund & Cancellation Policy | Teamy",
  description: "How cancellations and refunds work for Teamy's online store builds: the free preview, payment stages, and what can be refunded.",
  path: "/refund-policy",
  sharedImage: true,
});

const UPDATED = "12 October 2026";

export default function RefundPolicy() {
  const { contact, brand, plan } = siteConfig;
  return (
    <LegalPage title="Refund & Cancellation Policy" updated={UPDATED}>
      <p>
        This policy explains how cancellations and refunds work for the online stores {brand} designs and builds. It forms
        part of our Terms &amp; Conditions.
      </p>

      <h2>1. The free preview</h2>
      <p>
        The preview of your store is free. You don&apos;t pay anything to see it, and you can decide not to go ahead at no
        cost.
      </p>

      <h2>2. Payment stages</h2>
      <p>
        The standard build is {formatINR(plan.price)}, one-time, paid in these stages: <Pending>list the payment stages and
        amounts</Pending>. Each stage is confirmed in writing (WhatsApp or email) before you pay.
      </p>

      <h2>3. Cancelling before work starts</h2>
      <p>
        If you cancel after paying but before we start the full build: <Pending>refund amount or percentage, and any
        deductions</Pending>.
      </p>

      <h2>4. Cancelling during the build</h2>
      <p>
        If you cancel after we&apos;ve started the build but before launch: <Pending>refund terms, e.g. based on work
        completed</Pending>. Any work already delivered to you stays yours.
      </p>

      <h2>5. After launch</h2>
      <p>
        Once your store is live: <Pending>refund terms after launch</Pending>. If something we built doesn&apos;t work as
        agreed, tell us and we&apos;ll fix it.
      </p>

      <h2>6. What can&apos;t be refunded</h2>
      <p>
        Payments you make to third parties, such as your domain registration, payment gateway fees or WhatsApp business
        messaging charges, are made in your name and aren&apos;t refundable by {brand}. Ask the provider about their own refund
        policy. Add-ons and care plans: <Pending>refund terms for add-ons and the care plan</Pending>.
      </p>

      <h2>7. How to request a refund</h2>
      <p>
        Email <a href={`mailto:${contact.email}`}>{contact.email}</a> or message us on WhatsApp at {contact.whatsappDisplay} with
        your name, brand and the payment you&apos;re asking about. We&apos;ll confirm within <Pending>response time</Pending>.
        Approved refunds are paid back to the original payment method within <Pending>refund processing time, e.g. 7–10 working
        days</Pending>.
      </p>

      <h2>8. Questions</h2>
      <p>If anything here is unclear, ask us before you pay. We&apos;d rather explain up front than surprise you later.</p>
    </LegalPage>
  );
}
