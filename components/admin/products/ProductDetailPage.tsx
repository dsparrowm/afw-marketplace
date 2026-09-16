import { ProductDetailHeader } from "@/components/admin/products/ProductDetailHeader";
import { ProductDetailGallery } from "@/components/admin/products/ProductDetailGallery";
import { ProductDetailInfo } from "@/components/admin/products/ProductDetailInfo";
import { ProductPricingTiers } from "@/components/admin/products/ProductPricingTiers";
import { ProductInventoryLogistics } from "@/components/admin/products/ProductInventoryLogistics";
import { ProductDetailActions } from "@/components/admin/products/ProductDetailActions";
import type { AdminProductDetail } from "@/lib/mocks/admin-product-detail";

export type ProductDetailPageProps = {
  product: AdminProductDetail;
};

/** Admin product detail — Figma `79:7` / main `79:39` */
export function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <div className="mx-auto max-w-[1180px] px-8 py-6 pb-12">
      <ProductDetailHeader product={product} />

      <div className="mt-8 flex flex-col gap-6 xl:flex-row">
        <ProductDetailGallery product={product} />
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <ProductDetailInfo product={product} />
          <ProductPricingTiers product={product} />
          <ProductInventoryLogistics product={product} />
          <ProductDetailActions product={product} />
        </div>
      </div>
    </div>
  );
}
