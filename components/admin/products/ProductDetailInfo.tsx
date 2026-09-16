import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";

export type ProductDetailInfoProps = {
  product: AdminProductDetail;
};

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {product.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">SKU: {product.sku}</p>
        </div>
        {product.organic ? (
          <span className="inline-flex items-center rounded-md bg-admin-status-active px-2.5 py-1 text-xs font-medium text-admin-status-active-foreground">
            100% Organic
          </span>
        ) : null}
      </div>

      <div className="my-4 border-t border-border" />

      <div className="flex flex-wrap gap-8 text-sm">
        <Meta label="Category" value={product.category} />
        <Meta label="Origin" value={product.origin} />
        <Meta label="Warehouse Location" value={product.warehouseLocation} />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium text-foreground">{value}</p>
    </div>
  );
}
