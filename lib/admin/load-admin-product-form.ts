import { getCategoryTree } from "@/lib/api/categories";
import { getProductById } from "@/lib/api/products";
import { buildCategoryNameMap } from "@/lib/admin/map-admin-product";
import {
  emptyProductFormValues,
  mapApiProductToFormValues,
  type AdminFormCategoryOption,
} from "@/lib/admin/product-form-mappers";
import type { ProductFormValues } from "@/lib/mocks/admin-product-form";

function flattenCategories(
  nodes: {
    id: string;
    name: string;
    children?: { id: string; name: string; children?: unknown[] }[];
  }[],
): AdminFormCategoryOption[] {
  const rows: AdminFormCategoryOption[] = [];
  for (const node of nodes) {
    rows.push({ id: node.id, name: node.name });
    if (node.children?.length) {
      rows.push(
        ...flattenCategories(
          node.children as {
            id: string;
            name: string;
            children?: { id: string; name: string; children?: unknown[] }[];
          }[],
        ),
      );
    }
  }
  return rows;
}

export type AdminProductFormLoadResult = {
  values: ProductFormValues;
  categories: AdminFormCategoryOption[];
  productId: string | null;
  variantId: string | null;
  initialStock: number;
  error: string | null;
};

export async function loadAdminProductForm(
  productId?: string,
): Promise<AdminProductFormLoadResult> {
  try {
    const tree = await getCategoryTree({ auth: "session" });
    const categories = flattenCategories(tree).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const fallbackCategory = categories[0]?.name ?? "Uncategorized";

    if (!productId) {
      return {
        values: emptyProductFormValues(fallbackCategory),
        categories,
        productId: null,
        variantId: null,
        initialStock: 0,
        error: null,
      };
    }

    const product = await getProductById(productId, { auth: "session" });
    const categoryName =
      buildCategoryNameMap(tree).get(product.categoryId) ?? fallbackCategory;
    const mapped = mapApiProductToFormValues(product, categoryName);

    return {
      values: mapped.values,
      categories,
      productId,
      variantId: mapped.variantId,
      initialStock: mapped.initialStock,
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load product form.";
    return {
      values: emptyProductFormValues("Uncategorized"),
      categories: [],
      productId: productId ?? null,
      variantId: null,
      initialStock: 0,
      error: message,
    };
  }
}
