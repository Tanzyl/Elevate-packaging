import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/** Dark evergreen RFQ strip used at the bottom of industry / division detail pages. */
export function CtaBand({
  eyebrow,
  title,
  href,
  label
}: {
  eyebrow: string;
  title: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <section className="container pb-16">
      <Reveal y={30}>
        <div className="band-dark relative isolate overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-14">
          <div aria-hidden className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full border border-line/15" />
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line/15 bg-card/60 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                <FileText size={13} strokeWidth={2} />
                {eyebrow}
              </p>
              <h2 className="text-balance font-display text-2xl font-semibold leading-tight text-fg md:text-3xl">
                {title}
              </h2>
            </div>
            <Link
              href={href}
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition hover:bg-accent-hover md:self-auto"
            >
              {label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
