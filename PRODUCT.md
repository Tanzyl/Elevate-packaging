# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Confirmed (2026-08-02): a **broad B2B mix**, not just large-brand procurement —

1. **Procurement / brand managers at consumer food & non-food companies** (US brands, national and regional) evaluating Elevate as a flexible-packaging supplier. They compare technical capability, certifications, and scale, then send an RFQ or WhatsApp inquiry.
2. **SME / local US businesses** buying retail shopping bags and smaller runs — less technical, price- and speed-sensitive, more likely to go straight to WhatsApp.
3. Secondary: **job applicants** (careers) and **existing customers** checking contact/service details.

## Product Purpose

Elevate is a USA-based manufacturer of flexible packaging (pouches, metallized film, holographic film, retail shopping bags, FFS roll stock). The repo was rebranded from a previous-company template on 2026-10-26; company history, leadership and location details are placeholders until the client supplies them. The website's job is to present the company as a modern, credible, innovative group and convert visitor interest into inquiries (RFQ form, contact form, WhatsApp). Success bias is **confirmed as equal weight**: credibility/scale and lead generation both win trade-offs, decided per page.

## Positioning

A modern, capable US flexible-packaging manufacturer. TODO: client copy for positioning claims. Capability differentiators to verify with the client before publishing:

- **In-line metallizer flexo printing**: in-vacuum-metallizer flexo printing (stripe/selective metallization, anti-counterfeiting, ZnS holographic source) at up to 400 m/min.
- **Holography**: in-house holographic film (PET/BOPP/LDPE) for security + shelf appeal.
- Years in operation, scale and mission: TODO: client copy.

## Operating Context

- Buyers evaluate supplier capability: materials/barriers, finishes (shine/matt/metallize), printing (up to 8 colors, rotogravure + flexo), custom features (zipper, spout, vent, tear notch, hermetic seal…), weight capacity, certifications.
- 25 industry verticals (rice, tea/coffee, snacks, frozen food, pet food, cosmetics, …) each with tailored applications — buyers often enter through their industry, not the product taxonomy.
- Inquiry flows deliberately run through a third-party form endpoint and WhatsApp so the deployed site works without a backend (see CLAUDE.md).

## Capabilities and Constraints

- Live site content is code-driven: `website/apps/web/lib/*.ts` fallbacks are the production content; the NestJS/Postgres admin stack is local-only for now.
- Locked stack: Next.js 14 / NestJS / PostgreSQL / JWT / S3-compatible media. Out of scope without change request: native app, payments, advanced analytics, multi-language.
- Phase 3 (not yet built): AI chat (current widget is a keyword bot), 3D product viewer, mockup generator. Keep out of earlier work.
- Deleted-by-decision public pages: Markets, Services, Sustainability — don't re-add or link without approval.
- Performance target ≤3s core page load; the imagery pipeline is WebP-only with a service-worker cache — don't regress it.

## Brand Commitments

- Name: **Elevate** (`elevatepackaging.com`). Palette: evergreen `#1f5f47` + copper `#c56b36` on warm paper `#fbf9f5` (re-themed 2026-10-26). Confirm against the real logo.
- **Light/white theme locked to the logo colors** (supersedes the older navy+gold mood board). "Royal look" reads through the blue accent and dense premium layout. Client prefers tight, dense layouts with minimal blank space.
- Fonts: Plus Jakarta Sans (display) + DM Sans (sans) — chosen per brief; don't swap without confirmation.
- Certifications displayed as **ISO 9001** (no ":2015" — explicit client change), FSSC 22000 (confirm which certifications Elevate actually holds). No partners strip, client-logo strip or testimonials for now: removed in the rebrand until the client supplies real ones.
- Tagline: TODO: client copy (no founding-year or tenure claims until confirmed).

## Evidence on Hand

- Verbatim legacy copy for all products, industries, technologies, about/values, careers: `WEBSITE_CONTENT_INVENTORY.md` (originally scraped 2026-04-18, rebranded 2026-10-26) — product/technical copy is reusable; anything marked `TODO: client copy` needs real Elevate content.
- Certification PDFs referenced at legacy `/cert/*.PDF` belong to the previous company; replace with Elevate certificates.
- Real photography: `website/apps/web/public/images/` (products, industries, certifications; `clients`/`partners` folders hold previous-company logos and are unused after the rebrand) — all WebP.
- **Absent — do not fabricate**: testimonials copy/attribution, leadership photos + bios, company timeline milestones, metallized-film spec sheets, 3D models, company history, client list.

## Product Principles

1. **Prove industrial scale honestly** — real machinery numbers (400 m/min slitting, 8-color printing, 20 kg pouches) beat adjectives; never invent specs or clients.
2. **Two buyers, one site** — technical depth for brand procurement must never bury the fast path (WhatsApp/RFQ) that SME buyers take.
3. **Industry-first navigation** — buyers self-identify by vertical; keep industry entry points as prominent as product taxonomy.
4. **Credibility and conversion carry equal weight** — decide per page which leads, but every page must offer a next step (RFQ, WhatsApp, contact).
5. **Content ships in code** — a change is only real when it lands in `lib/*.ts`; admin edits don't reach production yet.
