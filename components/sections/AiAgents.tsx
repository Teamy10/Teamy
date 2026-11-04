import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FestiveDivider } from "@/components/festive/Motifs";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";

/** "AI agents that work your WhatsApp, 24/7": four agents, what they run on, and the free audit. */
export function AiAgents() {
  const { title, emphasis, sub, agents, note, worksWith } = siteConfig.aiAgents;
  return (
    <section id="ai-agents" aria-labelledby="ai-agents-title" className="section-pad cv-auto relative">
      <FestiveDivider />
      <div className="container-page">
        <SectionHeading id="ai-agents-title" title={title} emphasis={emphasis} sub={sub} />
        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {agents.map((a, i) => (
            <Reveal as="li" key={a.title} delay={(i % 4) * 0.06} className="card flex h-full flex-col rounded-[24px] p-7 sm:p-8">
              <p className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-[22px] font-semibold leading-tight tracking-[-0.02em]">{a.title}</h3>
              <p className="mt-3 text-fg-2">{a.line}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.1} className="mt-10 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-lg text-fg">{note}</p>
            <p className="text-fg-2">
              <span className="label-mono mr-2 text-fg-3">Works with</span>
              {worksWith.join(" · ")}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a href="#audit" data-magnetic="" className={buttonClass("primary", "w-full sm:w-auto", "lg")}>
              Get a free store audit <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <Link href="/services/whatsapp-ai-agent" className={buttonClass("ghost")}>
              How it works <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
