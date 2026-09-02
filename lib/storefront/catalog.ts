import { homepageCategories } from "@/lib/storefront/categories";

/** Shop catalog pills — Figma `2:273`–`2:286` */
export const catalogCategoryPills = [
  { slug: null, label: "All Products" },
  { slug: "fresh-produce", label: "Fresh Produce" },
  { slug: "frozen-proteins", label: "Frozen Proteins" },
  { slug: "grains-flour", label: "Grains & Flour" },
  { slug: "condiments-spices", label: "Spices & Oils" },
  { slug: "snacks-drinks", label: "Snacks & Drinks" },
  { slug: "beauty", label: "Beauty & Wellness" },
] as const;

/** Sidebar filter categories — Figma `2:295`–`2:311` */
export const catalogFilterCategories = [
  { slug: "fresh-produce", label: "Fresh Produce" },
  { slug: "tubers-roots", label: "Tubers & Roots" },
  { slug: "grains-flour", label: "Grains & Flour" },
  { slug: "meat-poultry", label: "Meat & Poultry" },
] as const;

export const catalogOrigins = [
  { slug: "nigeria", label: "Nigeria" },
  { slug: "ghana", label: "Ghana" },
] as const;

export const catalogSortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name" },
] as const;

export type CatalogSort = (typeof catalogSortOptions)[number]["value"];

export const CATALOG_PAGE_SIZE = 8;

/** Mobile catalog initial batch + load-more increment — Figma `3:2321` */
export const MOBILE_CATALOG_PAGE_SIZE = 6;

/** Mobile shop catalog pills — Figma `3:2201` horizontal scroll */
export const mobileCatalogCategoryPills = [
  { slug: null, label: "All Products" },
  { slug: "grains-flour", label: "Grains & Flour" },
  { slug: "fresh-produce", label: "Fresh Produce" },
  { slug: "condiments-spices", label: "Spices & Oil" },
  { slug: "snacks-drinks", label: "Snacks" },
] as const;

/** Figma curated rows per category pill — `shop-catalog` `2:380` grid */
export const catalogPillCuratedIds: Partial<Record<string, string[]>> = {
  "grains-flour": [
    "honey-beans",
    "yellow-garri",
    "white-puna-yam",
    "red-palm-oil",
    "ground-egusi",
    "vanilla-chin-chin",
    "frozen-tilapia",
    "pounded-yam-flour",
  ],
};

/** Figma toolbar copy until API totals — `2:362` */
export const catalogDisplayTotals: Partial<Record<string, number>> = {
  "grains-flour": 124,
};

/** Header/footer category links use alternate slugs — normalize for filtering */
export function normalizeCategorySlug(slug: string | undefined | null): string | null {
  if (!slug) return null;

  const aliases: Record<string, string> = {
    "grains-flours": "grains-flour",
    "spices-seasonings": "condiments-spices",
    "oils-sauces": "condiments-spices",
    snacks: "snacks-drinks",
    beverages: "snacks-drinks",
  };

  return aliases[slug] ?? slug;
}

export function getCategoryLabel(slug: string | null): string | null {
  if (!slug) return null;

  const fromPill = catalogCategoryPills.find((item) => item.slug === slug);
  if (fromPill) return fromPill.label;

  const fromHome = homepageCategories.find((item) => item.slug === slug);
  if (fromHome) return fromHome.label;

  const extra: Record<string, string> = {
    beans: "Grains & Flour",
  };

  return extra[slug] ?? slug;
}

export function buildShopHref(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }

  const query = search.toString();
  return query ? `/shop?${query}` : "/shop";
}
