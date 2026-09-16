import type { Metadata } from "next";
import { FinancialsPage } from "@/components/admin/financials/FinancialsPage";
import { loadAdminFinancials } from "@/lib/admin/load-admin-financials";

export const metadata: Metadata = {
  title: "Financials · Admin · AFW Marketplace",
};

export default async function AdminFinancialsRoute() {
  const data = await loadAdminFinancials();

  return (
    <FinancialsPage
      periodLabel={data.periodLabel}
      chartRangeLabel={data.chartRangeLabel}
      metrics={data.metrics}
      bars={data.bars}
      transactions={data.transactions}
      payouts={data.payouts}
      loadError={data.error}
    />
  );
}
