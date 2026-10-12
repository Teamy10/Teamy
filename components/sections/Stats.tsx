import { isFilled, siteConfig } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { formatINR } from "@/lib/format";

/**
 * Trust stats: the owner's figures from content/site.ts; a "TODO…" value is skipped.
 * The final value is rendered on the server, so it's correct without JavaScript; the motion
 * runtime counts the number up once when it scrolls into view.
 */
export function Stats() {
  const stats = siteConfig.stats.filter((s) => typeof s.value === "number" && isFilled(s.value));
  return (
    <section aria-label="Teamy in numbers" className="py-16 max-lg:cv-auto max-lg:[--cv-h:400px] md:py-20">
      <dl className="container-page grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((s, i) => {
          const n = s.value as number;
          return (
            <Reveal key={s.label} delay={i * 0.06} className="flex flex-col-reverse border-l border-line pl-5 md:pl-6">
              <dt className="mt-3 max-w-[16rem] text-[15px] leading-snug text-fg-2">{s.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                {s.prefix && <span className="text-fg-2">{s.prefix}</span>}
                <span data-countup={n} data-format={s.inr ? "inr" : s.decimals ? `dec${s.decimals}` : "int"}>
                  {s.inr ? formatINR(n) : s.decimals ? n.toFixed(s.decimals) : n}
                </span>
                {s.suffix && <span className="text-fg-2">{s.suffix}</span>}
              </dd>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}
