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

/** One rotating hero line. `highlight` is the word(s) painted in the accent colour. */
export type HeroLine = { text: string; highlight?: string };

export type Benefit = { icon: IconName; title: string; line: string };

export type ServiceGroup = { icon: IconName; title: string; line: string; items: string[] };

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
    /** Cycles on a timer, pauses on hover/focus or with the pause button. */
    headlines: [
      { text: "Stores that sell while you sleep.", highlight: "sell" },
      { text: `Your own store, live in ${launchDays} days.`, highlight: `${launchDays} days.` },
      { text: "Fast pages. Fuller carts.", highlight: "Fuller carts." },
      { text: "Built for your next 10,000 orders.", highlight: "10,000" },
    ] satisfies HeroLine[] as HeroLine[],
    rotateMs: 3800,
    sub: "We design, build and run your online store, so you can get back to making the product. You never manage a developer.",
    trust: [`Live in ${launchDays} days`, "UPI, cards & COD", "You own everything"],
    /** Plain-text summary of what we do, read by screen readers and search engines. */
    srHeadline: "Teamy designs, builds and runs fast online stores for D2C brands that sell and scale.",
  },

  benefits: [
    { icon: "rocket", title: `Live in ${launchDays} days`, line: "From first call to first order in about a week. No hunting for developers." },
    { icon: "cart", title: "Built to convert", line: "Fast, mobile-first pages and a checkout with UPI, cards and COD." },
    { icon: "shield", title: "We own the tech", line: "Hosting, updates, fixes and integrations. Your web team, one WhatsApp away." },
    { icon: "key", title: "You own everything", line: "Your domain, your code, your customer data. Always yours to take." },
  ] satisfies Benefit[] as Benefit[],

  /** "What we build for D2C brands". */
  services: [
    {
      icon: "store",
      title: "Launch",
      line: "A storefront that looks like your brand, not a template.",
      items: ["Custom store design", "Your own domain", "UPI, cards & COD checkout", "Shipping & GST-ready invoices"],
    },
    {
      icon: "message",
      title: "Sell",
      line: "Fewer DMs, more confirmed orders.",
      items: ["WhatsApp order updates", "COD confirmation before dispatch", "Abandoned-cart nudges", "Fast, mobile-first product pages"],
    },
    {
      icon: "trending",
      title: "Grow",
      line: "Everything you need when the orders pick up.",
      items: ["Analytics & Meta Pixel", "Drops, waitlists & restock alerts", "Reorder reminders", "SEO basics that compound"],
    },
  ] satisfies ServiceGroup[] as ServiceGroup[],

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

  /** Scrolling capabilities strip under the hero (words only, no logos). */
  marquee: [
    "UPI",
    "Cards",
    "Cash on delivery",
    "WhatsApp order updates",
    "COD confirmation",
    "Abandoned-cart nudges",
    "Meta Pixel",
    "Drops & waitlists",
    "Reorder reminders",
    "SEO",
    "Mobile-first design",
    "Your own domain",
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
