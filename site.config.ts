/**
 * Teamy site config — the ONE file to edit for copy blocks, prices, links and numbers.
 *
 * Anything marked  // ⚠️ CONFIRM  is a placeholder I (the builder) had to guess.
 * Check every one before you ship. See README → "Before you go live".
 */

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
};

/** "Live in X days" — used in the hero, benefits, plans and process. */
const launchDays = 7; // ⚠️ CONFIRM

export const siteConfig = {
  brand: "Teamy",
  tagline: "Your brand's web team.",
  url: "https://teamy.in",

  contact: {
    /** Country code + number, digits only (used for wa.me links). */
    whatsappNumber: "919509612425",
    whatsappDisplay: "+91 95096 12425",
    email: "hello@teamy.in", // ⚠️ CONFIRM mailbox exists
  },

  /** Prefilled WhatsApp messages. {brand} is replaced when we know the brand name. */
  whatsappMessages: {
    default: "Hi Teamy, I'd like to talk about a website for my brand.",
    withBrand: "Hi Teamy, I'd like to talk about a website for my brand {brand}.",
    bookCall: "Hi Teamy, I'd like to book a free call about a store for my brand.",
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
      permissionGiven: true, // ⚠️ CONFIRM written permission
    },
  ] satisfies Testimonial[] as Testimonial[],

  /** Where the lead form posts. The API route forwards to LEAD_WEBHOOK_URL (see README). */
  leadEndpoint: "/api/lead",
} as const;

export type SiteConfig = typeof siteConfig;
