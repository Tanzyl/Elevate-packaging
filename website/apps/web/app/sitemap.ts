import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { catalog } from "@/lib/products";
import { industries } from "@/lib/industries";
import { businesses } from "@/lib/businesses";
import { getNews } from "@/lib/content-source";

// Static marketing routes (admin is excluded — it's noindex / behind auth).
const STATIC_PATHS = [
  "",
  "/about",
  "/products",
  "/industries",
  "/our-businesses",
  "/innovations",
  "/blog",
  "/contact",
  "/rfq"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const news = await getNews();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/products" ? 0.9 : 0.7
  }));

  const categoryEntries: MetadataRoute.Sitemap = catalog.map((c) => ({
    url: `${SITE_URL}/products/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const productEntries: MetadataRoute.Sitemap = catalog.flatMap((c) =>
    c.products.map((p) => ({
      url: `${SITE_URL}/products/${c.slug}/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    }))
  );

  const industryEntries: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const businessEntries: MetadataRoute.Sitemap = businesses.map((b) => ({
    url: `${SITE_URL}/our-businesses/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${SITE_URL}/blog/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.6
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
    ...industryEntries,
    ...businessEntries,
    ...newsEntries
  ];
}
