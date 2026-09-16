import type { Metadata } from "next";
import { OverviewDashboard } from "@/components/admin/overview/OverviewDashboard";
import { loadAdminOverview } from "@/lib/admin/load-admin-overview";

export const metadata: Metadata = {
  title: "Overview · Admin · AFW Marketplace",
};

export default async function AdminOverviewPage() {
  const data = await loadAdminOverview();

  return (
    <OverviewDashboard
      metrics={data.metrics}
      attentionOrders={data.attentionOrders}
      lowStock={data.lowStock}
      recentSales={data.recentSales}
      loadError={data.error}
      hour={new Date().getHours()}
    />
  );
}
