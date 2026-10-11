import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatINR } from "@/lib/format";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = { title: `Terms | ${siteConfig.brand}`, robots: { index: false } };

export default function Terms() {
  return (
    <LegalPage title="Terms">
      <p className="rounded-2xl bg-accent p-4 font-semibold text-ink">
        [ADD REAL TERMS] This is a placeholder. Include your price ({formatINR(siteConfig.plan.price)} one-time), payment
        schedule and refund terms in the final version.
      </p>
    </LegalPage>
  );
}
