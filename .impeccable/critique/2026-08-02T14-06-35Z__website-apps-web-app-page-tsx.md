---
target: homepage
total_score: 24
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 2
timestamp: 2026-08-02T14-06-35Z
slug: website-apps-web-app-page-tsx
---
Method: dual-agent (A: design-review subagent · B: detector subagent)

# Design Critique — Elevate Homepage (`website/apps/web/app/page.tsx`)

> **Note (2026-10-26):** this critique predates the Elevate rebrand. The client-logo wall (`top-clients.tsx`), partners strip and testimonials it discusses were removed in the rebrand, and previous-company names/claims below have been neutralised.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good active-nav/scroll ribbon; hero content fades to invisible mid-scroll (hero.tsx:23) reads as breakage |
| 2 | Match System / Real World | 3 | Industry-first entry matches buyer mental model; jargon ("Four/Quad Side Seal", "FFS") unexplained |
| 3 | User Control and Freedom | 2 | FeatureBadges Framer loop + TechnologyGrid rAF scroller ignore prefers-reduced-motion (JS-driven); badges strip has no pause |
| 4 | Consistency and Standards | 2 | Stats tiles violate White Substrate + One Ink rules (flooded red/green/gold/blue panels, raw scales); CTA shape varies hero vs navbar; h2 scale wanders |
| 5 | Error Prevention | 3 | Little to get wrong; chat send disabled on empty |
| 6 | Recognition Rather Than Recall | 3 | Technology cards clamp copy to 3 lines with no link anywhere — dead end |
| 7 | Flexibility and Efficiency | 3 | Genuinely multi-path: RFQ nav+hero, WhatsApp FAB prefilled, chat quick replies |
| 8 | Aesthetic and Minimalist Design | 2 | Ken Burns + 4 marquees + pulsing dots concurrently = busy, not royal; rainbow stat tiles fight single-ink premium |
| 9 | Error Recovery | n/a | No error states on this surface (forms live on /contact, /rfq) |
| 10 | Help and Documentation | 3 | Chat widget = guided help with WhatsApp fallback; English-only |
| **Total** | | **24/36** | **Acceptable (67%) — just under Good** |

## Design Specificity Verdict

**LLM assessment:** Above template grade, but not fully authored. Real specifics exist — named client roster (since removed in the rebrand), real verticals (pink salt, fertilizer, pet food), a print-registration design language (CMYK scroll ribbon, "/ 01" mono indexes, ink-dot markers), breakpoint-tuned hero crop logic written for one specific photo. But the persuasion layer is swappable: "Trusted by experts. Used by the leaders." could ship on any B2B site, and the two claims no competitor can copy (in-line metallizer flexo printing, in-house holography) drift past in an auto-scrolling marquee clamped to 3 lines instead of being headlined.

**Deterministic scan:** Effectively clean — 1 finding total across the homepage tree: `gradient-text` (warning) at `components/sections/big-marquee.tsx:32`. That file is dead code (no importer anywhere in apps/web), so it never renders on the homepage — a non-finding visually, but it confirms the documented dead-code cluster is still sitting in the tree. The detector caught nothing the review missed; conversely it corroborates that the live homepage code avoids the common slop patterns.

**Visual overlays:** Not available — no dev server running and no browser automation session; CLI scan only.

## Overall Impression

A genuinely crafted page wearing a few off-brand patches, that forgets to close the sale. The chrome, client wall, and hero art direction are authored with real care; the middle drifts (auto-scrolling tech cards, rainbow stats), and the scroll ends on three anonymous partner logos with no conversion prompt. Biggest single opportunity: give the page an ending — and give the SME buyer (half the confirmed audience) anything to click.

## What's Working

1. **The client wall is the credibility engine** — 27 real named clients, uniform logo canvases, seeded shuffle (SSR-safe), GPU-only marquee with hover pause (`top-clients.tsx:16-64`, `ui/marquee.tsx`). Authored, not stocked.
2. **Hero art direction is photo-specific** — `object-position` tuned per breakpoint with commented reasoning so the Ken Burns crop never cuts product (`hero-backdrop.tsx:45-53`).
3. **Print-shop identity in the chrome** — CMYK reading-progress ribbon (`navbar.tsx:206-213`), registration-mark "/ 01" indexes, ink-dot product markers. A packaging printer's language, not a SaaS template's.

## Priority Issues

1. **[P1] The page ends without a conversion moment.** Partners → footer is the final beat; a lead-gen surface ends on the three least recognizable logos, violating the peak-end rule. **Fix:** closing CTA band (RFQ + WhatsApp + repeat "Reply within one business day") after Certifications/Partners. Refs: `app/page.tsx:30-32`, `partners.tsx`. **Command:** /impeccable shape (new section) or /impeccable layout.
2. **[P1] The SME buyer has no homepage path.** PRODUCT.md persona 2 buys retail shopping bags; "bag" appears nowhere clickable — no product tile, no industry tile, and the hero copy ("engineered for the world's leading brands") actively excludes them. **Fix:** add a shopping-bags entry to `featured` (`featured-products.tsx:11-25`) and check the catalog gap in `lib/products.ts` (3 categories, no bags). **Command:** /impeccable shape.
3. **[P2] Stats section breaks the design system it ships with.** Flooded red/green/gold/blue panels, raw `gold-400`/`slate-900`/`print-*` scales as structural UI — violates White Substrate Rule, One Ink Rule, and the no-raw-scales don't. Also "1M+ monthly pouches" and the export-reach stat are not in PRODUCT.md's evidence list — verify before they harden. Refs: `stats.tsx:28-114`. **Command:** /impeccable quieter (scoped to stats).
4. **[P2] Reduced-motion honored inconsistently.** `feature-badges.tsx:18-21` (Framer loop) and `technology-grid.tsx:20-38` (rAF scroller) are JS-driven, so the CSS `prefers-reduced-motion` rule can't stop them — they run forever for vestibular-sensitive users. **Fix:** gate both on `useReducedMotion()`. **Command:** /impeccable harden or /impeccable audit.
5. **[P2] IndustryShowcase forces 5 columns at every width.** `grid-cols-5` with no mobile fallback → ~60px tiles with 10px labels on a 360px phone. **Fix:** `grid-cols-2 sm:grid-cols-3 md:grid-cols-5` or swipe row. Refs: `industry-showcase.tsx:61,82-88`. **Command:** /impeccable adapt.

## Persona Red Flags

**Jordan (first-timer):** hero headline fades out mid-read (looks like a bug); two near-identical FABs (blue chat + green WhatsApp) and the chat bot's fallback is WhatsApp anyway; technology cards look clickable but aren't and truncate mid-sentence; unexplained jargon throughout.

**Casey (distracted mobile):** 5-across industry tiles untappable at ~60px; two stacked 56px FABs permanently cover the bottom-right of a small screen (sections don't compensate; only the footer's `pb-40` does); 11px uppercase badges moving = illegible; hero `text-muted` tagline over a photo with no scrim is a contrast gamble.

**Sam (SME owner, shopping bags, WhatsApp, short on time):** his product is invisible on the page; industry tiles skip retail; WhatsApp prefill is generic; no price/MOQ/turnaround signal; hero copy tells him this site is not for him; chat is English-only.

## Minor Observations

- "Trusted by" eyebrow + "Trusted by experts." headline — "trusted" twice in 20px (`top-clients.tsx:113,123`).
- Section heading uses random caps (`stats.tsx:226`); hero headline has the same mid-sentence caps issue (`hero.tsx:68`).
- Hero headline and tagline say the same thing twice ("world's leading brands" / "biggest consumer brands").
- Certification cards carry `pdf` paths in data but never render them — free credibility unused (`certifications.tsx` vs `site-config.ts:98`).
- Partners renders logos with no names or context — meaningless to outsiders (`partners.tsx:54-78`).
- `stats.tsx:229` uses raw `<a>` instead of `Link`; mobile menu toggle lacks `aria-expanded` (`navbar.tsx:193-199`); TechnologyGrid drag sets no `touch-action`.
- Dead code still in tree: `big-marquee.tsx` (the detector's only hit), `what-we-make.tsx`, `cmyk-blobs.tsx`, `infinite-slider.tsx`, `shifting-nav.tsx`.

## Questions to Consider

1. Why does the scroll end on the three logos nobody outside the company recognizes, instead of the one action both buyer personas came to take?
2. In-line metallizer flexo printing is the single claim a competitor could not truthfully copy — why does it get three clamped lines drifting past in a marquee while "Quality is always remembered" gets a full section band?
3. If half the audience is an SME buying shopping bags on WhatsApp, where on this entire page does Sam click?
