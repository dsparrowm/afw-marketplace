import { OverviewHeader } from "@/components/admin/overview/OverviewHeader";
import { MetricCards } from "@/components/admin/overview/MetricCards";
import { OrdersAttentionTable } from "@/components/admin/overview/OrdersAttentionTable";
import { LowStockTable } from "@/components/admin/overview/LowStockTable";
import { RecentSales } from "@/components/admin/overview/RecentSales";
import {
  adminOverviewProfile,
  type AdminLowStockRow,
  type AdminOrderAttentionRow,
  type AdminOverviewMetric,
  type AdminRecentSale,
} from "@/lib/mocks/admin-overview";

export type OverviewDashboardProps = {
  metrics: AdminOverviewMetric[];
  attentionOrders: AdminOrderAttentionRow[];
  lowStock: AdminLowStockRow[];
  recentSales: AdminRecentSale[];
  loadError?: string | null;
  hour?: number;
};

/** Overview dashboard — live `GET /admin/dashboard` (Figma `72:8` layout) */
export function OverviewDashboard({
  metrics,
  attentionOrders,
  lowStock,
  recentSales,
  loadError = null,
  hour,
}: OverviewDashboardProps) {
  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <OverviewHeader
        profile={adminOverviewProfile}
        hour={hour ?? new Date().getHours()}
      />

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          Could not load dashboard from staging: {loadError}
        </p>
      ) : null}

      <div className="mt-6">
        <MetricCards metrics={metrics} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,676px)_minmax(280px,420px)]">
        <div className="flex flex-col gap-5">
          <OrdersAttentionTable rows={attentionOrders} />
          <LowStockTable rows={lowStock} />
        </div>
        <RecentSales sales={recentSales} />
      </div>
    </div>
  );
}
