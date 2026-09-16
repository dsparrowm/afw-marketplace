import { getCategoryTree } from "@/lib/api/categories";
import { getProductById, listProducts } from "@/lib/api/products";
import {
  buildCategoryNameMap,
  mapApiProductToAdminRow,
} from "@/lib/admin/map-admin-product";
import type { AdminProductRow } from "@/lib/mocks/admin-products";

export type AdminProductsLoadResult = {
  rows: AdminProductRow[];
  error: string | null;
};

/** Loads catalog rows for the admin products table via interactive staff session. */
export async function loadAdminProductRows(): Promise<AdminProductsLoadResult> {
  try {
    const [tree, firstPage] = await Promise.all([
      getCategoryTree({ auth: "session" }),
      listProducts({ page: 1, limit: 50 }, { auth: "session" }),
    ]);

    const categoryNameById = buildCategoryNameMap(tree);
    const products = [...firstPage.data];
    const totalPages = firstPage.meta.totalPages || 1;

    for (let page = 2; page <= totalPages; page += 1) {
      const next = await listProducts({ page, limit: 50 }, { auth: "session" });
      products.push(...next.data);
    }

    const detailed = await Promise.all(
      products.map(async (product) => {
        if (product.variants?.length) return product;
        try {
          return await getProductById(product.id, { auth: "session" });
        } catch {
          return product;
        }
      }),
    );

    const rows = detailed.map((product) =>
      mapApiProductToAdminRow(product, categoryNameById),
    );

    rows.sort((a, b) => a.name.localeCompare(b.name));

    return { rows, error: null };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load products.";
    return { rows: [], error: message };
  }
}
