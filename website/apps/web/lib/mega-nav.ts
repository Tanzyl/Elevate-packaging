// Desktop mega-menu nav data, generated from the catalogue, industry groups,
// and businesses. Text-only items (no icons) grouped under headings.

import type { MegaMenuItem } from "@/components/ui/mega-menu";
import { catalog } from "@/lib/products";
import { industriesByGroup, groupSlug } from "@/lib/industries";
import { businesses } from "@/lib/businesses";
import { img } from "@/lib/images";

// Products dropdown order — Pouches first, then the film categories.
const PRODUCT_ORDER = ["pouches", "printed-films", "plastic-films"];
const orderedProductCats = [...catalog].sort(
  (a, b) => PRODUCT_ORDER.indexOf(a.slug) - PRODUCT_ORDER.indexOf(b.slug)
);

// Reference-style showcase for the Products dropdown: categories + products,
// each with a hover image preview (full-width panel, see ShowcasePanel).
const productsShowcase = {
  eyebrow: "Our Products",
  allHref: "/products",
  allLabel: "All Products",
  groups: orderedProductCats.map((cat) => ({
    title: cat.name,
    href: `/products/${cat.slug}`,
    image:
      (img.categories as Record<string, string>)[cat.slug] ??
      img.productHero(cat.products[0].slug),
    items: cat.products.map((p) => ({
      label: p.name,
      href: `/products/${cat.slug}/${p.slug}`,
      image: img.productMenu(p.slug)
    }))
  }))
};

// Same showcase treatment for Industries: groups + industries + hover image.
const industriesShowcase = {
  eyebrow: "Industries",
  allHref: "/industries",
  allLabel: "All Industries",
  groups: industriesByGroup.map(({ group, items }) => ({
    title: group,
    href: `/industries#${groupSlug(group)}`,
    image: img.industry(items[0]?.name ?? group),
    items: items.map((ind) => ({
      label: ind.name,
      href: `/industries/${ind.slug}`,
      image: img.industry(ind.name)
    }))
  }))
};

export const MEGA_ITEMS: MegaMenuItem[] = [
  { id: 0, label: "Home", link: "/" },
  { id: 1, label: "About Us", link: "/about" },
  {
    id: 2,
    label: "Our Divisions",
    link: "/our-businesses",
    subMenus: [
      {
        title: "Our Divisions",
        href: "/our-businesses",
        items: businesses.map((b) => ({
          label: b.name,
          href: `/our-businesses/${b.slug}`
        }))
      }
    ]
  },
  {
    id: 3,
    label: "Products",
    link: "/products",
    showcase: productsShowcase
  },
  {
    id: 4,
    label: "Industries",
    link: "/industries",
    showcase: industriesShowcase
  },
  { id: 5, label: "Innovation", link: "/innovations" },
  { id: 6, label: "Blog", link: "/blog" },
  { id: 7, label: "Contacts", link: "/contact" }
];
