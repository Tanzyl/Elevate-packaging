"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site-config";
import { img } from "@/lib/images";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ease } from "@/components/motion/tokens";

// Quick facts shown under the CTAs — capabilities, not company-history claims.
const facts = [
  { value: "8", label: "Print colors" },
  { value: "13", label: "Pouch styles" },
  { value: "3–4 wk", label: "Typical lead time" }
];

// Floating chips over the hero image.
const chips = [
  { text: "Rotogravure & flexo", className: "left-[-0.75rem] top-8 md:left-[-2rem]" },
  { text: "Recyclable mono-material", className: "bottom-24 right-[-0.75rem] md:right-[-1.5rem]" }
];

export function Hero() {
  return (
    <section aria-label="Introduction" className="relative isolate overflow-hidden">
      {/* Faint blueprint grid behind everything */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(rgb(var(--line)/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.12)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]"
      />

      <div className="container grid grid-cols-1 items-center gap-10 py-8 md:py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            American-Made Flexible Packaging
          </motion.span>

          <SplitReveal
            as="h1"
            delay={0.2}
            stagger={0.045}
            className="text-pretty font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl xl:text-[3.6rem]"
          >
            Packaging That Helps Your Brand Stand Out
          </SplitReveal>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: ease.out }}
            className="mt-4 max-w-lg text-base leading-relaxed text-muted"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: ease.out }}
            className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Magnetic className="inline-block">
              <Link
                href="/rfq"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-accent transition-colors hover:bg-accent-hover md:px-7 md:text-base"
              >
                <span>Get a Quote</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
            </Magnetic>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-line/20 bg-card px-6 py-3.5 text-sm font-medium text-fg transition hover:border-accent hover:text-accent md:px-7 md:text-base"
            >
              See What We Make
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 grid max-w-md grid-cols-3 divide-x divide-line/15 border-t border-line/15 pt-4"
          >
            {facts.map((f) => (
              <div key={f.label} className="px-4 first:pl-0">
                <dt className="text-xs text-muted">{f.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-fg">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Framed image with copper offset block and floating chips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: ease.out }}
          className="relative mx-4 md:mx-8 lg:mx-0"
        >
          <div aria-hidden className="absolute -bottom-4 -right-4 h-2/3 w-2/3 rounded-3xl bg-gold-500/90" />
          <div aria-hidden className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl border-2 border-dashed border-accent/30" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line/10 bg-card shadow-2xl shadow-primary-900/15 sm:aspect-[5/4] lg:aspect-auto lg:h-[min(64vh,560px)]">
            <Image
              src={img.hero}
              alt="A lineup of custom printed Elevate pouches"
              fill
              priority
              quality={75}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="animate-ken-burns object-cover object-[70%_60%]"
            />
          </div>
          {chips.map((c, i) => (
            <motion.span
              key={c.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: ease.out }}
              className={`absolute ${c.className} inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-medium text-fg shadow-lg ring-1 ring-line/10`}
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              {c.text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
