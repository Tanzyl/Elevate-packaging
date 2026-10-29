"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminGalleryImage } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";

export default function GalleryPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "gallery"],
    queryFn: () => api.get<AdminGalleryImage[]>("/gallery/admin/list")
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/gallery/${id}`),
    onSuccess: () => {
      toast.success("Image deleted");
      qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  function onDelete(g: AdminGalleryImage) {
    if (!window.confirm("Delete this image?")) return;
    remove.mutate(g.id);
  }

  const items = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Media"
        title="Gallery"
        actions={
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> Add images
          </Link>
        }
      />

      <AdminTable
        columns={["Image", "Caption", "Published", "Order", ""]}
        empty={!isLoading && items.length === 0}
      >
        {items.map((g) => (
          <tr key={g.id} className="hover:bg-slate-50">
            <td className="px-4 py-3">
              <span className="relative block h-12 w-16 overflow-hidden rounded border border-slate-200 bg-slate-100">
                <Image
                  src={g.imageUrl}
                  alt={g.caption ?? "Gallery image"}
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">
              {g.caption || <span className="text-slate-400">-</span>}
            </td>
            <td className="px-4 py-3 text-xs">
              {g.published ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                  Live
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                  Draft
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{g.order}</td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <Link
                  href={`/admin/gallery/${g.id}`}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </Link>
                <button
                  onClick={() => onDelete(g)}
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
