/**
 * schema.org builders (JSON-LD). Deliberately no aggregateRating / Review markup:
 * self-serving review schema isn't eligible for rich results and we don't publish ratings.
 */
import { isFilled, siteConfig, type Faq } from "@/content/site";

const base = () => siteConfig.url;
export const abs = (path = "/") => `${base()}${path === "/" ? "" : path}`;
const ORG_ID = () => `${base()}/#organization`;
const BIZ_ID = () => `${base()}/#business`;

export const sameAs = () => Object.values(siteConfig.socials).filter((u) => isFilled(u));

function postalAddress() {
  const a = siteConfig.contact.address;
  return {
    "@type": "PostalAddress",
    ...(isFilled(a.street) ? { streetAddress: a.street } : {}),
    addressLocality: a.locality,
    addressRegion: a.region,
    ...(isFilled(a.postalCode) ? { postalCode: a.postalCode } : {}),
    addressCountry: a.country,
  };
}

export function organizationSchema() {
  const links = sameAs();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: siteConfig.brand,
    url: abs("/"),
    logo: abs("/logo.svg"),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    ...(links.length ? { sameAs: links } : {}),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": BIZ_ID(),
    name: siteConfig.brand,
    description: `${siteConfig.brand} designs, builds and runs online stores for Indian D2C brands: UPI, cards and COD checkout, WhatsApp order updates, live in ${siteConfig.launchDays} days.`,
    url: abs("/"),
    image: abs("/opengraph-image"),
    logo: abs("/logo.svg"),
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: postalAddress(),
    openingHours: siteConfig.contact.openingHours,
    areaServed: { "@type": "Country", name: "India" },
    priceRange: "₹₹",
    parentOrganization: { "@id": ORG_ID() },
    makesOffer: {
      "@type": "Offer",
      name: "Online store, designed, built and launched",
      price: siteConfig.plan.price,
      priceCurrency: "INR",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.brand,
    url: abs("/"),
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID() },
  };
}

export function serviceSchema(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: abs(s.path),
    serviceType: s.name,
    provider: { "@id": BIZ_ID() },
    areaServed: { "@type": "Country", name: "India" },
    offers: { "@type": "Offer", price: siteConfig.plan.price, priceCurrency: "INR" },
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
