"use server";

import { revalidatePath } from "next/cache";

import { updateOrderStatus } from "@/lib/api/orders";
import { createShipment, updateShipment } from "@/lib/api/shipments";
import type {
  ApiCreateShipmentBody,
  ApiUpdateOrderStatusBody,
  ApiUpdateShipmentBody,
} from "@/types/api";

export type OrderDeliveryMutationResult =
  | { ok: true }
  | { ok: false; error: string };

function revalidateOrder(orderId: string) {
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}

export async function updateOrderStatusAction(input: {
  orderId: string;
  status: ApiUpdateOrderStatusBody["status"];
}): Promise<OrderDeliveryMutationResult> {
  try {
    await updateOrderStatus(input.orderId, { status: input.status });
    revalidateOrder(input.orderId);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to update order status.",
    };
  }
}

export async function saveShipmentTrackingAction(input: {
  orderId: string;
  method: ApiCreateShipmentBody["method"];
  hasShipment: boolean;
  courierName: string;
  trackingNumber: string;
}): Promise<OrderDeliveryMutationResult> {
  const courierName = input.courierName.trim();
  const trackingNumber = input.trackingNumber.trim();

  try {
    if (input.hasShipment) {
      const body: ApiUpdateShipmentBody = {};
      if (courierName) body.courierName = courierName;
      if (trackingNumber) body.trackingNumber = trackingNumber;
      if (!body.courierName && !body.trackingNumber) {
        return {
          ok: false,
          error: "Enter a courier name and/or tracking number.",
        };
      }
      await updateShipment(input.orderId, body);
    } else {
      await createShipment({
        orderId: input.orderId,
        method: input.method,
        courierName: courierName || undefined,
        trackingNumber: trackingNumber || undefined,
      });
    }
    revalidateOrder(input.orderId);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to save shipment tracking.",
    };
  }
}

export async function updateShipmentStatusAction(input: {
  orderId: string;
  status: NonNullable<ApiUpdateShipmentBody["status"]>;
}): Promise<OrderDeliveryMutationResult> {
  try {
    await updateShipment(input.orderId, { status: input.status });
    revalidateOrder(input.orderId);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to update shipment status.",
    };
  }
}
