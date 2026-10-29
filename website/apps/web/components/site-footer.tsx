import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { site, nav } from "@/lib/site-config";
import { BrandLogo } from "@/components/brand-logo";

const socials = [
  { label: "Facebook", href: site.contact.social.facebook, icon: Facebook },
  { label: "Twitter", href: site.contact.social.twitter, icon: Twitter },
  { label: "LinkedIn", href: site.contact.social.linkedin, icon: Linkedin }
];

type FooterLoc = {
  label: string;
  address: readonly string[];
  phones: readonly string[];
  email: string;
};

/** One office/region entry in the footer — label, address, phone(s), email. */
function FooterLocation({ loc }: { loc: FooterLoc }) {
  return (
    <li>
      <span className="block font-medium text-fg">{loc.label}</span>
      <span className="block">{loc.address.join(", ")}</span>
      {loc.phones.map((p) => (
        <a
          key={p}
          href={`tel:${p.replace(/[^+\d]/g, "")}`}
          className="block hover:text-fg"
        >
          {p}
        </a>
      ))}
      <a
        href={`mailto:${loc.email}`}
        className="block break-all hover:text-fg"
      >
        {loc.email}
      </a>
    </li>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line/10 bg-section/60">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <BrandLogo size="md" />
          <p className="mt-4 text-sm text-muted">
            Smart Packaging, Made With Care.
          </p>

          <ul className="mt-6 flex items-center gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-md border border-line/10 bg-card/40 text-muted transition hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-accent">Site Links</h4>
          <ul className="space-y-2 text-sm text-muted">
            {nav.primary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-medium text-accent">Our Offices</h4>
          <ul className="space-y-4 text-sm text-muted">
            {site.contact.locations.map((l) => (
              <FooterLocation key={l.label} loc={l} />
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line/10 py-6 pb-40 text-center text-xs text-subtle sm:pb-6">
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </div>
    </footer>
  );
}
