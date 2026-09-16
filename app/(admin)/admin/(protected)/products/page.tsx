import type { Metadata } from "next";
import { ProductsPage } from "@/components/admin/products/ProductsPage";
import { loadAdminProductRows } from "@/lib/admin/load-admin-products";

export const metadata: Metadata = {
  title: "Products · Admin · AFW Marketplace",
};

export default async function AdminProductsRoute() {
  const { rows, error } = await loadAdminProductRows();
  return <ProductsPage initialRows={rows} loadError={error} />;
}
