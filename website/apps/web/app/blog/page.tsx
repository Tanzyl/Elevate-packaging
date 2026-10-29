import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getNews, type PublicNewsPost } from "@/lib/content-source";
import { pageSeo } from "@/lib/seo";
import { readingTime } from "@/components/company/reading-time";
import { ClosingCta } from "@/components/sections/closing-cta";

export const metadata = pageSeo({
  title: "Packaging know-how and Elevate updates",
  description:
    "Hands-on packaging advice, notes from the production floor, and the latest from Elevate.",
  path: "/blog",
  image: "/images/capabilities/printing.webp"
});

function formatDate(iso: string) {
  try {
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

function ArticleImage({
  post,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
}: {
  post: PublicNewsPost;
  priority?: boolean;
  sizes?: string;
}) {
  if (!post.coverUrl) {
    return <div className="h-full min-h-56 bg-gradient-to-br from-accent/15 to-section" aria-hidden />;
  }

  return (
    <Image
      src={post.coverUrl}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
    />
  );
}

function ArticleMeta({ post }: { post: PublicNewsPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="h-1 w-1 rounded-full bg-gold-500" />
      <span>Packaging know-how</span>
    </div>
  );
}

function ReadingChip({ post }: { post: PublicNewsPost }) {
  return (
    <span className="glass absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-fg">
      <Clock size={12} aria-hidden className="text-accent" />
      {readingTime(post.body ?? post.excerpt)}
    </span>
  );
}

function ArticleCard({ post }: { post: PublicNewsPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-section">
        <ArticleImage post={post} />
        <ReadingChip post={post} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ArticleMeta post={post} />
        <h2 className="mt-3 text-balance font-display text-xl font-bold leading-snug text-fg transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent">
          Read article
          <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Lead story: wide split card. */
function LeadCard({ post }: { post: PublicNewsPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-lift group grid overflow-hidden rounded-3xl border border-line/10 bg-card lg:grid-cols-[1.25fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-section lg:aspect-auto lg:min-h-[24rem]">
        <ArticleImage post={post} priority sizes="(min-width: 1024px) 60vw, 100vw" />
        <ReadingChip post={post} />
      </div>
      <div className="flex flex-col justify-center p-7 md:p-10">
        <span className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">Latest · 01</span>
        <ArticleMeta post={post} />
        <h2 className="mt-3 text-balance font-display text-2xl font-bold leading-tight text-fg transition-colors group-hover:text-accent md:text-4xl">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-4 text-base leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-colors group-hover:bg-accent-hover">
          Read article
          <ArrowRight size={15} aria-hidden className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getNews();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="From the Elevate desk"
        title="Stories, fresh thinking, and the craft behind smarter packaging"
        lead="Go deeper into flexible packaging, the technology on our production lines, and the people and partners pushing the field ahead."
        aside={
          <div className="glass flex items-center gap-4 rounded-3xl p-5 shadow-xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-accent">
              <BookOpen size={20} aria-hidden />
            </span>
            <div>
              <p className="font-display text-3xl font-bold leading-none text-fg">{posts.length}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-muted">Articles</p>
            </div>
          </div>
        }
      />

      <section className="container max-w-[1400px] py-10 md:py-16" aria-label="Articles">
        {lead && (
          <Reveal>
            <LeadCard post={lead} />
          </Reveal>
        )}
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 0.06} className="h-full">
              <ArticleCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="band-dark">
        <ClosingCta />
      </div>
    </>
  );
}
