"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { parseVideo } from "@/lib/video";

// Lightweight YouTube/Vimeo facade: shows the video thumbnail + a play button
// and only loads the (heavy) player iframe once the user clicks. Visually
// identical to an unplayed embed, but keeps the player's JS off first load.
export function LiteVideo({
  url,
  title,
  className
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embed = parseVideo(url);
  if (!embed) return null;

  const box =
    className ??
    "relative aspect-video w-full overflow-hidden rounded-xl border border-line/10 bg-black";

  if (playing) {
    const sep = embed.embedUrl.includes("?") ? "&" : "?";
    return (
      <div className={box}>
        <iframe
          src={`${embed.embedUrl}${sep}autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className={`${box} group cursor-pointer`}
    >
      {embed.thumbnail && (
        // Plain img: remote YouTube thumbnail, no optimization needed.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={embed.thumbnail}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0 grid place-items-center bg-black/25 transition-colors duration-300 group-hover:bg-black/35"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-accent shadow-lg transition-transform duration-300 group-hover:scale-105">
          <Play size={26} className="ml-1 fill-current" />
        </span>
      </span>
    </button>
  );
}
