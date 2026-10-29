"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api, type AdminMarket } from "@/lib/admin-api";
import { PageHeader } from "@/components/admin/page-header";
import { MarketForm } from "@/components/admin/market-form";

export default function EditMarketPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "markets"],
    queryFn: () => api.get<AdminMarket[]>("/markets/admin/list")
  });

  const m = data?.find((x) => x.id === params.id);
  if (isLoading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (!m)
    return (
      <div>
        <PageHeader eyebrow="Industries" title="Market not found" />
      </div>
    );

  return (
    <div>
      <PageHeader eyebrow="Industries" title={`Edit · ${m.name}`} />
      <MarketForm initial={m} marketId={m.id} />
    </div>
  );
}
