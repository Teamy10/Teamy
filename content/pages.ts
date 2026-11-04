/**
 * Service and landing pages, rendered by app/services/[slug] and the two landing routes.
 * Copy rules: original, useful, true to the offer in content/site.ts (₹14,999 one-time,
 * live in about 7 days, you own everything). No invented numbers, clients or claims about
 * other companies. `tests/pages.test.ts` checks title/description length and word count.
 */
import { siteConfig, type Faq } from "./site";

export type LandingPage = {
  slug: string;
  /** URL path. Service pages live under /services/. */
  path: string;
  kind: "service" | "landing";
  /** Short name for breadcrumbs, cards and the WhatsApp message. */
  name: string;
  /** <title>, max 60 characters. */
  title: string;
  /** Meta description, max 155 characters. */
  description: string;
  h1: string;
  /** Word(s) in the H1 set in the light contrast weight. */
  h1Emphasis?: string;
  intro: string[];
  /** Optional hero button shown first, in place of the price link (WhatsApp then comes second). */
  heroCta?: { label: string; href: string };
  /** Optional visible heading over the benefits row (otherwise it's for screen readers only). */
  benefitsTitle?: string;
  benefits: { title: string; line: string }[];
  /** A section can end in a checklist. */
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
  /** Optional comparison table (Shopify page). */
  comparison?: { caption: string; columns: [string, string, string]; rows: [string, string, string][]; note: string };
  /** Which project card to show (name from content/projects.ts). Left out where no store fits the page. */
  portfolio?: string;
  faqs: Faq[];
  related: string[];
};

export const pages: LandingPage[] = [
  {
    slug: "custom-storefront-design",
    path: "/services/custom-storefront-design",
    kind: "service",
    name: "Custom storefront design",
    title: "Custom Storefront Design for D2C Brands | Teamy",
    description:
      "A custom-designed online store for your D2C brand, built around your products and photos, on your own domain. One-time ₹14,999, live in about 7 days.",
    h1: "A storefront designed around your brand, not a template.",
    h1Emphasis: "not a template.",
    intro: [
      "Your online store for a D2C brand is often the first place a customer meets you outside Instagram. If it looks like every other template, it quietly tells them you're just another seller. We design your storefront around your products, your photos and the way your customers actually shop, then build it on a domain you own.",
      "You don't brief a freelancer, chase revisions or learn a page builder. We start from what you already have, usually your Instagram, your product photos and a few brands you admire, and show you a free preview before you commit to anything.",
    ],
    benefits: [
      { title: "Designed for your products", line: "Layouts built around how your catalogue is browsed: collections, sizes, colours and the photos that sell." },
      { title: "Mobile-first by default", line: "Most of your visitors arrive from Instagram on a phone, so every page is designed for a thumb first, then scaled up." },
      { title: "Your own domain", line: "The store lives on a domain registered in your name, so your brand, links and search ranking stay yours." },
      { title: "Fast pages", line: "Light pages and properly sized images, because a slow product page loses the sale before it loads." },
    ],
    sections: [
      {
        heading: "What a custom design actually includes",
        paragraphs: [
          "A homepage that tells a new visitor what you sell and why it's different in a few seconds. Collection pages that make it easy to filter and compare. Product pages with room for the details people ask about in DMs: fabric, size guides, delivery times, care instructions and real photos.",
          "We also design the less glamorous pages that build trust: shipping and returns, contact, and an about page that sounds like you. These are the pages first-time buyers check before paying, especially for cash on delivery.",
        ],
      },
      {
        heading: "Built from what you already have",
        paragraphs: [
          "Most D2C founders already have a visual identity on Instagram. We carry it over: your colours, your type, the tone of your captions. If you want a refresh first, a brand refresh is available as an add-on before we build.",
          "If your product photos need work, we'll tell you honestly which ones will hold the store back and what to reshoot. A great layout can't rescue a dark, blurry photo, and we'd rather say so up front.",
        ],
      },
      {
        heading: "Why not just use a template?",
        paragraphs: [
          "Templates are a fine starting point, and we don't reinvent things that already work, like a familiar cart or checkout. But a store that looks like thousands of others makes it harder to charge a fair price and harder to be remembered. Custom design is how a small brand looks established from the very first visit.",
        ],
      },
      {
        heading: "How we design your store",
        paragraphs: [
          "We start with a short call about your brand, your best-selling products and the customers you want more of. Then we design a free preview using your real products and photos, so you can judge it on your own catalogue rather than a stock demo.",
          "Once you approve the direction, we build the full store, connect your domain, add your products and test every page on real phones before launch. You review it one last time, and then it goes live.",
        ],
      },
    ],
    portfolio: "haat",
    faqs: [
      {
        q: "Do I get to approve the design before you build it?",
        a: "Yes. You see a free preview of your store first. We only start the full build once you're happy with the direction.",
      },
      {
        q: "Can I update products and banners myself after launch?",
        a: "Yes. You can manage products, prices and stock yourself, and we show you how before launch. If you'd rather we handle updates, there's an optional care plan.",
      },
      {
        q: "What do you need from me to start?",
        a: "Your Instagram handle or product photos, a rough product list, and a few minutes on a call about who your customers are. We take it from there.",
      },
      {
        q: "Can you match the look of my Instagram?",
        a: "Yes. Most brands want the store to feel like their Instagram, and we use your colours, photography style and tone so the jump from a post to the store feels seamless.",
      },
    ],
    related: ["upi-cod-checkout", "analytics-meta-pixel", "shopify-alternative-india"],
  },
  {
    slug: "upi-cod-checkout",
    path: "/services/upi-cod-checkout",
    kind: "service",
    name: "UPI, cards & COD checkout",
    title: "Ecommerce Website with COD and UPI Checkout | Teamy",
    description:
      "An ecommerce website with UPI, cards and cash on delivery, plus WhatsApp COD confirmation and GST-ready invoices. Set up and tested by Teamy.",
    h1: "Checkout with UPI, cards and COD, the way India pays.",
    h1Emphasis: "the way India pays.",
    intro: [
      "An ecommerce website with COD and UPI is no longer optional in India. Some customers will only pay by UPI, some want to use a card, and many still won't buy from a new brand unless they can pay cash on delivery. A checkout that leaves any of them out loses orders you've already paid to attract.",
      "We set up a checkout that accepts UPI, cards and COD, connect it to a payment gateway account in your business name, and test every path, including failed payments and cancellations, before your store goes live.",
    ],
    benefits: [
      { title: "UPI first", line: "One tap from any UPI app on the phone your customer is already holding." },
      { title: "Cards and wallets", line: "Debit and credit cards through your payment gateway, for customers who prefer them." },
      { title: "COD that's confirmed", line: "Cash-on-delivery orders are confirmed on WhatsApp before you ship, so fewer parcels come back refused." },
      { title: "Money to your bank", line: "Payments settle from the gateway straight to your bank account. Teamy never holds your money." },
    ],
    sections: [
      {
        heading: "Cash on delivery without the refusals",
        paragraphs: [
          "COD builds trust for a brand a customer hasn't bought from before, but refused COD parcels are expensive: you pay to ship them out and to bring them back. That's why every COD order on a Teamy store triggers a WhatsApp confirmation. The customer taps to confirm, and anything left unconfirmed is flagged so you can call or cancel before dispatch.",
          "You can also decide where COD makes sense, for example only above or below a certain order value, or only for certain pin codes, once you've seen how your orders behave.",
        ],
      },
      {
        heading: "Payment gateway, in your name",
        paragraphs: [
          "We help you choose a payment gateway and set it up in your business name, which means the account, the settlements and the relationship are yours. Gateways charge a small fee on each online payment; the exact rate depends on the gateway and the payment method, and that fee goes to the gateway, not to Teamy.",
          "The gateway will ask for your business documents and a few website pages, such as terms, privacy and a refund policy. We make sure your store has them before you apply, so approval isn't held up.",
        ],
      },
      {
        heading: "Invoices and shipping, handled",
        paragraphs: [
          "Every order generates a GST-ready invoice, and checkout shows shipping charges clearly before payment, so there are no surprises that make customers abandon at the last step. We set up your shipping rules and test them with real pin codes before launch.",
        ],
      },
      {
        heading: "What happens on launch day",
        paragraphs: [
          "Before your store goes live, we place test orders through every payment method: a UPI payment, a card payment, a COD order and a payment that fails halfway. We check that each one creates the right order, sends the right WhatsApp message and shows up correctly for you to pack.",
          "That way the first real customer doesn't discover a broken checkout for you. If anything needs your gateway's approval or a document from you, we tell you exactly what's missing and why.",
        ],
      },
    ],
    portfolio: "Ganges",
    faqs: [
      {
        q: "Can I turn COD off for some orders?",
        a: "Yes. COD can be limited, for example by order value or location, once you know where refusals come from.",
      },
      {
        q: "How long do payments take to reach my bank?",
        a: "That depends on your payment gateway's settlement cycle, which they'll confirm when your account is approved. Payments go from the gateway directly to your bank.",
      },
      {
        q: "Do customers need an account to check out?",
        a: "No. Guest checkout is on by default, because forcing an account before payment is one of the most common reasons people abandon a cart.",
      },
      {
        q: "Is the payment page secure?",
        a: "Card and UPI payments are processed by the payment gateway on its secure checkout, so card details never touch your store.",
      },
    ],
    related: ["whatsapp-order-updates", "abandoned-cart-recovery", "custom-storefront-design"],
  },
  {
    slug: "whatsapp-order-updates",
    path: "/services/whatsapp-order-updates",
    kind: "service",
    name: "WhatsApp order updates",
    title: "WhatsApp Order Updates for Your Online Store | Teamy",
    description:
      "Automatic WhatsApp order updates for your online store: order confirmed, shipped and delivered, plus COD confirmation before dispatch. Set up by Teamy.",
    h1: "WhatsApp order updates your customers actually read.",
    h1Emphasis: "actually read.",
    intro: [
      "Your customers live on WhatsApp, not in their email inbox. WhatsApp order updates for your online store mean every buyer hears from you where they already are: when the order is confirmed, when it ships with a tracking link, and when it's delivered.",
      "It also takes a job off your plate. Instead of copying tracking numbers into DMs and answering “order kab aayega?” one by one, the updates go out automatically, and you only step in when a customer actually needs you.",
    ],
    benefits: [
      { title: "Confirmed, shipped, delivered", line: "The three messages every customer wants, sent automatically as the order moves." },
      { title: "COD confirmation", line: "A tap-to-confirm message for cash-on-delivery orders before you spend money shipping them." },
      { title: "Fewer “where is my order?” DMs", line: "Tracking links arrive on their own, so your inbox is for real conversations." },
      { title: "Your brand's voice", line: "Messages written in your tone, in English or Hinglish, and approved by you before launch." },
    ],
    sections: [
      {
        heading: "How the messages work",
        paragraphs: [
          "When an order is placed, the store sends a WhatsApp message to the number the customer entered at checkout. As the order is packed and handed to your courier, the next update goes out with the tracking link. When the courier marks it delivered, a final message closes the loop and can invite a review or a reorder later.",
          "Messages use WhatsApp's business messaging, so they come from your brand's business profile, not from a personal number. WhatsApp's own business-messaging charges can apply depending on how messages are sent and how many you send; we walk you through them before switching anything on.",
        ],
      },
      {
        heading: "COD confirmation, step by step",
        paragraphs: [
          "For a cash-on-delivery order, the customer gets a short message asking them to confirm. Confirmed orders move straight to packing. If a customer doesn't confirm, the order is flagged, and you can call them or cancel it before you pay for a shipment that's likely to be refused.",
          "This one step is often the difference between COD being a growth channel and COD being a cost you dread.",
        ],
      },
      {
        heading: "Only messages people want",
        paragraphs: [
          "Order updates go only to customers who ordered, about the order they placed. Promotional messages, like drops or offers, are kept separate and sent only to people who opted in. That keeps your number in good standing and your customers happy to hear from you.",
        ],
      },
      {
        heading: "What you'll notice in the first month",
        paragraphs: [
          "Fewer DMs asking where an order is, because customers already have the tracking link. Fewer refused COD parcels, because unconfirmed orders are caught before they ship. And a cleaner WhatsApp inbox, where the messages left are real questions you actually want to answer.",
          "Every update is tied to an order in your store, so you can see the full history of what a customer was told and when, which helps when a delivery goes wrong and you need to sort it out quickly.",
        ],
      },
      {
        heading: "Set up and tested for you",
        paragraphs: [
          "We set up the business profile, write the messages with you and test each one with real orders before launch. If you change couriers or your process later, we update the messages so they keep matching what actually happens.",
        ],
      },
    ],
    portfolio: "Ganges",
    faqs: [
      {
        q: "Do I need a separate WhatsApp number?",
        a: "A number used for the business profile works best when it isn't also your personal WhatsApp. We'll help you set up the right number before launch.",
      },
      {
        q: "Can I change what the messages say?",
        a: "Yes. We write them with you in your brand's tone, and you can ask us to update them whenever your offer changes.",
      },
      {
        q: "Can customers reply to the updates?",
        a: "Yes. Replies come to your business WhatsApp, so a customer with a question about their order can just answer the message.",
      },
      {
        q: "Are the order updates included in the ₹14,999 build?",
        a: "Yes. Setting up WhatsApp order updates and COD confirmation is part of the standard build. Any messaging charges from WhatsApp itself depend on your volume, and we explain them before you switch anything on.",
      },
    ],
    related: ["upi-cod-checkout", "abandoned-cart-recovery", "drops-waitlists-reorders"],
  },
  {
    slug: "abandoned-cart-recovery",
    path: "/services/abandoned-cart-recovery",
    kind: "service",
    name: "Abandoned-cart recovery",
    title: "Abandoned Cart Recovery for D2C Stores | Teamy",
    description:
      "Win back abandoned carts with timely, polite reminders and a checkout that's fast on mobile. Set up for your D2C store by Teamy, one-time ₹14,999.",
    h1: "Win back the carts that almost became orders.",
    h1Emphasis: "almost became orders.",
    intro: [
      "Most people who add something to their cart don't finish buying, at least not straight away. Some got distracted, some wanted to check the price again, some hit a slow page or a surprise shipping charge. Abandoned-cart recovery is about two things: removing the reasons people leave, and reminding the ones who meant to come back.",
      "We work on both. We make checkout as short and fast as possible on mobile, and we set up gentle reminders for shoppers who left something behind and agreed to hear from you.",
    ],
    benefits: [
      { title: "Fewer reasons to leave", line: "Guest checkout, clear shipping costs up front and fast mobile pages." },
      { title: "Timely reminders", line: "A polite nudge with a link straight back to the cart, while the shopper still remembers it." },
      { title: "Respectful by design", line: "Reminders go only to shoppers who shared their contact and agreed to updates." },
      { title: "See what's working", line: "Track how many carts come back, so you can adjust timing and wording." },
    ],
    sections: [
      {
        heading: "Fix the leaks before you send reminders",
        paragraphs: [
          "The cheapest recovered cart is the one that was never abandoned. Before any reminder is switched on, we look at the obvious friction: forced sign-ups, shipping costs that appear only at the last step, payment options that are missing, and pages that load slowly on a mobile connection. Fixing these usually matters more than any message.",
          "Your checkout is designed to ask only for what's needed to deliver the order, with UPI, cards and COD ready on the payment step.",
        ],
      },
      {
        heading: "Reminders that sound like you",
        paragraphs: [
          "When a shopper who has shared their contact details leaves items in the cart, they get a short reminder with a link that reopens their cart exactly as they left it. We write the message with you, in your brand's voice, and keep it friendly rather than pushy.",
          "You decide whether to include an offer. Many brands start without discounts, so customers don't learn to abandon carts on purpose, and only test an offer later if needed.",
        ],
      },
      {
        heading: "Measure, then adjust",
        paragraphs: [
          "Your analytics show how many carts were abandoned, how many reminders went out and how many orders came back. With real numbers from your own store, you can tune the timing and the wording instead of guessing.",
        ],
      },
      {
        heading: "Why carts get abandoned in India",
        paragraphs: [
          "Some reasons are universal: unexpected shipping costs, being asked to create an account, or a slow page on a patchy connection. Others are more common in India, like a shopper who wanted COD and didn't see it offered, or someone who planned to pay by UPI later from a different phone.",
          "We design the checkout around these, showing delivery charges early, offering UPI, cards and COD on the same step and keeping the number of fields small, so fewer carts need recovering at all.",
        ],
      },
      {
        heading: "What it looks like for your customer",
        paragraphs: [
          "A shopper adds a kurta to the cart, enters their phone number, then gets distracted. A little later, they receive a short, friendly reminder with a link. One tap and their cart is back, with the same size and colour, ready to pay. No pressure, no spam, just a helpful nudge.",
        ],
      },
    ],
    portfolio: "haat",
    faqs: [
      {
        q: "Will reminders annoy my customers?",
        a: "They're sent only to shoppers who shared their contact and agreed to hear from you, and only about the items they left. One well-timed reminder is usually enough.",
      },
      {
        q: "Do I have to offer a discount?",
        a: "No. You can start with a simple reminder and test an offer later if your numbers suggest it would help.",
      },
      {
        q: "Is this included in the ₹14,999 build?",
        a: "Yes. Abandoned-cart nudges are part of the standard build, along with the checkout improvements described here.",
      },
      {
        q: "How soon after leaving is the reminder sent?",
        a: "We start with a sensible delay so it feels helpful rather than pushy, then adjust it based on what your own store's numbers show.",
      },
    ],
    related: ["upi-cod-checkout", "whatsapp-order-updates", "analytics-meta-pixel"],
  },
  {
    // Copy from docs/website-update-kit.md (section 5), word for word: shorter than the other pages by design.
    slug: "whatsapp-ai-agent",
    path: "/services/whatsapp-ai-agent",
    kind: "service",
    name: "WhatsApp AI agent",
    title: "WhatsApp AI Agent for D2C Brands | Teamy",
    description:
      "A WhatsApp AI agent that confirms COD orders, answers customers 24/7 and recovers abandoned carts. Works with your existing store. ₹14,999 setup + ₹4,999/month.",
    h1: "An AI agent that confirms orders, answers customers and recovers carts on WhatsApp.",
    h1Emphasis: "on WhatsApp.",
    intro: [
      "Your customers message at 11 PM asking where their order is. COD buyers change their mind and refuse the parcel after you've paid to ship it. Shoppers add to cart and disappear. Every one of these costs you money, and nobody can sit on WhatsApp all day.",
    ],
    heroCta: { label: "Get a free store audit", href: "/#audit" },
    benefitsTitle: "How it works",
    benefits: [
      { title: "We connect your store and WhatsApp.", line: "Your store's orders and products are linked to your WhatsApp Business number." },
      { title: "We train the agent on your brand.", line: "Your products, policies, shipping times and tone of voice. It only answers from what you approve." },
      { title: "Live in 5–7 days.", line: "You can see every conversation, and the agent hands the chat to your team whenever it isn't sure." },
    ],
    sections: [
      {
        heading: "What you get",
        paragraphs: [],
        list: [
          "COD order confirmation on WhatsApp",
          "24/7 answers to order status, shipping, sizing and returns, in English or Hindi",
          "Abandoned-cart reminders",
          "Reorder and restock alerts",
          "A monthly report: conversations handled, orders confirmed, carts recovered",
          "Monthly tuning as your products and policies change",
        ],
      },
      {
        heading: "Pricing",
        paragraphs: ["₹14,999 setup + ₹4,999/month. Cancel the monthly plan any time."],
      },
    ],
    // The AI agent questions from the home page FAQ.
    faqs: siteConfig.faqs.filter((f) =>
      [
        "What does the WhatsApp AI agent actually do?",
        "Do I need to rebuild my store to add the AI agent?",
        "Will the AI say something wrong to my customers?",
        "What does WhatsApp charge?",
      ].includes(f.q),
    ),
    related: ["whatsapp-order-updates", "abandoned-cart-recovery", "drops-waitlists-reorders"],
  },
  {
    slug: "analytics-meta-pixel",
    path: "/services/analytics-meta-pixel",
    kind: "service",
    name: "Analytics & Meta Pixel",
    title: "Google Analytics & Meta Pixel Setup for Stores | Teamy",
    description:
      "Google Analytics 4 and Meta Pixel set up properly on your online store, so you can see what sells and run Instagram ads that learn from real orders.",
    h1: "Know what sells, and spend on ads that work.",
    h1Emphasis: "ads that work.",
    intro: [
      "If you run Instagram or Facebook ads, the Meta Pixel is how Meta learns which people actually buy. If it's missing or set up badly, your ads optimise for clicks instead of orders, and you pay for traffic that never converts.",
      "We set up Google Analytics 4 and the Meta Pixel on your store before launch, check that purchases, carts and checkouts are recorded correctly, and show you the few numbers that matter, so you can make decisions from data instead of a hunch.",
    ],
    benefits: [
      { title: "Meta Pixel, done right", line: "Page views, add-to-cart, checkout and purchase events firing on the right pages, tested before launch." },
      { title: "Google Analytics 4", line: "See where visitors come from, which products they view and where they drop off." },
      { title: "SEO basics", line: "Clean titles, descriptions and a sitemap, so search traffic can build over time." },
      { title: "A simple read-out", line: "We show you the handful of reports worth checking every week, not fifty dashboards." },
    ],
    sections: [
      {
        heading: "Why the Pixel matters for Instagram-first brands",
        paragraphs: [
          "Most D2C brands in India grow through Instagram. When your store sends purchase events back to Meta through the Pixel, your ads can optimise for people likely to buy, and you can build audiences like recent visitors or past buyers. Without it, you're spending blind.",
          "We test every event with real test orders before launch, so the first rupee you spend on ads is already measured properly.",
        ],
      },
      {
        heading: "What you'll be able to answer",
        paragraphs: [
          "Which Instagram post or ad brought the most buyers this week? Which product gets viewed a lot but rarely bought? How many people reach checkout and leave? These are the questions Sharks ask founders, and the questions you'll want answered before your next drop.",
          "Because the store and the data are yours, you can share access with any marketer or agency you work with later.",
        ],
      },
      {
        heading: "Privacy, handled sensibly",
        paragraphs: [
          "Analytics and ad tracking involve your visitors' data, so your store's privacy policy explains what's collected and why. We set this up in line with your policy, and keep tracking to what you actually use.",
        ],
      },
      {
        heading: "What we set up, exactly",
        paragraphs: [
          "Google Analytics 4 is connected to your store and records page views, product views, add-to-cart, checkout and completed purchases with the order value. The Meta Pixel records the same journey for Meta, so your ads can learn from real purchases rather than clicks.",
          "We also make sure the basics for search are in place: a clear title and description on every page, clean links, image descriptions and a sitemap submitted to Google Search Console, so your products can be found by people searching for them.",
        ],
      },
      {
        heading: "Reading your numbers in five minutes a week",
        paragraphs: [
          "Once your store is live, we show you a short weekly routine: where this week's visitors came from, which products were viewed and bought, how many people started checkout and how many finished. Five minutes a week is enough to spot what's working and what to fix before your next drop.",
          "If a number looks wrong, message us on WhatsApp and we'll check the tracking, so you're never left wondering whether the data can be trusted.",
        ],
      },
    ],
    portfolio: "Ganges",
    faqs: [
      {
        q: "I already have a Meta Pixel. Can you use it?",
        a: "Yes. We connect your existing Pixel so your ad history and audiences carry over, then check that every event fires correctly.",
      },
      {
        q: "Do you run the ads too?",
        a: "We set up the tracking your ads depend on. Running ad campaigns isn't part of the standard build, but your data is ready for whoever runs them.",
      },
      {
        q: "Who can see my analytics?",
        a: "You own the accounts. You decide who gets access, and you can remove it at any time.",
      },
    ],
    related: ["abandoned-cart-recovery", "drops-waitlists-reorders", "custom-storefront-design"],
  },
  {
    slug: "drops-waitlists-reorders",
    path: "/services/drops-waitlists-reorders",
    kind: "service",
    name: "Drops, waitlists & reorders",
    title: "Product Drops, Waitlists & Reorder Reminders | Teamy",
    description:
      "Run product drops, waitlists, restock alerts and reorder reminders from your own store, and keep every customer you win. Set up by Teamy.",
    h1: "Drops, waitlists and reorders, on your own store.",
    h1Emphasis: "on your own store.",
    intro: [
      "Drops are how many Indian D2C brands create excitement: a limited batch, a festive edit, a restock that sells out in hours. When drops happen only in Instagram DMs, you lose track of who wanted what, and the customers you win belong to the platform, not to you.",
      "We set up drops, waitlists, restock alerts and reorder reminders on your own store, so every interested shopper becomes a contact you can reach again, on your terms.",
    ],
    benefits: [
      { title: "Waitlists", line: "Let people sign up for an upcoming drop and hear the moment it goes live." },
      { title: "Restock alerts", line: "“Notify me” on sold-out products, so demand isn't lost when stock runs out." },
      { title: "Reorder reminders", line: "A timely nudge for products people buy again, linking straight back to your store." },
      { title: "Your customer list", line: "Every signup and order builds a list you own and can export anytime." },
    ],
    sections: [
      {
        heading: "Running a drop from your store",
        paragraphs: [
          "Before a drop, a product page can show a launch date and a waitlist signup instead of a buy button. When the drop goes live, everyone on the waitlist hears about it first, and the store handles the rush: stock counts, sold-out badges and checkout, without you answering hundreds of DMs.",
          "After the drop, you can see exactly who signed up, who bought and what sold first, which tells you how much to make next time.",
        ],
      },
      {
        heading: "Restocks that don't lose demand",
        paragraphs: [
          "When a product sells out, a “notify me” option keeps the interest instead of sending shoppers to a competitor. When stock is back, they get a message with a direct link. For a small brand that makes in batches, this turns every sell-out into a head start on the next batch.",
        ],
      },
      {
        heading: "Reorders for products people use up",
        paragraphs: [
          "For skincare, food, candles and other things people buy again, a reorder reminder at the right time brings customers back to your store instead of a marketplace search. We help you choose sensible timing for each product, and reminders go only to customers who agreed to hear from you.",
          "Over time, this is how a store stops depending only on new followers and starts earning from the customers it already has.",
        ],
      },
      {
        heading: "A drop, from announcement to sell-out",
        paragraphs: [
          "A week before the drop, you post a teaser on Instagram with a link to the product page, which shows the launch date and a waitlist signup. Followers join the list from the link in your bio. On launch day, the waitlist hears first, the product goes live and stock counts down as orders come in. When it sells out, the page switches to “notify me” for the next batch.",
          "Everything happens on your store, so every person who joined, bought or asked to be notified stays on your customer list for the next drop.",
        ],
      },
      {
        heading: "Why this matters for repeat business",
        paragraphs: [
          "Followers can disappear when a platform changes how many people see your posts. A customer list you own doesn't. Each drop, waitlist and reorder reminder adds to a list you can reach directly, which is what keeps a D2C brand steady between viral moments.",
        ],
      },
    ],
    portfolio: "haat",
    faqs: [
      {
        q: "Can I run a drop with limited quantities?",
        a: "Yes. Stock counts update as orders come in, and products show as sold out automatically when they run out.",
      },
      {
        q: "How do people join a waitlist?",
        a: "They leave their contact details on the product page. When the drop goes live, they're told first.",
      },
      {
        q: "Can I export my customer list?",
        a: "Yes, anytime. Your customers and their order history belong to you.",
      },
      {
        q: "Do drops work for festive collections?",
        a: "Yes. Festive edits, limited batches and seasonal restocks are exactly what drops and waitlists are for, and they're a good way to gather demand before a busy season.",
      },
    ],
    related: ["whatsapp-order-updates", "analytics-meta-pixel", "abandoned-cart-recovery"],
  },
  {
    slug: "shopify-alternative-india",
    path: "/shopify-alternative-india",
    kind: "landing",
    name: "Shopify alternative for India",
    title: "Shopify Alternative in India: One-Time ₹14,999 | Teamy",
    description:
      "Looking for a Shopify alternative in India? An honest comparison of monthly-subscription platforms and a one-time ₹14,999 store you own outright.",
    h1: "A Shopify alternative for Indian brands that want to own their store.",
    h1Emphasis: "own their store.",
    intro: [
      "Shopify is a good platform, and plenty of brands do well on it. If you're searching for a Shopify alternative in India, it's usually for one of three reasons: the monthly subscription and paid apps add up, you don't have time to build and maintain the store yourself, or you want more control over a store you own.",
      "Here's an honest look at how a subscription platform compares with a store Teamy designs and builds for you for a one-time ₹14,999, so you can choose what fits your brand.",
    ],
    benefits: [
      { title: "One-time cost", line: "₹14,999 for the build, with no compulsory monthly fee from Teamy." },
      { title: "Built for you", line: "We design, build and set up the store; you don't need to learn a platform or hire a developer." },
      { title: "Indian checkout", line: "UPI, cards and COD with WhatsApp COD confirmation, set up from day one." },
      { title: "You own it", line: "Your domain, your code and your customer data, yours to keep and take anywhere." },
    ],
    comparison: {
      caption: "Subscription platform vs a Teamy store",
      columns: ["", "Typical subscription platform", "Teamy"],
      rows: [
        ["How you pay", "Monthly subscription; some features need paid apps", "₹14,999 one-time; optional care plan if you want ongoing updates"],
        ["Who builds it", "You, or a developer you hire and brief", "We do, after a free preview you approve"],
        ["COD and WhatsApp", "Usually added with apps and setup", "Included: COD with WhatsApp confirmation and order updates"],
        ["Ownership", "Your store runs on the platform; your data is exportable", "Your domain, code and data; access handed over to you"],
        ["Support", "Help centre and app developers", "The same people on WhatsApp who built your store"],
      ],
      note: "Platform pricing, plans and fees change. Check each platform's current pricing page before you decide; this table describes the general model, not a specific plan.",
    },
    sections: [
      {
        heading: "When Shopify is the better choice",
        paragraphs: [
          "If you enjoy building things yourself, want to change your store every day without help, or need a niche feature that only exists as a third-party app, a platform like Shopify can make sense. It has a large ecosystem and lots of tutorials.",
          "We'd rather tell you that than sell you something that doesn't fit.",
        ],
      },
      {
        heading: "When a Teamy store makes more sense",
        paragraphs: [
          "If you're an Instagram-first D2C brand that wants a professional store quickly, without becoming your own web developer, a done-for-you store is usually simpler and cheaper over time. You get a custom design, a checkout built for how India pays, WhatsApp updates and analytics, all set up and tested, for one price.",
          "Because there's no compulsory monthly fee from Teamy, your store doesn't get more expensive as you add features you'd otherwise buy as apps. You do pay your own domain renewal and payment-gateway fees directly, the same as on any platform.",
        ],
      },
      {
        heading: "Already on Shopify?",
        paragraphs: [
          "Moving is usually possible. Send us your store link on WhatsApp and we'll tell you honestly what can come across, such as products, images and customer lists, and whether it fits the standard build or needs extra time.",
        ],
      },
      {
        heading: "What “owning your store” means here",
        paragraphs: [
          "With a Teamy store, the domain is registered in your name, the payment gateway is in your business name, and you get access to the store's code and logins. Your customer list and order history can be exported any time. If you ever want a different developer to work on it, or to move it somewhere else, you can.",
        ],
      },
    ],
    portfolio: "Ganges",
    faqs: [
      {
        q: "Is Teamy a platform like Shopify?",
        a: "No. Teamy is a studio. We design, build and run your store for you, so you're not signing up to a platform and building it yourself.",
      },
      {
        q: "What will I pay after the ₹14,999?",
        a: "There's no compulsory monthly fee from Teamy. You pay your own domain renewal and payment-gateway charges directly, and the care plan is optional.",
      },
      {
        q: "Can I leave later and take my store with me?",
        a: "Yes. The domain, code and customer data are yours, so you're never locked in.",
      },
      {
        q: "Can I see an example before deciding?",
        a: "Yes. Look at the stores we've built, or message us on WhatsApp for a free preview of your own store before you pay anything.",
      },
    ],
    related: ["custom-storefront-design", "upi-cod-checkout", "ecommerce-website-developer-delhi"],
  },
  {
    slug: "ecommerce-website-developer-delhi",
    path: "/ecommerce-website-developer-delhi",
    kind: "landing",
    name: "Ecommerce website developer in Delhi",
    title: "Website Design & Ecommerce Development in Delhi | Teamy",
    description:
      "Teamy is an ecommerce website developer in New Delhi: custom-coded online stores for D2C brands across India. 450+ projects, from ₹14,999.",
    h1: "Ecommerce website developer in Delhi, for brands across India.",
    h1Emphasis: "for brands across India.",
    intro: [
      "Teamy is a website design and ecommerce development company in New Delhi that builds custom-coded online stores for D2C brands. In five years we've delivered 450+ websites and projects, for first-time founders and for brands featured on Shark Tank India.",
      "Founders across India work with us over WhatsApp and calls, and Delhi brands can meet us in person. You talk to the same people from your first message to launch day and long after it.",
    ],
    benefits: [
      { title: "A Delhi team you can reach", line: "On WhatsApp Monday to Saturday, replying within 4 hours, and a short drive away if you're in Delhi." },
      { title: "Proven with real brands", line: "450+ projects, including brands seen on Shark Tank India." },
      { title: "Made for Indian buyers", line: "UPI, cards and COD checkout, with WhatsApp order updates and COD confirmation." },
      { title: "A clear starting price", line: "Starter stores from ₹14,999 one-time; bigger builds quoted after a free call." },
    ],
    sections: [
      {
        heading: "Who we build for",
        paragraphs: [
          "Delhi is home to thousands of D2C brands: fashion and ethnic wear labels, jewellers, skincare and wellness brands, food and snack makers, home décor studios and gifting businesses. Many sell well on Instagram and marketplaces but don't yet own a website that does the brand justice. We build that website, so orders, customers and data stop living only in DMs and marketplace dashboards.",
          "We also work with brands across India, from founders launching their first store to established names moving to a faster, better-looking site. Our clients include Zoff, Bummer, Marbleous, True Diamond, Beyoung, Kimti and Gems for Luck.",
        ],
      },
      {
        heading: "What you get",
        paragraphs: [
          "A custom-coded storefront on your own domain, designed around your brand rather than a template. A checkout with UPI, cards and cash on delivery. WhatsApp order updates and COD confirmation, abandoned-cart reminders, analytics and Meta Pixel, and tools for drops and reorders. Everything is set up and tested by us, and the site, code and data belong to you.",
        ],
      },
      {
        heading: "How to get started",
        paragraphs: [
          "Message us on WhatsApp with your Instagram handle, your current website or a few product photos. We'll set up a short call, share a plan and a quote, and start the build only once you're happy with the direction.",
        ],
      },
      {
        heading: "Why brands choose a team over a freelancer",
        paragraphs: [
          "Freelancers can be great, but many founders have been burned by a developer who disappeared after launch, or by a website nobody else could maintain. As a team, we document what we build, hand over every login, and stay reachable on WhatsApp after your site goes live.",
          "You also get a clear starting price: starter stores from ₹14,999, one-time, with no compulsory monthly fee from Teamy. Larger builds and add-ons like catalogue upload, SEO setup or a care plan are quoted before we start, so there are no surprises later.",
        ],
      },
      {
        heading: "The kinds of websites we build",
        paragraphs: [
          "Online stores for clothing and ethnic wear, jewellery and fine jewellery, home décor, skincare, food and spices, spiritual products and handmade goods, plus brand websites and marketplaces. If you sell to customers in India, or from India to the world, we can build it. If your idea needs something unusual, tell us on WhatsApp and we'll say honestly whether it fits.",
        ],
      },
      {
        heading: "Our address and hours",
        paragraphs: [
          "Teamy is based in Mehrauli, New Delhi 110030, India. We work Monday to Saturday and reply to WhatsApp messages within 4 hours on working days. You can also email us at teamyindia@gmail.com.",
        ],
      },
    ],
    portfolio: "Zoff",
    faqs: [
      {
        q: "Do you only work with brands in Delhi?",
        a: "No. We're based in New Delhi and work with brands across India. Everything can be done over WhatsApp and calls.",
      },
      {
        q: "How quickly can my site go live?",
        a: "Starter stores usually go live in about 7 days once you approve the design. Bigger custom builds get a timeline with the quote, depending on your catalogue and integrations.",
      },
      {
        q: "What are your working hours?",
        a: "Monday to Saturday. Message us on WhatsApp any time and we reply within 4 hours during working days.",
      },
      {
        q: "Can I meet the team?",
        a: "Yes. Most of our work happens over WhatsApp and calls, which keeps things quick for founders anywhere in India, but if you're in Delhi and would like to meet, ask us on WhatsApp.",
      },
    ],
    related: ["custom-storefront-design", "shopify-alternative-india", "upi-cod-checkout"],
  },
];

export const servicePages = pages.filter((p) => p.kind === "service");
export const pageBySlug = (slug: string) => pages.find((p) => p.slug === slug);

/** Word count of a page's body copy (used by tests to keep pages in the 600–900 word range). */
export function wordCount(p: LandingPage): number {
  const text = [
    p.h1,
    ...p.intro,
    ...p.benefits.flatMap((b) => [b.title, b.line]),
    ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...(p.comparison ? p.comparison.rows.flat() : []),
    ...p.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
