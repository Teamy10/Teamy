import type { ReactNode } from "react";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { showPlaceholders } from "@/lib/assets";

/**
 * A detail the owner still has to decide (e.g. refund percentages). Shows the TODO in dev and a
 * neutral "[to be confirmed]" on the live site, so nothing invented ever ships as a policy term.
 */
export function Pending({ children }: { children: ReactNode }) {
  return showPlaceholders ? (
    <mark className="rounded bg-accent/20 px-1 text-fg">TODO: {children}</mark>
  ) : (
    <span className="text-fg-3">[to be confirmed]</span>
  );
}

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
        <article id="top" className="container-page max-w-3xl pb-24 pt-12 lg:pt-20">
          <h1 className="display-l">{title}</h1>
          <p className="label-mono mt-6 text-fg-3">Last updated {updated}</p>
          <div className="mt-10 space-y-4 text-fg-2 [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-4 [&_h2]:!mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-fg [&_h3]:!mt-6 [&_h3]:font-semibold [&_h3]:text-fg [&_li]:pl-1 [&_strong]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
