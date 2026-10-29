# Elevate — Website Content Inventory & Rebuild Checklist

Content inventory for **Elevate** (`elevatepackaging.com`), a USA-based flexible packaging manufacturer. This file was originally scraped (2026-04-18) from the template's previous-company site and **rebranded on 2026-10-26**: product, technology and industry copy is kept as reusable boilerplate, while company history, contact details and other company-specific facts are placeholders marked `TODO: client copy` until the client supplies real content. Merged with feature requirements from `MASTER_REQUIREMENTS_DOCUMENT.md` and design/motion references from `Animation.docx`. Target audience/market: USA.

> **Rebrand removals (2026-10-26):** the home-page client-logo strip ("Top Clients"), the partners strip, and testimonials were removed from the site (they named the previous company's clients/partners). Don't restore them until the client supplies real logos and quotes.

---

## 1. Global / Header / Footer

### Brand
- **Name**: Elevate
- **Founded / years in operation**: *TODO: client copy*
- **Tagline (hero)**: "Flexible packaging, engineered in the USA." *TODO: client copy*
- **Eco sub-brand line**: "Elevate presents — Eco-friendly Bags — with Sustainable Quality." *TODO: client copy*
- **Leadership**: *TODO: client copy*
- **Positioning**: USA-based flexible packaging manufacturer serving brands in food and non-food consumer industries. *TODO: client copy*

### Contact (appears in header, footer, and Contact page)
*(All placeholders — replace with real details from the client.)*
- **Phone**: +1 (555) 010-0100
- **Email (general/inquiries)**: info@elevatepackaging.com
- **Email (careers)**: careers@elevatepackaging.com
- **Head office**: 123 Industrial Way, Suite 100, Anytown, ST 00000, USA
- **Social**: *TODO: client copy* (no social accounts confirmed yet)

### Key-feature badges (currently rotating strip on home)
1. SOLAR & WIND ENERGY SOLUTIONS
2. HIGH QUALITY RAW MATERIAL
3. QUALITY CERTIFIED BY AUTHORITIES
4. SUPPORT BY PROFESSIONALS

*(Confirm each badge claim with the client before launch.)*

### Certifications
- *TODO: client copy* — confirm which certifications Elevate actually holds (e.g. ISO 9001, FSSC 22000, SQF/BRCGS, FDA-registered facility) and supply badge artwork + certificate PDFs.
- Display convention carried over from the template: show "ISO 9001" without the year suffix.
- The certification badges currently in `site-config.ts` came from the previous company; replace them once real certificates are supplied.

### Partners
- **Removed in the rebrand (2026-10-26).** The partners strip named the previous company's sister businesses. Re-add only if the client supplies real partner logos.

### Footer / legal
- "© ELEVATE — ALL RIGHTS RESERVED."

---

## 2. New-Site Sitemap (merges legacy + required-doc modules)

```
Home
About Us
  ├─ Company Profile
  ├─ Vision & Mission
  ├─ Core Values
  ├─ Leadership / Team            [NEW — from requirements doc]
  ├─ Timeline / History           [NEW — from requirements doc]
  └─ Why Choose Us                [NEW — from requirements doc]
Innovations                        [NEW section — replaces legacy "Technology" pages]
  ├─ Innovations listing
  └─ Innovation detail (per item)
Products
  ├─ Metallized Film  (5 items)
  ├─ Pouches          (6 items)   ← add "Spout Pouch" found on category page but missing from nav
  ├─ Holographic Film / Holography  (3 items)
  ├─ Retail Plastic Shopping Bags       (2 items)
  └─ Rolls            (1 item)
Markets  (17 industry pages — content already exists)
Services
  ├─ Quality Services
  └─ Pre-Press & Graphics Services
Mockup Generator                   [NEW — Phase 3]
Blog / News & Insights             [NEW — Phase 2]
Gallery                            [NEW — Phase 2]
Testimonials                       [NEW — Phase 2]
Careers
Contact
```

Legacy URL patterns (`pages.php?pid=…`, `products.php?cid=…`, `productdetail.php?ppid=…`) should **301 → new SEO-friendly slugs** (e.g., `/products/pouches/stand-up-pouch`). Preserve mapping so inbound links / Google rankings aren't lost.

---

## 3. Home Page

Block order (merging legacy home + requirements doc §5.1 and PRD):

| # | Block | Source of content | Animation ref |
|---|-------|-------------------|---------------|
| 1 | Hero with rotating headline / CTA | Rebuild — use brand statement + primary CTA "Request a Quote" / secondary "Explore Products" | `demo2.themelexus.com/bocpak/home-4` (left-top 3D element) |
| 2 | Key-feature badge strip | Reuse 5 badges from §1 | subtle marquee |
| 3 | Intro tagline | *TODO: client copy* | — |
| 4 | Innovation Highlights (3–5) | NEW — populate from Innovations module | cards fade/slide |
| 5 | Featured Product with 3D animation view | pick 1 flagship product (recommend Stand-Up Pouch or Selective Metallization) | `printspace.harutheme.com/packaging` |
| 6 | Our Capabilities (the 6 cards) | Verbatim copy below — image-on-top cards in a slow auto-sliding marquee (pauses on hover); body clamped to 2 lines | auto-sliding marquee |
| 7 | Featured Flexible Packaging Solutions (8-product grid) | Verbatim list below | hover lift |
| 8 | ~~Testimonials carousel~~ | Removed in the rebrand (2026-10-26) — admin testimonials module retained for future use | — |
| 9 | News / Blog teaser | NEW — Phase 2 | — |
| 10 | ~~Top clients / partner logos~~ | Removed in the rebrand (2026-10-26) — re-add only with real Elevate client/partner logos | `prinoz-next.vercel.app/home-2` |
| 11 | Contact CTA + persistent WhatsApp button | — | — |

### Home "Technologies" cards — verbatim copy

- **Hi Speed Extrusion** — "Our state of the art extrusion technology and equipment allows us to produce multi-layered films of the highest quality, durability and strength. This, in combination with our expertise and experience, allow us to produce innovative products that are tailored to our customer's needs."
- **Hi Speed & Quality Printing** — "Our high tech Rotogravure and flexographic printing machines are very high speed and have the capability to transfer the high quality graphics to any film. Our High-tech up to 8 colors Flexographic and Rotogravure printing is: cost effective, high visual impact for shelf products, optimized on flexible material with high fidelity and clarity."
- **Excellent Lamination (Solvent / Solvent Less)** — "Solvent less lamination: where the adhesives used do not contain solvents. Solvent less adhesive generally indicates a specific type of adhesive composed by two components reacting."
- **Speed Slitting** — "Our high speed, hi-tech reel slitting equipment allows us to slit rolls at speeds up to **400 meters per minute** with accuracy per customer-specified width, meters-per-roll, or kg-per-roll."
- **Innovative & Quality Bag Making** — "Our flexible printing circuit's operations and hi-tech bag making equipment is producing a variety of solutions and fulfilling the needs of our clients with eye-catching and diverse range of bags."
- **Highly Technical Metallized Film** — "Elevate produces highly technical metallized film. A plastic film coated on one or both sides with a very thin layer of metal, incorporating the benefits of both metal and plastic films for much more versatility in application."

### Featured Products grid (home)
Four/Quad Side Seal · Centre Seal Pouches · Stand Up Pouch · Retort Pouch · Shaped Pouch · Flat Bottom Box Pouch · Die Cut Handle Plastic Bags · Rigid/Soft Loop Handle Plastic Bags

---

## 4. About Us

### 4.1 Company Profile
> Elevate is a USA-based manufacturer of flexible packaging, serving brands across a range of consumer food and non-food industries. *TODO: client copy*

### 4.2 Vision
> To be the world's best flexible packaging company.

### 4.3 Mission
> Our mission is to get and keep our customers. We are always open and fair in our dealings with customers. We will at all times provide knowledgeable, convenient service and packaging.
>
> Our continuous technological advancement increases our customer satisfaction level and provides them with innovative solutions.
>
> Our goal is to have customers who believe we are the best company to meet their needs.

### 4.4 Core Values (8 pillars — verbatim below)

1. **Teamwork makes the dream work** — Listening to and respecting each other whilst working together to achieve mutually beneficial results. Providing support, cooperating, respecting views, making the work environment fun and enjoyable. *(Bullets: coaching/mentoring, pursuing learning, expressing training needs, gaining development to meet customer needs.)*
2. **Honesty is our policy** — Being open and honest in all dealings, maintaining the highest integrity at all times. *(Bullets: concerns aired constructively with solutions; each person's views respected without interruption.)*
3. **Excellence is our habit** — Always doing what we say we will and striving for excellence and quality in everything we do. *(Bullets: quality delights client within budget; we keep our word unless renegotiated.)*
4. **Commitment to work** — Working with urgency and commitment for individual and company success. *(Bullets: timeframes met unless renegotiated; client needs met within budget regardless of personal wants.)*
5. **Ownership** — Taking ownership of customers' needs, accountable for delivering friendly, professional service. *(Bullets: each person accountable for repeat business; understand the customer's business; celebrate individual successes.)*
6. **Customer Service** — Timely, responsive, proactive service aiming to delight. *(Bullets: ask customers what we could do better and implement it; verify satisfaction before invoicing; meet all agreements.)*
7. **Professionalism** — Acting with integrity, quality service, reliability, responsibility. *(Bullets: don't upset intentionally; take pride and ownership; never talk about people behind their backs.)*
8. **Personal Development** — Value learning, feedback, coaching and mentoring. *(Same bullets as §1.)*

### 4.5 Leadership / Timeline / Why Choose Us — TODO
From requirements doc §5.12 and PRD:
- Leadership team — **photos + designation + bio needed from client**
- Timeline "how we started / growth journey" — **milestones needed from client**
- Why Choose Us — can assemble from existing copy (tech, innovations, certifications) + new differentiators

---

## 5. Products

All product-detail templates share the same structured attribute set — build one reusable template with these fields:

| Field | Source |
|---|---|
| Overview (prose) | per-product |
| Materials options (high / standard barrier, layers) | common boilerplate |
| Finishes: Shine · Matt · Metallize | common |
| Printing: up to 8 colors, custom designs, in-house team | common |
| Custom features (hermetic seal, zipper, vent hole, hang hole, tear notch, metallized film, multi-layer, security print, spout, handles) | per-product subset |
| Applications | per-product |
| Size/weight/thickness | per-product |
| CTA: Request Quote / WhatsApp | global |
| 3D viewer / gallery | where assets provided |

### 5.1 Metallized Film (scid=1)
Category intro: *Industry-leading producer of metallized film. Plastic film coated on one or both sides with a thin metal layer, vacuum-metallized so aluminum/silver vapor condenses on the film.*

- **Selective Metallization (in-line metallizer flexo)** (ppid=10) — Flexo printing integrated into a vacuum metallizer; transfers metal onto film and prints high-resolution patterns & greyscale images in metallized form. Features: **Innovative Decorative Packaging**, **Stripe Metallization** (un-metallized window for product visibility, drives impulse purchase), **Selective Metallization** (in-register on pre-printed substrates for mixed colored + metallic patterns), **Anti-Counterfeiting** (security threads & holographic foils for banknotes/security), **ZnS (Zinc Sulfide) source** for enhanced-brightness decorative holographic films. Industries: Decorative Printing · Flexible Packaging · Liquid Packaging · Security.
- **Metalized Polyester (MET PET)** (ppid=11)
- **Metalized Cast Polypropylene (MET CPP)** (ppid=12)
- **Metalized Low Density Polyethylene (MET LDPE)** (ppid=21)
- **Metalized Bio-Oriented Polypropylene (MET BOPP)** (ppid=22)

*(Detail pages 11/12/21/22 currently thin on copy — rewrite with technical specs from client.)*

### 5.2 Pouches (scid=Pouches)
- **Four/Quad Side Seal** (ppid=13) — Holds up to **20 kg**; side gusseted for extra branding space. Bottom styles: side gusseted · square bottom · four-side seal · crimp bottom.
- **Centre Seal Pouches** (ppid=14) — Flat bag format with full customization menu.
- **Stand Up Pouch** (ppid=16) — Bottom gusseted / K Seal / DayPack variants. Full feature menu (zipper, vent, hang, tear notch, metallized, multi-layer). Targets snacks, tea/coffee, spices, personal care, agro, household.
- **Retort Pouch** (ppid=17) — Heat-sterilizable; safe for pre-cooked and liquid food; leak-proof.
- **Shaped Pouch** (ppid=18)
- **Spout Pouch** — Appears on category page but **missing from nav** — add to new site.
- **Flat Bottom Box Pouch** (ppid=20) — Side gusseted / flat bottom box / pinch bottom; round corners option.

### 5.3 Holographic Film (scid=4)
Category intro: *Ideal for flexible packaging. Holography is a major deterrent to duplication/counterfeiting. Complex holographic patterns are nearly impossible to reproduce; customized authentication features known only to clients enhance security. Increases product value and shelf visibility.*

Material/Variants: Metallized or Transparent · Substrates: PET · BOPP · PVC · Custom colors · Stock or custom holographic designs.
- **Holo PET** (ppid=27)
- **Holo LDPE** (ppid=28)
- **Holo BOPP** (ppid=26) — "Same usage as other films; holographic effect brings security + amplified shelf appeal." Applications: pouches, gift wrappers, paper lamination, board lamination, carry bags.

### 5.4 Retail Plastic Shopping Bags (scid=3)
Category intro: *Die-cut handle and rigid/soft-loop handle plastic bags, custom printed.* *TODO: client copy*

- **Die Cut Handle Plastic Bags** (ppid=24) — With side and bottom gusseted options. Handle variants: die-cut handle, die-cut patch handle. Finishes: shiny · matte · metallized. Custom size & thickness.
- **Rigid / Soft Loop Handle Plastic Bags** (ppid=25) — Rigid Loop · Soft Loop. Side/bottom gusseted. Metallized + multi-layer film options.

### 5.5 Rolls (scid=5)
- **Form, Fill and Seal Rolls** (ppid=29) — Variety of roll-stock film for all FFS applications. Customized multi-layer roll stock with metallized options. High barrier for oxygen/moisture/aroma. Hi-tech slitting to exact spec.

---

## 6. Industries (formerly "Markets")

> **Nav:** the top-level menu item is **"Industries"** (was "Markets"), linking to a single `/industries` page that lists all 21 industries below; each dropdown item anchors to its section (`/industries#<slug>`). Industry list + copy live in `apps/web/lib/industries.ts`. The legacy `/markets` + `/markets/[slug]` routes still exist but are no longer in the nav.
>
> **21 industries:** Rice · Pink Salt · Snacks & Confectionery · Tissue · Frozen Food · Spices & Pulses · Detergent Powder · Diaper & Sanitary Products · Textile · Sports Products · Fertilizer · Agrochemical & Seed · Tea · Coffee · Grains · Beauty & Cosmetics · Pet Food & Pet Care · Ice Cream · Bakery · Ketchup & Mayonnaise · Dishwashing Products.

The legacy market pages follow a **common attribute block** (Applications · Materials · Finishes: Shine/Matt/Metallize · Printing up to 8 colors · Custom features: hermetic seal/zipper/hanging hole/handle/tear notch/metallized film/multi-layer film/security printing · Weight capacity). Only the **lead copy + applications** differ; they're listed below.

| # | Market | Lead copy (verbatim) | Applications listed |
|---|---|---|---|
| 1 | **Tea & Coffee** | "Tea & coffee packaging pouches are designed to provide secure and vacuum packing." High-barrier material keeps aroma, color, taste; nitrogen flushing extends shelf life. | Tea, Coffee |
| 2 | **Rice** | "We are the pioneers and specialists in Rice bags packaging solutions. Rice is a moisture-sensitive product and our flexible packaging solutions are specially designed for it." Vacuum + nitrogen flushing protects against weevils. | Rice (1/2/5/10/20 kg + custom) |
| 3 | **Snacks** | "Snacks Food Packaging is developed in matching with the packaging demands of the snacks food industry." | Wafers, biscuits, potato chips, cookies, crackers, bread, chips, FMCG |
| 4 | **Grain** | "Grain is one of the popular consumable commodities. In today's competitive arena grain requires appealing consumer packaging." Nitrogen flushing against weevils. | Grains (1/2/5/10/20 kg + custom) |
| 5 | **Dairy** | "Fulfils dairy industry requirements. Protects liquid and semi-liquid dairy items from inside and outside." Hermetic airtight seal prevents oxidation & moisture. | Milk, yogurt, dairy items |
| 6 | **Agrochemical & Seeds** | Tailored to agrochemical & seed industry in multiple styles/finishes. | Agrochemicals, seeds |
| 7 | **Detergent Powder** | "Leakage-proof, highly effective packaging designs grab attention." Cost-effective stand-up pouches; recyclable; space-efficient. | Detergent powder, dish-wash cleaner, liquid detergent, soap bars |
| 8 | **Spices & Pulses** | "Secure packaging preserves natural freshness; resists moisture and dust; protects taste, richness, aroma. Increases product strength and sales." | Salt, sugar, spices, pulses |
| 9 | **Diapers Bags** | "We make diapers bags according to custom requirements." | Diapers |
| 10 | **Sports Products** | For sportswear manufacturers & exporters. | Sportswear, gloves, all sports products |
| 11 | **Tissue** | "Protect tissue with over-wrap plastic and print high-impact graphics for customer attention." Barriers: moisture/oxygen/light/contaminants. | Tissue, wet tissue, towel |
| 12 | **Fresh Produce** | Lightweight multi-layer metallized options maintain freshness. "High clarity will showcase the product inside." | Fruits, vegetables |
| 13 | **Candies** | "Protection, sustainability and appeal for your candy and confection." | Candies, sweets, chocolate |
| 14 | **Garments** | "Garments packaging has major influence on first impression during purchasing." | Shirts, trousers, jeans, socks, gloves, sports goods |
| 15 | **Plastic / Designer Shopping Bags** | Leading manufacturer; serves world-renowned brands; durable. | Retail stores, fashion retail |
| 16 | **Pharmaceutical & Medical** | Evolving demands require sophisticated solutions. Protects from moisture, light, oxygen, contaminants. | Creams, bandages, sachets |
| 17 | **Frozen Foods** | "Specially designed for freezing temperatures; fulfils demands of meat & poultry requiring refrigeration." | Frozen foods, meat, poultry |

---

## 7. Services

### 7.1 Quality Services
> "To deliver quality product on time is our company value, because high service quality promotes customer satisfaction and customer satisfaction generates revenue. **Quality is always remembered.**"

**Prototyping to Commercial Packaging** — Innovation center for new-product creation; analyzes US market trends and displays corresponding packaging solutions.

**Package Prototype Creation Center** — Rapid concept mock-ups for evaluation using available tools/materials. Prototyping options:
- Artist Sketches
- Digital Renderings
- Interactive 3-D Digital Models
- Physical mock-ups

*(Note: this "3-D Digital Models" copy aligns well with the required 3D product viewer and mockup generator modules — cross-link them.)*

### 7.2 Pre-Press & Graphics Services
> "Elevate provides one-stop solutions to our customers."

| Category | Offerings |
|---|---|
| Prepress Services | Artwork manipulation · Photography · Design consulting · E-File transfer · Digital file output |
| Color Management | Press fingerprinting · Print quality analysis · Press-side assistance · Image management · Epson Approval |
| Project Management & Tools | Collaborative · Email notifications · Updated applications · Mac and Windows PC compatibility |

---

## 8. Technology / Innovations (becomes the "Innovations" module on new site)

Seed the Innovations module with these six entries (existing Technology pages):

1. **Hi Speed Extrusion** — Multi-layered films; mono-layer & multi-layer coextruded; high volume; on-time delivery.
2. **Hi Speed & Quality Printing** — Rotogravure + flexographic up to 8 colors; cost-effective; high visual impact; high fidelity.
3. **Excellent Lamination (Solvent / Solvent Less)** — Technical support helps evaluate material options; solvent-based (chemical bonding of webs) + solvent-less (two-component reactive adhesive, no drying needed).
4. **Speed Slitting** — Up to **400 m/min**; custom width · meters-per-roll · kg-per-roll; high volume; cost-effective.
5. **Innovative & Quality Bag Making** — Customized · extensive range · speedy solutions.
6. **Highly Technical Metallized Films** — In-line metallizer flexo printing for faster/more accurate metal-on-film printing up to 400 m/min; supports creative high-res patterns & greyscale; produces holographic films for security/protection. Industries served: Decorative Printing · Packaging (Flexible / Liquid) · Security Applications. Metallized expertise set: Selective Metallization · MET PET · MET PE · MET CPP · MET BOPP · Holography.

---

## 9. Careers

### Headings
- **Careers** / "Vacant Positions"

### Current roles (admin should CRUD in new CMS)
*TODO: client copy* — the previous company's openings were removed in the rebrand; list real Elevate roles here.

### Applications
> Email your resume at **careers@elevatepackaging.com** with the subject of the related job.

**New-site upgrade**: add structured apply-now form per listing (Name, Email, Phone, Role, Resume upload, Cover letter) → writes into admin "Applicants" queue + emails `careers@elevatepackaging.com`.

---

## 10. Contact

### Heading
> "Contact us on any of below locations for sales and support — or send your Enquiry/Feedback via web."

### Locations
- **Head Office** — 123 Industrial Way, Suite 100, Anytown, ST 00000, USA *(placeholder)*

### Inquiry form (existing fields)
| Field | Type | Required |
|---|---|---|
| Name | text | ✓ |
| Company | text | — |
| Email | email | ✓ |
| Address | text | — |
| Telephone | tel | ✓ |
| Message | textarea | ✓ |

**New-site additions**: add product/market selector, file attachment (for artwork), honeypot/reCAPTCHA, success + WhatsApp fallback CTA.

---

## 11. NEW modules (required by master doc, missing from legacy site)

| Module | Phase | Source of content |
|---|---|---|
| **Blog / News & Insights** | 2 | Client supplies initial posts; CMS-managed thereafter. Client to supply a launch announcement as the first entry. |
| **Gallery** | 2 | Grid/carousel, admin-managed. Client to supply factory/product photos. |
| **Testimonials** | 2 | Removed from the site in the rebrand; admin module kept. Re-enable once the client supplies real quotes + client logos. |
| **AI Chat + WhatsApp fallback** | 3 | FAQ-first → AI for complex → WhatsApp handoff. Seed FAQ with copy from Products/Markets pages. |
| **3D Product Views** | 3 | Client provides 3D models. Start with 1 flagship (recommend Stand-Up Pouch). |
| **Mockup Generator** | 3 | Upload design → pick pouch type/size/color → preview → send to WhatsApp for production. Pouch-type options sourced from §5.2. |
| **Admin Panel** | 1 (base) / 2 (full) | JWT auth. CRUD for: Innovations · Products · Markets · Blog · Careers · Gallery · Testimonials · Inquiries · Applicants · Integration settings. |

---

## 12. Assets needed from the client

- Hero imagery and product photography (WebP, `<slug>-NN.webp`)
- Logo variants for Elevate
- Certification badges + PDFs
- Client / partner logos and testimonials (only if the client wants those sections back)

---

## 13. Gaps (need client input before build freeze)

- [ ] **Team / leadership** photos + bios
- [ ] **Company history / timeline milestones**
- [ ] **Client / partner logos** (strips removed in rebrand — only needed if they come back)
- [ ] **Testimonials** copy + attribution
- [ ] Technical **spec sheets** for each metallized film variant (thickness, gauge, yield)
- [ ] **Brand guidelines** — confirm Elevate logo/palette (site currently uses the template's royal blue + red) and font pairing
- [ ] **3D models** for flagship products (Phase 3 dependency)
- [ ] **AI chatbot** knowledge-base scope and fallback thresholds
- [ ] Confirm which **17 market pages** survive as-is vs. merge (Dairy and Fresh Produce are thin; could consolidate)
- [ ] **WhatsApp Business** number for the button (placeholder +1 (555) 010-0100 — confirm)
- [ ] Eco-Friendly Bags — dedicated landing page?
- [ ] Confirm **certifications** held and company **positioning / tagline** copy
