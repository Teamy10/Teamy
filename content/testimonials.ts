/**
 * Client testimonials. Real words only: paste each client's quote exactly as they wrote it,
 * and only with their permission. Never write or edit a quote on a client's behalf.
 *
 * An entry shows on the live site only when `quote` and `name` are filled in (not "TODO…") and
 * `permissionGiven` is true. Unfilled entries show as dashed placeholders in `npm run dev` only.
 */

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  /** The client's own words, exactly as they gave them. */
  quote: string;
  /** Only if the client actually gave a rating (1–5). Leave out otherwise. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Square photo under /public (e.g. /testimonials/jay.webp). Initials are shown when missing. */
  photo?: string;
  /** Link to the project Teamy built for them (optional). */
  link?: string;
  /** Must be true (you have their written OK) or the entry is hidden. */
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
  {
    name: "Anuj Agarwal",
    role: "Founder & CEO",
    company: "gemsforluck",
    quote: "TODO: Anuj's quote, in his exact words",
    permissionGiven: false, // TODO: set true once Anuj has approved the quote
  },
  {
    name: "Shivam Soni",
    role: "Founder & CEO",
    company: "beyoung",
    quote: "TODO: Shivam's quote, in his exact words",
    permissionGiven: false, // TODO: set true once Shivam has approved the quote
  },
  {
    name: "Arun Jain",
    role: "TODO: role",
    company: "TODO: company",
    quote: "TODO: Arun's quote, in his exact words",
    permissionGiven: false, // TODO: set true once Arun has approved the quote
  },
  {
    name: "TODO: haat founder name",
    role: "TODO: role",
    company: "haat",
    quote: "TODO: haat founder's quote, in their exact words",
    link: "https://haatglobal.com/",
    permissionGiven: false,
  },
];
