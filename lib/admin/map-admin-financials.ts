import type { ApiSalesReportPoint } from "@/types/api";
import type {
  AdminFinancialMetric,
  AdminPayoutRow,
  AdminRevenueBar,
  AdminTransactionRow,
} from "@/lib/mocks/admin-financials";

function toNumber(value: number | string | undefined): number {
  const amount =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? "0"));
  return Number.isFinite(amount) ? amount : 0;
}

function formatMoney(value: number | string | undefined): string {
  return `$${toNumber(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPeriodLabel(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export type AdminFinancialsViewModel = {
  periodLabel: string;
  chartRangeLabel: string;
  metrics: AdminFinancialMetric[];
  bars: AdminRevenueBar[];
  transactions: AdminTransactionRow[];
  payouts: AdminPayoutRow[];
};

function aggregate(points: ApiSalesReportPoint[]) {
  return points.reduce(
    (acc, point) => {
      acc.revenue += toNumber(point.revenue);
      acc.orderCount += point.orderCount ?? 0;
      acc.retail += toNumber(point.retailRevenue);
      acc.wholesale += toNumber(point.wholesaleRevenue);
      return acc;
    },
    { revenue: 0, orderCount: 0, retail: 0, wholesale: 0 },
  );
}

/** Build YTD monthly bars (Jan–Dec), padding missing months with 0. */
export function buildMonthlyRevenueBars(
  monthlyPoints: ApiSalesReportPoint[],
  year: number,
): AdminRevenueBar[] {
  const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const values = Array.from({ length: 12 }, () => 0);

  for (const point of monthlyPoints) {
    const date = new Date(point.period);
    if (Number.isNaN(date.getTime())) continue;
    if (date.getUTCFullYear() !== year) continue;
    values[date.getUTCMonth()] += toNumber(point.revenue);
  }

  const max = Math.max(...values, 0);
  const highlightIndex =
    max > 0 ? values.lastIndexOf(Math.max(...values)) : -1;

  return labels.map((label, index) => ({
    label,
    height: max > 0 ? Math.max(4, Math.round((values[index] / max) * 100)) : 4,
    highlighted: index === highlightIndex,
  }));
}

/** Map daily sales periods into Recent transactions rows (no receipt links). */
export function mapSalesPointsToTransactionRows(
  dailyPoints: ApiSalesReportPoint[],
): AdminTransactionRow[] {
  return [...dailyPoints]
    .sort(
      (a, b) =>
        new Date(b.period).getTime() - new Date(a.period).getTime(),
    )
    .slice(0, 12)
    .map((point) => {
      const revenue = toNumber(point.revenue);
      const orders = point.orderCount ?? 0;
      return {
        id: `sales-${point.period}`,
        date: formatPeriodLabel(point.period),
        description: `Sales · ${orders} order${orders === 1 ? "" : "s"}`,
        type: "Sale",
        amount: `+${formatMoney(revenue)}`,
        amountTone: "credit" as const,
        status: "settled" as const,
        href: null,
      };
    });
}

export function buildFinancialMetrics(
  points: ApiSalesReportPoint[],
  periodLabel: string,
): AdminFinancialMetric[] {
  const totals = aggregate(points);
  const aov =
    totals.orderCount > 0 ? totals.revenue / totals.orderCount : 0;

  return [
    {
      id: "revenue",
      label: "Total Revenue",
      value: formatMoney(totals.revenue),
      detail: periodLabel,
      detailTone: "muted",
    },
    {
      id: "orders",
      label: "Orders",
      value: totals.orderCount.toLocaleString("en-US"),
      detail:
        totals.orderCount > 0
          ? `Avg ${formatMoney(aov)} per order`
          : "No orders in period",
      detailTone: "muted",
    },
    {
      id: "retail",
      label: "Retail Revenue",
      value: formatMoney(totals.retail),
      detail: "From sales report",
      detailTone: "muted",
    },
    {
      id: "wholesale",
      label: "Wholesale Revenue",
      value: formatMoney(totals.wholesale),
      detail: "From sales report",
      detailTone: "muted",
    },
  ];
}

export function mapAdminFinancials(
  monthlyPoints: ApiSalesReportPoint[],
  dailyPoints: ApiSalesReportPoint[],
  now = new Date(),
): AdminFinancialsViewModel {
  const year = now.getFullYear();
  const periodLabel = formatMonthYear(now);
  const yearPoints = monthlyPoints.filter((point) => {
    const date = new Date(point.period);
    return !Number.isNaN(date.getTime()) && date.getUTCFullYear() === year;
  });

  // Prefer YTD monthly aggregates for metrics when present; else sum daily.
  const metricSource =
    yearPoints.length > 0
      ? yearPoints
      : dailyPoints.length > 0
        ? dailyPoints
        : monthlyPoints;

  return {
    periodLabel,
    chartRangeLabel: `Jan – Dec ${year}`,
    metrics: buildFinancialMetrics(metricSource, `YTD · ${year}`),
    bars: buildMonthlyRevenueBars(monthlyPoints, year),
    transactions: mapSalesPointsToTransactionRows(dailyPoints),
    payouts: [],
  };
}

export function emptyAdminFinancials(now = new Date()): AdminFinancialsViewModel {
  const year = now.getFullYear();
  return {
    periodLabel: formatMonthYear(now),
    chartRangeLabel: `Jan – Dec ${year}`,
    metrics: buildFinancialMetrics([], `YTD · ${year}`),
    bars: buildMonthlyRevenueBars([], year),
    transactions: [],
    payouts: [],
  };
}
