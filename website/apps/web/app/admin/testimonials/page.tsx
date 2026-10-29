"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError, type AdminTestimonial } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { AdminTable } from "@/components/admin/admin-table";
import { Field, TextInput, TextArea, Checkbox, FormActions } from "@/components/admin/form-fields";

const schema = z.object({
  quote: z.string().min(2),
  author: z.string().min(2),
  role: z.string().min(2),
  order: z.number().int().min(0),
  published: z.boolean()
});
type FormValues = z.infer<typeof schema>;

export default function TestimonialsPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<AdminTestimonial | "new" | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: () => api.get<AdminTestimonial[]>("/testimonials/admin/list")
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/testimonials/${id}`),
    onSuccess: () => {
      toast.success("Testimonial deleted");
      qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Delete failed")
  });

  const items = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Social proof"
        title="Testimonials"
        actions={
          <button
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-700 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-800"
          >
            <Plus size={15} /> New testimonial
          </button>
        }
      />

      <AdminTable
        columns={["Author", "Role", "Quote", "Order", "Published", ""]}
        empty={!isLoading && items.length === 0}
      >
        {items.map((t) => (
          <tr key={t.id} className="hover:bg-slate-50">
            <td className="px-4 py-3 text-sm font-medium text-slate-900">{t.author}</td>
            <td className="px-4 py-3 text-sm text-slate-700">{t.role}</td>
            <td className="px-4 py-3 text-sm text-slate-700 line-clamp-2 max-w-md">
              {t.quote}
            </td>
            <td className="px-4 py-3 text-sm text-slate-700">{t.order}</td>
            <td className="px-4 py-3 text-xs">
              {t.published ? (
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
                  onClick={() => setEditing(t)}
                  className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete testimonial from ${t.author}?`))
                      remove.mutate(t.id);
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
        <TestimonialDialog
          initial={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function TestimonialDialog({
  initial,
  onClose
}: {
  initial?: AdminTestimonial;
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
      quote: initial?.quote ?? "",
      author: initial?.author ?? "",
      role: initial?.role ?? "",
      order: initial?.order ?? 0,
      published: initial?.published ?? true
    }
  });

  const save = useMutation({
    mutationFn: (values: FormValues) =>
      initial
        ? api.patch<AdminTestimonial>(`/testimonials/${initial.id}`, values)
        : api.post<AdminTestimonial>("/testimonials", values),
    onSuccess: () => {
      toast.success(initial ? "Testimonial updated" : "Testimonial created");
      qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      onClose();
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Save failed")
  });

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            {initial ? "Edit testimonial" : "New testimonial"}
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
          <Field label="Quote" required error={errors.quote?.message}>
            <TextArea rows={4} {...register("quote")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Author" required error={errors.author?.message}>
              <TextInput {...register("author")} placeholder="Operations Head" />
            </Field>
            <Field label="Role" required error={errors.role?.message}>
              <TextInput
                {...register("role")}
                placeholder="Snack brand, Austin TX"
              />
            </Field>
          </div>
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
