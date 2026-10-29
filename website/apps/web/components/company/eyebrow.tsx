import type { ReactNode } from "react";

/** Pill eyebrow chip with a copper dot — matches PageHeader's eyebrow. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      {children}
    </p>
  );
}

/** Blueprint grid overlay used behind hero areas. Parent must be `relative isolate`. */
export function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgb(var(--line)/0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
    />
  );
}
