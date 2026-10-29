"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminInnovation } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { InnovationForm } from "@/components/admin/innovation-form";

export default function EditInnovationPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "innovations"],
    queryFn: () => api.get<AdminInnovation[]>("/innovations/admin/list")
  });
  const i = data?.find((x) => x.id === params.id);
  if (isLoading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!i)
    return (
      <div>
        <PageHeader eyebrow="Content" title="Innovation not found" />
      </div>
    );
  return (
    <div>
      <PageHeader eyebrow="Content" title={`Edit · ${i.title}`} />
      <InnovationForm initial={i} innovationId={i.id} />
    </div>
  );
}
