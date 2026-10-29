import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getNews } from "@/lib/content-source";
import { pageSeo } from "@/lib/seo";
import { GridBackdrop } from "@/components/company/eyebrow";
import { readingTime } from "@/components/company/reading-time";

type ArticleBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const tokenPattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*(.+?)\*\*/g;
  let cursor = 0;

  for (const match of text.matchAll(tokenPattern)) {
    const token = match[0];
    const offset = match.index ?? cursor;
    if (offset > cursor) nodes.push(text.slice(cursor, offset));

    if (match[1] !== undefined && match[2] !== undefined) {
      const href = match[2];
      if (/^(https?:\/\/|mailto:|tel:|\/(?!\/))/.test(href)) {
        const external = /^https?:\/\//.test(href);
        nodes.push(
          <a
            key={offset}
            href={href}
            className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {renderInline(match[1])}
          </a>
        );
      } else {
        nodes.push(token);
      }
    } else {
      nodes.push(<strong key={offset}>{match[3]}</strong>);
    }

    cursor = offset + token.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function parseArticleBody(markdown: string): ArticleBlock[] {
  const lines = markdown.split("\n");
  const blocks: ArticleBlock[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text && !text.startsWith("Meta Title:") && !text.startsWith("Meta Description:")) {
      blocks.push({ type: "paragraph", text });
    }
    paragraph = [];
  };

  const cells = (line: string) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3,
        text: heading[2]
      });
      continue;
    }

    if (line.startsWith("|") && lines[index + 1]?.trim().match(/^\|?\s*:?-{3,}/)) {
      flushParagraph();
      const headers = cells(line);
      index += 1;
      const rows: string[][] = [];
      while (lines[index + 1]?.trim().startsWith("|")) {
        index += 1;
        rows.push(cells(lines[index]));
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      const items = [listItem[1]];
      while (/^[-*]\s+/.test(lines[index + 1]?.trim() ?? "")) {
        index += 1;
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const orderedListItem = line.match(/^\d+\.\s+(.+)$/);
    if (orderedListItem) {
      flushParagraph();
      const items = [orderedListItem[1]];
      while (/^\d+\.\s+/.test(lines[index + 1]?.trim() ?? "")) {
        index += 1;
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export async function generateStaticParams() {
  const posts = await getNews();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}) {
  const post = (await getNews()).find((item) => item.slug === params.slug);
  if (!post) return {};

  return pageSeo({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverUrl ?? undefined
  });
}

export default async function BlogArticlePage({
  params
}: {
  params: { slug: string };
}) {
  const post = (await getNews()).find((item) => item.slug === params.slug);
  if (!post) notFound();

  const blocks = post.body
    ? parseArticleBody(post.body)
    : [{ type: "paragraph" as const, text: post.excerpt }];

  return (
    <article>
      <header className="mesh-bg relative isolate overflow-hidden border-b border-line/10">
        <GridBackdrop />
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-accent/15" />
        <div className="container max-w-6xl py-8 md:py-12">
          <Link
            href="/blog"
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-hover"
          >
            <ArrowLeft size={14} aria-hidden />
            All articles
          </Link>
          <div className="mt-6 max-w-4xl md:mt-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-accent">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                Packaging know-how
              </span>
              <time dateTime={post.date} className="px-2">{formatDate(post.date)}</time>
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold-500" />
              <span className="inline-flex items-center gap-1.5 px-2">
                <Clock size={12} aria-hidden />
                {readingTime(post.body ?? post.excerpt)}
              </span>
            </div>
            <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-fg md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
              {post.excerpt}
            </p>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl py-10 md:py-14">
        {post.coverUrl && (
          <div className="relative mb-10 pb-4 pr-4 md:mb-14 md:pb-5 md:pr-5">
            <div aria-hidden className="absolute bottom-0 right-0 h-[85%] w-[85%] rounded-3xl bg-gold-500/90" />
            <div className="relative rounded-3xl border border-line/10 bg-card p-2 shadow-2xl shadow-primary-900/20">
              <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-section md:aspect-[16/7]">
                <Image
                  src={post.coverUrl}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <div className="min-w-0 max-w-3xl space-y-6 text-[0.95rem] leading-[1.8] text-muted md:text-[1.05rem]">
            {blocks.map((block, index) => {
              if (block.type === "heading") {
                const Heading = block.level === 2 ? "h2" : "h3";
                return (
                  <Heading
                    key={`${block.text}-${index}`}
                    className={
                      block.level === 2
                        ? "flex items-start gap-3 pt-6 font-display text-2xl font-bold leading-tight text-fg md:text-[1.75rem]"
                        : "pt-2 font-display text-lg font-semibold leading-tight text-accent md:text-xl"
                    }
                  >
                    {block.level === 2 && (
                      <span aria-hidden className="mt-1.5 h-5 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-accent to-gold-500" />
                    )}
                    <span>{renderInline(block.text)}</span>
                  </Heading>
                );
              }

              if (block.type === "list" || block.type === "ordered-list") {
                const List = block.type === "list" ? "ul" : "ol";
                return (
                  <List
                    key={`list-${index}`}
                    className={`${block.type === "list" ? "list-disc" : "list-decimal"} space-y-2.5 rounded-2xl border border-line/10 bg-section/50 py-5 pl-10 pr-5 marker:font-semibold marker:text-gold-600`}
                  >
                    {block.items.map((item) => (
                      <li key={item} className="pl-1">{renderInline(item)}</li>
                    ))}
                  </List>
                );
              }

              if (block.type === "table") {
                return (
                  <div
                    key={`table-${index}`}
                    className="overflow-x-auto rounded-2xl border border-line/10 bg-card shadow-sm"
                  >
                    <table className="min-w-[42rem] w-full border-collapse text-left text-sm md:text-base">
                      <thead className="bg-accent/10 text-fg">
                        <tr>
                          {block.headers.map((header) => (
                            <th key={header} className="border-b border-line/10 px-4 py-3 font-display font-semibold">
                              {renderInline(header)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={`row-${rowIndex}`} className="border-b border-line/10 last:border-0 even:bg-section/40">
                            {row.map((cell, cellIndex) => (
                              <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top">
                                {renderInline(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              return (
                <p key={`paragraph-${index}`} className="[&_strong]:font-semibold [&_strong]:text-fg">
                  {renderInline(block.text)}
                </p>
              );
            })}
          </div>

          {/* Sticky side card with the conversion CTA */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="band-dark relative overflow-hidden rounded-3xl p-6 shadow-2xl">
              <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
              <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">Ready when you are</p>
              <p className="relative mt-3 font-display text-xl font-bold leading-snug text-fg">
                Your product deserves a better pack.
              </p>
              <div className="relative mt-6 flex flex-col gap-3">
                <Link
                  href="/rfq"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Get a Quote
                  <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-line/20 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  Contact
                </Link>
              </div>
            </div>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-hover"
            >
              <ArrowLeft size={14} aria-hidden />
              All articles
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
