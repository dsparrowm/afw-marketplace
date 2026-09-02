import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ProductDetail } from "@/types/product-detail";
import { getCategoryLabel } from "@/lib/storefront/catalog";
import { buildShopHref } from "@/lib/storefront/catalog";

export type ProductDetailBreadcrumbProps = {
  product: ProductDetail;
};

export function ProductDetailBreadcrumb({ product }: ProductDetailBreadcrumbProps) {
  const categoryLabel = getCategoryLabel(product.category);
  const categoryHref = buildShopHref({ category: product.category });

  return (
    <nav
      className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="transition-colors hover:text-brand-green">
        Home
      </Link>
      <ChevronRight className="h-2.5 w-2.5 opacity-60" aria-hidden />
      <Link href="/shop" className="transition-colors hover:text-brand-green">
        Shop
      </Link>
      {categoryLabel ? (
        <>
          <ChevronRight className="h-2.5 w-2.5 opacity-60" aria-hidden />
          <Link href={categoryHref} className="transition-colors hover:text-brand-green">
            {categoryLabel}
          </Link>
        </>
      ) : null}
      <ChevronRight className="h-2.5 w-2.5 opacity-60" aria-hidden />
      <span className="font-medium text-foreground">
        {product.displayName ?? product.name}
      </span>
    </nav>
  );
}
