import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = { title: `Privacy Policy | ${siteConfig.brand}`, robots: { index: false } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="card-2 rounded-2xl p-4 font-semibold text-fg">
        [ADD REAL PRIVACY POLICY] This is a placeholder. Have a lawyer review the final text before launch.
      </p>
      <h2>What we collect</h2>
      <p>
        When you fill in our contact form, we collect your name, brand name, WhatsApp number and, if you
        share them, your Instagram handle and the plan you&apos;re interested in.
      </p>
      <h2>How we use it</h2>
      <p>Only to contact you about your store and Teamy. We don&apos;t sell your data.</p>
      <h2>Contact</h2>
      <p>Questions? Email {siteConfig.contact.email}.</p>
    </LegalPage>
  );
}
