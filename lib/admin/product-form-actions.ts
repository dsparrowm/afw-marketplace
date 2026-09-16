"use server";

import { redirect } from "next/navigation";
import { saveAdminProduct } from "@/lib/admin/save-admin-product";
import type { ProductFormValues } from "@/lib/mocks/admin-product-form";

export type SaveProductActionState = {
  error?: string;
};

export async function saveProductFormAction(
  _prev: SaveProductActionState,
  formData: FormData,
): Promise<SaveProductActionState> {
  const rawValues = formData.get("values");
  if (typeof rawValues !== "string") {
    return { error: "Missing form payload." };
  }

  let values: ProductFormValues;
  try {
    values = JSON.parse(rawValues) as ProductFormValues;
  } catch {
    return { error: "Invalid form payload." };
  }

  const mode = formData.get("mode") === "edit" ? "edit" : "add";
  const draft = formData.get("draft") === "true";
  const categoryId = String(formData.get("categoryId") ?? "");
  const productId = String(formData.get("productId") ?? "") || null;
  const variantId = String(formData.get("variantId") ?? "") || null;
  const initialStock = Number.parseInt(
    String(formData.get("initialStock") ?? "0"),
    10,
  );

  const result = await saveAdminProduct({
    mode,
    draft,
    values,
    categoryId,
    productId,
    variantId,
    initialStock: Number.isFinite(initialStock) ? initialStock : 0,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  redirect(`/admin/products/${result.productId}`);
}
