import Image from "next/image";
import {
  BadgeCheck,
  HeartHandshake,
  LifeBuoy,
  MapPin,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { aboutContent } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, GridBackdrop } from "@/components/company/eyebrow";
import { ClosingCta } from "@/components/sections/closing-cta";

import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "About Elevate",
  description:
    "Meet Elevate, an American maker of custom printed pouches, laminated films, and rotogravure-printed packaging for consumer brands.",
  path: "/about"
});

// One icon per value, in aboutContent.values order.
const VALUE_ICONS = [HeartHandshake, ShieldCheck, TrendingUp, Target, UserCheck, LifeBuoy, BadgeCheck, Sprout];

export default function AboutPage() {
  return (
    <>
      <section id="profile" className="mesh-bg relative isolate scroll-mt-24 overflow-hidden border-b border-line/10">
        <GridBackdrop />
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-accent/15" />

        <div className="container grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Eyebrow>Who We Are</Eyebrow>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">
                Produced in America
              </span>
            </div>
            <h1 className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-fg md:text-5xl">
              Flexible packaging shaped by{" "}
              <span className="text-gradient">craftsmanship</span> and driven by{" "}
              <span className="text-gradient">fresh thinking</span>.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-fg md:text-xl">{aboutContent.profile[0]}</p>
            <div className="mt-5 space-y-4 border-l-2 border-gold-500/40 pl-5 text-sm leading-relaxed text-muted md:text-base">
              {aboutContent.profile.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Framed image on a copper offset block, with a floating chip */}
          <Reveal y={30} delay={0.1} className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl pb-6 pr-6 lg:max-w-none">
              <div aria-hidden className="absolute bottom-0 right-0 h-[85%] w-[85%] rounded-3xl bg-gold-500/90" />
              <figure className="relative overflow-hidden rounded-3xl border border-line/10 bg-card p-2 shadow-2xl shadow-primary-900/20">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/about-us.webp"
                    alt="Rotogravure presses and slitting lines on the Elevate plant floor"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 flex flex-col">
                    <span className="h-1 bg-print-cyan" />
                    <span className="h-1 bg-print-magenta" />
                    <span className="h-1 bg-print-yellow" />
                    <span className="h-1.5 bg-accent" />
                  </div>
                </div>
              </figure>
              <div className="glass absolute -left-2 top-6 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:-left-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
                  <MapPin size={16} aria-hidden />
                </span>
                <span className="text-sm font-semibold text-fg">Made in the USA</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="band-dark relative isolate overflow-hidden">
        <section id="vision" className="container scroll-mt-24 py-14 md:py-20">
          <div aria-hidden className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
              <Eyebrow>Purpose &amp; Direction</Eyebrow>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-subtle">Why we show up</p>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-6 lg:grid-cols-12">
            <Reveal className="h-full lg:col-span-5">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line/10 bg-gradient-to-br from-accent/25 via-card to-card p-8 md:p-10">
                <span aria-hidden className="absolute -right-4 -top-10 font-display text-[12rem] font-bold leading-none text-accent/15">
                  &ldquo;
                </span>
                <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent">Vision</p>
                <p className="relative font-display text-3xl font-semibold leading-snug text-fg md:text-4xl">
                  {aboutContent.vision}
                </p>
                <div aria-hidden className="mt-10 flex gap-1.5">
                  <span className="h-1 w-12 rounded-full bg-accent" />
                  <span className="h-1 w-6 rounded-full bg-fg/40" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="h-full lg:col-span-7">
              <div className="flex h-full flex-col rounded-3xl border border-line/10 bg-card/60 p-8 md:p-10">
                <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-accent">Mission</p>
                <ol className="space-y-6">
                  {aboutContent.mission.map((p, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="font-mono text-sm font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="border-l border-line/15 pl-5 text-sm leading-relaxed text-muted md:text-base">{p}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      <section id="values" className="container scroll-mt-24 py-14 md:py-20">
        {/* Bento: heading cell + first/last values span two columns → 3 full rows on lg */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="flex flex-col justify-center sm:col-span-2 lg:pr-8">
            <Eyebrow className="self-start">What We Stand For</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-fg md:text-4xl">
              The eight ideas that guide <span className="text-gradient">how we work.</span>
            </h2>
          </Reveal>
          {aboutContent.values.map((v, i) => {
            const Icon = VALUE_ICONS[i] ?? BadgeCheck;
            const wide = i === 0 || i === aboutContent.values.length - 1;
            return (
              <Reveal key={v.title} delay={(i % 4) * 0.06} className={wide ? "sm:col-span-2" : ""}>
                <div
                  className={`card-lift group relative h-full overflow-hidden rounded-2xl border border-line/10 p-6 ${
                    wide ? "bg-gradient-to-br from-accent/10 to-card" : "bg-card"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon size={20} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-gold-600">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-2 font-display text-base font-semibold text-fg">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
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
