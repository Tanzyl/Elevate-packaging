// Page content lifted from WEBSITE_CONTENT_INVENTORY.md.
// Keep in sync with the inventory doc.

export const aboutContent = {
  // Scrolling trust-strip copy for the About page (mirrors the home-page
  // animated bar). Keep these short — they loop horizontally.
  badges: [
    "Growing Alongside Our Customers",
    "Made in the USA",
    "Custom Printed Pouches & Laminates",
    "Chosen by Brands Worldwide"
  ],
  profile: [
    // TODO: client copy — replace with the company's real history.
    "Elevate makes premium flexible packaging in the USA for consumer brands of every size, from new startups to nationwide retail chains.",
    "Close partnership with every client drives our work, and we hold ourselves to a steady standard across custom printed pouches, laminated films, and rotogravure print.",
    "Long-standing ties with the customers, suppliers, and people we work alongside are what make us strong and set us apart.",
    "Brands across food and non-food consumer categories know us for well-made packaging and service that answers quickly."
  ],
  vision: "To set the global benchmark for flexible packaging.",
  mission: [
    "We exist to earn customers and keep them for the long haul. That means treating every partner with openness and fairness, and always pairing expert, attentive service with packaging shaped to what they actually need.",
    "By investing steadily in new technology, we give customers smarter, more affordable packaging and a better experience working with us.",
    "Put simply, we want every customer to see Elevate as the right partner for whatever their packaging calls for."
  ],
  values: [
    {
      title: "Better Together",
      body: "We pool our know-how, hear each other out, and work as one team to turn good ideas into real outcomes."
    },
    {
      title: "Honesty Builds Trust",
      body: "We speak plainly, make commitments we can keep, and choose the right thing even when nobody would notice otherwise."
    },
    {
      title: "Raising the Bar",
      body: "We keep our word, sweat the small details, and expect more of ourselves with every job we take on."
    },
    {
      title: "Dedicated to the Work",
      body: "We treat every job with care, move with a sense of urgency, and keep our eyes on outcomes that matter."
    },
    {
      title: "Personal Ownership",
      body: "Every responsibility is ours to own, and we look after each client's needs as well as we possibly can."
    },
    {
      title: "Always Ready to Help",
      body: "We pay attention, respond quickly, and plan ahead so every customer has an outstanding experience with us."
    },
    {
      title: "Professional Through and Through",
      body: "Integrity guides how we act: we deliver on our promises and give customers the dependable consistency they count on."
    },
    {
      title: "Growing Together",
      body: "We encourage learning, welcome feedback, and help one another build new skills and reach our full potential."
    }
  ]
} as const;

// NOTE: productCategories lives in lib/products.ts (full catalog).

export function marketSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* Market → product slugs served. Maps a market's name to the product slugs
   (format: "<category>/<slug>") most relevant to that industry. */
export const marketProducts: Record<string, { category: string; slug: string }[]> = {
  "Tea & Coffee": [
    { category: "pouches", slug: "stand-up-pouch" },
    { category: "pouches", slug: "flat-bottom-pouch" },
    { category: "pouches", slug: "kraft-paper-bread-pouch" }
  ],
  Rice: [
    { category: "pouches", slug: "four-side-seal-pouch" },
    { category: "pouches", slug: "centre-seal-pouch" }
  ],
  Snacks: [
    { category: "pouches", slug: "centre-seal-pouch" },
    { category: "pouches", slug: "shaped-die-cut-pouch" },
    { category: "plastic-films", slug: "metallization" }
  ],
  Grain: [
    { category: "pouches", slug: "four-side-seal-pouch" },
    { category: "pouches", slug: "flat-bottom-pouch" }
  ],
  Dairy: [
    { category: "pouches", slug: "spout-nozzle-pouch" },
    { category: "pouches", slug: "stand-up-pouch" }
  ],
  "Agrochemical & Seeds": [
    { category: "pouches", slug: "four-side-seal-pouch" },
    { category: "pouches", slug: "centre-seal-pouch" }
  ],
  "Detergent Powder": [
    { category: "pouches", slug: "stand-up-pouch" },
    { category: "pouches", slug: "four-side-seal-pouch" }
  ],
  "Spices & Pulses": [
    { category: "pouches", slug: "four-side-seal-pouch" },
    { category: "pouches", slug: "stand-up-pouch" }
  ],
  Diapers: [
    { category: "pouches", slug: "centre-seal-pouch" },
    { category: "pouches", slug: "shaped-die-cut-pouch" }
  ],
  "Sports Products": [
    { category: "pouches", slug: "shaped-die-cut-pouch" }
  ],
  Tissue: [
    { category: "pouches", slug: "centre-seal-pouch" },
    { category: "pouches", slug: "four-side-seal-pouch" }
  ],
  "Fresh Produce": [
    { category: "plastic-films", slug: "metallization" },
    { category: "pouches", slug: "four-side-seal-pouch" }
  ],
  Candies: [
    { category: "pouches", slug: "centre-seal-pouch" },
    { category: "pouches", slug: "shaped-die-cut-pouch" },
    { category: "plastic-films", slug: "holography" }
  ],
  Garments: [
    { category: "pouches", slug: "stand-up-pouch" }
  ],
  "Plastic / Designer Shopping Bags": [
    { category: "pouches", slug: "stand-up-pouch" }
  ],
  "Pharmaceutical & Medical": [
    { category: "pouches", slug: "four-side-seal-pouch" },
    { category: "pouches", slug: "spout-nozzle-pouch" },
    { category: "plastic-films", slug: "metallization" }
  ],
  "Frozen Foods": [
    { category: "pouches", slug: "spout-nozzle-pouch" },
    { category: "pouches", slug: "four-side-seal-pouch" },
    { category: "plastic-films", slug: "metallization" }
  ]
};

export const markets = [
  {
    name: "Tea & Coffee",
    lead: "Sealed, vacuum-ready packs. High-barrier films lock in aroma, color, and flavor, while nitrogen flushing keeps product fresh longer.",
    apps: "Coffee, tea"
  },
  {
    name: "Rice",
    lead: "Rice bag packaging built around moisture control, with vacuum sealing and nitrogen flushing to keep weevils out.",
    apps: "1, 2, 5, 10, and 20 kg + custom sizes"
  },
  {
    name: "Snacks",
    lead: "Built for what snack brands need today: distinctive designs and packaging that keeps costs competitive.",
    apps: "Chips, wafers, cookies, biscuits, crackers, bread, consumer goods"
  },
  {
    name: "Grain",
    lead: "Shopper-friendly packs for an everyday staple, with nitrogen flushing to guard against weevils.",
    apps: "1, 2, 5, 10, and 20 kg + custom sizes"
  },
  {
    name: "Dairy",
    lead: "Keeps liquid and semi-liquid dairy safe, with an airtight hermetic seal that blocks moisture and oxidation.",
    apps: "Milk, yogurt, other dairy products"
  },
  {
    name: "Agrochemical & Seeds",
    lead: "Formats and finishes shaped to the specific needs of agrochemical and seed producers.",
    apps: "Seeds, agrochemicals"
  },
  {
    name: "Detergent Powder",
    lead: "Dependable, leak-resistant packs. Economical stand-up pouches that are recyclable and save shelf space.",
    apps: "Powder and liquid detergent, dishwashing products, bar soap"
  },
  {
    name: "Spices & Pulses",
    lead: "Locks in natural freshness, shuts out dust and moisture, and preserves flavor, aroma, and richness.",
    apps: "Spices, pulses, salt, sugar"
  },
  {
    name: "Diapers",
    lead: "Diaper bags made to your specifications from high-barrier, multi-layer materials.",
    apps: "Diapers"
  },
  {
    name: "Sports Products",
    lead: "Packaging made for sportswear brands, manufacturers, and exporters.",
    apps: "Sportswear, gloves, sporting goods of all kinds"
  },
  {
    name: "Tissue",
    lead: "Bold-graphic plastic overwraps that shield against moisture, light, oxygen, and contaminants.",
    apps: "Tissues, wet wipes, towels"
  },
  {
    name: "Fresh Produce",
    lead: "Light, multi-layer metallized films keep produce fresh, while crystal-clear panels show off what's inside.",
    apps: "Fruits, vegetables"
  },
  {
    name: "Candies",
    lead: "Packaging that protects, looks great, and supports sustainability for candy and confections.",
    apps: "Chocolate, candy, sweets"
  },
  {
    name: "Garments",
    lead: "In apparel, the package shapes the shopper's first impression at the moment of purchase.",
    apps: "Shirts, pants, jeans, socks, gloves, sporting goods"
  },
  {
    name: "Plastic / Designer Shopping Bags",
    lead: "Tough, durable shopping bags made for retail and fashion brands.",
    apps: "Retail stores, fashion retail"
  },
  {
    name: "Pharmaceutical & Medical",
    lead: "A fast-changing field that calls for advanced packaging. Shields against moisture, oxygen, light, and contaminants.",
    apps: "Sachets, creams, bandages"
  },
  {
    name: "Frozen Foods",
    lead: "Engineered to handle freezer temperatures and the cold-chain needs of meat and poultry.",
    apps: "Frozen foods, meat, poultry"
  }
] as const;

export const innovations = [
  {
    title: "Holography",
    body:
      "We originate holographic film in-house, with custom authentication patterns and covert security features that only the client knows. It discourages copying and counterfeiting while giving the pack real shelf impact. Offered in metallized or clear versions on PET, BOPP, and LDPE."
  },
  {
    title: "4D Bag",
    body:
      "A pouch finish that appears to change depth and texture as the viewer's angle changes. It's built into a standard high-barrier laminate, so brands stand out on shelf with no trade-off in product life."
  },
  {
    title: "Hot Stamping on Flexible Pouches",
    body:
      "Genuine metallic foil is applied with heat onto printed flexible pouches. It's crisper than metallic ink and sits in register with the design, giving logos and highlights an authentic foil look on shelf-ready bags."
  },
] as const;

export const services = [
  {
    slug: "quality",
    name: "Quality Services",
    tagline: "Good quality is never forgotten.",
    body:
      "Delivering quality products on schedule is core to who we are. Strong service keeps customers satisfied, and satisfied customers keep a business growing.",
    sub: [
      {
        title: "From Prototype to Production",
        body:
          "An innovation center built for developing new products. It tracks domestic and global market trends and presents packaging solutions that respond to them."
      },
      {
        title: "Packaging Prototype Center",
        body:
          "Fast concept mock-ups, with prototyping in several forms: hand-drawn sketches, digital renderings, interactive 3D models, and physical samples."
      }
    ]
  },
  {
    slug: "prepress",
    name: "Pre-Press & Graphics Services",
    tagline: "Everything you need, in one place.",
    body: "Complete pre-press, color control, and project coordination for flexible packaging.",
    sub: [
      {
        title: "Prepress",
        body:
          "Artwork editing · Product photography · Design guidance · Electronic file transfer · Digital output"
      },
      {
        title: "Color Management",
        body:
          "Press fingerprinting · Print quality checks · On-press support · Image handling · Epson proof approval"
      },
      {
        title: "Project Management & Tools",
        body:
          "Shared workflow · Email alerts · Up-to-date software · Works on Mac and Windows"
      }
    ]
  }
] as const;

