import type { AdminRevenueBar } from "@/lib/mocks/admin-financials";
import { cn } from "@/lib/utils";

export type RevenueTrendChartProps = {
  bars: AdminRevenueBar[];
  rangeLabel: string;
};

export function RevenueTrendChart({
  bars,
  rangeLabel,
}: RevenueTrendChartProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">
          Monthly Revenue Trend
        </h2>
        <p className="text-sm text-muted-foreground">{rangeLabel}</p>
      </div>
      <div
        className="flex h-[100px] items-end gap-3"
        role="img"
        aria-label={`Monthly revenue bars for ${rangeLabel}`}
      >
        {bars.map((bar, index) => (
          <div
            key={`${bar.label}-${index}`}
            className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className={cn(
                "w-full max-w-[69px] rounded-sm",
                bar.highlighted ? "bg-brand-green" : "bg-muted",
              )}
              style={{ height: `${bar.height}%` }}
            />
            <span className="text-xs text-muted-foreground">{bar.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
