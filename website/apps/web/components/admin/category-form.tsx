"use client";

import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, ApiError, type AdminCategory } from "@/lib/admin-api";
import { Field, TextInput, TextArea, FormActions } from "./form-fields";

const schema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  summary: z.string().optional(),
  intro: z.string().optional(),
  order: z.number().int().min(0)
});

type FormValues = z.infer<typeof schema>;

export function CategoryForm({
  initial,
  categoryId
}: {
  initial?: AdminCategory;
  categoryId?: string;
}) {
  const router = useRouter();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      slug: initial?.slug ?? "",
      name: initial?.name ?? "",
      summary: initial?.summary ?? "",
      intro: initial?.intro ?? "",
      order: initial?.order ?? 0
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        slug: values.slug,
        name: values.name,
        summary: values.summary || undefined,
        intro: values.intro || undefined,
        order: values.order
      };
      return categoryId
        ? api.patch<AdminCategory>(`/categories/${categoryId}`, payload)
        : api.post<AdminCategory>("/categories", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      toast.success(categoryId ? "Category updated" : "Category created");
      router.push("/admin/categories");
      router.refresh();
    },
    onError: (err) =>
      toast.error(err instanceof ApiError ? err.message : "Save failed")
  });

  return (
    <form
      onSubmit={handleSubmit((v) => mutation.mutate(v))}
      className="space-y-6"
    >
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" required error={errors.name?.message}>
            <TextInput {...register("name")} placeholder="Pouches" />
          </Field>
          <Field label="Slug" required error={errors.slug?.message}>
            <TextInput {...register("slug")} placeholder="pouches" />
          </Field>
          <Field label="Order" hint="Lower = shown first">
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Summary" hint="One-line for cards / nav">
              <TextArea rows={2} {...register("summary")} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Intro" hint="Long-form intro for the category page">
              <TextArea rows={5} {...register("intro")} />
            </Field>
          </div>
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={categoryId ? "Save changes" : "Create category"}
        onCancel={() => router.push("/admin/categories")}
      />
    </form>
  );
}
