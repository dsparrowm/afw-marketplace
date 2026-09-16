import type { Metadata } from "next";
import { DeliveryTrackingPage } from "@/components/admin/orders/DeliveryTrackingPage";
import { loadAdminDeliveryTracking } from "@/lib/admin/load-admin-delivery";
import type { AdminDeliveryTracking } from "@/lib/mocks/admin-delivery-tracking";

export const metadata: Metadata = {
  title: "Delivery Tracking · Admin · AFW Marketplace",
};

function emptyDeliveryShell(id: string): AdminDeliveryTracking {
  return {
    id,
    orderNumber: "—",
    orderStatus: "pending",
    deliveryMethodCode: "ship",
    hasShipment: false,
    breadcrumb: [
      { label: "Orders", href: "/admin/orders" },
      { label: "Delivery" },
    ],
    title: "Order delivery",
    subtitle: "Fulfillment status and logistics tracking timeline.",
    customer: { name: "—", email: "—", phone: "—" },
    deliveryMethod: {
      carrier: "—",
      service: "—",
      estDelivery: "—",
    },
    shippingAddress: { line1: "—", line2: "—", country: "—" },
    tracking: {
      statusLabel: "Unavailable",
      statusTone: "pending",
      summary: "Delivery details could not be loaded.",
      carrier: "—",
      waybill: "—",
      dispatchedAt: "—",
    },
    timeline: [],
  };
}

export default async function AdminOrderDeliveryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await loadAdminDeliveryTracking(id);

  return (
    <DeliveryTrackingPage
      delivery={data.delivery ?? emptyDeliveryShell(id)}
      loadError={data.error}
    />
  );
}
