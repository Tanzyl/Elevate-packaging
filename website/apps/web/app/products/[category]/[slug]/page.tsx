import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import {
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Lock,
  Wind,
  CircleDot,
  Scissors,
  Droplet,
  ShoppingBag,
  Sparkles,
  Layers,
  Fingerprint,
  Shapes,
  type LucideIcon
} from "lucide-react";
import { allProducts, featureLabels, type ProductFeatureKey } from "@/lib/products";
import { industriesForApplications } from "@/lib/industries";
import { getCategoryBySlug, getProductBySlug } from "@/lib/content-source";
import { img } from "@/lib/images";
import { site } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { ProductGallery } from "@/components/product-gallery";
import { Kicker, PhotoCard, CtaBand, ProductTile, pillCta } from "@/components/products/ui";
import { pageSeo, productLd, breadcrumbLd } from "@/lib/seo";

export const revalidate = 60;

type Params = { category: string; slug: string };

const featureIcons: Record<ProductFeatureKey, LucideIcon> = {
  "hermetic-seal": ShieldCheck,
  zipper: Lock,
  "vent-hole": Wind,
  "hang-hole": CircleDot,
  "tear-notch": Scissors,
  spout: Droplet,
  handle: ShoppingBag,
  metallized: Sparkles,
  "multi-layer": Layers,
  "security-print": Fingerprint,
  "custom-shape": Shapes
};

// Products whose applications are "Label: value" pairs (rendered as a list of
// labelled rows under "Common Uses").
const labelledUses = new Set([
  "rotogravure",
  "flexography",
  "extrusion",
  "holography",
  "metallization",
  "centre-seal-pouch",
  "flat-bottom-pouch",
  "box-pouch",
  "four-side-seal-pouch",
  "stand-up-pouch",
  "spout-nozzle-pouch",
  "shaped-die-cut-pouch",
  "kraft-paper-bread-pouch",
  "kraft-paper-pouch",
]);

const panel = "rounded-3xl border border-line/10 bg-card p-6 shadow-sm md:p-7";
const panelTitle = "mb-5 flex items-center gap-3 font-display text-lg font-bold text-fg";

function PanelTitle({ n, children }: { n: string; children: ReactNode }) {
  return (
    <h2 className={panelTitle}>
      <span className="font-mono text-xs font-normal text-gold-600">{n}</span>
      {children}
    </h2>
  );
}

function renderMarkedCopy(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function generateStaticParams(): Params[] {
  // Build-time params come from the static catalogue. Products added via admin
  // render on-demand via SSR.
  return allProducts.map((p) => ({ category: p.categorySlug, slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}) {
  const path = `/products/${params.category}/${params.slug}`;
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return pageSeo({
      title: "Product Details",
      description: "A flexible packaging product made by Elevate.",
      path
    });
  }
  return pageSeo({
    title: product.name,
    description: product.summary,
    path,
    image: img.productHero(product.slug)
  });
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const [product, category] = await Promise.all([
    getProductBySlug(params.slug),
    getCategoryBySlug(params.category)
  ]);
  if (!product || !category) notFound();

  const related = category.products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const relatedInd = industriesForApplications(
    product.applications ?? [],
    product.name,
    4
  );
  const rfqHref = `/rfq?product=${encodeURIComponent(product.slug)}&category=${encodeURIComponent(category.slug)}`;
  const productPath = `/products/${category.slug}/${product.slug}`;
  const labelled = labelledUses.has(product.slug);

  return (
    <>
      <JsonLd
        data={[
          productLd({
            name: product.name,
            description: product.summary,
            path: productPath,
            images: product.gallery?.length
              ? product.gallery
              : [img.productHero(product.slug)],
            category: category.name,
            specs: product.specs
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: category.name, path: `/products/${category.slug}` },
            { name: product.name, path: productPath }
          ])
        ]}
      />

      <div className="mesh-bg relative isolate">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[520px] opacity-40 [background-image:linear-gradient(rgb(var(--line)/0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="container flex flex-wrap items-center gap-2 pt-8 text-xs text-subtle"
        >
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-accent">Products</Link>
          <ChevronRight size={12} />
          <Link
            href={`/products/${category.slug}`}
            className="hover:text-accent"
          >
            {category.name}
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted">{product.name}</span>
        </nav>

        {/* Hero — gallery sticks beside the text + spec panels on md+.
            No Reveal around the gallery (it's the LCP element; a JS opacity
            reveal delayed its paint). Text first on mobile so the H1 and quote
            CTA sit above the fold. */}
        <section className="container grid gap-8 py-8 md:grid-cols-2 md:gap-x-12 md:py-10 lg:gap-x-16">
          <div className="order-2 md:sticky md:top-24 md:col-start-1 md:row-span-2 md:row-start-1 md:self-start">
            <div className="relative">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-gold-500/20" />
              <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-card p-4 shadow-xl md:p-6">
                <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl" />
                {product.gallery && product.gallery.length > 0 ? (
                  <ProductGallery images={product.gallery} alt={product.name} />
                ) : (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={img.productHero(product.slug)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="order-1 md:col-start-2 md:row-start-1">
            <Kicker>{category.name}</Kicker>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              {renderMarkedCopy(product.summary)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={rfqHref} className={pillCta}>
                Get a Quote
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Elevate, I have a question about the ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line/15 bg-card/60 px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
              >
                <MessageCircle size={16} />
                Message us on WhatsApp
              </a>
            </div>

            {product.description.length > 0 && (
              <div className="mt-7 space-y-3 border-l-2 border-gold-500/40 pl-5 text-sm leading-relaxed text-muted md:text-base">
                {product.description.map((para, i) => (
                  <p key={i}>{renderMarkedCopy(para)}</p>
                ))}
              </div>
            )}
          </div>

          {/* Specs + Features + Applications */}
          <div className="order-3 space-y-5 md:col-start-2">
            <Reveal>
              <div className={`${panel} overflow-hidden !p-0`}>
                <div className="px-6 pt-6 md:px-7">
                  <PanelTitle n="01">Technical Specs</PanelTitle>
                </div>
                <dl>
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="grid gap-1 border-t border-line/10 px-6 py-3.5 odd:bg-section/50 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4 md:px-7"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-subtle sm:pt-0.5">
                        {s.label}
                      </dt>
                      <dd className="text-sm font-medium text-fg">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className={panel}>
                <PanelTitle n="02">Make It Yours</PanelTitle>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {product.features.map((f) => {
                    const Icon = featureIcons[f] ?? Layers;
                    return (
                      <li
                        key={f}
                        className="flex items-center gap-3 rounded-2xl border border-line/10 bg-section/50 px-3 py-2.5 text-sm text-fg"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                          <Icon size={16} />
                        </span>
                        {featureLabels[f]}
                      </li>
                    );
                  })}
                </ul>
                {product.finishes && product.finishes.length > 0 && (
                  <div className="mt-5 border-t border-line/10 pt-4">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-subtle">
                      Finish options
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.finishes.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-medium text-fg"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className={panel}>
                <PanelTitle n="03">{labelled ? "Common Uses" : "Where It's Used"}</PanelTitle>
                {labelled ? (
                  <dl className="space-y-3">
                    {product.applications.map((application) => {
                      const separator = application.indexOf(":");
                      const label = application.slice(0, separator);
                      const value = application.slice(separator + 1).trim();

                      return (
                        <div
                          key={application}
                          className="relative flex flex-col gap-1 border-b border-line/10 pb-3 pl-4 before:absolute before:left-0 before:top-1 before:h-1.5 before:w-1.5 before:rounded-full before:bg-gold-500 last:border-0 last:pb-0"
                        >
                          <dt className="text-[11px] uppercase tracking-[0.2em] text-subtle">
                            {label}
                          </dt>
                          <dd className="text-sm text-fg">{value}</dd>
                        </div>
                      );
                    })}
                  </dl>
                ) : (
                  <ul className="space-y-2 text-sm text-muted">
                    {product.applications.map((application) => (
                      <li key={application} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                        {application}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* Inline RFQ prompt */}
      <section className="container py-12">
        <Reveal y={30}>
          <CtaBand
            kicker="Get pricing"
            title="Share your size, quantity, and artwork, and you'll have a price from us within one business day."
          >
            <Link href={rfqHref} className={pillCta}>
              Price my {product.name}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </CtaBand>
        </Reveal>
      </section>

      {/* Related industries — where this product is used */}
      {relatedInd.length > 0 && (
        <section className="container pb-12">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <Kicker>Put to work in</Kicker>
              <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
                Markets that use it
              </h2>
            </div>
            <Link
              href="/industries"
              className="shrink-0 text-sm text-accent hover:text-accent-hover"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {relatedInd.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 0.08} className="h-full">
                <PhotoCard
                  href={`/industries/${ind.slug}`}
                  src={ind.images?.[0] ?? img.industry(ind.name)}
                  alt={ind.name}
                  title={ind.name}
                  className="aspect-[4/5] !rounded-2xl"
                  titleClass="text-base md:text-lg"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="container pb-20">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <Kicker>More from {category.name}</Kicker>
              <h2 className="font-display text-2xl font-bold tracking-tight text-fg md:text-3xl">
                You may also like
              </h2>
            </div>
            <Link
              href={`/products/${category.slug}`}
              className="shrink-0 text-sm text-accent hover:text-accent-hover"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {related.map((r, ri) => (
              <Reveal key={r.slug} delay={ri * 0.08} className="h-full">
                <ProductTile
                  href={`/products/${category.slug}/${r.slug}`}
                  src={r.gallery?.[0] ?? img.productHero(r.slug)}
                  name={r.name}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized={!(r.gallery?.[0] ?? "/").startsWith("/")}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
