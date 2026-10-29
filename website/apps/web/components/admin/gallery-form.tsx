"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, ApiError, type AdminGalleryImage } from "@/lib/admin-api";
import { Field, TextInput, Checkbox, FormActions } from "./form-fields";
import { ImageUploader } from "./image-uploader";

const schema = z.object({
  caption: z.string().optional(),
  published: z.boolean().default(true),
  order: z.number().int().min(0)
});
type FormValues = z.infer<typeof schema>;

export function GalleryForm({
  initial,
  imageId
}: {
  initial?: AdminGalleryImage;
  imageId?: string;
}) {
  const router = useRouter();
  const qc = useQueryClient();
  const [images, setImages] = useState<string[]>(
    initial?.imageUrl ? [initial.imageUrl] : []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      caption: initial?.caption ?? "",
      published: initial?.published ?? true,
      order: initial?.order ?? 0
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (images.length === 0) {
        throw new ApiError(400, "Add at least one image");
      }
      if (imageId) {
        return api.patch<AdminGalleryImage>(`/gallery/${imageId}`, {
          imageUrl: images[0],
          caption: values.caption || undefined,
          published: values.published,
          order: values.order
        });
      }
      // New: create one gallery row per uploaded image.
      for (const [i, url] of images.entries()) {
        await api.post<AdminGalleryImage>("/gallery", {
          imageUrl: url,
          caption: values.caption || undefined,
          published: values.published,
          order: values.order + i
        });
      }
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
      toast.success(imageId ? "Image updated" : "Images added");
      router.push("/admin/gallery");
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
        <ImageUploader
          label={imageId ? "Image" : "Images"}
          value={images}
          onChange={setImages}
          hint={
            imageId
              ? "Replace the image for this gallery item (first image is used)."
              : "Upload one or more images, each becomes its own gallery item."
          }
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Field label="Caption" hint="Optional, applies to all images added now">
              <TextInput {...register("caption")} />
            </Field>
          </div>
          <Field label="Order">
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-2">
            <Checkbox label="Published" {...register("published")} />
          </div>
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={imageId ? "Save changes" : "Add to gallery"}
        onCancel={() => router.push("/admin/gallery")}
      />
    </form>
  );
}
