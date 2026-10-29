import {
  Mail,
  MapPin,
  Phone,
  type LucideIcon
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, GridBackdrop } from "@/components/company/eyebrow";
import { site } from "@/lib/site-config";

import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({
  title: "Contact Elevate",
  description:
    "Reach the Elevate team. Ask for pricing on custom flexible packaging, printed pouches, or laminated films and hear back within one business day.",
  path: "/contact"
});

/** Glass contact card with a circular icon. */
function InfoRow({
  icon: Icon,
  label,
  children
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass card-lift flex items-start gap-4 rounded-2xl p-5 shadow-lg">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-accent">
        <Icon size={18} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-semibold text-fg">{label}</p>
        <div className="mt-1 space-y-1 break-words text-sm text-muted">{children}</div>
      </div>
    </div>
  );
}

type LocationInfo = {
  label: string;
  name?: string;
  address: readonly string[];
  phones: readonly string[];
  email: string;
};

/** Detailed office card — address, phone(s), and email. */
function LocationCard({ loc }: { loc: LocationInfo }) {
  return (
    <div className="card-lift relative h-full overflow-hidden rounded-2xl border border-line/10 bg-card p-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-gold-500" />
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <MapPin size={18} aria-hidden />
        </span>
        <div className="min-w-0">
          <h4 className="font-display text-base font-semibold text-fg">{loc.label}</h4>
          {loc.name && (
            <p className="text-sm font-medium text-accent">{loc.name}</p>
          )}
          <address className="mt-2 space-y-0.5 text-sm not-italic text-muted">
            {loc.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <div className="mt-3 space-y-1.5 text-sm">
            {loc.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2 text-muted transition hover:text-accent"
              >
                <Phone size={14} className="shrink-0 text-accent" />
                {p}
              </a>
            ))}
            <a
              href={`mailto:${loc.email}`}
              className="flex items-center gap-2 break-all text-muted transition hover:text-accent"
            >
              <Mail size={14} className="shrink-0 text-accent" />
              {loc.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero: headline + glass contact cards */}
      <section className="mesh-bg relative isolate overflow-hidden border-b border-line/10">
        <GridBackdrop />
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-accent/15" />
        <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-gold-500/25" />

        <div className="container grid items-center gap-10 py-10 md:py-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Talk to Us</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-fg md:text-5xl">
              Have a packaging question? We&rsquo;d love to{" "}
              <span className="text-gradient">hear from you.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Planning a new product, looking for samples, or weighing up
              specs? Reach out and we&rsquo;ll reply within one business day.
            </p>
            <div aria-hidden className="mt-8 flex gap-1.5">
              <span className="h-1 w-12 rounded-full bg-accent" />
              <span className="h-1 w-6 rounded-full bg-gold-500" />
              <span className="h-1 w-3 rounded-full bg-accent/30" />
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-1">
              <InfoRow icon={MapPin} label="Main Office">
                <p>{site.contact.addresses[0].value}</p>
              </InfoRow>
            </Reveal>
            <Reveal delay={0.1}>
              <InfoRow icon={Mail} label="Email">
                <a
                  href={`mailto:${site.contact.emails.general}`}
                  className="block hover:text-fg"
                >
                  {site.contact.emails.general}
                </a>
              </InfoRow>
            </Reveal>
            <Reveal delay={0.15}>
              <InfoRow icon={Phone} label="Call Us">
                {site.contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/[^+\d]/g, "")}`}
                    className="block hover:text-fg"
                  >
                    {p}
                  </a>
                ))}
              </InfoRow>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Form card + office directory */}
      <section className="bg-section/40 py-14 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-card p-6 shadow-2xl shadow-primary-900/10 md:p-10">
              <div aria-hidden className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
              <div className="relative mb-8">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold-600">
                  Drop Us a Line
                </p>
                <h2 className="font-display text-3xl font-bold text-fg md:text-4xl">
                  Write to our team
                </h2>
              </div>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="mb-6">
              <Eyebrow>Visit us</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold text-fg md:text-3xl">Our Offices</h2>
            </div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-subtle">
              United States
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {site.contact.locations.map((l) => (
                <LocationCard key={l.label} loc={l} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
