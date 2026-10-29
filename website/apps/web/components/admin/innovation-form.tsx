"use client";

import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, ApiError, type AdminInnovation } from "@/lib/admin-api";
import { Field, TextInput, TextArea, Checkbox, FormActions } from "./form-fields";
import { parseVideo } from "@/lib/video";

const schema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(2),
  body: z.string().min(2),
  coverUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  order: z.number().int().min(0)
});
type FormValues = z.infer<typeof schema>;

export function InnovationForm({
  initial,
  innovationId
}: {
  initial?: AdminInnovation;
  innovationId?: string;
}) {
  const router = useRouter();
  const qc = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      slug: initial?.slug ?? "",
      title: initial?.title ?? "",
      summary: initial?.summary ?? "",
      body: initial?.body ?? "",
      coverUrl: initial?.coverUrl ?? "",
      videoUrl: initial?.videoUrl ?? "",
      featured: initial?.featured ?? false,
      published: initial?.published ?? false,
      order: initial?.order ?? 0
    }
  });

  const videoEmbed = parseVideo(watch("videoUrl") ?? "");

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        slug: values.slug,
        title: values.title,
        summary: values.summary,
        body: values.body,
        coverUrl: values.coverUrl || undefined,
        videoUrl: values.videoUrl || undefined,
        featured: values.featured,
        published: values.published,
        order: values.order
      };
      return innovationId
        ? api.patch<AdminInnovation>(`/innovations/${innovationId}`, payload)
        : api.post<AdminInnovation>("/innovations", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "innovations"] });
      toast.success(innovationId ? "Innovation updated" : "Innovation created");
      router.push("/admin/innovations");
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
          <Field label="Slug" required error={errors.slug?.message}>
            <TextInput {...register("slug")} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Summary" required error={errors.summary?.message}>
              <TextArea rows={2} {...register("summary")} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Body" required error={errors.body?.message}>
              <TextArea rows={10} {...register("body")} />
            </Field>
          </div>
          <Field label="Cover image URL">
            <TextInput {...register("coverUrl")} />
          </Field>
          <Field label="Video URL" hint="YouTube or Vimeo link (optional)">
            <TextInput {...register("videoUrl")} placeholder="https://www.youtube.com/watch?v=…" />
          </Field>
          {videoEmbed && (
            <div className="md:col-span-2">
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-black">
                <iframe
                  src={videoEmbed.embedUrl}
                  title="Video preview"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          <Field label="Order">
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-2 flex flex-col gap-3">
            <Checkbox label="Published" {...register("published")} />
            <Checkbox label="Featured" {...register("featured")} />
          </div>
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={innovationId ? "Save changes" : "Create innovation"}
        onCancel={() => router.push("/admin/innovations")}
      />
    </form>
  );
}
