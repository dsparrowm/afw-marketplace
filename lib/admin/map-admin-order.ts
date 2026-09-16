import type { ApiOrder, ApiShipment } from "@/types/api";
import type {
  AdminOrderFulfillment,
  AdminOrderPayment,
  AdminOrderRow,
  AdminOrderTabMeta,
  AdminShipmentRow,
  AdminShipmentStatus,
} from "@/lib/mocks/admin-orders";

function formatMoney(value: string | number | undefined): string {
  const amount = typeof value === "number" ? value : Number.parseFloat(String(value ?? "0"));
  if (!Number.isFinite(amount)) return "$0.00";
  return `$${amount.toFixed(2)}`;
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
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff > 1 && dayDiff < 7) return `${dayDiff} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function mapApiStatusToFulfillment(
  status: string,
): AdminOrderFulfillment {
  switch (status) {
    case "pending":
      return "pending";
    case "processing":
      return "processing";
    case "shipped":
      return "shipped";
    case "delivered":
      return "delivered";
    case "cancelled":
    case "refunded":
      return "cancelled";
    default:
      return "pending";
  }
}

export function mapApiPaymentStatus(status: string): AdminOrderPayment {
  switch (status) {
    case "paid":
    case "captured":
    case "succeeded":
      return "paid";
    case "failed":
      return "failed";
    default:
      return "pending";
  }
}

function formatItemsSummary(order: ApiOrder): string {
  const items = order.items ?? [];
  if (items.length === 0) return "—";

  return items
    .map((item) => {
      const name =
        item.variant?.product?.name?.trim() ||
        item.variant?.label?.trim() ||
        "Item";
      return `${name} × ${item.quantity}`;
    })
    .join(", ");
}

function formatCustomerName(order: ApiOrder): string {
  const customer = order.customer;
  if (!customer) return "Unknown customer";
  const full = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();
  return full || customer.email || "Unknown customer";
}

export function mapApiOrderToAdminRow(order: ApiOrder): AdminOrderRow {
  return {
    id: order.id,
    orderNumber: `#AFW-${order.orderNumber}`,
    customer: formatCustomerName(order),
    items: formatItemsSummary(order),
    total: formatMoney(order.total),
    payment: mapApiPaymentStatus(order.paymentStatus),
    fulfillment: mapApiStatusToFulfillment(order.status),
    date: formatOrderDate(order.createdAt),
  };
}

export function buildAdminOrderTabs(
  rows: AdminOrderRow[],
): AdminOrderTabMeta[] {
  const counts: Record<AdminOrderFulfillment, number> = {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  for (const row of rows) {
    counts[row.fulfillment] += 1;
  }

  return [
    { id: "all", label: "All Orders", count: rows.length },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "processing", label: "Processing", count: counts.processing },
    { id: "shipped", label: "Shipped", count: counts.shipped },
    { id: "delivered", label: "Delivered", count: counts.delivered },
    { id: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];
}

function mapShipmentStatus(status: string | undefined): AdminShipmentStatus {
  switch (status) {
    case "out_for_delivery":
    case "out-for-delivery":
      return "out-for-delivery";
    case "in_transit":
    case "in-transit":
      return "in-transit";
    case "origin_scan":
    case "origin-scan":
      return "origin-scan";
    default:
      return "in-transit";
  }
}

export function mapApiShipmentToAdminRow(
  shipment: ApiShipment,
  order?: ApiOrder,
): AdminShipmentRow {
  const destination =
    shipment.destinationSummary?.trim() ||
    (order?.deliveryMethod === "pickup" ? "Pickup" : "—");

  const est = shipment.estimatedDeliveryAt
    ? formatOrderDate(shipment.estimatedDeliveryAt)
    : "—";

  return {
    id: shipment.id,
    carrier: shipment.courierName?.trim() || shipment.method || "Carrier",
    trackingNumber: shipment.trackingNumber?.trim() || "—",
    destination,
    estDelivery: est,
    status: mapShipmentStatus(shipment.status),
  };
}
