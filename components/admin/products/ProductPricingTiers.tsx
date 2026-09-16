import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";

export type ProductPricingTiersProps = {
  product: AdminProductDetail;
};

export function ProductPricingTiers({ product }: ProductPricingTiersProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">
        Pricing &amp; Wholesale Tiers
      </h2>

      <div className="mt-4 flex flex-wrap gap-10">
        <div>
          <p className="text-sm text-muted-foreground">Retail Price</p>
          <p className="mt-1 text-xl font-semibold text-foreground">
            {product.retailPrice}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Wholesale Base Price</p>
          <p className="mt-1 text-xl font-semibold text-primary">
            {product.wholesaleBase}
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-muted-foreground">
              <th className="px-3 py-3 font-medium">Tier Minimum Quantity</th>
              <th className="px-3 py-3 font-medium">Price Per Unit</th>
            </tr>
          </thead>
          <tbody>
            {product.tiers.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-3 py-6 text-center text-muted-foreground"
                >
                  No wholesale tiers configured for this product.
                </td>
              </tr>
            ) : (
              product.tiers.map((tier) => (
                <tr
                  key={tier.label}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-3 py-3">{tier.label}</td>
                  <td className="px-3 py-3 font-medium">{tier.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
