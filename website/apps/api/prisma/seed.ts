// Seeds Postgres with the existing code-driven catalogue plus a default admin user.
// Re-runnable: uses upsert keyed on slug/email so running it twice doesn't dup rows.

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { catalog } from "../../web/lib/products";
import { img } from "../../web/lib/images";
import { newsPosts } from "../../web/lib/news-data";

const prisma = new PrismaClient();

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "For six years, Elevate has been the only pouch supplier we use. Nobody else we've worked with matches their steady print quality and reliable on-time delivery.",
    author: "Operations Head",
    role: "Snack brand, Austin TX",
    order: 0
  },
  {
    quote:
      "Switching to their metallized-barrier stand-up pouches kept our coffee fresh far longer. Their people know the technical side, answer fast, and have a great eye for design.",
    author: "Brand Manager",
    role: "Specialty coffee roaster",
    order: 1
  },
  {
    quote:
      "We went from idea to full commercial launch in six weeks. Printed in 8-color rotogravure, our retort pouches look high-end on store shelves.",
    author: "Product Director",
    role: "Ready-to-eat food brand",
    order: 2
  }
];

const DEFAULT_MARKETS = [
  {
    slug: "snacks",
    name: "Snacks",
    leadCopy:
      "Metallized films and high-barrier pouches built for every kind of snack, from chips and wafers to baked and extruded lines. Optimized for fast FFS runs and strong shelf appeal.",
    applications: ["Chips & crisps", "Wafers", "Extruded snacks", "Bakery snacks"],
    order: 0
  },
  {
    slug: "coffee-tea",
    name: "Coffee & Tea",
    leadCopy:
      "Laminates that seal in aroma, finished with degassing valves and reclosable zippers. Made for whole bean, ground coffee, and loose-leaf tea lines.",
    applications: ["Whole bean coffee", "Ground coffee", "Loose-leaf tea", "Tea sachets"],
    order: 1
  },
  {
    slug: "confectionery",
    name: "Confectionery",
    leadCopy:
      "Twist-wrap films and upscale pouches for gum, candy, and chocolate. Metallized and holographic choices help products stand apart on shelf.",
    applications: ["Chocolate", "Candy", "Gum", "Premium gifting"],
    order: 2
  },
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    leadCopy:
      "Regulation-ready multi-layer films carrying serialized security printing. They support traceability, tamper evidence, and demanding barrier requirements.",
    applications: ["Tablets & capsules", "Powders", "Syrups", "Medical devices"],
    order: 3
  }
];

// News comes from the same static file the public site falls back to, so the
// local DB and the deployed (API-less) site show identical stories.
const DEFAULT_NEWS = newsPosts.map((n, i) => ({
  slug: n.slug,
  title: n.title,
  excerpt: n.excerpt,
  body: n.body,
  coverUrl: n.coverUrl,
  date: new Date(n.date),
  featured: n.featured,
  order: i,
  published: true
}));


const DEFAULT_GALLERY = [
  { imageUrl: "/images/industries/rice-packaging-01.webp", caption: "Packaging for rice", order: 0, published: true },
  { imageUrl: "/images/industries/snacks-confectionery-packaging-01.webp", caption: "Snack & candy packs", order: 1, published: true },
  { imageUrl: "/images/industries/tea-packaging-01.webp", caption: "Packaging for tea", order: 2, published: true },
  { imageUrl: "/images/industries/pink-salt-packaging-01.webp", caption: "Pink salt pouches", order: 3, published: true },
  { imageUrl: "/images/industries/spices-pulses-packaging-01.webp", caption: "Spice & pulse packs", order: 4, published: true },
  { imageUrl: "/images/industries/beauty-cosmetics-packaging-01.webp", caption: "Cosmetics & beauty packs", order: 5, published: true },
  { imageUrl: "/images/industries/fertilizer-packaging-01.webp", caption: "Bags for fertilizer", order: 6, published: true },
  { imageUrl: "/images/industries/ice-cream-packaging-01.webp", caption: "Ice cream wraps", order: 7, published: true }
];

const DEFAULT_VIDEOS = [
  {
    title: "A Look Inside Elevate",
    url: "https://www.youtube.com/watch?v=pShQhLui5NQ",
    caption: "Go behind the scenes at our flexible packaging plant.",
    order: 0,
    published: true
  }
];

const DEFAULT_INNOVATIONS = [
  {
    slug: "special-3d-uv-effects",
    title: "Special 3D UV Effects",
    summary: "Raised, touchable spot-UV finishes for flexible packs.",
    body:
      "Dimensional spot-UV layers you can feel give flexible packaging extra depth, texture, and a luxury touch that helps brands catch the eye on shelf.",
    coverUrl: img.products["rotogravure"],
    videoUrl: "https://youtube.com/shorts/CJl_ukd0LBg",
    featured: true,
    order: 0,
    published: true
  },
  {
    slug: "4d-pouch",
    title: "4D Pouch",
    summary: "A pouch format with a bold, three-dimensional build.",
    body:
      "Elevate's 4D pouch has a unique three-dimensional structure that commands attention on shelf and makes opening the pack feel premium.",
    coverUrl: "/images/innovations/4d-pouch.webp",
    videoUrl: null,
    featured: false,
    order: 1,
    published: true
  },
  {
    slug: "kraft-paper-bread-pouch",
    title: "Kraft Paper Bread Pouch",
    summary: "A kraft pouch that lets bread and baked goods breathe.",
    body:
      "Designed specifically for bread and bakery items, our kraft paper pouch lets products breathe while still keeping them fresh.",
    coverUrl: "/images/innovations/kraft-paper-bread-pouch.webp",
    videoUrl: null,
    featured: false,
    order: 2,
    published: true
  },
  {
    slug: "shaped-die-cut-pouch",
    title: "Shaped/Die-Cut Pouch",
    summary: "Die-cut pouches in custom shapes that stand apart on shelf.",
    body:
      "With a custom die-cut outline, the pouch itself can echo your product or brand identity, setting it clearly apart from standard bags on shelf.",
    coverUrl: "/images/innovations/shaped-die-cut-pouch.webp",
    videoUrl: null,
    featured: false,
    order: 3,
    published: true
  },
  {
    slug: "cold-and-hot-stamping",
    title: "Cold and Hot Stamping",
    summary: "Genuine foil stamping for flexible packs, using cold or hot application.",
    body:
      "We apply authentic metallic foil to flexible packaging using either cold or hot stamping. The result is crisper and brighter than any metallic ink, and it lines up exactly with the artwork, so logos and highlights carry a true foil finish on shelf-ready bags.",
    coverUrl: "/images/innovations/cold-and-hot-stamping.webp",
    videoUrl: null,
    featured: false,
    order: 4,
    published: true
  }
];

async function main() {
  console.log("→ Seeding admin user…");
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@elevatepackaging.com";
  // No default password: a committed one is a published credential, and this
  // seed is runnable against any DATABASE_URL.
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  if (!adminPassword || adminPassword.length < 12) {
    throw new Error(
      "SEED_ADMIN_PASSWORD must be set to at least 12 characters before seeding"
    );
  }
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    // Never overwrite an existing admin: re-running the seed used to reset a
    // rotated password back to the seeded one.
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Admin",
      role: "ADMIN"
    }
  });
  console.log(`  ✓ Admin ensured: ${adminEmail} (password not logged)`);

  console.log("→ Pruning catalogue to current 3 categories…");
  const keepCatSlugs = catalog.map((c) => c.slug);
  const keepProductSlugs = catalog.flatMap((c) => c.products.map((p) => p.slug));
  // Remove products/categories from the legacy 5-category catalogue.
  await prisma.product.deleteMany({ where: { slug: { notIn: keepProductSlugs } } });
  await prisma.productCategory.deleteMany({ where: { slug: { notIn: keepCatSlugs } } });

  console.log("→ Seeding product categories + products…");
  for (const [ci, cat] of catalog.entries()) {
    const dbCat = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        intro: cat.intro,
        order: ci
      },
      create: {
        slug: cat.slug,
        name: cat.name,
        intro: cat.intro,
        order: ci
      }
    });
    console.log(`  · ${cat.name} (${cat.products.length} products)`);

    for (const [pi, p] of cat.products.entries()) {
      // Pre-fill gallery with the curated public-site image for this slug, so
      // admin users see the existing visual when they edit. They can replace
      // or supplement with their own uploads.
      const seedImage = img.products[p.slug];
      const seedGallery = seedImage ? [seedImage] : [];

      // Preserve any existing gallery (e.g. images the admin already uploaded);
      // only backfill if the row has no gallery entries.
      const existing = await prisma.product.findUnique({
        where: { slug: p.slug },
        select: { gallery: true }
      });
      const existingGallery = (existing?.gallery as string[] | null) ?? [];
      const galleryToWrite =
        existingGallery.length > 0 ? existingGallery : seedGallery;

      await prisma.product.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          summary: p.summary,
          description: p.description,
          applications: p.applications,
          features: p.features as string[],
          finishes: (p.finishes as string[]) ?? [],
          specs: p.specs as object,
          gallery: galleryToWrite as object,
          moq: p.moq,
          leadTime: p.leadTime,
          categoryId: dbCat.id,
          order: pi,
          published: true
        },
        create: {
          slug: p.slug,
          name: p.name,
          summary: p.summary,
          description: p.description,
          applications: p.applications,
          features: p.features as string[],
          finishes: (p.finishes as string[]) ?? [],
          specs: p.specs as object,
          gallery: seedGallery as object,
          moq: p.moq,
          leadTime: p.leadTime,
          categoryId: dbCat.id,
          order: pi,
          featured: pi < 2,
          published: true
        }
      });
    }
  }

  console.log("→ Seeding markets…");
  for (const m of DEFAULT_MARKETS) {
    await prisma.market.upsert({
      where: { slug: m.slug },
      update: m,
      create: m
    });
  }

  console.log("→ Seeding testimonials…");
  for (const t of DEFAULT_TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: { author: t.author, role: t.role }
    });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }

  console.log("→ Seeding innovations…");
  for (const n of DEFAULT_INNOVATIONS) {
    await prisma.innovation.upsert({ where: { slug: n.slug }, update: n, create: n });
  }

  console.log("→ Seeding news…");
  for (const n of DEFAULT_NEWS) {
    await prisma.newsPost.upsert({ where: { slug: n.slug }, update: n, create: n });
  }

  console.log("→ Seeding gallery…");
  for (const g of DEFAULT_GALLERY) {
    const existing = await prisma.galleryImage.findFirst({ where: { imageUrl: g.imageUrl } });
    if (existing) {
      await prisma.galleryImage.update({ where: { id: existing.id }, data: g });
    } else {
      await prisma.galleryImage.create({ data: g });
    }
  }

  console.log("→ Seeding videos…");
  for (const v of DEFAULT_VIDEOS) {
    const existing = await prisma.video.findFirst({ where: { url: v.url } });
    if (existing) {
      await prisma.video.update({ where: { id: existing.id }, data: v });
    } else {
      await prisma.video.create({ data: v });
    }
  }

  console.log("✓ Seed complete");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
