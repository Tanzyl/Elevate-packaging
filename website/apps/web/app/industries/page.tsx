import Link from "next/link";
import { FileText, Layers } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { IndustryCard } from "@/components/industries/industry-card";
import { Reveal } from "@/components/motion/reveal";
import { industries, industriesByGroup, groupSlug } from "@/lib/industries";
import { img } from "@/lib/images";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Markets We Package For",
  description:
    "Flexible packaging built for food and beverage, consumer, industrial, and retail brands, covering snacks, tea, coffee, and pink salt through detergents, pharma, and agrochemicals.",
  path: "/industries"
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Markets"
        title="Who we package for"
        lead="Every product category has its own needs, so we match the materials, print method, and finish to each one."
        aside={
          <div className="glass relative rounded-3xl p-6 shadow-[0_24px_60px_-30px_rgb(var(--accent)/0.5)]">
            <div className="mb-5 flex items-center gap-4 border-b border-line/10 pb-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-white">
                <Layers size={20} />
              </span>
              <div className="flex gap-6">
                <div>
                  <p className="font-display text-2xl font-bold text-fg">{industries.length}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-subtle">Markets</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-gold-600">{industriesByGroup.length}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-subtle">Groups</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-muted">
              <p>
                From drinks and medicines to food, retail goods, and farm products, the package starts with what the product demands. Film build, barrier level, artwork, and pouch style can all change depending on what needs protecting and how it will be sold.
              </p>
              <p>
                We build packs that run smoothly on filling lines and hold up on store shelves, while leaving brands free to pick the format and finish that suits them.
              </p>
            </div>
          </div>
        }
      />

      {/* Sticky group jump-nav */}
      <nav
        aria-label="Market groups"
        className="glass sticky top-16 z-30 border-x-0 border-t-0"
      >
        <div className="container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {industriesByGroup.map(({ group, items }, gi) => (
            <a
              key={group}
              href={`#${groupSlug(group)}`}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line/10 bg-card/70 px-4 py-1.5 text-sm font-medium text-fg transition hover:border-accent/40 hover:bg-accent hover:text-white"
            >
              <span className="font-mono text-[11px] text-gold-600 group-hover:text-white">
                {String(gi + 1).padStart(2, "0")}
              </span>
              {group}
              <span className="rounded-full bg-section px-1.5 text-[11px] text-subtle group-hover:bg-white/20 group-hover:text-white">
                {items.length}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {industriesByGroup.map(({ group, items }, gi) => (
        <section
          key={group}
          id={groupSlug(group)}
          aria-label={group}
          className={`scroll-mt-32 ${gi % 2 === 1 ? "bg-section" : ""}`}
        >
          <div className="container py-12 md:py-16">
            <div className="mb-8 flex flex-wrap items-end gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
                  Group {String(gi + 1).padStart(2, "0")} · {items.length} markets
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
                  {group}
                </h2>
              </div>
              <Link
                href={`/rfq?category=${groupSlug(group)}`}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-white"
              >
                <FileText size={14} strokeWidth={2} />
                Get Pricing
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((ind, i) => (
                <Reveal key={ind.slug} delay={(i % 3) * 0.08} className="h-full">
                  <IndustryCard
                    index={i}
                    slug={ind.slug}
                    name={ind.name}
                    blurb={ind.blurb}
                    displayImage={ind.images?.[0] ?? img.industry(ind.name)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
