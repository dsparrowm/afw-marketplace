import type { Product } from "@/types/product";
import {
  CATALOG_PAGE_SIZE,
  type CatalogSort,
  catalogDisplayTotals,
  catalogPillCuratedIds,
  getCategoryLabel,
  normalizeCategorySlug,
} from "@/lib/storefront/catalog";
import { mockProducts } from "@/lib/mocks/products";

type CatalogProduct = Product & {
  filterCategories?: string[];
};

/** Expanded mock catalog — Figma shop grid until `GET /products` */
const catalogSeed: CatalogProduct[] = [
  mockProducts["honey-beans"],
  mockProducts["yellow-garri"],
  mockProducts["white-puna-yam"],
  mockProducts["red-palm-oil"],
  {
    id: "pounded-yam-flour",
    slug: "pounded-yam-flour",
    name: "Premium Pounded Yam Flour",
    sizeLabel: "5kg Bag",
    origin: "Nigeria",
    imageUrl: "/images/products/white-puna-yam.png",
    retailPrice: 28.99,
    bulkPrice: 26,
    bulkLabel: "Bulk (4+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "grains-flour",
    filterCategories: ["grains-flour", "tubers-roots"],
  },
  {
    id: "scotch-bonnet",
    slug: "scotch-bonnet",
    name: "Fresh Scotch Bonnet Peppers",
    sizeLabel: "500g Pack",
    origin: "Ghana",
    imageUrl: "/images/products/red-palm-oil.png",
    retailPrice: 9.99,
    bulkPrice: 8.5,
    bulkLabel: "Bulk (12+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "fresh-produce",
    filterCategories: ["fresh-produce"],
  },
  {
    id: "plantain-chips",
    slug: "plantain-chips",
    name: "Sweet Plantain Chips",
    sizeLabel: "400g",
    origin: "Nigeria",
    imageUrl: "/images/products/yellow-garri.png",
    retailPrice: 7.49,
    bulkPrice: 6.25,
    bulkLabel: "Bulk (20+)",
    badges: ["new-arrival"],
    stockStatus: "in-stock",
    category: "snacks-drinks",
    filterCategories: ["fresh-produce"],
  },
  {
    id: "frozen-tilapia",
    slug: "frozen-tilapia",
    name: "Frozen Whole Tilapia",
    sizeLabel: "1.2kg",
    origin: "Ghana",
    imageUrl: "/images/products/honey-beans.png",
    retailPrice: 19.99,
    bulkPrice: 17.5,
    bulkLabel: "Bulk (6+)",
    stockStatus: "in-stock",
    category: "frozen-proteins",
    filterCategories: ["meat-poultry"],
  },
  {
    id: "coconut-oil",
    slug: "coconut-oil",
    name: "Virgin Coconut Oil",
    sizeLabel: "500ml",
    origin: "Nigeria",
    imageUrl: "/images/products/red-palm-oil.png",
    retailPrice: 15.99,
    bulkPrice: 13.5,
    bulkLabel: "Bulk (8+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "condiments-spices",
    filterCategories: ["grains-flour"],
  },
  {
    id: "jollof-seasoning",
    slug: "jollof-seasoning",
    name: "Jollof Rice Seasoning Mix",
    sizeLabel: "250g",
    origin: "Nigeria",
    imageUrl: "/images/products/yellow-garri.png",
    retailPrice: 5.99,
    bulkPrice: 4.75,
    bulkLabel: "Bulk (24+)",
    badges: ["best-seller"],
    stockStatus: "in-stock",
    category: "condiments-spices",
  },
  {
    id: "shea-butter",
    slug: "shea-butter",
    name: "Raw Shea Butter",
    sizeLabel: "500g",
    origin: "Ghana",
    imageUrl: "/images/products/honey-beans.png",
    retailPrice: 12.99,
    bulkPrice: 10.5,
    bulkLabel: "Bulk (10+)",
    badges: ["organic"],
    stockStatus: "low-stock",
    stockLabel: "Low Stock (5 left)",
    category: "beauty",
  },
  {
    id: "brown-beans-2kg",
    slug: "brown-beans-2kg",
    name: "Brown Beans (Oloyin)",
    sizeLabel: "2kg",
    origin: "Nigeria",
    imageUrl: "/images/products/honey-beans.png",
    retailPrice: 24.99,
    bulkPrice: 21,
    bulkLabel: "Bulk (8+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "grains-flour",
    filterCategories: ["grains-flour"],
  },
  {
    id: "ground-egusi",
    slug: "ground-egusi",
    name: "Premium Ground Egusi",
    sizeLabel: "500g",
    origin: "Nigeria",
    imageUrl: "/images/products/yellow-garri.png",
    retailPrice: 11.99,
    bulkPrice: 9.5,
    bulkLabel: "Bulk (12+)",
    badges: ["organic"],
    stockStatus: "in-stock",
    category: "grains-flour",
    filterCategories: ["grains-flour"],
  },
  {
    id: "vanilla-chin-chin",
    slug: "vanilla-chin-chin",
    name: "Crunchy Vanilla Chin Chin",
    sizeLabel: "350g",
    origin: "Nigeria",
    imageUrl: "/images/products/honey-beans.png",
    retailPrice: 8.49,
    bulkPrice: 7,
    bulkLabel: "Bulk (15+)",
    badges: ["new-arrival"],
    stockStatus: "in-stock",
    category: "snacks-drinks",
    filterCategories: ["grains-flour"],
  },
];

/** Mock catalog pool for API fallback — used by `lib/catalog/storefront-data.ts` */
export function getMockCatalogPool(): Product[] {
  return [...catalogSeed];
}

export function getCatalogProductBySlug(slug: string): Product | undefined {
  return catalogSeed.find((product) => product.slug === slug);
}

function getFilterCategories(product: CatalogProduct): string[] {
  if (product.filterCategories) return product.filterCategories;

  const defaults: Record<string, string[]> = {
    "fresh-produce": ["fresh-produce", "tubers-roots"],
    "grains-flour": ["grains-flour"],
    beans: ["grains-flour"],
    "condiments-spices": ["grains-flour"],
    "frozen-proteins": ["meat-poultry"],
    "snacks-drinks": ["grains-flour"],
    beauty: ["grains-flour"],
  };

  return defaults[product.category] ?? [product.category];
}

export type CatalogQuery = {
  category?: string;
  q?: string;
  sort?: string;
  page?: string;
  filter?: string;
  categories?: string;
  minPrice?: string;
  maxPrice?: string;
  stock?: string;
  origin?: string;
};

export type CatalogResult = {
  products: Product[];
  total: number;
  displayTotal: number;
  page: number;
  pageSize: number;
  totalPages: number;
  activeCategory: string | null;
  activeCategoryLabel: string | null;
};

export function filterCatalogProducts(
  params: CatalogQuery,
  pool: Product[] = catalogSeed,
): Product[] {
  const category = normalizeCategorySlug(params.category);
  const q = params.q?.trim().toLowerCase() ?? "";
  const sort = (params.sort as CatalogSort) ?? "recommended";
  const filter = params.filter;
  const sidebarCategories = params.categories
    ? params.categories.split(",").filter(Boolean)
    : [];
  const minPrice = params.minPrice ? Number.parseFloat(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number.parseFloat(params.maxPrice) : null;
  const stockFilters = params.stock ? params.stock.split(",").filter(Boolean) : [];
  const originFilters = params.origin
    ? params.origin.split(",").map((value) => value.toLowerCase())
    : [];

  let items = [...pool] as CatalogProduct[];

  const curatedIds = category ? catalogPillCuratedIds[category] : undefined;

  if (category && curatedIds && sidebarCategories.length === 0) {
    const productMap = new Map(items.map((product) => [product.id, product]));
    items = curatedIds
      .map((id) => productMap.get(id))
      .filter((product): product is CatalogProduct => Boolean(product));
  } else if (category) {
    items = items.filter((product) => product.category === category);
  }

  if (filter === "new") {
    items = items.filter((product) => product.badges?.includes("new-arrival"));
  }

  if (filter === "deals") {
    items = items.filter((product) => product.badges?.includes("best-seller"));
  }

  if (sidebarCategories.length > 0) {
    items = items.filter((product) =>
      getFilterCategories(product).some((slug) => sidebarCategories.includes(slug)),
    );
  }

  if (q) {
    items = items.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q),
    );
  }

  if (minPrice !== null && !Number.isNaN(minPrice)) {
    items = items.filter((product) => product.retailPrice >= minPrice);
  }

  if (maxPrice !== null && !Number.isNaN(maxPrice)) {
    items = items.filter((product) => product.retailPrice <= maxPrice);
  }

  if (stockFilters.length > 0) {
    items = items.filter((product) => stockFilters.includes(product.stockStatus));
  }

  if (originFilters.length > 0) {
    items = items.filter((product) =>
      originFilters.includes(product.origin.toLowerCase()),
    );
  }

  switch (sort) {
    case "price-asc":
      items.sort((a, b) => a.retailPrice - b.retailPrice);
      break;
    case "price-desc":
      items.sort((a, b) => b.retailPrice - a.retailPrice);
      break;
    case "name":
      items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return items;
}

export function getCatalogDisplayTotal(
  params: CatalogQuery,
  filteredCount: number,
): number {
  const category = normalizeCategorySlug(params.category);
  const q = params.q?.trim() ?? "";
  const sidebarCategories = params.categories
    ? params.categories.split(",").filter(Boolean)
    : [];

  if (
    category &&
    catalogDisplayTotals[category] &&
    sidebarCategories.length === 0 &&
    !q
  ) {
    return catalogDisplayTotals[category]!;
  }

  return filteredCount;
}

export function queryCatalog(
  params: CatalogQuery,
  pool: Product[] = catalogSeed,
): CatalogResult {
  const category = normalizeCategorySlug(params.category);
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const items = filterCatalogProducts(params, pool);
  const itemCount = items.length;
  const displayTotal = getCatalogDisplayTotal(params, itemCount);

  const totalPages = Math.max(1, Math.ceil(itemCount / CATALOG_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * CATALOG_PAGE_SIZE;
  const products = items.slice(start, start + CATALOG_PAGE_SIZE);

  return {
    products,
    total: itemCount,
    displayTotal,
    page: safePage,
    pageSize: CATALOG_PAGE_SIZE,
    totalPages,
    activeCategory: category,
    activeCategoryLabel: category ? getCategoryLabel(category) : null,
  };
}
