"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminVideo } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";

export default function VideosPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "videos"],
    queryFn: () => api.get<AdminVideo[]>("/videos/admin/list")
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/videos/${id}`),
    onSuccess: () => {
      toast.success("Video deleted");
      qc.invalidateQueries({ queryKey: ["admin", "videos"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  function onDelete(v: AdminVideo) {
    if (!window.confirm(`Delete "${v.title}"?`)) return;
    remove.mutate(v.id);
  }

  const items = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Media"
        title="Videos"
        actions={
          <Link
            href="/admin/videos/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> Add video
          </Link>
        }
      />

      <AdminTable
        columns={["Title", "URL", "Published", "Order", ""]}
        empty={!isLoading && items.length === 0}
      >
        {items.map((v) => (
          <tr key={v.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{v.title}</td>
            <td className="max-w-[280px] truncate px-4 py-3 font-mono text-xs text-slate-500">
              {v.url}
            </td>
            <td className="px-4 py-3 text-xs">
              {v.published ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                  Live
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                  Draft
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{v.order}</td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/admin/videos/${v.id}`}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => onDelete(v)}
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
