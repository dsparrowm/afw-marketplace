import { listOrders } from "@/lib/api/orders";
import {
  buildAdminOrderTabs,
  mapApiOrderToAdminRow,
  mapApiShipmentToAdminRow,
} from "@/lib/admin/map-admin-order";
import type {
  AdminOrderRow,
  AdminOrderTabMeta,
  AdminShipmentRow,
} from "@/lib/mocks/admin-orders";

export type AdminOrdersLoadResult = {
  rows: AdminOrderRow[];
  tabs: AdminOrderTabMeta[];
  shipments: AdminShipmentRow[];
  error: string | null;
};

/** Loads orders for the admin Orders & Delivery screen via staff session. */
export async function loadAdminOrders(): Promise<AdminOrdersLoadResult> {
  try {
    const firstPage = await listOrders(
      { page: 1, limit: 50 },
      { auth: "session" },
    );

    const orders = [...firstPage.data];
    const totalPages = firstPage.meta.totalPages || 1;

    for (let page = 2; page <= totalPages; page += 1) {
      const next = await listOrders(
        { page, limit: 50 },
        { auth: "session" },
      );
      orders.push(...next.data);
    }

    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const rows = orders.map(mapApiOrderToAdminRow);
    const tabs = buildAdminOrderTabs(rows);
    const shipments = orders
      .filter((order) => order.shipment)
      .map((order) => mapApiShipmentToAdminRow(order.shipment!, order));

    return { rows, tabs, shipments, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load orders.";
    return {
      rows: [],
      tabs: buildAdminOrderTabs([]),
      shipments: [],
      error: message,
    };
  }
}
