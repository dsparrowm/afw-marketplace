import type { ApiCustomer, ApiOrder } from "@/types/api";
import type {
  AdminCustomerMetric,
  AdminCustomerRow,
  AdminCustomerStatus,
} from "@/lib/mocks/admin-customers";

function formatMoney(value: number): string {
  return `$${value.toFixed(2)}`;
}

function formatOrderDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / (24 * 60 * 60 * 1000),
  );

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (dayDiff === 0) return `Today, ${time}`;
  if (dayDiff === 1) return `Yesterday, ${time}`;
  if (dayDiff > 1 && dayDiff < 7) return `${dayDiff} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseAmount(value: string | number | undefined): number {
  const amount =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? "0"));
  return Number.isFinite(amount) ? amount : 0;
}

function formatLocation(customer: ApiCustomer): string {
  const address = customer.addresses?.[0];
  if (!address) return "—";
  const region = address.province || address.state;
  const parts = [address.city, region].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

function resolveStatus(
  customer: ApiCustomer,
  orderCount: number,
): AdminCustomerStatus {
  if (customer.erasedAt) return "inactive";
  return orderCount > 0 ? "active" : "inactive";
}

export function mapApiCustomerToAdminRow(
  customer: ApiCustomer,
  orders: ApiOrder[],
): AdminCustomerRow {
  const sorted = [...orders].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const totalSpent = sorted.reduce(
    (sum, order) => sum + parseAmount(order.total),
    0,
  );
  const last = sorted[0];

  return {
    id: customer.id,
    name:
      `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim() ||
      customer.email,
    email: customer.email,
    orders: sorted.length,
    totalSpent: formatMoney(totalSpent),
    lastOrder: last ? formatOrderDate(last.createdAt) : "No purchase history",
    location: formatLocation(customer),
    status: resolveStatus(customer, sorted.length),
  };
}

export function buildAdminCustomerMetrics(
  rows: AdminCustomerRow[],
  customers: ApiCustomer[],
  orders: ApiOrder[],
): AdminCustomerMetric[] {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const newThisMonth = customers.filter(
    (customer) => new Date(customer.createdAt) >= monthStart,
  ).length;

  const withOrders = rows.filter((row) => row.orders > 0).length;
  const repeat = rows.filter((row) => row.orders >= 2).length;
  const repeatPct =
    withOrders === 0 ? 0 : Math.round((repeat / rows.length) * 100);

  const paidTotals = orders.reduce(
    (sum, order) => sum + parseAmount(order.total),
    0,
  );
  const aov = orders.length === 0 ? 0 : paidTotals / orders.length;

  return [
    {
      id: "total",
      label: "Total Customers",
      value: rows.length.toLocaleString("en-US"),
      detail: `${withOrders} with purchases`,
      detailTone: "muted",
    },
    {
      id: "new",
      label: "New This Month",
      value: `${newThisMonth} Users`,
      detail: "First-time registrations",
      detailTone: "muted",
    },
    {
      id: "repeat",
      label: "Repeat Customers",
      value: `${repeatPct}%`,
      detail:
        rows.length === 0
          ? "No customers yet"
          : `${repeat} of ${rows.length} with 2+ orders`,
      detailTone: "muted",
    },
    {
      id: "aov",
      label: "Avg Order Value",
      value: `${formatMoney(aov)} CAD`,
      detail: "Average cart size",
      detailTone: "muted",
    },
  ];
}
