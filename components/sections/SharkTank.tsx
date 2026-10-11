import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { MaskWords } from "@/components/ui/MaskWords";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/content/site";

/** Words-only Shark Tank India angle. No logos, clips or endorsement-style styling. */
export function SharkTank() {
  const t = siteConfig.sharkTank;
  return (
    <section id="shark-tank" aria-labelledby="shark-title" className="section-pad relative">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <header className="lg:col-span-7">
          <Reveal className="reveal-mask">
            <h2 id="shark-title" className="display-l">
              <MaskWords text={t.title} emphasis={t.highlight} />
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg text-fg-2">{t.sub}</p>
            <a href="#contact" className={buttonClass("secondary", "mt-9")}>
              Get your own store <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
        </header>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="card rounded-[28px] p-6 sm:p-8">
            <p className="label-mono text-fg-3">The questions every Shark asks</p>
            <ul className="mt-6 space-y-3">
              {t.questions.map((q, i) => (
                <li
                  key={q}
                  className="stagger-item card-2 rounded-2xl rounded-bl-md px-5 py-4 font-display text-xl font-medium tracking-[-0.02em]"
                  style={{ ["--i" as string]: i, marginLeft: `${i * 5}%` }}
                >
                  &ldquo;{q}&rdquo;
                </li>
              ))}
            </ul>
            <p className="stagger-item mt-6 border-l-2 border-accent pl-4 font-medium text-fg" style={{ ["--i" as string]: 3 }}>
              {t.punchline}
            </p>
          </div>
        </Reveal>
      </div>
      <p className="container-page mt-12 text-sm text-fg-3">{t.disclaimer}</p>
    </section>
  );
}
