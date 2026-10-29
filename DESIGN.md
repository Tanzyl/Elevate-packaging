---
name: Elevate
description: Flexible-packaging manufacturer site — royal-blue ink on a white film substrate, CMYK print accents
colors:
  evergreen: "#1f5f47"
  evergreen-deep: "#1a4c3a"
  copper: "#c56b36"
  press-yellow: "#f4b942"
  press-green: "#2dba7a"
  press-cyan: "#2b8bd6"
  press-magenta: "#d6336c"
  foil-gold: "#d4a73d"
  film-white: "#ffffff"
  section-tint: "#f4f7fc"
  ink-slate: "#0f172a"
  muted-slate: "#475569"
  subtle-slate: "#94a3b8"
  hairline-slate: "#64748b"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Georgia, serif"
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    letterSpacing: "0.35em"
rounded:
  sm: "4px"
  md: "6px"
  xl: "12px"
  pill: "9999px"
spacing:
  container-pad: "clamp(1rem, 3.5vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.evergreen}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.evergreen-deep}"
  button-ghost:
    textColor: "{colors.ink-slate}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  card:
    backgroundColor: "{colors.film-white}"
    rounded: "{rounded.xl}"
  eyebrow-label:
    textColor: "{colors.evergreen}"
    typography: "{typography.label}"
---

# Design System: Elevate

## Overview

**Creative North Star: "Evergreen on White Film"**

The site treats the screen like the company's own product: a run of pristine white packaging film, printed in a single royal-blue ink with the logo's CMYK swoosh appearing only as trace registration hints. Everything sits on white or a barely-blue section tint; color is ink, not paint — applied precisely, never flooded. Metallic and film qualities (foil-shine sweeps, Ken Burns drift, film-flow textures, a 5% grain overlay) supply the "material" feel of flexible packaging without ever darkening the substrate.

Components are **refined and restrained**: type and real photography carry the page, chrome recedes. The incumbent code carries a signature decoration set (corner registration brackets, hover scan-lines on `components/ui/card.tsx`) — treat these as an existing signature to deploy sparingly, not a pattern to escalate. New work should reach for a hairline, a well-set headline, or a photograph before any ornament. Layouts are dense and premium ("royal look" for a group of industries); the client explicitly dislikes blank space.

**Key Characteristics:**
- Locked light/white theme — `:root` and `.dark` are identical by design; no dark mode, ever, without client approval.
- One interactive ink (evergreen); copper and CMYK accents are identity marks, not UI colors.
- Fluid everything: no container max-width, viewport-clamped edge padding, root font-size clamp above 1440px.
- Motion is ambient and compositor-friendly: transform-only loops, Framer Motion reveals with shared easing tokens, full `prefers-reduced-motion` support.

## Colors

A single-ink system on a white substrate, with the logo's CMYK swoosh as trace accents.

### Primary
- **Evergreen** (#1f5f47): the only interactive color — links, CTAs, focus rings, active nav underlines, eyebrows, icon accents. Exposed as the `accent` semantic token (`bg-accent`, `text-accent`). This is the logo wordmark blue.
- **Evergreen Deep** (#1a4c3a): hover/pressed state of Evergreen (`accent-hover`). Never a resting color.

### Secondary
- **Copper** (#c56b36): the logo wordmark red. Identity accent only — logo contexts, rare emphasis marks. Never for buttons, links, or error states at scale.
- **Foil Gold** (#d4a73d): premium accent from the legacy "royal" brief; survives mainly as the `shadow-gold` glow. Use only when a metallic/premium note is explicitly wanted.

### Tertiary
- **Press Cyan / Magenta / Yellow / Green** (#2b8bd6 / #d6336c / #f4b942 / #2dba7a): the CMYK swoosh palette (`print-*` utilities). They appear as sub-3% radial tints in the `.bg-royal` backdrop and occasional categorical marks — decorative registration hints, never structural UI.

### Neutral
- **Film White** (#ffffff): page and card background (`bg`, `card`).
- **Section Tint** (#f4f7fc): alternating section background (`section`) — the only permitted "band" color.
- **Ink Slate** (#0f172a): primary text (`fg`).
- **Muted Slate** (#475569): secondary text (`muted`); **Subtle Slate** (#94a3b8) for tertiary (`subtle`).
- **Hairline Slate** (#64748b): borders, always at 8–15% alpha (`border-line/10`, `/15`) — never opaque.

### Named Rules
**The One Ink Rule.** Evergreen is the only color that means "interactive." If an element is blue, it must do something; if it does something, it is blue. CMYK accents never take on interactive meaning.

**The White Substrate Rule.** Backgrounds are Film White or Section Tint only. No dark sections, no flooded brand-color panels. Style with the semantic tokens (`bg-bg`, `bg-section`, `bg-card`, `text-fg`, `text-muted`, `border-line`, `bg-accent`), never the raw `primary`/`navy` scales.

## Typography

**Display Font:** Plus Jakarta Sans (with Georgia serif fallback) — `font-display`, applied to all h1–h4 with tight tracking (-0.025em)
**Body Font:** DM Sans (with system-ui fallback) — `font-sans`, with `ss01`/`cv11` features enabled

**Character:** Plus Jakarta Sans's geometric, slightly technical curves give headlines a modern-industrial confidence; DM Sans keeps dense spec-sheet content effortlessly legible. The pairing reads "engineered premium," not editorial.

### Hierarchy
- **Display/Headline** (Plus Jakarta Sans, tracking-tight): section and page titles. Sizes are fluid — they scale with the root font-size clamp rather than fixed breakpoint steps.
- **Body** (DM Sans, 1rem base): paragraphs, spec tables, product attributes. Root font-size is 16px up to 1440px viewports, then `clamp(16px, 0.5vw + 8.8px, 22px)`.
- **Eyebrow/Label** (DM Sans, 0.75rem, uppercase, 0.35em tracking, Evergreen): the section kicker pattern (`text-xs uppercase tracking-[0.35em] text-accent`).

### Named Rules
**The Two Faces Rule.** Plus Jakarta Sans and DM Sans are the only typefaces. No third font, no font swap, without client confirmation.

## Layout

Fluid full-width system: the Tailwind container has **no max-width at any breakpoint** (`screens: {}`) and centers with viewport-scaled padding `clamp(1rem, 3.5vw, 5rem)`. Content width derives from the actual screen; type and spacing scale continuously via the root font-size clamp instead of stepping at breakpoints. One custom breakpoint matters: `nav: 1280px` — the full horizontal header nav renders only above it; below, the mobile drawer takes over.

Density is a brand value: tight, premium, minimal blank space. Sections alternate Film White and Section Tint bands. The `.bg-royal` utility (white-to-tint gradient with five sub-7%-alpha CMYK radials) is the hero/feature backdrop; `.grain` adds a 5% fractal-noise overlay for material texture.

## Elevation & Depth

A hybrid, hairline-first system. Separation is achieved primarily with hairline borders (`border-line/10–15`) and the section-tint banding; shadows are tinted glows rather than gray drops. Doctrine (confirmed 2026-08-02): **structural shadows at rest are permitted** where a card genuinely needs lift from a busy background — keep them soft, large-blur, low-alpha. Interactive emphasis still comes from the tinted accent glows.

### Shadow Vocabulary
- **Accent glow** (`box-shadow: 0 4px 24px -6px rgba(30, 60, 139, 0.28)` — `shadow-accent`): primary CTA emphasis.
- **Gold glow** (`box-shadow: 0 4px 24px -6px rgba(212, 167, 61, 0.35)` — `shadow-gold`): rare premium emphasis.
- **Card hover lift** (`0 14px 40px -14px rgb(var(--accent)/0.35)` + `-translate-y-0.5`): interactive card response.

### Named Rules
**The Tinted Shadow Rule.** Shadows carry the ink (blue/gold tint), never neutral black at high alpha. A gray `box-shadow: 0 2px 8px rgba(0,0,0,.2)` is off-brand.

## Shapes

Two form languages, by role: **pills** (9999px) for standalone actions — CTAs, filter chips, nav underline capsules, the WhatsApp/chat FABs — and **soft rectangles** (rounded-xl, 12px) for containers/cards. Form controls inside dense forms use rounded-md (6px). Inputs are an exception to boxes entirely: they are **underline fields** (border-bottom hairline, no enclosure). Decorative geometry comes from print-registration language: 3×3px corner brackets, 1px scan lines, hairline top-highlights.

## Components

### Buttons
- **Shape:** pill (rounded-full), generous padding (px-6 py-3.5)
- **Primary:** Evergreen fill, white text, accent glow shadow; hover shifts to Evergreen Deep with a subtle arrow nudge (`→` translates 0.5px). Wrapped in `Magnetic` for cursor attraction in hero contexts.
- **Ghost/Secondary:** transparent, hairline border (`border-line/15`), `text-fg`; hover swaps border and text to Evergreen.
- **Form submit:** rounded-md variant (contact/RFQ forms), same ink/hover scheme, `disabled:opacity-50`.
- **Focus:** global `:focus-visible` ring — 2px Evergreen at 60%, 2px offset, 4px radius.

### Cards / Containers
- **Corner Style:** rounded-xl (12px)
- **Background:** white gradient wash (`from-card/40 via-card/15 to-transparent`) with backdrop-blur-sm
- **Border:** hairline `border-line/[0.08]`; hover raises to `border-accent/30`
- **Signature:** corner registration brackets (accent at 40%) and, on interactive cards, a scan-line that sweeps the top edge on hover — deploy sparingly per the restrained philosophy
- **Hover:** −0.5px lift + accent-tinted shadow (see Elevation)

### Inputs / Fields
- **Style:** underline only — `border-b border-line/15`, transparent background, no box
- **Focus:** underline shifts to Evergreen (`focus-within:border-accent`)

### Navigation
- Mega-menu header (composed from `lib/mega-nav.ts`); top-level items are links that navigate on click and open panels on hover; current section marked by a 2px Evergreen underline capsule + `aria-current`. Below 1280px: full-screen mobile drawer walking the same tree, locking body scroll.

### Marquees (signature)
- Pure-CSS, transform-only loops (`animate-marquee` 40s for logos, 55s capabilities track, pause on hover). Two content copies, −50% translate. Never rebuild these with JS/rAF.

### Motion grammar
- Import from `components/motion/tokens.ts`: `ease.out [0.22,1,0.36,1]` (default reveals), `ease.inOut [0.65,0,0.35,1]`, durations 0.2–1.1s. Reveals are small y-translates + fades. Ambient loops: Ken Burns 28s, foil-shine sweep 11s. Everything respects `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** style with semantic tokens (`bg-bg`, `bg-section`, `bg-card`, `text-fg`, `text-muted`, `border-line`, `bg-accent`) so values stay swappable.
- **Do** keep all imagery WebP, named `<slug>-NN.webp`, and route video embeds through `components/ui/lite-video.tsx`.
- **Do** import easing/duration from `components/motion/tokens.ts` and reuse `components/motion/*` primitives for reveals.
- **Do** keep layouts dense — the client reads whitespace as emptiness, not luxury.
- **Do** keep ambient animation transform-only so it stays on the GPU compositor.

### Don't:
- **Don't** reintroduce a dark theme, theme toggle, or dark sections — the light lock is a client decision.
- **Don't** use the raw `primary`/`navy`/`gold` Tailwind scales for new UI; they exist for legacy contrast math only.
- **Don't** give Copper or the CMYK accents interactive meaning (One Ink Rule).
- **Don't** add opaque 1px gray borders or neutral black drop shadows; hairlines are alpha'd, shadows are tinted.
- **Don't** add a third typeface or swap Plus Jakarta Sans/DM Sans without client confirmation.
- **Don't** drop a JPG/PNG into `public/images/` — it undoes the ~300MB→17MB optimization win.
