# Teamy: marketing site (teamy.in)

Site for Teamy, a web team in New Delhi that designs and builds custom-coded websites for
India's D2C brands (450+ projects in 5+ years, including brands featured on Shark Tank India).
Next.js (App Router) + TypeScript + Tailwind CSS v4, mobile-first, fully static, deploys to Vercel.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000 (shows dashed "Placeholder · dev only" boxes for unfilled content)
npm run build        # production build (placeholders hidden)
npm start            # serve the production build
npm run typecheck
npm run lint         # ESLint (next core-web-vitals + typescript)
npm test             # Vitest: festive dates, landing-page SEO limits and word counts
```

Requires Node 20+.

## Edit content: `content/site.ts`

All copy, prices, numbers, contact details and links live in **`content/site.ts`**. Clients (the logo
wall, the Shark Tank India band, "Our work" and the videos) live in **`content/projects.ts`**,
testimonials in **`content/testimonials.ts`**, and service and landing page copy in **`content/pages.ts`**.

| What | Key |
| --- | --- |
| WhatsApp number (every contact button uses it) | `WHATSAPP_NUMBER` constant at the top |
| The message every contact button pre-fills | `WHATSAPP_MESSAGE` constant at the top |
| Email, address (Mehrauli, New Delhi 110030), hours | `contact` |
| 450+ projects, 5+ years, 4.9/5 rating, 97% satisfaction, reviews link | `facts` |
| Social links (empty = hidden) | `socials` |
| "Live in X days" for starter stores | `launchDays` constant at the top |
| "We reply within X hours" | `responseHours` |
| Hero headline, sub line, the two client sites shown | `hero` (`showcase` = project slugs) |
| "Idea → live in 7 days" scroll story | `story` |
| "What we build" bento tiles (each links to `/services/<slug>`) | `services` |
| Pricing: starter store ("from ₹14,999"), custom website (quoted), add-ons | `plan`, `customPlan`, `addOns` |
| "How we work" steps (Discover → Design → Develop → Launch) | `process` |
| Trust numbers (count up on scroll) | `stats` |
| "Works with" logos (`verified: false` = hidden) | `integrations` |
| About Teamy: eyebrow, heading, body, four highlights | `about` |
| Home FAQ (also emitted as FAQPage schema) | `faqs` |
| Shark Tank India band (brands come from `projects.ts` → `sharkTankSeason`) | `sharkTank` |

**Placeholders.** Any value starting with `TODO` (or empty) counts as unfilled: it's hidden on the live
site, and in `npm run dev` it shows as a dashed placeholder box so you can see what's missing. On the
legal pages, unfilled terms show as "[to be confirmed]" on the live site.

Festival dates, colours, motifs and greetings live in **`config/festive.ts`** (see "Festive themes").

## Before you go live (checklist)

- [ ] Fill every `TODO` in `content/site.ts` (socials, Google reviews link)
- [ ] Collect reviews: send clients **https://www.teamy.in/review** (one link for everyone, or the per-client links in the dev panel under the testimonials). Each review arrives on WhatsApp in their own words, with their consent; add it to `content/testimonials.ts` with `permissionGiven: true`. From 6 reviews, the section becomes the two-row wall
- [ ] Add any other clients in `content/projects.ts`
- [ ] Make sure every client in `content/projects.ts` is happy to be shown (logo and site)
- [ ] Confirm everything marked `⚠️ CONFIRM` (opening hours, `launchDays`, `responseHours`, Razorpay/Shiprocket)
- [ ] Upload the assets listed below
- [ ] Fill the `TODO` terms in `/privacy`, `/terms` and `/refund-policy`, then **have a lawyer review all three**
- [ ] Set `PRIMARY_DOMAIN_LIVE=true` in Vercel, and check `NEXT_PUBLIC_SITE_URL` there is empty or `https://www.teamy.in` (see "Domain and SEO")
- [ ] Payments: test keys in Vercel and one test payment, then live keys once the payment and refund terms are filled (see "Payments")
- [ ] Festival dates in `config/festive.ts` for each new year

### Optional assets

| File | What |
| --- | --- |
| `public/testimonials/<name>.webp` | square client photos; set `photo` in `content/testimonials.ts` (initials show otherwise) |
| `public/logos/clients/<slug>.webp` | an official logo file, to replace one taken from the client's site |
| `public/logos/upi.svg`, `rupay.svg`, `shiprocket.svg` | official logos (these show as text wordmarks until added; then set `logo` in `integrations`) |

Screenshots, logos and videos of client sites are generated (see "Client assets"). The 7-day story uses
an **invented demo brand** ("kesar threads"), labelled as such. A testimonial goes live only once the
client has approved its exact text in writing. The Shark Tank India band carries a "not affiliated with the show" line; keep it.

## Leads (WhatsApp)

There's no backend. Every contact button and link is a `wa.me` link to `WHATSAPP_NUMBER`, pre-filled with
`WHATSAPP_MESSAGE` and opened in a new tab (`components/ui/WhatsAppCTA.tsx`). The contact form adds the
visitor's name, project type and message below it and opens WhatsApp (same tab on phones, new tab on
desktop). Nothing is stored on a server.

## Client assets: screenshots, logos and videos

Everything about a client comes from its live website, so adding a client is: add an entry to
`content/projects.ts`, then run the capture scripts (needs Chromium for Playwright once:
`npx playwright install chromium`).

```bash
npm run capture:all               # all three below, for every live client
npm run capture:work -- zoff      # any script, for just the given slugs
```

| Script | Writes | Used by |
| --- | --- | --- |
| `capture:work` | `public/work/<slug>.webp` (full homepage), `-600`, `-top` (first desktop screen), `-mobile` (first phone screen), `manifest.json` | "Our work" cards (scroll on hover / on screen), hero frames |
| `capture:logos` | `public/logos/clients/<slug>.webp` + `manifest.json` (size, light/dark tone) | logo wall, Shark Tank India band |
| `capture:videos` | `public/videos/<slug>.mp4` + poster (540×960) and `media/social/<slug>.mp4` (720×1280, with a Teamy caption) | "Our websites, in motion"; the `media/social` clips are ready for Instagram Reels / YouTube Shorts |

The scripts scroll each site so lazy content loads, and hide pop-ups, cookie bars and chat bubbles.
Videos are rendered frame by frame, so the scroll is smooth on any machine. Check the results after a
run: a pop-up the scripts didn't catch may need a re-run. Clients with `live: false` (an offline site)
appear in the logo wall only; their logo is added by hand.

## Analytics

Set these in Vercel (Settings → Environment Variables) and redeploy:

| Variable | Example | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_GA4_ID` | `G-XXXXXXXXXX` | loads GA4 after the page is idle |
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789012345` | loads the Meta Pixel after the page is idle |

Every WhatsApp click and form submit fires GA4 `generate_lead` (with `lead_source`) and Meta `Lead` (with
`content_name`). Mark `generate_lead` as a key event in GA4. Other events: `hero_cta_click`,
`pricing_viewed`, `pricing_cta_click`, `form_submitted`.

## Domain and SEO

- Canonical URLs, the sitemap and schema use `https://www.teamy.in` (override with `NEXT_PUBLIC_SITE_URL`),
  because that's the host Vercel serves: its domain settings 308-redirect `teamy.in` to `www.teamy.in`. A
  canonical must never point at a redirect, so if you ever make the bare domain primary in Vercel, set
  `NEXT_PUBLIC_SITE_URL=https://teamy.in` and change `primaryHost` in `next.config.ts` to match.
- Set `PRIMARY_DOMAIN_LIVE=true` in Vercel: `teamy-blush.vercel.app` then redirects permanently to
  `https://www.teamy.in`, and preview `*.vercel.app` URLs send `X-Robots-Tag: noindex`.
- Every response carries basic security headers (`next.config.ts`): no MIME sniffing, no framing by
  other sites, a strict referrer policy, and camera, microphone and location turned off.
- JSON-LD: Organization (logo, address, contact point, topics), ProfessionalService/LocalBusiness
  (with the service catalogue) and WebSite on the home page; Service or LocalBusiness, BreadcrumbList and
  FAQPage on landing pages. Prices are "from ₹14,999". No ratings or reviews markup (Google ignores
  self-published ratings and can treat them as spam).
- `sitemap.xml` (with lastmod, refreshed on every deploy), `robots.txt`, and `/llms.txt`: a plain
  summary of Teamy for AI search (ChatGPT, Perplexity, Gemini), generated from the content files.
- **Search Console / Bing:** add the verification codes as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and
  `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel, redeploy, verify, then submit
  `https://www.teamy.in/sitemap.xml` in both.

### Off-site SEO (the owner's to-do, biggest wins first)

1. **Google Business Profile** for Teamy at Mehrauli, New Delhi 110030, same name, phone and address as the site;
   ask clients for reviews there, then put the profile link in `facts.reviewsUrl` and `socials`.
2. **"Website by Teamy" footer links** on client sites (with their OK): relevant backlinks from real brands.
3. Listings with the same name, address and phone on Justdial, Sulekha, IndiaMART, Clutch and GoodFirms.
4. Social profiles (Instagram, YouTube, LinkedIn) in `socials`, so they join `sameAs` in the schema.

## Payments (Razorpay)

Brands that have approved their free preview pay for the starter store at **`/checkout`** (send them the
link on WhatsApp; the starter pricing card links to it too). The flow:

1. The form checks their name, brand, email and WhatsApp number; `POST /api/checkout` creates a Razorpay
   order on the server. The amount always comes from `siteConfig.checkout`, never from the browser.
2. Razorpay's own payment window takes the payment (UPI, cards, netbanking). Card and UPI details go to
   Razorpay only.
3. `/checkout/success` checks the payment signature and asks Razorpay to confirm the payment for that
   order and amount before it says "Payment received". It offers a WhatsApp message with the payment ID.
4. The customer's name, brand, email and phone are saved as notes on the order: see them in the Razorpay
   Dashboard → Transactions → Orders. GA4 and Meta get `begin_checkout`/`InitiateCheckout` and
   `purchase`/`Purchase` events.

**Set up (test mode first):**

1. Razorpay Dashboard → switch to **Test Mode** → Account & Settings → API Keys → **Generate Test Key**.
2. Put both in `.env.local` (local) and in Vercel → Settings → Environment Variables:
   `RAZORPAY_KEY_ID=rzp_test_…` and `RAZORPAY_KEY_SECRET=…`. **Never** commit the secret or put it in
   a `NEXT_PUBLIC_` variable. Redeploy after changing them.
3. Pay at `/checkout` with the test card `4100 2800 0000 1007`, any future expiry, any CVV and any 4–10
   digit OTP. With test keys, production hides the pricing-card link, so real visitors never meet a test
   payment; previews and local builds show it.
4. In Account & Settings → Payment Capture, keep **automatic capture** on.

**Going live:** generate **live** keys (Live Mode → API Keys), replace both variables in Vercel, and
redeploy. Before that, fill the `[to be confirmed]` terms in `/terms` and `/refund-policy` (payment
stages, GST, refunds), set `checkout.gstPercent` if GST is added on top, and have a lawyer and your CA
review them. Run `npm test` after any change to `lib/checkout.ts` or `lib/razorpay.ts`.

To test the flow without Razorpay (CI, offline), point `RAZORPAY_API_BASE` at a mock of the Orders and
Payments APIs. Never set it in Vercel.

## Deploy to Vercel

1. Vercel → **Add New → Project → Import** the GitHub repo (framework is auto-detected).
2. Add the environment variables above (all optional; Razorpay's keys turn on payments).
3. Deploy, then add `teamy.in` under **Settings → Domains** and set the DNS records Vercel shows at your registrar.

## Festive themes

The site switches theme automatically by date in India time (Asia/Kolkata):

| Theme | Dates (inclusive, IST) | Look |
| --- | --- | --- |
| Navratri | 2026-10-11 → 2026-10-20 | deep maroon, saffron CTA, rani pink + gold glows, rangoli motif |
| Diwali | 2026-11-06 → 2026-11-11 | midnight navy, warm gold CTA, diya-amber glows, diya motif |
| Default | any other day | near-black, cool neutrals, electric lime |

- **Edit dates/colours:** `config/festive.ts` is the only place. Each festival has `start`, `end`,
  `tokens`, `motif`, optional `heroNote` and `favicon`. CSS for every theme is generated from it.
- **How it resolves:** `lib/festive.ts` picks the first festival whose range contains today's IST date.
  The server sets `<html data-theme>` (page revalidates hourly) and a tiny inline script re-checks on
  the visitor's device before first paint, so a cached page never shows the wrong theme. Malformed
  entries are skipped and anything unexpected falls back to the default theme.
- **Preview:** in `npm run dev`, add `?theme=navratri`, `?theme=diwali` or `?theme=default`. The preview
  code is not included in production builds.
- **Tests:** `npm test` covers first day, last day, day after, and the midnight-IST timezone edge.
- Only colour tokens and motifs change between themes; layout is identical (every theme shows exactly
  one hero note, and dividers are absolutely positioned).

## Design system

Colour tokens are generated from `config/festive.ts` (`DEFAULT_TOKENS` for the base theme) and injected
in `<head>`; `npm test` checks every text/surface pair is WCAG AA in every theme.

| Token | Default | Use |
| --- | --- | --- |
| `--bg` / `--surface` / `--surface-2` | `#0A0B0F` / `#0E1116` / `#151922` | page, cards, cards-on-cards |
| `--text` / `--text-2` / `--text-3` | `#F3F5F8` / `#A7AEBB` / `#7F8796` | primary, secondary, mono labels |
| `--accent` / `--accent-ink` | `#C8F25A` / `#0A0B0F` | the single signal: primary CTA, active states |
| `--hero-a` / `--hero-b` | lime → pale lime | gradient on the one emphasised hero word (gold in festive themes) |
| hairlines | `rgb(var(--text-rgb) / 0.08)` | 1px borders |

Type: Inter Display 300–800 (display, tracking −0.04em, fluid `clamp()` sizes), Inter (body),
JetBrains Mono (labels and numbers). Layout: 1280px container, 12-column grid, 128px / 88px section padding.

## Motion

- **Tokens:** `lib/motion.ts` holds durations (0.4–1.2s), expo/quart easings, staggers and distances.
  They're shared by CSS (as custom properties) and GSAP.
- **Runtime:** `lib/motion-runtime.ts` (GSAP + ScrollTrigger + Lenis). It loads lazily after the page is
  idle, so first paint never waits for it. Until it loads, every section is already in its final state.
- **Signature moments:**
  - **Hero:** the headline wipes up word by word on load (pure CSS). The storefront mockup tilts toward the cursor.
  - **7-day story:** pinned on desktop; each day lights up while its piece of the store builds in. Mobile is a
    plain vertical stack.
  - **Bento:** cursor-following spotlight borders, plus small animated icons on hover, focus and reveal.
  - **Process:** an SVG connector that draws as you scroll.
  - **Pricing:** the price counts up once when it comes into view.
  - **Stats:** numbers count up once (final values are in the HTML).
  - **Works with:** a slow, pausable logo marquee.
  - **Desktop extras:** cursor follower, magnetic primary buttons, light pools that drift with cursor and scroll.
- **Smooth scroll:** Lenis drives smooth scrolling. In-page links use Lenis too, are header-aware, update
  the URL hash and move focus to the target. The mobile menu pauses scrolling while it's open.
- **Loops:** every looping animation pauses when it's offscreen (`[data-loop]` and an IntersectionObserver).
- **Reduced motion:** with `prefers-reduced-motion` there's no smooth scroll, pinning, parallax, cursor,
  marquee or count-up. Everything shows in its final state.

## Performance notes

- GSAP and Lenis aren't in the initial bundle.
- The grain, light pools and festive motifs fade in only after load and idle.
- Headings don't use `text-wrap: balance`: with tight letter-spacing it doubled text layout time.
- Background textures are CSS gradients or a 2KB PNG tile, never SVG filters.
- Measure with PageSpeed Insights on the deployed URL. Local Lighthouse on a slow or busy laptop
  under-reports, and it warns when this happens.

## Fonts

`app/fonts/*.woff2` are self-hosted, subset variable fonts (SIL Open Font License) built with
fontTools: Inter (text, opsz 14), Inter Display (opsz 32, 300–800) and JetBrains Mono (400–500), Latin plus ₹. Google's own "latin" files don't include ₹, so every price
would trigger an extra 84KB download. To rebuild (e.g. to add a character), see
`scripts/build-fonts.py`: `pip install fonttools brotli`, then
`python scripts/build-fonts.py <folder with inter.ttf and mono.ttf>`.

`assets/fonts/*.woff` (static Bricolage) are only used to render the social share image.

## Project map

```
content/site.ts             ← edit me (content, price, contact, WhatsApp, FAQ)
content/projects.ts         ← edit me (clients: logo wall, Shark Tank band, Our work, videos)
content/testimonials.ts     ← edit me (client quotes)
content/pages.ts            ← edit me (service + landing page copy)
config/festive.ts           ← edit me (festival dates, theme colours)
app/                        layout (fonts, SEO), home, services/[slug], landing pages, legal pages,
                            OG images, sitemap, robots, manifest, 404
components/sections/        Header, Hero, ClientLogos, SharkTank, Stats, Work, Videos, Services, Story,
                            Process, Testimonials, Pricing, WorksWith, About, Faq, Contact, Footer,
                            FloatingWhatsApp
components/pages/           LandingTemplate (service + landing pages)
components/seo/             JsonLd
components/mockup/          Storefront (code-built illustrative store used by hero + story)
components/icons/           AnimatedIcons (bento)
components/motion/          MotionRuntime (lazy loader)
components/ui/              Button, Reveal, MaskWords, WhatsAppCTA, Carousel, ClientLogo, PhoneFrame, TodoSlot, BackToTop, icons
components/analytics/       GA4 + Meta Pixel loader
lib/                        whatsapp links, schema, metadata, OG renderer, analytics, festive resolver, motion
public/logos/               "Works with" logos (Simple Icons, CC0)
tests/                      Vitest unit tests
scripts/build-fonts.py      font subsetting
scripts/capture-*.mjs       client screenshots, logos and videos (npm run capture:all)
media/social/               client videos with a Teamy caption, for Reels / Shorts (not deployed)
```
