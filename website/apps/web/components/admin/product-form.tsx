"use client";

import { useFieldArray, useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { api, ApiError, type AdminCategory, type AdminProduct } from "@/lib/admin-api";
import {
  Field,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  FormActions
} from "./form-fields";
import { ImageUploader } from "./image-uploader";
import { ProductPreview } from "./product-preview";

const FEATURE_KEYS = [
  "hermetic-seal",
  "zipper",
  "vent-hole",
  "hang-hole",
  "tear-notch",
  "spout",
  "handle",
  "metallized",
  "multi-layer",
  "security-print",
  "custom-shape"
] as const;

const FINISH_OPTIONS = ["Shine", "Matt", "Metallize"] as const;

const schema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  summary: z.string().min(2),
  descriptionText: z.string().min(2),
  applicationsText: z.string().default(""),
  features: z.array(z.string()).default([]),
  finishes: z.array(z.string()).default([]),
  specs: z
    .array(
      z.object({
        label: z.string().min(1, "Required"),
        value: z.string().min(1, "Required")
      })
    )
    .default([]),
  gallery: z.array(z.string()).default([]),
  moq: z.string().optional(),
  leadTime: z.string().optional(),
  categoryId: z.string().min(1, "Pick a category"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().min(0)
});

type FormValues = z.infer<typeof schema>;

function splitLines(s: string): string[] {
  return s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

function splitParagraphs(s: string): string[] {
  return s
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function joinParagraphs(arr: string[] | undefined): string {
  return (arr ?? []).join("\n\n");
}

export function ProductForm({
  initial,
  productId
}: {
  initial?: AdminProduct;
  productId?: string;
}) {
  const router = useRouter();
  const qc = useQueryClient();

  const { data: cats } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api.get<AdminCategory[]>("/categories")
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: {
      slug: initial?.slug ?? "",
      name: initial?.name ?? "",
      summary: initial?.summary ?? "",
      descriptionText: joinParagraphs(initial?.description),
      applicationsText: (initial?.applications ?? []).join("\n"),
      features: initial?.features ?? [],
      finishes: initial?.finishes ?? [],
      specs: initial?.specs ?? [],
      gallery: initial?.gallery ?? [],
      moq: initial?.moq ?? "",
      leadTime: initial?.leadTime ?? "",
      categoryId: initial?.categoryId ?? "",
      featured: initial?.featured ?? false,
      published: initial?.published ?? true,
      order: initial?.order ?? 0
    }
  });

  const specsField = useFieldArray({ control, name: "specs" });
  const features = watch("features");
  const finishes = watch("finishes");

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        slug: values.slug,
        name: values.name,
        summary: values.summary,
        description: splitParagraphs(values.descriptionText),
        applications: splitLines(values.applicationsText),
        features: values.features,
        finishes: values.finishes,
        specs: values.specs,
        gallery: values.gallery,
        moq: values.moq || undefined,
        leadTime: values.leadTime || undefined,
        categoryId: values.categoryId,
        featured: values.featured,
        published: values.published,
        order: values.order
      };
      if (productId) {
        return api.patch<AdminProduct>(`/products/${productId}`, payload);
      }
      return api.post<AdminProduct>("/products", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      toast.success(productId ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    },
    onError: (err) => {
      const msg = err instanceof ApiError ? err.message : "Save failed";
      toast.error(msg);
    }
  });

  function toggleArrayValue(field: "features" | "finishes", v: string) {
    const current = watch(field);
    const next = current.includes(v)
      ? current.filter((x) => x !== v)
      : [...current, v];
    setValue(field, next, { shouldDirty: true });
  }

  return (
    <form
      onSubmit={handleSubmit((v) => mutation.mutate(v))}
      className="space-y-8"
    >
      {/* Identity */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <h2 className="mb-5 text-sm font-medium text-slate-900">Identity</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name" required error={errors.name?.message}>
            <TextInput {...register("name")} placeholder="e.g. Stand Up Pouch" />
          </Field>
          <Field label="Slug" required hint="URL segment (lowercase, hyphens)" error={errors.slug?.message}>
            <TextInput {...register("slug")} placeholder="stand-up" />
          </Field>
          <div className="md:col-span-2">
            <Field label="Summary" required error={errors.summary?.message}>
              <TextArea rows={2} {...register("summary")} />
            </Field>
          </div>
          <Field label="Category" required error={errors.categoryId?.message}>
            <Select {...register("categoryId")}>
              <option value="">Choose a category…</option>
              {(cats ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Order" hint="Lower = shown first" error={errors.order?.message}>
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <h2 className="mb-5 text-sm font-medium text-slate-900">Description</h2>
        <Field
          label="Description"
          required
          hint="Separate paragraphs with a blank line"
          error={errors.descriptionText?.message}
        >
          <TextArea rows={8} {...register("descriptionText")} />
        </Field>
        <div className="mt-4">
          <Field
            label="Applications"
            hint="One per line, e.g. Snacks, Tea & coffee, Confectionery"
          >
            <TextArea rows={5} {...register("applicationsText")} />
          </Field>
        </div>
      </section>

      {/* Tags */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <h2 className="mb-5 text-sm font-medium text-slate-900">Features &amp; finishes</h2>
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-700">
            Features
          </p>
          <div className="flex flex-wrap gap-2">
            {FEATURE_KEYS.map((k) => {
              const on = features.includes(k);
              return (
                <button
                  type="button"
                  key={k}
                  onClick={() => toggleArrayValue("features", k)}
                  className={
                    on
                      ? "rounded-full border border-primary-600 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800"
                      : "rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:border-slate-400"
                  }
                >
                  {k}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-700">
            Finishes
          </p>
          <div className="flex flex-wrap gap-2">
            {FINISH_OPTIONS.map((k) => {
              const on = finishes.includes(k);
              return (
                <button
                  type="button"
                  key={k}
                  onClick={() => toggleArrayValue("finishes", k)}
                  className={
                    on
                      ? "rounded-full border border-gold-500 bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700"
                      : "rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:border-slate-400"
                  }
                >
                  {k}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-900">Specs</h2>
          <button
            type="button"
            onClick={() => specsField.append({ label: "", value: "" })}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Plus size={14} /> Add row
          </button>
        </div>
        {specsField.fields.length === 0 ? (
          <p className="text-sm text-slate-500">No spec rows yet.</p>
        ) : (
          <ul className="space-y-2">
            {specsField.fields.map((f, i) => (
              <li
                key={f.id}
                className="grid grid-cols-[1fr_2fr_auto] gap-2 rounded-md border border-slate-200 p-2"
              >
                <TextInput
                  placeholder="Label (e.g. Printing)"
                  {...register(`specs.${i}.label` as const)}
                />
                <TextInput
                  placeholder="Value (e.g. Up to 8 colours)"
                  {...register(`specs.${i}.value` as const)}
                />
                <button
                  type="button"
                  onClick={() => specsField.remove(i)}
                  className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Logistics */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <h2 className="mb-5 text-sm font-medium text-slate-900">Logistics</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="MOQ" hint="Minimum order quantity">
            <TextInput placeholder="e.g. 25,000 pieces" {...register("moq")} />
          </Field>
          <Field label="Lead time">
            <TextInput
              placeholder="e.g. 3–4 weeks after artwork approval"
              {...register("leadTime")}
            />
          </Field>
        </div>
      </section>

      {/* Gallery */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-900">Gallery</h2>
          <p className="text-[11px] text-slate-500">
            Upload one or more images · drag to reorder · first is the cover
          </p>
        </div>
        <ImageUploader
          value={watch("gallery")}
          onChange={(next) => setValue("gallery", next, { shouldDirty: true })}
          label="Product images"
          hint="The first image is used as the cover. Drag-drop or click to upload. Order via the up/down controls."
        />
        <div className="mt-6">
          <ProductPreview
            name={watch("name") || (initial?.name ?? "")}
            summary={watch("summary") || (initial?.summary ?? "")}
            gallery={watch("gallery")}
          />
        </div>
      </section>

      {/* Visibility */}
      <section className="rounded-xl border border-primary-100/80 bg-white p-6 shadow-sm shadow-primary-100/30">
        <h2 className="mb-5 text-sm font-medium text-slate-900">Visibility</h2>
        <div className="flex flex-col gap-4">
          <Checkbox
            label="Published"
            hint="Visible on the public site"
            {...register("published")}
          />
          <Checkbox
            label="Featured"
            hint="Highlighted in the home page Featured Products section"
            {...register("featured")}
          />
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={productId ? "Save changes" : "Create product"}
        onCancel={() => router.push("/admin/products")}
      />
    </form>
  );
}
