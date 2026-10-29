"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "motion/react";
import { ApiError, api, type AdminUser } from "@/lib/admin-api";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters")
});

type FormValues = z.infer<typeof schema>;

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  // Only ever redirect to a same-origin path. An unvalidated `from` let a
  // crafted link (?from=https://evil or ?from=javascript:...) send a
  // just-authenticated admin off-site, or execute script via router.push →
  // location.assign. "//host" is rejected too: it's protocol-relative.
  const rawFrom = params.get("from") ?? "";
  const from =
    rawFrom.startsWith("/") && !rawFrom.startsWith("//") ? rawFrom : "/admin";
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<FormValues>,
    defaultValues: { email: "", password: "" }
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      await api.post<{ user: AdminUser }>("/auth/login", values);
      toast.success("Signed in");
      router.push(from);
      router.refresh();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Sign-in failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(800px 500px at 20% 0%, rgba(212,167,61,0.12), transparent 60%), radial-gradient(700px 460px at 100% 100%, rgba(255,255,255,0.08), transparent 60%)"
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl shadow-black/50"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-lg bg-primary-50 p-2 ring-1 ring-primary-200">
            <Image
              src="/images/logo.svg"
              alt="Elevate"
              width={233}
              height={45}
              priority
              className="h-9 w-auto object-contain"
            />
          </span>
          <span className="rounded-full bg-primary-700 px-2 py-0.5 font-display text-[10px] font-medium uppercase tracking-[0.25em] text-white">
            Admin
          </span>
        </div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary-700">
          Welcome back
        </p>
        <h1 className="mb-6 font-display text-2xl font-medium text-slate-900">
          Sign in to manage the site
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-600">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-600">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-primary-700 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-primary-800 active:scale-[0.99] disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative grid min-h-screen place-items-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-4" />
      }
    >
      <LoginForm />
    </Suspense>
  );
}
