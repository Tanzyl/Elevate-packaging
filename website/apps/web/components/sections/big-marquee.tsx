"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";

const phrases = [
  "Custom Pouches",
  "Fresh Ideas",
  "Metallized Films",
  "Built to Last",
  "American Made",
  "Layered for Protection"
];

export function BigMarquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line/10 bg-section/40 py-10 md:py-14"
    >
      <InfiniteSlider
        className="flex h-full w-full items-center"
        duration={48}
        gap={80}
      >
        {phrases.map((p, i) => (
          <span
            key={`${p}-${i}`}
            className="flex items-center gap-20 whitespace-nowrap font-display text-5xl font-semibold uppercase tracking-tight text-fg/10 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span
              className="bg-gradient-to-b from-fg/70 via-fg/20 to-transparent bg-clip-text text-transparent"
              style={{ WebkitTextStroke: "1px rgb(var(--accent) / 0.25)" }}
            >
              {p}
            </span>
            <span className="text-accent/50">·</span>
          </span>
        ))}
      </InfiniteSlider>
    </section>
  );
}
