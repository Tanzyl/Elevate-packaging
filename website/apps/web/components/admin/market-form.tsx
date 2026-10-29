"use client";

import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, ApiError, type AdminMarket } from "@/lib/admin-api";
import { Field, TextInput, TextArea, Checkbox, FormActions } from "./form-fields";

const schema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  leadCopy: z.string().min(2),
  applicationsText: z.string().min(2),
  order: z.number().int().min(0),
  published: z.boolean()
});

type FormValues = z.infer<typeof schema>;

export function MarketForm({
  initial,
  marketId
}: {
  initial?: AdminMarket;
  marketId?: string;
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
      leadCopy: initial?.leadCopy ?? "",
      applicationsText: (initial?.applications ?? []).join("\n"),
      order: initial?.order ?? 0,
      published: initial?.published ?? true
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload = {
        slug: values.slug,
        name: values.name,
        leadCopy: values.leadCopy,
        applications: values.applicationsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        order: values.order,
        published: values.published
      };
      return marketId
        ? api.patch<AdminMarket>(`/markets/${marketId}`, payload)
        : api.post<AdminMarket>("/markets", payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "markets"] });
      toast.success(marketId ? "Market updated" : "Market created");
      router.push("/admin/markets");
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
            <TextInput {...register("name")} placeholder="Snacks" />
          </Field>
          <Field label="Slug" required error={errors.slug?.message}>
            <TextInput {...register("slug")} placeholder="snacks" />
          </Field>
          <Field label="Order">
            <TextInput type="number" min={0} {...register("order", { valueAsNumber: true })} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Lead copy" required error={errors.leadCopy?.message}>
              <TextArea rows={4} {...register("leadCopy")} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Field
              label="Applications"
              required
              hint="One per line"
              error={errors.applicationsText?.message}
            >
              <TextArea rows={5} {...register("applicationsText")} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Checkbox label="Published" {...register("published")} />
          </div>
        </div>
      </section>

      <FormActions
        busy={isSubmitting || mutation.isPending}
        primaryLabel={marketId ? "Save changes" : "Create market"}
        onCancel={() => router.push("/admin/markets")}
      />
    </form>
  );
}
