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
| Hero headline lines (`emphasis` = light-weight word, `heroWord` = gradient word), sub line, trust ticks | `hero` |
| "Idea → live in 7 days" scroll story: one entry per day, each building a piece of the mockup | `story` |
| "Why Teamy" benefit cards | `benefits` |
| "What we build" bento tiles (icon, stage, title, line) | `services` |
| The single plan: name, price in ₹ (the only price shown anywhere), features | `plan` |
| Add-ons under the plan (no prices; "we'll quote them") | `addOns` |
| Process steps | `process` |
| Ticker of what Teamy handles (text only) | `marquee` |
| Shark Tank India block (words only; keep claims general and true) | `sharkTank` |
| Testimonials (shown only with `permissionGiven: true`; section hides when empty) | `testimonials` |

Bento icons are picked by name (`storefront`, `checkout`, `whatsapp`, `cart`, `analytics`, `drops`); they're
custom animated SVGs in `components/icons/AnimatedIcons.tsx`.

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
  - **Marquee:** a slow, pausable ticker.
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
site.config.ts              ← edit me (content, price)
config/festive.ts           ← edit me (festival dates, theme colours)
app/                        layout (fonts, SEO), page, /api/lead, OG image, icons, legal pages
components/sections/        Header, Hero, Marquee, Story, Benefits, Services, Process, SharkTank,
                            Testimonials, Pricing, Contact, Footer, MobileCTABar
components/mockup/          Storefront (code-built illustrative store used by hero + story)
components/icons/           AnimatedIcons (bento)
components/motion/          MotionRuntime (lazy loader)
components/ui/              Button, Reveal, MaskWords, SectionHeading, RevealObserver, icons
components/brand/           Logo (+ generated glyph paths)
components/festive/         motifs, festive hero note, ornamental dividers
lib/                        motion tokens + runtime, festive resolver, formatting (₹), leads, analytics
tests/                      Vitest unit tests
scripts/build-fonts.py      font subsetting
```
