import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Pencil } from "lucide-react";
import { ProductStatusBadge } from "@/components/admin/products/ProductStatusBadge";
import type { AdminProductRow } from "@/lib/mocks/admin-products";

export type ProductsTableProps = {
  rows: AdminProductRow[];
};

export function ProductsTable({ rows }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="w-[76px] px-4 py-4 font-medium">Image</th>
            <th className="px-2 py-4 font-medium">Product Name</th>
            <th className="w-[180px] px-2 py-4 font-medium">Category</th>
            <th className="w-[100px] px-2 py-4 font-medium">Price</th>
            <th className="w-[100px] px-2 py-4 font-medium">Stock</th>
            <th className="w-[160px] px-2 py-4 font-medium">Status</th>
            <th className="w-[100px] px-2 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="px-4 py-10 text-center text-muted-foreground"
              >
                No products match these filters.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-4">
                  <div className="size-9 overflow-hidden rounded-md bg-muted">
                    {row.imageSrc ? (
                      <Image
                        src={row.imageSrc}
                        alt=""
                        width={36}
                        height={36}
                        className="size-9 object-cover"
                      />
                    ) : null}
                  </div>
                </td>
                <td className="px-2 py-4 font-medium text-foreground">
                  {row.name}
                </td>
                <td className="px-2 py-4 text-foreground">{row.category}</td>
                <td className="px-2 py-4 text-foreground">{row.price}</td>
                <td className="px-2 py-4 text-foreground">{row.stock}</td>
                <td className="px-2 py-4">
                  <ProductStatusBadge status={row.status} />
                </td>
                <td className="px-2 py-4">
                  <div className="flex items-center justify-end gap-1.5 pr-2">
                    <Link
                      href={`/admin/products/${row.id}`}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={`Edit ${row.name}`}
                    >
                      <Pencil className="size-[18px]" />
                    </Link>
                    <button
                      type="button"
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={`More actions for ${row.name}`}
                    >
                      <MoreHorizontal className="size-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
