# Teamy: marketing site (teamy.in)

Site for Teamy, a Jaipur web studio that designs, builds and runs online stores for Indian D2C brands.
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

All copy, prices, numbers, contact details and links live in **`content/site.ts`**. Service and landing
page copy lives in **`content/pages.ts`**.

| What | Key |
| --- | --- |
| WhatsApp number, email, address, hours | `contact` |
| Social links (empty = hidden) | `socials` |
| Prefilled WhatsApp messages | `whatsappMessages` |
| "Live in X days" (used across the site) | `launchDays` constant at the top |
| "We reply within X hours" | `responseHours` |
| Hero headline, sub line, trust ticks | `hero` |
| "Idea → live in 7 days" scroll story | `story` |
| "Why Teamy" benefit cards | `benefits` |
| "What we build" bento tiles (each links to `/services/<slug>`) | `services` |
| The single plan and add-ons | `plan`, `addOns` |
| Process steps | `process` |
| "Stores we've built" (screenshots + videos) | `portfolio` |
| Trust numbers (count up on scroll) | `stats` |
| "Works with" logos (`verified: false` = hidden) | `integrations` |
| About story and team cards | `about` |
| Home FAQ (also emitted as FAQPage schema) | `faqs` |
| Shark Tank India block | `sharkTank` |
| Testimonials (shown only with `permissionGiven: true`) | `testimonials` |

**Placeholders.** Any value starting with `TODO` (or empty) counts as unfilled: it's hidden on the live
site, and in `npm run dev` it shows as a dashed placeholder box so you can see what's missing. On the
legal pages, unfilled terms show as "[to be confirmed]" on the live site.

Festival dates, colours, motifs and greetings live in **`config/festive.ts`** (see "Festive themes").

## Before you go live (checklist)

- [ ] Fill every `TODO` in `content/site.ts` (address, PIN, socials, team, stores launched, haat testimonial)
- [ ] Confirm everything marked `⚠️ CONFIRM` (opening hours, `launchDays`, `responseHours`, Razorpay/Shiprocket)
- [ ] Upload the assets listed below
- [ ] Fill the `TODO` terms in `/privacy`, `/terms` and `/refund-policy`, then **have a lawyer review all three**
- [ ] Connect `teamy.in` to Vercel, then set `PRIMARY_DOMAIN_LIVE=true` (see "Domain")
- [ ] Festival dates in `config/festive.ts` for each new year

### Assets to upload

| File | What |
| --- | --- |
| `public/portfolio/ganges-mobile.webp`, `haat-mobile.webp` | phone screenshots, portrait ~9:19.5 (e.g. 780×1688) |
| `public/videos/ganges.mp4`, `haat.mp4` | 9:16 screen recordings, homepage → product → checkout, ≤ 3 MB each, no audio |
| `public/videos/ganges.webp`, `haat.webp` | poster frames for the videos (same 9:16 size) |
| `public/team/member-1.webp`, `member-2.webp` | square team photos (≥ 400×400) |
| `public/logos/upi.svg`, `rupay.svg`, `shiprocket.svg` | official logos (these show as text wordmarks until added; then set `logo` in `integrations`) |

Missing images show a skeleton; the videos section stays hidden until the files exist.

The hero phone shows an **invented demo brand** ("kesar threads"), labelled as such. Add only real
testimonials, with the founder's permission. The Shark Tank block makes a general claim and carries a
non-affiliation note; don't strengthen it.

## Leads (WhatsApp)

There's no backend. Every CTA is a `wa.me` link built by `buildWhatsAppLink()` in `lib/whatsapp.ts`. The
contact form formats the visitor's details into a WhatsApp message and opens WhatsApp (same tab on
phones, new tab on desktop). Nothing is stored on a server.

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
content/site.ts             ← edit me (content, price, contact, portfolio, FAQ)
content/pages.ts            ← edit me (service + landing page copy)
config/festive.ts           ← edit me (festival dates, theme colours)
app/                        layout (fonts, SEO), home, services/[slug], landing pages, legal pages,
                            OG images, sitemap, robots, manifest, 404
components/sections/        Header, Hero, WorksWith, Stats, Story, Portfolio, Videos, Benefits, Services,
                            Process, SharkTank, Testimonials, Pricing, About, Faq, Contact, Footer,
                            FloatingWhatsApp
components/pages/           LandingTemplate (service + landing pages)
components/seo/             JsonLd
components/mockup/          Storefront (code-built illustrative store used by hero + story)
components/icons/           AnimatedIcons (bento)
components/motion/          MotionRuntime (lazy loader)
components/ui/              Button, Reveal, MaskWords, WhatsAppCTA, PhoneFrame, TodoSlot, BackToTop, icons
components/analytics/       GA4 + Meta Pixel loader
lib/                        whatsapp links, schema, metadata, OG renderer, analytics, festive resolver, motion
public/logos/               "Works with" logos (Simple Icons, CC0)
tests/                      Vitest unit tests
scripts/build-fonts.py      font subsetting
```
