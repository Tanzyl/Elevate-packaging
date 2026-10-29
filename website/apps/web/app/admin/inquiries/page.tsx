"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminInquiry } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";

export default function InquiriesPage() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState<"all" | "new" | "handled">("all");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "inquiries", filter],
    queryFn: () => {
      const q =
        filter === "new" ? "?handled=false" : filter === "handled" ? "?handled=true" : "";
      return api.get<AdminInquiry[]>(`/inquiries${q}`);
    }
  });

  const toggleHandled = useMutation({
    mutationFn: (q: AdminInquiry) =>
      api.patch(`/inquiries/${q.id}`, { handled: !q.handled }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Update failed")
  });

  const items = data ?? [];

  return (
    <div>
      <PageHeader eyebrow="Pipeline" title="Inquiries" />

      <div className="mb-4 inline-flex rounded-md border border-slate-200 bg-white p-0.5">
        {(["all", "new", "handled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? "rounded px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-primary-700 text-white"
                : "rounded px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-700 hover:bg-slate-50"
            }
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          No inquiries to show.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((q) => (
            <li
              key={q.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-medium text-slate-900">{q.name}</p>
                    {q.company ? (
                      <span className="text-xs text-slate-500">· {q.company}</span>
                    ) : null}
                    <span className="ml-auto text-xs text-slate-400">
                      {new Date(q.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {q.email} · {q.phone}
                    {q.address ? ` · ${q.address}` : ""}
                    {q.source ? ` · via ${q.source}` : ""}
                  </p>
                  <p className="mt-2.5 whitespace-pre-wrap text-sm text-slate-700">
                    {q.message}
                  </p>
                </div>
                <button
                  onClick={() => toggleHandled.mutate(q)}
                  disabled={toggleHandled.isPending}
                  className={
                    q.handled
                      ? "shrink-0 inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                      : "shrink-0 inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  }
                >
                  <Check size={12} />
                  {q.handled ? "Handled" : "Mark handled"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
