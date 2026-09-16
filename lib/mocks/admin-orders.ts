export type AdminOrderFulfillment =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type AdminOrderTab = "all" | AdminOrderFulfillment;

export type AdminOrderPayment = "paid" | "pending" | "failed";

export type AdminOrderRow = {
  id: string;
  orderNumber: string;
  customer: string;
  items: string;
  total: string;
  payment: AdminOrderPayment;
  fulfillment: AdminOrderFulfillment;
  date: string;
};

export type AdminShipmentStatus =
  | "out-for-delivery"
  | "in-transit"
  | "origin-scan";

export type AdminShipmentRow = {
  id: string;
  carrier: string;
  trackingNumber: string;
  destination: string;
  estDelivery: string;
  status: AdminShipmentStatus;
};

export type AdminOrderTabMeta = {
  id: AdminOrderTab;
  label: string;
  count: number;
};

export const adminOrderTabs: AdminOrderTabMeta[] = [
  { id: "all", label: "All Orders", count: 48 },
  { id: "pending", label: "Pending", count: 8 },
  { id: "processing", label: "Processing", count: 12 },
  { id: "shipped", label: "Shipped", count: 14 },
  { id: "delivered", label: "Delivered", count: 12 },
  { id: "cancelled", label: "Cancelled", count: 2 },
];

export const adminOrderDateRange = "Sept 1 - Sept 30";

/** Orders table from Figma `72:661` */
export const adminOrderRows: AdminOrderRow[] = [
  {
    id: "afw-8192",
    orderNumber: "#AFW-8192",
    customer: "Chidi Egwu",
    items: "Palm Oil (1L) × 2, Egusi × 1",
    total: "$63.00",
    payment: "paid",
    fulfillment: "processing",
    date: "Today, 10:14 AM",
  },
  {
    id: "afw-8191",
    orderNumber: "#AFW-8191",
    customer: "Yinka Davies",
    items: "Jollof Rice Spice Mix × 5",
    total: "$64.00",
    payment: "paid",
    fulfillment: "pending",
    date: "Today, 9:30 AM",
  },
  {
    id: "afw-8189",
    orderNumber: "#AFW-8189",
    customer: "Chioma Nze",
    items: "Dried Crayfish × 1",
    total: "$45.00",
    payment: "paid",
    fulfillment: "shipped",
    date: "Yesterday",
  },
  {
    id: "afw-8188",
    orderNumber: "#AFW-8188",
    customer: "Babajide Williams",
    items: "Cassava Flour 2kg × 3",
    total: "$43.50",
    payment: "paid",
    fulfillment: "delivered",
    date: "Yesterday",
  },
  {
    id: "afw-8185",
    orderNumber: "#AFW-8185",
    customer: "Oluwaseun Alabi",
    items: "Plantain Chips Box × 1",
    total: "$30.00",
    payment: "failed",
    fulfillment: "cancelled",
    date: "2 days ago",
  },
  {
    id: "afw-8182",
    orderNumber: "#AFW-8182",
    customer: "Ibrahim Bello",
    items: "Ogbono Seeds × 2",
    total: "$48.00",
    payment: "paid",
    fulfillment: "delivered",
    date: "3 days ago",
  },
];

/** Active Delivery Shipments from Figma `72:755` */
export const adminShipmentRows: AdminShipmentRow[] = [
  {
    id: "ca-992",
    carrier: "Canada Post",
    trackingNumber: "CA-992-041-AF",
    destination: "Toronto, ON (M5V 2L7)",
    estDelivery: "Today, by 4:00 PM",
    status: "out-for-delivery",
  },
  {
    id: "fe-829",
    carrier: "FedEx Ground",
    trackingNumber: "FE-829-105-AF",
    destination: "Vancouver, BC (V6B 3H6)",
    estDelivery: "Tomorrow, 2:00 PM",
    status: "in-transit",
  },
  {
    id: "dh-103",
    carrier: "DHL Express",
    trackingNumber: "DH-103-884-AF",
    destination: "Montreal, QC (H3B 1A2)",
    estDelivery: "Sept 18, 2025",
    status: "origin-scan",
  },
];

export function filterAdminOrders(
  rows: AdminOrderRow[],
  filters: { search: string; tab: AdminOrderTab },
): AdminOrderRow[] {
  const q = filters.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (filters.tab !== "all" && row.fulfillment !== filters.tab) return false;
    if (!q) return true;
    return (
      row.orderNumber.toLowerCase().includes(q) ||
      row.customer.toLowerCase().includes(q)
    );
  });
}
