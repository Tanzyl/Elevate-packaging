// Thin fetch wrapper for the admin panel. Always sends cookies (HttpOnly session
// from /auth/login) and surfaces useful errors to the UI.

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {})
    }
  });

  const text = await res.text();
  const body = text ? safeJson(text) : null;

  if (!res.ok) {
    const message =
      (body && typeof body === "object" && "message" in body
        ? Array.isArray((body as { message: unknown }).message)
          ? ((body as { message: string[] }).message).join(", ")
          : String((body as { message: unknown }).message)
        : null) ?? `Request failed: ${res.status}`;
    throw new ApiError(res.status, message, body);
  }

  return (body ?? ({} as unknown)) as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body)
    }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, {
      method: "PATCH",
      body: body === undefined ? undefined : JSON.stringify(body)
    }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" })
};

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "EDITOR";
};

export type AdminCategory = {
  id: string;
  slug: string;
  name: string;
  summary: string | null;
  intro: string | null;
  order: number;
};

export type AdminProduct = {
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
  category?: AdminCategory;
  featured: boolean;
  order: number;
  published: boolean;
};

export type AdminMarket = {
  id: string;
  slug: string;
  name: string;
  leadCopy: string;
  applications: string[];
  order: number;
  published: boolean;
};

export type AdminInquiry = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  address: string | null;
  message: string;
  source: string | null;
  handled: boolean;
  createdAt: string;
};

export type AdminInnovation = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  coverUrl: string | null;
  videoUrl: string | null;
  featured: boolean;
  order: number;
  published: boolean;
};

export type AdminTestimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  order: number;
  published: boolean;
};

export type AdminCertification = {
  id: string;
  name: string;
  url: string | null;
  order: number;
  published: boolean;
};

export type AdminNewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string | null;
  coverUrl: string | null;
  date: string;
  featured: boolean;
  order: number;
  published: boolean;
};

export type AdminGalleryImage = {
  id: string;
  imageUrl: string;
  caption: string | null;
  order: number;
  published: boolean;
};

export type AdminVideo = {
  id: string;
  title: string;
  url: string;
  caption: string | null;
  order: number;
  published: boolean;
};
