import type {
  ApiDashboardLowStockItem,
  ApiDashboardRecentOrder,
  ApiDashboardSummary,
} from "@/types/api";
import type {
  AdminLowStockRow,
  AdminOrderAttentionRow,
  AdminOrderAttentionStatus,
  AdminOverviewMetric,
  AdminRecentSale,
} from "@/lib/mocks/admin-overview";

function formatMoney(value: number | string | undefined): string {
  const amount =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? "0"));
  if (!Number.isFinite(amount)) return "$0.00";
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatTimeAgo(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.max(0, Math.round(diffMs / 60_000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function customerName(order: ApiDashboardRecentOrder): string {
  const customer = order.customer;
  if (!customer) return "Unknown customer";
  const full = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();
  return full || customer.email || "Unknown customer";
}

function attentionStatus(
  order: ApiDashboardRecentOrder,
): AdminOrderAttentionStatus {
  if (order.paymentStatus === "pending" || order.paymentStatus === "failed") {
    return "pending-payment";
  }
  if (order.status === "processing") return "needs-packaging";
  if (order.status === "shipped") return "delayed-shipment";
  return "needs-packaging";
}

export function buildOverviewMetrics(
  dashboard: ApiDashboardSummary,
  activeProductCount: number,
): AdminOverviewMetric[] {
  const pendingFulfillment = dashboard.recentOrders.filter((order) =>
    ["pending", "processing"].includes(order.status),
  ).length;

  return [
    {
      id: "sales",
      label: "Today's Sales",
      value: formatMoney(dashboard.today.revenue),
      detail: `${dashboard.today.orderCount} order${dashboard.today.orderCount === 1 ? "" : "s"} today`,
      detailTone: "muted",
    },
    {
      id: "orders",
      label: "Today's Orders",
      value: String(dashboard.today.orderCount),
      detail:
        pendingFulfillment > 0
          ? `${pendingFulfillment} pending fulfillment`
          : "No pending fulfillment in recent list",
      detailTone: "muted",
    },
    {
      id: "products",
      label: "Active Products",
      value: activeProductCount.toLocaleString("en-US"),
      detail:
        dashboard.pendingWholesaleApprovals > 0
          ? `${dashboard.pendingWholesaleApprovals} wholesale approval${dashboard.pendingWholesaleApprovals === 1 ? "" : "s"} pending`
          : "Live catalog items",
      detailTone: "muted",
    },
    {
      id: "low-stock",
      label: "Low Stock Alerts",
      value: `${dashboard.lowStock.count} item${dashboard.lowStock.count === 1 ? "" : "s"}`,
      detail:
        dashboard.lowStock.count > 0 ? "Action required" : "Stock levels healthy",
      detailTone: dashboard.lowStock.count > 0 ? "alert" : "muted",
    },
  ];
}

export function mapDashboardAttentionOrders(
  orders: ApiDashboardRecentOrder[],
): AdminOrderAttentionRow[] {
  return orders
    .filter(
      (order) =>
        ["pending", "processing"].includes(order.status) ||
        ["pending", "failed"].includes(order.paymentStatus),
    )
    .slice(0, 8)
    .map((order) => ({
      id: order.id,
      orderNumber: `#AFW-${order.orderNumber}`,
      customer: customerName(order),
      amount: formatMoney(order.total),
      status: attentionStatus(order),
    }));
}

export function mapDashboardLowStock(
  items: ApiDashboardLowStockItem[],
): AdminLowStockRow[] {
  return items.map((item) => {
    const name = item.product?.name?.trim() || "Product";
    const label = item.label?.trim();
    return {
      id: item.id,
      product: label ? `${name} (${label})` : name,
      currentStock: `${item.stockQuantity} left`,
      status: item.stockQuantity <= 0 ? "out-of-stock" : "low-stock",
    };
  });
}

export function mapDashboardRecentSales(
  orders: ApiDashboardRecentOrder[],
): AdminRecentSale[] {
  return orders.slice(0, 8).map((order) => ({
    id: order.id,
    customer: customerName(order),
    items: `Order #AFW-${order.orderNumber} · ${order.deliveryMethod}`,
    timeAgo: formatTimeAgo(order.createdAt),
    amount: formatMoney(order.total),
  }));
}
