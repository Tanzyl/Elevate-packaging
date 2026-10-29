import type { ReactNode } from "react";

/** Inner-page hero band: mesh glow, blueprint grid, decorative rings, and an
 *  optional right-hand slot (`aside`) for a stat card, image or CTA. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  aside
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="mesh-bg relative isolate overflow-hidden border-b border-line/10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(rgb(var(--line)/0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-accent/15" />
      <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-gold-500/25" />

      <div className="container grid items-center gap-8 py-12 md:py-16 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg md:text-6xl">
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>}
          <div aria-hidden className="mt-8 flex gap-1.5">
            <span className="h-1 w-12 rounded-full bg-accent" />
            <span className="h-1 w-6 rounded-full bg-gold-500" />
            <span className="h-1 w-3 rounded-full bg-accent/30" />
          </div>
        </div>
        {aside && <div className="lg:max-w-sm">{aside}</div>}
      </div>
    </section>
  );
}
