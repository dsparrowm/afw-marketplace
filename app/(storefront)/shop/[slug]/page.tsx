import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/storefront/ProductDetailPage";
import {
  getStorefrontProductDetail,
  getStorefrontRelatedProducts,
} from "@/lib/catalog/storefront-data";

type ProductDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailRoute({ params }: ProductDetailRouteProps) {
  const { slug } = await params;
  const product = await getStorefrontProductDetail(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getStorefrontRelatedProducts(slug);

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
