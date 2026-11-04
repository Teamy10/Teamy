import { ArrowRight, Check, ChevronRight, Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { Faq } from "@/components/sections/Faq";
import { Header } from "@/components/sections/Header";
import { Process } from "@/components/sections/Process";
import { WorkCard } from "@/components/sections/Work";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MaskWords } from "@/components/ui/MaskWords";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { pageBySlug, type LandingPage } from "@/content/pages";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { addressLine } from "@/lib/address";
import { formatINR } from "@/lib/format";
import { breadcrumbSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";

/** Service and landing pages share this layout; copy comes from content/pages.ts. */
export function LandingTemplate({ page }: { page: LandingPage }) {
  const crumbs = [
    { name: "Home", path: "/" },
    ...(page.kind === "service" ? [{ name: "Services", path: "/#services" }] : []),
    { name: page.name, path: page.path },
  ];
  const portfolio = projects.find((p) => p.name === page.portfolio);
  const related = page.related.map(pageBySlug).filter((p): p is LandingPage => !!p);
  const isLocal = page.slug === "ecommerce-website-developer-delhi";
  const { contact } = siteConfig;

  return (
    <>
      <JsonLd
        data={[
          isLocal ? localBusinessSchema() : serviceSchema({ name: page.name, description: page.description, path: page.path }),
          breadcrumbSchema(crumbs.filter((c) => !c.path.includes("#"))),
        ]}
      />
      <Header />
      <main id="main">
        <section id="top" aria-labelledby="page-title" className="relative pt-[calc(var(--header-h)+env(safe-area-inset-top))]">
          <div className="container-page pb-16 pt-12 lg:pb-24 lg:pt-20">
            <nav aria-label="Breadcrumb">
              <ol className="label-mono flex flex-wrap items-center gap-1.5 text-fg-3">
                {crumbs.map((c, i) => (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {i < crumbs.length - 1 ? (
                      <>
                        <Link href={c.path} prefetch={c.path === "/" ? false : undefined} className="inline-flex min-h-11 items-center hover:text-fg">
                          {c.name}
                        </Link>
                        <ChevronRight className="size-3.5" aria-hidden="true" />
                      </>
                    ) : (
                      <span aria-current="page" className="text-fg-2">
                        {c.name}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <h1 id="page-title" className="hero-mask display-l">
                  <MaskWords text={page.h1} emphasis={page.h1Emphasis} emphasisClass="font-light text-fg-2" />
                </h1>
                <div className="hero-rise mt-8 max-w-2xl space-y-5 text-lg text-fg-2" style={{ ["--d" as string]: "0.4s" }}>
                  {page.intro.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
                <div className="hero-rise mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7" style={{ ["--d" as string]: "0.5s" }}>
                  {page.heroCta ? (
                    <>
                      <Link href={page.heroCta.href} prefetch={false} data-magnetic="" className={buttonClass("primary", "w-full sm:w-auto", "lg")}>
                        {page.heroCta.label} <ArrowRight className="size-5" aria-hidden="true" />
                      </Link>
                      <WhatsAppCTA source={`page_${page.slug}`} className={buttonClass("secondary", "w-full sm:w-auto", "lg")}>
                        <WhatsAppIcon className="size-5 text-accent" /> Talk to us on WhatsApp
                      </WhatsAppCTA>
                    </>
                  ) : (
                    <>
                      <WhatsAppCTA
                        source={`page_${page.slug}`}
                        data-magnetic=""
                        className={buttonClass("primary", "w-full sm:w-auto", "lg")}
                      >
                        <WhatsAppIcon className="size-5" /> Talk to us on WhatsApp
                      </WhatsAppCTA>
                      <Link href="/#pricing" prefetch={false} className={buttonClass("ghost")}>
                        From {formatINR(siteConfig.plan.price)}, see what&apos;s included <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits-title" className="cv-auto pb-8 [--cv-h:400px]">
          <div className="container-page">
            {page.benefitsTitle ? (
              <h2 id="benefits-title" className="display-m mb-10">
                {page.benefitsTitle}
              </h2>
            ) : (
              <h2 id="benefits-title" className="sr-only">
                What you get
              </h2>
            )}
            <ul className={`grid border-t border-line sm:grid-cols-2 ${page.benefits.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {page.benefits.map((b, i) => (
                <Reveal
                  as="li"
                  key={b.title}
                  delay={i * 0.06}
                  className="border-b border-line py-8 sm:px-6 sm:odd:pl-0 sm:even:border-l lg:border-b-0 lg:first:pl-0 lg:[&:not(:first-child)]:border-l"
                >
                  <p className="label-mono text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{b.title}</h3>
                  <p className="mt-2 text-fg-2">{b.line}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparison (Shopify page) */}
        {page.comparison && (
          <section aria-labelledby="compare-title" className="section-pad cv-auto">
            <div className="container-page">
              <h2 id="compare-title" className="display-m max-w-3xl">
                {page.comparison.caption}
              </h2>
              <Reveal className="mt-10 rounded-[24px] border border-line">
                {/* Focusable so keyboard users can scroll the table sideways on phones. */}
                <div tabIndex={0} role="region" aria-label="Comparison table, scrolls sideways" className="overflow-x-auto rounded-[24px]">
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-line bg-surface">
                        {page.comparison.columns.map((c, i) => (
                          <th key={i} scope="col" className={`label-mono px-5 py-4 ${i === 2 ? "text-accent" : "text-fg-3"}`}>
                            {c || <span className="sr-only">Topic</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {page.comparison.rows.map(([topic, a, b]) => (
                        <tr key={topic} className="border-b border-line last:border-0">
                          <th scope="row" className="px-5 py-4 align-top font-semibold">
                            {topic}
                          </th>
                          <td className="px-5 py-4 align-top text-fg-2">{a}</td>
                          <td className="px-5 py-4 align-top text-fg">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
              <p className="mt-4 max-w-3xl text-sm text-fg-3">{page.comparison.note}</p>
            </div>
          </section>
        )}

        {/* Body copy */}
        <section aria-label={`More about ${page.name.toLowerCase()}`} className="section-pad cv-auto">
          <div className="container-page grid gap-x-8 gap-y-16 lg:grid-cols-12">
            {page.sections.map((sec, i) => (
              <Reveal key={sec.heading} delay={(i % 2) * 0.06} className="lg:col-span-6 [&:nth-child(odd)]:lg:col-start-1">
                <article>
                  <h2 className="display-m">{sec.heading}</h2>
                  {sec.paragraphs.length > 0 && (
                    <div className="mt-5 space-y-4 text-lg text-fg-2">
                      {sec.paragraphs.map((p) => (
                        <p key={p.slice(0, 32)}>{p}</p>
                      ))}
                    </div>
                  )}
                  {sec.list && (
                    <ul className="mt-5 space-y-3.5 text-lg text-fg-2">
                      {sec.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check className="mt-1.5 size-4 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Process />

        {/* Local details (Delhi page): NAP identical to the footer */}
        {isLocal && (
          <section aria-labelledby="visit-title" className="section-pad cv-auto">
            <div className="container-page">
              <Reveal className="card grid gap-8 rounded-[28px] p-7 sm:p-10 md:grid-cols-2">
                <div>
                  <h2 id="visit-title" className="display-m">
                    Teamy, New Delhi
                  </h2>
                  <p className="mt-3 text-fg-2">Serving D2C brands across India, from New Delhi.</p>
                </div>
                <address className="space-y-3 not-italic text-fg">
                  <p className="flex items-start gap-3">
                    <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /> {addressLine()}
                  </p>
                  <p className="flex items-start gap-3">
                    <WhatsAppIcon className="mt-1 size-4 shrink-0 text-accent" /> {contact.whatsappDisplay}
                  </p>
                  <p className="flex items-start gap-3">
                    <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <a href={`mailto:${contact.email}`} className="underline-anim">
                      {contact.email}
                    </a>
                  </p>
                  <p className="flex items-start gap-3">
                    <Clock className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /> {contact.hours}
                  </p>
                </address>
              </Reveal>
            </div>
          </section>
        )}

        {/* A real store we've built */}
        {portfolio && (
          <section aria-labelledby="example-title" className="section-pad cv-auto">
            <div className="container-page">
              <h2 id="example-title" className="display-m">
                A store we&apos;ve built
              </h2>
              <Reveal className="mt-10 max-w-3xl">
                <WorkCard project={portfolio} />
              </Reveal>
            </div>
          </section>
        )}

        <Faq faqs={page.faqs} id="page-faq" title={`${page.name}: questions`} emphasis="questions" />

        {/* Related pages + final CTA */}
        <section aria-labelledby="related-title" className="section-pad cv-auto">
          <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 id="related-title" className="display-m">
                Keep reading
              </h2>
              <ul className="mt-6 border-t border-line">
                {related.map((r) => (
                  <li key={r.slug} className="border-b border-line">
                    <Link href={r.path} className="group flex min-h-16 items-center justify-between gap-4 py-4 text-lg font-medium">
                      {r.name}
                      <ArrowRight className="size-5 shrink-0 text-fg-3 transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal className="card rounded-[28px] p-7 sm:p-10 lg:col-span-6 lg:col-start-7">
              <h2 className="display-m">Let&apos;s build your brand&apos;s website.</h2>
              <ul className="mt-6 space-y-2.5 text-fg-2">
                {[`${siteConfig.facts.projects}+ projects, including Shark Tank India brands`, `Starter stores from ${formatINR(siteConfig.plan.price)}, one-time`, "You own the domain, code and data"].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-accent" strokeWidth={3} aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <WhatsAppCTA
                source={`page_${page.slug}_footer`}
                data-magnetic=""
                className={buttonClass("primary", "mt-8 w-full sm:w-auto", "lg")}
              >
                <WhatsAppIcon className="size-5" /> Get a free quote
              </WhatsAppCTA>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
