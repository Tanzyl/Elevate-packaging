# Product Image Generation Prompts

AI image-generation prompts for the full Elevate product catalogue — **17 products** across 3 categories. Each product gets **3 shots**: **Front**, **15° Left**, and **15° Right**, all as a professional studio product shoot on a seamless white backdrop.

> Source of truth: `website/apps/web/lib/products.ts`. Slugs below match that file so generated files drop straight into the catalogue.

---

## How to use

1. Pick a product below.
2. Generate the 3 prompts (Front / 15° Left / 15° Right). Keeping the same subject + seed across the 3 angles gives a consistent product across the trio.
3. Save each output using the recommended filename, then reference them in the product's `gallery` array.

**Recommended output**: `2048 × 2048` (or larger), PNG, then optimise to WebP for the web.

**Recommended file paths** (per product slug):

```
website/apps/web/public/images/products/<slug>-front.webp
website/apps/web/public/images/products/<slug>-left.webp
website/apps/web/public/images/products/<slug>-right.webp
```

---

## Global style (baked into every prompt below)

Every prompt already contains the shared style so it is **copy-paste ready**. For reference, the shared block is:

> Professional commercial product studio photograph. Seamless pure-white (#ffffff) sweep backdrop with a soft floor gradient and a subtle, realistic contact shadow / faint reflection beneath the product. Soft, diffused three-point studio lighting, gentle highlights, no harsh shadows, no color cast. Ultra-sharp focus, photorealistic, high detail, high dynamic range, 8k, commercial packaging photography, shot on an 85mm lens at f8.
>
> **Brand palette:** deep royal blue `#1e3c8b`, brand red `#e21e2e`, and clean white — dark-blue-and-red color scheme with premium, "royal" feel.
>
> **Brand label (on the pack/roll):** the **"Elevate"** logo — the word **"ELEVATE" in brand red** and **"PACKAGING" in royal blue**, with a small CMYK swoosh accent (cyan/magenta/yellow/green ribbon). Label is clean, modern, centered and clearly legible.

**Negative prompt (use on all):**

```
text errors, gibberish text, extra logos, watermark, cluttered background, colored background,
props, hands, people, lifestyle scene, low resolution, blurry, jpeg artifacts, distorted shape,
wrinkled unprofessional, harsh shadows, busy pattern, cartoon, 3d render look
```

**Angle definitions** (reused across all products):

- **Front** — camera dead-on at eye level, straight front elevation, product centered and symmetrical.
- **15° Left** — camera rotated **15° to the left** (gentle three-quarter left view); the product's front face and its **left side panel/gusset** are both visible.
- **15° Right** — camera rotated **15° to the right** (gentle three-quarter right view); the product's front face and its **right side panel/gusset** are both visible.

---

# 1 · Printed Films

*Films are shown as upright printed reels (roll standing on its end), with the brand label on the roll's core band — since these are converting processes, not consumer packs.*

## 1.1 Rotogravure — `rotogravure`

**Subject:** A tightly wound upright roll (reel) of glossy rotogravure-printed flexible packaging film standing on its end, the outer wrap showing crisp, high-resolution printed graphics in royal blue and red; smooth cardboard core.

- **Front** — `An upright roll of glossy rotogravure-printed flexible packaging film standing on its end, high-resolution printed graphics in deep royal blue (#1e3c8b) and brand red (#e21e2e), a printed brand band on the roll reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, roll centered and symmetrical. Professional commercial product studio photograph, seamless pure-white backdrop with a soft floor gradient and subtle contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (gentle three-quarter left view), front face and left curve of the roll visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (gentle three-quarter right view), front face and right curve of the roll visible.`

## 1.2 Flexography — `flexography`

**Subject:** An upright roll of flexographic-printed flexible film with bold, high-impact repeat graphics in royal blue and red; slightly more graphic/pattern-forward than the rotogravure reel.

- **Front** — `An upright roll of flexographic-printed flexible packaging film standing on its end, bold high-impact repeating graphics in deep royal blue (#1e3c8b) and brand red (#e21e2e), a printed brand band reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, roll centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view).`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view).`

---

# 2 · Plastic Films

## 2.1 Film Extrusion — `extrusion`

**Subject:** An upright roll of freshly extruded, clear/translucent multi-layer plastic film with a natural glossy sheen; unprinted body with only a slim printed brand band on the core.

- **Front** — `An upright roll of clear translucent freshly extruded multi-layer plastic film standing on its end, natural glossy sheen catching soft studio light, a slim printed brand band reading "ELEVATE" in red and "PACKAGING" in royal blue (#1e3c8b) with a CMYK swoosh accent on the core. Camera dead-on at eye level, straight front elevation, roll centered. Professional commercial product studio photograph, seamless pure-white backdrop, subtle contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view).`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view).`

## 2.2 Holography — `holography`

**Subject:** An upright roll of holographic film with a rainbow iridescent metallic sheen; the holographic diffraction pattern shimmers, over-laid with a royal-blue-and-red brand band.

- **Front** — `An upright roll of holographic packaging film standing on its end, rainbow iridescent metallic diffraction sheen shimmering across the wrap, a printed brand band reading "ELEVATE" in red and "PACKAGING" in royal blue (#1e3c8b) with a CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, roll centered. Professional commercial product studio photograph, seamless pure-white backdrop, subtle contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), iridescence shifting across the roll.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), iridescence shifting across the roll.`

## 2.3 Metallization — `metallization`

**Subject:** An upright roll of mirror-finish silver vacuum-metallized film with a bright reflective chrome-like surface and a royal-blue-and-red printed brand band.

- **Front** — `An upright roll of mirror-finish silver vacuum-metallized packaging film standing on its end, bright reflective chrome-like surface, a printed brand band reading "ELEVATE" in red and "PACKAGING" in royal blue (#1e3c8b) with a CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, roll centered. Professional commercial product studio photograph, seamless pure-white backdrop, subtle contact shadow, diffused three-point studio lighting, controlled reflections, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view).`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view).`

---

# 3 · Pouches

*All pouches are printed flexible packaging with a matte/gloss finish, in the royal-blue-and-red brand palette, carrying the Elevate label. Each is shown filled and standing (unless the format is a flat bag).*

## 3.1 4D Pouch — `4d-pouch`

**Subject:** A premium 4D pouch — a structurally distinctive stand-up pouch with a crisp three-dimensional faceted body and sharp defined edges, a high-end reclosable zipper at the top.

- **Front** — `A premium 4D stand-up flexible packaging pouch with a distinctive faceted three-dimensional body and crisp defined edges, resealable zipper at top, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered and standing upright. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front face and left facet visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front face and right facet visible.`

## 3.2 Centre Seal — `centre-seal-pouch`

**Subject:** A classic flat pillow bag (centre back-seam seal), lying/standing flat with a smooth front face and a tear notch at the top.

- **Front** — `A classic flat pillow-style flexible packaging bag with a centre back-seam seal, smooth flat front face, tear notch at the top, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, bag centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view).`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view).`

## 3.3 Centre Seal Gusset — `centre-seal-gusset-pouch`

**Subject:** A centre-seal pillow bag with visible side gussets adding fill volume, standing with a rounded filled body.

- **Front** — `A centre-seal flexible packaging pillow bag with visible side gussets adding fill volume, rounded filled body, tear notch, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, bag centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), left side gusset clearly visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), right side gusset clearly visible.`

## 3.4 Flat Bottom Pouch — `flat-bottom-pouch`

**Subject:** A premium flat-bottom (box-bottom) coffee-style pouch standing square on shelf, with side gussets, a flat square base, and a top zipper — the classic specialty-coffee silhouette.

- **Front** — `A premium flat-bottom (box-bottom) stand-up coffee-style flexible pouch standing square on its flat base, side gussets, resealable zipper at top, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered and standing upright. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front face and left gusset panel visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front face and right gusset panel visible.`

## 3.5 Box Pouch — `box-pouch`

**Subject:** A rigid box-style pouch with a crisp square base, structured flat side panels and sharp box edges — a premium structured brick shape, with an optional top zipper.

- **Front** — `A rigid box-style flexible packaging pouch with a crisp square base, structured flat side panels and sharp box edges, resealable zipper at top, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front face and left box panel visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front face and right box panel visible.`

## 3.6 Four Side Seal — `four-side-seal-pouch`

**Subject:** A large heavy-duty side-gusseted sack-style pouch (holds up to 20 kg), tall and robust, with a carry handle at the top and a square-ish bottom — an industrial retail sack.

- **Front** — `A large heavy-duty side-gusseted sack-style flexible packaging pouch, tall and robust for bulk product, a reinforced carry handle at the top, four-panel construction, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, sack centered and standing. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front face and left side gusset panel visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front face and right side gusset panel visible.`

## 3.7 Book Shape Pouch — `book-shape-pouch`

**Subject:** A slim book-style pouch that folds like a book — flat front and back panels with a defined flat spine down one side — a refined, elegant silhouette.

- **Front** — `A slim book-shape flexible packaging pouch that folds like a book, flat front and back panels with a defined flat spine, refined elegant silhouette, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front panel and flat spine visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front panel and right edge visible.`

## 3.8 Standup Pouch — `stand-up-pouch`

**Subject:** A classic self-supporting stand-up pouch with a bottom gusset, rounded top corners and a resealable zipper — the everyday retail pouch silhouette.

- **Front** — `A classic self-supporting stand-up flexible packaging pouch with a bottom gusset, rounded top corners, resealable zipper, tear notch, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered and standing upright. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front face and left edge visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front face and right edge visible.`

## 3.9 Spout/Nozzle Pouch — `spout-nozzle-pouch`

**Subject:** A stand-up pouch with a moulded plastic dispensing spout and screw cap at the top corner — a liquid/refill pack.

- **Front** — `A stand-up flexible packaging pouch with a moulded plastic dispensing spout and screw cap at the top corner, filled rounded body for liquids, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered and standing upright, spout clearly visible. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), spout and left edge visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), spout and right edge visible.`

## 3.10 Shaped/Die-Cut Pouch — `shaped-die-cut-pouch`

**Subject:** A custom die-cut pouch whose outline follows a product silhouette (e.g. a soft rounded/contoured shape rather than a rectangle), a hang hole at the top, standing or hanging.

- **Front** — `A custom die-cut shaped flexible packaging pouch with a contoured non-rectangular silhouette following a product shape, rounded custom outline, hang hole at the top, matte finish in deep royal blue (#1e3c8b) and brand red (#e21e2e), a clean brand label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), custom edge profile visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), custom edge profile visible.`

## 3.11 Kraft Paper Bread Pouch — `kraft-paper-bread-pouch`

**Subject:** A natural kraft-paper bread bag with a clear rectangular bread window on the front, a folded top with closure — natural kraft brown body accented with the royal-blue-and-red brand label. *(Note: matt kraft finish; blue/red appears in the printed label and accents rather than the whole body.)*

- **Front** — `A natural kraft-paper bread pouch, matte brown kraft body with a clear rectangular transparent bread window on the front, folded top with a closure, brand accents and label in deep royal blue (#1e3c8b) and brand red (#e21e2e), the label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered and standing. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), front window and left side visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), front window and right side visible.`

## 3.12 Textile Slider Pouch — `textile-slider-pouch`

**Subject:** A premium reclosable slider-zip pouch for garments — a large flat pouch with a smooth plastic slider zip along the top, a clear/frosted presentation front panel and a hang hole.

- **Front** — `A premium reclosable slider-zip flexible packaging pouch for garments, large flat format with a smooth plastic slider zip along the top edge, a clear frosted presentation front panel, hang hole, brand accents and label in deep royal blue (#1e3c8b) and brand red (#e21e2e), the label reading "ELEVATE" in red and "PACKAGING" in royal blue with a small CMYK swoosh accent. Camera dead-on at eye level, straight front elevation, pouch centered. Professional commercial product studio photograph, seamless pure-white backdrop, soft contact shadow, diffused three-point studio lighting, ultra-sharp, photorealistic, 8k, 85mm f8.`
- **15° Left** — same subject and style, `camera rotated 15° to the left (three-quarter left view), slider zip and left edge visible.`
- **15° Right** — same subject and style, `camera rotated 15° to the right (three-quarter right view), slider zip and right edge visible.`

---

## Quick index (17 products → 51 images)

| # | Product | Slug | Category |
|---|---------|------|----------|
| 1 | Rotogravure | `rotogravure` | Printed Films |
| 2 | Flexography | `flexography` | Printed Films |
| 3 | Film Extrusion | `extrusion` | Plastic Films |
| 4 | Holography | `holography` | Plastic Films |
| 5 | Metallization | `metallization` | Plastic Films |
| 6 | 4D Pouch | `4d-pouch` | Pouches |
| 7 | Centre Seal | `centre-seal-pouch` | Pouches |
| 8 | Centre Seal Gusset | `centre-seal-gusset-pouch` | Pouches |
| 9 | Flat Bottom Pouch | `flat-bottom-pouch` | Pouches |
| 10 | Box Pouch | `box-pouch` | Pouches |
| 11 | Four Side Seal | `four-side-seal-pouch` | Pouches |
| 12 | Book Shape Pouch | `book-shape-pouch` | Pouches |
| 13 | Standup Pouch | `stand-up-pouch` | Pouches |
| 14 | Spout/Nozzle Pouch | `spout-nozzle-pouch` | Pouches |
| 15 | Shaped/Die-Cut Pouch | `shaped-die-cut-pouch` | Pouches |
| 16 | Kraft Paper Bread Pouch | `kraft-paper-bread-pouch` | Pouches |
| 17 | Textile Slider Pouch | `textile-slider-pouch` | Pouches |

**Total: 17 products × 3 angles = 51 images.**
