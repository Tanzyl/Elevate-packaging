/** "N min read" at ~220 words per minute. */
export function readingTime(text: string | null | undefined): string {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
