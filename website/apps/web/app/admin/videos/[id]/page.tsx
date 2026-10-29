"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminVideo } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { VideoForm } from "@/components/admin/video-form";

export default function EditVideoPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "videos"],
    queryFn: () => api.get<AdminVideo[]>("/videos/admin/list")
  });
  const v = data?.find((x) => x.id === params.id);
  if (isLoading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!v)
    return (
      <div>
        <PageHeader eyebrow="Media" title="Video not found" />
      </div>
    );
  return (
    <div>
      <PageHeader eyebrow="Media" title={`Edit · ${v.title}`} />
      <VideoForm initial={v} videoId={v.id} />
    </div>
  );
}
