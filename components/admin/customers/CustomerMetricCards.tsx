import type { AdminCustomerMetric } from "@/lib/mocks/admin-customers";
import { cn } from "@/lib/utils";

export type CustomerMetricCardsProps = {
  metrics: AdminCustomerMetric[];
};

export function CustomerMetricCards({ metrics }: CustomerMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.id}
          className="rounded-xl border border-border bg-card p-[18px] shadow-sm"
        >
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-1.5 text-[1.75rem] font-semibold leading-none tracking-tight">
            {metric.value}
          </p>
          <p
            className={cn(
              "mt-3 text-xs",
              metric.detailTone === "positive"
                ? "text-admin-status-positive"
                : "text-muted-foreground",
            )}
          >
            {metric.detail}
          </p>
        </article>
      ))}
    </div>
  );
}
