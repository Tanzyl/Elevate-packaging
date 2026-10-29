// Shared news helpers (no "use client" so server components can call them too).
import type { PublicNewsPost } from "./content-source";

export function formatNewsDate(iso: string) {
  try {
    // ISO date-only strings parse as UTC midnight; pin the zone so the day doesn't shift.
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    });
  } catch {
    return iso.slice(0, 10);
  }
}

/** Plain prose paragraphs only (blog bodies also carry ## headings and | tables, rendered by /blog/[slug]); falls back to the excerpt. */
export function newsParagraphs(post: PublicNewsPost): string[] {
  const src = post.body?.trim() ? post.body : post.excerpt;
  return src
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !/^[#|>*-]/.test(p));
}
