// Parse a YouTube/Vimeo URL into an embeddable player URL + thumbnail.
// Returns null for anything we don't recognise.

export type VideoEmbed = {
  provider: "youtube" | "vimeo";
  id: string;
  embedUrl: string;
  thumbnail: string | null;
};

export function parseVideo(url: string): VideoEmbed | null {
  if (!url) return null;

  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) {
    const id = yt[1];
    return {
      provider: "youtube",
      id,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    };
  }

  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) {
    const id = vm[1];
    return {
      provider: "vimeo",
      id,
      embedUrl: `https://player.vimeo.com/video/${id}`,
      thumbnail: null
    };
  }

  return null;
}
