import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Gauge,
  Layers,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import {
  industries,
  getIndustryBySlug,
  relatedIndustries,
  groupSlug
} from "@/lib/industries";
import { img } from "@/lib/images";
import { site } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/json-ld";
import { ProductGallery } from "@/components/product-gallery";
import { CtaBand } from "@/components/industries/cta-band";
import { PhotoTile } from "@/components/industries/photo-tile";
import { pageSeo, breadcrumbLd, serviceLd } from "@/lib/seo";

function highlightPhrases(text: string, phrases: string | string[]) {
  const terms = Array.isArray(phrases) ? phrases : [phrases];
  const escapedTerms = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const parts = text.split(new RegExp(`(${escapedTerms.join("|")})`, "gi"));

  return parts.map((part, index) =>
    terms.some((term) => term.toLowerCase() === part.toLowerCase()) ? (
      <strong key={index} className="font-semibold text-fg">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

const FEATURE_ICONS = [ShieldCheck, Layers, Sparkles, Gauge, BadgeCheck];

export const revalidate = 60;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const industry = getIndustryBySlug(params.slug);
  const path = `/industries/${params.slug}`;
  if (!industry) {
    return pageSeo({
      title: "Market",
      description: "Flexible packaging made by Elevate.",
      path
    });
  }
  return pageSeo({
    title: `${industry.name} | Custom Flexible Packaging`,
    description: industry.blurb,
    path,
    image: industry.images?.[0] ?? img.industry(industry.name)
  });
}

export default function IndustryDetailPage({ params }: { params: Params }) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const gallery = industry.images ?? [];
  const heroImage = gallery[0] ?? img.industry(industry.name);
  const related = relatedIndustries(industry.slug);
  const rfqHref = `/rfq?industry=${encodeURIComponent(industry.slug)}`;
  const path = `/industries/${industry.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            {
              name: industry.group,
              path: `/industries#${groupSlug(industry.group)}`
            },
            { name: industry.name, path }
          ]),
          serviceLd({
            name: `${industry.name} Packaging`,
            description: industry.blurb,
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
          <Link href="/industries" className="hover:text-accent">
            Industries
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/industries#${groupSlug(industry.group)}`}
            className="hover:text-accent"
          >
            {industry.group}
          </Link>
          <ChevronRight size={12} />
          <span className="text-muted">{industry.name}</span>
        </nav>

        {/* Hero — no Reveal around the gallery: it's the LCP element and a
            JS-gated opacity reveal held its paint back ~3s. Text first on
            mobile so H1 + quote CTA land above the fold. */}
        <div className="container grid items-center gap-10 py-8 md:grid-cols-2 md:gap-14 md:py-12">
          <div className="order-2 md:order-1">
            <div className="relative mx-auto w-full max-w-sm">
              <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-gold-500/25" />
              <div aria-hidden className="absolute -left-4 -top-4 hidden h-24 w-24 rounded-3xl border-2 border-dashed sm:block border-accent/30" />
              <div className="relative rounded-3xl border border-line/10 bg-card p-3 shadow-[0_30px_60px_-30px_rgb(var(--accent)/0.45)]">
                {gallery.length > 0 ? (
                  <ProductGallery images={gallery} alt={industry.name} />
                ) : (
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={heroImage}
                      alt={industry.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover"
                      unoptimized={!heroImage.startsWith("/")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {industry.group}
            </p>
            <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg md:text-5xl">
              {industry.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{industry.blurb}</p>

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
                  `Hello Elevate, I have a question about ${industry.name} packaging.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line/15 bg-card/60 px-6 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
              >
                <MessageCircle size={16} />
                Message us on WhatsApp
              </a>
            </div>
            <div aria-hidden className="mt-8 flex gap-1.5">
              <span className="h-1 w-12 rounded-full bg-accent" />
              <span className="h-1 w-6 rounded-full bg-gold-500" />
              <span className="h-1 w-3 rounded-full bg-accent/30" />
            </div>
          </div>
        </div>
      </section>

      {industry.detailContent && (
        <section className="container py-14 md:py-20">
          {/* Challenge → approach contrast */}
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-line/10 bg-card p-7 md:p-10">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
                  01 · The challenge
                </p>
                <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">What&apos;s at Stake</h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {industry.detailContent.challenge}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="band-dark relative isolate h-full overflow-hidden rounded-3xl p-7 md:p-10">
                <div aria-hidden className="absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl" />
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold-300">
                  02 · Our approach
                </p>
                <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">How We Solve It</h2>
                <p className="mt-4 leading-relaxed text-muted">
                  {industry.detailContent.approachBold
                    ? highlightPhrases(
                        industry.detailContent.approach,
                        industry.detailContent.approachBold
                      )
                    : industry.detailContent.approach}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Features */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industry.detailContent.features.map((feature, fi) => {
              const Icon = FEATURE_ICONS[fi % FEATURE_ICONS.length];
              return (
                <Reveal key={feature.title} delay={fi * 0.07} className="h-full">
                  <div className="card-lift h-full rounded-3xl border border-line/10 bg-card p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-xs text-gold-600">
                        {String(fi + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-fg">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {feature.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Inline RFQ prompt */}
      <CtaBand
        eyebrow="Get pricing"
        title={
          <>
            Send your product, size, quantity, and artwork, and you&apos;ll get
            a price from us within one business day.
          </>
        }
        href={rfqHref}
        label={`Get a ${industry.name} quote`}
      />

      {/* Related industries */}
      {related.length > 0 && (
        <section className="container pb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
                Also in {industry.group}
              </p>
              <h2 className="font-display text-2xl font-bold text-fg md:text-3xl">
                Similar markets
              </h2>
            </div>
            <Link
              href={`/industries#${groupSlug(industry.group)}`}
              className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {related.map((r, ri) => (
              <Reveal key={r.slug} delay={ri * 0.08}>
                <PhotoTile
                  href={`/industries/${r.slug}`}
                  image={r.images?.[0] ?? img.industry(r.name)}
                  name={r.name}
                  kicker={String(ri + 1).padStart(2, "0")}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  aspect="aspect-[4/5] sm:aspect-[4/3]"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
