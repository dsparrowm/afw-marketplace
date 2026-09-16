import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/orders";
import { getShipmentByOrderId } from "@/lib/api/shipments";
import { mapApiOrderToDeliveryTracking } from "@/lib/admin/map-admin-delivery";
import type { AdminDeliveryTracking } from "@/lib/mocks/admin-delivery-tracking";

export type AdminDeliveryLoadResult = {
  delivery: AdminDeliveryTracking | null;
  error: string | null;
};

/** Loads order delivery tracking via interactive staff session. */
export async function loadAdminDeliveryTracking(
  orderId: string,
): Promise<AdminDeliveryLoadResult> {
  try {
    const order = await getOrderById(orderId, { auth: "session" });
    let shipment = order.shipment ?? null;
    if (!shipment) {
      shipment = await getShipmentByOrderId(orderId, { auth: "session" });
    }
    return {
      delivery: mapApiOrderToDeliveryTracking(order, shipment),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load order delivery.";
    if (message.includes("(404)")) {
      notFound();
    }
    return { delivery: null, error: message };
  }
}
