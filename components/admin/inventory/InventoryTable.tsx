import Link from "next/link";
import { InventoryStatusBadge } from "@/components/admin/inventory/InventoryStatusBadge";
import type { AdminInventoryRow } from "@/lib/mocks/admin-inventory";

export type InventoryTableProps = {
  rows: AdminInventoryRow[];
};

export function InventoryTable({ rows }: InventoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="px-4 py-4 font-medium">Product Name</th>
            <th className="w-[120px] px-2 py-4 font-medium">SKU</th>
            <th className="w-[110px] px-2 py-4 font-medium">Current Stock</th>
            <th className="w-[110px] px-2 py-4 font-medium">Reorder Level</th>
            <th className="w-[140px] px-2 py-4 font-medium">Status</th>
            <th className="w-[120px] px-2 py-4 font-medium">Last Updated</th>
            <th className="w-[120px] px-2 py-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                No inventory rows match this view.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-5 font-medium text-foreground">
                  <Link
                    href={`/admin/products/${row.id}`}
                    className="hover:text-admin-nav-active-foreground hover:underline"
                  >
                    {row.name}
                  </Link>
                </td>
                <td className="px-2 py-5 text-foreground">{row.sku}</td>
                <td className="px-2 py-5 text-foreground">{row.currentStock}</td>
                <td className="px-2 py-5 text-foreground">{row.reorderLevel}</td>
                <td className="px-2 py-5">
                  <InventoryStatusBadge status={row.status} />
                </td>
                <td className="px-2 py-5 text-muted-foreground">
                  {row.lastUpdated}
                </td>
                <td className="px-2 py-5">
                  <Link
                    href={`/admin/products/${row.id}`}
                    className="inline-flex h-8 items-center rounded-md border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Restock
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
