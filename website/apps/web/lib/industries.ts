// Industries served — grouped categorization. Drives the "Industries" nav
// mega-menu and the /industries page. Each item anchors to its section via `slug`.

export type IndustryGroup =
  | "Food & Beverage"
  | "Consumer Goods"
  | "Industrial & Agricultural"
  | "Retail & Manufacturing";

export type Industry = {
  slug: string;
  name: string;
  group: IndustryGroup;
  blurb: string;
  detailContent?: {
    challenge: string;
    approach: string;
    approachBold?: string | string[];
    features: { title: string; description: string }[];
  };
  // Local photos under /images/industries/. First image is the primary (used in
  // the mega-menu preview + as the industries-page card image); additional images
  // render as a hover-swap on the card. Falls back to a stock image when absent.
  images?: string[];
};

export const industryGroups: IndustryGroup[] = [
  "Food & Beverage",
  "Consumer Goods",
  "Industrial & Agricultural",
  "Retail & Manufacturing"
];

export const industries: Industry[] = [
  // ---- Food & Beverage ----
  {
    slug: "rice-packaging",
    name: "Rice Packaging",
    group: "Food & Beverage",
    blurb:
      "Every grain guarded, from the filling line to the dinner table.",
    detailContent: {
      challenge:
        "A rice bag goes through a lot: filling, shipping, warehouse stacking, and time on the store shelf, and it can't split or lose its seal at any stage. Brands packing basmati, jasmine, or long-grain rice also need crisp graphics and a build that stays strong across small and bulk sizes.",
      approach:
        "For rice, Elevate works with laminated structures built on BOPP and PET, choosing the material based on bag size, fill method, and how the pack will be handled. Reinforced seals, carry handles, and premium print can be built in wherever the product calls for them.",
      approachBold: "laminated structures built on BOPP and PET",
      features: [
        {
          title: "Strong Seals",
          description: "Keeps the bag closed tight through every touchpoint"
        },
        {
          title: "BOPP & PET Films",
          description: "Proven film choices for rice of every kind"
        },
        {
          title: "Easy Handling",
          description: "Carry options for heavier bulk bags"
        },
        {
          title: "Clear Printing",
          description: "Crisp artwork that holds up at retail"
        }
      ]
    },
    images: [
      "/images/industries/rice-packaging-FC.webp",
      "/images/industries/rice-packaging-01.webp",
      "/images/industries/rice-packaging-02.webp",
      "/images/industries/rice-packaging-04.webp",
      "/images/industries/rice-packaging-05.webp",
      "/images/industries/rice-packaging-06.webp",
      "/images/industries/rice-packaging-07.webp",
      "/images/industries/rice-packaging-08.webp",
      "/images/industries/rice-packaging-09.webp",
      "/images/industries/rice-packaging-10.webp"
    ]
  },
  {
    slug: "snacks-confectionery-packaging",
    name: "Snacks & Confectionery Packaging",
    group: "Food & Beverage",
    blurb:
      "Locking in the crunch, the color, and the taste.",
    detailContent: {
      challenge:
        "Moisture, oxygen, light, and a flimsy wrapper are all enemies of chips, wafers, chocolate, and candy, and any one of them can turn a fresh product stale. On top of that, the bag has to grab a shopper's eye in a crowded snack aisle.",
      approach:
        "Elevate builds snack and candy packaging from metallized and high-barrier films matched to each product. These structures keep freshness sealed in and give brands a smooth, print-ready surface for rich, detailed artwork.",
      approachBold: "snack and candy packaging",
      features: [
        {
          title: "Barrier Protection",
          description: "Shields snacks against oxygen and humidity"
        },
        {
          title: "Freshness",
          description: "Keeps quality steady while the product sits in storage"
        },
        {
          title: "Metallized Films",
          description: "Extra protection plus a bright, reflective look"
        },
        {
          title: "High-Impact Print",
          description: "Bold artwork built for the snack aisle"
        }
      ]
    },
    images: [
      "/images/industries/snacks-confectionery-packaging-FC.webp",
      "/images/industries/snacks-confectionery-packaging-01.webp",
      "/images/industries/snacks-confectionery-packaging-02.webp",
      "/images/industries/snacks-confectionery-packaging-03.webp",
      "/images/industries/snacks-confectionery-packaging-04.webp",
      "/images/industries/snacks-confectionery-packaging-07.webp"
    ]
  },
  {
    slug: "pink-salt-packaging",
    name: "Pink Salt Packaging",
    group: "Food & Beverage",
    blurb:
      "Dry, free-flowing salt from the warehouse to the shelf.",
    detailContent: {
      challenge:
        "Himalayan pink salt pulls moisture from the air during storage and shipping, which leads to clumping and messy handling. Shoppers also expect a specialty salt to look the part, so the pack has to protect the product and still present the brand as premium.",
      approach:
        "Elevate packs pink salt in moisture-barrier pouches and stand-up styles designed for grocery, specialty, and online retail. Sizes and finishes are flexible, and sharp, detailed print keeps labeling and brand artwork easy to read.",
      features: [
        {
          title: "Moisture Protection",
          description: "Keeps salt dry and free-flowing in storage and transit"
        },
        {
          title: "Stand-Up Formats",
          description: "A shelf-friendly pack that displays well"
        },
        {
          title: "Premium Printing",
          description: "Brand artwork and label details stay crisp"
        },
        {
          title: "Shipping-Ready Packs",
          description: "Built with warehousing and long hauls in mind"
        }
      ]
    },
    images: [
      "/images/industries/pink-salt-packaging-FC.webp",
      "/images/industries/pink-salt-packaging-01.webp",
      "/images/industries/pink-salt-packaging-02.webp",
      "/images/industries/pink-salt-packaging-03.webp",
      "/images/industries/pink-salt-packaging-04.webp"
    ]
  },
  {
    slug: "frozen-food-packaging",
    name: "Frozen Food Packaging",
    group: "Food & Beverage",
    blurb:
      "Packaging that stays tough at sub-zero temperatures.",
    detailContent: {
      challenge:
        "Frozen foods put packaging through deep cold, freeze cycles, cold storage, and constant handling. Any weakness in the film or seal tends to show up somewhere between the plant, the grocery freezer case, and the shopper's kitchen.",
      approach:
        "Elevate specifies multi-layer films for frozen applications, focusing on film toughness, seal integrity, and how the material behaves at low temperatures. These packs suit meat, poultry, frozen vegetables, and ready-to-heat meals.",
      approachBold: "multi-layer films",
      features: [
        {
          title: "Cold Resistance",
          description: "Films chosen to perform in freezer conditions"
        },
        {
          title: "Strong Seals",
          description: "Keeps packs closed through repeated handling"
        },
        {
          title: "Multi-Layer Films",
          description: "Each layer adds a specific performance property"
        },
        {
          title: "Clear Printing",
          description: "Labels and cooking details stay easy to read."
        }
      ]
    },
    images: [
      "/images/industries/frozen-food-packaging.webp",
      "/images/industries/frozen-food-packaging-02.webp",
      "/images/industries/frozen-food-packaging-03.webp"
    ]
  },
  {
    slug: "spices-pulses-packaging",
    name: "Spices & Pulses Packaging",
    group: "Food & Beverage",
    blurb:
      "Holding on to the aroma and flavor that make each blend.",
    detailContent: {
      challenge:
        "Spices fade fast, losing aroma, color, and potency in storage, while dried beans and lentils need a pack that stands up to filling, freight, and kitchen-cabinet handling. If the seal isn't right, air and humidity will get to any dry product.",
      approach:
        "Elevate packs spices, beans, and lentils in high-barrier pouches finished with secure seals to keep contents protected. For products used a little at a time, a zipper can be added so the pouch closes again easily after every use.",
      approachBold: "high-barrier pouches",
      features: [
        {
          title: "Aroma Protection",
          description: "Keeps the natural scent of spices sealed in"
        },
        {
          title: "High-Barrier Films",
          description: "Guards dry goods against humidity and air"
        },
        {
          title: "Strong Seals",
          description: "Keeps pouches shut through storage and handling"
        },
        {
          title: "Zipper Option",
          description: "Lets opened pouches close up again for later use"
        }
      ]
    },
    images: [
      "/images/industries/spices-pulses-packaging-FC.webp",
      "/images/industries/spices-pulses-packaging-03.webp",
      "/images/industries/spices-pulses-packaging-04.webp"
    ]
  },
  {
    slug: "tea-packaging",
    name: "Tea Packaging",
    group: "Food & Beverage",
    blurb:
      "Protecting the flavor of every brew.",
    detailContent: {
      challenge:
        "Air, humidity, and light all wear down the aroma and freshness of tea. The pack has to keep the leaves protected on the shelf and in the pantry, and still leave room for clean labeling and attractive artwork.",
      approach:
        "Elevate uses barrier laminates for tea so outside exposure stays out and aroma stays in. Loose-leaf and specialty teas can also get resealable zippers and foil finishes, depending on the pack design and what the product needs.",
      approachBold: ["barrier laminates for tea", "resealable zippers and foil finishes"],
      features: [
        {
          title: "Aroma Protection",
          description: "Keeps the tea's natural fragrance inside"
        },
        {
          title: "Barrier Laminates",
          description: "Blocks humidity, oxygen, and light"
        },
        {
          title: "Resealable Zipper",
          description: "Closes the pack again after each use"
        },
        {
          title: "Foil Finish",
          description: "A polished look that also adds light protection"
        }
      ]
    },
    images: [
      "/images/industries/tea-packaging-FC.webp",
      "/images/industries/tea-packaging-02.webp",
      "/images/industries/tea-packaging-04.webp",
      "/images/industries/tea-packaging-05.webp"
    ]
  },
  {
    slug: "milk-packaging",
    name: "Milk Packaging",
    group: "Food & Beverage",
    blurb:
      "Fresh from the fill line to the final pour.",
    detailContent: {
      challenge:
        "Milk and other dairy products need protection through filling, cold storage, and distribution. Seals have to be dependable enough to stop leaks, and the pack should stay easy to open and pour in everyday use.",
      approach:
        "For dairy, Elevate uses high-barrier film structures, choosing the material to suit the product and the filling process. Leak-resistant seals can be paired with pour spouts when the pack needs to dispense cleanly.",
      approachBold: ["high-barrier film structures", "pour spouts"],
      features: [
        {
          title: "Barrier Protection",
          description: "Shields dairy from outside exposure"
        },
        {
          title: "Reliable Seals",
          description: "Lowers the chance of leaks in handling"
        },
        {
          title: "Easy Pouring",
          description: "Spouts make dispensing cleaner and simpler."
        },
        {
          title: "Dairy Packaging",
          description: "Film builds matched to milk and other dairy products."
        }
      ]
    },
    images: [
      "/images/industries/milk-packaging-FC.webp",
      "/images/industries/milk-packaging.webp",
      "/images/industries/milk-packaging-03.webp",
      "/images/industries/milk-packaging-05.webp"
    ]
  },
  {
    slug: "grains-packaging",
    name: "Grains Packaging",
    group: "Food & Beverage",
    blurb:
      "Heavy-duty packs for products with real heft.",
    detailContent: {
      challenge:
        "Flour, wheat, and other grains often ship in bigger sizes, so the pack has to carry the weight and survive filling, freight, and repeated handling. It also needs a dependable seal and clear labeling so the product stays protected and easy to recognize.",
      approach:
        "Elevate makes grain packaging from tough, printable films in pouch or bag formats sized to the product. Secure seals and carry handles can be added so bigger packs are easier to move from the store aisle to the kitchen.",
      approachBold: ["grain packaging", "Secure seals and carry handles"],
      features: [
        {
          title: "Strong Packaging",
          description: "Built to carry the weight of grain products"
        },
        {
          title: "Reliable Seals",
          description: "Keeps every bag firmly closed"
        },
        {
          title: "Clear Printing",
          description: "Room for brand artwork and product details"
        },
        {
          title: "Carrying Handles",
          description: "Makes heavy bags easier to lift and carry"
        }
      ]
    },
    images: [
      "/images/industries/grains-packaging-FC.webp",
      "/images/industries/grains-packaging-01.webp",
      "/images/industries/grains-packaging-02.webp",
      "/images/industries/grains-packaging-03.webp",
      "/images/industries/grains-packaging-06.webp"
    ]
  },
  {
    slug: "ice-cream-packaging",
    name: "Ice Cream Packaging",
    group: "Food & Beverage",
    blurb:
      "Freezer-tough packaging for every frozen treat.",
    detailContent: {
      challenge:
        "Ice cream packs live at extremely low temperatures and still have to keep moisture and outside exposure away from the product. They need to look good and hold together through freezing, cold storage, shipping, and time in the freezer aisle.",
      approach:
        "Elevate supplies ice cream packaging in film options that resist moisture and perform in deep cold. It works for tubs, novelty bars, and other frozen desserts, with printing that keeps product and brand information sharp.",
      approachBold: "ice cream packaging",
      features: [
        {
          title: "Low-Temperature Performance",
          description: "Films designed for freezer conditions"
        },
        {
          title: "Moisture Protection",
          description: "Keeps condensation and humidity off the product"
        },
        {
          title: "Flexible Film Options",
          description: "Works across a range of frozen dessert formats"
        },
        {
          title: "Clear Printing",
          description: "Product imagery and branding stay vivid on the pack"
        }
      ]
    },
    images: [
      "/images/industries/ice-cream-packaging-FC.webp",
      "/images/industries/ice-cream-packaging-01.webp",
      "/images/industries/ice-cream-packaging-02.webp",
      "/images/industries/ice-cream-packaging-03.webp"
    ]
  },
  {
    slug: "bakery-packaging",
    name: "Bakery Packaging",
    group: "Food & Beverage",
    blurb:
      "Fresh from the oven and ready for the shelf.",
    detailContent: {
      challenge:
        "Breads, cookies, crackers, and other baked goods need protection from the moment they cool through storage and delivery. With see-through packs, condensation can fog the film and hide the product from shoppers.",
      approach:
        "Elevate offers bakery packaging in clear films and pouch styles suited to many baked goods. Anti-fog treatments keep the window clear when moisture forms inside, and the film structure is chosen to match the product and packing line.",
      approachBold: ["bakery packaging", "Anti-fog treatments"],
      features: [
        {
          title: "Clear Visibility",
          description: "Shows off the baked goods inside"
        },
        {
          title: "Anti-Fog Option",
          description: "Cuts down on fogging from condensation"
        },
        {
          title: "Product Protection",
          description: "Keeps baked goods covered in storage and transit"
        },
        {
          title: "Flexible Formats",
          description: "Fits breads, cookies, crackers, and more"
        }
      ]
    },
    images: [
      "/images/industries/bakery-packaging-FC.webp",
      "/images/industries/bakery-packaging-01.webp",
      "/images/industries/bakery-packaging-02.webp",
      "/images/industries/bakery-packaging-03.webp",
      "/images/industries/bakery-packaging-04.webp"
    ]
  },
  {
    slug: "ketchup-mayonnaise-packaging",
    name: "Ketchup & Mayonnaise Packaging",
    group: "Food & Beverage",
    blurb:
      "Mess-free dispensing down to the last drop.",
    detailContent: {
      challenge:
        "Condiments like ketchup and mayo are liquids, so the pack must hold them without a single leak. It also has to dispense easily, whether it ends up in a home kitchen, a restaurant, or a to-go bag as a single-serve packet.",
      approach:
        "Elevate supplies condiment packaging as spouted pouches and single-serve packets, built with the right barrier films and secure seals. Spouted pouches make pouring and refilling easy, and packets are ideal for portion control and takeout.",
      approachBold: ["condiment packaging", "spouted pouches and single-serve packets"],
      features: [
        {
          title: "Leak-Resistant Seals",
          description: "Keeps sauces where they belong"
        },
        {
          title: "Easy Dispensing",
          description: "Spouts make pouring and serving easier."
        },
        {
          title: "Barrier Films",
          description: "Protects the contents in storage and transit"
        },
        {
          title: "Flexible Pack Sizes",
          description: "From foodservice refills to single-serve packets"
        }
      ]
    },
    images: [
      "/images/industries/ketchup-mayonnaise-packaging-FC.webp",
      "/images/industries/ketchup-mayonnaise-packaging-01.webp",
      "/images/industries/ketchup-mayonnaise-packaging-03.webp"
    ]
  },

  // ---- Consumer Goods ----
  {
    slug: "tissue-packaging",
    name: "Tissue Packaging",
    group: "Consumer Goods",
    blurb:
      "Dependable wraps for the products people reach for daily.",
    detailContent: {
      challenge:
        "Paper goods come in many sizes and pack counts, and their wrapping must be tough enough to handle while keeping the product clean and covered. On store shelves, clean, well-printed packs help shoppers spot the right product fast.",
      approach:
        "Elevate produces tissue packaging as sturdy films, overwraps, and bags for facial tissue, bath tissue, paper towels, and wet wipes. Seal styles and handle options vary with the pack size and how it will be carried.",
      approachBold: "tissue packaging",
      features: [
        {
          title: "Durable Film",
          description: "Stands up to warehousing and shipping"
        },
        {
          title: "Clear Printing",
          description: "Product and brand details are easy to spot"
        },
        {
          title: "Reliable Seals",
          description: "Keeps every pack firmly closed"
        },
        {
          title: "Handle Options",
          description: "Bulk multipacks become easier to carry"
        }
      ]
    },
    images: [
      "/images/industries/tissue-packaging-FC.webp",
      "/images/industries/tissue-packaging-02.webp",
      "/images/industries/tissue-packaging-03.webp",
      "/images/industries/tissue-packaging-04.webp",
      "/images/industries/tissue-packaging-05.webp",
      "/images/industries/tissue-packaging-06.webp"
    ]
  },
  {
    slug: "detergent-powder-packaging",
    name: "Detergent Powder Packaging",
    group: "Consumer Goods",
    blurb:
      "Heavy-duty packs for heavy-duty cleaning.",
    detailContent: {
      challenge:
        "Laundry powder tends to be sold in big sizes, so the pack must carry real weight and survive rough handling and shipping without ripping or bursting open. It also needs a tight seal to keep powder from sifting out, plus an easy way to carry it home.",
      approach:
        "Elevate makes laundry powder packaging from tough laminated films, with gussets and carry handles available. Materials are matched to bag size and filling needs, and strong seals keep the powder where it belongs.",
      approachBold: "laundry powder packaging",
      features: [
        {
          title: "Tough Film",
          description: "Holds up to everyday storage and shipping"
        },
        {
          title: "Strong Seals",
          description: "Stops powder from sifting out"
        },
        {
          title: "Gusseted Design",
          description: "Adds volume and stability for bigger bags"
        },
        {
          title: "Carrying Handles",
          description: "Large detergent bags become easier to lift and carry"
        }
      ]
    },
    images: [
      "/images/industries/detergent-powder-packaging-FC.webp",
      "/images/industries/detergent-powder-packaging-01.webp",
      "/images/industries/detergent-powder-packaging-02.webp",
      "/images/industries/detergent-powder-packaging-03.webp",
      "/images/industries/detergent-powder-packaging-05.webp",
      "/images/industries/detergent-powder-packaging-06.webp"
    ]
  },
  {
    slug: "dishwashing-products-packaging",
    name: "Dishwashing Products Packaging",
    group: "Consumer Goods",
    blurb:
      "Leak-tight from the filling line to the last squeeze.",
    detailContent: {
      challenge:
        "Dish soaps, gels, and powders call for packaging that contains the product without leaking or breaking down over time. Refill packs in particular need to stay easy to grip, pour, and handle.",
      approach:
        "Elevate supplies dish soap packaging as pouches and refill packs, using film structures chosen for each formula. Secure seals hold liquids and powders in, and the pouch style can change with pack size and filling method.",
      approachBold: "dish soap packaging",
      features: [
        {
          title: "Product Compatibility",
          description: "Films matched to the specific dish care formula"
        },
        {
          title: "Leak-Resistant Seals",
          description: "Keeps liquids and gels safely inside the pouch"
        },
        {
          title: "Refill-Friendly Formats",
          description: "A smart fit for products sold as refills"
        },
        {
          title: "Flexible Pack Sizes",
          description: "Works for a range of fill volumes and retail needs"
        }
      ]
    },
    images: ["/images/industries/dishwashing-products-packaging-01.webp"]
  },
  {
    slug: "diaper-sanitary-products-packaging",
    name: "Diaper & Sanitary Products Packaging",
    group: "Consumer Goods",
    blurb:
      "Clean, sturdy packaging for daily personal care.",
    detailContent: {
      challenge:
        "Diapers and feminine care products are typically sold in bulk counts, so the pack has to stand up to lifting, shipping, and daily use. It also needs to keep the contents covered and feel neat and pleasant in the hand.",
      approach:
        "Elevate builds diaper and feminine care packaging from strong flexible films, with a soft-touch finish, carry handles, and reclosable openings available. Pack sizes and styles adjust to the product count and retail setting.",
      approachBold: ["diaper and feminine care packaging", "soft-touch finish, carry handles, and reclosable openings"],
      features: [
        {
          title: "High-Strength Film",
          description: "Built for storage, shipping, and daily use"
        },
        {
          title: "Soft-Touch Finish",
          description: "Gives the outer pack a smooth, pleasant feel"
        },
        {
          title: "Carrying Handles",
          description: "Bulk packs become easier to lift and carry"
        },
        {
          title: "Resealable Closure",
          description: "Lets the pack open and close as often as needed"
        }
      ]
    },
    images: [
      "/images/industries/diaper-sanitary-products-packaging-FC.webp",
      "/images/industries/diaper-sanitary-products-packaging-02.webp",
      "/images/industries/diaper-sanitary-products-packaging-03.webp",
      "/images/industries/diaper-sanitary-products-packaging-04.webp"
    ]
  },
  {
    slug: "beauty-cosmetics-packaging",
    name: "Beauty & Cosmetics Packaging",
    group: "Consumer Goods",
    blurb:
      "Packaging that lets every product shine.",
    detailContent: {
      challenge:
        "Beauty and personal care brands need packs that look polished, feel high quality, and keep the formula protected. Travel sizes and samples also call for practical formats that are simple to fill, carry, and use.",
      approach:
        "Elevate offers beauty packaging as pouches, spouted pouches, and sachets, printed in high resolution to carry detailed brand designs. Film structures, finishes, and formats are chosen around the product and how customers will use it.",
      approachBold: "beauty packaging",
      features: [
        {
          title: "High-Resolution Print",
          description: "Sharp color, artwork, and product details"
        },
        {
          title: "Premium Finishes",
          description: "A refined look for beauty and personal care packs"
        },
        {
          title: "Pouch & Spout Options",
          description: "Fits lotions, gels, and other liquid products"
        },
        {
          title: "Sachets",
          description: "A handy format for samples, travel sizes, and single-use products"
        }
      ]
    },
    images: [
      "/images/industries/beauty-cosmetics-packaging-FC.webp",
      "/images/industries/beauty-cosmetics-packaging-01.webp",
      "/images/industries/beauty-cosmetics-packaging-02.webp",
      "/images/industries/beauty-cosmetics-packaging-03.webp",
      "/images/industries/beauty-cosmetics-packaging-04.webp"
    ]
  },
  {
    slug: "pet-food-pet-care-packaging",
    name: "Pet Food & Pet Care Packaging",
    group: "Consumer Goods",
    blurb:
      "Freshness sealed in, from the bag to the bowl.",
    detailContent: {
      challenge:
        "Pet food is often oily, strong-smelling, and varied in texture, so the bag has to hold it securely and keep it from damage. For kibble and treats, owners also expect a pack that opens and closes without a struggle.",
      approach:
        "Elevate makes pet food packaging as stand-up pouches with film structures chosen for each product. Films that resist grease and odor keep the contents contained, and resealable zippers let owners open, scoop, and close the bag again with ease.",
      approachBold: ["pet food packaging", "Films that resist grease and odor"],
      features: [
        {
          title: "Grease Resistance",
          description: "Stops oily food from staining or weakening the bag"
        },
        {
          title: "Odor Control",
          description: "Keeps strong product smells sealed in"
        },
        {
          title: "Resealable Zipper",
          description: "Opens and closes easily, feeding after feeding"
        },
        {
          title: "Stand-Up Pouch",
          description: "A convenient format for pantry storage and daily use"
        }
      ]
    },
    images: [
      "/images/industries/pet-food-pet-care-packaging-FC.webp",
      "/images/industries/pet-food-pet-care-packaging-01.webp",
      "/images/industries/pet-food-pet-care-packaging-03.webp",
      "/images/industries/pet-food-pet-care-packaging-04.webp",
      "/images/industries/pet-food-pet-care-packaging-05.webp"
    ]
  },

  // ---- Industrial & Agricultural ----
  {
    slug: "fertilizer-packaging",
    name: "Fertilizer Packaging",
    group: "Industrial & Agricultural",
    blurb:
      "Made to carry the load and survive the trip.",
    detailContent: {
      challenge:
        "Fertilizer often travels and sits in tough conditions, so its bags must carry heavy weights without tearing or losing their seal. Sun, rain, and rough handling at the farm or in the yard can all take a toll along the way.",
      approach:
        "Elevate produces fertilizer packaging as heavy-duty laminated bags and pouches for larger, more demanding fills. UV-stabilized films help the bags stand up to sunlight, and secure seals with durable materials keep the product contained in handling and storage.",
      approachBold: ["fertilizer packaging", "UV-stabilized films"],
      features: [
        {
          title: "Heavy-Duty Films",
          description: "Built for the weight and handling of fertilizer bags"
        },
        {
          title: "UV Stability",
          description: "Helps bags hold up under direct sunlight"
        },
        {
          title: "Strong Seals",
          description: "Keeps product firmly sealed inside"
        },
        {
          title: "Durable Construction",
          description: "Ready for storing and shipping bulk bags"
        }
      ]
    },
    images: [
      "/images/industries/fertilizer-packaging-FC.webp",
      "/images/industries/fertilizer-packaging-02.webp",
      "/images/industries/fertilizer-packaging-04.webp",
      "/images/industries/fertilizer-packaging-05.webp"
    ]
  },
  {
    slug: "seed-packaging",
    name: "Seed Packaging",
    group: "Industrial & Agricultural",
    blurb:
      "Safeguarding every harvest-to-be, from storage to planting.",
    detailContent: {
      challenge:
        "Seeds must be kept away from moisture and outside exposure while they are warehoused and shipped. The right pack matters, because poor storage can reduce seed quality long before it reaches the grower.",
      approach:
        "Elevate makes seed packaging from multi-layer films with a moisture barrier that protects seed through storage and shipping. Security printing is also available to help brands guard against counterfeits and make authentic product easy to verify.",
      approachBold: "seed packaging",
      features: [
        {
          title: "Moisture Barrier",
          description: "Keeps humidity away from the seed"
        },
        {
          title: "Multi-Layer Films",
          description: "Adds the strength and protection seed bags need"
        },
        {
          title: "Security Printing",
          description: "An added safeguard for authentication and brand protection"
        },
        {
          title: "Reliable Seals",
          description: "Keeps bags closed through storage and handling"
        }
      ]
    },
    images: [
      "/images/industries/seed-packaging-01.webp",
      "/images/industries/seed-packaging-02.webp",
      "/images/industries/seed-packaging-03.webp",
      "/images/industries/seed-packaging-04.webp",
      "/images/industries/seed-packaging-06.webp",
      "/images/industries/seed-packaging-07.webp"
    ]
  },
  {
    slug: "medicine-pharma-packaging",
    name: "Medicine & Pharma Packaging",
    group: "Industrial & Agricultural",
    blurb:
      "Dependable protection on the path to the patient.",
    detailContent: {
      challenge:
        "Medications and pharmaceutical products must be shielded from moisture, light, oxygen, and contamination. The pack also has to stay secure through filling, warehousing, distribution, and handling.",
      approach:
        "Elevate supplies pharmaceutical packaging in high-barrier films and pouches suited to a range of pharma products. Tamper-evident seals and security printing are available when required, keeping packs secure and making any unauthorized opening easy to spot.",
      approachBold: ["pharmaceutical packaging", "Tamper-evident seals and security printing"],
      features: [
        {
          title: "High-Barrier Films",
          description: "Shields contents from moisture and outside exposure"
        },
        {
          title: "Contamination Protection",
          description: "Keeps the product sealed off in storage and handling"
        },
        {
          title: "Tamper-Evident Seals",
          description: "Shows clearly when a pack has been opened"
        },
        {
          title: "Security Printing",
          description: "Another layer of authentication and brand protection"
        }
      ]
    },
    images: [
      "/images/industries/medicine-pharma-packaging-01.webp",
      "/images/industries/medicine-pharma-packaging-02.webp",
      "/images/industries/medicine-pharma-packaging-03.webp"
    ]
  },
  {
    slug: "chemical-packaging",
    name: "Chemical Packaging",
    group: "Industrial & Agricultural",
    blurb:
      "Engineered to hold. Built to last.",
    detailContent: {
      challenge:
        "Industrial and specialty chemicals need packaging that can take harsh conditions in the warehouse and on the road. It has to be tough enough to resist punctures and keep the contents from leaking out.",
      approach:
        "Elevate packages chemicals in multi-layer laminated films chosen for the product and its specific requirements. Chemical-resistant materials, secure seals, and rugged pouch construction keep the contents contained from storage to delivery.",
      features: [
        {
          title: "Chemical Resistance",
          description: "Films chosen to suit the chemical being packed"
        },
        {
          title: "Puncture Resistance",
          description: "Stands up to handling and movement"
        },
        {
          title: "Leak-Resistant Seals",
          description: "Keeps liquids and powders safely inside"
        },
        {
          title: "Multi-Layer Structure",
          description: "Extra strength and protection for tough applications"
        }
      ]
    },
    images: [
      "/images/industries/chemical-packaging-01.webp",
      "/images/industries/chemical-packaging-02.webp",
      "/images/industries/chemical-packaging-03.webp",
      "/images/industries/chemical-packaging-04.webp"
    ]
  },
  {
    slug: "cbd-tobacco-packaging",
    name: "CBD & Tobacco Packaging",
    group: "Industrial & Agricultural",
    blurb:
      "Keeping products fresh and compliant.",
    detailContent: {
      challenge:
        "CBD and tobacco products need a pack that keeps humidity and outside conditions at bay. It also has to store and ship safely while meeting the federal and state packaging rules that apply to these product categories.",
      approach:
        "Elevate offers CBD and tobacco packaging as barrier-sealed pouches, with tamper-evident features, child-resistant closures, and high-definition printing available. Each pack can be tailored to the product type, size, and required specifications.",
      features: [
        {
          title: "Barrier Protection",
          description: "Shields contents from humidity and outside exposure"
        },
        {
          title: "Tamper-Evident Features",
          description: "Shows clearly when a pack has been opened"
        },
        {
          title: "Child-Resistant Options",
          description: "Available where state or federal rules require it"
        },
        {
          title: "High-Fidelity Printing",
          description: "Branding, artwork, and required information stay crisp."
        }
      ]
    },
    images: [
      "/images/industries/cbd-tobacco-packaging-01.webp",
      "/images/industries/cbd-tobacco-packaging-02.webp",
      "/images/industries/cbd-tobacco-packaging-03.webp",
      "/images/industries/cbd-tobacco-packaging-04.webp",
      "/images/industries/cbd-tobacco-packaging-05.webp"
    ]
  },

  // ---- Retail & Manufacturing ----
  {
    slug: "textile-packaging",
    name: "Textile Packaging",
    group: "Retail & Manufacturing",
    blurb:
      "Clean and presentable, from the factory floor to the sales floor.",
    detailContent: {
      challenge:
        "Apparel and home textiles have to stay clean and look their best through warehousing and shipping. Dust and moisture can dull their appearance, so the pack needs to protect the item while still letting it be seen.",
      approach:
        "Elevate makes textile packaging as clear and printed bags for apparel, bedding, and other soft goods. See-through bags let shoppers view the item without opening it, and printed versions give brands room for logos, product info, and care instructions.",
      features: [
        {
          title: "Clear Product View",
          description: "Shoppers can see the garment or item inside"
        },
        {
          title: "Dust Protection",
          description: "Keeps items covered in storage and on display"
        },
        {
          title: "Printed Options",
          description: "Room for branding and product details"
        },
        {
          title: "Easy Handling",
          description: "Convenient formats for packing, shipping, and retail"
        }
      ]
    },
    images: [
      "/images/industries/textile-packaging-01.webp",
      "/images/industries/textile-packaging-02.webp",
      "/images/industries/textile-packaging-03.webp",
      "/images/industries/textile-packaging-04.webp",
      "/images/industries/textile-packaging-05.webp",
      "/images/industries/textile-packaging-06.webp",
      "/images/industries/textile-packaging-08.webp"
    ]
  },
  {
    slug: "sports-products-packaging",
    name: "Sports Products Packaging",
    group: "Retail & Manufacturing",
    blurb:
      "Game-ready packaging that gets noticed on the shelf.",
    detailContent: {
      challenge:
        "Sporting goods vary widely in shape and size, so the pack must be practical without overshadowing the gear inside. It also has to survive warehousing and shipping while giving the brand enough presence to catch a shopper's attention.",
      approach:
        "Elevate makes sporting goods packaging from durable films and custom-shaped pouches built around each product's size and needs. High-quality print gives brands space for bold artwork, product details, and logos across the whole pack.",
      approachBold: "sporting goods packaging",
      features: [
        {
          title: "Tough Film",
          description: "Protects gear through handling and shipping"
        },
        {
          title: "Custom Shapes",
          description: "Packs shaped to fit different products"
        },
        {
          title: "Strong Construction",
          description: "Built for warehouse and retail wear and tear"
        },
        {
          title: "Eye-Catching Print",
          description: "Puts artwork and branding front and center"
        }
      ]
    },
    images: [
      "/images/industries/sports-products-packaging-FC.webp",
      "/images/industries/sports-products-packaging-01.webp",
      "/images/industries/sports-products-packaging-03.webp"
    ]
  },
  {
    slug: "courier-bag-packaging",
    name: "Courier Bag Packaging",
    group: "Retail & Manufacturing",
    blurb:
      "Shipments stay sealed from the warehouse to the doorstep.",
    detailContent: {
      challenge:
        "Mailers and shipping bags take a beating in sorting centers and delivery trucks, and they can't rip or pop open on the way. E-commerce brands also need them to stay secure and leave room for shipping labels, addresses, and tracking details.",
      approach:
        "Elevate makes poly mailers from tear-resistant co-extruded films that add strength in transit. Each bag has a permanent adhesive closure to keep shipments sealed, and the printable surface can carry branding, shipping info, and other details.",
      approachBold: ["poly mailers", "permanent adhesive closure"],
      features: [
        {
          title: "Tear Resistance",
          description: "Holds up through sorting, handling, and shipping"
        },
        {
          title: "Tamper-Evident Closure",
          description: "Shows clearly when a mailer has been opened"
        },
        {
          title: "Permanent Adhesive Seal",
          description: "Keeps shipments sealed all the way to delivery"
        },
        {
          title: "Printable Surface",
          description: "Space for shipping labels and brand graphics"
        }
      ]
    },
    images: [
      "/images/industries/courier-bag-packaging-01.webp",
      "/images/industries/courier-bag-packaging-02.webp"
    ]
  }
];

export const industriesByGroup: { group: IndustryGroup; items: Industry[] }[] =
  industryGroups.map((group) => ({
    group,
    items: industries.filter((i) => i.group === group)
  }));

// Anchor slug for a group section on /industries (and the nav "go to" links).
export function groupSlug(group: IndustryGroup): string {
  return group
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Single-industry lookup for the /industries/[slug] detail page.
export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

// Other industries in the same group (for "related" on the detail page).
export function relatedIndustries(slug: string, limit = 3): Industry[] {
  const current = getIndustryBySlug(slug);
  if (!current) return [];
  return industries
    .filter((i) => i.group === current.group && i.slug !== slug)
    .slice(0, limit);
}

// Tokens that carry no matching signal when relating products to industries.
const INDUSTRY_STOPWORDS = new Set([
  "packaging", "products", "product", "and", "the", "for", "of", "with",
  "care", "goods", "other", "custom", "premium"
]);

function industryTokens(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2 && !INDUSTRY_STOPWORDS.has(t))
    .map((t) => (t.endsWith("s") ? t.slice(0, -1) : t)); // crude singularise
}

// Industries most relevant to a product, derived from its applications + name.
// Deterministic: scores every industry by shared tokens, then fills any empty
// slots with the remaining industries in canonical order so EVERY product page
// gets a full set of related industries (never an empty section).
export function industriesForApplications(
  applications: readonly string[],
  name = "",
  limit = 4
): Industry[] {
  const prodTokens = new Set<string>([
    ...industryTokens(name),
    ...applications.flatMap((a) => industryTokens(a))
  ]);

  const scored = industries
    .map((ind) => ({
      ind,
      score: industryTokens(ind.name).reduce(
        (n, t) => n + (prodTokens.has(t) ? 1 : 0),
        0
      )
    }))
    .sort((a, b) => b.score - a.score);

  const picked = scored.filter((s) => s.score > 0).map((s) => s.ind);

  for (const ind of industries) {
    if (picked.length >= limit) break;
    if (!picked.includes(ind)) picked.push(ind);
  }
  return picked.slice(0, limit);
}
