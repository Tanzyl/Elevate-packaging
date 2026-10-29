"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { ease } from "@/components/motion/tokens";

// Closing conversion band — the last section before the footer, so the page
// ends on the action both buyer types came for (RFQ for procurement teams,
// WhatsApp for smaller direct buyers) instead of trailing off after Partners.
export function ClosingCta() {
  const whatsappHref = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${site.brand}, I'd like pricing on packaging for my product.`
  )}`;

  return (
    <section
      aria-label="Kick off your packaging project"
      className="relative border-t border-line/10 bg-section/60"
    >
      <div className="container py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: ease.out }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent md:text-sm">
              <span className="h-px w-10 bg-accent/70" />
              Ready when you are
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight text-fg md:text-5xl">
              Your product deserves a better pack.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              Whether it&apos;s a single SKU or a full product line, share your goals and we&apos;ll suggest the film, pouch, or bag that fits best.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/rfq"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white shadow-accent transition-colors hover:bg-accent-hover md:px-7 md:text-base"
              >
                <span>Get a Quote</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line/15 px-6 py-3.5 text-sm font-medium text-fg transition hover:border-emerald-500 hover:text-emerald-600 md:px-7 md:text-base"
              >
                <WhatsAppIcon className="h-4 w-4 fill-emerald-500" />
                Message on WhatsApp
              </a>
            </div>
            <p className="text-xs font-medium text-fg/80 md:text-sm">
              Whichever you pick, we answer within one business day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
