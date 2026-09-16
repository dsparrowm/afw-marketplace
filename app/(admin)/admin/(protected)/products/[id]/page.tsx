import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/admin/products/ProductDetailPage";
import { loadAdminProductDetail } from "@/lib/admin/load-admin-product-detail";

export const metadata: Metadata = {
  title: "Product Details · Admin · AFW Marketplace",
};

export default async function AdminProductDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await loadAdminProductDetail(id);

  if (!result.ok) {
    if (result.error === "not-found") notFound();
    return (
      <div className="mx-auto max-w-[1180px] px-8 py-10">
        <h1 className="text-xl font-semibold text-foreground">
          Unable to load product
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  return <ProductDetailPage product={result.product} />;
}
