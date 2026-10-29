import { Suspense } from "react";
import { Clock, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { RfqForm } from "@/components/rfq-form";
import { site } from "@/lib/site-config";

import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Get a Quote",
  description:
    "Get pricing on custom flexible packaging, from printed pouches to laminated films and rollstock. Share your product and quantity and Elevate will respond within one business day.",
  path: "/rfq"
});

const STEPS = ["What you need", "Extra details", "How to reach you"];

export default function RfqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Home · Get a Quote"
        title="Get Your Quote"
        lead="Let us know what you're packaging and how much you need, add anything else in the notes, and we'll send pricing and samples within one business day."
        aside={
          <ol className="glass w-full space-y-3 rounded-3xl p-5 shadow-xl lg:w-72">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm font-medium text-fg">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 font-mono text-xs font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
        }
      />

      <section className="bg-section/40 py-10 md:py-14">
        <div className="container grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="text-sm text-muted">Getting the form ready…</div>}>
              <RfqForm />
            </Suspense>
          </div>

          {/* Reassurance panel */}
          <aside className="lg:col-span-4">
            <div className="band-dark relative overflow-hidden rounded-3xl p-6 shadow-2xl md:p-8 lg:sticky lg:top-28">
              <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
              <ul className="relative space-y-5">
                <li className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <Clock size={18} aria-hidden />
                  </span>
                  <p className="pt-2.5 text-sm font-medium text-fg">
                    Pricing and samples within one business day.
                  </p>
                </li>
              </ul>
              <div className="relative mt-8 space-y-2 border-t border-line/15 pt-6 text-sm">
                <a
                  href={`tel:${site.contact.phones[0].replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-muted transition hover:text-accent"
                >
                  <Phone size={15} aria-hidden className="text-accent" />
                  {site.contact.phones[0]}
                </a>
                <a
                  href={`mailto:${site.contact.emails.general}`}
                  className="flex items-center gap-3 break-all text-muted transition hover:text-accent"
                >
                  <Mail size={15} aria-hidden className="text-accent" />
                  {site.contact.emails.general}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
