"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { technologies } from "@/lib/home-content";
import { SplitReveal } from "@/components/motion/split-reveal";

// Duplicate the list so the scroller can loop seamlessly: we wrap scrollLeft
// at exactly one copy's width (scrollWidth / 2).
const marqueeItems = [...technologies, ...technologies];

const AUTO_SPEED = 45; // px per second

export function TechnologyGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Interaction state kept in a ref so the rAF loop reads live values.
  const s = useRef({ paused: false, down: false, startX: 0, startLeft: 0, moved: false });

  // Continuous auto-scroll; wraps seamlessly at half the track width.
  // rAF-driven, so the global CSS prefers-reduced-motion rule can't stop it —
  // skip the loop entirely for reduced-motion users (drag/swipe still works).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      const half = el.scrollWidth / 2;
      if (half > 0 && !s.current.paused && !s.current.down) {
        let next = el.scrollLeft + (AUTO_SPEED * dt) / 1000;
        if (next >= half) next -= half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Keep scrollLeft inside [0, half) so drag loops infinitely too.
  const wrap = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    s.current.down = true;
    s.current.moved = false;
    s.current.startX = e.clientX;
    s.current.startLeft = el.scrollLeft;
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !s.current.down) return;
    const dx = e.clientX - s.current.startX;
    if (Math.abs(dx) > 3) s.current.moved = true;
    el.scrollLeft = s.current.startLeft - dx;
    wrap();
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    s.current.down = false;
    el?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <section
      className="relative overflow-hidden py-12 md:py-16"
      aria-label="How we make it"
    >
      <div className="container">
        <div className="mb-10 max-w-4xl md:mb-14">
          <SplitReveal
            as="h2"
            stagger={0.05}
            className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-fg md:text-5xl"
          >
            What Happens on Our Plant Floor
          </SplitReveal>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            We extrude the film, print it, laminate it, slit it, and convert it into pouches ourselves, so every stage is held to the same standard and your packaging comes out consistent.
          </p>
          {/* Touch users get no hover-pause cue that the row scrolls — say it */}
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-subtle md:hidden">
            Swipe for more →
          </p>
        </div>
      </div>

      {/* Drag / swipe-able auto-scroller — edge-faded, pauses on hover & drag */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent md:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent md:w-28"
        />

        <div
          ref={scrollerRef}
          className="flex cursor-grab touch-pan-x select-none overflow-x-auto overscroll-x-contain active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => (s.current.paused = true)}
          onMouseLeave={() => (s.current.paused = false)}
        >
          {marqueeItems.map((t, i) => (
            <div
              key={`${t.title}-${i}`}
              className="group mr-5 flex w-[280px] shrink-0 flex-col self-stretch overflow-hidden rounded-2xl border border-line/10 bg-card/60 transition-colors hover:border-accent/40 md:w-[320px] lg:mr-6"
              aria-hidden={i >= technologies.length}
            >
              {/* Image — 1:1 in every box */}
              <div className="relative aspect-square w-full overflow-hidden bg-section">
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  draggable={false}
                  sizes="320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute left-3 top-3 font-mono text-xs uppercase tracking-[0.3em] text-white/90 drop-shadow">
                  / {String((i % technologies.length) + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text below — title reserves 2 lines, body clamped to 3 so
                  every card aligns identically regardless of copy length */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="mb-2 line-clamp-2 min-h-[3.2rem] font-display text-xl font-medium leading-tight text-fg md:min-h-[3.9rem] md:text-2xl">
                  {t.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
