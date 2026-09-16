import type { Metadata } from "next";
import { OrdersPage } from "@/components/admin/orders/OrdersPage";
import { loadAdminOrders } from "@/lib/admin/load-admin-orders";

export const metadata: Metadata = {
  title: "Orders & Delivery · Admin · AFW Marketplace",
};

export default async function AdminOrdersRoute() {
  const data = await loadAdminOrders();

  return (
    <OrdersPage
      initialRows={data.rows}
      tabs={data.tabs}
      shipments={data.shipments}
      loadError={data.error}
    />
  );
}
