// Constants lifted from WEBSITE_CONTENT_INVENTORY.md.
// Update both when editing.

import { industriesByGroup, groupSlug } from "./industries";

export const site = {
  brand: "Elevate",
  tagline:
    "Elevate makes flexible packaging in the USA, producing printed films and custom pouches that keep products safe and give brands a standout look on shelf.",

  contact: {
    phones: ["+1 (415) 985-5597"],
    emails: { general: "hs.enterprises4921@gmail.com" },
    // Flat list kept for schema.org (seo.ts) and the contact page.
    addresses: [
      {
        label: "Head Office",
        value: "3898 El Camino Real, Palo Alto, CA 94306, USA"
      }
    ],
    // Grouped locations for the contact-page "Locations" section and footer.
    locations: [
      {
        label: "Head Office",
        address: ["3898 El Camino Real", "Palo Alto, CA 94306, USA"],
        phones: ["+1 (415) 985-5597"],
        email: "hs.enterprises4921@gmail.com"
      }
    ],
    whatsappNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "14159855597",
    social: {
      facebook: "https://www.facebook.com/",
      twitter: "https://twitter.com/",
      linkedin: "https://www.linkedin.com/"
    }
  },

  featureBadges: [
    "Eco-Conscious Flexible Packaging",
    "Accurate, Controlled Color",
    "Premium Recyclable Materials",
    "Relied On by Packaging Professionals"
  ]
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export const nav: { primary: NavItem[] } = {
  primary: [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Company Profile", href: "/about#profile" },
        { label: "Vision & Mission", href: "/about#vision" },
        { label: "Core Values", href: "/about#values" }
      ]
    },
    { label: "Our Divisions", href: "/our-businesses" },
    {
      label: "Products",
      href: "/products",
      children: [
        {
          label: "Printed Films",
          href: "/products/printed-films",
          children: [
            { label: "Rotogravure", href: "/products/printed-films/rotogravure" },
            { label: "Flexography", href: "/products/printed-films/flexography" }
          ]
        },
        {
          label: "Plastic Films",
          href: "/products/plastic-films",
          children: [
            { label: "Film Extrusion", href: "/products/plastic-films/extrusion" },
            { label: "Holography", href: "/products/plastic-films/holography" },
            { label: "Metallization", href: "/products/plastic-films/metallization" }
          ]
        },
        {
          label: "Pouches",
          href: "/products/pouches",
          children: [
            { label: "Centre Seal", href: "/products/pouches/centre-seal-pouch" },
            { label: "Flat Bottom Pouch", href: "/products/pouches/flat-bottom-pouch" },
            { label: "Box Pouch", href: "/products/pouches/box-pouch" },
            { label: "Four Side Seal", href: "/products/pouches/four-side-seal-pouch" },
            { label: "Standup Pouch", href: "/products/pouches/stand-up-pouch" },
            { label: "Spout/Nozzle Pouch", href: "/products/pouches/spout-nozzle-pouch" },
            { label: "Shaped/Die-Cut Pouch", href: "/products/pouches/shaped-die-cut-pouch" },
            { label: "Kraft Paper Bread Pouch", href: "/products/pouches/kraft-paper-bread-pouch" },
            { label: "Kraft Paper Pouch", href: "/products/pouches/kraft-paper-pouch" },
          ]
        }
      ]
    },
    {
      label: "Industries",
      href: "/industries",
      children: industriesByGroup.map(({ group, items }) => ({
        label: group,
        href: `/industries#${groupSlug(group)}`,
        children: items.map((i) => ({
          label: i.name,
          href: `/industries/${i.slug}`
        }))
      }))
    },
    { label: "Innovation", href: "/innovations" },
    { label: "Blog", href: "/blog" },
    { label: "Contacts", href: "/contact" }
  ]
};
