import { ArrowUpRight } from "lucide-react";
import { PhoneFrame, StoreSkeleton } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoSlot } from "@/components/ui/TodoSlot";
import { isFilled, siteConfig } from "@/content/site";
import { publicFileExists, showPlaceholders } from "@/lib/assets";
import { InViewVideo } from "./InViewVideo";

/**
 * "See our stores in action": 9:16 clips in phone frames (snap carousel on mobile).
 * Only clips whose files exist are shown; with none uploaded the section is hidden on the live
 * site and shows placeholders in dev.
 */
export function Videos() {
  const clips = siteConfig.portfolio
    .filter((p) => p.video)
    .map((p) => ({ ...p, ready: publicFileExists(p.video!.src), hasPoster: publicFileExists(p.video!.poster) }));
  const ready = clips.filter((c) => c.ready);
  if (ready.length === 0 && !showPlaceholders) return null;
  const list = ready.length ? ready : clips;
  const more = [siteConfig.socials.youtube, siteConfig.socials.instagram].find((u) => isFilled(u));

  return (
    <section id="in-action" aria-labelledby="videos-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          id="videos-title"
          title="See our stores in action."
          emphasis="in action."
          sub="Short screen recordings of real stores: homepage, product, checkout."
        />
        {ready.length === 0 && (
          <TodoSlot className="mt-10">
            Add <code>/public/videos/ganges.mp4</code> and <code>/public/videos/haat.mp4</code> (9:16, H.264, under 3&nbsp;MB) plus
            matching <code>.webp</code> posters. This section stays hidden on the live site until a video exists.
          </TodoSlot>
        )}
      </div>
      <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:container-page md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
        {list.map((c, i) => (
          <Reveal as="li" key={c.name} delay={i * 0.08} className="w-[72%] max-w-[300px] shrink-0 snap-center md:w-auto md:max-w-none">
            <figure>
              <PhoneFrame>
                {c.ready ? (
                  <InViewVideo src={c.video!.src} poster={c.hasPoster ? c.video!.poster : undefined} label={`${c.name}: homepage, product and checkout`} />
                ) : (
                  <StoreSkeleton label={c.name} />
                )}
              </PhoneFrame>
              <figcaption className="mt-5 text-center">
                <span className="block font-semibold">{c.name}</span>
                <span className="label-mono mt-1 block text-fg-3">Homepage → product → checkout</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
      {more && (
        <div className="container-page mt-10 text-center">
          <a href={more} target="_blank" rel="noopener noreferrer" className="underline-anim [--u-rest:0.35] inline-flex min-h-12 items-center gap-1.5 font-semibold">
            Watch more on {more.includes("youtube") ? "YouTube" : "Instagram"} <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </section>
  );
}
