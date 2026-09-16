import { marketplaceFetch } from "@/lib/api/client";
import type {
  ApiCreateShipmentBody,
  ApiShipment,
  ApiUpdateShipmentBody,
} from "@/types/api";

type AuthOptions = { auth?: boolean | "session" | "machine" };

/** Returns null when the order has no shipment (API 404). */
export async function getShipmentByOrderId(
  orderId: string,
  options?: AuthOptions,
): Promise<ApiShipment | null> {
  try {
    return await marketplaceFetch<ApiShipment>(
      `/admin/delivery/shipments/${orderId}`,
      { auth: options?.auth ?? "session" },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("(404)")) return null;
    throw error;
  }
}

export async function createShipment(
  body: ApiCreateShipmentBody,
  options?: AuthOptions,
): Promise<ApiShipment> {
  return marketplaceFetch<ApiShipment>("/admin/delivery/shipments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    auth: options?.auth ?? "session",
  });
}

export async function updateShipment(
  orderId: string,
  body: ApiUpdateShipmentBody,
  options?: AuthOptions,
): Promise<ApiShipment> {
  return marketplaceFetch<ApiShipment>(
    `/admin/delivery/shipments/${orderId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      auth: options?.auth ?? "session",
    },
  );
}
