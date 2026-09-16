export type DeliveryTimelineStepStatus = "complete" | "current" | "upcoming";

export type DeliveryTimelineStep = {
  id: string;
  label: string;
  detail: string;
  status: DeliveryTimelineStepStatus;
};

export type AdminDeliveryTracking = {
  id: string;
  orderNumber: string;
  orderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded"
    | string;
  deliveryMethodCode: "ship" | "local_delivery" | "pickup" | string;
  hasShipment: boolean;
  breadcrumb: { label: string; href?: string }[];
  title: string;
  subtitle: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryMethod: {
    carrier: string;
    service: string;
    estDelivery: string;
  };
  shippingAddress: {
    line1: string;
    line2: string;
    country: string;
  };
  tracking: {
    statusLabel: string;
    statusTone:
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "cancelled";
    summary: string;
    carrier: string;
    waybill: string;
    dispatchedAt: string;
  };
  timeline: DeliveryTimelineStep[];
};

/** Canonical Figma delivery — `79:380` (Order #AFW-10482) */
export const adminDeliveryTracking: AdminDeliveryTracking = {
  id: "afw-10482",
  orderNumber: "AFW-10482",
  orderStatus: "shipped",
  deliveryMethodCode: "ship",
  hasShipment: true,
  breadcrumb: [
    { label: "Orders", href: "/admin/orders" },
    { label: "AFW-10482", href: "/admin/orders/afw-10482" },
    { label: "Delivery" },
  ],
  title: "Order #AFW-10482 — Delivery",
  subtitle: "Fulfillment status and logistics tracking timeline.",
  customer: {
    name: "Amara Osei",
    email: "amara.osei@email.com",
    phone: "+233 24 555 0199",
  },
  deliveryMethod: {
    carrier: "DHL Express",
    service: "International Priority Air",
    estDelivery: "Est. Delivery: Sep 8, 2026",
  },
  shippingAddress: {
    line1: "14 Independence Ave",
    line2: "Accra, Greater Accra",
    country: "Ghana",
  },
  tracking: {
    statusLabel: "Shipped",
    statusTone: "shipped",
    summary: "Consignment is currently in transit with DHL regional hub.",
    carrier: "DHL Express",
    waybill: "DHL-7829301845",
    dispatchedAt: "Sep 5, 2026 at 4:30 PM",
  },
  timeline: [
    {
      id: "pending",
      label: "Pending",
      detail: "Sep 4, 10:14 AM",
      status: "complete",
    },
    {
      id: "processing",
      label: "Processing",
      detail: "Sep 4, 3:22 PM",
      status: "complete",
    },
    {
      id: "shipped",
      label: "Shipped",
      detail: "Sep 5, 4:30 PM",
      status: "current",
    },
    {
      id: "delivered",
      label: "Delivered",
      detail: "Estimated Sep 8",
      status: "upcoming",
    },
  ],
};

export function getAdminDeliveryTracking(
  _id: string,
): AdminDeliveryTracking {
  return adminDeliveryTracking;
}
