"use client";

import { useMemo, useState } from "react";
import { OrdersHeader } from "@/components/admin/orders/OrdersHeader";
import { OrdersTabs } from "@/components/admin/orders/OrdersTabs";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { ShipmentsPanel } from "@/components/admin/orders/ShipmentsPanel";
import {
  filterAdminOrders,
  type AdminOrderRow,
  type AdminOrderTab,
  type AdminOrderTabMeta,
  type AdminShipmentRow,
} from "@/lib/mocks/admin-orders";

export type OrdersPageProps = {
  initialRows: AdminOrderRow[];
  tabs: AdminOrderTabMeta[];
  shipments: AdminShipmentRow[];
  loadError?: string | null;
};

/** Orders & Delivery — live `GET /admin/orders` (Figma `72:578` layout) */
export function OrdersPage({
  initialRows,
  tabs,
  shipments,
  loadError = null,
}: OrdersPageProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<AdminOrderTab>("all");

  const rows = useMemo(
    () => filterAdminOrders(initialRows, { search, tab }),
    [initialRows, search, tab],
  );

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <OrdersHeader search={search} onSearchChange={setSearch} />

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          Could not load orders from staging: {loadError}
        </p>
      ) : null}

      <div className="mt-5">
        <OrdersTabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <div className="mt-5">
        <OrdersTable rows={rows} />
      </div>

      <div className="mt-6">
        <ShipmentsPanel rows={shipments} />
      </div>
    </div>
  );
}
