import { ProductCard } from "@/components/storefront/ProductCard";
import type { Product } from "@/types/product";

export type CatalogProductGridProps = {
  products: Product[];
};

export function CatalogProductGrid({ products }: CatalogProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
        <p className="text-lg font-semibold text-foreground">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="w-full" />
      ))}
    </div>
  );
}
