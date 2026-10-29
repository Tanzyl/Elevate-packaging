"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { catalog } from "@/lib/products";
import { img } from "@/lib/images";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ease } from "@/components/motion/tokens";

export function WhatWeMake() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-label="Our product lines"
      className="relative border-t border-line/10 bg-bg py-20 md:py-28"
    >
      <div className="container">
        <div className="mb-12 flex items-center gap-3 md:mb-20">
          <span className="h-px w-10 bg-accent" />
          <p className="text-xs uppercase tracking-[0.35em] text-accent md:text-sm">
            Our product lines
          </p>
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Sticky left column */}
          <div className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <SplitReveal
              as="h2"
              stagger={0.05}
              className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-fg md:text-5xl lg:text-6xl"
            >
              Every product line, made start to finish under one roof.
            </SplitReveal>

            <p className="mt-6 max-w-md text-base text-muted md:text-lg">
              Metallized film, shaped retail bags, and everything between are
              printed, laminated, slit, and converted by our own team.
            </p>

            {/* Stepper */}
            <ol className="mt-10 space-y-3">
              {catalog.map((c, i) => {
                const on = i === active;
                return (
                  <li key={c.slug}>
                    <button
                      onClick={() => {
                        const el = document.getElementById(`wwm-${c.slug}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className="group flex w-full items-center gap-4 text-left"
                    >
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.3em] transition-colors ${on ? "text-accent" : "text-subtle"}`}
                      >
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`relative h-px flex-1 overflow-hidden bg-line/15`}
                      >
                        <motion.span
                          initial={false}
                          animate={{ scaleX: on ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: ease.out }}
                          style={{ transformOrigin: "left" }}
                          className="absolute inset-0 bg-accent"
                        />
                      </span>
                      <span
                        className={`text-sm transition-colors ${on ? "text-fg" : "text-muted group-hover:text-fg"}`}
                      >
                        {c.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <Link
              href="/products"
              className="group mt-10 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover"
            >
              <span>Browse every product</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Right column — one full-height card per category */}
          <div className="flex flex-col gap-10 md:gap-14">
            {catalog.map((c, i) => (
              <Panel
                key={c.slug}
                index={i}
                category={c}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  index,
  category,
  onActivate
}: {
  index: number;
  category: (typeof catalog)[number];
  onActivate: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px", once: false });

  if (inView) onActivate();

  const firstProduct = category.products[0];
  const image =
    img.categories[category.slug as keyof typeof img.categories] ??
    (firstProduct ? img.productHero(firstProduct.slug) : undefined);

  return (
    <motion.article
      ref={ref}
      id={`wwm-${category.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: ease.out }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-line/10 bg-card/40">
        {image && (
          <div className="relative aspect-[16/9] max-h-[42vh] overflow-hidden md:max-h-[48vh]">
            <motion.div
              initial={{ scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: ease.out }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.div>
            <span className="absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/80">
              / {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        <div className="p-5 md:p-6">
          <h3 className="mb-2 font-display text-2xl font-medium leading-tight text-fg md:text-3xl">
            {category.name}
          </h3>
          <p className="max-w-xl text-sm text-muted md:text-base">
            {category.intro}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {category.products.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${category.slug}/${p.slug}`}
                className="rounded-full border border-line/15 bg-bg/40 px-3 py-1 text-xs text-muted transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-fg"
              >
                {p.name}
              </Link>
            ))}
            {category.products.length > 4 && (
              <Link
                href={`/products/${category.slug}`}
                className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent transition hover:bg-accent hover:text-white"
              >
                +{category.products.length - 4} others
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
