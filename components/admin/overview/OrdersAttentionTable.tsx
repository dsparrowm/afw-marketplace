import Link from "next/link";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import type { AdminOrderAttentionRow } from "@/lib/mocks/admin-overview";

export type OrdersAttentionTableProps = {
  rows: AdminOrderAttentionRow[];
};

export function OrdersAttentionTable({ rows }: OrdersAttentionTableProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">
          Orders needing attention
        </h2>
        <Link
          href="/admin/orders"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          View all orders
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-3 pr-2 font-medium">Order #</th>
              <th className="pb-3 pr-2 font-medium">Customer</th>
              <th className="pb-3 pr-2 font-medium">Amount</th>
              <th className="pb-3 pr-2 font-medium">Status</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  No orders need attention right now.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="py-4 pr-2 font-medium">{row.orderNumber}</td>
                  <td className="py-4 pr-2">{row.customer}</td>
                  <td className="py-4 pr-2">{row.amount}</td>
                  <td className="py-4 pr-2">
                    <AdminStatusBadge kind="order" status={row.status} />
                  </td>
                  <td className="py-4">
                    <Link
                      href={`/admin/orders/${row.id}`}
                      className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
