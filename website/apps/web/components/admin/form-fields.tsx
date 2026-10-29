"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 disabled:cursor-not-allowed disabled:opacity-60";

export function Field({
  label,
  hint,
  error,
  children,
  required
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-700">
        {label}
        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </span>
      {children}
      {hint && !error ? (
        <span className="mt-1 block text-[11px] text-slate-500">{hint}</span>
      ) : null}
      {error ? (
        <span className="mt-1 block text-[11px] text-red-500">{error}</span>
      ) : null}
    </label>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function TextInput(props, ref) {
    return <input ref={ref} {...props} className={cn(inputCls, props.className)} />;
  }
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea(props, ref) {
    return <textarea ref={ref} {...props} className={cn(inputCls, "resize-y", props.className)} />;
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select(props, ref) {
    return <select ref={ref} {...props} className={cn(inputCls, props.className)} />;
  }
);

export function Checkbox({
  label,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="flex items-start gap-3">
      <input
        type="checkbox"
        {...props}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary-700 focus:ring-primary-600/30",
          props.className
        )}
      />
      <span>
        <span className="block text-sm font-medium text-slate-900">{label}</span>
        {hint ? <span className="block text-xs text-slate-500">{hint}</span> : null}
      </span>
    </label>
  );
}

export function FormActions({
  busy,
  busyLabel,
  primaryLabel,
  onCancel
}: {
  busy?: boolean;
  busyLabel?: string;
  primaryLabel: string;
  onCancel?: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
      {onCancel ? (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </button>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-primary-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-800 disabled:opacity-50"
      >
        {busy ? (busyLabel ?? "Saving…") : primaryLabel}
      </button>
    </div>
  );
}
