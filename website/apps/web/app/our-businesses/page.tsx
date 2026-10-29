import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { businesses } from "@/lib/businesses";

import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Our Divisions",
  description:
    "Inside Elevate: an artwork design studio, pre-press and repro, cylinder making, plastic film, flexible packaging, and sustainable packaging.",
  path: "/our-businesses"
});

// Bento placement on lg: first division is the 2×2 hero tile, the rest fill around it.
const BENTO = ["lg:col-span-2 lg:row-span-2", "", "", "", "", ""];

export default function OurBusinessesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Divisions"
        title="One Team. Many Specialties."
        lead="Artwork, pre-press, cylinders, film, and the finished pack: Elevate handles every step of production under one roof."
        aside={
          <ol className="glass relative rounded-3xl p-5 shadow-[0_24px_60px_-30px_rgb(var(--accent)/0.5)]">
            {businesses.map((b, i) => (
              <li key={b.slug}>
                <a
                  href={`#${b.slug}`}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-accent/10"
                >
                  <span className="font-mono text-xs text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-medium text-fg group-hover:text-accent">
                    {b.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={14}
                    className="text-subtle transition group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
          </ol>
        }
      />

      <section className="container py-12 md:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:auto-rows-[320px] lg:grid-cols-3">
          {businesses.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 3) * 0.08} className={BENTO[i] ?? ""}>
              <Link
                id={b.slug}
                href={`/our-businesses/${b.slug}`}
                className="card-lift group relative flex h-full min-h-[340px] scroll-mt-28 lg:min-h-0 flex-col justify-end overflow-hidden rounded-3xl border border-line/10 bg-section"
              >
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  unoptimized
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
                <span className="absolute left-5 top-5 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-accent"
                >
                  <ArrowUpRight size={18} />
                </span>
                <div className="relative p-6 md:p-7">
                  <h2
                    className={`font-display font-bold leading-tight text-white ${
                      i === 0 ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {b.name}
                  </h2>
                  <p className={`mt-2 text-sm leading-relaxed text-white/80 ${i === 0 ? "max-w-lg md:text-base" : ""}`}>
                    {b.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-300">
                    Explore
                    <span aria-hidden className="h-px w-6 bg-gold-300 transition-all group-hover:w-10" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
