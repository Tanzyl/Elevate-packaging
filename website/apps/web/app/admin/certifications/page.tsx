"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminCertification } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { Field, TextInput, Checkbox, FormActions } from "@/components/admin/form-fields";

const schema = z.object({
  name: z.string().min(2),
  url: z.string().optional(),
  order: z.number().int().min(0),
  published: z.boolean()
});
type FormValues = z.infer<typeof schema>;

export default function CertificationsPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<AdminCertification | "new" | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "certifications"],
    queryFn: () => api.get<AdminCertification[]>("/certifications/admin/list")
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/certifications/${id}`),
    onSuccess: () => {
      toast.success("Certification deleted");
      qc.invalidateQueries({ queryKey: ["admin", "certifications"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  const items = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Trust"
        title="Certifications"
        actions={
          <button
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> New certification
          </button>
        }
      />

      <AdminTable
        columns={["Name", "URL", "Order", "Published", ""]}
        empty={!isLoading && items.length === 0}
      >
        {items.map((c) => (
          <tr key={c.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{c.name}</td>
            <td className="px-4 py-3 text-xs text-slate-500 truncate max-w-xs">
              {c.url || "-"}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{c.order}</td>
            <td className="px-4 py-3 text-xs">
              {c.published ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                  Live
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                  Hidden
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-1">
                <button
                  onClick={() => setEditing(c)}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete "${c.name}"?`)) remove.mutate(c.id);
                  }}
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

      {editing && (
        <CertDialog
          initial={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function CertDialog({
  initial,
  onClose
}: {
  initial?: AdminCertification;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      name: initial?.name ?? "",
      url: initial?.url ?? "",
      order: initial?.order ?? 0,
      published: initial?.published ?? true
    }
  });

  const save = useMutation({
    mutationFn: (values: FormValues) =>
      initial
        ? api.patch<AdminCertification>(`/certifications/${initial.id}`, values)
        : api.post<AdminCertification>("/certifications", values),
    onSuccess: () => {
      toast.success(initial ? "Certification updated" : "Certification created");
      qc.invalidateQueries({ queryKey: ["admin", "certifications"] });
      onClose();
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Save failed")
  });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            {initial ? "Edit certification" : "New certification"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit((v) => save.mutate(v))}
          className="space-y-4"
        >
          <Field label="Name" required error={errors.name?.message}>
            <TextInput {...register("name")} placeholder="ISO 9001:2015" />
          </Field>
          <Field label="URL" hint="Optional, link to certificate or issuer">
            <TextInput {...register("url")} placeholder="https://…" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Order">
              <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
            </Field>
            <div className="flex items-end pb-2">
              <Checkbox label="Published" {...register("published")} />
            </div>
          </div>
          <FormActions
            busy={isSubmitting || save.isPending}
            primaryLabel={initial ? "Save" : "Create"}
            onCancel={onClose}
          />
        </form>
      </div>
    </div>
  );
}
