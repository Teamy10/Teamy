# Changelog

## world-class-redesign (2026-10-11)

Concept: **"The storefront that launches itself."** A cinematic, near-black site where the visitor watches
a store go from idea to live in 7 days.

### Information architecture

1. **Hero:** kinetic headline and the tilted storefront.
2. **Marquee:** a ticker of what Teamy handles.
3. **Idea → live in 7 days:** the pinned scroll story.
4. **Why Teamy.**
5. **Services:** the bento grid.
6. **Process.**
7. **Shark Tank India:** the questions every Shark asks.
8. **Testimonial:** real, with permission.
9. **Pricing:** one ₹8,999 card.
10. **Contact.**
11. **Footer.**

### Design system

- **Colour:** a near-black base (`#0A0B0F` / `#0E1116` / `#151922`), a cool neutral text ramp
  (`#F3F5F8` / `#A7AEBB` / `#7F8796`) and one lime signal (`#C8F25A`). Lime is used only for CTAs, active
  states and tiny markers, never as a background wash. The tokens live in `config/festive.ts`
  (`DEFAULT_TOKENS`), and `npm test` fails if any text/surface pair in any theme drops below WCAG AA.
- **Type:**
  - Inter Display 300–800 for display, at very large fluid sizes with −0.04 to −0.045em tracking. One
    word per hero line is set in the light 300 weight, and one word gets the gradient.
  - Inter for body text.
  - JetBrains Mono for small labels and numbers.

  All three are self-hosted subsets that include ₹. Display and body fonts are preloaded, with
  size-matched fallbacks so the swap doesn't shift layout.
- **Texture:** a film grain overlay (2KB tile, jittered 6 frames a second), 1px hairlines at 8–16%
  opacity, and two soft light pools that drift with cursor and scroll.
- **Layout:** a 1280px container on a 12-column grid, with 128px desktop and 88px mobile section padding.
- **Buttons:**
  - Primary: lime fill with magnetic hover.
  - Secondary: outline.
  - Ghost: text with an animated underline.

  All three share the same focus ring and active state.
- **Imagery:** none from stock. The storefront (product cards, a checkout sheet with UPI/Cards/COD toggles,
  a WhatsApp order bubble, an analytics + Pixel card, a drop/waitlist card) is built in code
  (`components/mockup/Storefront.tsx`) for an invented brand, and it's labelled "Illustrative · invented
  brand" everywhere it appears. The analytics card shows a shape, not numbers.

### Motion system

- **Tokens:** `lib/motion.ts` has the durations (0.4 / 0.7 / 1.0 / 1.2s), easings (expo-out,
  quart-out, expo-in-out), staggers (60ms between words, 80ms between items) and distances (24px rise,
  8° tilt, 10px magnet). CSS gets the same values as custom properties, so CSS transitions and GSAP
  timelines always match.
- **Library:** GSAP + ScrollTrigger, with Lenis for smooth scroll. It all lives in `lib/motion-runtime.ts`
  and loads on first interaction or when the story comes within a screen of the viewport, so it's never in
  the initial bundle.
- **Without JS:** headings use CSS masked word reveals and body copy uses CSS fade-up (via one shared
  IntersectionObserver), so neither waits for JavaScript. The hero headline plays on load with pure CSS.
- **Rules:**
  - Only transform and opacity are animated.
  - Every loop (marquee, order toast, grain, motifs) pauses offscreen.
  - Anchor links go through Lenis: they're header-aware, update the hash and move focus. The mobile menu
    pauses Lenis while it's open.
- **Reduced motion:** no Lenis, pinning, parallax, cursor follower, magnetic buttons, marquee or count-up.
  Every element shows in its final state.

### Motion note: the 7-day scroll story

- **Desktop (≥1024px, motion allowed):**
  - The stage pins for about 3.9 viewports of scroll (0.55 viewport per day) and scrubs with 0.6s
    smoothing.
  - The lime rail grows down the day list as you scroll. The current day turns lime, finished days stay
    full colour and upcoming days dim to the tertiary colour, which is still AA.
  - Each day's piece of the storefront rises in (24px, quart-out): the skeleton becomes the store, then
    checkout, the WhatsApp bubble, analytics + Pixel, the drop card and finally the "Live" badge.
  - Day 1's domain bar is part of the starting frame.
- **Mobile, reduced motion, or before the runtime loads:** the same content as a clean vertical stack,
  with every piece visible.

### Signature moments (all built)

- **Hero:**
  - Masked word-by-word headline.
  - 3D-tilted storefront with cursor parallax across depth layers.
  - A looping, clearly decorative "Order placed" toast.
- **Pinned 7-day story:** as described above.
- **Services bento:** cursor-following spotlight borders, plus six custom animated SVG icons that play on
  reveal, hover and keyboard focus.
- **Process:** an SVG connector that draws as you scroll. Steps light up as they enter.
- **Pricing:** one centred ₹8,999 card. The price counts up once, the full checklist reveals in a
  stagger, and there's one primary CTA.
- **Marquee:** a slow, pausable, text-only ticker with a visible pause button.
- **Cursor follower:** desktop only. It never appears on touch devices or with reduced motion.

### Content changes

- **Pills and badges:** all removed, including "Web studio for D2C brands", the D1–D6 / "Live 🚀" row,
  "For D2C brands", "Seen on Shark Tank India?", "Founders on Teamy", "How it works", "Let's talk",
  "Recommended" and the "Why Teamy" / "Pricing" eyebrows. The small mono labels that remain are content:
  day numbers, step numbers, stage names and captions.
- **Pricing:** one plan, ₹8,999 one-time. There's no ₹20,999 and no Launch/Growth tiers anywhere: page,
  metadata, terms or structured data. The JSON-LD has a single `Offer`.
- **Socials:** no Instagram or LinkedIn links anywhere, including JSON-LD `sameAs`.
- **Services:** the three old service groups are now six bento tiles covering every item they listed.
- **Hero:** the headline uses the existing line "Stores that sell while you sleep.", split into two lines
  with "sell" as the gradient word. The rotating headline set was removed: it fought the kinetic reveal.
- **Fix:** the JSON-LD `<` escape was a no-op (the replacement string evaluated back to `<`). It now
  emits a real `<` escape.

### Festival config

- **File:** `config/festive.ts` is the only place to edit dates, colour tokens, motif, greeting and
  favicon. CSS is generated from it, and the server sets `<html data-theme>` (hourly ISR). An inline boot
  script re-checks the date in Asia/Kolkata time before first paint.
- **Editing dates:** change `start` / `end` (`YYYY-MM-DD`, IST, inclusive) and add a boundary test in
  `tests/festive.test.ts`.
- **Adding a festival:** add an entry with an `id`, its tokens (the AA test covers it automatically), a
  `motif` (`rangoli` or `diya`) and an optional `heroNote` and `favicon`.
- **Preview:** in `npm run dev`, open `/?theme=navratri`, `/?theme=diwali` or `/?theme=default`. It's
  compiled only into development builds; I checked that production HTML has no preview code.
- **Look:** festive themes change only tokens and motifs. They get a gold gradient on the hero word only,
  a thin ornamental divider on section edges, a soft rangoli (Navratri) or diya (Diwali) accent in the
  hero, a one-line greeting, and a matching favicon. There's no confetti and no loud animation.

### Festival dates

| Festival | Brief | Used | Note |
| --- | --- | --- | --- |
| Navratri | 2026-10-11 → 2026-10-20 | 2026-10-11 → 2026-10-20 | Ghatasthapana on 11 Oct is confirmed on Drik Panchang. Vijayadashami on 20 Oct comes from news calendars; I couldn't load Drik Panchang's Dussehra page to confirm it. |
| Diwali | 2026-11-06 → 2026-11-10 | **2026-11-06 → 2026-11-11** | Drik Panchang (New Delhi) lists **Bhai Dooj on 11 Nov**, so the end date moves one day later. |

Today (11 Oct 2026) is inside Navratri, so production currently renders the Navratri theme.

### Quality results (production build, this machine)

- **Responsive:** no horizontal scroll and no clipped text at 360, 390, 768, 1024, 1440 and 1920px in
  every theme. The only overlap the checker found was the marquee's pause button, which now has its own
  column.
- **axe:** 0 violations at 1440 and 390px (`reports/axe-1440.json`, `reports/axe-390.json`). Where axe
  can't compute contrast over gradients and grain, I measured against the rendered pixels in all three
  themes: 252–271 text runs per page, 0 below AA.
- **Lighthouse mobile** (`reports/lighthouse-*.report.html`):
  - Accessibility, Best Practices and SEO are 100, and CLS is 0.
  - **Performance is below the 90 target: 86 calibrated and 65 at default throttling.** Lighthouse flags
    this laptop's CPU as slower than it expects (benchmark index 470–735). The limit is LCP render delay
    of about 3.4s, which is main-thread style and layout under 4× CPU throttling. Confirm on a Vercel
    preview with PageSpeed Insights.
- **Keyboard:**
  - The skip link comes first, and the tab order is logical.
  - The mobile menu traps focus, Escape closes it and focus returns to the menu button.
  - Bento tiles are focusable and get the same spotlight as hover.
- **Code checks:** build, `tsc`, `eslint` and `vitest` (19 tests: date boundaries, midnight IST, AA
  contrast per theme) all pass. There are no console errors or hydration warnings.

### Screenshots

- Before: `docs/screenshots/world-class/before/default/` (every section) and
  `docs/screenshots/world-class/before/{navratri,diwali}/` (hero, pricing, footer). Each is at 1440 and
  390px.
- After: `docs/screenshots/world-class/after/{default,navratri,diwali}/` (hero, 7-day story, services,
  pricing, footer), each at 1440 and 390px.

### Assumptions and trade-offs

- **Diwali end date:** 11 Nov instead of 10 Nov (see above).
- **Copy kept as-is:** the hero sub line and trust ticks; the benefits; the process steps; the Shark Tank
  block (it keeps its general, true claim and non-affiliation note); Jay Agrawal's testimonial (his
  approval of the reworded text is still pending); the contact copy; and the plan name and features.
- **New copy:**
  - The 7-day story's title, sub line and seven day lines. They describe the existing service, not
    promises of exact days.
  - The six bento tile lines, which regroup the existing service items.
  - "See the 7-day plan" (the hero's secondary CTA).
  - The footer line "Designed, built and run in India".
- **Add-ons:** shown as a single quiet line under the pricing card, still with no prices.
- **Performance trade-off:** the cinematic layer (Lenis, ScrollTrigger pinning, cursor, tilt) costs
  about 51KB gz. It loads on first interaction, or when the story is near the viewport, so it never
  blocks first paint. On desktop the story is close enough to the hero that it usually loads right away.
- **Story days:** the pin is desktop-only by design. On phones, pinned scrubbing fights the browser's own
  scroll behaviour, so mobile gets the clean vertical stack.

## premium-redesign-festive (2026-10-11)

### Summary

- **No more pills or badges.** Removed every eyebrow pill ("Web studio for D2C brands", "For D2C brands",
  "Seen on Shark Tank India?", "Founders on Teamy", "How it works", "Let's talk", "Why Teamy", "Pricing"),
  the D1–D7 / "Live 🚀" row, and the "Recommended" badge. Benefit chip clusters became list tiles. Section
  headings carry the context on their own.
- **One plan, one price: ₹8,999 one-time.** The two cards are merged into one card that lists every
  feature from both old plans, de-duplicated. ₹20,999 and all Launch/Growth tier copy are gone from the
  page, metadata, structured data (a single `Offer`), the terms placeholder and the contact form (which no
  longer asks for a plan). One primary CTA: "Book a free call" (WhatsApp, same as the hero), plus a quiet
  "Or send us your details" link to the form.
- **Festive themes by date (Asia/Kolkata).** Navratri and Diwali themes switch on automatically, with
  a premium default otherwise. Only colour tokens and motifs change, never layout.
- **Premium redesign.** Inter Display headlines and Inter body, a fluid type scale, a 1240px container
  with a 12-column grid, layered surfaces (1px inner highlights, soft shadows, fine grain on dark bands),
  a full set of button variants, and a rebuilt balanced footer.
- **Footer and socials.** Instagram and LinkedIn are removed from the footer, config, icons and JSON-LD
  `sameAs`.
- **Tooling.** ESLint (`npm run lint`), Vitest (`npm test`), and updated title, description and share image.

### Festival config: where and how

- **File:** `config/festive.ts` is the single place for dates, colours, motif, greeting and favicon.
- **Add or edit a festival:** add an object to `FESTIVALS` with:
  - `id` (lowercase, used in `data-theme` and `?theme=`)
  - `name`
  - `start` and `end` (`YYYY-MM-DD`, IST, inclusive)
  - `tokens` (colours; keep text pairs at WCAG AA)
  - `motif` (`"rangoli"` or `"diya"`)
  - optional `heroNote` (about the length of `DEFAULT_HERO_NOTE`, so the hero keeps its height)
  - optional `favicon` in `/public`

  CSS is generated from this file automatically. If ranges overlap, the first one listed wins.
- **Next year:** update `start`/`end` from Drik Panchang and add a test case in `tests/festive.test.ts`.
- **Preview:** run `npm run dev` and open `/?theme=navratri`, `/?theme=diwali` or `/?theme=default`.
  The override is compiled only into development builds (`NODE_ENV !== "production"`), so it can't be
  triggered on the live site. I verified that a production build ignores `?theme=`.
- **Fallback:** a missing config, malformed entries, or any date outside every range give the default
  theme. The inline boot script is wrapped in try/catch, and without JS the server-rendered theme
  (revalidated hourly) still applies.

### Festival dates: verification

| Festival | Brief | Used | Source |
| --- | --- | --- | --- |
| Navratri | 2026-10-11 → 2026-10-20 | **2026-10-11 → 2026-10-20** | Ghatasthapana on Sun 11 Oct confirmed on drikpanchang.com. Vijayadashami on Tue 20 Oct per IBTimes / Indian Eagle; I couldn't load Drik Panchang's Dussehra page to confirm it. |
| Diwali | 2026-11-06 → 2026-11-10 | **2026-11-06 → 2026-11-11** | drikpanchang.com (New Delhi) lists Dhanteras on 6 Nov, Lakshmi Puja on 8 Nov, Govardhan Puja on 10 Nov and **Bhai Dooj on 11 Nov**, so the end date moves one day later. |

Today (11 Oct 2026) falls inside Navratri, so the Navratri theme is what visitors will see as soon as
this ships.

### Quality checks (run on this branch)

- **Responsive:** 360, 390, 768, 1024, 1440 and 1920px have no horizontal scroll and no overflowing
  elements.
- **Accessibility:** axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices) reports 0 violations at
  1440 and 390px. axe couldn't compute contrast for 159 text runs over gradients, so I measured them
  against the real rendered pixels in all three themes: about 200 text runs per page, 0 below AA. Lighthouse
  Accessibility is 100.
- **Lighthouse (mobile):** Best Practices 100, SEO 100, CLS 0.
- **Lighthouse Performance: not confirmed ≥ 90 on this machine.** It scored 63–74 with default settings
  and 82–88 with CPU throttling calibrated for this laptop. Lighthouse warns that this CPU is slower than it
  expects: its benchmark index varied from 517 to 736 between runs, against roughly 1000+ on a typical dev
  machine. In plain cold-browser runs the page paints in about 0.7–1.0s. Please confirm on a Vercel preview
  with PageSpeed Insights.
- **Code checks:** the build passes, as do `tsc --noEmit`, `eslint .` and `vitest run` (13 tests). There are
  no console errors and no hydration warnings in dev or production.

### Screenshots

- Before: `docs/screenshots/before/` (hero, pricing, footer and every other section, at desktop and
  mobile).
- After: `docs/screenshots/after/{default,navratri,diwali}/` (hero, pricing and footer, at desktop and
  mobile).

### Assumptions and judgement calls

- **Feature merge:** the plan lists nine features in build order:
  1. Tech end to end
  2. Storefront on your domain
  3. Checkout
  4. WhatsApp updates
  5. COD confirmation + abandoned-cart nudges
  6. Analytics + Meta Pixel
  7. Drops, waitlists and reorders
  8. Priority WhatsApp support
  9. Live in 7 days

  "Everything in Launch" was dropped as redundant.
- **Plan name and pitch:** "Everything you need to launch and grow" / "One price, one team, every
  feature." These are new lines; please review them.
- **Add-ons:** kept, with no prices shown, so ₹8,999 stays the only price on the site. The copy changed
  to "We'll quote them for your brand".
- **"Launch / Sell / Grow"** in Services are stages of the build, not pricing tiers, so they stay.
- **Instagram in the contact form:** the optional "Instagram handle" field asks for the customer's own
  handle. It isn't a Teamy social link, so it stays.
- **Default hero note:** "Free call and a free store preview before you pay anything." This is new. It
  keeps the hero the same height in every theme, and it restates the existing process steps (free call,
  free preview).
- **Kept copy:** hero headlines, sub line and trust ticks; benefits; services; Shark Tank block;
  testimonial; process; contact. The only heading I changed is Pricing, which is now "One plan. One price.
  Everything included." (the old one said "Two plans").
- **Fonts:** Inter Display is Inter at its display optical size (opsz 32), self-hosted as a subset with ₹.
  The wordmark stays Bricolage (vector paths), and the share image still renders in Bricolage.
- **Branch:** not pushed and not deployed. Pushing this branch would create a Vercel *preview*
  deployment, not production.
