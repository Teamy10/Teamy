import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="main" className="container-page max-w-3xl py-10">
      <Link href="/" aria-label="Teamy home" className="inline-flex min-h-12 items-center">
        <Logo className="h-8 w-auto" />
      </Link>
      <h1 className="display-l mt-12">{title}</h1>
      <div className="mt-8 space-y-4 text-fg-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-fg">
        {children}
      </div>
      <Link href="/" className="underline-anim mt-12 inline-flex min-h-12 items-center font-semibold text-fg">
        ← Back to Teamy
      </Link>
    </main>
  );
}
