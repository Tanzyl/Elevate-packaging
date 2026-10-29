import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  actions
}: {
  eyebrow?: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-primary-100/80 pb-5">
      <div>
        {eyebrow ? (
          <p className="mb-1.5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary-700">
            <span aria-hidden className="h-px w-6 bg-primary-700/60" />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>
      </div>
      {actions ? <div className="flex gap-2">{actions}</div> : null}
    </div>
  );
}
