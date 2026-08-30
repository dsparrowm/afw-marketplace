import { categoryImages } from "@/lib/brand/assets";

export type HomepageCategory = {
  slug: string;
  label: string;
  image: string;
  /** Figma image node inside tile — for export manifest */
  figmaNodeId: string;
};

/** Homepage shop-by-category tiles — Figma section `2:41`, `shop-by-category.xml` */
export const homepageCategories: HomepageCategory[] = [
  {
    slug: "fresh-produce",
    label: "Fresh Produce",
    image: categoryImages.freshProduce,
    figmaNodeId: "2:55",
  },
  {
    slug: "frozen-proteins",
    label: "Frozen Proteins",
    image: categoryImages.frozenProteins,
    figmaNodeId: "2:60",
  },
  {
    slug: "grains-flour",
    label: "Grains & Flour",
    image: categoryImages.grainsFlour,
    figmaNodeId: "2:65",
  },
  {
    slug: "condiments-spices",
    label: "Condiments & Spices",
    image: categoryImages.condimentsSpices,
    figmaNodeId: "2:70",
  },
  {
    slug: "snacks-drinks",
    label: "Snacks & Drinks",
    image: categoryImages.snacksDrinks,
    figmaNodeId: "2:75",
  },
  {
    slug: "beauty",
    label: "Beauty",
    image: categoryImages.beauty,
    figmaNodeId: "2:80",
  },
];

/** Tile width + gap for carousel scroll — Figma tile 206.66px, gap 24px */
export const CATEGORY_TILE_SCROLL_STEP = 231;
