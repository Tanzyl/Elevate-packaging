// "Our Businesses" — the units across the Elevate group. Static content
// rendered on /our-businesses (cards) and /our-businesses/[slug] (detail pages).
//
// Detail copy (tagline/overview/capabilities/highlights) was written from the
// product catalogue in products.ts and WEBSITE_CONTENT_INVENTORY.md; it is
// industry-standard description of each unit and still needs client review.

export type Business = {
  slug: string;
  name: string;
  /** One-liner used on the /our-businesses card and as the meta description. */
  description: string;
  image: string;
  /** Short hero line under the H1 on the detail page. */
  tagline: string;
  /** Detail-page body copy, one paragraph per entry. */
  overview: string[];
  capabilities: { title: string; text: string }[];
  /** Key facts rendered as a compact strip. */
  highlights: { label: string; value: string }[];
  /** Catalogue links: [categorySlug, productSlug]. Category-only when productSlug is omitted. */
  relatedProducts: { category: string; product?: string }[];
};

export const businesses: Business[] = [
  {
    slug: "creative-artwork-studio",
    name: "Design & Artwork Studio",
    description:
      "Our in-house design team creates packaging artwork, structural concepts, and brand visuals starting from a blank page.",
    image: "/images/businesses/creative-artwork-studio.webp",
    tagline: "Creative concepts, finished artwork, and accurate structural design, all developed together in one place.",
    overview: [
      "This is the studio where a packaging idea becomes something real. Whether we start from a product concept or a first brief, our designers carry it through to shelf-ready artwork and exact pouch or bag structures, always balancing brand impact against what the line can produce.",
      "Because we sit right next to the pre-press, cylinder, printing, and converting teams, our artwork is built around production needs from the start: accurate color, clean seal zones, and dielines ready for the machine. That joined-up process keeps proofing, sign-off, and production moving smoothly.",
      "Our clients include brand owners, creative agencies, and private-label companies, and we handle projects of every size, from a single SKU update to a full product family with many variants."
    ],
    capabilities: [
      {
        title: "Artwork Creation & Variants",
        text: "We take master artwork through every SKU variation, producing press-ready files with barcodes, regulatory copy, and nutrition facts placed for clean, compliant packs."
      },
      {
        title: "Structural Design & Dielines",
        text: "Dielines for stand-up, flat-bottom, four-side-seal, shaped, and handle bags, sized to your fill weight and packing equipment."
      },
      {
        title: "Preview Before You Print",
        text: "Lifelike 3D renderings and physical mock-ups let brands check the finished appearance and structure before anything goes to press."
      },
      {
        title: "Range Redesigns",
        text: "We fine-tune color, type, imagery, and layout so every pack in a line looks related, stands out, and is easy to spot on shelf."
      }
    ],
    highlights: [
      { label: "Outputs", value: "Press-ready artwork, dielines, 3D mock-ups" },
      { label: "Formats", value: "Pouches, bags, roll stock, labels" },
      { label: "Handoff", value: "Straight to our own pre-press team" }
    ],
    relatedProducts: [
      { category: "pouches", product: "stand-up-pouch" },
      { category: "pouches", product: "shaped-die-cut-pouch" },
      { category: "printed-films" }
    ]
  },
  {
    slug: "pre-press-repro-house",
    name: "Pre-Press & Repro",
    description:
      "Complete pre-press and reprographic services, from color separations and proofs to print-ready files that reproduce cleanly on press.",
    image: "/images/businesses/pre-press-repro-house.webp",
    tagline: "Managed color, careful file prep, and dependable proofs mean your artwork arrives at the press ready to print accurately and consistently.",
    overview: [
      "Our pre-press and repro team takes signed-off packaging artwork and prepares it for gravure and flexo printing. Each file is reviewed for color separation, trapping, profiles, and proofing, all matched to the specific film, ink, and press on the job. The aim is to get everything right before a single cylinder or plate is produced.",
      "Repro, cylinder engraving, and press operators work as one team from start to finish. Decisions on screen ruling, dot gain, and ink limits are based on real press data, so the printed result stays as faithful as possible to the approved proof.",
      "For repeat customers, we store brand color standards on file, which makes it simple to match colors when a design comes back to press, even many months later."
    ],
    capabilities: [
      {
        title: "Separations & Trapping",
        text: "Separations of up to 8 colors, including spot and metallic inks, with trapping and overprint settings tuned for flexible films."
      },
      {
        title: "Color Management by Press",
        text: "ICC profiles built for each substrate, ink set, and press, so proofs, cylinders, and the production run all match."
      },
      {
        title: "Contract Proofs",
        text: "Calibrated digital proofs, plus press proofs on the actual film when needed, for final brand approval."
      },
      {
        title: "Preflight & File Archive",
        text: "Automatic preflight checks on fonts, images, bleed, and barcode grade, with a versioned archive of every approved job."
      }
    ],
    highlights: [
      { label: "Colors", value: "Up to 8 + special and metallic inks" },
      { label: "Print methods", value: "Rotogravure and flexographic" },
      { label: "Deliverables", value: "Files ready for engraving and platemaking" }
    ],
    relatedProducts: [
      { category: "printed-films", product: "rotogravure" },
      { category: "printed-films", product: "flexography" }
    ]
  },
  {
    slug: "printing-cylinders",
    name: "Gravure Cylinders",
    description:
      "Gravure cylinders engraved and built in-house, delivering speed, accuracy, and repeatable print results.",
    image: "/images/businesses/printing-cylinders.webp",
    tagline: "Engraving our own print cylinders links every step from approved art to the press, protecting fine detail, color accuracy, and consistency.",
    overview: [
      "In rotogravure, print quality is won or lost on the cylinder. Our cylinder unit builds and engraves gravure cylinders for the group's presses as well as for outside converters, covering every step from base prep and copper plating to electromechanical engraving and chrome finishing.",
      "Making cylinders in-house eliminates the slowest outside dependency in any gravure project. Repro files feed straight to the engraver, cylinders are proofed to the same color standards, and corrections take hours rather than days.",
      "Worn or retired cylinders are cleaned, replated, and engraved again, which lowers the cost of artwork changes and reorders."
    ],
    capabilities: [
      {
        title: "Cylinder Base Production",
        text: "Steel bases prepared, balanced, and copper-plated to the face length and circumference each press requires."
      },
      {
        title: "Electromechanical Engraving",
        text: "High-resolution engraving that handles fine type, vignettes, and solids, aligned with the repro screening."
      },
      {
        title: "Chrome Plating & QC",
        text: "Hard-chrome plating for extended run life, with cell-depth and surface inspection before each cylinder ships."
      },
      {
        title: "Re-Engraving & Storage",
        text: "Cylinders stripped and replated for design updates, with catalogued storage for quick reorders."
      }
    ],
    highlights: [
      { label: "Method", value: "Rotogravure printed from cylinders" },
      { label: "Customers", value: "Our own presses and outside converters" },
      { label: "Services", value: "New, re-engraved, and stored cylinders" }
    ],
    relatedProducts: [
      { category: "printed-films", product: "rotogravure" },
      { category: "printed-films" }
    ]
  },
  {
    slug: "plastic-films",
    name: "Plastic Films",
    description:
      "Extrusion and converting of multi-layer films, the base materials behind every package we produce.",
    image: "/images/capabilities/extrusion.webp",
    tagline: "We extrude, metallize, and finish films for packaging that has to deliver dependable barrier protection, toughness, and eye-catching shelf presence.",
    overview: [
      "Our film unit produces the plastic films that feed every printing and converting line we run. Its high-speed lines make single-layer and multi-layer PE films in a variety of structures, each designed for a purpose, whether that's strength, flexibility, barrier, or strong sealing.",
      "Beyond extrusion, the unit handles vacuum metallizing and holographic origination. Vacuum metallizing yields decorative and high-barrier metallized films, including stripe and selective metallizing for clear windows and in-register effects.",
      "Our holographic films come metallized or clear on PET, BOPP, and PVC, adding a robust anti-counterfeit layer and a premium look on shelf."
    ],
    capabilities: [
      {
        title: "Multi-Layer Extrusion",
        text: "Co-extruded PE, LDPE, and LLDPE in custom layer builds for lamination, pouch stock, and FFS roll stock."
      },
      {
        title: "Vacuum Metallizing",
        text: "MET PET, MET CPP, MET BOPP, and MET LDPE for decorative and high-barrier uses."
      },
      {
        title: "Patterned Metallizing",
        text: "Stripe and selective metallizing, plus a ZnS source for brilliant decorative holographic films."
      },
      {
        title: "Holographic Films",
        text: "Standard or custom holographic patterns, metallized or clear, on PET, BOPP, and PVC for premium and security packaging."
      }
    ],
    highlights: [
      { label: "Materials", value: "PE · LDPE · LLDPE · PET · BOPP · CPP" },
      { label: "Anti-counterfeit", value: "Custom holographic authentication" }
    ],
    relatedProducts: [
      { category: "plastic-films", product: "extrusion" },
      { category: "plastic-films", product: "metallization" },
      { category: "plastic-films", product: "holography" }
    ]
  },
  {
    slug: "flexible-packaging",
    name: "Flexible Packaging",
    description:
      "The heart of our business: high-barrier films, laminates, and pouches for major consumer brands around the world.",
    image: "/images/businesses/flexible-packaging.webp",
    tagline: "Printed films, finished pouches, and bags built to keep products safe and make brands stand out on shelf.",
    overview: [
      "Flexible packaging sits at the center of the group, where the work of every other unit comes together. Studio artwork, repro files, engraved cylinders, and extruded films all meet here to be printed, laminated, and converted into finished pouches, bags, and roll stock.",
      "Our rotogravure and flexo presses print up to 8 colors on any flexible material. Laminating lines combine layers to hit the barrier each product calls for, and converting lines turn out stand-up, flat-bottom, four-side-seal, center-seal, spout, shaped, and handle-bag formats, adding zippers, valves, tear notches, and hang holes where needed.",
      "We supply food, beverage, personal care, household, pharmaceutical, and industrial customers in the USA and in export markets, with one quality system covering the entire process."
    ],
    capabilities: [
      {
        title: "Gravure & Flexo Printing",
        text: "Up to 8 colors, plus special and metallic inks, on PET, BOPP, CPP, PE, kraft, and metallized films."
      },
      {
        title: "Laminating",
        text: "Solvent-based and solventless laminating for two- to four-ply structures with the oxygen and moisture barrier your product needs."
      },
      {
        title: "Pouch & Bag Converting",
        text: "Stand-up, flat-bottom, box, four-side-seal, center-seal, spout, and shaped die-cut pouches, along with kraft paper pouches and handle bags."
      },
      {
        title: "FFS Roll Stock",
        text: "Printed, laminated reels built to your form-fill-seal equipment, with registration and slitting to your specs."
      }
    ],
    highlights: [
      { label: "Formats", value: "13 pouch styles, plus bags and roll stock" },
      { label: "Colors", value: "Up to 8 + special and metallic" },
      { label: "Turnaround", value: "3 to 4 weeks from artwork sign-off" }
    ],
    relatedProducts: [
      { category: "pouches", product: "stand-up-pouch" },
      { category: "pouches", product: "flat-bottom-pouch" },
      { category: "pouches", product: "four-side-seal-pouch" },
      { category: "pouches", product: "spout-nozzle-pouch" }
    ]
  },
  {
    slug: "sustainable-packaging",
    name: "Sustainable Packaging",
    description:
      "Lower-impact packaging through recyclable mono-material builds, kraft paper formats, and designs that use less material.",
    image: "/images/products/kraft-paper-pouch-front.webp",
    tagline: "Packaging designed to use less material and tread lighter on the environment, without sacrificing protection, performance, or shelf appeal.",
    overview: [
      "Our sustainability work is about shrinking environmental impact while keeping the protection, strength, and print quality each product requires. Together with our packaging teams, we choose materials and structures that use less material and improve the odds of recycling.",
      "That covers recyclable mono-material packaging built on PE or PP, along with **kraft paper pouches and bread bags** for brands that want a paper-based option. We also develop **lightweight packaging** that cuts film usage without compromising seal strength or shelf life.",
      "Every project starts with the product and what it needs to stay protected. From there, we weigh the material, the production process, and recyclability to create flexible packaging that performs on shelf and has a sensible plan for end of life."
    ],
    capabilities: [
      {
        title: "Recyclable Mono-Material Laminates",
        text: "PE/PE and PP/PP builds made for today's recycling streams, with barrier coatings added where the product requires them."
      },
      {
        title: "Kraft Paper Packaging",
        text: "Kraft pouches and bread pouches, with windows and zippers available, for tea, coffee, bakery, and dry goods."
      },
      {
        title: "Using Less Material",
        text: "Thinner gauges and optimized layers reduce film weight per pack while keeping seal and drop performance intact."
      },
      {
        title: "Greener Carry Bags",
        text: "Paper-based and lower-material bag choices for retail and promotional needs."
      }
    ],
    highlights: [
      { label: "Approaches", value: "Mono-material · kraft · down-gauging" },
      { label: "Formats", value: "Pouches, bread bags, carry bags" },
      { label: "Priority", value: "Protect the product first, then cut the footprint" }
    ],
    relatedProducts: [
      { category: "pouches", product: "kraft-paper-pouch" },
      { category: "pouches", product: "kraft-paper-bread-pouch" },
      { category: "plastic-films", product: "extrusion" }
    ]
  }
];

export const getBusinessBySlug = (slug: string): Business | undefined =>
  businesses.find((b) => b.slug === slug);

export const otherBusinesses = (slug: string): Business[] =>
  businesses.filter((b) => b.slug !== slug);
