// One-off: sync ONLY the product catalogue (categories + products) to the
// code-driven catalogue in web/lib/products.ts. Leaves markets, innovations,
// news, testimonials, gallery, videos, and users untouched.
//
// products.ts is the source of truth for names, the product set, and galleries.
// Run: pnpm --filter @elevatepackaging/api exec ts-node --compiler-options '{"module":"CommonJS"}' prisma/sync-catalog.ts

import { PrismaClient } from "@prisma/client";
import { catalog } from "../../web/lib/products";
import { img } from "../../web/lib/images";

const prisma = new PrismaClient();

async function main() {
  const keepCatSlugs = catalog.map((c) => c.slug);
  const keepProductSlugs = catalog.flatMap((c) => c.products.map((p) => p.slug));

  console.log("→ Pruning products/categories not in products.ts…");
  const delP = await prisma.product.deleteMany({
    where: { slug: { notIn: keepProductSlugs } }
  });
  const delC = await prisma.productCategory.deleteMany({
    where: { slug: { notIn: keepCatSlugs } }
  });
  console.log(`  ✓ removed ${delP.count} stale product(s), ${delC.count} stale categor(y/ies)`);

  console.log("→ Upserting categories + products from products.ts…");
  for (const [ci, cat] of catalog.entries()) {
    const dbCat = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, intro: cat.intro, order: ci },
      create: { slug: cat.slug, name: cat.name, intro: cat.intro, order: ci }
    });

    for (const [pi, p] of cat.products.entries()) {
      // Gallery source of truth: products.ts gallery when present; else keep
      // whatever the DB already has; else fall back to the curated seed image.
      const existing = await prisma.product.findUnique({
        where: { slug: p.slug },
        select: { gallery: true }
      });
      const existingGallery = (existing?.gallery as string[] | null) ?? [];
      const seedImage = img.products[p.slug];
      const gallery =
        p.gallery && p.gallery.length > 0
          ? p.gallery
          : existingGallery.length > 0
          ? existingGallery
          : seedImage
          ? [seedImage]
          : [];

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
          gallery: gallery as object,
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
          gallery: gallery as object,
          moq: p.moq,
          leadTime: p.leadTime,
          categoryId: dbCat.id,
          order: pi,
          featured: pi < 2,
          published: true
        }
      });
      console.log(`  · ${cat.slug}/${p.slug} → "${p.name}" (${gallery.length} img)`);
    }
  }

  console.log("✓ Catalogue synced");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
