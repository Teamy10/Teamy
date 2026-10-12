import { Check } from "lucide-react";
import type { Metadata } from "next";
import { ReviewForm } from "@/components/review/ReviewForm";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { isFilled } from "@/content/site";
import { draftFor } from "@/content/testimonials";

export const metadata: Metadata = {
  title: { absolute: "Leave a review | Teamy" },
  description: "Worked with Teamy? Tell other brands what it was like. It takes 30 seconds.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

type Search = Promise<Record<string, string | string[] | undefined>>;

/**
 * /review: the link Teamy sends its clients (?brand=…&name=… fills those in, and starts from that
 * brand's draft if it has one). Reviews arrive on WhatsApp, as the client sent them and with their
 * consent. Out of search results.
 */
export default async function ReviewPage({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams;
  const param = (k: string) => (typeof sp[k] === "string" ? sp[k].slice(0, 80) : "");
  const draft = draftFor(param("brand"));
  const name = param("name") || (draft && isFilled(draft.name) ? draft.name : "");

  return (
    <>
      <Header />
      <main id="main" className="pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
        <section id="top" className="container-page grid gap-12 pb-24 pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <div className="lg:col-span-5">
            <p className="label-mono text-accent">Reviews</p>
            <h1 className="display-l mt-6">
              Worked with Teamy? <span className="font-light text-fg-2">Tell other brands.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-fg-2">
              A few honest lines help founders like you decide. It takes 30 seconds, and your review comes to us on WhatsApp.
            </p>
            <h2 className="label-mono mt-10 text-fg-3">What we show on the website</h2>
            <ul className="mt-4 space-y-3 text-fg-2">
              {["Your stars and your review, as you write them", "Your name, role and brand", "Your photo, only if you send one"].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {draft && (
              <p role="note" className="mb-6 rounded-2xl border border-dashed border-accent/60 px-5 py-4 text-[15px] text-fg-2">
                <strong className="text-fg">We&apos;ve started it for you</strong> from our work together. Change anything you
                like (or write your own), pick your stars and send.
              </p>
            )}
            <ReviewForm
              brand={param("brand")}
              name={name}
              role={draft && isFilled(draft.role) ? draft.role : ""}
              review={draft?.quote ?? ""}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
