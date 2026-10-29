// Centralised SEO helpers — per-page metadata (title, description, canonical,
// Open Graph, Twitter) and schema.org JSON-LD builders.

import type { Metadata } from "next";
import { site } from "@/lib/site-config";

// Must match the host production actually serves on (Vercel 308s the apex to
// www) — a non-www value here makes every canonical/OG/sitemap URL a redirect.
export const SITE_URL = "https://www.elevatepackaging.com";
const DEFAULT_OG_IMAGE = "/images/hero-lineup.webp";

type PageSeoInput = {
  title: string;
  description: string;
  /** Canonical path, e.g. "/about" or "/products/pouches". */
  path?: string;
  /** Share image path (defaults to the hero image). */
  image?: string;
  /** Use the title verbatim (skip the "· Elevate" template) — for home. */
  absoluteTitle?: boolean;
  noindex?: boolean;
};

export function pageSeo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
  noindex = false
}: PageSeoInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.brand,
      type: "website",
      locale: "en_US",
      images: [{ url: image, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {})
  };
}

/* ----------------------------- JSON-LD ----------------------------- */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: site.brand,
    legalName: "Elevate",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.svg`,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    description:
      "USA-based manufacturer of flexible packaging: custom printed pouches, laminated films, and rotogravure & flexographic printing.",
    // TODO: placeholder — replace with the real head-office address.
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Industrial Way, Suite 100",
      addressLocality: "Anytown",
      addressRegion: "ST",
      postalCode: "00000",
      addressCountry: "US"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.contact.phones[0],
        email: site.contact.emails.general,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["en"]
      }
    ],
    sameAs: [
      site.contact.social.facebook,
      site.contact.social.twitter,
      site.contact.social.linkedin
    ]
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.brand,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en"
  };
}

export function breadcrumbLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`
    }))
  };
}

const absoluteUrl = (u: string) => (u.startsWith("http") ? u : `${SITE_URL}${u}`);

export function productLd(input: {
  name: string;
  description: string;
  path: string;
  /** Full gallery — Google recommends multiple images. */
  images?: string[];
  image?: string;
  category?: string;
  /** Visible spec list, mirrored as machine-readable PropertyValue pairs. */
  specs?: { label: string; value: string }[];
}) {
  const images = (input.images?.length ? input.images : input.image ? [input.image] : []).map(
    absoluteUrl
  );
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    ...(images.length ? { image: images } : {}),
    ...(input.category ? { category: input.category } : {}),
    brand: { "@type": "Brand", name: site.brand },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}${input.path}`,
    audience: { "@type": "BusinessAudience" },
    ...(input.specs?.length
      ? {
          additionalProperty: input.specs.map((s) => ({
            "@type": "PropertyValue",
            name: s.label,
            value: s.value
          }))
        }
      : {})
  };
}

/** Industry solution pages — modelled as a Service provided by the org. */
export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: "Flexible packaging manufacturing",
    description: input.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    url: `${SITE_URL}${input.path}`
  };
}
