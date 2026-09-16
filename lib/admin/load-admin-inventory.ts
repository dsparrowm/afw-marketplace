import { getProductById, listProducts } from "@/lib/api/products";
import {
  buildInventoryTabs,
  mapApiProductToInventoryRow,
} from "@/lib/admin/map-admin-inventory";
import type {
  AdminInventoryRow,
  AdminInventoryTabMeta,
} from "@/lib/mocks/admin-inventory";

export type AdminInventoryLoadResult = {
  rows: AdminInventoryRow[];
  tabs: AdminInventoryTabMeta[];
  error: string | null;
};

/** Loads inventory rows from live products via interactive staff session. */
export async function loadAdminInventory(): Promise<AdminInventoryLoadResult> {
  try {
    const firstPage = await listProducts(
      { page: 1, limit: 50 },
      { auth: "session" },
    );
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

    const rows = detailed
      .map(mapApiProductToInventoryRow)
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      rows,
      tabs: buildInventoryTabs(rows),
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load inventory.";
    return {
      rows: [],
      tabs: buildInventoryTabs([]),
      error: message,
    };
  }
}
