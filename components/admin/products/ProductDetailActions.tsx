import Link from "next/link";
import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";

export type ProductDetailActionsProps = {
  product: AdminProductDetail;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={`/admin/products/${product.id}/edit`}
        className="inline-flex h-10 items-center rounded-md bg-brand-green px-6 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90"
      >
        Edit details
      </Link>
      <Link
        href="/admin/inventory"
        className="inline-flex h-10 items-center rounded-md border border-border bg-card px-5 text-sm font-medium transition-colors hover:bg-muted"
      >
        Update Stock
      </Link>
      <button
        type="button"
        className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium text-admin-status-delayed-foreground transition-colors hover:bg-admin-status-delayed"
      >
        Archive Product
      </button>
    </div>
  );
}
