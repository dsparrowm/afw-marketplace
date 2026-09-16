import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { loadAdminProductForm } from "@/lib/admin/load-admin-product-form";

export const metadata: Metadata = {
  title: "Edit Product · Admin · AFW Marketplace",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminProductEditRoute({ params }: PageProps) {
  const { id } = await params;
  const data = await loadAdminProductForm(id);

  return (
    <ProductForm
      mode="edit"
      initialValues={data.values}
      categories={data.categories}
      productId={data.productId}
      variantId={data.variantId}
      initialStock={data.initialStock}
      loadError={data.error}
    />
  );
}
