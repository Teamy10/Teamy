import { ArrowUpRight } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { PhoneFrame, StoreSkeleton } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoSlot } from "@/components/ui/TodoSlot";
import { assets, liveProjects } from "@/content/projects";
import { isFilled, siteConfig } from "@/content/site";
import { publicFileExists, showPlaceholders } from "@/lib/assets";
import { InViewVideo } from "./InViewVideo";

/**
 * "Our websites, in motion": 9:16 phone recordings of live client sites (`npm run capture:videos`),
 * in phone frames (snap carousel on mobile). Only clips whose files exist are shown; with none
 * yet, the section is hidden on the live site and shows a placeholder in dev.
 */
export function Videos() {
  const clips = liveProjects.map((p) => {
    const a = assets(p.slug);
    return { ...p, video: { src: a.video, poster: a.poster }, ready: publicFileExists(a.video), hasPoster: publicFileExists(a.poster) };
  });
  const ready = clips.filter((c) => c.ready);
  if (ready.length === 0 && !showPlaceholders) return null;
  const list = ready.length ? ready : clips;
  const more = [siteConfig.socials.youtube, siteConfig.socials.instagram].find((u) => isFilled(u));

  return (
    <section id="in-action" aria-labelledby="videos-title" className="section-pad max-lg:cv-auto">
      <div className="container-page">
        <SectionHeading
          id="videos-title"
          title="Our websites, in motion."
          emphasis="in motion."
          sub="Real client homepages on a phone, the way their customers see them."
        />
        {ready.length === 0 && (
          <TodoSlot className="mt-10">
            Run <code>npm run capture:videos</code> to record every live client site. This section stays hidden on the live site
            until a video exists.
          </TodoSlot>
        )}
      </div>
      <div className="container-page mt-12">
        <Carousel label="Client websites on a phone" item="video">
          {list.map((c, i) => (
            <Reveal as="li" key={c.name} delay={Math.min(i, 3) * 0.08} className="w-[62%] max-w-[260px] shrink-0 snap-start sm:w-[calc((100%-48px)/3)] lg:w-[calc((100%-96px)/5)] lg:max-w-none">
              <figure>
                <PhoneFrame>
                  {c.ready ? (
                    <InViewVideo src={c.video.src} poster={c.hasPoster ? c.video.poster : undefined} label={`${c.name}: the homepage, scrolled on a phone`} />
                  ) : (
                    <StoreSkeleton label={c.name} />
                  )}
                </PhoneFrame>
                <figcaption className="mt-5 text-center">
                  <span className="block font-semibold">{c.name}</span>
                  <span className="label-mono mt-1 block text-fg-3">{c.category}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </Carousel>
      </div>
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
