import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

/** Pill eyebrow with a copper dot (matches the PageHeader / home style). */
export function Kicker({
  children,
  dot = "bg-gold-500"
}: {
  children: ReactNode;
  dot?: string;
}) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-accent md:text-xs">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </p>
  );
}

/** Full-bleed photo card with gradient overlay and white text. */
export function PhotoCard({
  href,
  src,
  alt,
  index,
  title,
  meta,
  children,
  sizes,
  className = "",
  titleClass = "text-2xl md:text-3xl"
}: {
  href: string;
  src: string;
  alt: string;
  index?: number;
  title: string;
  meta?: ReactNode;
  children?: ReactNode;
  sizes: string;
  className?: string;
  titleClass?: string;
}) {
  return (
    <Link
      href={href}
      className={`card-lift group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-line/10 bg-section ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/0 transition-opacity duration-500 group-hover:from-black/90"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-black/35 to-transparent" />
      <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
        {index !== undefined ? (
          <span className="font-mono text-xs tracking-[0.3em] text-white/80">
            / {String(index + 1).padStart(2, "0")}
          </span>
        ) : (
          <span />
        )}
        <span
          aria-hidden
          className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="p-5 md:p-7">
        {meta}
        <h3 className={`font-display font-bold leading-tight text-white ${titleClass}`}>
          {title}
        </h3>
        {children}
      </div>
    </Link>
  );
}

/** Rounded dark evergreen CTA strip with decorative rings. */
export function CtaBand({
  kicker,
  title,
  text,
  children
}: {
  kicker?: string;
  title: ReactNode;
  text?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="band-dark relative isolate overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-14">
      <div aria-hidden className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10" />
      <div aria-hidden className="absolute -right-6 -top-10 -z-10 h-44 w-44 rounded-full border border-gold-500/30" />
      <div aria-hidden className="absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          {kicker && <Kicker>{kicker}</Kicker>}
          <h2 className="text-balance font-display text-2xl font-bold leading-tight text-fg md:text-3xl">
            {title}
          </h2>
          {text && <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{text}</p>}
        </div>
        <div className="shrink-0">{children}</div>
      </div>
    </div>
  );
}

export const pillCta =
  "group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-accent transition hover:bg-accent-hover";

/** Framed product tile: inset image with zoom, numbered label. */
export function ProductTile({
  href,
  src,
  name,
  index,
  sizes,
  unoptimized
}: {
  href: string;
  src: string;
  name: string;
  index?: number;
  sizes: string;
  unoptimized?: boolean;
}) {
  return (
    <Link
      href={href}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-line/10 bg-card p-2"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-section">
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          unoptimized={unoptimized}
        />
        <span
          aria-hidden
          className="glass absolute bottom-2 right-2 grid h-9 w-9 translate-y-2 place-items-center rounded-full text-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="flex flex-1 items-start gap-2.5 px-2 pb-2 pt-3 sm:px-3">
        {index !== undefined && (
          <span aria-hidden className="mt-0.5 font-mono text-[11px] text-gold-600">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <h3 className="text-sm font-medium leading-snug text-fg transition-colors group-hover:text-accent">
          {name}
        </h3>
      </div>
    </Link>
  );
}
