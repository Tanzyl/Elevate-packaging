"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ImageOff } from "lucide-react";

// Faithful approximation of the public site treatments — small enough to fit
// inside the form Gallery section, accurate enough that the admin can see what
// the change will look like before they save.

type Variant = "card" | "detail";

const inkDot = "bg-print-cyan";

export function ProductPreview({
  name,
  summary,
  gallery
}: {
  name: string;
  summary?: string;
  gallery: string[];
}) {
  const cover = gallery[0];

  return (
    <div className="rounded-lg border border-primary-100 bg-primary-50/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary-700">
          Live preview · how it appears on the site
        </p>
        <p className="text-[10px] text-primary-700/70">
          Cover = first image
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <PreviewCard variant="card" name={name} cover={cover} />
        <PreviewCard variant="detail" name={name} summary={summary} cover={cover} />
      </div>
    </div>
  );
}

function PreviewCard({
  variant,
  name,
  summary,
  cover
}: {
  variant: Variant;
  name: string;
  summary?: string;
  cover?: string;
}) {
  const heading =
    variant === "card" ? "Listing card" : "Detail page hero";

  return (
    <div>
      <p className="mb-1.5 text-[10px] uppercase tracking-wider text-slate-500">
        {heading}
      </p>
      <div
        className={
          variant === "card"
            ? "relative overflow-hidden rounded-xl border border-slate-200 bg-white"
            : "relative overflow-hidden rounded-xl border border-slate-200 bg-white"
        }
      >
        <div
          className={
            variant === "card"
              ? "relative aspect-square w-full bg-slate-100"
              : "relative aspect-[16/9] w-full bg-slate-100"
          }
        >
          <AnimatePresence mode="wait">
            {cover ? (
              <motion.div
                key={cover}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={cover}
                  alt={name || "Preview"}
                  fill
                  sizes={variant === "card" ? "300px" : "560px"}
                  className="object-cover"
                  unoptimized
                />
                {variant === "detail" ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 grid place-items-center text-slate-400"
              >
                <div className="text-center">
                  <ImageOff size={22} strokeWidth={1.4} className="mx-auto mb-2" />
                  <p className="text-xs">Add an image to preview</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {variant === "card" ? (
          <div className="flex items-center gap-2 p-3">
            <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${inkDot}`} />
            <p className="truncate text-xs font-medium text-slate-900">
              {name || "Product name"}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <p className="font-display text-sm font-semibold leading-tight">
              {name || "Product name"}
            </p>
            {summary ? (
              <p className="mt-0.5 line-clamp-2 text-[10px] text-white/80">
                {summary}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
