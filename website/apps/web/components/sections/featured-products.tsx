"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { img } from "@/lib/images";
import { ease } from "@/components/motion/tokens";

type Ink = "cyan" | "red" | "yellow" | "green" | "magenta" | "gold";

const featured: {
  name: string;
  key: keyof typeof img.products;
  href: string;
  ink: Ink;
}[] = [
  { name: "Stand Up Pouch", key: "stand-up-pouch", href: "/products/pouches/stand-up-pouch", ink: "cyan" },
  { name: "Four/Quad Side Seal", key: "four-side-seal-pouch", href: "/products/pouches/four-side-seal-pouch", ink: "red" },
  { name: "Flat Bottom Pouch", key: "flat-bottom-pouch", href: "/products/pouches/flat-bottom-pouch", ink: "yellow" },
  { name: "Spout / Nozzle Pouch", key: "spout-nozzle-pouch", href: "/products/pouches/spout-nozzle-pouch", ink: "green" },
  { name: "Shaped / Die-Cut Pouch", key: "shaped-die-cut-pouch", href: "/products/pouches/shaped-die-cut-pouch", ink: "magenta" },
  { name: "Box Pouch", key: "box-pouch", href: "/products/pouches/box-pouch", ink: "gold" },
  { name: "Printed Films", key: "rotogravure", href: "/products/printed-films", ink: "cyan" },
  { name: "Holography", key: "holography", href: "/products/plastic-films/holography", ink: "green" }
];

const inkBorder: Record<Ink, string> = {
  cyan: "hover:border-print-cyan/70",
  red: "hover:border-print-red/70",
  yellow: "hover:border-print-yellow/80",
  green: "hover:border-print-green/70",
  magenta: "hover:border-print-magenta/70",
  gold: "hover:border-gold-400/80"
};

const inkDot: Record<Ink, string> = {
  cyan: "bg-print-cyan",
  red: "bg-print-red",
  yellow: "bg-print-yellow",
  green: "bg-print-green",
  magenta: "bg-print-magenta",
  gold: "bg-gold-400"
};

// Hex equivalents for the soft glow halo on hover (CSS box-shadow needs a
// concrete color, can't take a Tailwind utility).
const inkGlowRgb: Record<Ink, string> = {
  cyan: "43, 139, 214",
  red: "197, 107, 54",
  yellow: "244, 185, 66",
  green: "45, 186, 122",
  magenta: "214, 51, 108",
  gold: "212, 167, 61"
};

export function FeaturedProducts() {
  const reduced = useReducedMotion();
  return (
    <section className="relative bg-section/50 py-12 md:py-16">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
          }}
          className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } }
              }}
              className="font-display text-3xl font-semibold text-fg sm:text-4xl md:text-5xl"
            >
              Custom packs, printed in the colors you choose.
            </motion.h2>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 12 },
              show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: ease.out } }
            }}
          >
            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition hover:text-accent-hover"
            >
              Browse the full catalog
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <motion.div
              key={p.key}
              initial={
                reduced
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 56,
                      x: i % 2 === 0 ? -24 : 24,
                      scale: 0.88,
                      rotate: i % 2 === 0 ? -2 : 2
                    }
              }
              whileInView={
                reduced
                  ? { opacity: 1, transition: { duration: 0.35 } }
                  : {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      scale: 1,
                      rotate: 0,
                      transition: { type: "spring", stiffness: 180, damping: 22, mass: 0.9 }
                    }
              }
              viewport={{ once: true, amount: 0.25, margin: "0px 0px -10% 0px" }}
              whileHover={
                reduced
                  ? undefined
                  : { y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } }
              }
              className="group/card relative"
              style={
                {
                  "--ink-rgb": inkGlowRgb[p.ink]
                } as React.CSSProperties
              }
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 left-3 z-10 font-display text-[10px] font-medium uppercase tracking-[0.25em] text-subtle/70"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <Link
                href={p.href}
                className={`group block overflow-hidden rounded-xl border border-line/15 bg-card/60 transition-all duration-300 hover:shadow-[0_18px_50px_-18px_rgb(var(--ink-rgb)/0.55)] ${inkBorder[p.ink]}`}
              >
                <div className="relative aspect-square overflow-hidden bg-section">
                  <Image
                    src={img.products[p.key]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    unoptimized={img.products[p.key].startsWith("/")}
                  />
                  {/* Inky color wash that fades in on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, rgb(var(--ink-rgb) / 0.18) 100%)"
                    }}
                  />
                </div>
                <div className="flex items-center gap-3 p-4">
                  <span aria-hidden className="relative inline-flex h-2.5 w-2.5 shrink-0">
                    {/* Pulsing ring */}
                    <motion.span
                      className={`absolute inset-0 rounded-full ${inkDot[p.ink]}`}
                      animate={
                        reduced
                          ? undefined
                          : { scale: [1, 1.7, 1], opacity: [0.45, 0, 0.45] }
                      }
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.15
                      }}
                    />
                    {/* Solid dot, scales on card hover */}
                    <span
                      className={`relative h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-150 ${inkDot[p.ink]}`}
                    />
                  </span>
                  <h3 className="sm:truncate text-sm font-medium text-fg transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <span
                    aria-hidden
                    className="ml-auto translate-x-[-4px] text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
