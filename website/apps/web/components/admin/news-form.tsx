"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, ApiError, type AdminNewsPost } from "@/lib/admin-api";
import { Field, TextInput, TextArea, Checkbox, FormActions } from "./form-fields";
import { ImageUploader } from "./image-uploader";

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(2),
  body: z.string().optional(),
  date: z.string().min(1),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  order: z.number().int().min(0)
});
type FormValues = z.infer<typeof schema>;

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

export function NewsForm({
  initial,
  newsId
}: {
  initial?: AdminNewsPost;
  newsId?: string;
}) {
  const router = useRouter();
  const qc = useQueryClient();
  const [cover, setCover] = useState<string[]>(
    initial?.coverUrl ? [initial.coverUrl] : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      title: initial?.title ?? "",
      slug: initial?.slug ?? "",
      excerpt: initial?.excerpt ?? "",
      body: initial?.body ?? "",
      date: initial?.date ? initial.date.slice(0, 10) : todayISODate(),
      featured: initial?.featured ?? false,
      published: initial?.published ?? false,
      order: initial?.order ?? 0
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        body: values.body || undefined,
        coverUrl: cover[0] || undefined,
        date: new Date(values.date).toISOString(),
        featured: values.featured,
        published: values.published,
        order: values.order
      };
      return newsId
        ? api.patch<AdminNewsPost>(`/news/${newsId}`, payload)
        : api.post<AdminNewsPost>("/news", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "news"] });
      toast.success(newsId ? "Post updated" : "Post created");
      router.push("/admin/news");
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
          <Field label="Title" required error={errors.title?.message}>
            <TextInput {...register("title")} />
          </Field>
          <Field label="Slug" required error={errors.slug?.message} hint="Used in the URL / as a unique key">
            <TextInput {...register("slug")} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Excerpt" required error={errors.excerpt?.message} hint="Short text shown on the card">
              <TextArea rows={2} {...register("excerpt")} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Body" hint="Optional, full text, stored for later use">
              <TextArea rows={8} {...register("body")} />
            </Field>
          </div>
          <Field label="Date" required error={errors.date?.message}>
            <TextInput type="date" {...register("date")} />
          </Field>
          <Field label="Order">
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-2">
            <ImageUploader
              label="Cover image"
              value={cover}
              onChange={setCover}
              hint="The first image is used as the cover."
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3">
            <Checkbox label="Published" {...register("published")} />
            <Checkbox label="Featured" {...register("featured")} />
          </div>
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={newsId ? "Save changes" : "Create post"}
        onCancel={() => router.push("/admin/news")}
      />
    </form>
  );
}
