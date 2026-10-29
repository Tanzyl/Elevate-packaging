import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { getCatalog } from "@/lib/content-source";
import { img } from "@/lib/images";
import { Reveal } from "@/components/motion/reveal";
import { Kicker, PhotoCard, CtaBand, pillCta } from "@/components/products/ui";

import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Our Products",
  description:
    "Browse what Elevate makes: printed films, plastic films, and high-barrier pouches in a wide range of formats, printed in up to 8 colors by rotogravure or flexo.",
  path: "/products"
});
export const revalidate = 60;

const inkDot: Record<string, string> = {
  "printed-films": "bg-print-cyan",
  "plastic-films": "bg-print-magenta",
  pouches: "bg-print-red"
};

const catImg = (slug: string) =>
  img.categories[slug as keyof typeof img.categories];

export default async function ProductsPage() {
  const catalog = await getCatalog();
  const [a, b] = catalog;
  return (
    <>
      <PageHeader
        eyebrow="What we make"
        title="Flexible Packaging Built Around You"
        lead="Printed films, plastic films, and high-barrier pouches, all made to order with multi-layer constructions and up to 8 colors of print."
        aside={
          a && b ? (
            <div aria-hidden className="relative hidden h-64 w-80 lg:block">
              <div className="absolute -bottom-3 right-0 h-48 w-60 rounded-3xl bg-gold-500/20" />
              <div className="absolute right-4 top-0 h-52 w-60 overflow-hidden rounded-3xl border-4 border-card shadow-xl">
                <Image src={catImg(a.slug)} alt="" fill sizes="240px" className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 h-36 w-36 overflow-hidden rounded-2xl border-4 border-card shadow-xl">
                <Image src={catImg(b.slug)} alt="" fill sizes="144px" className="object-cover" />
              </div>
              <div className="glass absolute left-2 top-6 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-fg shadow-lg">
                <span className="flex gap-0.5">
                  <span className="h-2 w-2 rounded-full bg-print-cyan" />
                  <span className="h-2 w-2 rounded-full bg-print-magenta" />
                  <span className="h-2 w-2 rounded-full bg-print-yellow" />
                </span>
                Up to 8 colors
              </div>
            </div>
          ) : undefined
        }
      />

      <section
        aria-label="Shop by category"
        className="container py-12 md:py-20"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div>
            <Kicker>Shop by category</Kicker>
            <h2 className="font-display text-3xl font-bold tracking-tight text-fg md:text-5xl">
              Three ways to <span className="text-gradient">package.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-base">
            Open a category for all its options, finishes, and specs. Any
            item can be customized with up to 8-color printing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-3">
          {catalog.map((cat, ci) => {
            const feature = ci === 0;
            return (
              <Reveal
                key={cat.slug}
                delay={Math.min(ci * 0.08, 0.24)}
                className={
                  feature ? "h-full sm:col-span-2 lg:row-span-2" : "h-full"
                }
              >
                <PhotoCard
                  href={`/products/${cat.slug}`}
                  src={catImg(cat.slug)}
                  alt={cat.name}
                  index={ci}
                  title={cat.name}
                  className={feature ? "min-h-[420px]" : "min-h-[340px] lg:min-h-0"}
                  titleClass={feature ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}
                  sizes={
                    feature
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  }
                  meta={
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <span className={`h-1.5 w-1.5 rounded-full ${inkDot[cat.slug] ?? "bg-gold-400"}`} />
                      {cat.products.length} items
                    </span>
                  }
                >
                  <p
                    className={`mt-2 max-w-xl text-sm leading-relaxed text-white/80 ${feature ? "line-clamp-3 md:text-base" : "line-clamp-2"}`}
                  >
                    {cat.intro.split("\n\n")[0].replace(/\*\*/g, "")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-300">
                    See all {cat.name.toLowerCase()}
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </PhotoCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        aria-label="Custom packaging pricing"
        className="container pb-16 md:pb-24"
      >
        <Reveal>
          <CtaBand
            title="Need something different?"
            text={
              <>
                Send us your artwork, barrier needs, and quantities, and we&apos;ll
                price a tailored option from across our 3 product lines.
              </>
            }
          >
            <Link href="/rfq" className={pillCta}>
              Get pricing
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </CtaBand>
        </Reveal>
      </section>
    </>
  );
}
