import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main id="main" className="container-page max-w-3xl py-10">
      <Link href="/" aria-label="Teamy home" className="inline-flex min-h-12 items-center">
        <Logo className="h-8 w-auto" />
      </Link>
      <h1 className="h2-size mt-10 font-bold">{title}</h1>
      <div className="mt-6 space-y-4 text-ink-soft [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
        {children}
      </div>
      <Link href="/" className="mt-10 inline-flex min-h-12 items-center font-semibold text-support underline underline-offset-4">
        ← Back to Teamy
      </Link>
    </main>
  );
}
