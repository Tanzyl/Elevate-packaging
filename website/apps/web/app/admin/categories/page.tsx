"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminCategory } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";

type CategoryWithProducts = AdminCategory & { products?: { id: string }[] };

export default function CategoriesPage() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api.get<CategoryWithProducts[]>("/categories")
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      toast.success("Category deleted");
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  function onDelete(c: CategoryWithProducts) {
    const count = c.products?.length ?? 0;
    const warning = count
      ? `Delete "${c.name}"? This will also delete its ${count} product(s).`
      : `Delete "${c.name}"?`;
    if (!window.confirm(warning)) return;
    remove.mutate(c.id);
  }

  const cats = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Categories"
        actions={
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> New category
          </Link>
        }
      />

      <AdminTable
        columns={["Name", "Slug", "Products", "Order", ""]}
        empty={!isLoading && cats.length === 0}
      >
        {cats.map((c) => (
          <tr key={c.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{c.name}</td>
            <td className="px-4 py-3 font-mono text-xs text-slate-500">{c.slug}</td>
            <td className="px-4 py-3 text-sm text-slate-700">
              {c.products?.length ?? 0}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{c.order}</td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/admin/categories/${c.id}`}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => onDelete(c)}
                  disabled={remove.isPending}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
