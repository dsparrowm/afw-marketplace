import type { ProductDetail } from "@/types/product-detail";
import type { Product } from "@/types/product";
import { MobileProductDetailPage } from "@/components/storefront/mobile/MobileProductDetailPage";
import { ProductDetailAccordions } from "@/components/storefront/product-detail/ProductDetailAccordions";
import { ProductDetailBreadcrumb } from "@/components/storefront/product-detail/ProductDetailBreadcrumb";
import { ProductImageGallery } from "@/components/storefront/product-detail/ProductImageGallery";
import { ProductInfo } from "@/components/storefront/product-detail/ProductInfo";
import { RelatedProductsSection } from "@/components/storefront/product-detail/RelatedProductsSection";

export type ProductDetailPageProps = {
  product: ProductDetail;
  relatedProducts: Product[];
};

/** Product detail main content — Figma `2:873` */
export function ProductDetailPage({
  product,
  relatedProducts,
}: ProductDetailPageProps) {
  const title = product.displayName ?? product.name;

  return (
    <>
      <MobileProductDetailPage product={product} relatedProducts={relatedProducts} />

      <div className="mx-auto hidden max-w-[1440px] px-4 py-8 sm:px-10 sm:py-10 lg:block">
        <ProductDetailBreadcrumb product={product} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductImageGallery images={product.images} name={title} />
          <div>
            <ProductInfo product={product} />
            <ProductDetailAccordions product={product} />
          </div>
        </div>

        <RelatedProductsSection products={relatedProducts} category={product.category} />
      </div>
    </>
  );
}
