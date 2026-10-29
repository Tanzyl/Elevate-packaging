"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ImagePlus, MoveDown, MoveUp, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function uploadOne(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/uploads/image`, {
    method: "POST",
    credentials: "include",
    body: fd
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let msg = `Upload failed (${res.status})`;
    try {
      const body = JSON.parse(text);
      if (body?.message) msg = Array.isArray(body.message) ? body.message.join(", ") : body.message;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  const body = (await res.json()) as { url: string };
  return body.url;
}

export function ImageUploader({
  value,
  onChange,
  label = "Images",
  hint
}: {
  value: string[];
  onChange: (next: string[]) => void;
  label?: string;
  hint?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    if (arr.length === 0) return;
    setBusy(true);
    const next = [...value];
    let errors = 0;
    for (const f of arr) {
      try {
        const url = await uploadOne(f);
        next.push(url);
      } catch (err) {
        errors += 1;
        toast.error(err instanceof Error ? err.message : "Upload failed");
      }
    }
    onChange(next);
    if (arr.length - errors > 0) {
      toast.success(
        `${arr.length - errors} image${arr.length - errors === 1 ? "" : "s"} uploaded`
      );
    }
    setBusy(false);
  }

  function move(idx: number, dir: -1 | 1) {
    const j = idx + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  }

  function remove(idx: number) {
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-700">
          {label}
        </span>
        <span className="text-[11px] text-slate-500">
          {value.length} {value.length === 1 ? "image" : "images"}
        </span>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) {
            handleFiles(e.dataTransfer.files);
          }
        }}
        disabled={busy}
        className={
          dragOver
            ? "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary-600 bg-primary-50 px-6 py-8 text-sm text-primary-800 transition"
            : "flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-sm text-slate-600 transition hover:border-primary-400 hover:bg-primary-50/40 hover:text-primary-700 disabled:opacity-50"
        }
      >
        {busy ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Uploading…</span>
          </>
        ) : (
          <>
            <ImagePlus size={22} strokeWidth={1.5} />
            <span className="font-medium">Click or drop images here</span>
            <span className="text-[11px] text-slate-500">
              JPG · PNG · WEBP · GIF · AVIF · max 10 MB each
            </span>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {hint ? (
        <p className="mt-1.5 text-[11px] text-slate-500">{hint}</p>
      ) : null}

      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <AnimatePresence initial={false}>
          {value.map((url, i) => (
            <motion.li
              key={url}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <Image
                src={url}
                alt={`Image ${i + 1}`}
                fill
                sizes="200px"
                className="object-cover"
                unoptimized
              />
              <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-1.5 bottom-1.5 flex items-center justify-end gap-1 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded bg-white/90 p-1 text-slate-700 shadow hover:bg-white disabled:opacity-30"
                  aria-label="Move up"
                >
                  <MoveUp size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  className="rounded bg-white/90 p-1 text-slate-700 shadow hover:bg-white disabled:opacity-30"
                  aria-label="Move down"
                >
                  <MoveDown size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="rounded bg-red-600/95 p-1 text-white shadow hover:bg-red-700"
                  aria-label="Remove"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
