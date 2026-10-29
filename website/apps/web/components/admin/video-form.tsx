"use client";

import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, ApiError, type AdminVideo } from "@/lib/admin-api";
import { Field, TextInput, Checkbox, FormActions } from "./form-fields";
import { parseVideo } from "@/lib/video";

const schema = z.object({
  title: z.string().min(2),
  url: z.string().min(2),
  caption: z.string().optional(),
  published: z.boolean().default(true),
  order: z.number().int().min(0)
});
type FormValues = z.infer<typeof schema>;

export function VideoForm({
  initial,
  videoId
}: {
  initial?: AdminVideo;
  videoId?: string;
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
      title: initial?.title ?? "",
      url: initial?.url ?? "",
      caption: initial?.caption ?? "",
      published: initial?.published ?? true,
      order: initial?.order ?? 0
    }
  });

  const url = watch("url");
  const embed = parseVideo(url ?? "");

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        title: values.title,
        url: values.url,
        caption: values.caption || undefined,
        published: values.published,
        order: values.order
      };
      return videoId
        ? api.patch<AdminVideo>(`/videos/${videoId}`, payload)
        : api.post<AdminVideo>("/videos", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "videos"] });
      toast.success(videoId ? "Video updated" : "Video added");
      router.push("/admin/videos");
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
          <Field label="Order">
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-2">
            <Field
              label="Video URL"
              required
              error={errors.url?.message}
              hint="Paste a YouTube or Vimeo link"
            >
              <TextInput {...register("url")} placeholder="https://www.youtube.com/watch?v=…" />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field label="Caption" hint="Optional">
              <TextInput {...register("caption")} />
            </Field>
          </div>

          <div className="md:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-700">
              Preview
            </span>
            {embed ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-black">
                <iframe
                  src={embed.embedUrl}
                  title="Video preview"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                {url
                  ? "Not a recognised YouTube or Vimeo link."
                  : "Paste a YouTube or Vimeo link to preview it here."}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Checkbox label="Published" {...register("published")} />
          </div>
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={videoId ? "Save changes" : "Add video"}
        onCancel={() => router.push("/admin/videos")}
      />
    </form>
  );
}
