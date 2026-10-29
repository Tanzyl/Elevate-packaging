"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Product image gallery: a main image with a thumbnail strip to switch angles
// (e.g. front / 15° left / 15° right). Falls back gracefully to a single image.
// A `#photo-N` URL hash pre-selects image N — used by the Media-page gallery
// to deep-link to the exact photo that was clicked (hash keeps the page static).
export function ProductGallery({
  images,
  alt
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const m = window.location.hash.match(/^#photo-(\d+)$/);
    if (!m) return;
    const i = Number(m[1]);
    if (i >= 0 && i < images.length) setActive(i);
  }, [images.length]);
  const gallery = images.length > 0 ? images : [];
  const current = gallery[active] ?? gallery[0];

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-section">
        {current && (
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            sizes="(max-width: 448px) 100vw, 384px"
            priority
            className="object-cover"
            // Only bypass the optimizer for absolute URLs (admin uploads on
            // hosts outside the pinned remotePatterns). Local static images
            // must go through it — full-res originals cost ~1.3MB/page.
            unoptimized={!current.startsWith("/")}
          />
        )}
      </div>

      {gallery.length > 1 && (
        <div
          className={`mt-3 grid gap-3 ${
            gallery.length >= 4
              ? "grid-cols-4"
              : gallery.length === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden rounded-md bg-section transition ${
                i === active
                  ? "ring-2 ring-accent"
                  : "opacity-70 ring-1 ring-line/15 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${alt}, photo ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
                unoptimized={!src.startsWith("/")}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
