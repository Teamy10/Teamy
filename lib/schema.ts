/**
 * schema.org builders (JSON-LD). Deliberately no aggregateRating / Review markup:
 * self-serving review schema isn't eligible for rich results and we don't publish ratings.
 */
import { servicePages } from "@/content/pages";
import { isFilled, siteConfig, type Faq } from "@/content/site";

const base = () => siteConfig.url;
export const abs = (path = "/") => `${base()}${path === "/" ? "" : path}`;
const ORG_ID = () => `${base()}/#organization`;
const BIZ_ID = () => `${base()}/#business`;

export const sameAs = () => Object.values(siteConfig.socials).filter((u) => isFilled(u));

/** Topics the business is known for (helps search engines and AI answers place it). */
const KNOWS_ABOUT = [
  "Ecommerce website development",
  "Website design",
  "Custom website development",
  "D2C brands",
  "Online store development",
  "UPI and cash-on-delivery checkout",
  "WhatsApp order updates",
  "Conversion rate optimisation",
  "SEO",
];

/** A raster square logo (Google's logo guidelines prefer one at least 112×112). */
const logo = () => ({ "@type": "ImageObject", url: abs("/icon-512.png"), width: 512, height: 512 });

/** The provider, inline, so pages that mention it don't depend on another page's markup. */
const provider = () => ({ "@type": "ProfessionalService", "@id": BIZ_ID(), name: siteConfig.brand, url: abs("/") });

/** "From ₹14,999": a starting price, not a fixed one. */
const fromPrice = () => ({ "@type": "PriceSpecification", minPrice: siteConfig.plan.price, priceCurrency: "INR" });

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
    logo: logo(),
    description: `${siteConfig.brand} builds custom-coded ecommerce websites for D2C brands across India, from ${siteConfig.contact.address.locality}.`,
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: postalAddress(),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: KNOWS_ABOUT,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      areaServed: "IN",
      availableLanguage: ["en"],
    },
    ...(links.length ? { sameAs: links } : {}),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": BIZ_ID(),
    name: siteConfig.brand,
    description: `${siteConfig.brand} is an ecommerce website development company in ${siteConfig.contact.address.locality}, building custom-coded websites and online stores for D2C brands across India.`,
    url: abs("/"),
    image: abs("/opengraph-image"),
    logo: logo(),
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: postalAddress(),
    openingHours: siteConfig.contact.openingHours,
    areaServed: { "@type": "Country", name: "India" },
    priceRange: "₹₹",
    knowsAbout: KNOWS_ABOUT,
    parentOrganization: { "@id": ORG_ID() },
    makesOffer: {
      "@type": "Offer",
      name: "Starter online store, designed, built and launched",
      priceSpecification: fromPrice(),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Ecommerce website services",
      itemListElement: servicePages.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.name, url: abs(p.path) },
      })),
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
    provider: provider(),
    areaServed: { "@type": "Country", name: "India" },
    offers: { "@type": "Offer", priceSpecification: fromPrice() },
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
