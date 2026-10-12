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

/**
 * The draft waiting for this brand's OK, if there is one. /review?brand=… starts the client's
 * review from it, for them to change, rate and send themselves.
 */
export function draftFor(brand: string): Testimonial | undefined {
  const b = brand.trim().toLowerCase();
  if (!b) return undefined;
  return testimonials.find((t) => !t.permissionGiven && !t.quote.startsWith("TODO") && t.company.toLowerCase() === b);
}

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
  // Drafts below: the starting text of each client's /review link. Hidden on the live site until that
  // client sends their review through it, or OKs it in writing (then fill in name, role, rating).
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "Zoff",
    quote:
      "Pehle humara website basic sa tha, ab ekdum premium lagta hai. Teamy ne har masala ki story itne pyaar se design ki ki customers khud bolte hain, 'site dekh ke hi khushboo aa gayi!'",
    link: "https://zofffoods.com/",
    permissionGiven: false,
  },
  {
    name: "Sulay Lavsi",
    role: "Founder", // ⚠️ CONFIRM in his reply (Founder or Co-founder)
    company: "Bummer",
    quote:
      "Shark Tank ke baad hume aisi website chahiye thi jo brand ki energy match kare. Teamy ne fun bhi rakha aur clean bhi, bilkul vaisa jaisa humne socha tha.",
    link: "https://bummer.in/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "Marbleous",
    quote:
      "Jaipur ki handcrafted marble ko screen pe dikhana aasaan nahi hai. Teamy ne har piece ko itni khoobsurti se present kiya ki website khud ek showroom lagti hai.",
    link: "https://www.themarbleous.com/",
    permissionGiven: false,
  },
  {
    name: "Shivam Soni",
    role: "Founder & CEO",
    company: "Beyoung",
    quote:
      "Itne bade catalogue ko simple dikhana mushkil tha, par Teamy ne kar dikhaya. Filters, layout, speed, sab kuch ek number. Asli Delhi wali efficiency!",
    link: "https://www.beyoung.in/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "Kimti",
    quote:
      "Shaadi season aur festive drops ke liye hume ek stylish website chahiye thi. Teamy ne aisi design banayi ki har collection apne aap special lagta hai.",
    link: "https://kimti.in/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "True Diamond",
    quote:
      "Jewellery online bechne ke liye trust sabse zaroori hai. Teamy ne ek elegant, premium website banayi jo pehli nazar mein hi bharosa jeet leti hai.",
    link: "https://truediamond.in/",
    permissionGiven: false,
  },
  {
    name: "Anuj Agarwal",
    role: "Founder & CEO",
    company: "Gems for Luck",
    quote:
      "Gemstones aur rudraksha ke liye bharosa aur detail dono chahiye. Teamy ne website ko itna saaf aur sacha design kiya ki customers ko har jaankari aaram se mil jaati hai.",
    link: "https://www.gemsforluck.com/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "haat",
    quote:
      "Duniya bhar ke customers ko Indian products dikhane ke liye ek world-class website chahiye thi. Teamy ne global look diya, par desi soul bilkul nahi khoya.",
    link: "https://haatglobal.com/",
    permissionGiven: false,
  },
  {
    name: "TODO: name",
    role: "TODO: role",
    company: "TagZ",
    quote:
      "Snack brand ki website bhi snack jaisi fun aur crunchy honi chahiye! Teamy ne bilkul wahi vibe pakdi, colourful aur fast.",
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
