"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminGalleryImage } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { GalleryForm } from "@/components/admin/gallery-form";

export default function EditGalleryPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "gallery"],
    queryFn: () => api.get<AdminGalleryImage[]>("/gallery/admin/list")
  });
  const g = data?.find((x) => x.id === params.id);
  if (isLoading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!g)
    return (
      <div>
        <PageHeader eyebrow="Media" title="Image not found" />
      </div>
    );
  return (
    <div>
      <PageHeader eyebrow="Media" title="Edit image" />
      <GalleryForm initial={g} imageId={g.id} />
    </div>
  );
}
