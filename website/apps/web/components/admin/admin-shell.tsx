"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Boxes,
  FolderTree,
  Globe2,
  Lightbulb,
  Newspaper,
  Images,
  Video,
  Inbox,
  MessageSquareQuote,
  Award,
  LogOut,
  ExternalLink
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { api, ApiError, type AdminUser } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

const NAV: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", Icon: Boxes },
  { href: "/admin/categories", label: "Categories", Icon: FolderTree },
  { href: "/admin/markets", label: "Markets", Icon: Globe2 },
  { href: "/admin/innovations", label: "Innovations", Icon: Lightbulb },
  { href: "/admin/news", label: "News", Icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", Icon: Images },
  { href: "/admin/videos", label: "Videos", Icon: Video },
  { href: "/admin/inquiries", label: "Inquiries", Icon: Inbox },
  { href: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { href: "/admin/certifications", label: "Certifications", Icon: Award }
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const isLogin = pathname === "/admin/login";

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => api.get<{ user: AdminUser }>("/auth/me"),
    enabled: !isLogin,
    retry: false
  });
  const me = meData?.user;

  async function logout() {
    try {
      await api.post("/auth/logout");
      toast.success("Signed out");
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Logout failed";
      toast.error(msg);
    }
  }

  if (isLogin) return <>{children}</>;

  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col border-r border-primary-100/70 bg-gradient-to-b from-white to-primary-50/40">
        <div className="border-b border-primary-100/70 px-5 pb-4 pt-5">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-primary-200/50 transition group-hover:ring-primary-300">
              <Image
                src="/images/logo.svg"
                alt="Elevate"
                width={207}
                height={40}
                priority
                className="h-9 w-auto object-contain"
              />
            </span>
            <span className="rounded-full bg-primary-700 px-2 py-0.5 font-display text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {NAV.map(({ href, label, Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href} className="relative">
                  {active && (
                    <motion.span
                      layoutId="admin-nav-indicator"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      aria-hidden
                      className="absolute inset-0 rounded-md bg-primary-700/10"
                    />
                  )}
                  <Link
                    href={href}
                    className={cn(
                      "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                      active
                        ? "font-medium text-primary-800"
                        : "text-slate-700 hover:bg-primary-50/60 hover:text-primary-800"
                    )}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-primary-100/70 bg-white/60 p-4">
          {me ? (
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-700 font-display text-sm font-semibold text-white"
              >
                {(me.name || me.email).slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {me.name || me.email}
                </p>
                <p className="truncate text-[11px] uppercase tracking-wider text-primary-700">
                  {me.role}
                </p>
              </div>
            </div>
          ) : null}
          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-primary-50 hover:text-primary-800"
          >
            <ExternalLink size={14} />
            View public site
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="overflow-x-hidden bg-slate-50">
        <div className="mx-auto max-w-6xl p-8">
          <AdminPageTransition pathname={pathname}>{children}</AdminPageTransition>
        </div>
      </main>
    </div>
  );
}

import { AnimatePresence } from "motion/react";

function AdminPageTransition({
  children,
  pathname
}: {
  children: ReactNode;
  pathname: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
