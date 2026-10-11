/**
 * Teamy site content — the ONE file to edit for copy, prices, contact details, portfolio,
 * testimonials, stats, team, FAQs and socials. Components only read from here.
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
export type ServiceTile = { icon: ServiceIcon; stage: "Launch" | "Sell" | "Grow"; title: string; line: string };

export type Benefit = { icon: IconName; title: string; line: string };


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

export type PortfolioItem = {
  name: string;
  category: string;
  url: string;
  description: string;
  tags: string[];
  /** Phone-size screenshot under /public (portrait ~9:19.5). A skeleton shows until the file exists. */
  image: string;
  /** Optional 9:16 clip for the "See our stores in action" section. */
  video?: { src: string; poster: string };
};

export type Stat = {
  /** Number to count up to. A "TODO…" string hides the stat. */
  value: number | string;
  prefix?: string;
  suffix?: string;
  /** Format the number as Indian rupees (₹8,999). */
  inr?: boolean;
  label: string;
};

export type Integration = {
  name: string;
  /** SVG under /public/logos. */
  logo: string;
  /** Only verified integrations are shown. Set true once Teamy actually uses it on client stores. */
  verified: boolean;
};

export type TeamMember = { name: string; role: string; line: string; photo?: string };

export type Faq = { q: string; a: string };

export type Testimonial = {
  name: string;
  role: string;
  brand: string;
  /** The founder's words. If you edit them, get the founder's OK on the new wording. */
  quote: string;
  /** Only if the founder actually gave a rating (1–5). */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Path under /public. Initials are shown when missing. */
  photo?: string;
  link?: string;
  /** Must be true (written permission) or the entry is hidden. */
  permissionGiven: boolean;
  /** Show as the large featured card (the first featured entry wins). */
  featured?: boolean;
};

/** "Live in X days" — used in the hero, benefits, plans and process. */
const launchDays = 7; // ⚠️ CONFIRM

export const siteConfig = {
  brand: "Teamy",
  tagline: "Your brand's web team.",
  /**
   * Canonical domain. Override with NEXT_PUBLIC_SITE_URL (e.g. while teamy.in isn't connected yet).
   * See README → "Domain".
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://teamy.in").replace(/\/$/, ""),
  /** Studio location, used in copy and the local page. */
  city: "Jaipur",

  contact: {
    /** Country code + number, digits only (used for wa.me links). */
    whatsappNumber: "919509612425",
    whatsappDisplay: "+91 95096 12425",
    phone: "+91-9509612425",
    email: "hello@teamy.in", // ⚠️ CONFIRM mailbox exists
    address: {
      street: "TODO: street address",
      locality: "Jaipur",
      region: "Rajasthan",
      postalCode: "TODO: PIN code",
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
  },

  /** Pre-filled WhatsApp messages, one per call to action. */
  whatsappMessages: {
    default: "Hi Teamy! I'd like to talk about a store for my brand.",
    bookCall: "Hi Teamy! I'd like to book a free call about an online store for my brand.",
    preview: "Hi Teamy! I'd like a free store preview for my brand.",
    ownStore: "Hi Teamy! I'd like to get my own store for my D2C brand.",
    talk: "Hi Teamy! I have a question about building my online store.",
    pricing: "Hi Teamy! I'm interested in the ₹8,999 store. Can we book a free call?",
    /** Used on service pages: {service} is replaced with the page name. */
    service: "Hi Teamy! I'm interested in {service} for my online store.",
  },

  launchDays,
  /** "We reply within X hours." */
  responseHours: 4, // ⚠️ CONFIRM

  /**
   * Audience the site speaks to. D2C only for now; founders and other businesses
   * can get their own headline set and services later.
   */
  audience: "D2C brands",

  hero: {
    /** Two lines, revealed word by word with a mask wipe on load. */
    lines: [
      { text: "Stores that sell", emphasis: "sell", heroWord: true },
      { text: "while you sleep.", emphasis: "sleep." },
    ] satisfies HeroLine[] as HeroLine[],
    sub: "We design, build and run your online store, so you can get back to making the product. You never manage a developer.",
    trust: [`Live in ${launchDays} days`, "UPI, cards & COD", "You own everything"],
  },

  /** "Idea → live in 7 days": the pinned scroll story. One entry per day, in order. */
  story: {
    title: `Idea → live in ${launchDays} days.`,
    emphasis: "live",
    sub: "A typical week with Teamy. Each day adds a piece of your store, until it's live and taking orders.",
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

  benefits: [
    { icon: "rocket", title: `Live in ${launchDays} days`, line: "From first call to first order in about a week. No hunting for developers." },
    { icon: "cart", title: "Built to convert", line: "Fast, mobile-first pages and a checkout with UPI, cards and COD." },
    { icon: "shield", title: "We own the tech", line: "Hosting, updates, fixes and integrations. Your web team, one WhatsApp away." },
    { icon: "key", title: "You own everything", line: "Your domain, your code, your customer data. Always yours to take." },
  ] satisfies Benefit[] as Benefit[],

  /** "What we build for D2C brands": six bento tiles covering every Launch / Sell / Grow item. */
  services: [
    { icon: "storefront", stage: "Launch", title: "Custom storefront design", line: "A store that looks like your brand, not a template, on your own domain." },
    { icon: "checkout", stage: "Launch", title: "UPI, cards & COD checkout", line: "Plus shipping and GST-ready invoices, set up and tested for you." },
    { icon: "whatsapp", stage: "Sell", title: "WhatsApp order updates", line: "Confirmed, shipped, delivered. COD confirmed before you dispatch." },
    { icon: "cart", stage: "Sell", title: "Abandoned-cart nudges", line: "Gentle reminders and fast, mobile-first product pages that win carts back." },
    { icon: "analytics", stage: "Grow", title: "Analytics & Meta Pixel", line: "See what sells, with SEO basics that compound over time." },
    { icon: "drops", stage: "Grow", title: "Drops, waitlists & reorders", line: "Restock alerts and reorder reminders that bring customers back." },
  ] satisfies ServiceTile[] as ServiceTile[],

  plan: {
    name: "Everything you need to launch and grow",
    price: 8999,
    forWho: "One price, one team, every feature. For brands that want to sell without managing developers.",
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

  /** Listed beneath the plan. Prices are intentionally not shown (the plan price is the only one). */
  addOns: [
    { icon: "boxes", name: "Catalogue upload", line: "We add and tidy your products, variants and photos." },
    { icon: "search", name: "SEO setup", line: "Search-friendly pages, titles and a sitemap that Google likes." },
    { icon: "sync", name: "Marketplace sync", line: "Keep stock in step with Amazon, Flipkart and others." },
    { icon: "palette", name: "Brand refresh", line: "Logo polish, colours and type, before we build." },
    { icon: "wrench", name: "Care plan", line: "Monthly updates, festive banners and fixes." },
  ] satisfies AddOn[] as AddOn[],

  process: [
    { title: "Free call", line: "20 minutes on your brand, products and where you sell today." },
    { title: "Free preview", line: "We design a preview of your store using your real products." },
    { title: "Build & launch", line: `Payments, COD, shipping and WhatsApp, set up and tested by us. Live in ${launchDays} days.` },
    { title: "Grow together", line: "We stay on for drops, festive sales and new features." },
  ] satisfies Step[] as Step[],

  /** "Stores we've built". Adding a store = adding an object here. */
  portfolio: [
    {
      name: "Ganges",
      category: "Cross-border e-commerce",
      url: "https://ganges.world/",
      description:
        "A platform that lets shoppers worldwide buy from Indian stores and artisans, with international shipping, a sourcing-agent service and bulk B2B ordering.",
      tags: ["International shipping", "Sourcing requests", "WhatsApp support"],
      image: "/portfolio/ganges-mobile.webp",
      video: { src: "/videos/ganges.mp4", poster: "/videos/ganges.webp" },
    },
    {
      name: "haat",
      category: "Global marketplace",
      url: "https://haatglobal.com/",
      description:
        "A premium marketplace for products made in India, with verified sellers, multi-currency pricing (USD, EUR, GBP, AED, CAD, AUD, SGD, INR) and shipping worldwide.",
      tags: ["Multi-currency", "Seller onboarding", "Editorial stories"],
      image: "/portfolio/haat-mobile.webp",
      video: { src: "/videos/haat.mp4", poster: "/videos/haat.webp" },
    },
  ] satisfies PortfolioItem[] as PortfolioItem[],

  /** Trust stats. Only true, verifiable figures. A "TODO…" value hides the stat. */
  stats: [
    { value: launchDays, suffix: " days", label: "average launch time" },
    { value: 8999, inr: true, label: "one-time, no compulsory monthly fees" },
    { value: 4, prefix: "< ", suffix: " hrs", label: "WhatsApp reply time" },
    { value: 100, suffix: "%", label: "ownership of your domain, code and data" },
    { value: "TODO: number of stores launched", label: "stores launched" },
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

  /** "The people behind Teamy". */
  about: {
    title: "The people behind Teamy.",
    story: [
      "Teamy is a small team in Jaipur that designs, builds and runs online stores for Indian D2C brands.",
      "We started Teamy so founders could have a store of their own without hiring, briefing and chasing developers. You talk to the same few people on WhatsApp from the first call to your thousandth order, and we handle the tech in between.",
    ],
    team: [
      { name: "TODO: founder name", role: "TODO: role", line: "TODO: one line about them", photo: "/team/member-1.webp" },
      { name: "TODO: team member name", role: "TODO: role", line: "TODO: one line about them", photo: "/team/member-2.webp" },
    ] satisfies TeamMember[] as TeamMember[],
  },

  /** Home page FAQ (also emitted as FAQPage schema). Answers containing "TODO" are hidden in production. */
  faqs: [
    {
      q: "Do I need Shopify?",
      a: "No. We build and set up your store for you, so you don't need a Shopify subscription or a stack of apps. If you already run a Shopify store, we can talk about moving it over.",
    },
    {
      q: "What happens after the 7 days?",
      a: "Your store is live on your domain and taking orders. We stay on WhatsApp for questions, small fixes and help with your first drops. For ongoing work like new banners and festive sales, there's an optional monthly care plan.",
    },
    {
      q: "Who owns the code and the domain?",
      a: "You do. The domain is registered in your name, the payment gateway is in your business name, and your customer data is yours to export. You get access to your store's code and logins.",
    },
    {
      q: "Are there monthly fees?",
      a: "The build is ₹8,999, one-time. There's no compulsory monthly fee from Teamy. You pay your own domain renewal and payment-gateway charges directly, and you can choose the optional care plan if you want us to keep updating the store.",
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

  /** Slow ticker of what Teamy handles (text only, no logos). */
  marquee: [
    "Storefront",
    "UPI & COD",
    "WhatsApp updates",
    "Meta Pixel",
    "Abandoned-cart nudges",
    "Drops & waitlists",
    "Your own domain",
    "Reorder reminders",
    "Analytics",
    "Hosting & fixes",
  ],

  /**
   * Shark Tank India block. Words only: no logo, clips or styling that implies endorsement.
   * Keep claims general and true. (Not: "they sell only from their website".)
   */
  sharkTank: {
    title: "Most D2C brands on Shark Tank India sell from their own website.",
    highlight: "their own website.",
    sub: "Not just marketplace listings. Their own store tells them their margin, their repeat rate and who every customer is. You can have exactly that.",
    questions: ["What's your margin?", "What's your repeat rate?", "How many customers can you reach directly?"],
    punchline: "Your own website answers all three. A marketplace listing doesn't.",
    disclaimer: "Teamy is not affiliated with, or endorsed by, Shark Tank India or its broadcasters.",
  },

  /** Real testimonials only. Hidden unless permissionGiven is true. */
  testimonials: [
    {
      name: "Jay Agrawal",
      role: "Founder",
      brand: "Ganges",
      // ⚠️ CONFIRM: reworded from Jay's original (brand name and phrasing). Get his OK on this text.
      quote:
        "Teamy turned our idea into a fast, high-converting store in record time. Their clarity, speed of execution and attention to every step of the buying journey made a real difference to our early traction.",
      rating: 5, // ⚠️ CONFIRM he gave 5 stars
      link: "https://ganges.world/",
      permissionGiven: true, // ⚠️ CONFIRM written permission
      featured: true,
    },
    {
      // TODO: haat testimonial. Paste the founder's own words, name and role, then set permissionGiven: true.
      name: "TODO: haat founder name",
      role: "TODO: role",
      brand: "haat",
      quote: "TODO: haat founder's quote (their exact words)",
      link: "https://haatglobal.com/",
      permissionGiven: false,
    },
  ] satisfies Testimonial[] as Testimonial[],
} as const;

export type SiteConfig = typeof siteConfig;
