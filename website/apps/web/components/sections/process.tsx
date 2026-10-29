"use client";

import { motion } from "framer-motion";
import { PenTool, Printer, Layers, Truck } from "lucide-react";
import { ease } from "@/components/motion/tokens";

const steps = [
  {
    Icon: PenTool,
    title: "Brief & artwork",
    body: "Tell us about your product, fill method and shelf-life goals. Our studio preps your artwork and proofs the colors."
  },
  {
    Icon: Printer,
    title: "Print",
    body: "Rotogravure or flexo, up to 8 colors, matched to your approved proof and checked on press."
  },
  {
    Icon: Layers,
    title: "Laminate & convert",
    body: "We build the barrier structure your product needs, then form it into pouches, bags or roll stock."
  },
  {
    Icon: Truck,
    title: "Deliver",
    body: "Finished packs are inspected, packed and shipped to your line, ready to fill."
  }
];

export function Process() {
  return (
    <section aria-label="How it works" className="container py-12 md:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-accent">How it works</p>
        <h2 className="font-display text-3xl font-semibold leading-tight text-fg md:text-5xl">
          From first sketch to filled shelf.
        </h2>
      </div>

      <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Connector line behind the step numbers (desktop) */}
        <span aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-accent/40 via-gold-500/50 to-accent/10 lg:block" />
        {steps.map(({ Icon, title, body }, i) => (
          <motion.li
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: ease.out }}
            className="relative"
          >
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-accent">
              <Icon size={22} strokeWidth={1.75} />
            </span>
            <p className="mt-5 font-mono text-xs text-gold-600">Step {String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-fg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
