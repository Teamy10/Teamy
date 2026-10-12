# Teamy: marketing site (teamy.in)

Site for Teamy, a web team in Patel Nagar, New Delhi, that designs and builds custom-coded websites for
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
| Email, address (Patel Nagar, New Delhi), hours | `contact` |
| 450+ projects, 5+ years, 4.9/5 rating, 97% satisfaction, reviews link | `facts` |
| Social links (empty = hidden) | `socials` |
| "Live in X days" for starter stores | `launchDays` constant at the top |
| "We reply within X hours" | `responseHours` |
| Hero headline, sub line, the two client sites shown | `hero` (`showcase` = project slugs) |
| "Idea → live in 7 days" scroll story | `story` |
| "What we build" bento tiles (each links to `/services/<slug>`) | `services` |
| Pricing: starter store ("from ₹8,999"), custom website (quoted), add-ons | `plan`, `customPlan`, `addOns` |
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

- [ ] Fill every `TODO` in `content/site.ts` (full address and PIN, socials, Google reviews link)
- [ ] Add real, approved quotes in `content/testimonials.ts`, and any other clients in `content/projects.ts`
- [ ] Make sure every client in `content/projects.ts` is happy to be shown (logo and site)
- [ ] Confirm everything marked `⚠️ CONFIRM` (opening hours, `launchDays`, `responseHours`, Razorpay/Shiprocket)
- [ ] Upload the assets listed below
- [ ] Fill the `TODO` terms in `/privacy`, `/terms` and `/refund-policy`, then **have a lawyer review all three**
- [ ] Connect `teamy.in` to Vercel, then set `PRIMARY_DOMAIN_LIVE=true` (see "Domain")
- [ ] Festival dates in `config/festive.ts` for each new year

### Optional assets

| File | What |
| --- | --- |
| `public/testimonials/<name>.webp` | square client photos; set `photo` in `content/testimonials.ts` (initials show otherwise) |
| `public/logos/clients/<slug>.webp` | an official logo file, to replace one taken from the client's site |
| `public/logos/upi.svg`, `rupay.svg`, `shiprocket.svg` | official logos (these show as text wordmarks until added; then set `logo` in `integrations`) |

Screenshots, logos and videos of client sites are generated (see "Client assets"). The 7-day story uses
an **invented demo brand** ("kesar threads"), labelled as such. Add only real testimonials, with the
founder's permission. The Shark Tank India band carries a "not affiliated with the show" line; keep it.

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

- Canonical URLs, the sitemap and schema use `https://teamy.in` (override with `NEXT_PUBLIC_SITE_URL`).
- **Once teamy.in points at Vercel**, set `PRIMARY_DOMAIN_LIVE=true`: `teamy-blush.vercel.app` and
  `www.teamy.in` then redirect permanently to `https://teamy.in`, and preview `*.vercel.app` URLs send
  `X-Robots-Tag: noindex`. Leave it unset until then, or the only working URL would redirect to a parked page.
- JSON-LD: Organization, ProfessionalService/LocalBusiness, WebSite on the home page; Service or
  LocalBusiness, BreadcrumbList and FAQPage on landing pages. No ratings or reviews markup.

## Deploy to Vercel

1. Vercel → **Add New → Project → Import** the GitHub repo (framework is auto-detected).
2. Add the environment variables above (all optional).
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
