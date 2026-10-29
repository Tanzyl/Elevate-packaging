import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Compact photo link with gradient overlay + zoom; used for "similar markets"
 *  and "more divisions" rows on detail pages. */
export function PhotoTile({
  href,
  image,
  name,
  kicker,
  sizes,
  unoptimized,
  aspect = "aspect-[4/5]"
}: {
  href: string;
  image: string;
  name: string;
  kicker?: string;
  sizes: string;
  unoptimized?: boolean;
  /** Tailwind aspect class(es) for the tile. */
  aspect?: string;
}) {
  return (
    <Link
      href={href}
      className={`card-lift group relative block ${aspect} overflow-hidden rounded-2xl border border-line/10 bg-section`}
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes={sizes}
        unoptimized={unoptimized}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span
        aria-hidden
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-accent"
      >
        <ArrowUpRight size={14} />
      </span>
      <div className="absolute inset-x-4 bottom-4">
        {kicker && (
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-300">{kicker}</p>
        )}
        <h3 className="font-display text-sm font-semibold leading-snug text-white md:text-base">{name}</h3>
      </div>
    </Link>
  );
}
