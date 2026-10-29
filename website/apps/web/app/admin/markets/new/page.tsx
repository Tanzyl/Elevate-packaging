import { PageHeader } from "@/components/admin/page-header";
import { MarketForm } from "@/components/admin/market-form";

export default function NewMarketPage() {
  return (
    <div>
      <PageHeader eyebrow="Industries" title="New market" />
      <MarketForm />
    </div>
  );
}
