import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/site.config";

/** Words-only Shark Tank India angle. No logos, clips or endorsement-style styling. */
export function SharkTank() {
  const t = siteConfig.sharkTank;
  return (
    <section id="shark-tank" aria-labelledby="shark-title" className="section-pad relative overflow-hidden">
      {/* Soft colour wash behind the big statement. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--violet-rgb)/0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent-rgb)/0.35),transparent)]"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
        <Reveal as="header">
          <h2 id="shark-title" className="font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.025em]">
            <span className="sr-only">{t.title}</span>
            <span aria-hidden="true">
              <SplitWords text={t.title} highlight={t.highlight} tone="light" />
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{t.sub}</p>
          <a href="#contact" className={buttonClass("dark", "mt-8 text-[17px]")}>
            Get your own store
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="on-night relative rounded-[32px] bg-night p-6 text-on-night shadow-[0_40px_80px_-40px_rgb(var(--night-rgb)/0.8)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-on-night-soft">The questions every Shark asks</p>
            <ul className="mt-5 space-y-3">
              {t.questions.map((q, i) => (
                <li
                  key={q}
                  className="pop relative rounded-[20px] rounded-bl-md bg-night-2 px-5 py-4 font-display text-xl font-bold tracking-tight ring-1 ring-line-night"
                  style={{ ["--d" as string]: 200 + i * 180, marginLeft: `${i * 6}%` }}
                >
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
            <p className="pop mt-6 flex items-start gap-3 rounded-2xl bg-accent px-5 py-4 font-semibold text-accent-ink" style={{ ["--d" as string]: 800 }}>
              <span aria-hidden="true" className="text-xl leading-none">→</span>
              {t.punchline}
            </p>
          </div>
        </Reveal>
      </div>
      <p className="container-page relative mt-10 text-sm text-ink-soft">{t.disclaimer}</p>
    </section>
  );
}
