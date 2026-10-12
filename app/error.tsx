"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

/** Shown when a page crashes. No header or footer, in case one of them is what failed. */
export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container-page grid min-h-[80svh] content-center py-24">
      <p className="label-mono text-accent">Something went wrong</p>
      <h1 className="display-l mt-6 max-w-3xl">
        This page didn&apos;t load. <span className="font-light text-fg-2">It&apos;s on us, not you.</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-fg-2">Try again, or message us on WhatsApp and we&apos;ll help right away.</p>
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
        <button type="button" onClick={() => retry()} className={buttonClass("primary", "w-full sm:w-auto", "lg")}>
          Try again
        </button>
        <WhatsAppCTA source="error" className={buttonClass("ghost")}>
          <WhatsAppIcon className="size-5" /> Message us on WhatsApp
        </WhatsAppCTA>
        <Link href="/" prefetch={false} className={buttonClass("ghost")}>
          Home page
        </Link>
      </div>
      {error.digest && <p className="label-mono mt-12 text-fg-3">Error reference: {error.digest}</p>}
    </main>
  );
}
