export type ReceiptLineItem = {
  id: string;
  name: string;
  qty: number;
  unitPrice: string;
  total: string;
};

export type AdminTransactionReceipt = {
  id: string;
  transactionNumber: string;
  breadcrumb: { label: string; href?: string }[];
  title: string;
  subtitle: string;
  statusLabel: "Paid";
  brandName: string;
  billedTo: {
    name: string;
    address: string;
  };
  payment: {
    method: string;
    reference: string;
  };
  order: {
    number: string;
    placedAt: string;
  };
  lineItems: ReceiptLineItem[];
  totals: {
    subtotal: string;
    discountLabel: string;
    discount: string;
    shipping: string;
    taxLabel: string;
    tax: string;
    totalPaid: string;
  };
};

/** Canonical Figma receipt — `79:514` (TXN-10482) */
export const adminTransactionReceipt: AdminTransactionReceipt = {
  id: "txn-10482",
  transactionNumber: "TXN-10482",
  breadcrumb: [
    { label: "Transactions", href: "/admin/financials" },
    { label: "TXN-10482" },
  ],
  title: "Transaction #TXN-10482",
  subtitle: "Settled successfully on Sep 5, 2026",
  statusLabel: "Paid",
  brandName: "African Food Warehouse",
  billedTo: {
    name: "Amara Osei",
    address: "14 Independence Ave, Accra, Ghana",
  },
  payment: {
    method: "Visa •••• 4821",
    reference: "REF: PAY-REF-20260905-4821",
  },
  order: {
    number: "#AFW-10482",
    placedAt: "Sep 5, 2026 at 4:30 PM",
  },
  lineItems: [
    {
      id: "li-1",
      name: "Nigerian Jollof Rice Mix (1.2kg)",
      qty: 3,
      unitPrice: "$12.99",
      total: "$38.97",
    },
    {
      id: "li-2",
      name: "Ghanaian Shito Pepper Sauce (350ml)",
      qty: 2,
      unitPrice: "$8.49",
      total: "$16.98",
    },
    {
      id: "li-3",
      name: "Organic Cassava Flour (2kg)",
      qty: 1,
      unitPrice: "$15.99",
      total: "$15.99",
    },
  ],
  totals: {
    subtotal: "$71.94",
    discountLabel: "Discount (10% loyalty)",
    discount: "-$7.19",
    shipping: "$5.99",
    taxLabel: "Tax (VAT 12.5%)",
    tax: "$8.84",
    totalPaid: "$79.58",
  },
};

export function getAdminTransactionReceipt(
  _id: string,
): AdminTransactionReceipt {
  return adminTransactionReceipt;
}
