import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";
import { cn } from "@/lib/utils";

export type ProductInventoryLogisticsProps = {
  product: AdminProductDetail;
};

const stockBadgeClass: Record<AdminProductDetail["stockStatus"], string> = {
  "in-stock":
    "bg-admin-status-active text-admin-status-active-foreground",
  "low-stock":
    "bg-admin-status-pending text-admin-status-pending-foreground",
  "out-of-stock":
    "bg-admin-status-delayed text-admin-status-delayed-foreground",
};

export function ProductInventoryLogistics({
  product,
}: ProductInventoryLogisticsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-foreground">
          Inventory Status
        </h2>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              {product.stockUnits} units
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.stockLabel}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium",
              stockBadgeClass[product.stockStatus],
            )}
          >
            {product.stockBadgeLabel}
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-foreground">
          Shipping Logistics
        </h2>
        <div className="mt-3 flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Weight</p>
            <p className="mt-0.5 font-medium">{product.weight}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dimensions</p>
            <p className="mt-0.5 font-medium">{product.dimensions}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Class</p>
            <p className="mt-0.5 font-medium">{product.shippingClass}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
