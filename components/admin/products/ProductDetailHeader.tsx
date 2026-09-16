import Link from "next/link";
import { Bell, Pencil, Search } from "lucide-react";
import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";

export type ProductDetailHeaderProps = {
  product: AdminProductDetail;
};

export function ProductDetailHeader({ product }: ProductDetailHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            {product.breadcrumb.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 ? <span aria-hidden>/</span> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          <label className="relative hidden w-[240px] sm:block">
            <span className="sr-only">Search inventory</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search inventory, shipments..."
              className="h-9 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </label>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground">
              Product Details
            </h1>
            <span className="inline-flex items-center rounded-md bg-admin-status-active px-2.5 py-1 text-xs font-medium text-admin-status-active-foreground">
              {product.statusLabel}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.lastUpdated}
          </p>
        </div>
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          <Pencil className="size-4" aria-hidden />
          Edit Product
        </Link>
      </div>
    </div>
  );
}
