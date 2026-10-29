"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getIndustryBySlug, type Industry } from "@/lib/industries";
import { ease } from "@/components/motion/tokens";

// One tile per industry — the five headline industries picked by the client.
// Each tile uses the industry's lead photo from industries.ts.
const FEATURED_SLUGS = [
  "rice-packaging",
  "pink-salt-packaging",
  "fertilizer-packaging",
  "snacks-confectionery-packaging",
  "pet-food-pet-care-packaging"
] as const;

const featured = FEATURED_SLUGS.map((slug) => getIndustryBySlug(slug)).filter(
  (i): i is Industry => Boolean(i?.images?.[0])
);

export function IndustryShowcase() {
  return (
    <section className="relative border-t border-line/10 bg-bg">
      <div className="container py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: ease.out }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10"
        >
          <div>
            <p className="mb-3 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent md:text-sm">
              <span className="h-px w-10 bg-accent/70" />
              Markets we support
            </p>
            <h2 className="font-display text-2xl font-medium leading-tight text-fg md:text-4xl">
              Packaging Tailored to Your Market
            </h2>
          </div>
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition hover:gap-3"
          >
            See every market
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4"
        >
          {featured.map((ind) => (
            <motion.li
              key={ind.slug}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } }
              }}
            >
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-line/10 bg-card md:rounded-2xl"
              >
                <Image
                  src={ind.images![0]}
                  alt={ind.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 260px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3 pt-8 md:p-4">
                  <span className="block text-xs font-medium leading-snug text-white md:text-sm">
                    {ind.name}
                  </span>
                  <span className="mt-0.5 hidden text-xs uppercase tracking-widest text-white/60 md:block">
                    {ind.group}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
