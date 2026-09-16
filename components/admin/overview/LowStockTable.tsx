import Link from "next/link";
import { AdminStatusBadge } from "@/components/admin/AdminStatusBadge";
import type { AdminLowStockRow } from "@/lib/mocks/admin-overview";

export type LowStockTableProps = {
  rows: AdminLowStockRow[];
};

export function LowStockTable({ rows }: LowStockTableProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-foreground">
          Low stock alerts
        </h2>
        <Link
          href="/admin/inventory"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Manage inventory
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-3 pr-2 font-medium">Product</th>
              <th className="pb-3 pr-2 font-medium">Current Stock</th>
              <th className="pb-3 pr-2 font-medium">Status</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  No low-stock alerts.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="py-4 pr-2 font-medium">{row.product}</td>
                  <td className="py-4 pr-2">{row.currentStock}</td>
                  <td className="py-4 pr-2">
                    <AdminStatusBadge kind="stock" status={row.status} />
                  </td>
                  <td className="py-4">
                    <Link
                      href="/admin/inventory"
                      className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      Update Stock
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
