# Changelog

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
