export type AdminCustomerStatus = "active" | "inactive";

export type AdminCustomerRow = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  location: string;
  status: AdminCustomerStatus;
};

export type AdminCustomerMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  detailTone?: "positive" | "muted";
};

export const ADMIN_CUSTOMERS_TOTAL = 1842;
export const ADMIN_CUSTOMERS_PAGE_SIZE = 7;

export const adminCustomerMetrics: AdminCustomerMetric[] = [
  {
    id: "total",
    label: "Total Customers",
    value: "1,842",
    detail: "+12% from last quarter",
    detailTone: "positive",
  },
  {
    id: "new",
    label: "New This Month",
    value: "67 Users",
    detail: "First-time registrations",
    detailTone: "muted",
  },
  {
    id: "repeat",
    label: "Repeat Customers",
    value: "58%",
    detail: "High customer retention rate",
    detailTone: "muted",
  },
  {
    id: "aov",
    label: "Avg Order Value",
    value: "$64.20 CAD",
    detail: "Average cart size",
    detailTone: "muted",
  },
];

/** Page-1 rows from Figma `72:1496` */
export const adminCustomerRows: AdminCustomerRow[] = [
  {
    id: "yusuf-bello",
    name: "Yusuf Bello",
    email: "yusuf.b@gmail.com",
    orders: 18,
    totalSpent: "$1,240.50",
    lastOrder: "Today, 2:15 PM",
    location: "Toronto, ON",
    status: "active",
  },
  {
    id: "amina-diop",
    name: "Amina Diop",
    email: "amina.diop@uwaterloo.ca",
    orders: 12,
    totalSpent: "$845.00",
    lastOrder: "Yesterday, 9:30 AM",
    location: "Waterloo, ON",
    status: "active",
  },
  {
    id: "kofi-mensah",
    name: "Kofi Mensah",
    email: "kofi.mensah@rogers.com",
    orders: 31,
    totalSpent: "$2,105.20",
    lastOrder: "Nov 12, 2026",
    location: "Montreal, QC",
    status: "active",
  },
  {
    id: "chinedu-okafor",
    name: "Chinedu Okafor",
    email: "c.okafor@outlook.com",
    orders: 5,
    totalSpent: "$320.40",
    lastOrder: "Nov 10, 2026",
    location: "Calgary, AB",
    status: "active",
  },
  {
    id: "fatoumata-camara",
    name: "Fatoumata Camara",
    email: "fatou.camara@bell.net",
    orders: 2,
    totalSpent: "$110.50",
    lastOrder: "Oct 28, 2026",
    location: "Ottawa, ON",
    status: "active",
  },
  {
    id: "kwame-boateng",
    name: "Kwame Boateng",
    email: "k_boateng@gmail.com",
    orders: 0,
    totalSpent: "$0.00",
    lastOrder: "No purchase history",
    location: "Vancouver, BC",
    status: "inactive",
  },
  {
    id: "zainab-alabi",
    name: "Zainab Alabi",
    email: "zainab@alabifoods.com",
    orders: 45,
    totalSpent: "$4,320.00",
    lastOrder: "Oct 20, 2026",
    location: "Toronto, ON",
    status: "active",
  },
];

export function filterAdminCustomers(
  rows: AdminCustomerRow[],
  search: string,
): AdminCustomerRow[] {
  const q = search.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.location.toLowerCase().includes(q),
  );
}
