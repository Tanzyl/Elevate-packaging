"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminCategory } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { CategoryForm } from "@/components/admin/category-form";

export default function EditCategoryPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api.get<AdminCategory[]>("/categories")
  });

  const cat = data?.find((c) => c.id === params.id);
  if (isLoading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!cat) {
    return (
      <div>
        <PageHeader eyebrow="Catalogue" title="Category not found" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Catalogue" title={`Edit · ${cat.name}`} />
      <CategoryForm initial={cat} categoryId={cat.id} />
    </div>
  );
}
