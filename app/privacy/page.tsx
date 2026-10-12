import { LegalPage, Pending } from "@/components/LegalPage";
import { addressLine } from "@/lib/address";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy | Teamy",
  description: "How Teamy collects, uses and protects your personal data, and your rights under India's Digital Personal Data Protection Act, 2023.",
  path: "/privacy",
  sharedImage: true,
});

const UPDATED = "12 October 2026";

export default function Privacy() {
  const { contact, brand } = siteConfig;
  return (
    <LegalPage title="Privacy Policy" updated={UPDATED}>
      <p>
        This policy explains what personal data {brand} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this website and
        our WhatsApp, email and call conversations, why we collect it, and the rights you have under India&apos;s Digital
        Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;). For the purposes of the DPDP Act, {brand} is the Data
        Fiduciary for this data.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {brand} is a studio based in {addressLine()} that designs, builds and runs online stores for brands. You can reach us
        at <a href={`mailto:${contact.email}`}>{contact.email}</a> or on WhatsApp at {contact.whatsappDisplay}.
      </p>

      <h2>2. What we collect</h2>
      <h3>When you use the contact form</h3>
      <p>
        The form asks for your name, brand name, WhatsApp number and, optionally, your Instagram handle. The form does not send
        these details to our servers. When you submit it, it opens WhatsApp with a message containing your details, and we
        receive them only if you choose to send that message.
      </p>
      <h3>When you message, email or call us</h3>
      <p>
        We receive what you share with us, such as your name, phone number, WhatsApp profile name, email address, messages,
        and any files or links you send (for example product photos or your current store link).
      </p>
      <h3>When you browse this website</h3>
      <p>
        Our hosting provider records standard technical information, such as your IP address, browser type and the pages
        requested, to keep the site running and secure. If we enable analytics (Google Analytics) or advertising measurement
        (Meta Pixel), these tools set cookies or similar technologies to understand how visitors use the site and which ads
        lead to enquiries. They may collect device information, pages viewed, approximate location and the fact that you
        clicked a WhatsApp button.
      </p>
      <h3>When we build or run a store for you</h3>
      <p>
        While building or running your store, we may access personal data about your customers (for example orders and
        contact details) on your instructions. For that data, you are the Data Fiduciary and we act as your Data Processor,
        under the terms of our agreement with you.
      </p>

      <h2>3. Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and talk to you about your store.</li>
        <li>To prepare a free store preview and a proposal.</li>
        <li>To deliver, support and invoice the services you ask us for.</li>
        <li>To keep the website secure and understand how it&apos;s used, so we can improve it.</li>
        <li>To meet our legal, tax and accounting obligations.</li>
      </ul>
      <p>
        We process your data on the basis of your consent, which you give when you contact us or use the form, and for the
        legitimate uses the DPDP Act allows, such as when you voluntarily share data for a specific purpose. We do not sell
        your personal data, and we don&apos;t use it for purposes unrelated to the ones above.
      </p>

      <h2>4. Who we share it with</h2>
      <p>We share personal data only with service providers that help us operate, and only as needed:</p>
      <ul>
        <li>WhatsApp (Meta), for messages you send us, under WhatsApp&apos;s own privacy policy.</li>
        <li>Our website hosting provider.</li>
        <li>Google and Meta, if analytics or advertising measurement is enabled on this site.</li>
        <li>Our email provider, for emails you send us.</li>
        <li>Government authorities, where the law requires us to.</li>
      </ul>
      <p>Some of these providers may process data outside India, in line with the DPDP Act and any rules made under it.</p>

      <h2>5. How long we keep it</h2>
      <p>
        We keep enquiry data for as long as we&apos;re in conversation with you and for <Pending>retention period for enquiries
        that don&apos;t become projects</Pending> afterwards. For clients, we keep project and invoice records for as long as
        we provide services and then for the period Indian tax and accounting law requires. When data is no longer needed, or
        you withdraw consent and no law requires us to keep it, we delete it.
      </p>

      <h2>6. Your rights</h2>
      <p>Under the DPDP Act, you have the right to:</p>
      <ul>
        <li>Get a summary of the personal data we hold about you and how we use it.</li>
        <li>Ask us to correct, complete or update your data.</li>
        <li>Ask us to erase your data, unless we need to keep it to meet a legal obligation.</li>
        <li>Withdraw your consent at any time. This won&apos;t affect anything we did lawfully before you withdrew it.</li>
        <li>Nominate another person to exercise these rights for you in case of death or incapacity.</li>
        <li>Have your grievance handled by us, and if you&apos;re not satisfied, complain to the Data Protection Board of India.</li>
      </ul>
      <p>
        To use any of these rights, email <a href={`mailto:${contact.email}`}>{contact.email}</a> with the subject &ldquo;Data
        request&rdquo;, or message us on WhatsApp. We&apos;ll reply within <Pending>response time for data requests</Pending>.
      </p>

      <h2>7. Grievance officer</h2>
      <p>
        For complaints about how we handle personal data, contact our grievance officer: <Pending>grievance officer&apos;s
        name</Pending>, <a href={`mailto:${contact.email}`}>{contact.email}</a>, {addressLine()}.
      </p>

      <h2>8. Cookies</h2>
      <p>
        This site itself does not need cookies to work. Cookies are set only by analytics or advertising tools, if we enable
        them. You can block or delete cookies in your browser settings; the site will still work.
      </p>

      <h2>9. Children</h2>
      <p>
        Our services are meant for businesses and adults. We don&apos;t knowingly collect personal data from anyone under 18.
        If you believe a child has shared data with us, contact us and we&apos;ll delete it.
      </p>

      <h2>10. Security</h2>
      <p>
        We take reasonable security measures to protect personal data, including access controls and using reputable service
        providers. No method of transmission or storage is completely secure, but we&apos;ll tell you and the Data Protection
        Board of India if a personal data breach affects you, as the DPDP Act requires.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top shows when it last changed. If the changes are
        significant, we&apos;ll make that clear on this page.
      </p>
    </LegalPage>
  );
}
