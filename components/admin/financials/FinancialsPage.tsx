import { FinancialsHeader } from "@/components/admin/financials/FinancialsHeader";
import { FinancialMetricCards } from "@/components/admin/financials/FinancialMetricCards";
import { RevenueTrendChart } from "@/components/admin/financials/RevenueTrendChart";
import { RecentTransactions } from "@/components/admin/financials/RecentTransactions";
import { PayoutHistory } from "@/components/admin/financials/PayoutHistory";
import type {
  AdminFinancialMetric,
  AdminPayoutRow,
  AdminRevenueBar,
  AdminTransactionRow,
} from "@/lib/mocks/admin-financials";

export type FinancialsPageProps = {
  periodLabel: string;
  chartRangeLabel: string;
  metrics: AdminFinancialMetric[];
  bars: AdminRevenueBar[];
  transactions: AdminTransactionRow[];
  payouts: AdminPayoutRow[];
  loadError?: string | null;
};

/** Financials — Figma `72:789` / main `72:835` — live sales reports */
export function FinancialsPage({
  periodLabel,
  chartRangeLabel,
  metrics,
  bars,
  transactions,
  payouts,
  loadError = null,
}: FinancialsPageProps) {
  return (
    <div className="mx-auto max-w-[1180px] px-8 py-8">
      <FinancialsHeader periodLabel={periodLabel} />

      {loadError ? (
        <p
          className="mt-4 rounded-md border border-admin-status-delayed bg-admin-status-delayed px-4 py-3 text-sm text-admin-status-delayed-foreground"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      <div className="mt-6">
        <FinancialMetricCards metrics={metrics} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,676px)_minmax(280px,420px)]">
        <div className="flex flex-col gap-5">
          <RevenueTrendChart bars={bars} rangeLabel={chartRangeLabel} />
          <RecentTransactions rows={transactions} />
        </div>
        <PayoutHistory rows={payouts} />
      </div>
    </div>
  );
}
