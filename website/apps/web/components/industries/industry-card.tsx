import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

// One industry card on the /industries page.
// - Photo with a gradient overlay; name + index sit on the photo, image zooms on hover.
// - The whole card is a link to the industry detail page (/industries/[slug])
//   via a "stretched link" (::after overlay), while "Get Pricing" stays a
//   separately clickable target on top of it.
export function IndustryCard({
  index,
  slug,
  name,
  blurb,
  displayImage
}: {
  index: number;
  slug: string;
  name: string;
  blurb: string;
  /** Resolved image to show on the card (real photo or stock fallback). */
  displayImage: string;
}) {
  return (
    <article
      id={slug}
      className="card-lift group relative flex h-full scroll-mt-40 flex-col overflow-hidden rounded-3xl border border-line/10 bg-card"
    >
      <Link
        href={`/industries/${slug}`}
        aria-label={`Open ${name}`}
        className="flex flex-1 flex-col after:absolute after:inset-0 after:content-['']"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-section">
          <Image
            src={displayImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            unoptimized
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-accent"
          >
            <ArrowUpRight size={16} />
          </span>
          <h3 className="absolute inset-x-5 bottom-4 font-display text-xl font-semibold leading-tight text-white md:text-2xl">
            {name}
          </h3>
        </div>
        <p className="flex-1 px-5 pt-4 text-sm leading-relaxed text-muted">{blurb}</p>
      </Link>

      <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-4">
        <Link
          href={`/rfq?industry=${slug}`}
          className="relative z-10 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
        >
          <FileText size={14} strokeWidth={2} />
          Get Pricing
        </Link>
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
      </div>
    </article>
  );
}
