/**
 * Teamy site content: copy, prices, contact details, stats, FAQs and socials. Components only
 * read from here. Projects live in content/projects.ts, testimonials in content/testimonials.ts.
 *
 * Placeholders: any string starting with "TODO" (and any empty URL) is treated as "not filled in".
 * Components hide unfilled items in production and show a dashed placeholder in `npm run dev`,
 * so nothing fake ever ships. `// ⚠️ CONFIRM` marks values I had to guess.
 * Service / landing page copy lives in content/pages.ts.
 */

/** True when a value has real content (not empty, not a "TODO" placeholder). */
export const isFilled = (v: string | number | null | undefined): boolean =>
  v !== null && v !== undefined && String(v).trim() !== "" && !String(v).trim().startsWith("TODO");

export type IconName =
  | "rocket"
  | "cart"
  | "shield"
  | "key"
  | "store"
  | "message"
  | "trending"
  | "chat"
  | "palette"
  | "search"
  | "sync"
  | "camera"
  | "wrench"
  | "boxes";

/**
 * One hero headline line. `emphasis` is the word set in the light contrast weight;
 * `heroWord` marks the single word that gets the gradient (gold in festive themes).
 */
export type HeroLine = { text: string; emphasis?: string; heroWord?: boolean };

/** Which piece of the storefront mockup a story day builds. */
export type StoryPiece = "domain" | "storefront" | "checkout" | "whatsapp" | "analytics" | "drops" | "live";
export type StoryDay = { title: string; line: string; piece: StoryPiece };

/** Bento tile icons (custom animated SVGs in components/icons/AnimatedIcons.tsx). */
export type ServiceIcon = "storefront" | "checkout" | "whatsapp" | "cart" | "analytics" | "drops";
export type ServiceTile = { icon: ServiceIcon; stage: "Launch" | "Sell" | "Grow"; title: string; line: string; slug: string };


/** The single plan. Its price is the only price shown anywhere on the site. */
export type Plan = {
  name: string;
  price: number;
  /** Who it's for, one line. */
  forWho: string;
  features: string[];
};

export type AddOn = {
  icon: IconName;
  name: string;
  line: string;
};

export type Step = { title: string; line: string };

export type Stat = {
  /** Number to count up to. A "TODO…" string hides the stat. */
  value: number | string;
  prefix?: string;
  suffix?: string;
  /** Format the number as Indian rupees (₹8,999). */
  inr?: boolean;
  /** Decimal places to show (e.g. 1 for a 4.9 rating). */
  decimals?: number;
  label: string;
};

export type Integration = {
  name: string;
  /** SVG under /public/logos. */
  logo: string;
  /** Only verified integrations are shown. Set true once Teamy actually uses it on client stores. */
  verified: boolean;
};

/** About Us highlight icons (lucide). */
export type HighlightIcon = "responsive" | "code" | "clock" | "key";
export type AboutHighlight = { icon: HighlightIcon; label: string; line: string };

export type Faq = { q: string; a: string };

/**
 * Teamy's WhatsApp number. Every contact button and link on the site opens a chat with this
 * number (wa.me), pre-filled with WHATSAPP_MESSAGE.
 */
export const WHATSAPP_NUMBER = "+91 95096 12425";
/** The message every contact button pre-fills. The contact form adds the visitor's details below it. */
export const WHATSAPP_MESSAGE = "Hi Teamy! I'd like to discuss a website project.";

/** "Live in X days" for starter stores — used in the story, plans and process. */
const launchDays = 7; // ⚠️ CONFIRM

/** The starter store's price in rupees: shown on the site and charged at checkout. */
const starterPrice = 8999;

export const siteConfig = {
  brand: "Teamy",
  tagline: "Your brand's web team.",
  /**
   * Canonical domain: www, because Vercel serves www.teamy.in and 308-redirects teamy.in to it, and a
   * canonical must never point at a redirect. Override with NEXT_PUBLIC_SITE_URL. See README → "Domain".
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.teamy.in").replace(/\/$/, ""),
  /** Studio location, used in copy and the local page. */
  city: "New Delhi",

  contact: {
    /** Digits only, for wa.me links. Edit WHATSAPP_NUMBER above, not this. */
    whatsappNumber: WHATSAPP_NUMBER.replace(/\D/g, ""),
    whatsappDisplay: WHATSAPP_NUMBER,
    phone: "+91-9509612425",
    email: "hello@teamy.in", // ⚠️ CONFIRM mailbox exists
    address: {
      /** Area (or building and road). Shown before the city: "Mehrauli, New Delhi 110030". */
      street: "Mehrauli",
      locality: "New Delhi",
      region: "Delhi",
      postalCode: "110030",
      country: "IN",
      countryName: "India",
    },
    hours: "Monday to Saturday, reply within 4 hours",
    /** schema.org openingHours. ⚠️ CONFIRM the actual times. */
    openingHours: "Mo-Sa 10:00-19:00",
  },

  /** Social profiles. Leave "" to hide an icon (and keep it out of structured data). */
  socials: {
    instagram: "", // TODO: Instagram URL
    youtube: "", // TODO: YouTube URL
    linkedin: "", // TODO: LinkedIn URL
    facebook: "", // TODO: Facebook URL
  } as Record<"instagram" | "youtube" | "linkedin" | "facebook", string>,

  launchDays,
  /** Business facts, used in the hero, stats, about and meta tags. */
  facts: {
    projects: 450,
    years: 5,
    rating: 4.9,
    satisfaction: 97,
    /** Link to the public reviews behind the rating (e.g. your Google Business Profile). Shown when filled. */
    reviewsUrl: "", // TODO: Google reviews link
  },
  /** "We reply within X hours." */
  responseHours: 4, // ⚠️ CONFIRM

  /** Audience the site speaks to. */
  audience: "D2C brands",

  hero: {
    /** Two lines, revealed word by word with a mask wipe on load. */
    lines: [
      { text: "The web team behind", emphasis: "behind" },
      { text: "India's D2C brands.", emphasis: "D2C", heroWord: true },
    ] satisfies HeroLine[] as HeroLine[],
    sub: "We design and build custom-coded ecommerce websites that make D2C brands look as big as their ambition, from first launches to brands seen on Shark Tank India.",
    /** The two client sites shown in the hero (slugs from content/projects.ts): desktop frame, then phone. */
    showcase: ["zoff", "truediamond"],
  },

  /** "Idea → live in 7 days": the pinned scroll story. One entry per day, in order. */
  story: {
    title: `Idea → live in ${launchDays} days.`,
    emphasis: "live",
    sub: "How a starter store comes together with Teamy. Each day adds a piece, until it's live and taking orders.",
    days: [
      { title: "Free call & domain", line: "We learn your brand, then connect a domain in your name.", piece: "domain" },
      { title: "Storefront design", line: "Your colours, photos and vibe, laid out mobile-first.", piece: "storefront" },
      { title: "Products & checkout", line: "Your catalogue goes in, with UPI, cards and COD at checkout.", piece: "checkout" },
      { title: "WhatsApp updates", line: "Order updates and COD confirmation, sent on WhatsApp.", piece: "whatsapp" },
      { title: "Analytics & Pixel", line: "Analytics and Meta Pixel set up, so you can see what sells.", piece: "analytics" },
      { title: "Drops & reorders", line: "Waitlists, restock alerts and reorder reminders.", piece: "drops" },
      { title: "Live", line: "We test every flow with you, then switch it on.", piece: "live" },
    ] satisfies StoryDay[] as StoryDay[],
  },

  /** "What we build for D2C brands": six bento tiles covering every Launch / Sell / Grow item. */
  services: [
    { icon: "storefront", slug: "custom-storefront-design", stage: "Launch", title: "Custom storefront design", line: "A store that looks like your brand, not a template, on your own domain." },
    { icon: "checkout", slug: "upi-cod-checkout", stage: "Launch", title: "UPI, cards & COD checkout", line: "Plus shipping and GST-ready invoices, set up and tested for you." },
    { icon: "whatsapp", slug: "whatsapp-order-updates", stage: "Sell", title: "WhatsApp order updates", line: "Confirmed, shipped, delivered. COD confirmed before you dispatch." },
    { icon: "cart", slug: "abandoned-cart-recovery", stage: "Sell", title: "Abandoned-cart nudges", line: "Gentle reminders and fast, mobile-first product pages that win carts back." },
    { icon: "analytics", slug: "analytics-meta-pixel", stage: "Grow", title: "Analytics & Meta Pixel", line: "See what sells, with SEO basics that compound over time." },
    { icon: "drops", slug: "drops-waitlists-reorders", stage: "Grow", title: "Drops, waitlists & reorders", line: "Restock alerts and reorder reminders that bring customers back." },
  ] satisfies ServiceTile[] as ServiceTile[],

  plan: {
    name: "Starter store",
    price: starterPrice,
    forWho: `For brands launching their first online store. Live in about ${launchDays} days.`,
    // Every feature from the old Launch + Growth plans, de-duplicated, in the order a store comes together.
    features: [
      "We handle all the tech, end to end",
      "Custom-designed storefront on your domain",
      "UPI, cards & COD checkout",
      "WhatsApp order updates",
      "COD confirmation & abandoned-cart nudges",
      "Analytics & Meta Pixel set up",
      "Drops, waitlists & reorder reminders",
      "Priority WhatsApp support",
      `Live in ${launchDays} days`,
    ],
  } satisfies Plan as Plan,

  /**
   * Paying online for the starter store, with Razorpay (README → "Payments"). Off until the Razorpay
   * keys are set. With test keys the pay button shows only outside production (previews, local);
   * /checkout itself always works, with a test-mode banner.
   */
  checkout: {
    /** Paid at checkout, in rupees: the full price (or set an advance, and say so in the terms). */
    amount: starterPrice,
    /** GST added on top at checkout, in percent: 0 if the price already includes it. ⚠️ CONFIRM with your CA */
    gstPercent: 0,
    /** Shown in the Razorpay payment window and on the customer's receipt. */
    description: "Starter store: design and build",
  },

  /** The second pricing card: bigger builds, quoted after a free call. */
  customPlan: {
    name: "Custom website",
    forWho: "For growing brands that need more: custom design, integrations and scale.",
    features: [
      "Fully custom design and development",
      "Large catalogues, filters and search",
      "Integrations with your ERP, CRM or marketplaces",
      "International shipping and multi-currency",
      "Speed, SEO and conversion work",
      "A dedicated team after launch",
    ],
  },

  /** Listed beneath the plans, quoted for each brand. */
  addOns: [
    { icon: "boxes", name: "Catalogue upload", line: "We add and tidy your products, variants and photos." },
    { icon: "search", name: "SEO setup", line: "Search-friendly pages, titles and a sitemap that Google likes." },
    { icon: "sync", name: "Marketplace sync", line: "Keep stock in step with Amazon, Flipkart and others." },
    { icon: "palette", name: "Brand refresh", line: "Logo polish, colours and type, before we build." },
    { icon: "wrench", name: "Care plan", line: "Monthly updates, festive banners and fixes." },
  ] satisfies AddOn[] as AddOn[],

  /** "How we work": four steps, Discover → Design → Develop → Launch. */
  process: [
    { title: "Discover", line: "A free call about your brand, your products and where you sell today." },
    { title: "Design", line: "A free preview of your store with your real products, before you pay anything." },
    { title: "Develop", line: "We build it: payments, COD, shipping and WhatsApp updates, set up and tested by us." },
    { title: "Launch", line: `Live on your domain in about ${launchDays} days. We stay on for drops, fixes and festive sales.` },
  ] satisfies Step[] as Step[],


  /** Trust stats (the owner's figures). A "TODO…" value hides the stat. */
  stats: [
    { value: 450, suffix: "+", label: "websites and projects delivered" },
    { value: 5, suffix: "+", label: "years building for D2C brands" },
    { value: 4.9, decimals: 1, suffix: "/5", label: "average client rating" },
    { value: 97, suffix: "%", label: "client satisfaction" },
  ] satisfies Stat[] as Stat[],

  /**
   * "Works with" strip. Only `verified: true` platforms are shown.
   * ⚠️ CONFIRM each one is something Teamy actually integrates on client stores.
   */
  integrations: [
    { name: "UPI", logo: "/logos/upi.svg", verified: true },
    { name: "Google Pay", logo: "/logos/googlepay.svg", verified: true },
    { name: "PhonePe", logo: "/logos/phonepe.svg", verified: true },
    { name: "Paytm", logo: "/logos/paytm.svg", verified: true },
    { name: "Razorpay", logo: "/logos/razorpay.svg", verified: false }, // TODO: confirm the gateway Teamy uses
    { name: "Visa", logo: "/logos/visa.svg", verified: true },
    { name: "Mastercard", logo: "/logos/mastercard.svg", verified: true },
    { name: "RuPay", logo: "/logos/rupay.svg", verified: true },
    { name: "WhatsApp Business", logo: "/logos/whatsapp.svg", verified: true },
    { name: "Meta Pixel", logo: "/logos/meta.svg", verified: true },
    { name: "Google Analytics", logo: "/logos/googleanalytics.svg", verified: true },
    { name: "Shiprocket", logo: "/logos/shiprocket.svg", verified: false }, // TODO: confirm shipping partner
  ] satisfies Integration[] as Integration[],


  /** "About Teamy" section. */
  about: {
    eyebrow: "About Teamy",
    title: "Five years of building for India's D2C brands.",
    emphasis: "D2C brands.",
    body: [
      "Teamy is a team of designers and developers in New Delhi. We've delivered 450+ websites and projects, for first-time founders and for brands featured on Shark Tank India.",
      "Every site is designed and coded around the brand it's for: mobile-first, fast and built to sell. And you talk to the same people on WhatsApp from the first call to launch day, and long after it.",
    ],
    highlights: [
      { icon: "code", label: "Custom-coded, never a template", line: "Designed and built around your brand and your customers." },
      { icon: "responsive", label: "Mobile-first and fast", line: "Pages that load quickly on everyday phones and networks." },
      { icon: "clock", label: "Launch dates we keep", line: `A clear plan from day one. Starter stores go live in about ${launchDays} days.` },
      { icon: "key", label: "You own everything", line: "Your domain, code and customer data, in your name." },
    ] satisfies AboutHighlight[] as AboutHighlight[],
  },

  /** Home page FAQ (also emitted as FAQPage schema). Answers containing "TODO" are hidden in production. */
  faqs: [
    {
      q: "Do I need Shopify?",
      a: "No. We build and set up your store for you, so you don't need a Shopify subscription or a stack of apps. If you already run a Shopify store, we can talk about moving it over.",
    },
    {
      q: "Have you worked with brands like mine?",
      a: "Probably. We've delivered 450+ websites and projects across fashion, jewellery, food, home décor, wellness and more, including brands featured on Shark Tank India. See our work above, or ask us on WhatsApp for examples in your category.",
    },
    {
      q: "How long does it take to build an ecommerce website?",
      a: `Starter stores usually go live in about ${launchDays} days once you approve the design. Bigger custom builds get a timeline with the quote, depending on your catalogue, integrations and how quickly your content is ready.`,
    },
    {
      q: "Do you work with brands outside Delhi?",
      a: "Yes. We're based in New Delhi and work with D2C brands across India. Everything can be done over WhatsApp and calls, and Delhi brands are welcome to meet us in person.",
    },
    {
      q: "What happens after launch?",
      a: "Your store is live on your domain and taking orders. We stay on WhatsApp for questions, small fixes and help with your first drops. For ongoing work like new banners and festive sales, there's an optional monthly care plan.",
    },
    {
      q: "Who owns the code and the domain?",
      a: "You do. The domain is registered in your name, the payment gateway is in your business name, and your customer data is yours to export. You get access to your store's code and logins.",
    },
    {
      q: "How much does a website cost?",
      a: "Starter stores start at ₹8,999, one-time. Bigger or custom builds are quoted after a free call, once we know what you need. There's no compulsory monthly fee from Teamy: you pay your own domain renewal and payment-gateway charges directly, and an optional care plan is there if you want us to keep updating the site.",
    },
    {
      q: "Where is the store hosted, and what does hosting cost?",
      a: "TODO: describe where client stores are hosted, what hosting costs after launch (if anything) and who pays for it.",
    },
    {
      q: "How do COD confirmations on WhatsApp work?",
      a: "When a customer places a cash-on-delivery order, they get a WhatsApp message asking them to confirm it. Confirmed orders go ahead; unconfirmed ones are flagged, so you can call or cancel before paying to ship a parcel that may be refused.",
    },
    {
      q: "Can you migrate my existing store?",
      a: "Usually, yes. Send us the link on WhatsApp and we'll tell you honestly what can move over (products, images, customers) and whether it fits in the standard build or needs extra time and a separate quote.",
    },
    {
      q: "What do payment gateways charge?",
      a: "Payment gateways charge a small fee on each online payment; the exact rate depends on the gateway and the payment method. That fee goes to the gateway, not to Teamy. We help you choose a gateway and set it up in your business name.",
    },
    {
      q: "Do you do SEO?",
      a: "Every store gets the SEO basics: fast, mobile-first pages, clean titles and descriptions, and a sitemap. A deeper SEO setup is available as an add-on.",
    },
    {
      q: "What if I need changes later?",
      a: "Message us on WhatsApp. Small fixes after launch are part of our support, and larger changes or new features are quoted up front before we start.",
    },
  ] satisfies Faq[] as Faq[],

  /** Shark Tank India band. Brands come from content/projects.ts (sharkTankSeason). */
  sharkTank: {
    title: "Trusted by brands from Shark Tank India.",
    highlight: "Shark Tank India.",
    sub: "Founders who pitched to the Sharks trust us with the website their customers see first. Yours could be next.",
    disclaimer: "Shark Tank India is a trademark of Sony Pictures Networks India. Teamy is not affiliated with, or endorsed by, the show.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
