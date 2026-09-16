export type AdminPromotionStatus = "active" | "scheduled" | "expired";

export type AdminPromotionTab = AdminPromotionStatus | "all";

export type AdminPromotionRow = {
  id: string;
  name: string;
  type: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  status: AdminPromotionStatus;
  /** Editable fields for create/edit dialogs */
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  discountValueNumber: number;
  startsAtInput: string;
  endsAtInput: string;
  usageLimit: number | null;
};

export type AdminPromotionMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export type AdminPromotionTabMeta = {
  id: AdminPromotionTab;
  label: string;
};

export const adminPromotionTabs: AdminPromotionTabMeta[] = [
  { id: "active", label: "Active" },
  { id: "scheduled", label: "Scheduled" },
  { id: "expired", label: "Expired" },
  { id: "all", label: "All" },
];

function mockRow(
  partial: Omit<
    AdminPromotionRow,
    | "code"
    | "discountType"
    | "discountValueNumber"
    | "startsAtInput"
    | "endsAtInput"
    | "usageLimit"
  > &
    Partial<
      Pick<
        AdminPromotionRow,
        | "code"
        | "discountType"
        | "discountValueNumber"
        | "startsAtInput"
        | "endsAtInput"
        | "usageLimit"
      >
    >,
): AdminPromotionRow {
  return {
    code: partial.code ?? partial.name,
    discountType: partial.discountType ?? "percentage",
    discountValueNumber: partial.discountValueNumber ?? 0,
    startsAtInput: partial.startsAtInput ?? "2026-01-01",
    endsAtInput: partial.endsAtInput ?? "2026-12-31",
    usageLimit: partial.usageLimit ?? null,
    ...partial,
  };
}

/** Rows from Figma `72:1315` */
export const adminPromotionRows: AdminPromotionRow[] = [
  mockRow({
    id: "new-customer-15",
    name: "New Customer 15% Off",
    type: "Discount Code",
    discountValue: "15% Off",
    startDate: "Oct 01, 2026",
    endDate: "Dec 31, 2026",
    status: "active",
    code: "NEW15",
    discountType: "percentage",
    discountValueNumber: 15,
    startsAtInput: "2026-10-01",
    endsAtInput: "2026-12-31",
  }),
  mockRow({
    id: "jollof-bundle",
    name: "Jollof Bundle Deal",
    type: "Fixed Amount",
    discountValue: "$5.00 Off",
    startDate: "Nov 10, 2026",
    endDate: "Nov 20, 2026",
    status: "scheduled",
    code: "JOLLOF5",
    discountType: "fixed",
    discountValueNumber: 5,
    startsAtInput: "2026-11-10",
    endsAtInput: "2026-11-20",
  }),
  mockRow({
    id: "free-shipping-75",
    name: "Free Shipping Over $75",
    type: "Free Shipping",
    discountValue: "Free Delivery",
    startDate: "Sep 01, 2026",
    endDate: "Ongoing",
    status: "active",
    code: "FREESHIP",
    discountType: "free_shipping",
    discountValueNumber: 0,
    startsAtInput: "2026-09-01",
    endsAtInput: "2026-12-31",
  }),
  mockRow({
    id: "bogo-suya",
    name: "Buy 2 Get 1 Suya Spice",
    type: "Discount Code",
    discountValue: "1 Free Item",
    startDate: "Jul 01, 2026",
    endDate: "Aug 31, 2026",
    status: "expired",
    code: "BOGOSUYA",
    discountType: "percentage",
    discountValueNumber: 100,
    startsAtInput: "2026-07-01",
    endsAtInput: "2026-08-31",
  }),
  mockRow({
    id: "summer-sale-20",
    name: "Summer Sale 20% Off",
    type: "Discount Code",
    discountValue: "20% Off",
    startDate: "Jun 01, 2026",
    endDate: "Aug 31, 2026",
    status: "expired",
    code: "SUMMER20",
    discountType: "percentage",
    discountValueNumber: 20,
    startsAtInput: "2026-06-01",
    endsAtInput: "2026-08-31",
  }),
];

export const adminPromotionMetrics: AdminPromotionMetric[] = [
  {
    id: "active",
    label: "Active Promotions",
    value: "3 Campaign Rules",
    detail: "Currently live on store",
  },
  {
    id: "redemptions",
    label: "Redemptions",
    value: "128 Uses",
    detail: "This calendar month",
  },
  {
    id: "revenue",
    label: "Promo Revenue",
    value: "$4,280.00",
    detail: "Attributed checkout total",
  },
];

export function filterAdminPromotions(
  rows: AdminPromotionRow[],
  tab: AdminPromotionTab,
): AdminPromotionRow[] {
  if (tab === "all") return rows;
  return rows.filter((row) => row.status === tab);
}
