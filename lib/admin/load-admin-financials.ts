import { getSalesReport } from "@/lib/api/reports";
import {
  emptyAdminFinancials,
  mapAdminFinancials,
  type AdminFinancialsViewModel,
} from "@/lib/admin/map-admin-financials";
import type { ApiSalesReportPoint } from "@/types/api";

export type AdminFinancialsLoadResult = AdminFinancialsViewModel & {
  error: string | null;
};

async function fetchAllSalesPages(params: {
  groupBy: "day" | "month";
}): Promise<ApiSalesReportPoint[]> {
  // Omit from/to — staging treats `to` as exclusive of that calendar day,
  // so `to=today` drops today's sales. Client filters to the current year.
  const first = await getSalesReport(
    { ...params, page: 1, limit: 100 },
    { auth: "session" },
  );
  const points = [...first.data];
  const totalPages = first.meta.totalPages || 1;

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await getSalesReport(
      { ...params, page, limit: 100 },
      { auth: "session" },
    );
    points.push(...next.data);
  }

  return points;
}

/** Loads financials view model from sales reports via staff session. */
export async function loadAdminFinancials(
  now = new Date(),
): Promise<AdminFinancialsLoadResult> {
  try {
    const [monthlyPoints, dailyPoints] = await Promise.all([
      fetchAllSalesPages({ groupBy: "month" }),
      fetchAllSalesPages({ groupBy: "day" }),
    ]);

    return {
      ...mapAdminFinancials(monthlyPoints, dailyPoints, now),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load financials.";
    return {
      ...emptyAdminFinancials(now),
      error: message,
    };
  }
}
