/**
 * Client testimonials. Only a client's own words, or a draft they have approved in writing, may go
 * live: never publish a quote under someone's name without their OK.
 *
 * An entry shows on the live site only when `quote` and `name` are filled in (not "TODO…") and
 * `permissionGiven` is true. Until then it shows in `npm run dev` only: drafts as cards tagged
 * "Draft", with a WhatsApp button below the wall that sends the client their draft to approve or
 * rewrite. When they reply OK, set permissionGiven: true and fill in the name, role and rating they gave.
 */

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  /** The client's own words, or a draft of ours that they approved (with their edits). */
  quote: string;
  /** Only if the client actually gave a rating (1–5). Leave out otherwise. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Square photo under /public (e.g. /testimonials/jay.webp). Initials are shown when missing. */
  photo?: string;
  /** Link to the project Teamy built for them (optional). */
  link?: string;
  /** Must be true (you have their written OK on this exact text) or the entry is hidden. */
  permissionGiven: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Jay Agrawal", // ⚠️ CONFIRM spelling: Agrawal or Agarwal
    role: "Founder",
    company: "Ganges",
    // ⚠️ CONFIRM: reworded from Jay's original (brand name and phrasing). Get his OK on this text.
    quote:
      "Teamy turned our idea into a fast, high-converting store in record time. Their clarity, speed of execution and attention to every step of the buying journey made a real difference to our early traction.",
    rating: 5, // ⚠️ CONFIRM he gave 5 stars
    link: "https://ganges.world/",
    permissionGiven: true, // ⚠️ CONFIRM written permission
  },
  // Drafts below: written by Teamy for each client to approve or rewrite. Hidden on the live site
  // until that client says OK.
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "Zoff",
    quote:
      "Teamy understood our brand from the very first call. The store looks as good as our spices taste, works smoothly on every phone and is easy for our team to run.",
    link: "https://zofffoods.com/",
    permissionGiven: false,
  },
  {
    name: "Sulay Lavsi",
    role: "Founder", // ⚠️ CONFIRM in his reply (Founder or Co-founder)
    company: "Bummer",
    quote:
      "We wanted a website as comfortable as our products, and Teamy delivered: clean design, a quick checkout and a team that replies fast whenever we need anything.",
    link: "https://bummer.in/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "Marbleous",
    quote:
      "Every piece we make is handcrafted, and Teamy made sure our website shows that detail. They were patient with our feedback, and the final site is exactly what we imagined.",
    link: "https://www.themarbleous.com/",
    permissionGiven: false,
  },
  {
    name: "Shivam Soni",
    role: "Founder & CEO",
    company: "Beyoung",
    quote:
      "With a catalogue as big as ours, speed matters. Teamy kept the site fast and easy to browse, and turned around every change we asked for without slowing us down.",
    link: "https://www.beyoung.in/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "Kimti",
    quote:
      "Teamy gave us a store that looks elegant and stays simple to shop. Our customers find what they want quickly, and the team is always one WhatsApp message away.",
    link: "https://kimti.in/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "True Diamond",
    quote:
      "Buying a diamond online takes trust, and that was our brief. Teamy gave us a website that feels premium and clear at every step, and they stayed with us after launch.",
    link: "https://truediamond.in/",
    permissionGiven: false,
  },
  {
    name: "Anuj Agarwal",
    role: "Founder & CEO",
    company: "Gems for Luck",
    quote:
      "Our customers need to trust what they buy. Teamy built a website that presents our gemstones with real care, and they understood our business from day one.",
    link: "https://www.gemsforluck.com/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "haat",
    quote:
      "A marketplace for buyers around the world is not simple to build. Teamy thought through every detail with us and delivered a platform we are proud to put our name on.",
    link: "https://haatglobal.com/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "TagZ",
    quote:
      "Teamy matched our playful brand perfectly. The website was fun, fast and easy to shop, and working with them felt like having our own in-house team.",
    permissionGiven: false,
  },
  // No draft: we don't know Arun's company yet. The dev button asks him for his own words.
  {
    name: "Arun Jain",
    role: "TODO: role",
    company: "TODO: company",
    quote: "TODO: Arun's quote, in his exact words",
    permissionGiven: false,
  },
];
