export type AdminOverviewMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  detailTone?: "positive" | "muted" | "alert";
};

export type AdminOrderAttentionStatus =
  | "pending-payment"
  | "needs-packaging"
  | "delayed-shipment";

export type AdminOrderAttentionRow = {
  id: string;
  orderNumber: string;
  customer: string;
  amount: string;
  status: AdminOrderAttentionStatus;
};

export type AdminStockStatus = "low-stock" | "out-of-stock";

export type AdminLowStockRow = {
  id: string;
  product: string;
  currentStock: string;
  status: AdminStockStatus;
};

export type AdminRecentSale = {
  id: string;
  customer: string;
  items: string;
  timeAgo: string;
  amount: string;
};

export type AdminProfile = {
  fullName: string;
  firstName: string;
  role: string;
  initials: string;
};

/** Mock overview data aligned to Figma `72:54` main.xml */
export const adminOverviewProfile: AdminProfile = {
  fullName: "Adaeze Okafor",
  firstName: "Adaeze",
  role: "Super Admin",
  initials: "AO",
};

export const adminOverviewMetrics: AdminOverviewMetric[] = [
  {
    id: "sales",
    label: "Today's Sales",
    value: "$12,480",
    detail: "+14% from yesterday",
    detailTone: "positive",
  },
  {
    id: "orders",
    label: "Today's Orders",
    value: "47",
    detail: "8 pending fulfillment",
    detailTone: "muted",
  },
  {
    id: "products",
    label: "Active Products",
    value: "284",
    detail: "Sourced from 14 farms",
    detailTone: "muted",
  },
  {
    id: "low-stock",
    label: "Low Stock Alerts",
    value: "12 items",
    detail: "Action required",
    detailTone: "alert",
  },
];

export const adminOrdersNeedingAttention: AdminOrderAttentionRow[] = [
  {
    id: "afw-4921",
    orderNumber: "#AFW-4921",
    customer: "Chinedu Alabi",
    amount: "$142.50",
    status: "pending-payment",
  },
  {
    id: "afw-4920",
    orderNumber: "#AFW-4920",
    customer: "Folake Balogun",
    amount: "$89.10",
    status: "needs-packaging",
  },
  {
    id: "afw-4918",
    orderNumber: "#AFW-4918",
    customer: "Amara Diallo",
    amount: "$210.00",
    status: "delayed-shipment",
  },
];

export const adminLowStockAlerts: AdminLowStockRow[] = [
  {
    id: "palm-oil",
    product: "Organic Palm Oil (1L)",
    currentStock: "4 left",
    status: "low-stock",
  },
  {
    id: "suya",
    product: "Suya Spice Blend (100g)",
    currentStock: "0 left",
    status: "out-of-stock",
  },
  {
    id: "ogbono",
    product: "Dried Ogbono Seeds",
    currentStock: "2 left",
    status: "low-stock",
  },
];

export const adminRecentSales: AdminRecentSale[] = [
  {
    id: "sale-1",
    customer: "Tunde Oyelowo",
    items: "Jollof Rice Spice Mix × 3",
    timeAgo: "10 mins ago",
    amount: "$38.40",
  },
  {
    id: "sale-2",
    customer: "Ngozi Obi",
    items: "Organic Palm Oil × 2, Cassava Flour × 1",
    timeAgo: "25 mins ago",
    amount: "$64.50",
  },
  {
    id: "sale-3",
    customer: "Efe Johnson",
    items: "Dried Crayfish (Large Bag)",
    timeAgo: "1 hour ago",
    amount: "$45.00",
  },
  {
    id: "sale-4",
    customer: "Kofi Mensah",
    items: "Plantain Chips (Sweet) × 10",
    timeAgo: "2 hours ago",
    amount: "$30.00",
  },
  {
    id: "sale-5",
    customer: "Yejide Adebayo",
    items: "Egusi Seeds (500g) × 2",
    timeAgo: "4 hours ago",
    amount: "$52.00",
  },
  {
    id: "sale-6",
    customer: "Zainab Musa",
    items: "Suya Spice Blend × 4",
    timeAgo: "5 hours ago",
    amount: "$32.00",
  },
];
