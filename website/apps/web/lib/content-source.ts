// Server-side content source. Tries the API; falls back to the code-driven
// lib data if the API is unreachable so the public site stays bulletproof
// even when Postgres / the API is down.
//
// All functions return the SAME shape as lib/products.ts so existing
// components keep working with one find-replace of the import.

import "server-only";
import {
  catalog as fallbackCatalog,
  categoryBySlug as fallbackCategoryBySlug,
  type ProductCategory,
  type Product
} from "./products";
import { img } from "./images";
import { type PublicNewsPost, newsPosts as FALLBACK_NEWS } from "./news-data";

export type { PublicNewsPost } from "./news-data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const REVALIDATE_SECONDS = 60;

type ApiCategory = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  intro: string | null;
  order: number;
  products?: ApiProduct[];
};

type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string[];
  applications: string[];
  features: string[];
  finishes: string[];
  specs: { label: string; value: string }[];
  gallery: string[];
  moq: string | null;
  leadTime: string | null;
  categoryId: string;
  category?: ApiCategory;
  featured: boolean;
  order: number;
  published: boolean;
};

type ApiMarket = {
  id: string;
  slug: string;
  name: string;
  leadCopy: string;
  applications: string[];
  order: number;
  published: boolean;
};

async function tryFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS }
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function adaptProduct(p: ApiProduct, categorySlug: string): Product {
  return {
    slug: p.slug,
    name: p.name,
    categorySlug,
    summary: p.summary,
    description: p.description,
    applications: p.applications,
    features: p.features as Product["features"],
    finishes: p.finishes as Product["finishes"],
    specs: p.specs,
    moq: p.moq ?? undefined,
    leadTime: p.leadTime ?? undefined,
    gallery: p.gallery ?? []
  };
}

function adaptCategory(c: ApiCategory): ProductCategory {
  return {
    slug: c.slug,
    name: c.name,
    intro: c.intro ?? c.summary ?? "",
    products: (c.products ?? []).map((p) => adaptProduct(p, c.slug))
  };
}

export async function getCatalog(): Promise<ProductCategory[]> {
  const apiData = await tryFetch<ApiCategory[]>("/categories");
  if (apiData && apiData.length > 0) {
    return apiData.map(adaptCategory);
  }
  return fallbackCatalog;
}

export async function getCategoryBySlug(
  slug: string
): Promise<ProductCategory | undefined> {
  // Encode the route param: raw interpolation let a crafted slug alter the
  // upstream request path (e.g. ../auth/me) rather than just the last segment.
  const apiData = await tryFetch<ApiCategory>(
    `/categories/${encodeURIComponent(slug)}`
  );
  if (apiData) {
    return adaptCategory(apiData);
  }
  return fallbackCategoryBySlug(slug);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const apiData = await tryFetch<ApiProduct>(
    `/products/${encodeURIComponent(slug)}`
  );
  if (apiData) {
    return adaptProduct(apiData, apiData.category?.slug ?? "");
  }
  // Fallback search across the static catalogue
  for (const c of fallbackCatalog) {
    const p = c.products.find((x) => x.slug === slug);
    if (p) return p;
  }
  return undefined;
}

export type PublicMarket = {
  slug: string;
  name: string;
  leadCopy: string;
  applications: string[];
};

const FALLBACK_MARKETS: PublicMarket[] = [
  {
    slug: "snacks",
    name: "Snacks",
    leadCopy:
      "Metallized films and high-barrier pouches built for every kind of snack, from chips and wafers to baked and extruded lines.",
    applications: ["Chips & crisps", "Wafers", "Extruded snacks", "Bakery snacks"]
  },
  {
    slug: "coffee-tea",
    name: "Coffee & Tea",
    leadCopy:
      "Laminates that seal in aroma, finished with degassing valves and reclosable zippers.",
    applications: ["Whole bean coffee", "Ground coffee", "Loose-leaf tea", "Tea sachets"]
  },
  {
    slug: "confectionery",
    name: "Confectionery",
    leadCopy:
      "Twist-wrap films and upscale pouches for gum, candy, and chocolate.",
    applications: ["Chocolate", "Candy", "Gum", "Premium gifting"]
  },
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    leadCopy:
      "Regulation-ready multi-layer films carrying serialized security printing.",
    applications: ["Tablets & capsules", "Powders", "Syrups", "Medical devices"]
  }
];

export async function getMarkets(): Promise<PublicMarket[]> {
  const data = await tryFetch<ApiMarket[]>("/markets");
  if (data && data.length > 0) return data.map((m) => ({
    slug: m.slug,
    name: m.name,
    leadCopy: m.leadCopy,
    applications: m.applications
  }));
  return FALLBACK_MARKETS;
}

export async function getMarketBySlug(slug: string): Promise<PublicMarket | undefined> {
  const data = await tryFetch<ApiMarket>(`/markets/${slug}`);
  if (data) return {
    slug: data.slug,
    name: data.name,
    leadCopy: data.leadCopy,
    applications: data.applications
  };
  return FALLBACK_MARKETS.find((m) => m.slug === slug);
}

/* -------------------- Media page: News / Gallery / Videos -------------------- */

export type PublicGalleryImage = {
  id: string;
  imageUrl: string;
  caption: string | null;
};

export type PublicVideo = {
  id: string;
  title: string;
  url: string;
  caption: string | null;
};

type ApiNews = PublicNewsPost & { id: string; order: number; published: boolean };
type ApiGallery = PublicGalleryImage & { order: number; published: boolean };
type ApiVideo = PublicVideo & { order: number; published: boolean };

const FALLBACK_GALLERY: PublicGalleryImage[] = [
  { id: "g1", imageUrl: "/images/industries/rice-packaging-01.webp", caption: "Packaging for rice" },
  { id: "g2", imageUrl: "/images/industries/snacks-confectionery-packaging-01.webp", caption: "Snack & candy packs" },
  { id: "g3", imageUrl: "/images/industries/tea-packaging-02.webp", caption: "Packaging for tea" },
  { id: "g4", imageUrl: "/images/industries/pink-salt-packaging-01.webp", caption: "Pink salt pouches" },
  { id: "g5", imageUrl: "/images/industries/spices-pulses-packaging-FC.webp", caption: "Spice & pulse packs" },
  { id: "g6", imageUrl: "/images/industries/beauty-cosmetics-packaging-01.webp", caption: "Cosmetics & beauty packs" },
  { id: "g7", imageUrl: "/images/industries/fertilizer-packaging-FC.webp", caption: "Bags for fertilizer" },
  { id: "g8", imageUrl: "/images/industries/ice-cream-packaging-01.webp", caption: "Ice cream wraps" }
];

const FALLBACK_VIDEOS: PublicVideo[] = [
  {
    id: "v1",
    title: "A Look Inside Elevate",
    url: "https://www.youtube.com/watch?v=pShQhLui5NQ",
    caption: "Go behind the scenes at our flexible packaging plant."
  }
];

export async function getNews(): Promise<PublicNewsPost[]> {
  const data = await tryFetch<ApiNews[]>("/news");
  if (data && data.length > 0) {
    return data.map((n) => ({
      slug: n.slug,
      title: n.title,
      ...(n.seoTitle ? { seoTitle: n.seoTitle } : {}),
      excerpt: n.excerpt,
      body: n.body ?? null,
      coverUrl: n.coverUrl ?? null,
      date: n.date,
      featured: n.featured
    }));
  }
  return FALLBACK_NEWS;
}

export async function getGallery(): Promise<PublicGalleryImage[]> {
  const data = await tryFetch<ApiGallery[]>("/gallery");
  if (data && data.length > 0) {
    return data.map((g) => ({ id: g.id, imageUrl: g.imageUrl, caption: g.caption ?? null }));
  }
  return FALLBACK_GALLERY;
}

export async function getVideos(): Promise<PublicVideo[]> {
  const data = await tryFetch<ApiVideo[]>("/videos");
  if (data && data.length > 0) {
    return data.map((v) => ({ id: v.id, title: v.title, url: v.url, caption: v.caption ?? null }));
  }
  return FALLBACK_VIDEOS;
}

/* -------------------- Innovations (image + description + video) -------------------- */

export type PublicInnovation = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  coverUrl: string | null;
  videoUrl: string | null;
};

type ApiInnovation = PublicInnovation & {
  id: string;
  featured: boolean;
  order: number;
  published: boolean;
};

// Fallback innovations, used when the API is unreachable.
// Order alternates pack formats with print finishes.
const FALLBACK_INNOVATIONS: PublicInnovation[] = [
  {
    slug: "shaped-die-cut-pouch",
    title: "Shaped/Die-Cut Pouch",
    summary: "Die-cut pouches in custom shapes that stand apart on shelf.",
    body:
      "With a custom die-cut outline, the pouch itself can echo your product or brand identity, setting it clearly apart from standard bags on shelf.",
    coverUrl: "/images/innovations/shaped-die-cut-pouch.webp",
    videoUrl: null
  },
  {
    slug: "cold-and-hot-stamping",
    title: "Cold and Hot Stamping",
    summary: "Genuine foil stamping for flexible packs, using cold or hot application.",
    body:
      "We apply authentic metallic foil to flexible packaging using either cold or hot stamping. The result is crisper and brighter than any metallic ink, and it lines up exactly with the artwork, so logos and highlights carry a true foil finish on shelf-ready bags.",
    coverUrl: "/images/industries/rice-packaging-04.webp",
    videoUrl: null
  },
  {
    slug: "kraft-paper-bread-pouch",
    title: "Kraft Paper Bread Pouch",
    summary: "A kraft pouch that lets bread and baked goods breathe.",
    body:
      "Designed specifically for bread and bakery items, our kraft paper pouch lets products breathe while still keeping them fresh.",
    coverUrl: "/images/innovations/kraft-paper-bread-pouch.webp",
    videoUrl: null
  },
  {
    slug: "4d-pouch",
    title: "4D Pouch",
    summary: "A pouch format with a bold, three-dimensional build.",
    body:
      "Elevate's 4D pouch has a unique three-dimensional structure that commands attention on shelf and makes opening the pack feel premium.",
    coverUrl: "/images/innovations/4d-pouch-summit.webp",
    videoUrl: null
  }
];

export async function getInnovations(): Promise<PublicInnovation[]> {
  const data = await tryFetch<ApiInnovation[]>("/innovations");
  if (data && data.length > 0) {
    return data.map((n) => ({
      slug: n.slug,
      title: n.title,
      summary: n.summary,
      body: n.body,
      coverUrl: n.coverUrl ?? null,
      videoUrl: n.videoUrl ?? null
    }));
  }
  return FALLBACK_INNOVATIONS;
}
