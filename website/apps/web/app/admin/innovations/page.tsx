"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminInnovation } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";

export default function InnovationsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "innovations"],
    queryFn: () => api.get<AdminInnovation[]>("/innovations/admin/list")
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/innovations/${id}`),
    onSuccess: () => {
      toast.success("Innovation deleted");
      qc.invalidateQueries({ queryKey: ["admin", "innovations"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  function onDelete(i: AdminInnovation) {
    if (!window.confirm(`Delete "${i.title}"?`)) return;
    remove.mutate(i.id);
  }

  const items = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Innovations"
        actions={
          <Link
            href="/admin/innovations/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> New innovation
          </Link>
        }
      />

      <AdminTable
        columns={["Title", "Slug", "Featured", "Published", "Order", ""]}
        empty={!isLoading && items.length === 0}
      >
        {items.map((i) => (
          <tr key={i.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{i.title}</td>
            <td className="px-4 py-3 font-mono text-xs text-slate-500">{i.slug}</td>
            <td className="px-4 py-3 text-xs">
              {i.featured ? (
                <span className="rounded-full bg-gold-100 px-2 py-0.5 font-medium text-gold-700">
                  Featured
                </span>
              ) : (
                <span className="text-slate-400">-</span>
              )}
            </td>
            <td className="px-4 py-3 text-xs">
              {i.published ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                  Live
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                  Draft
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{i.order}</td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/admin/innovations/${i.id}`}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => onDelete(i)}
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
