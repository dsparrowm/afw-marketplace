"use client";

import { useMemo, useState } from "react";
import { InventoryHeader } from "@/components/admin/inventory/InventoryHeader";
import { InventoryTabs } from "@/components/admin/inventory/InventoryTabs";
import { InventoryTable } from "@/components/admin/inventory/InventoryTable";
import { InventoryShipmentBanner } from "@/components/admin/inventory/InventoryShipmentBanner";
import {
  filterAdminInventory,
  type AdminInventoryRow,
  type AdminInventoryTab,
  type AdminInventoryTabMeta,
} from "@/lib/mocks/admin-inventory";

export type InventoryPageProps = {
  initialRows: AdminInventoryRow[];
  tabs: AdminInventoryTabMeta[];
  loadError?: string | null;
};

/** Inventory — live product stock (Figma `72:400` layout) */
export function InventoryPage({
  initialRows,
  tabs,
  loadError = null,
}: InventoryPageProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<AdminInventoryTab>("all");
  const [bannerVisible, setBannerVisible] = useState(true);

  const rows = useMemo(
    () => filterAdminInventory(initialRows, { search, tab }),
    [initialRows, search, tab],
  );

  return (
    <div className="mx-auto flex min-h-[calc(100vh-0px)] max-w-[1180px] flex-col px-8 py-8">
      <InventoryHeader search={search} onSearchChange={setSearch} />

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          Could not load inventory from staging: {loadError}
        </p>
      ) : null}

      <div className="mt-5">
        <InventoryTabs tabs={tabs} active={tab} onChange={setTab} />
      </div>

      <div className="mt-5 flex-1">
        <InventoryTable rows={rows} />
      </div>

      <div className="mt-6">
        <InventoryShipmentBanner
          visible={bannerVisible}
          onDismiss={() => setBannerVisible(false)}
        />
      </div>
    </div>
  );
}
