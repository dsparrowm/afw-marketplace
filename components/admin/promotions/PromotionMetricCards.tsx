import type { AdminPromotionMetric } from "@/lib/mocks/admin-promotions";

export type PromotionMetricCardsProps = {
  metrics: AdminPromotionMetric[];
};

export function PromotionMetricCards({ metrics }: PromotionMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <article
          key={metric.id}
          className="rounded-xl border border-border bg-card p-[18px] shadow-sm"
        >
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-1.5 text-[1.75rem] font-semibold leading-none tracking-tight">
            {metric.value}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">{metric.detail}</p>
        </article>
      ))}
    </div>
  );
}
