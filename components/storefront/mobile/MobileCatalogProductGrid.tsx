"use client";

import { useEffect, useState } from "react";
import { MobileProductCard } from "@/components/storefront/mobile/MobileProductCard";
import { Button } from "@/components/ui/button";
import { MOBILE_CATALOG_PAGE_SIZE } from "@/lib/storefront/catalog";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export type MobileCatalogProductGridProps = {
  products: Product[];
  displayTotal: number;
  className?: string;
};

/** 2-column catalog grid + load more — Figma `3:2220` / `3:2321` */
export function MobileCatalogProductGrid({
  products,
  displayTotal,
  className,
}: MobileCatalogProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(MOBILE_CATALOG_PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(MOBILE_CATALOG_PAGE_SIZE);
  }, [products]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;
  const progress = products.length
    ? Math.min(100, (visibleProducts.length / displayTotal) * 100)
    : 0;

  if (products.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-lg font-semibold text-foreground">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("px-4", className)}>
      <div
        className="grid grid-cols-2 gap-4"
        data-figma-node="3:2220"
      >
        {visibleProducts.map((product) => (
          <MobileProductCard
            key={product.id}
            product={product}
            variant="catalog"
          />
        ))}
      </div>

      <div className="py-12 text-center" data-figma-node="3:2321">
        <p className="text-sm text-muted-foreground">
          Showing {visibleProducts.length} of {displayTotal}
        </p>
        <div className="mx-auto mt-6 h-1 max-w-[343px] overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand-green transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {hasMore ? (
          <Button
            type="button"
            variant="outline"
            className="mt-8 h-14 w-full max-w-[343px] rounded-xl text-base font-semibold"
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + MOBILE_CATALOG_PAGE_SIZE, products.length),
              )
            }
          >
            Load More Products
          </Button>
        ) : null}
      </div>
    </div>
  );
}
