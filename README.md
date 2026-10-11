# Teamy: marketing site (teamy.in)

One-page site for Teamy, a web studio that designs, builds and runs online stores for D2C brands.
Next.js (App Router) + TypeScript + Tailwind CSS v4, mobile-first, static, deploys to Vercel.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
npm run typecheck
npm run lint         # ESLint (next core-web-vitals + typescript)
npm test             # Vitest: festive date resolution
```

Requires Node 20+.

## Edit content: `site.config.ts`

All copy blocks, prices, numbers and links live in **`site.config.ts`** at the project root.

| What | Key |
| --- | --- |
| WhatsApp number (digits with country code), email | `contact` |
| Prefilled WhatsApp messages | `whatsappMessages` |
| "Live in X days" (used across the page) | `launchDays` constant at the top |
| "We reply within X hours" | `responseHours` |
| Hero rotating headlines (+ highlighted word), timing, sub line, trust ticks | `hero` |
| "Why Teamy" benefit cards | `benefits` |
| "What we build" groups (Launch / Sell / Grow) | `services` |
| The single plan: name, price in ₹ (the only price shown anywhere), features | `plan` |
| Add-ons under the plan (no prices; "we'll quote them") | `addOns` |
| Process steps | `process` |
| Scrolling capabilities strip under the hero | `marquee` |
| Shark Tank India block (words only; keep claims general and true) | `sharkTank` |
| Testimonials (shown only with `permissionGiven: true`; section hides when empty) | `testimonials` |

Icons are picked by name (`rocket`, `cart`, `store`…); the list is `IconName` in the config file and the
mapping is in `components/ui/IconMap.tsx`.

Festival dates, colours, motifs and greetings live in **`config/festive.ts`** (see "Festive themes").

**Founders and other businesses** are intentionally not on the site yet. When you're ready, the
hero headlines and services are plain arrays in the config, so a second audience can be added there.

## Before you go live (checklist)

Everything marked `⚠️ CONFIRM` in `site.config.ts` is a placeholder:

- [ ] `hello@teamy.in` mailbox exists
- [ ] `launchDays` (7) and `responseHours` (4)
- [ ] Festival dates in `config/festive.ts` for each new year
- [ ] Jay Agrawal's testimonial: it was reworded (NeedHelpBuilding → Teamy). Get his OK on the new text, and confirm the 5-star rating and permission
- [ ] Replace the placeholder **Privacy Policy** and **Terms** (`app/privacy`, `app/terms`), marked `[ADD REAL …]`
- [ ] Set `LEAD_WEBHOOK_URL` in Vercel (below). Without it the form shows an error in production rather than silently losing leads.

The hero phone shows an **invented demo brand** ("kesar threads"), labelled as such. Add only real
testimonials, with the founder's permission. The Shark Tank block makes a general claim ("most D2C brands
on the show sell from their own website") and carries a non-affiliation note; don't strengthen it to
"only from their website" — that isn't true.

## Lead capture

The contact form POSTs to `/api/lead` (`app/api/lead/route.ts`). The route validates the data (Indian
mobile, Instagram handle, honeypot for bots) and forwards JSON to `LEAD_WEBHOOK_URL`: a Google Apps
Script web app, a Zapier/Make "catch hook", Formspree, a Slack incoming webhook, etc.

Payload: `{ source, name, brand, whatsapp: "+91…", instagram, submittedAt }`.

In local dev without the variable set, leads are logged to the terminal.

## Analytics

`lib/analytics.ts` exposes `track(event, params)`. Events: `hero_cta_click`, `whatsapp_click` (with
`section`), `pricing_viewed`, `pricing_cta_click`, `form_submitted`. They go to
`window.dataLayer`, `gtag` and `fbq` when present, so adding a GA4 / GTM / Meta Pixel snippet to
`app/layout.tsx` is enough.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Vercel → **Add New → Project → Import** the repo (framework is auto-detected).
3. Add the environment variable `LEAD_WEBHOOK_URL`.
4. Deploy, then add `teamy.in` under **Settings → Domains**.

## Festive themes

The site switches theme automatically by date in India time (Asia/Kolkata):

| Theme | Dates (inclusive, IST) | Look |
| --- | --- | --- |
| Navratri | 2026-10-11 → 2026-10-20 | deep maroon, saffron CTA, rani pink + gold glows, rangoli motif |
| Diwali | 2026-11-06 → 2026-11-11 | midnight navy, warm gold CTA, diya-amber glows, diya motif |
| Default | any other day | Midnight & Lime |

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

Base theme (Midnight & Lime), defined as CSS variables (generated from `config/festive.ts`, with
fallbacks in `app/globals.css`):

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#F6F6F1` | page background |
| `--ink` / `--night` | `#0E1726` | text, dark bands (hero, process, footer) |
| `--ink-soft` | `#4A5568` | secondary text (6.8:1) |
| `--on-night-soft` | `#A8B3C7` | secondary text on dark (7.7:1) |
| `--accent` | `#C8F25A` | lime: CTAs (always navy text, 13.9:1) and highlights on dark |
| `--support` | `#3B5BDB` | links and focus rings on light (5.7:1) |

Type: Inter Display (headlines) + Inter (body). Logo: `public/logo.svg` (dark) and
`public/logo-light.svg`, generated as vector paths; favicons `app/icon.svg` and
`public/favicon-{navratri,diwali}.svg` (swapped automatically).

## Motion

- Hero: drifting aurora background, word-by-word rotating headlines with a shimmering highlight
  (pause on hover/focus, plus a pause button for WCAG 2.2.2), floating cards, and a 3D tilt on the phone
  that follows the cursor (desktop).
- Lime marquee of capabilities (pauses on hover).
- Section headings reveal word by word; benefit cards are a bento grid with mini visuals that pop in.
- Services are sticky stacking cards (pure CSS `position: sticky`).
- The pricing card and testimonial have a rotating gradient border; the price counts up when it appears.
- Cards get a cursor spotlight; buttons have a light sheen; a gradient scroll-progress bar sits at the
  top and the process line draws as you scroll (scroll-driven CSS, where supported).
- Decorative motion and the big glow layers start only after the page has loaded and gone idle.
- `prefers-reduced-motion` removes all movement; content still appears instantly.
- No animation library: CSS transforms/opacity plus two tiny scripts (`components/ui/InteractionFX.tsx`
  for spotlight + tilt, `CountUp.tsx`).

## Performance notes

- Off-screen sections use `content-visibility: auto`.
- Headings don't use `text-wrap: balance`; with tight letter-spacing it doubled text layout time.
- Background textures are CSS gradients only (no SVG filters, which delay first paint).
- Measure with PageSpeed Insights on the deployed URL. Local Lighthouse on a slow or busy laptop
  under-reports (it warns about this), and localhost hides real network timing.

## Fonts

`app/fonts/*.woff2` are self-hosted, subset variable fonts (SIL Open Font License) built with
fontTools: Inter (text, opsz 14) and Inter Display (opsz 32), Latin plus ₹, weight axis only. Google's own "latin" files don't include ₹, so every price
would trigger an extra 84KB download. To rebuild (e.g. to add a character), see
`scripts/build-fonts.py`: `pip install fonttools brotli`, then
`python scripts/build-fonts.py <folder with inter.ttf>`.

`assets/fonts/*.woff` (static Bricolage) are only used to render the social share image.

## Project map

```
site.config.ts              ← edit me (content, price)
config/festive.ts           ← edit me (festival dates, theme colours)
app/                        layout (fonts, SEO), page, /api/lead, OG image, icons, legal pages
components/sections/        Header, Hero (+ HeroHeadline, PhoneMockup), Marquee, Benefits, Services,
                            SharkTank, Testimonials, Pricing, Process, Contact, Footer, MobileCTABar
components/ui/              Button, Reveal, SectionHeading (+ SplitWords), IconMap, InteractionFX,
                            CountUp, icons, confetti
components/brand/           Logo (+ generated glyph paths)
components/festive/         motifs, festive hero note, ornamental dividers
lib/                        festive resolver, formatting (₹), leads, analytics, WhatsApp links
tests/                      Vitest unit tests
scripts/build-fonts.py      font subsetting
```
