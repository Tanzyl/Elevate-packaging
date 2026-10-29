// Product catalogue — three categories: Printed Films, Plastic Films, Pouches.
// Rich copy reused from the legacy catalogue where it maps; new sub-items drafted.
// MOQ values marked "On request" are placeholders pending client confirmation.

export type ProductFeatureKey =
  | "hermetic-seal"
  | "zipper"
  | "vent-hole"
  | "hang-hole"
  | "tear-notch"
  | "spout"
  | "handle"
  | "metallized"
  | "multi-layer"
  | "security-print"
  | "custom-shape";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  summary: string;
  description: string[];
  applications: string[];
  features: ProductFeatureKey[];
  finishes?: ("Shine" | "Matt" | "Metallize")[];
  specs: Spec[];
  moq?: string;
  leadTime?: string;
  gallery?: string[];
};

export type ProductCategory = {
  slug: string;
  name: string;
  intro: string;
  products: Product[];
};

/* ============================================================
   Shared attribute bundles — reused across products
   ============================================================ */

const FINISHES_ALL = ["Shine", "Matt", "Metallize"] as const;

const COMMON_FILM_SPECS: Spec[] = [
  { label: "Print process", value: "Rotogravure or flexographic · as many as 8 colors" },
  { label: "Base films", value: "PET · BOPP · PE · CPP · LDPE" },
  { label: "Maximum web width", value: "1600 mm" },
  { label: "Slitting speed", value: "As fast as 400 m/min" }
];

const COMMON_POUCH_SPECS: Spec[] = [
  { label: "Print", value: "Custom artwork in as many as 8 colors" },
  { label: "Structure", value: "Multi-layer laminate, standard or high barrier" },
  { label: "Sealing", value: "Heat-sealable across every pouch style" },
  { label: "Finish options", value: "Shine · Matt · Metallize" }
];

const DEFAULT_MOQ = "25,000 pieces";
const DEFAULT_LEAD_TIME = "3–4 weeks from artwork sign-off";

/* ============================================================
   1 · Printed Films (2)
   ============================================================ */

const printedFilms: ProductCategory = {
  slug: "printed-films",
  name: "Printed Films",
  intro:
    "Our printed films run on **rotogravure and flexographic presses** in as many as 8 colors, so even intricate package artwork comes through sharp.\n\nArtwork goes straight onto a range of flexible substrates, and we hold color, imagery, and fine type steady from roll to roll. From a clean single-color mark to full photographic product art, we tune the print to your packaging specs and the shelf look your brand is after.",
  products: [
    {
      slug: "rotogravure",
      name: "Rotogravure",
      categorySlug: "printed-films",
      summary:
        "In rotogravure, artwork is engraved into metal cylinders that lay ink down onto flexible film. It shines on high-volume jobs where color and fine detail have to look identical at the start and the end of the run.",
      description: [
        "With up to **8 color stations**, our presses deliver crisp imagery, even gradients, and dense solid fills. The method handles a variety of flexible substrates and keeps the finished print faithful to your approved proof for the entire production run.",
      ],
      applications: [
        "Food Packaging: Handles intricate graphics for snacks, cookies, spices, candy, coffee, and many other food items.",
        "Beverage Packaging: A fit for tea, drink powders, and similar products that rely on sharp imagery and clear on-pack information.",
        "Personal Care Packaging: Works for select personal care lines that call for detailed branding and product copy.",
        "Retail Packaging: Ideal when a design layers rich artwork, bold color, product photography, and several graphic elements."
      ],
      features: ["multi-layer", "security-print"],
      specs: [
        ...COMMON_FILM_SPECS,
        { label: "Method", value: "Engraved-cylinder rotogravure" },
        { label: "Colors", value: "Up to 8, plus specialty and metallic inks" }
      ],
      moq: "On request",
      leadTime: DEFAULT_LEAD_TIME,
      gallery: ["/images/products/rotogravure-film.webp"]
    },
    {
      slug: "flexography",
      name: "Flexography",
      categorySlug: "printed-films",
      summary:
        "Flexo printing strikes a smart balance of print quality, speed, and cost for brands that want all three.",
      description: [
        "Flexible plates print directly onto the packaging film, producing clean graphics, solid color, logos, and product copy. Because setup is quicker than with some other methods, flexo is a strong match for mid-size runs where brands need productive output without long changeovers.",
      ],
      applications: [
        "Food Packaging: A fit for snacks, spices, cookies, dry goods, and other everyday food items.",
        "Household Products: Suits select cleaning and home-care packaging.",
        "Retail Packaging: Delivers clear branding, product details, and graphics on flexible film.",
        "General Consumer Packaging: A cost-conscious choice for repeat production that needs dependable, consistent print."
      ],
      features: ["multi-layer"],
      specs: [
        ...COMMON_FILM_SPECS,
        { label: "Method", value: "Plate-based flexographic" },
        { label: "Colors", value: "Up to 8" }
      ],
      moq: "On request",
      leadTime: DEFAULT_LEAD_TIME,
      gallery: ["/images/products/flexography-film.webp"]
    }
  ]
};

/* ============================================================
   2 · Plastic Films (3)
   ============================================================ */

const plasticFilms: ProductCategory = {
  slug: "plastic-films",
  name: "Plastic Films",
  intro:
    "When a flexible package has to be tough, seal reliably, and shield what's inside, the film underneath matters. Elevate produces multi-layer plastic films in a variety of finishes, including barrier grades, for a wide spread of packaging uses.\n\nIn-house **extrusion, metallization, and holographic capabilities** let brands fine-tune both how a package performs and how it looks. We match the film build to your product, your filling line, and the shelf life you need.",
  products: [
    {
      slug: "extrusion",
      name: "Film Extrusion",
      categorySlug: "plastic-films",
      summary:
        "Through **film extrusion**, we produce multi-layer films built around specific flexible packaging needs. Each film can be engineered for the right combination of toughness, flexibility, sealability, and barrier.",
      description: [
        "How a film is built comes down to its end use. Some are designed as **lamination** layers, while others ship as **FFS roll stock** for form-fill-seal lines. That way, the material lines up with your product, your packaging equipment, and the way the pack gets handled.",
        "Custom layer designs provide the barrier, stiffness, and seal strength each job calls for, whether it's lamination film or FFS roll stock."
      ],
      applications: [
        "Lamination Films: Serve as one layer within multi-ply structures that bond several films together for better performance.",
        "FFS Packaging: Built for form-fill-seal lines, where film must track smoothly through the machine and seal cleanly.",
        "Food Packaging: Fits many dry and packaged foods that need strength along with the right barrier properties.",
        "Industrial & Consumer Packaging: Multi-layer films can also be produced for select goods that demand tough packaging and dependable seals."
      ],
      features: ["multi-layer"],
      specs: [
        ...COMMON_FILM_SPECS,
        { label: "Base films", value: "PE · LDPE · LLDPE · multi-layer co-extrusion" },
        { label: "Layer count", value: "Single-layer through multi-layer builds" }
      ],
      gallery: ["/images/products/extrusion-film.webp"],
      moq: "On request",
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "holography",
      name: "Holography",
      categorySlug: "plastic-films",
      summary:
        "Holographic film gives packaging a striking finish that is also tough to counterfeit. Shifting light effects and bold patterns help products catch the eye on a crowded shelf.",
      description: [
        "For brands that want an extra **authentication** safeguard, we can build custom holographic elements unique to their packaging. Because those details are brand-specific, genuine packs are easier to verify and suspicious copies are easier to flag.",
        "We offer holographic film in **metallized and transparent versions**, using either stock patterns or custom artwork. Depending on the application, it can be supplied on **PET, LDPE, or BOPP** substrates."
      ],
      applications: [
        "Brand Protection: A strong choice when verifying authentic packaging and deterring counterfeits is a priority.",
        "Premium Consumer Products: The holographic effect gives select retail packaging a more memorable finish.",
        "Pharmaceutical Packaging: An option for select pharmaceutical packs that call for authentication features.",
        "Labels & Promotional Packaging: Great for labels and packs where an eye-catching visual effect is central to the design."
      ],
      features: ["metallized", "security-print", "multi-layer"],
      specs: [
        ...COMMON_FILM_SPECS,
        { label: "Film options", value: "Holographic PET · LDPE · BOPP" },
        { label: "Customization", value: "Brand-specific colors and holographic patterns" }
      ],
      gallery: ["/images/products/holography-film.webp"],
      moq: "On request",
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "metallization",
      name: "Metallization",
      categorySlug: "plastic-films",
      summary:
        "A metallized film is a plastic film carrying an ultra-thin metal coating. The result is a bright metallic look plus added barrier against light, moisture, and oxygen.",
      description: [
        "At Elevate, films are metallized in a **vacuum chamber** to serve a broad mix of flexible packaging applications.",
        "Finish choices include **stripe and selective metallization**, and a ZnS source is used for decorative holographic films. Depending on the material and job, line speeds run as high as **400 m/min**."
      ],
      applications: [
        "Snacks and Other Food Packaging: Helps protect snacks, candy, coffee, and similar foods where blocking light and moisture really matters.",
        "Coffee and Tea: A dependable material when the pack must keep out light and other environmental factors.",
        "Decorative Packaging: The metallic layer elevates the look of select retail packs.",
        "Holographic Packaging: Selective metallization combined with ZnS technology produces decorative holographic effects."
      ],
      features: ["metallized", "multi-layer", "security-print"],
      specs: [
        ...COMMON_FILM_SPECS,
        { label: "Metallized films", value: "MET PET · MET CPP · MET BOPP · MET LDPE" },
        { label: "Metallizing speed", value: "As fast as 400 m/min, metal on film" }
      ],
      gallery: ["/images/products/metallization-film.webp"],
      moq: "On request",
      leadTime: DEFAULT_LEAD_TIME
    }
  ]
};

/* ============================================================
   3 · Pouches (9)  — incl. kraft-paper-bread, kraft-paper
   ============================================================ */

const pouches: ProductCategory = {
  slug: "pouches",
  name: "Pouches",
  intro:
    "Heat-sealable, high-barrier pouches across all the key formats: center-seal, flat-bottom, box, four-side-seal, stand-up, spouted, shaped, and kraft. Every style can be built multi-layer and printed in as many as 8 colors.",
  products: [
    {
      slug: "centre-seal-pouch",
      name: "Centre Seal",
      categorySlug: "pouches",
      summary:
        "Center seal bags are a straightforward, no-fuss format for light and mid-weight products. A sturdy seam runs down the center of the back for a tidy finish, and the bag can be produced in a range of materials to match what you're packing.",
      description: [
        "Custom center seal bags can be fitted with vent holes, hang holes, a choice of bottom seals, and metallized film. When a product calls for more protection, strength, or barrier, we can step up to a multi-layer structure."
      ],
      applications: [
        "Snacks & Biscuits: An easy, efficient pack for chips, crackers, cookies, and other light snack items.",
        "Spices & Seasonings: A natural fit for ground spices, seasoning blends, and dry ingredients that need simple packaging.",
        "Seeds & Dry Agricultural Products: Handy for seeds and other light agricultural goods in small to mid-size packs.",
        "Powders & Dry Mixes: Convenient for flour, drink mixes, baking ingredients, and comparable dry goods.",
        "Household Products: Also works for light household and consumer items that need a basic, easy-to-grab bag."
      ],
      features: ["vent-hole", "hang-hole", "tear-notch", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Build", value: "Back seam sealed down the center" }
      ],
      gallery: ["/images/products/centre-seal-pouch-front.webp"],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "flat-bottom-pouch",
      name: "Flat Bottom Pouch",
      categorySlug: "pouches",
      summary:
        "With its crisp, box-style profile, a flat bottom pouch stands tall and tidy on the shelf. The upscale look makes it a favorite for coffee, tea, sweets, and other food products.",
      description: [
        "A flat base keeps the pack steady and opens up extra panel space for branding and product details. Based on your product and packing needs, we can build it with side gussets, a flat-bottom box structure, or a pinch bottom, using a variety of films and multi-layer structures."
      ],
      applications: [
        "Coffee & Tea: A top pick for premium coffee and tea, pairing a steady base with generous branding space.",
        "Confectionery: Great for chocolate, candy, and other treats where eye-catching shelf presence counts.",
        "Nuts & Dry Fruits: Its upright stance suits nuts, seeds, and dried fruit and gives the pack a polished, premium feel.",
        "Specialty Food Products: Fits many premium dry foods where a stable pouch and bold shelf impact add value."
      ],
      features: ["hermetic-seal", "zipper", "vent-hole", "hang-hole", "tear-notch", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Base options", value: "Side gusseted · Flat bottom box · Pinch bottom" },
        { label: "Rounded corners", value: "Offered on request" }
      ],
      gallery: ["/images/products/flat-bottom-pouch-front.webp"],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "box-pouch",
      name: "Box Pouch",
      categorySlug: "pouches",
      summary:
        "A sturdy, box-shaped pouch with a square footprint and sharp edges that gives products a structured, premium look on the shelf.",
      description: [
        "A square base combined with firm side panels lets the box pouch stand like a carton, giving you the most facing area possible for branding in a premium, structured pack. It comes with full barrier, heat-seal, and finish choices, plus an optional zipper and tear notch for easy everyday resealing.",
        "Its crisp silhouette grabs attention while leaving plenty of room for brand and product information. Choose it when you want the presence of a box with the flexibility of a pouch. Materials and finishes can be selected to suit your product and packaging specs."
      ],
      applications: [
        "Coffee & Tea: The structured form lends premium coffee and tea a bold presence with ample branding space.",
        "Nuts & Dry Fruits: A smart format for nuts, seeds, and dried fruit when a firm shape and solid protection matter.",
        "Snacks & Confectionery: The carton-like build gives snacks and candy a standout look and more visible brand area.",
        "Pet Food: Fits select pet food sizes where a structured pouch makes handling easy and looks upscale."
      ],
      features: ["zipper", "tear-notch", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Build", value: "Square-base, box-style structure" }
      ],
      gallery: ["/images/products/box-pouch-front.webp"],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "four-side-seal-pouch",
      name: "Four Side Seal",
      categorySlug: "pouches",
      summary:
        "Built for heavier fills, the **four-side seal pouch** carries up to 20 kg. Its **side-gusseted design** adds capacity and opens up more surface for branding and product details.",
      description: [
        "Thanks to its **four-panel build**, the pouch holds a firm, defined shape and puts more of its surface to work. Depending on what you're packing and how, it can be ordered with a **square bottom, four-side seal, or crimp bottom**."
      ],
      applications: [
        "Rice & Grains: Built for heavier packs of rice, grain, and other dry foods where strength and handling count.",
        "Pet Food: A smart choice for large pet food bags that need a rugged build and easy handling.",
        "Agricultural Products: Good for seed, feed, and other farm goods that need tougher packaging through storage and shipping.",
        "Powders & Dry Goods: Works for bulk packs of flour, powders, and other dry products."
      ],
      features: ["hermetic-seal", "zipper", "vent-hole", "hang-hole", "tear-notch", "handle", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Fill capacity", value: "As much as 20 kg per pouch" },
        { label: "Base options", value: "Side gusseted · Square bottom · Four-side seal · Crimp" }
      ],
      gallery: [
        "/images/products/four-side-seal-pouch-front.webp",
        "/images/products/four-side-seal-pouch-02.webp"
      ],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "stand-up-pouch",
      name: "Standup Pouch",
      categorySlug: "pouches",
      summary:
        "This pouch holds itself upright on the shelf, which makes it a go-to format for retail and everyday goods.",
      description: [
        "We make stand-up pouches in **bottom-gusseted, K-Seal, and DayPack** styles, chosen around your product and how it gets filled. Standing tall gives the pack a neat profile and a generous face for branding and product details.",
        "Add-ons include a **zipper, vent hole, hang hole, tear notch, metallized film, and multi-layer film structures.** Pick the ones that fit your product, filling line, and packaging needs."
      ],
      applications: [
        "Coffee and tea: Valve-ready builds that help lock in aroma.",
        "Nuts and snacks: Moisture protection that keeps texture and crunch intact.",
        "Powders and supplements: Reliable seals that run smoothly on filling lines.",
        "Cosmetics and personal care: High-end graphics paired with handy reclosable features."
      ],
      features: ["hermetic-seal", "zipper", "vent-hole", "hang-hole", "tear-notch", "handle", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Styles", value: "Bottom gusseted · K-Seal · DayPack" },
        { label: "Reclosure", value: "Zipper that opens and closes easily with a satisfying click" }
      ],
      gallery: [
        "/images/products/stand-up-pouch-front.webp",
        "/images/products/stand-up-pouch-02.webp"
      ],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "spout-nozzle-pouch",
      name: "Spout/Nozzle Pouch",
      categorySlug: "pouches",
      summary:
        "A stand-up pouch fitted with an integrated spout so products pour or dispense with ease. It's a convenient choice for liquids, purées, sauces, and refills.",
      description: [
        "Because it stands on its own, the pouch is simple to carry, store, and use. The spout gives shoppers control over how much comes out, and we can select the film structure to match the product and how it will be stored.",
        "For refills, a **spout pouch** makes a practical swap for a rigid bottle. In some uses it requires less packaging material, and it occupies less room in the warehouse and on the truck."
      ],
      applications: [
        "Sauces & Condiments: Good for ketchup, cooking sauces, syrups, and other pourable foods.",
        "Fruit Purées: Well suited to fruit purées and other soft foods where measured dispensing matters.",
        "Baby Food: An option for some purées and ready-to-serve baby foods.",
        "Personal Care Products: Fits liquid soap, shampoo, conditioner, and comparable products.",
        "Refill Packs: An easy way to sell refills for bottles and other containers.",
        "Household Liquids: Works for select liquid cleaners and home-care products."
      ],
      features: ["hermetic-seal", "spout", "handle", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Spout options", value: "Range of diameters · Tamper-evident closures" }
      ],
      gallery: [
        "/images/products/spout-nozzle-pouch-front.webp",
        "/images/products/spout-nozzle-pouch-02.webp"
      ],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "shaped-die-cut-pouch",
      name: "Shaped/Die-Cut Pouch",
      categorySlug: "pouches",
      summary:
        "A die-cut pouch trimmed to a custom outline, giving your package a silhouette all its own.",
      description: [
        "Rather than sticking to a standard outline, a **shaped pouch** can be cut to echo a design concept, the product itself, or a brand idea. The result looks distinctive while keeping everything that makes flexible packaging practical.",
        "We build these pouches with the **heat-seal and barrier options** your product requires. Size, shape, finish, and opening features are all open to discussion based on your packaging and filling needs."
      ],
      applications: [
        "Sweets: A custom outline helps candy packaging grab attention where design drives the sale.",
        "Kids' Snacks & Treats: Playful shapes make the pouch pop and give children's products their own character.",
        "Personal Care: Works for select cosmetics, personal care items, and samples where an unusual shape reinforces the brand.",
        "Specialty Food Products: Ideal when a product deserves a more individual look than a standard pouch offers.",
        "Promotional & Limited-Edition Packs: Die-cut pouches suit special promotions, seasonal packs, and product launches."
      ],
      features: ["zipper", "hang-hole", "tear-notch", "custom-shape", "metallized", "multi-layer"],
      finishes: [...FINISHES_ALL],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Outline", value: "Die-cut entirely to your specs" }
      ],
      gallery: [
        "/images/products/shaped-die-cut-pouch-1.webp",
        "/images/products/shaped-die-cut-pouch-2.webp",
        "/images/products/shaped-die-cut-pouch-3.webp",
        "/images/products/shaped-die-cut-pouch-4.webp",
        "/images/products/shaped-die-cut-pouch-5.webp",
        "/images/products/shaped-die-cut-pouch-6.webp",
        "/images/products/shaped-die-cut-pouch-7.webp",
        "/images/products/shaped-die-cut-pouch-8.webp"
      ],
      moq: DEFAULT_MOQ,
      leadTime: "4–6 weeks, including die making and production"
    },
    {
      slug: "kraft-paper-bread-pouch",
      name: "Kraft Paper Bread Pouch",
      categorySlug: "pouches",
      summary:
        "A no-frills kraft paper bag for bread and baked goods, with a see-through window that shows off what's inside.",
      description: [
        "The **kraft paper bread pouch** gives loaves an earthy, fresh-from-the-bakery appearance. It's designed to breathe the way bakery packaging should, while still keeping bread covered as it's handled and displayed. Shoppers can check the loaf through the clear window before they buy.",
        "Closure styles can be chosen to match how the bread is bagged and sold. It's also a good option for bakeries looking to replace a plain plastic bread bag with something that has a classic paper feel."
      ],
      applications: [
        "Sliced Bread: A sensible choice for everyday sliced and sandwich loaves.",
        "Burger Buns & Rolls: Fits burger buns, dinner rolls, and similar baked goods.",
        "Artisan Bread: Pairs well with sourdough, rustic loaves, and other specialty breads that suit a kraft look.",
        "Bakery Products: Also works for select baked goods that need a simple paper-style pack with a view of the product."
      ],
      features: ["vent-hole", "tear-notch", "multi-layer"],
      finishes: ["Matt"],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Material", value: "Breathable kraft paper" },
        { label: "Window", value: "See-through panel for the loaf" }
      ],
      gallery: [
        "/images/products/kraft-paper-bread-pouch-cover.webp",
        "/images/products/kraft-paper-bread-pouch-front.webp"
      ],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
    {
      slug: "kraft-paper-pouch",
      name: "Kraft Paper Pouch",
      categorySlug: "pouches",
      summary:
        "A kraft paper pouch with a clean, earthy look for dry foods and everyday retail goods.",
      description: [
        "The **kraft paper pouch** pairs a kraft paper exterior with a protective inner lining. Shoppers see a paper package, while the lining helps safeguard the product in storage and handling. We produce it as a **stand-up or flat pouch**, depending on the product and how it's packed.",
        "Add a **window** if you want shoppers to see what's inside, and a **zipper or tear notch** for easier opening. Printing in up to **8 colors** leaves plenty of room for your logo, product name, ingredients, and other details."
      ],
      applications: [
        "Coffee & Tea: Fits coffee, loose tea, and other dry beverage products.",
        "Nuts & Dry Fruits: A good match for almonds, cashews, dates, raisins, and the like.",
        "Spices & Herbs: Works for spices, herbs, seasoning blends, and other dry ingredients.",
        "Biscuits & Dry Snacks: Suits cookies, crackers, granola, and similar dry foods.",
        "Pet Treats: A sensible pick for select dry pet treats and small retail packs."
      ],
      features: ["zipper", "tear-notch", "hang-hole", "multi-layer"],
      finishes: ["Matt"],
      specs: [
        ...COMMON_POUCH_SPECS,
        { label: "Material", value: "Kraft paper over a barrier lining" },
        { label: "Configurations", value: "Stand-up or flat · Window · Zipper" }
      ],
      gallery: [
        "/images/products/kraft-paper-pouch-front.webp",
        "/images/products/kraft-paper-pouch-front-2.webp"
      ],
      moq: DEFAULT_MOQ,
      leadTime: DEFAULT_LEAD_TIME
    },
  ]
};

/* ============================================================
   Exports
   ============================================================ */

export const catalog: ProductCategory[] = [printedFilms, plasticFilms, pouches];

export const allProducts: Product[] = catalog.flatMap((c) => c.products);

export const productBySlug = (
  categorySlug: string,
  slug: string
): Product | undefined => {
  const cat = catalog.find((c) => c.slug === categorySlug);
  return cat?.products.find((p) => p.slug === slug);
};

export const categoryBySlug = (slug: string): ProductCategory | undefined =>
  catalog.find((c) => c.slug === slug);

/* ============================================================
   Feature key -> label mapping (icons resolved in the detail template)
   ============================================================ */

export const featureLabels: Record<ProductFeatureKey, string> = {
  "hermetic-seal": "Airtight hermetic seal",
  zipper: "Resealable zipper",
  "vent-hole": "Vent hole",
  "hang-hole": "Hang hole",
  "tear-notch": "Tear notch",
  spout: "Pour spout",
  handle: "Carry handle",
  metallized: "Metallized film",
  "multi-layer": "Multi-layer build",
  "security-print": "Security print",
  "custom-shape": "Custom shape"
};
