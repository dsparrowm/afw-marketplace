import type { AdminPayoutRow } from "@/lib/mocks/admin-financials";

export type PayoutHistoryProps = {
  rows: AdminPayoutRow[];
};

export function PayoutHistory({ rows }: PayoutHistoryProps) {
  return (
    <section className="h-full rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Payout history
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No payout history from the API yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {rows.map((row) => (
            <li
              key={row.id}
              className="border-b border-border pb-5 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-foreground">
                  {row.amount}
                </p>
                <span className="inline-flex items-center rounded-md bg-admin-status-active px-2.5 py-1 text-xs font-medium text-admin-status-active-foreground">
                  Completed
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{row.date}</span>
                <span>{row.txnId}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
