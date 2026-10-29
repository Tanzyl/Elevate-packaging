"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  /** Seconds for one full loop of the content. */
  duration?: number;
  /** Scroll right-to-left by default; true flips the direction. */
  reverse?: boolean;
  /** Gap between items and between the two copies, in px. */
  gap?: number;
  /** Freeze the strip while hovered (lets users focus a logo). */
  pauseOnHover?: boolean;
  className?: string;
};

// Pure-CSS marquee. The track holds two identical copies of the content and
// slides exactly one copy's width (-50%) per cycle, so the loop point is
// pixel-perfect and endless. Each copy carries `paddingRight: gap`, making a
// copy's width = items + n·gap — that keeps -50% an exact period even with
// flex gaps. Because it's a transform-only CSS animation it runs on the GPU
// compositor thread and stays smooth even when the main thread is busy
// (Lenis, reveal animations, particles) — unlike a JS/rAF-driven slider.
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  gap = 64,
  pauseOnHover = true,
  className
}: MarqueeProps) {
  const copyStyle = { gap: `${gap}px`, paddingRight: `${gap}px` } as const;

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max will-change-transform animate-marquee motion-reduce:animate-none",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : undefined
        }}
      >
        <div className="flex w-max shrink-0 items-center" style={copyStyle}>
          {children}
        </div>
        <div aria-hidden className="flex w-max shrink-0 items-center" style={copyStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
