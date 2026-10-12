import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { servicePages } from "@/content/pages";

export const metadata: Metadata = { title: "Page not found | Teamy", robots: { index: false }, alternates: { canonical: null } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
        <section id="top" className="container-page pb-24 pt-16 lg:pt-28">
          <p className="label-mono text-accent">404</p>
          <h1 className="display-l mt-6 max-w-3xl">
            This page isn&apos;t here. <span className="font-light text-fg-2">Your store could be.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fg-2">
            The link may be old or mistyped. Head back home, or tell us about your brand on WhatsApp.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <Link href="/" prefetch={false} className={buttonClass("primary", "w-full sm:w-auto", "lg")}>
              Back to the home page
            </Link>
            <WhatsAppCTA source="not_found" className={buttonClass("ghost")}>
              <WhatsAppIcon className="size-5" /> Message us on WhatsApp
            </WhatsAppCTA>
          </div>
          <h2 className="label-mono mt-20 text-fg-3">Popular pages</h2>
          <ul className="mt-4 max-w-xl border-t border-line">
            {servicePages.slice(0, 4).map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={p.path} className="group flex min-h-14 items-center justify-between gap-4 py-3 font-medium">
                  {p.name}
                  <ArrowRight className="size-5 shrink-0 text-fg-3 transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
