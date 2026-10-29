# Product Image Generation Prompts

AI image prompts for the products section: **17 products + 3 category covers**, showing **realistic retail packaging with original, fictional branding**: invented brand names and artwork, never a real brand, trademark, or recognizable logo, so the images are safe to publish.

> Source of truth: `website/apps/web/lib/products.ts` (product `gallery` arrays) and `lib/images.ts` (category covers). Every filename below is one the site **already loads**: save the new image under the same name in `website/apps/web/public/images/products/` and it replaces the old one with no code change.

---

## How to use

1. Copy the **Style block** + the product's **Subject**, then append the **Angle** line for the file you're generating.
2. Use the **Negative prompt** on every generation.
3. Keep the same seed/subject across a product's angles so front/left/right show the same pack.
4. Check the brand text in each output: AI generators misspell words. Regenerate (or fix in an editor) anything garbled. Short names (1 to 2 words) render most reliably.
5. Output square, `2048 × 2048`, then convert to WebP (quality ~80) under the exact filename listed. Don't commit JPG/PNG (see the WebP rule in `CLAUDE.md`).

**Copyright check before publishing:** the brand names below are generic, descriptive and invented for this site, but do a quick web search on any name you keep, and never prompt with a real brand, mascot, or character.

**Angle lines**

| Angle | Append to prompt | Used by files named |
|---|---|---|
| Front | `Straight-on front view, camera at product mid-height, centered.` | `*-front.webp`, `*-1.webp`, `*-front-2.webp` |
| Left | `Product rotated 15 degrees to the left, showing the front and left side.` | `*-left.webp` |
| Right | `Product rotated 15 degrees to the right, showing the front and right side.` | `*-right.webp` |
| Back | `Rear view showing the back panel with simple placeholder info blocks and back seal.` | `*-back.webp` |

---

## Style block (prefix every prompt)

```
Professional commercial product studio photograph of realistic retail flexible packaging with an original, fictional brand design. Clean modern package artwork: a short invented brand name in crisp, correctly spelled lettering, simple product illustration or pattern, bold color blocking. Design does not resemble any real brand or logo. Seamless pure-white backdrop with a soft floor gradient and a subtle realistic contact shadow. Soft diffused three-point studio lighting, gentle highlights, no color cast. Photorealistic, ultra-sharp, high detail, 85mm lens at f8, square composition with generous margin around the product.
```

## Negative prompt (use on all)

```
real brand names, famous logos, trademarks, copyrighted characters, mascots, celebrity, misspelled text, gibberish text, garbled letters, long paragraphs of text, barcode, QR code, watermark, people, hands, cluttered background, colored background, props, distorted shape, warped seams, extra spouts, extra zippers, low resolution, blurry
```

---

## Home hero

**File:** `website/apps/web/public/images/hero.webp` (one level up from `products/`), square `2400 × 2400`.
Rendered in `components/sections/hero.tsx`: cropped 4:5 (mobile) / 5:4 (tablet) / ~square (desktop), anchored `70% 60%`, slow Ken Burns zoom, with label chips over the top-left and bottom-right corners. Keep the products in the central ~60% of the frame. Use this prompt **instead of** the Style block (it has its own background):

```
Premium commercial studio photograph of a curated lineup of eight flexible packaging pouches standing on a smooth warm-white surface, arranged in a gentle staggered arc with varied heights for depth: a matte black flat bottom coffee pouch "MORNING ROAST", a sage-green box pouch "LEAF & CUP", a white stand-up pouch "NUTTY TRAIL", an orange-and-green spout pouch "FRESH PRESS", a brown kraft paper pouch with window "WILD OATS", a copper die-cut pouch "HAPPY PAWS", a yellow die-cut spout pouch "LITTLE SPOON", and a large white side-gusset sack "HARVEST GRAIN" anchoring the back. All brands are fictional, original package designs with short, correctly spelled names and simple illustrations; nothing resembles a real brand. Background: soft seamless warm off-white wall with a subtle deep evergreen (#1f5f47) gradient glow behind the group and a faint copper (#c56b36) rim light. Soft diffused key light from upper left, gentle reflections on glossy films, realistic contact shadows. Composition: the product group fills the central 60 percent of the frame, slightly right of center, with calm empty space at the top-left and bottom-right corners and all edges, so it survives tight cropping. Photorealistic, ultra-sharp, high detail, premium editorial packaging photography, 50mm lens at f/8, shallow falloff in the background only.
```

Negative prompt: the shared one above, plus `products cut off at the frame edge, products touching the frame edge, fisheye distortion`. If the generator garbles eight brand names, drop to 4 or 5 pouches.

---

## Category covers

Shown on the `/products` overview cards.

| File | Subject |
|---|---|
| `print-films-cover.webp` | Two large rolls of printed packaging film standing upright, one partly unrolled toward the camera, showing a repeating printed snack-wrapper design: the fictional brand "CRUNCHY CO" in bold white letters on a deep green background with copper-orange chip illustrations, repeated across the web with thin CMYK registration marks along the edge. |
| `plastic-films-cover.webp` | A group of three plastic film rolls of different widths, one frosted white, one fully transparent, one metallized silver, arranged in a neat cluster with one film end unspooling. These are unprinted raw films, no artwork. |
| `pouches-cover.webp` | An assortment of branded flexible pouches standing together with different fictional brands: a white stand-up pouch "NUTTY TRAIL", a kraft flat bottom pouch "MORNING ROAST" coffee, a silver spout pouch "FRESH PRESS" juice, and a green box pouch "LEAF & CUP" tea; varied heights, neatly grouped. |

---

## Printed Films

### Rotogravure
**File:** `rotogravure-front.webp`
**Subject:** A roll of high-gloss printed packaging film with a long unrolled sheet draped toward the camera, showing a repeated photographic-quality print for a fictional tea brand "LEAF & CUP": rich photographic tea leaves and a steaming cup with smooth gradients on deep green, the brand name in elegant cream lettering, and a thin strip of CMYK registration color bars along one edge.

### Flexography
**File:** `flexography-front.webp`
**Subject:** A roll of matte printed packaging film with a sheet unrolled flat toward the camera, showing a repeated bold flat-color print for a fictional bakery brand "DAILY BAKE": simple two-color bread illustrations in warm orange and forest green on off-white, the brand name in a chunky rounded font, and a thin strip of CMYK registration marks along the edge.

---

## Plastic Films

These are raw substrates, so they stay unprinted (no branding needed).

### Film Extrusion
**File:** `extrusion-front.webp`
**Subject:** Two large rolls of clear multi-layer plastic film on cardboard cores, one standing and one lying on its side with a length of glossy transparent film unspooled across the floor, showing its clarity and slight sheen. No printing.

### Holography
**File:** `holography-front.webp`
**Subject:** A roll of holographic film with a sheet unrolled toward the camera, the surface shimmering with iridescent rainbow light-diffraction patterns (silver base shifting through cyan, magenta and gold), with a subtle repeating star motif in the hologram. No text.

### Metallization
**File:** `metallization-front.webp`
**Subject:** A roll of mirror-bright metallized silver film with a smooth sheet unrolled toward the camera, reflecting soft studio light, clean chrome-like finish with gentle reflections. No printing.

---

## Pouches

### 4D Pouch
**Files:** `4d-pouch-front.webp`, `4d-pouch-left.webp`, `4d-pouch-right.webp`, `4d-pouch-back.webp`
**Subject:** A premium 4D pouch for a fictional specialty coffee brand "SUMMIT BEANS": rigid box-like flexible pouch with four crisp vertical corner seals, square flat base and press-to-close zipper; matte deep-green film with a minimalist copper mountain-line illustration and the brand name in thin gold capitals.

### Centre Seal
**File:** `centre-seal-pouch-front.webp`
**Subject:** A filled pillow-style centre seal snack bag for a fictional chips brand "CRUNCHY CO": crimped top and bottom seals, gently puffed; glossy deep-green film with bright illustrated potato chips and the brand name in bold white rounded letters. Front-facing.

### Centre Seal Gusset
**Files:** `centre-seal-gusset-pouch-front.webp`, `centre-seal-gusset-pouch-left.webp`, `centre-seal-gusset-pouch-right.webp`
**Subject:** A filled centre-seal gusseted bag for a fictional flour brand "GOLDEN MILL", standing upright with folded side gussets and a crimped top seal; matte cream film with a wheat-stalk illustration in warm gold and the brand name in dark brown serif letters.

### Flat Bottom Pouch
**Files:** `flat-bottom-pouch-front.webp`, `flat-bottom-pouch-left.webp`, `flat-bottom-pouch-right.webp`
**Subject:** A flat bottom coffee pouch for a fictional brand "MORNING ROAST": tall square shape with flat rectangular base, crisp side gussets and pull-tab zipper; matte black soft-touch film with a copper sunrise line illustration and the brand name in clean white capitals.

### Box Pouch
**Files:** `box-pouch-front.webp`, `box-pouch-left.webp`, `box-pouch-right.webp`
**Subject:** A box pouch for a fictional tea brand "LEAF & CUP": square footprint, sharp vertical edges and flat top, structured and rigid-looking; matte sage-green film with delicate botanical tea-leaf line art and the brand name in elegant cream lettering.

### Four Side Seal
**Files:** `four-side-seal-pouch-front.webp`, `four-side-seal-pouch-left.webp`, `four-side-seal-pouch-right.webp`
**Subject:** A large heavy-duty four-side-seal bag for a fictional rice brand "HARVEST GRAIN", filled so it stands full and solid, sealed seams on all four edges, side gussets and a handle cut-out at the top; sized like a 10 to 20 kg sack; white matte film with a green rice-paddy illustration and the brand name in bold dark-green letters.

### Book Shape Pouch
**Files:** `book-shape-pouch-front.webp`, `book-shape-pouch-left.webp`, `book-shape-pouch-right.webp`
**Subject:** A slim book-shape pouch for a fictional chocolate brand "COCOA LANE", standing upright like a hardcover book with flat front, back and narrow spine panels; matte chocolate-brown film with copper foil-look accents, a simple cocoa-pod illustration and the brand name in gold script.

### Standup Pouch
**Files:** `stand-up-pouch-front.webp`, `stand-up-pouch-left.webp`, `stand-up-pouch-right.webp`
**Subject:** A classic stand-up pouch (doypack) for a fictional trail-mix brand "NUTTY TRAIL", standing on its rounded bottom gusset with a resealable zipper and tear notch; glossy white film with colorful illustrated nuts and dried fruit and the brand name in playful orange lettering.

### Spout/Nozzle Pouch
**File:** `spout-nozzle-pouch-front.webp`
**Subject:** A filled stand-up spout pouch for a fictional juice brand "FRESH PRESS", with a corner-mounted spout and white screw cap; glossy film with a bright orange-and-green fruit splash illustration and the brand name in bold white letters.

### Shaped/Die-Cut Pouch
**Files:** `shaped-die-cut-pouch-1.webp` to `shaped-die-cut-pouch-4.webp` (one per file)
**Subject:** A die-cut flexible pouch with a custom silhouette, standing upright, smooth sealed edges following the outline. Use one design per file:
1. bottle silhouette with a narrow neck, fictional shampoo brand "PURE BLOOM", matte green with white floral line art
2. rounded hourglass silhouette, fictional candy brand "SUGAR POP", glossy white with pastel candy illustrations
3. curved-shoulder silhouette with a small top spout, fictional baby food brand "LITTLE SPOON", soft yellow with simple fruit icons
4. rounded rectangle with a hang-hole, fictional pet treat brand "HAPPY PAWS", matte copper with a cartoon paw print (no real characters)

### Kraft Paper Bread Pouch
**Files:** `kraft-paper-bread-pouch-cover.webp`, `kraft-paper-bread-pouch-front.webp`
**Subject:** A brown kraft paper bread bag for a fictional bakery "DAILY BAKE", with a long clear rectangular window showing a sliced loaf inside and a folded top; simple one-color dark-green print of a wheat icon and the brand name in a rustic stamp-style font. For the cover file, show two of these bags side by side, one slightly behind the other.

### Kraft Paper Pouch
**Files:** `kraft-paper-pouch-front.webp`, `kraft-paper-pouch-front-2.webp`
**Subject:** A natural brown kraft paper stand-up pouch for a fictional granola brand "WILD OATS", with resealable zipper and tear notch, visible paper fiber texture, simple one-color black print of an oat-sprig illustration and the brand name in a clean hand-drawn font. For `front-2`, add a small clear oval window showing granola inside.

### Textile Slider Pouch
**Files:** `textile-slider-pouch-front.webp`, `textile-slider-pouch-02.webp`
**Subject:** A clear plastic slider-zip pouch for a fictional home-textile brand "SOFT NEST", lying at a slight angle and containing a neatly folded plain white cotton towel; fully transparent front with a small printed band across the top showing the brand name in navy lettering and a simple feather icon. For `02`, show the same pouch standing upright at a three-quarter angle.
