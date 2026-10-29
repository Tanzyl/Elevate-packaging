"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { catalog } from "@/lib/products";
import { submitForm } from "@/lib/submit-form";

export function RfqForm() {
  const params = useSearchParams();
  const preselectedCategory = params.get("category") ?? "";
  const preselectedProduct = params.get("product") ?? "";

  const [categorySlug, setCategorySlug] = useState(preselectedCategory);
  const [productSlug, setProductSlug] = useState(preselectedProduct);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const productsInCategory = useMemo(() => {
    const cat = catalog.find((c) => c.slug === categorySlug);
    return cat?.products ?? [];
  }, [categorySlug]);

  const inputCls =
    "w-full rounded-xl border border-line/15 bg-bg/60 px-4 py-3 text-fg outline-none transition placeholder:text-subtle focus:border-accent focus:ring-4 focus:ring-accent/10 [&_option]:bg-card";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const result = await submitForm(form, { _subject: "Quote request - Elevate" });
    if (result === "sent") {
      setStatus("sent");
      form.reset();
      setCategorySlug("");
      setProductSlug("");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-card p-6 shadow-2xl shadow-primary-900/10 md:p-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-gold-500 to-accent" />
      <form onSubmit={onSubmit} className="space-y-10">
        {/* Product */}
        <fieldset className="space-y-4">
          <legend className="mb-5 flex items-center gap-3 font-display text-lg font-semibold text-fg">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white shadow-accent">01</span>
            What you need
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-muted">
              Product line *
              <select
                required
                name="category"
                value={categorySlug}
                onChange={(e) => {
                  setCategorySlug(e.target.value);
                  setProductSlug("");
                }}
                className={`mt-1 ${inputCls}`}
              >
                <option value="" disabled>Pick a product line…</option>
                {catalog.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Item *
              <select
                required
                name="product"
                value={productSlug}
                onChange={(e) => setProductSlug(e.target.value)}
                disabled={!categorySlug}
                className={`mt-1 ${inputCls} disabled:opacity-50`}
              >
                <option value="" disabled>
                  {categorySlug ? "Pick an item…" : "Choose a product line above"}
                </option>
                {productsInCategory.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-sm text-muted md:max-w-xs">
            How many? *
            <input
              required
              name="quantity"
              type="number"
              min={1}
              placeholder="For example, 50000"
              className={`mt-1 ${inputCls}`}
            />
          </label>
        </fieldset>

        {/* Notes */}
        <fieldset className="space-y-4">
          <legend className="mb-5 flex items-center gap-3 font-display text-lg font-semibold text-fg">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white shadow-accent">02</span>
            Extra details
          </legend>
          <label className="block text-sm text-muted">
            Additional info
            <textarea
              name="notes"
              rows={4}
              placeholder="Tell us more: dimensions, number of colors, deadline, special effects, eco-friendly goals, or a current SKU you want matched…"
              className={`mt-1 ${inputCls}`}
            />
          </label>
        </fieldset>

        {/* Contact */}
        <fieldset className="space-y-4">
          <legend className="mb-5 flex items-center gap-3 font-display text-lg font-semibold text-fg">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-xs font-semibold text-white shadow-accent">03</span>
            How to reach you
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-muted">
              Your name *
              <input required name="name" className={`mt-1 ${inputCls}`} />
            </label>
            <label className="block text-sm text-muted">
              Company name
              <input name="company" className={`mt-1 ${inputCls}`} />
            </label>
            <label className="block text-sm text-muted">
              Work email *
              <input required type="email" name="email" className={`mt-1 ${inputCls}`} />
            </label>
            <label className="block text-sm text-muted">
              Phone number *
              <input required type="tel" name="phone" className={`mt-1 ${inputCls}`} />
            </label>
          </div>

          <label className="flex items-start gap-3 text-xs text-muted">
            <input
              required
              type="checkbox"
              name="consent"
              className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent))]"
            />
            <span>
              I&apos;m OK with Elevate keeping and using these details to put together my quote.
            </span>
          </label>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-accent transition hover:bg-accent-hover disabled:opacity-50"
          >
            {status === "sending" ? "Sending request…" : "Request Pricing"}
          </button>
          <span className="text-xs text-subtle">
            Expect pricing and samples from us within one business day.
          </span>
        </div>

        {status === "sent" && (
          <p className="text-sm text-emerald-500 dark:text-emerald-300">
            Got it! One of our packaging specialists will contact you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500 dark:text-red-300">
            We couldn&rsquo;t send your request. Please write to info@elevatepackaging.com directly.
          </p>
        )}
      </form>
    </div>
  );
}
