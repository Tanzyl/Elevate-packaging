"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site-config";

// Seamless scrolling trust strip — the value props loop horizontally.
// Defaults to the global feature badges; pass `items` to reuse on other pages
// (e.g. the About page) with page-specific copy.
// The loop is Framer-driven, so the global CSS prefers-reduced-motion rule
// can't stop it — gate it here instead (static row, one copy of the items).
export function FeatureBadges({ items: itemsProp }: { items?: readonly string[] } = {}) {
  const reduced = useReducedMotion();
  const source = itemsProp ?? site.featureBadges;
  const items = reduced ? [...source] : [...source, ...source];

  return (
    <section className="relative overflow-hidden border-y border-line/10 bg-section/60">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg to-transparent md:w-24" />

      <motion.div
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className={`flex items-center gap-10 py-5 md:gap-16 ${
          reduced ? "w-full flex-wrap justify-center" : "w-max"
        }`}
      >
        {items.map((b, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap text-xs uppercase tracking-[0.25em] text-muted"
          >
            <span className="text-accent">◆</span>
            {b}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
