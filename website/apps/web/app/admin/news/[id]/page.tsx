"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminNewsPost } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { NewsForm } from "@/components/admin/news-form";

export default function EditNewsPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "news"],
    queryFn: () => api.get<AdminNewsPost[]>("/news/admin/list")
  });
  const p = data?.find((x) => x.id === params.id);
  if (isLoading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!p)
    return (
      <div>
        <PageHeader eyebrow="Media" title="Post not found" />
      </div>
    );
  return (
    <div>
      <PageHeader eyebrow="Media" title={`Edit · ${p.title}`} />
      <NewsForm initial={p} newsId={p.id} />
    </div>
  );
}
