"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  Boxes,
  FolderTree,
  Globe2,
  Inbox,
  Lightbulb
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { api, type AdminProduct, type AdminCategory, type AdminMarket, type AdminInquiry, type AdminInnovation } from "@/lib/admin-api";

function StatCard({
  label,
  count,
  href,
  Icon,
  index
}: {
  label: string;
  count: number | string;
  href: string;
  Icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
        delay: 0.05 + index * 0.06
      }}
    >
      <Link
        href={href}
        className="group block overflow-hidden rounded-xl border border-primary-100/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-md hover:shadow-primary-100/50"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            {label}
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary-50 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white">
            <Icon size={16} strokeWidth={1.6} />
          </span>
        </div>
        <p className="font-display text-3xl font-semibold tracking-tight text-slate-900">
          {count}
        </p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-700 opacity-0 transition group-hover:opacity-100">
          Manage <span aria-hidden>→</span>
        </p>
      </Link>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const products = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => api.get<AdminProduct[]>("/products/admin/list")
  });
  const categories = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: () => api.get<AdminCategory[]>("/categories")
  });
  const markets = useQuery({
    queryKey: ["admin", "markets"],
    queryFn: () => api.get<AdminMarket[]>("/markets/admin/list")
  });
  const inquiries = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: () => api.get<AdminInquiry[]>("/inquiries")
  });
  const innovations = useQuery({
    queryKey: ["admin", "innovations"],
    queryFn: () => api.get<AdminInnovation[]>("/innovations/admin/list")
  });

  const recentInquiries = (inquiries.data ?? []).slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.25em] text-slate-500">
          Overview
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          index={0}
          label="Products"
          count={products.data?.length ?? "-"}
          href="/admin/products"
          Icon={Boxes}
        />
        <StatCard
          index={1}
          label="Categories"
          count={categories.data?.length ?? "-"}
          href="/admin/categories"
          Icon={FolderTree}
        />
        <StatCard
          index={2}
          label="Markets"
          count={markets.data?.length ?? "-"}
          href="/admin/markets"
          Icon={Globe2}
        />
        <StatCard
          index={3}
          label="Innovations"
          count={innovations.data?.length ?? "-"}
          href="/admin/innovations"
          Icon={Lightbulb}
        />
        <StatCard
          index={4}
          label="Inquiries"
          count={inquiries.data?.length ?? "-"}
          href="/admin/inquiries"
          Icon={Inbox}
        />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-medium text-slate-900">Recent inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="text-xs text-primary-700 hover:text-primary-900"
          >
            View all →
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-500">
            {inquiries.isLoading ? "Loading…" : "No inquiries yet."}
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentInquiries.map((q) => (
              <li
                key={q.id}
                className="flex items-start justify-between gap-4 px-5 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {q.name}
                    {q.company ? (
                      <span className="ml-2 text-slate-500">· {q.company}</span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {q.email} · {q.phone}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-700">
                    {q.message}
                  </p>
                </div>
                <span
                  className={
                    q.handled
                      ? "shrink-0 rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-700"
                      : "shrink-0 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-700"
                  }
                >
                  {q.handled ? "Handled" : "New"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
