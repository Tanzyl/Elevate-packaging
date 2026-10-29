// Home-page content lifted verbatim from WEBSITE_CONTENT_INVENTORY.md §3.
// Keep in sync with the inventory doc.

import { img } from "@/lib/images";

// Bodies kept short + uniform (≈2 lines) so every capability card aligns.
export const technologies = [
  {
    title: "Fast-Run Film Extrusion",
    image: img.capabilities["Hi Speed Extrusion"],
    body:
      "Modern extrusion lines turn out multi-layer films built to be strong, long-lasting, and consistent in barrier protection."
  },
  {
    title: "Flexo & Gravure Printing",
    image: img.capabilities["Hi Speed & Quality Printing"],
    body:
      "Fast flexographic and rotogravure presses produce crisp, finely detailed graphics with color and quality that stay consistent."
  },
  {
    title: "Laminated Film Structures",
    image: img.capabilities["Excellent Lamination"],
    body:
      "Solvent-based and solventless laminating builds tough, dependable multi-layer films for the most demanding packaging uses."
  },
  {
    title: "Accurate Reel Slitting",
    image: img.capabilities["Speed Slitting"],
    body:
      "Reels are slit at up to 400 m/min to exact widths that match each packaging spec."
  },
  {
    title: "Modern Pouch Making",
    image: img.capabilities["Innovative Bag Making"],
    body:
      "Advanced pouch lines produce a broad mix of custom formats, each built precisely and to a consistent standard."
  },
  {
    title: "Metallized Barrier Films",
    image: img.capabilities["Metallized Film"],
    body:
      "Selective inline metallizing produces high-barrier films that shield products from oxygen, light, and moisture."
  }
] as const;

export const featuredProducts = [
  { name: "Stand Up Pouch", href: "/products/pouches/stand-up-pouch" },
  { name: "Four/Quad Side Seal", href: "/products/pouches/four-side-seal-pouch" },
  { name: "Centre Seal Pouch", href: "/products/pouches/centre-seal-pouch" },
  { name: "Flat Bottom Pouch", href: "/products/pouches/flat-bottom-pouch" },
  { name: "Shaped / Die-Cut Pouch", href: "/products/pouches/shaped-die-cut-pouch" },
  { name: "4D Pouch", href: "/products/pouches/4d-pouch" },
  { name: "Metallization", href: "/products/plastic-films/metallization" },
  { name: "Rotogravure", href: "/products/printed-films/rotogravure" }
] as const;
