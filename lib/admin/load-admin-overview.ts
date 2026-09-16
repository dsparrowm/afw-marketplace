import { getDashboardSummary } from "@/lib/api/dashboard";
import { listProducts } from "@/lib/api/products";
import {
  buildOverviewMetrics,
  mapDashboardAttentionOrders,
  mapDashboardLowStock,
  mapDashboardRecentSales,
} from "@/lib/admin/map-admin-overview";
import type {
  AdminLowStockRow,
  AdminOrderAttentionRow,
  AdminOverviewMetric,
  AdminRecentSale,
} from "@/lib/mocks/admin-overview";

export type AdminOverviewLoadResult = {
  metrics: AdminOverviewMetric[];
  attentionOrders: AdminOrderAttentionRow[];
  lowStock: AdminLowStockRow[];
  recentSales: AdminRecentSale[];
  error: string | null;
};

/** Loads overview dashboard data via interactive staff session. */
export async function loadAdminOverview(): Promise<AdminOverviewLoadResult> {
  try {
    const [dashboard, productsPage] = await Promise.all([
      getDashboardSummary({ auth: "session" }),
      listProducts(
        { page: 1, limit: 1, status: "active" },
        { auth: "session" },
      ),
    ]);

    return {
      metrics: buildOverviewMetrics(dashboard, productsPage.meta.total ?? 0),
      attentionOrders: mapDashboardAttentionOrders(dashboard.recentOrders),
      lowStock: mapDashboardLowStock(dashboard.lowStock.items),
      recentSales: mapDashboardRecentSales(dashboard.recentOrders),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load dashboard.";
    return {
      metrics: [],
      attentionOrders: [],
      lowStock: [],
      recentSales: [],
      error: message,
    };
  }
}
