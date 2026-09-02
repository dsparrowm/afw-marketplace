import type { ApiProduct, ApiProductVariant } from "@/types/api";
import type { Product } from "@/types/product";
import type { ProductDetail, ProductSizeOption } from "@/types/product-detail";

function parseMoney(value: string | number | null | undefined): number {
  if (value == null) return 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveImageUrl(images: string[] | undefined): string {
  const first = images?.[0]?.trim();
  if (!first) return "/images/products/red-palm-oil.png";
  if (first.startsWith("http") || first.startsWith("/")) return first;
  return `/${first}`;
}

function pickDefaultVariant(variants: ApiProductVariant[] | undefined): ApiProductVariant | undefined {
  if (!variants?.length) return undefined;
  return variants.find((variant) => variant.status === "active") ?? variants[0];
}

function variantBulkPrice(variant: ApiProductVariant, retailPrice: number): number {
  const tier = variant.priceTiers?.[0];
  if (tier) return parseMoney(tier.unitPrice);
  return Math.round(retailPrice * 0.85 * 100) / 100;
}

function stockStatus(
  variant: ApiProductVariant | undefined,
  productThreshold: number | null,
): Product["stockStatus"] {
  if (!variant) return "in-stock";
  const threshold = variant.lowStockThreshold ?? productThreshold ?? 5;
  if (variant.stockQuantity <= 0) return "low-stock";
  if (variant.stockQuantity <= threshold) return "low-stock";
  return "in-stock";
}

export function mapApiVariantToSizeOption(variant: ApiProductVariant): ProductSizeOption {
  const retailPrice = parseMoney(variant.unitRetailPrice);
  const bulkPrice = variantBulkPrice(variant, retailPrice);
  const minQty = variant.priceTiers?.[0]?.minQuantity;

  return {
    id: variant.id,
    label: variant.label,
    retailPrice,
    bulkPrice,
    bulkLabel: minQty ? `Bulk (${minQty}+)` : "Bulk pricing",
  };
}

export function mapApiProductToStorefront(
  api: ApiProduct,
  categorySlugById: Map<string, string>,
): Product {
  const defaultVariant = pickDefaultVariant(api.variants);
  const retailPrice = defaultVariant
    ? parseMoney(defaultVariant.unitRetailPrice)
    : 0;
  const bulkPrice = defaultVariant
    ? variantBulkPrice(defaultVariant, retailPrice)
    : retailPrice;

  const category =
    categorySlugById.get(api.categoryId) ??
    api.categoryId ??
    "uncategorized";

  const status = stockStatus(defaultVariant, api.lowStockThreshold);

  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    sizeLabel: defaultVariant?.label ?? "Standard",
    origin: api.countryOfOrigin ?? "Africa",
    imageUrl: resolveImageUrl(api.images),
    retailPrice,
    bulkPrice,
    bulkLabel: defaultVariant?.priceTiers?.[0]?.minQuantity
      ? `Bulk (${defaultVariant.priceTiers[0].minQuantity}+)`
      : "Bulk pricing",
    stockStatus: status,
    stockLabel: status === "low-stock" ? "Low stock" : undefined,
    category,
  };
}

export function mapApiProductToDetail(
  api: ApiProduct,
  categorySlugById: Map<string, string>,
): ProductDetail {
  const base = mapApiProductToStorefront(api, categorySlugById);
  const sizeOptions =
    api.variants && api.variants.length > 0
      ? api.variants.map(mapApiVariantToSizeOption)
      : [
          {
            id: "default",
            label: base.sizeLabel,
            retailPrice: base.retailPrice,
            bulkPrice: base.bulkPrice,
            bulkLabel: base.bulkLabel,
          },
        ];

  const primary = sizeOptions[0];

  return {
    ...base,
    retailPrice: primary.retailPrice,
    bulkPrice: primary.bulkPrice,
    bulkLabel: primary.bulkLabel,
    description:
      api.description?.trim() ||
      `${api.name} from ${base.origin} — authentic African pantry staple.`,
    images:
      api.images?.length > 0
        ? api.images.map((image) =>
            image.startsWith("http") || image.startsWith("/")
              ? image
              : `/${image}`,
          )
        : [base.imageUrl],
    reviewCount: 0,
    rating: 5,
    sizeOptions,
    accordion: {
      productDescription:
        api.description?.trim() ||
        `${api.name} is sourced from trusted producers in ${base.origin}.`,
      ingredientsOrigin: `Origin: ${base.origin}. Brand: ${api.brand ?? "African Food Warehouse"}.`,
      nutrition:
        "Nutrition information will be published per SKU when supplier data is connected.",
      shipping:
        "Orders ship from our Canadian fulfillment network. Free shipping applies on orders over $150.",
    },
    deliveryEstimate: "Estimated delivery: 3–5 business days to Canada",
    relatedProductIds: [],
  };
}

export function buildCategorySlugMap(
  categories: { id: string; slug: string; children?: { id: string; slug: string; children?: unknown[] }[] }[],
): Map<string, string> {
  const map = new Map<string, string>();

  function walk(nodes: typeof categories) {
    for (const node of nodes) {
      map.set(node.id, node.slug);
      if (node.children?.length) {
        walk(node.children as typeof categories);
      }
    }
  }

  walk(categories);
  return map;
}
