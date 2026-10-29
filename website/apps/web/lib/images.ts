// Curated image catalogue — hand-picked from Pexels (commercial-use free, no attribution required).
// Every URL below has been HTTP-verified. When swapping images, verify the new URL returns 200.
//
// Pattern: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&w={w}&q=80
// The Pexels CDN honors `w` for resizing; Next.js Image re-optimizes on top.

import { allProducts } from "./products";
import { industries } from "./industries";

function pexels(id: number, w = 1600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&w=${w}&q=80`;
}

// Local industry photos: when an industry in industries.ts has real images
// (paths under /images/industries/), prefer its first image everywhere the
// industry is shown (Industries mega-menu preview, industries-page card).
// Keyed by lowercased name since img.industry() is called with the name.
const localIndustryPhoto: Record<string, string> = Object.fromEntries(
  industries
    .filter((i) => i.images?.[0]?.startsWith("/images/"))
    .map((i) => [i.name.toLowerCase(), i.images![0]])
);

// Local product photos: when a product in the catalogue has a real uploaded
// gallery (paths under /images/products/), prefer its first image everywhere
// the product is shown (mega-menu previews, featured grid, product listing,
// related cards). Derived from products.ts so there is a single source of truth.
const localProductPhoto: Record<string, string> = Object.fromEntries(
  allProducts
    .filter((p) => p.gallery?.[0]?.startsWith("/images/"))
    .map((p) => [p.slug, p.gallery![0]])
);

// Menu previews use the right-side (15°) shot instead of the front, per design.
// Falls back to the front local photo if no "-right" image is present.
const localProductPhotoRight: Record<string, string> = Object.fromEntries(
  allProducts
    .map((p) => {
      const right = p.gallery?.find(
        (g) => g.startsWith("/images/") && g.includes("-right")
      );
      return right ? ([p.slug, right] as const) : null;
    })
    .filter((e): e is readonly [string, string] => e !== null)
);

// Legacy loremflickr generator — kept only for markets/sustainability placeholders.
function lf(w: number, h: number, keywords: string, lock: number): string {
  return `https://loremflickr.com/${w}/${h}/${keywords}/?lock=${lock}`;
}

/* ============================================================
   Verified Pexels IDs (tagged with what each shows)
   ============================================================ */
const PX = {
  coffeeBag: 18138946,       // coffee bag packaging — Kamran Aydinov
  coffeeBeanBag: 14502287,   // woman holding coffee bean bag in cafe
  paperBagBlack: 5625123,    // black paper/kraft shopping bag
  aluminumFoil: 2691359,     // metallic aluminium foil texture
  chipsCloseup: 13060695,    // close-up of potato chips in open bag
  assortedSnacks: 10114270,  // assorted packaged snack bags
  vendingSnacks: 11822977,   // packaged snack bags in vending machine
  filmStrip: 7206191,        // plastic film strip with images
  rollFilms: 4042775,        // assorted color film rolls (stacked)
  ecoBoxes: 31438304,        // stack of brown eco-friendly packaging boxes
  cosmeticPack: 16038191,    // minimalist cosmetic product packaging
  boutiqueBag: 336372,       // boutique shopping bag with heels
  shoppingBagWoman: 291762   // woman holding kraft shopping bag
} as const;

/* -------------------- product slug → Pexels ID -------------------- */

const productImageMap: Record<string, number> = {
  // Printed Films
  rotogravure: PX.rollFilms,
  flexography: PX.filmStrip,

  // Plastic Films
  extrusion: PX.filmStrip,
  holography: PX.aluminumFoil,
  metallization: PX.aluminumFoil,

  // Pouches
  "4d-pouch": PX.coffeeBag,
  "centre-seal-pouch": PX.assortedSnacks,
  "centre-seal-gusset-pouch": PX.vendingSnacks,
  "flat-bottom-pouch": PX.coffeeBag,
  "box-pouch": PX.ecoBoxes,
  "four-side-seal-pouch": PX.chipsCloseup,
  "book-shape-pouch": PX.paperBagBlack,
  "stand-up-pouch": PX.coffeeBag,
  "spout-nozzle-pouch": PX.cosmeticPack,
  "shaped-die-cut-pouch": PX.cosmeticPack,
  "kraft-paper-bread-pouch": PX.coffeeBeanBag,
  "kraft-paper-pouch": PX.paperBagBlack,
  "textile-slider-pouch": PX.boutiqueBag
};

/* -------------------- category slug → Pexels ID -------------------- */

const categoryImageMap: Record<string, number> = {
  "printed-films": PX.rollFilms,
  "plastic-films": PX.aluminumFoil,
  pouches: PX.coffeeBag
};

/* -------------------- image map -------------------- */

export const img = {
  hero: "/images/hero.webp",

  about: {
    factory: pexels(PX.ecoBoxes, 1200),
    team: pexels(PX.cosmeticPack, 1200)
  },

  contact: pexels(PX.ecoBoxes, 1200),

  // Category hero/cover images (used on /products list and WhatWeMake pinned
  // section). Sourced from a representative LOCAL product photo per category
  // (no internet stock); falls back to Pexels only if the local image is missing.
  categories: {
    "printed-films": "/images/products/print-films-cover.webp",
    "plastic-films": "/images/products/plastic-films-cover.webp",
    pouches: "/images/products/pouches-cover.webp"
  },

  // Individual product thumbnails (featured grid) — Proxy returns a Pexels URL per slug
  products: new Proxy({} as Record<string, string>, {
    get: (_t, prop: string) => {
      if (localProductPhoto[prop]) return localProductPhoto[prop];
      const id = productImageMap[prop] ?? PX.coffeeBag;
      return pexels(id, 1000);
    }
  }),

  // Larger hero variant for product detail pages
  productHero: (slug: string) => {
    if (localProductPhoto[slug]) return localProductPhoto[slug];
    const id = productImageMap[slug] ?? PX.coffeeBag;
    return pexels(id, 1600);
  },

  // Mega-menu preview — prefers the right-side (15°) shot, then front, then Pexels.
  productMenu: (slug: string) => {
    // These products use their front (cover) shot in the menu instead of the
    // right-side angle: 4D Pouch matches its cover; Kraft Paper Bread Pouch's
    // new front photo is the chosen menu cover.
    const frontInMenu = ["4d-pouch", "kraft-paper-bread-pouch"];
    if (frontInMenu.includes(slug) && localProductPhoto[slug]) {
      return localProductPhoto[slug];
    }
    if (localProductPhotoRight[slug]) return localProductPhotoRight[slug];
    if (localProductPhoto[slug]) return localProductPhoto[slug];
    const id = productImageMap[slug] ?? PX.coffeeBag;
    return pexels(id, 1000);
  },

  // Markets (17 industries) — kept on loremflickr until we curate each; many are
  // food categories that don't yet have verified Pexels IDs in this map.
  markets: (name: string) => {
    const kw = marketKeywords[name] ?? "packaging,product";
    const lock = 1500 + (simpleHash(name) % 500);
    return lf(800, 500, kw, lock);
  },

  // Industry preview images for the Industries mega-menu — deterministic pick
  // from the verified Pexels pool (crisp + reliable placeholders until real
  // per-industry photos are supplied; swap this map for final imagery).
  industry: (name: string) => {
    const local = localIndustryPhoto[name.toLowerCase()];
    if (local) return local;
    const pool = [
      PX.assortedSnacks,
      PX.chipsCloseup,
      PX.vendingSnacks,
      PX.coffeeBag,
      PX.coffeeBeanBag,
      PX.ecoBoxes,
      PX.cosmeticPack,
      PX.aluminumFoil,
      PX.paperBagBlack,
      PX.shoppingBagWoman,
      PX.boutiqueBag,
      PX.rollFilms
    ];
    return pexels(pool[simpleHash(name) % pool.length]!, 1400);
  },

  clients: (id: number) => lf(200, 100, "logo,brand", 2000 + id),
  sustainability: pexels(PX.ecoBoxes, 1600),
  ecoBags: pexels(PX.shoppingBagWoman, 1200),

  // Home "Our capabilities" slider — keyed by the technology title in home-content.ts.
  // Stock placeholders for now; swap each to a real factory photo when available
  // (HTTP-verify any new URL returns 200, per the convention at the top of this file).
  capabilities: {
    "Hi Speed Extrusion": "/images/capabilities/extrusion.webp",
    "Hi Speed & Quality Printing": "/images/capabilities/printing.webp",
    "Excellent Lamination": "/images/capabilities/lamination.webp",
    "Speed Slitting": "/images/capabilities/slitting.webp",
    "Innovative Bag Making": "/images/capabilities/bag-making.webp",
    "Metallized Film": "/images/capabilities/metallized-film.webp"
  } as Record<string, string>
};

/* -------------------- keyword maps (loremflickr fallback) -------------------- */

const marketKeywords: Record<string, string> = {
  "Tea & Coffee": "tea,coffee,pouch",
  Rice: "rice,bag,grain",
  Snacks: "chips,snacks,wafers",
  Grain: "grain,wheat,packaging",
  Dairy: "milk,dairy,yogurt",
  "Agrochemical & Seeds": "seeds,agriculture,packet",
  "Detergent Powder": "detergent,soap,cleaning",
  "Spices & Pulses": "spices,pulses,lentils",
  Diapers: "diapers,baby,packaging",
  "Sports Products": "sports,gloves,equipment",
  Tissue: "tissue,paper,wet-wipes",
  "Fresh Produce": "fruit,vegetable,produce",
  Candies: "candy,sweets,chocolate",
  Garments: "clothing,garment,fashion",
  "Plastic / Designer Shopping Bags": "shopping,bag,retail,fashion",
  "Pharmaceutical & Medical": "pharmaceutical,medical,medicine",
  "Frozen Foods": "frozen,food,meat,packaging"
};

function simpleHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
