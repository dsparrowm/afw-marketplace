import type { ApiOrder, ApiShipment } from "@/types/api";
import type {
  AdminDeliveryTracking,
  DeliveryTimelineStep,
} from "@/lib/mocks/admin-delivery-tracking";

function formatDateTime(iso: string | undefined | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(iso: string | undefined | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function deliveryMethodLabel(method: string): string {
  switch (method) {
    case "pickup":
      return "Store Pickup";
    case "local_delivery":
      return "Local Delivery";
    case "ship":
      return "Shipping";
    default:
      return method || "—";
  }
}

function statusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Pending";
    case "processing":
      return "Processing";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    case "refunded":
      return "Refunded";
    default:
      return status;
  }
}

function statusTone(
  status: string,
): AdminDeliveryTracking["tracking"]["statusTone"] {
  switch (status) {
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

function buildTimeline(order: ApiOrder): DeliveryTimelineStep[] {
  const status = order.status;
  const created = formatDateTime(order.createdAt);
  const updated = formatDateTime(order.updatedAt);

  const rank: Record<string, number> = {
    pending: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
    refunded: -1,
  };
  const currentRank = rank[status] ?? 0;

  if (status === "cancelled" || status === "refunded") {
    return [
      {
        id: "pending",
        label: "Pending",
        detail: created,
        status: "complete",
      },
      {
        id: "cancelled",
        label: statusLabel(status),
        detail: updated,
        status: "current",
      },
      {
        id: "shipped",
        label: "Shipped",
        detail: "—",
        status: "upcoming",
      },
      {
        id: "delivered",
        label: "Delivered",
        detail: "—",
        status: "upcoming",
      },
    ];
  }

  const steps: { id: string; label: string; detail: string }[] = [
    { id: "pending", label: "Pending", detail: created },
    {
      id: "processing",
      label: "Processing",
      detail: currentRank >= 1 ? updated : "—",
    },
    {
      id: "shipped",
      label: "Shipped",
      detail: currentRank >= 2 ? updated : "—",
    },
    {
      id: "delivered",
      label: "Delivered",
      detail: currentRank >= 3 ? updated : "Estimated —",
    },
  ];

  return steps.map((step, index) => {
    let stepStatus: DeliveryTimelineStep["status"] = "upcoming";
    if (index < currentRank) stepStatus = "complete";
    else if (index === currentRank) stepStatus = "current";
    return { ...step, status: stepStatus };
  });
}

function trackingSummary(
  order: ApiOrder,
  shipment: ApiShipment | null,
): string {
  if (order.status === "cancelled" || order.status === "refunded") {
    return `Order is ${statusLabel(order.status).toLowerCase()}.`;
  }
  if (order.deliveryMethod === "pickup" && !shipment) {
    return "Customer will pick up this order — no courier consignment yet.";
  }
  if (!shipment) {
    return "No shipment record yet. Add tracking when the order is dispatched.";
  }
  const carrier = shipment.courierName?.trim() || "the carrier";
  return `Consignment is tracked with ${carrier}.`;
}

export function mapApiOrderToDeliveryTracking(
  order: ApiOrder,
  shipment: ApiShipment | null,
): AdminDeliveryTracking {
  const orderNumber = `AFW-${order.orderNumber}`;
  const customer = order.customer;
  const name = customer
    ? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim() ||
      customer.email
    : "Unknown customer";
  const address = order.deliveryAddress;
  const region = address?.province || address?.state;
  const line2 = [address?.city, region, address?.postalCode]
    .filter(Boolean)
    .join(", ");

  const carrier =
    shipment?.courierName?.trim() ||
    deliveryMethodLabel(order.deliveryMethod);
  const waybill = shipment?.trackingNumber?.trim() || "—";
  const dispatchedAt = formatDateTime(
    shipment?.createdAt || (order.status !== "pending" ? order.updatedAt : null),
  );

  return {
    id: order.id,
    orderNumber,
    orderStatus: order.status,
    deliveryMethodCode: order.deliveryMethod,
    hasShipment: Boolean(shipment),
    breadcrumb: [
      { label: "Orders", href: "/admin/orders" },
      { label: orderNumber, href: `/admin/orders/${order.id}` },
      { label: "Delivery" },
    ],
    title: `Order #${orderNumber} — Delivery`,
    subtitle: "Fulfillment status and logistics tracking timeline.",
    customer: {
      name,
      email: customer?.email ?? "—",
      phone: customer?.phone?.trim() || "—",
    },
    deliveryMethod: {
      carrier,
      service: deliveryMethodLabel(order.deliveryMethod),
      estDelivery: shipment?.estimatedDeliveryAt
        ? `Est. Delivery: ${formatDate(shipment.estimatedDeliveryAt)}`
        : order.deliveryMethod === "pickup"
          ? "Pickup — no estimated delivery"
          : "Est. Delivery: —",
    },
    shippingAddress: {
      line1:
        address?.line1?.trim() ||
        (order.deliveryMethod === "pickup" ? "Store pickup" : "—"),
      line2: line2 || (order.deliveryMethod === "pickup" ? "—" : "—"),
      country: address?.country?.trim() || "—",
    },
    tracking: {
      statusLabel: statusLabel(order.status),
      statusTone: statusTone(order.status),
      summary: trackingSummary(order, shipment),
      carrier,
      waybill,
      dispatchedAt,
    },
    timeline: buildTimeline(order),
  };
}
