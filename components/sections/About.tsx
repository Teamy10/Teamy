import { MapPin } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoSlot } from "@/components/ui/TodoSlot";
import { isFilled, siteConfig, type TeamMember } from "@/content/site";
import { publicFileExists, showPlaceholders } from "@/lib/assets";

const filled = (m: TeamMember) => isFilled(m.name) && isFilled(m.role);

/** "The people behind Teamy": the story, team cards (only once filled in) and the Jaipur base. */
export function About() {
  const { about, contact } = siteConfig;
  const team = about.team.filter(filled);
  const pending = about.team.filter((m) => !filled(m));
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="about-title" title={about.title} emphasis="behind Teamy." />
          <Reveal delay={0.12}>
            <p className="mt-8 inline-flex items-center gap-2 text-fg">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              Based in {contact.address.locality}, {contact.address.region}
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal className="space-y-5 text-lg text-fg-2">
            {about.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
          {(team.length > 0 || showPlaceholders) && (
            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {team.map((m, i) => (
                <Reveal as="li" key={m.name} delay={i * 0.06} className="card flex items-center gap-4 rounded-[20px] p-5">
                  {m.photo && publicFileExists(m.photo) ? (
                    <Image src={m.photo} alt={m.name} width={64} height={64} className="size-16 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden="true" className="grid size-16 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-fg ring-1 ring-line-strong">
                      {m.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block font-semibold">{m.name}</span>
                    <span className="label-mono block text-fg-3">{m.role}</span>
                    {isFilled(m.line) && <span className="mt-1 block text-[15px] leading-snug text-fg-2">{m.line}</span>}
                  </span>
                </Reveal>
              ))}
              {showPlaceholders &&
                pending.map((m, i) => (
                  <li key={`todo-${i}`}>
                    <TodoSlot className="h-full">
                      Team card: add name, role, a one-line bio and a square photo at <code>{m.photo}</code> in{" "}
                      <code>content/site.ts</code>.
                    </TodoSlot>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
