import type {
  ApiPriceTier,
  ApiProduct,
  ApiProductVariant,
} from "@/types/api";
import type {
  AdminProductDetail,
  AdminProductDetailStatus,
  AdminProductStockStatus,
} from "@/lib/mocks/admin-product-detail";
import { productImages } from "@/lib/brand/assets";

function parseMoney(value: string | number | null | undefined): number {
  if (value == null) return 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function tierUnitPrice(tier: ApiPriceTier): number {
  return parseMoney(tier.price ?? tier.unitPrice);
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function pickVariant(
  variants: ApiProductVariant[] | undefined,
): ApiProductVariant | undefined {
  if (!variants?.length) return undefined;
  return variants.find((variant) => variant.status === "active") ?? variants[0];
}

function resolveImagePath(src: string | undefined): string | null {
  const value = src?.trim();
  if (!value) return null;
  if (value.startsWith("http") || value.startsWith("/")) return value;
  return `/${value}`;
}

function formatUpdatedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return `Last Updated: ${iso}`;
  return `Last Updated: ${date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

function mapPublishStatus(product: ApiProduct): {
  status: AdminProductDetailStatus;
  statusLabel: string;
} {
  if (product.status === "hidden") {
    return { status: "hidden", statusLabel: "Hidden" };
  }
  if (product.status === "active") {
    return { status: "published", statusLabel: "Published" };
  }
  return { status: "draft", statusLabel: "Draft" };
}

function mapStock(
  product: ApiProduct,
  variant: ApiProductVariant | undefined,
): {
  stockUnits: number;
  stockLabel: string;
  stockStatus: AdminProductStockStatus;
  stockBadgeLabel: string;
} {
  const stockUnits = variant?.stockQuantity ?? 0;
  const threshold =
    variant?.lowStockThreshold ?? product.lowStockThreshold ?? 5;

  if (stockUnits <= 0) {
    return {
      stockUnits,
      stockLabel: "Out of stock",
      stockStatus: "out-of-stock",
      stockBadgeLabel: "Out of Stock",
    };
  }
  if (stockUnits <= threshold) {
    return {
      stockUnits,
      stockLabel: "Low stock — reorder soon",
      stockStatus: "low-stock",
      stockBadgeLabel: "Low Stock",
    };
  }
  return {
    stockUnits,
    stockLabel: "In Stock / Safe",
    stockStatus: "in-stock",
    stockBadgeLabel: "In Stock",
  };
}

function mapTiers(
  variant: ApiProductVariant | undefined,
  tiers: ApiPriceTier[],
): { label: string; price: string }[] {
  if (!tiers.length) return [];

  return tiers
    .slice()
    .sort((a, b) => a.minQuantity - b.minQuantity)
    .map((tier, index) => {
      const price = formatPrice(tierUnitPrice(tier));
      const base =
        index === 0
          ? `${tier.minQuantity}+ units (Base Wholesale)`
          : `${tier.minQuantity}+ units`;
      return { label: tier.label?.trim() || base, price };
    });
}

export function mapApiProductToAdminDetail(
  product: ApiProduct,
  categoryName: string,
  priceTiers: ApiPriceTier[] = [],
): AdminProductDetail {
  const variant = pickVariant(product.variants);
  const retail = variant ? parseMoney(variant.unitRetailPrice) : 0;
  const tierSource = priceTiers.length
    ? priceTiers
    : (variant?.priceTiers ?? []);
  const tiers = mapTiers(variant, tierSource);
  const firstTier = tierSource
    .slice()
    .sort((a, b) => a.minQuantity - b.minQuantity)[0];
  const wholesalePrice = firstTier
    ? formatPrice(tierUnitPrice(firstTier))
    : formatPrice(retail);

  const images = (product.images ?? [])
    .map((image) => resolveImagePath(image))
    .filter((image): image is string => Boolean(image));

  const hero = images[0] ?? productImages.redPalmOil;
  const thumbs = images.slice(1, 4);
  while (thumbs.length < 3 && images.length > 0) {
    thumbs.push(images[thumbs.length % images.length] ?? hero);
  }
  if (thumbs.length === 0) {
    thumbs.push(
      productImages.yellowGarri,
      productImages.honeyBeans,
      productImages.whitePunaYam,
    );
  }

  const publish = mapPublishStatus(product);
  const stock = mapStock(product, variant);

  return {
    id: product.id,
    name: product.name,
    sku: variant?.sku ?? "—",
    status: publish.status,
    statusLabel: publish.statusLabel,
    lastUpdated: formatUpdatedAt(product.updatedAt),
    breadcrumb: [
      { label: "Products", href: "/admin/products" },
      { label: categoryName, href: "/admin/products" },
      { label: product.name },
    ],
    organic: Boolean(product.isOrganic),
    category: categoryName,
    origin: product.countryOfOrigin?.trim() || "Unknown",
    warehouseLocation: "Not set",
    description:
      product.description?.trim() ||
      `${product.name} — catalog details from staging.`,
    retailPrice: `${formatPrice(retail)} / unit`,
    wholesaleBase: firstTier
      ? `${wholesalePrice} (Min. ${firstTier.minQuantity} units)`
      : wholesalePrice,
    tiers,
    stockUnits: stock.stockUnits,
    stockLabel: stock.stockLabel,
    stockStatus: stock.stockStatus,
    stockBadgeLabel: stock.stockBadgeLabel,
    weight: variant?.weight != null ? `${variant.weight} kg` : "—",
    dimensions: "—",
    shippingClass: "—",
    images: {
      hero,
      thumbs: thumbs.slice(0, 3),
    },
  };
}

