import Link from "next/link";
import { OrderFulfillmentBadge } from "@/components/admin/orders/OrderFulfillmentBadge";
import type { AdminOrderRow } from "@/lib/mocks/admin-orders";
import { cn } from "@/lib/utils";

export type OrdersTableProps = {
  rows: AdminOrderRow[];
};

export function OrdersTable({ rows }: OrdersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[1020px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="w-[90px] px-4 py-4 font-medium">Order #</th>
            <th className="px-2 py-4 font-medium">Customer</th>
            <th className="w-[180px] px-2 py-4 font-medium">Items</th>
            <th className="w-[80px] px-2 py-4 font-medium">Total</th>
            <th className="w-[120px] px-2 py-4 font-medium">Payment</th>
            <th className="w-[120px] px-2 py-4 font-medium">Fulfillment</th>
            <th className="w-[130px] px-2 py-4 font-medium">Date</th>
            <th className="w-[80px] px-2 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                No orders match this view.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-5 font-medium">{row.orderNumber}</td>
                <td className="px-2 py-5">{row.customer}</td>
                <td className="px-2 py-5 text-muted-foreground">{row.items}</td>
                <td className="px-2 py-5 font-medium">{row.total}</td>
                <td
                  className={cn(
                    "px-2 py-5 text-center",
                    row.payment === "failed"
                      ? "font-medium text-admin-status-delayed-foreground"
                      : row.payment === "pending"
                        ? "text-muted-foreground"
                        : "text-foreground",
                  )}
                >
                  {row.payment === "failed"
                    ? "Failed"
                    : row.payment === "pending"
                      ? "Pending"
                      : "Paid"}
                </td>
                <td className="px-2 py-5">
                  <OrderFulfillmentBadge status={row.fulfillment} />
                </td>
                <td className="px-2 py-5 text-muted-foreground">{row.date}</td>
                <td className="px-2 py-5">
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
  );
}
