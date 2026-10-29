"use client";

import { useState } from "react";
import {
  ArrowRight,
  HelpCircle,
  Mail,
  Pencil,
  Phone,
  User,
  type LucideIcon
} from "lucide-react";
import { submitForm } from "@/lib/submit-form";

const SUBJECTS = [
  "Question about a product",
  "Pricing request",
  "Technical or spec help",
  "Jobs at Elevate",
  "Something else"
] as const;

/** Underline-style input with a leading lucide icon. */
function Field({
  icon: Icon,
  children
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex items-start rounded-xl border border-line/15 bg-bg/60 px-4 py-3.5 transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
      <Icon size={16} className="mt-0.5 shrink-0 text-subtle transition group-focus-within:text-accent" />
      <div className="ml-3 flex-1">{children}</div>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    const result = await submitForm(form, { _subject: "Website message - Elevate" });
    if (result === "sent") {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full border-0 bg-transparent p-0 text-sm text-fg outline-none placeholder:text-subtle";

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="grid gap-4 md:grid-cols-2">
        <Field icon={User}>
          <input required name="name" placeholder="Your Name" className={inputCls} />
        </Field>
        <Field icon={Mail}>
          <input
            required
            type="email"
            name="email"
            placeholder="Work Email"
            className={inputCls}
          />
        </Field>
        <Field icon={Phone}>
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone"
            className={inputCls}
          />
        </Field>
        <Field icon={HelpCircle}>
          <select
            required
            name="subject"
            defaultValue=""
            className={`${inputCls} appearance-none [&_option]:bg-card`}
          >
            <option value="" disabled>
              What&apos;s this about?
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field icon={Pencil}>
          <textarea
            required
            name="message"
            rows={4}
            placeholder="How can we help?"
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-center gap-3 text-sm text-muted">
        <input
          required
          type="checkbox"
          name="consent"
          className="h-4 w-4 accent-[rgb(var(--accent))]"
        />
        <span>I consent to Elevate storing the details I&apos;ve shared.</span>
      </label>

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-accent transition hover:bg-accent-hover disabled:opacity-50"
        >
          {status === "sending" ? "Sending your message…" : "Submit"}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {status === "sent" && (
        <p className="mt-5 text-sm text-emerald-500 dark:text-emerald-300">
          Message received. Expect a reply within one business day.
        </p>
      )}
      {status === "error" && (
        <p className="mt-5 text-sm text-red-500 dark:text-red-300">
          We couldn&rsquo;t send that. Please write to info@elevatepackaging.com directly.
        </p>
      )}
    </form>
  );
}
