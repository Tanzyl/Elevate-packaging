"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Printer,
  Factory,
  Package,
  Globe,
  ArrowUpRight
} from "lucide-react";
import { useCountUp } from "@/components/motion/use-count-up";
import { ease } from "@/components/motion/tokens";

type Stat = {
  n: number;
  suffix?: string;
  unit?: string;
  label: string;
  kicker: string;
  Icon: typeof Printer;
  /** CMYK registration dot — decorative print identity only, never structural. */
  dot: string;
};

const stats: Stat[] = [
  {
    n: 8,
    label: "Colors per job on our gravure and flexo presses",
    kicker: "Color",
    Icon: Printer,
    dot: "bg-print-yellow"
  },
  {
    n: 25,
    label: "Markets served, from food to pharma to retail",
    kicker: "Markets",
    Icon: Factory,
    dot: "bg-print-red"
  },
  {
    n: 2,
    suffix: "M+",
    label: "Printed pouches shipped to customers each month",
    kicker: "Output",
    Icon: Package,
    dot: "bg-print-green"
  },
  {
    n: 50,
    suffix: "",
    label: "States we ship to across the country",
    kicker: "Coverage",
    Icon: Globe,
    dot: "bg-print-cyan"
  }
];

function Tile({ s, idx }: { s: Stat; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useCountUp(s.n, inView, 1.8);
  const display = Math.round(value).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: ease.out }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line/10 bg-card/60 p-4 transition-colors hover:border-accent/30 sm:p-6 md:p-7"
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${s.dot}`}
          />
          <span className="whitespace-nowrap font-mono">/ {String(idx + 1).padStart(2, "0")}</span>
          <span className="whitespace-nowrap">{s.kicker}</span>
        </span>
        <s.Icon
          size={18}
          strokeWidth={1.5}
          className="text-accent opacity-80 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      <div className="mt-4 sm:mt-6">
        <p className="flex items-baseline gap-1 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl">
          <span className="tabular-nums">{display}</span>
          {s.suffix && (
            <span className="text-2xl opacity-80 sm:text-3xl md:text-4xl">{s.suffix}</span>
          )}
          {s.unit && (
            <span className="ml-1 text-lg font-medium text-muted md:text-xl">
              {s.unit}
            </span>
          )}
        </p>
        <p className="mt-2 max-w-[24ch] text-xs leading-snug text-muted sm:mt-3 sm:text-sm">
          {s.label}
        </p>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-6 h-px origin-left scale-x-0 bg-accent/60 transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.div>
  );
}

export function Stats() {
  return (
    <section
      aria-label="Elevate in numbers"
      className="relative border-y border-line/10 bg-section/40"
    >
      <div className="container py-12 md:py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-accent md:text-sm">
              Quick facts
            </p>
            <h2 className="max-w-3xl font-display text-2xl font-medium leading-tight text-fg md:text-4xl">
              Ready for Volume. Relied On by Many Markets.
            </h2>
            <p>
              Production muscle, hands-on market know-how, and coast-to-coast shipping let us support
              <br className="hidden sm:inline" /> brands in all kinds of categories.
            </p>
          </div>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover"
          >
            <span>Get to know us</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Tile key={s.label} s={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
