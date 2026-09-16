import Link from "next/link";
import type { AdminTransactionRow } from "@/lib/mocks/admin-financials";
import { cn } from "@/lib/utils";

export type RecentTransactionsProps = {
  rows: AdminTransactionRow[];
};

function statusLabel(status: AdminTransactionRow["status"]) {
  return status === "completed" ? "Completed" : "Settled";
}

export function RecentTransactions({ rows }: RecentTransactionsProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-foreground">
        Recent transactions
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No daily sales periods in the current year yet. Transaction-level
          receipts are not available from the API.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="w-[120px] pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="w-[100px] pb-3 font-medium">Type</th>
                <th className="w-[110px] pb-3 font-medium">Amount</th>
                <th className="w-[110px] pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const href =
                  row.href === undefined
                    ? `/admin/financials/transactions/${row.id}`
                    : row.href;

                return (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3.5 text-muted-foreground">{row.date}</td>
                    <td className="py-3.5">
                      {href ? (
                        <Link
                          href={href}
                          className="hover:text-admin-nav-active-foreground hover:underline"
                        >
                          {row.description}
                        </Link>
                      ) : (
                        <span>{row.description}</span>
                      )}
                    </td>
                    <td className="py-3.5">{row.type}</td>
                    <td
                      className={cn(
                        "py-3.5 font-medium",
                        row.amountTone === "credit"
                          ? "text-admin-status-positive"
                          : "text-foreground",
                      )}
                    >
                      {row.amount}
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center rounded-md bg-admin-status-active px-2.5 py-1 text-xs font-medium text-admin-status-active-foreground">
                        {statusLabel(row.status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
