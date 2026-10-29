import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { catalog as fallbackCatalog } from "@/lib/products";
import { getCatalog, getCategoryBySlug } from "@/lib/content-source";
import { img } from "@/lib/images";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { Kicker, PhotoCard, ProductTile } from "@/components/products/ui";
import { pageSeo, breadcrumbLd } from "@/lib/seo";

export const revalidate = 60;

const inkDot: Record<string, string> = {
  "printed-films": "bg-print-cyan",
  "plastic-films": "bg-print-magenta",
  pouches: "bg-print-red"
};

export function generateStaticParams() {
  // Static params come from the fallback catalogue at build time. New
  // categories added via admin will render via on-demand SSR.
  return fallbackCatalog.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { category: string };
}): Promise<Metadata> {
  const path = `/products/${params.category}`;
  const cat = await getCategoryBySlug(params.category);
  if (!cat) {
    return pageSeo({
      title: "Our Products",
      description: "Flexible packaging made to order by Elevate.",
      path
    });
  }
  return pageSeo({
    title: cat.name,
    description: cat.intro.replace(/\*\*/g, "").replace(/\s+/g, " ").trim(),
    path,
    image: (img.categories as Record<string, string>)[cat.slug]
  });
}

export default async function CategoryPage({
  params
}: {
  params: { category: string };
}) {
  const [cat, catalog] = await Promise.all([
    getCategoryBySlug(params.category),
    getCatalog()
  ]);
  if (!cat) notFound();

  const dot = inkDot[cat.slug] ?? "bg-gold-500";
  const others = catalog.filter((c) => c.slug !== cat.slug);
  const catIndex = catalog.findIndex((c) => c.slug === cat.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: cat.name, path: `/products/${cat.slug}` }
        ])}
      />
      <section
        aria-label={`${cat.name} overview`}
        className="mesh-bg relative isolate overflow-hidden border-b border-line/10"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgb(var(--line)/0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="container py-8 md:py-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-muted md:text-sm"
          >
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/products" className="hover:text-accent">
              Products
            </Link>
            <span aria-hidden>/</span>
            <span className="text-fg">{cat.name}</span>
          </nav>

          <div className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <Kicker dot={dot}>
                Product line
                <span className="text-subtle">· {cat.products.length} items</span>
              </Kicker>
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg md:text-5xl lg:text-6xl">
                {cat.name}
              </h1>
              <div className="mt-4 max-w-prose space-y-3 text-sm leading-relaxed text-muted md:text-base">
                {cat.intro.split(/\n\n+/).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>
                    {paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={partIndex} className="font-semibold text-fg">
                          {part.slice(2, -2)}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/rfq?category=${cat.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-accent transition hover:bg-accent-hover"
                >
                  Get pricing
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-line/20 px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
                >
                  ← Back to all products
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-gold-500/20" />
              <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border-4 border-card shadow-2xl">
                <Image
                  src={img.categories[cat.slug as keyof typeof img.categories]}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden className="glass absolute -left-5 bottom-6 rounded-2xl px-4 py-3 shadow-xl">
                <p className="font-display text-2xl font-bold leading-none text-fg">
                  {cat.products.length}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">items</p>
              </div>
              {catIndex >= 0 && (
                <span aria-hidden className="glass absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-xs tracking-[0.2em] text-fg">
                  / {String(catIndex + 1).padStart(2, "0")}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label={`${cat.name} products`}
        className="container py-12 md:py-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 md:mb-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-4xl">
            Every option in{" "}
            <span className="text-gradient">{cat.name.toLowerCase()}</span>
          </h2>
          <p className="rounded-full border border-line/15 bg-card px-3.5 py-1 text-sm text-muted">
            {cat.products.length}{" "}
            {cat.products.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {cat.products.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.2)} className="h-full">
              <ProductTile
                href={`/products/${cat.slug}/${p.slug}`}
                src={p.gallery?.[0] ?? img.products[p.slug]}
                name={p.name}
                index={i}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized={!!p.gallery?.[0]}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section
        aria-label="Browse other product lines"
        className="band-dark relative isolate overflow-hidden"
      >
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-white/10" />
        <div aria-hidden className="absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="container py-14 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 md:mb-10">
            <div>
              <Kicker>Keep browsing</Kicker>
              <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-4xl">
                More product lines
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-accent transition hover:text-accent-hover"
            >
              See everything →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {others.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08} className="h-full">
                <PhotoCard
                  href={`/products/${c.slug}`}
                  src={img.categories[c.slug as keyof typeof img.categories]}
                  alt={c.name}
                  title={c.name}
                  className="min-h-[260px] md:min-h-[300px]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  meta={
                    <span className="mb-2 inline-flex items-center gap-2 text-xs text-white/80">
                      <span aria-hidden className={`h-2 w-2 rounded-full ${inkDot[c.slug] ?? "bg-gold-400"}`} />
                      {c.products.length} items
                    </span>
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
