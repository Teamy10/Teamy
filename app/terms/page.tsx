import Link from "next/link";
import { LegalPage, Pending } from "@/components/LegalPage";
import { addressLine } from "@/components/sections/Footer";
import { siteConfig } from "@/content/site";
import { formatINR } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms & Conditions | Teamy",
  description: "The terms for using the Teamy website and for the online stores Teamy designs, builds and runs for brands in India.",
  path: "/terms",
  sharedImage: true,
});

const UPDATED = "12 October 2026";

export default function Terms() {
  const { contact, brand, plan, launchDays } = siteConfig;
  return (
    <LegalPage title="Terms & Conditions" updated={UPDATED}>
      <p>
        These terms apply to this website and to the services {brand} provides. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean{" "}
        {brand}, {addressLine()}. &ldquo;You&rdquo; means the person or business using the website or engaging us. By using the
        website or asking us to start work, you agree to these terms.
      </p>

      <h2>1. Our services</h2>
      <p>
        We design, build and set up online stores, including storefront design, checkout with UPI, cards and cash on
        delivery, WhatsApp order updates, analytics and related features, as described on this website and in the proposal we
        share with you. Add-ons, such as catalogue upload, SEO setup, marketplace sync, brand refresh and the care plan, are
        quoted separately.
      </p>

      <h2>2. Free preview</h2>
      <p>
        Before you pay, we may prepare a free preview of your store. A preview doesn&apos;t oblige you to buy anything, and it
        remains our property until you engage us.
      </p>

      <h2>3. Price and payment</h2>
      <p>
        The standard build costs {formatINR(plan.price)}, one-time, unless a different price is agreed in writing. Payment is
        made in these stages: <Pending>payment stages, e.g. advance on approval and balance before launch</Pending>. Prices
        exclude any taxes that apply, which are shown on your invoice. <Pending>confirm GST treatment</Pending>.
      </p>
      <p>
        You pay third parties directly for services in your own name, including your domain, payment gateway fees and any
        charges for business messaging on WhatsApp. These are not included in our price.
      </p>

      <h2>4. Timelines</h2>
      <p>
        Most stores go live in about {launchDays} days after you approve the preview and send us what we need: products,
        photos, business details and access to your accounts. Timelines depend on your catalogue, on how quickly you respond,
        and on third parties such as payment gateways, which approve accounts on their own schedule. We&apos;ll tell you if
        something is likely to cause a delay.
      </p>

      <h2>5. Your responsibilities</h2>
      <ul>
        <li>Give us accurate information and content you have the right to use, including product photos, text and logos.</li>
        <li>Make sure your products, prices and policies comply with the law, including consumer protection and GST rules.</li>
        <li>Complete the verification your payment gateway, domain registrar and WhatsApp business account require.</li>
        <li>Keep your account passwords safe once we hand them over.</li>
      </ul>

      <h2>6. Ownership</h2>
      <p>
        Once you&apos;ve paid in full, you own your store&apos;s design, content and code that we created for you. Your domain,
        payment gateway and business accounts are in your name, and your customer data belongs to you. We may keep using our
        general know-how, tools and reusable components, and we may show your live store in our portfolio unless you ask us not
        to.
      </p>

      <h2>7. Support and changes</h2>
      <p>
        After launch, we help with questions and small fixes over WhatsApp, as described in your proposal:{" "}
        <Pending>define what counts as a small fix and for how long</Pending>. Larger changes and new features are quoted
        before we start. Ongoing updates are available through the optional care plan.
      </p>

      <h2>8. Third-party services</h2>
      <p>
        Your store relies on third-party services such as hosting, payment gateways, couriers and WhatsApp. We choose and set
        them up carefully, but we&apos;re not responsible for their outages, fee changes or decisions, such as a payment
        gateway declining an application.
      </p>

      <h2>9. Liability</h2>
      <p>
        We build every store with care and test it before launch. To the extent the law allows, we&apos;re not liable for
        indirect losses such as lost sales or profits, and our total liability for any claim is limited to the amount you paid
        us for the service concerned.
      </p>

      <h2>10. Cancellation and refunds</h2>
      <p>
        Cancellations and refunds are covered by our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
      </p>

      <h2>11. Using this website</h2>
      <p>
        You may browse this website for your own information. Please don&apos;t copy its content or design for commercial use,
        try to break its security, or use it for anything unlawful. The example storefront shown on the home page is
        illustrative and uses an invented brand.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts at <Pending>confirm jurisdiction, e.g. Jaipur, Rajasthan</Pending>{" "}
        have jurisdiction over any dispute.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${contact.email}`}>{contact.email}</a> or message us on WhatsApp at{" "}
        {contact.whatsappDisplay}.
      </p>
    </LegalPage>
  );
}
