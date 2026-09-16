export type AdminFinancialMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  detailTone?: "positive" | "muted";
};

export type AdminRevenueBar = {
  label: string;
  /** Relative height 0–100 from Figma bar rect heights */
  height: number;
  highlighted?: boolean;
};

export type AdminTransactionStatus = "settled" | "completed";

export type AdminTransactionRow = {
  id: string;
  date: string;
  description: string;
  type: string;
  amount: string;
  amountTone: "credit" | "debit";
  status: AdminTransactionStatus;
  /** When null/undefined, description is plain text (no receipt route). */
  href?: string | null;
};

export type AdminPayoutRow = {
  id: string;
  amount: string;
  date: string;
  txnId: string;
  status: "completed";
};

export const adminFinancialPeriod = "September 2025";

export const adminFinancialMetrics: AdminFinancialMetric[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$48,320",
    detail: "+8.2% from last month",
    detailTone: "positive",
  },
  {
    id: "expenses",
    label: "Expenses",
    value: "$12,150",
    detail: "Logistics, warehousing, customs",
    detailTone: "muted",
  },
  {
    id: "profit",
    label: "Net Profit",
    value: "$36,170",
    detail: "74.8% profit margin",
    detailTone: "muted",
  },
  {
    id: "payouts",
    label: "Pending Payouts",
    value: "$8,400",
    detail: "Scheduled for Sept 19",
    detailTone: "muted",
  },
];

/** Bar heights from Figma rects, normalized to max 86.4 → 100 */
export const adminRevenueBars: AdminRevenueBar[] = [
  { label: "J", height: 50 },
  { label: "F", height: 58 },
  { label: "M", height: 67 },
  { label: "A", height: 54 },
  { label: "M", height: 79 },
  { label: "J", height: 85 },
  { label: "J", height: 92 },
  { label: "A", height: 100, highlighted: true },
];

export const adminTransactions: AdminTransactionRow[] = [
  {
    id: "txn-1",
    date: "Sept 15, 2025",
    description: "Order #AFW-8192 payment",
    type: "Sale",
    amount: "+$63.00",
    amountTone: "credit",
    status: "settled",
  },
  {
    id: "txn-2",
    date: "Sept 14, 2025",
    description: "Refund for Order #AFW-8180",
    type: "Refund",
    amount: "-$32.00",
    amountTone: "debit",
    status: "settled",
  },
  {
    id: "txn-3",
    date: "Sept 12, 2025",
    description: "Weekly automatic bank transfer",
    type: "Payout",
    amount: "-$12,450.00",
    amountTone: "debit",
    status: "completed",
  },
  {
    id: "txn-4",
    date: "Sept 10, 2025",
    description: "Monthly shipping carrier adjustment",
    type: "Fee",
    amount: "-$145.00",
    amountTone: "debit",
    status: "settled",
  },
];

export const adminPayoutHistory: AdminPayoutRow[] = [
  {
    id: "payout-1",
    amount: "$12,450.00",
    date: "Sept 12, 2025",
    txnId: "TXN-8849-AFW",
    status: "completed",
  },
  {
    id: "payout-2",
    amount: "$14,890.00",
    date: "Sept 05, 2025",
    txnId: "TXN-8711-AFW",
    status: "completed",
  },
  {
    id: "payout-3",
    amount: "$11,210.00",
    date: "Aug 29, 2025",
    txnId: "TXN-8542-AFW",
    status: "completed",
  },
];
