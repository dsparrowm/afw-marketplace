import type {
  ApiPublicProductDetail,
  ApiPublicProductSummary,
  ApiPublicProductVariant,
} from "@/types/api";
import type { Product, ProductBadgeKind, StockStatus } from "@/types/product";
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

function mapStockStatus(value: string | undefined): StockStatus {
  const normalized = (value ?? "").toLowerCase().replace(/_/g, "-");
  if (normalized === "low-stock" || normalized === "out-of-stock") {
    return "low-stock";
  }
  return "in-stock";
}

function badgesFromFlags(
  product: Pick<
    ApiPublicProductSummary,
    "isOrganic" | "isFeatured" | "isNewArrival"
  >,
): ProductBadgeKind[] | undefined {
  const badges: ProductBadgeKind[] = [];
  if (product.isOrganic) badges.push("organic");
  if (product.isFeatured) badges.push("best-seller");
  if (product.isNewArrival) badges.push("new-arrival");
  return badges.length > 0 ? badges : undefined;
}

export function mapPublicProductSummaryToStorefront(
  api: ApiPublicProductSummary,
): Product {
  const retailPrice = parseMoney(api.price);
  const bulkHint = api.bulkPricingHint;
  const bulkPrice = bulkHint
    ? parseMoney(bulkHint.price)
    : Math.round(retailPrice * 0.85 * 100) / 100;
  const status = mapStockStatus(api.stockStatus);

  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    sizeLabel: "Standard",
    origin: api.countryOfOrigin ?? "Africa",
    imageUrl: resolveImageUrl(api.images),
    retailPrice,
    bulkPrice,
    bulkLabel: bulkHint
      ? `Bulk (${bulkHint.minQuantity}+)`
      : "Bulk pricing",
    badges: badgesFromFlags(api),
    stockStatus: status,
    stockLabel: status === "low-stock" ? "Low stock" : undefined,
    category: api.category?.slug ?? "uncategorized",
  };
}

function mapPublicVariantToSizeOption(
  variant: ApiPublicProductVariant,
): ProductSizeOption {
  const retailPrice = parseMoney(variant.unitRetailPrice);
  const tier = variant.priceTiers?.[0];
  const bulkPrice = tier
    ? parseMoney(tier.price)
    : Math.round(retailPrice * 0.85 * 100) / 100;

  return {
    id: variant.id,
    label: variant.label,
    retailPrice,
    bulkPrice,
    bulkLabel: tier?.minQuantity
      ? `Bulk (${tier.minQuantity}+)`
      : "Bulk pricing",
  };
}

export function mapPublicProductDetailToStorefront(
  api: ApiPublicProductDetail,
): ProductDetail {
  const sizeOptions =
    api.variants?.length > 0
      ? api.variants.map(mapPublicVariantToSizeOption)
      : [
          {
            id: "default",
            label: "Standard",
            retailPrice: 0,
            bulkPrice: 0,
            bulkLabel: "Bulk pricing",
          },
        ];

  const primary = sizeOptions[0];
  const origin = api.countryOfOrigin ?? "Africa";
  const imageUrl = resolveImageUrl(api.images);
  const status = mapStockStatus(api.variants?.[0]?.stockStatus);

  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    sizeLabel: primary.label,
    origin,
    imageUrl,
    retailPrice: primary.retailPrice,
    bulkPrice: primary.bulkPrice,
    bulkLabel: primary.bulkLabel,
    badges: badgesFromFlags(api),
    stockStatus: status,
    stockLabel: status === "low-stock" ? "Low stock" : undefined,
    category: api.category?.slug ?? "uncategorized",
    description:
      api.description?.trim() ||
      `${api.name} from ${origin} — authentic African pantry staple.`,
    images:
      api.images?.length > 0
        ? api.images.map((image) =>
            image.startsWith("http") || image.startsWith("/")
              ? image
              : `/${image}`,
          )
        : [imageUrl],
    reviewCount: 0,
    rating: 5,
    sizeOptions,
    accordion: {
      productDescription:
        api.description?.trim() ||
        `${api.name} is sourced from trusted producers in ${origin}.`,
      ingredientsOrigin: `Origin: ${origin}. Brand: ${api.brand ?? "African Food Warehouse"}.`,
      nutrition:
        "Nutrition information will be published per SKU when supplier data is connected.",
      shipping:
        "Orders ship from our Canadian fulfillment network. Free shipping applies on orders over $150.",
    },
    deliveryEstimate: "Estimated delivery: 3–5 business days to Canada",
    relatedProductIds: [],
  };
}
