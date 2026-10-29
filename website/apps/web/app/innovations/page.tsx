import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { getInnovations } from "@/lib/content-source";
import { parseVideo } from "@/lib/video";
import { LiteVideo } from "@/components/ui/lite-video";
import { Reveal } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";

import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Packaging Innovations",
  description:
    "See what's new at Elevate: 3D UV special effects, 4D pouches, kraft paper bread bags, and both cold and hot foil stamping.",
  path: "/innovations"
});
export const revalidate = 60;

export default async function InnovationsPage() {
  const innovations = await getInnovations();

  return (
    <>
      <PageHeader
        eyebrow="What's new"
        title="Standout finishes, made on our own presses."
        lead="A tour of the effects and pack formats that make our work different."
        aside={
          <nav aria-label="Innovations" className="glass w-full rounded-3xl p-5 shadow-xl lg:w-80">
            <ol className="divide-y divide-line/10">
              {innovations.map((inn, i) => (
                <li key={inn.slug}>
                  <a
                    href={`#${inn.slug}`}
                    className="group flex items-center gap-4 py-2.5 text-sm font-medium text-fg transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{inn.title}</span>
                    <span aria-hidden className="text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      <section className="container py-14 md:py-20">
        <div className="grid gap-16 md:gap-24">
          {innovations.map((inn, i) => {
            const embed = parseVideo(inn.videoUrl ?? "");
            const reversed = i % 2 === 1;
            return (
              <article
                key={inn.slug}
                id={inn.slug}
                className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                {/* Media: framed on a copper (or evergreen) offset block */}
                <Reveal y={30} className={reversed ? "md:order-2" : ""}>
                  <div className={`relative pb-5 ${reversed ? "pl-5" : "pr-5"}`}>
                    <div
                      aria-hidden
                      className={`absolute bottom-0 h-[85%] w-[85%] rounded-3xl ${
                        reversed ? "left-0 bg-accent/80" : "right-0 bg-gold-500/90"
                      }`}
                    />
                    <div className="relative rounded-3xl border border-line/10 bg-card p-2 shadow-2xl shadow-primary-900/20">
                      {embed ? (
                        <div className="overflow-hidden rounded-2xl">
                          <LiteVideo url={inn.videoUrl ?? ""} title={inn.title} />
                        </div>
                      ) : inn.coverUrl ? (
                        <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-section">
                          <Image
                            src={inn.coverUrl}
                            alt={inn.title}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-primary-100 to-section dark:from-primary-900" />
                      )}
                    </div>
                  </div>
                </Reveal>

                {/* Copy */}
                <Reveal delay={0.1} className={reversed ? "md:order-1" : ""}>
                  <span className="text-gradient block font-display text-7xl font-bold leading-none tracking-tight md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div aria-hidden className="my-5 flex gap-1.5">
                    <span className="h-1 w-10 rounded-full bg-accent" />
                    <span className="h-1 w-5 rounded-full bg-gold-500" />
                  </div>
                  <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-fg md:text-4xl">
                    {inn.title}
                  </h2>
                  <p className="text-base leading-relaxed text-muted md:text-lg">{inn.body}</p>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <div className="band-dark">
        <ClosingCta />
      </div>
    </>
  );
}
