export type AdminInventoryStatus = "in-stock" | "low-stock" | "out-of-stock";

export type AdminInventoryTab = "all" | "in-stock" | "low-stock" | "out-of-stock";

export type AdminInventoryRow = {
  id: string;
  name: string;
  sku: string;
  currentStock: number;
  reorderLevel: number;
  status: AdminInventoryStatus;
  lastUpdated: string;
};

export type AdminInventoryTabMeta = {
  id: AdminInventoryTab;
  label: string;
  count: number;
};

/** Tab counts from Figma `72:458` */
export const adminInventoryTabs: AdminInventoryTabMeta[] = [
  { id: "all", label: "All Products", count: 284 },
  { id: "in-stock", label: "In Stock", count: 247 },
  { id: "low-stock", label: "Low Stock", count: 25 },
  { id: "out-of-stock", label: "Out of Stock", count: 12 },
];

/** Table rows from Figma `72:475` */
export const adminInventoryRows: AdminInventoryRow[] = [
  {
    id: "jollof-spice",
    name: "Jollof Rice Spice Mix",
    sku: "AFW-SP-001",
    currentStock: 142,
    reorderLevel: 30,
    status: "in-stock",
    lastUpdated: "2 hours ago",
  },
  {
    id: "palm-oil",
    name: "Organic Palm Oil (1L)",
    sku: "AFW-OL-004",
    currentStock: 4,
    reorderLevel: 15,
    status: "low-stock",
    lastUpdated: "1 day ago",
  },
  {
    id: "ogbono",
    name: "Dried Ogbono Seeds (500g)",
    sku: "AFW-SD-012",
    currentStock: 2,
    reorderLevel: 10,
    status: "low-stock",
    lastUpdated: "3 hours ago",
  },
  {
    id: "suya",
    name: "Suya Spice Blend (100g)",
    sku: "AFW-SP-002",
    currentStock: 0,
    reorderLevel: 25,
    status: "out-of-stock",
    lastUpdated: "3 days ago",
  },
  {
    id: "cassava",
    name: "Cassava Flour (Gari) 2kg",
    sku: "AFW-TB-089",
    currentStock: 89,
    reorderLevel: 20,
    status: "in-stock",
    lastUpdated: "Yesterday",
  },
  {
    id: "egusi",
    name: "Egusi Seeds (500g)",
    sku: "AFW-SD-005",
    currentStock: 63,
    reorderLevel: 15,
    status: "in-stock",
    lastUpdated: "4 hours ago",
  },
  {
    id: "crayfish",
    name: "Dried Crayfish (Large Bag)",
    sku: "AFW-SF-019",
    currentStock: 19,
    reorderLevel: 10,
    status: "in-stock",
    lastUpdated: "2 days ago",
  },
];

export const adminInventoryShipmentBanner = {
  message:
    "Bulk Import pending from Lagos Port shipment: 4,500 kgs of various grains.",
} as const;

export function filterAdminInventory(
  rows: AdminInventoryRow[],
  filters: { search: string; tab: AdminInventoryTab },
): AdminInventoryRow[] {
  const q = filters.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (filters.tab !== "all" && row.status !== filters.tab) return false;
    if (!q) return true;
    return (
      row.name.toLowerCase().includes(q) || row.sku.toLowerCase().includes(q)
    );
  });
}
