import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductDetailAccordions } from "@/components/storefront/product-detail/ProductDetailAccordions";
import { ProductInfo } from "@/components/storefront/product-detail/ProductInfo";
import { MobileProductCard } from "@/components/storefront/mobile/MobileProductCard";
import { MobileProductGallery } from "@/components/storefront/mobile/MobileProductGallery";
import type { ProductDetail } from "@/types/product-detail";
import type { Product } from "@/types/product";

export type MobileProductDetailPageProps = {
  product: ProductDetail;
  relatedProducts: Product[];
};

/** Mobile product detail — responsive adaptation of Figma `2:873` */
export function MobileProductDetailPage({
  product,
  relatedProducts,
}: MobileProductDetailPageProps) {
  const title = product.displayName ?? product.name;

  return (
    <div className="lg:hidden">
      <div className="px-4 pt-4">
        <Link
          href="/shop"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-brand-green"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Shop
        </Link>
      </div>

      <div className="space-y-8 px-4 py-6">
        <MobileProductGallery images={product.images} name={title} />
        <ProductInfo product={product} />
        <ProductDetailAccordions product={product} />
      </div>

      {relatedProducts.length > 0 ? (
        <section className="border-t border-border px-4 py-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-foreground">You May Also Like</h2>
            <Link
              href={product.category ? `/shop?category=${product.category}` : "/shop"}
              className="text-sm font-semibold text-brand-green"
            >
              View All
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {relatedProducts.slice(0, 4).map((item) => (
              <MobileProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
