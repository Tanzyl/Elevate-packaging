import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /** Show corner bracket decorations (default on). */
  corners?: boolean;
  /** @deprecated kept for API compatibility — grid overlay is gone. */
  grid?: boolean;
  /** Enable hover lift + scanning accent line (default off). */
  interactive?: boolean;
  /** Kept for API stability — no longer needed. */
  flush?: boolean;
  children: ReactNode;
};

/**
 * Minimalistic-futuristic card container.
 * Children render as direct descendants so flex / text-align / flex-col on the
 * outer card flow through. Decorative overlays (corners, scan line, top
 * highlight) are absolutely positioned and don't affect layout.
 */
export function Card({
  corners = true,
  interactive = false,
  flush: _flush,
  grid: _grid,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "group relative rounded-xl border border-line/[0.08] backdrop-blur-sm",
        "bg-gradient-to-br from-card/40 via-card/15 to-transparent",
        "transition-all duration-300",
        interactive &&
          "hover:-translate-y-0.5 hover:border-accent/30 hover:from-card/60 hover:shadow-[0_14px_40px_-14px_rgb(var(--accent)/0.35)]",
        className
      )}
    >
      {/* top highlight hairline — creates a screen-bezel feel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-line/25 to-transparent"
      />

      {interactive && <ScanLine />}
      {corners && <Corners active={interactive} />}

      {children}
    </div>
  );
}

function ScanLine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden rounded-t-xl"
    >
      <span className="absolute left-0 top-0 h-px w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-[800ms] ease-out group-hover:translate-x-[400%]" />
    </span>
  );
}

function Corners({ active }: { active: boolean }) {
  const base =
    "pointer-events-none absolute h-3 w-3 border-accent/40 transition-opacity duration-300";
  const state = active ? "opacity-0 group-hover:opacity-100" : "opacity-60";

  return (
    <>
      <span aria-hidden className={cn(base, state, "left-2 top-2 border-l border-t")} />
      <span aria-hidden className={cn(base, state, "right-2 top-2 border-r border-t")} />
      <span aria-hidden className={cn(base, state, "left-2 bottom-2 border-l border-b")} />
      <span aria-hidden className={cn(base, state, "right-2 bottom-2 border-r border-b")} />
    </>
  );
}
