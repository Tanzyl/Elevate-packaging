import type { ReactNode } from "react";
import { AdminProviders } from "./providers";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin · Elevate"
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="force-light min-h-screen bg-slate-50 text-slate-900 antialiased">
      <AdminProviders>
        <AdminShell>{children}</AdminShell>
      </AdminProviders>
    </div>
  );
}
