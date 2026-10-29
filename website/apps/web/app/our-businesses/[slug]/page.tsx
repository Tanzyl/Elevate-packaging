import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  Layers,
  MessageCircle,
  PenTool,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { businesses, getBusinessBySlug, otherBusinesses } from "@/lib/businesses";
import { categoryBySlug, productBySlug } from "@/lib/products";
import { site } from "@/lib/site-config";
import { CtaBand } from "@/components/industries/cta-band";
import { PhotoTile } from "@/components/industries/photo-tile";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { pageSeo, breadcrumbLd, serviceLd } from "@/lib/seo";

const CAPABILITY_ICONS = [Sparkles, Layers, PenTool, ShieldCheck];

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const business = getBusinessBySlug(params.slug);
  const path = `/our-businesses/${params.slug}`;
  if (!business) {
    return pageSeo({
      title: "Our Divisions",
      description: "The specialist divisions that make up Elevate.",
      path
    });
  }
  return pageSeo({
    title: `${business.name} | Our Divisions`,
    description: business.description,
    path,
    image: business.image
  });
}

export default function BusinessDetailPage({ params }: { params: Params }) {
  const business = getBusinessBySlug(params.slug);
  if (!business) notFound();

  const others = otherBusinesses(business.slug);
  const path = `/our-businesses/${business.slug}`;
  // rfq-form reads ?category= and ?product=; preselect the first related product.
  const first = business.relatedProducts[0];
  const rfqHref = first
    ? `/rfq?category=${first.category}${first.product ? `&product=${first.product}` : ""}`
    : "/rfq";
  const index = businesses.findIndex((b) => b.slug === business.slug) + 1;

  // Resolve catalogue links; skip anything whose slug no longer exists.
  const related = business.relatedProducts.flatMap((r) => {
    const cat = categoryBySlug(r.category);
    if (!cat) return [];
    if (!r.product) {
      return [
        {
          key: cat.slug,
          name: cat.name,
          text: cat.intro.replace(/\*\*/g, ""),
          href: `/products/${cat.slug}`,
          image: cat.products[0]?.gallery?.[0]
        }
      ];
    }
    const p = productBySlug(r.category, r.product);
    if (!p) return [];
    return [
      {
        key: `${cat.slug}/${p.slug}`,
        name: p.name,
        // Summaries carry **bold** markup for the product page; plain text here.
        text: p.summary.replace(/\*\*/g, ""),
        href: `/products/${cat.slug}/${p.slug}`,
        image: p.gallery?.[0]
      }
    ];
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Our Divisions", path: "/our-businesses" },
            { name: business.name, path }
          ]),
          serviceLd({
            name: business.name,
            description: business.description,
            path
          })
        ]}
      />

      <section className="mesh-bg relative isolate overflow-hidden border-b border-line/10">
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-accent/15" />
        <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-gold-500/25" />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="container flex flex-wrap items-center gap-2 pt-8 text-xs text-subtle"
        >
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/our-businesses" className="hover:text-accent">
            Our Businesses
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted">{business.name}</span>
        </nav>

        {/* Hero: text first on mobile so H1 + CTA land above the fold */}
        <div className="container grid items-center gap-10 py-8 md:grid-cols-2 md:gap-14 md:py-12">
          <div className="order-2 md:order-1">
            <div className="relative mx-auto w-full max-w-md">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-gold-500/25" />
              <div aria-hidden className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-3xl border-2 border-dashed sm:block border-accent/30" />
              <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-card p-3 shadow-[0_30px_60px_-30px_rgb(var(--accent)/0.45)]">
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                  <Image
                    src={business.image}
                    alt={business.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                    / {String(index).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Division
            </p>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg md:text-5xl">
              {business.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{business.tagline}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={rfqHref}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-accent transition hover:bg-accent-hover"
              >
                Get a Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Elevate, I have a question about ${business.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line/15 bg-card/60 px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
              >
                <MessageCircle size={16} />
                Message us on WhatsApp
              </a>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {business.highlights.map((h) => (
                <div key={h.label} className="glass rounded-2xl p-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-600">
                    {h.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug text-fg">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Overview + capabilities */}
      <section className="container grid gap-10 py-14 md:py-20 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
              At a glance
            </p>
            <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
              What this division handles
            </h2>
            <div className="mt-5 space-y-4 border-l-2 border-accent/30 pl-5 text-sm leading-relaxed text-muted md:text-base">
              {business.overview.map((p, i) => (
                <p key={i}>
                  {p.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="font-semibold text-fg">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
            Strengths
          </p>
          <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
            What we do best
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {business.capabilities.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length];
              return (
                <Reveal key={c.title} delay={i * 0.06} className="h-full">
                  <div className="card-lift h-full rounded-3xl border border-line/10 bg-card p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-xs text-gold-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-fg">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-section py-14 md:py-16">
          <div className="container">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
                  From our catalog
                </p>
                <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
                  Products to explore
                </h2>
              </div>
              <Link
                href="/products"
                className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover"
              >
                Full catalog →
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, ri) => (
                <Reveal key={r.key} delay={ri * 0.08} className="h-full">
                  <Link
                    href={r.href}
                    className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-card"
                  >
                    {r.image && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-section">
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display font-semibold text-fg transition-colors group-hover:text-accent">
                        {r.name}
                      </h3>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted">
                        {r.text}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inline RFQ prompt */}
      <div className="pt-14 md:pt-16">
        <CtaBand
          eyebrow={`Partner with ${business.name}`}
          title={
            <>
              Share your product and order volumes, and you&apos;ll have a
              proposal from us within one business day.
            </>
          }
          href={rfqHref}
          label="Begin your inquiry"
        />
      </div>

      {/* Other businesses */}
      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
              Across Elevate
            </p>
            <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
              More divisions
            </h2>
          </div>
          <Link
            href="/our-businesses"
            className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {others.map((b, bi) => (
            <Reveal key={b.slug} delay={bi * 0.08}>
              <PhotoTile
                href={`/our-businesses/${b.slug}`}
                image={b.image}
                name={b.name}
                kicker={`/ ${String(businesses.findIndex((x) => x.slug === b.slug) + 1).padStart(2, "0")}`}
                sizes="(max-width: 640px) 50vw, 20vw"
                unoptimized
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
