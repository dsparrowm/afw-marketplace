import type { AdminRecentSale } from "@/lib/mocks/admin-overview";

export type RecentSalesProps = {
  sales: AdminRecentSale[];
};

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <section className="h-full rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Recent sales
      </h2>
      <ul className="flex flex-col gap-4">
        {sales.length === 0 ? (
          <li className="py-6 text-center text-sm text-muted-foreground">
            No recent sales yet.
          </li>
        ) : (
          sales.map((sale) => (
            <li
              key={sale.id}
              className="flex items-start justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {sale.customer}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {sale.items}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {sale.timeAgo}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-foreground">
                {sale.amount}
              </p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
