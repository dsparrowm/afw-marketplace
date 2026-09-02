import { CatalogPage } from "@/components/storefront/CatalogPage";
import {
  queryCatalogAsync,
  type CatalogQuery,
} from "@/lib/catalog/query-catalog";

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function normalizeQuery(
  raw: Record<string, string | string[] | undefined>,
): CatalogQuery {
  const first = (key: string) => {
    const value = raw[key];
    return typeof value === "string" ? value : undefined;
  };

  return {
    category: first("category"),
    q: first("q"),
    sort: first("sort"),
    page: first("page"),
    filter: first("filter"),
    categories: first("categories"),
    minPrice: first("minPrice"),
    maxPrice: first("maxPrice"),
    stock: first("stock"),
    origin: first("origin"),
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const raw = await searchParams;
  const query = normalizeQuery(raw);
  const result = await queryCatalogAsync(query);

  return <CatalogPage query={query} result={result} />;
}
