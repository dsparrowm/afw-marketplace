import { fetchStorefrontProductPool } from "@/lib/catalog/storefront-data";
import {
  filterCatalogProducts,
  getCatalogDisplayTotal,
  queryCatalog,
  type CatalogQuery,
  type CatalogResult,
} from "@/lib/mocks/catalog-products";
import type { Product } from "@/types/product";

export type CatalogQueryResult = CatalogResult & {
  filteredProducts: Product[];
  dataSource: "api" | "mock";
};

export async function queryCatalogAsync(
  params: CatalogQuery,
): Promise<CatalogQueryResult> {
  const { products: pool, source } = await fetchStorefrontProductPool();
  const filteredProducts = filterCatalogProducts(params, pool);
  const result = queryCatalog(params, pool);

  return {
    ...result,
    filteredProducts,
    displayTotal: getCatalogDisplayTotal(params, filteredProducts.length),
    dataSource: source,
  };
}

export type { CatalogQuery, CatalogResult } from "@/lib/mocks/catalog-products";
