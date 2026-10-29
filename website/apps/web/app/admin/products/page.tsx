"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminProduct } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";

export default function AdminProductsPage() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => api.get<AdminProduct[]>("/products/admin/list")
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => {
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  function onDelete(p: AdminProduct) {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    remove.mutate(p.id);
  }

  const products = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        actions={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} />
            New product
          </Link>
        }
      />

      <AdminTable
        columns={["Name", "Category", "Slug", "Featured", "Published", ""]}
        empty={!isLoading && products.length === 0}
      >
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.name}</td>
            <td className="px-4 py-3 text-sm text-slate-700">
              {p.category?.name ?? "-"}
            </td>
            <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.slug}</td>
            <td className="px-4 py-3 text-xs">
              {p.featured ? (
                <span className="rounded-full bg-gold-100 px-2 py-0.5 font-medium text-gold-700">
                  Featured
                </span>
              ) : (
                <span className="text-slate-400">-</span>
              )}
            </td>
            <td className="px-4 py-3 text-xs">
              {p.published ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                  Live
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                  Draft
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/admin/products/${p.id}`}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => onDelete(p)}
                  disabled={remove.isPending}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>

      {isLoading && (
        <p className="mt-4 text-sm text-slate-500">Loading…</p>
      )}
    </div>
  );
}
