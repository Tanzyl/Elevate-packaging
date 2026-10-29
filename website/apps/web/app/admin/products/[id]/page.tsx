"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminProduct } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  // Fetch by id by listing all and finding it. The /products/:slug endpoint takes
  // slug, not id — so we use the admin list and filter, which is fine for typical
  // catalogue sizes. If this grows, add a /products/by-id/:id endpoint.
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => api.get<AdminProduct[]>("/products/admin/list")
  });

  const product = data?.find((p) => p.id === id);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading…</p>;
  }
  if (!product) {
    return (
      <div>
        <PageHeader eyebrow="Catalogue" title="Product not found" />
        <p className="text-sm text-slate-600">
          That product may have been deleted.
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title={`Edit · ${product.name}`}
      />
      <ProductForm initial={product} productId={product.id} />
    </div>
  );
}
