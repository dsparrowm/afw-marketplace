import type { Metadata } from "next";
import { InventoryPage } from "@/components/admin/inventory/InventoryPage";
import { loadAdminInventory } from "@/lib/admin/load-admin-inventory";

export const metadata: Metadata = {
  title: "Inventory · Admin · AFW Marketplace",
};

export default async function AdminInventoryRoute() {
  const { rows, tabs, error } = await loadAdminInventory();
  return (
    <InventoryPage initialRows={rows} tabs={tabs} loadError={error} />
  );
}
