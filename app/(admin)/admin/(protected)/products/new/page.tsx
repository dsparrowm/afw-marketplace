import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { loadAdminProductForm } from "@/lib/admin/load-admin-product-form";

export const metadata: Metadata = {
  title: "Add Product · Admin · AFW Marketplace",
};

export default async function AdminNewProductRoute() {
  const data = await loadAdminProductForm();

  return (
    <ProductForm
      mode="add"
      initialValues={data.values}
      categories={data.categories}
      productId={data.productId}
      variantId={data.variantId}
      initialStock={data.initialStock}
      loadError={data.error}
    />
  );
}
