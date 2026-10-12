/**
 * Teamy's clients and work: drives the logo wall, the Shark Tank India band, "Our work" and the
 * videos. Adding a client = adding an object here, then running `npm run capture:all` to take its
 * screenshots, logo and video (see README → "Client assets").
 *
 * Only add brands Teamy has actually worked with. Kept free of imports so the capture scripts in
 * scripts/ can load it directly with Node.
 */

export type Project = {
  /** File names for its assets, e.g. "zoff" → /work/zoff.webp, /logos/clients/zoff.webp, /videos/zoff.mp4. */
  slug: string;
  name: string;
  url: string;
  /** Short tag, e.g. "Fashion", "Jewellery". */
  category: string;
  /** One line about the brand. */
  description: string;
  /** Season the brand appeared on Shark Tank India, if it did. */
  sharkTankSeason?: number;
  /** False when the brand's site is offline: it then shows in the logo wall only (no preview, video or link). */
  live: boolean;
};

export const projects: Project[] = [
  {
    slug: "zoff",
    name: "Zoff",
    url: "https://zofffoods.com/",
    category: "Food & spices",
    description: "Spices, masalas and dry fruits, sold direct to kitchens across India.",
    sharkTankSeason: 2,
    live: true,
  },
  {
    slug: "bummer",
    name: "Bummer",
    url: "https://bummer.in/",
    category: "Comfort wear",
    description: "Innerwear and comfort wear in soft, breathable micromodal.",
    sharkTankSeason: 1,
    live: true,
  },
  {
    slug: "marbleous",
    name: "Marbleous",
    url: "https://www.themarbleous.com/",
    category: "Home décor",
    description: "Handcrafted marble home décor and serveware from Jaipur.",
    sharkTankSeason: 5,
    live: true,
  },
  {
    slug: "truediamond",
    name: "True Diamond",
    url: "https://truediamond.in/",
    category: "Fine jewellery",
    description: "Lab-grown diamond rings, earrings and everyday fine jewellery.",
    live: true,
  },
  {
    slug: "beyoung",
    name: "Beyoung",
    url: "https://www.beyoung.in/",
    category: "Fashion",
    description: "Everyday fashion for men and women, shipped across India.",
    live: true,
  },
  {
    slug: "kimti",
    name: "Kimti",
    url: "https://kimti.in/",
    category: "Jewellery",
    description: "Anti-tarnish, 18K gold-plated jewellery for every day.",
    live: true,
  },
  {
    slug: "gemsforluck",
    name: "Gems for Luck",
    url: "https://www.gemsforluck.com/",
    category: "Spiritual & wellness",
    description: "Certified gemstones, rudraksha and spiritual products.",
    live: true,
  },
  {
    slug: "ganges",
    name: "Ganges",
    url: "https://ganges.world/",
    category: "Cross-border e-commerce",
    description: "Shoppers worldwide buy from Indian stores and artisans, with international shipping.",
    live: true,
  },
  {
    slug: "haat",
    name: "haat",
    url: "https://haatglobal.com/",
    category: "Global marketplace",
    description: "A premium marketplace for products made in India, with verified sellers.",
    live: true,
  },
  {
    slug: "tagz",
    name: "TagZ",
    url: "https://tagzfoods.com/",
    category: "Snacks",
    description: "Popped chips and snacks.",
    sharkTankSeason: 1,
    live: false,
  },
];

export const liveProjects = projects.filter((p) => p.live);
export const sharkTankProjects = projects.filter((p) => p.sharkTankSeason);

/** Asset paths, derived from the slug (written by the capture scripts). */
export const assets = (slug: string) => ({
  screenshot: `/work/${slug}.webp`,
  screenshotSmall: `/work/${slug}-600.webp`,
  top: `/work/${slug}-top.webp`,
  topSmall: `/work/${slug}-top-600.webp`,
  mobile: `/work/${slug}-mobile.webp`,
  mobileSmall: `/work/${slug}-mobile-390.webp`,
  logo: `/logos/clients/${slug}.webp`,
  video: `/videos/${slug}.mp4`,
  poster: `/videos/${slug}.webp`,
});
