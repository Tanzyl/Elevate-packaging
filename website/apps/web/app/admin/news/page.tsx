"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminNewsPost } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";

export default function NewsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "news"],
    queryFn: () => api.get<AdminNewsPost[]>("/news/admin/list")
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/news/${id}`),
    onSuccess: () => {
      toast.success("Post deleted");
      qc.invalidateQueries({ queryKey: ["admin", "news"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  function onDelete(p: AdminNewsPost) {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    remove.mutate(p.id);
  }

  const items = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Media"
        title="News"
        actions={
          <Link
            href="/admin/news/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> New post
          </Link>
        }
      />

      <AdminTable
        columns={["Title", "Date", "Featured", "Published", "Order", ""]}
        empty={!isLoading && items.length === 0}
      >
        {items.map((p) => (
          <tr key={p.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{p.title}</td>
            <td className="px-4 py-3 text-xs text-slate-500">{p.date?.slice(0, 10)}</td>
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
            <td className="px-4 py-3 text-sm text-slate-700">{p.order}</td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/admin/news/${p.id}`}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => onDelete(p)}
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
