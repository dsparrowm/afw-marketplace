import type { ApiProduct, ApiProductVariant } from "@/types/api";
import type {
  ProductFormTier,
  ProductFormValues,
} from "@/lib/mocks/admin-product-form";
import { adminProductFormDefaults } from "@/lib/mocks/admin-product-form";

export type AdminFormCategoryOption = {
  id: string;
  name: string;
};

export function slugifyProductName(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "product";
}

export function parseMoneyInput(value: string): number {
  const parsed = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseTierMinQuantity(label: string): number {
  const match = label.match(/(\d+)/);
  if (!match) return 1;
  return Number.parseInt(match[1]!, 10) || 1;
}

export function emptyProductFormValues(
  categoryName: string,
): ProductFormValues {
  return {
    ...adminProductFormDefaults,
    name: "",
    description: "",
    sku: "",
    autoSku: true,
    retailPrice: "",
    wholesaleBase: "",
    tiers: [],
    category: categoryName,
    stockQty: "0",
    lowStockAlert: "10",
    sizeWeight: "",
    weightKg: "",
    dimL: "",
    dimW: "",
    dimH: "",
    previewImage: null,
  };
}

function pickVariant(
  variants: ApiProductVariant[] | undefined,
): ApiProductVariant | undefined {
  if (!variants?.length) return undefined;
  return variants.find((variant) => variant.status === "active") ?? variants[0];
}

export function mapApiProductToFormValues(
  product: ApiProduct,
  categoryName: string,
): {
  values: ProductFormValues;
  variantId: string | null;
  initialStock: number;
} {
  const variant = pickVariant(product.variants);
  const tiers: ProductFormTier[] = (variant?.priceTiers ?? []).map(
    (tier, index) => ({
      id: tier.id || `tier-${index}`,
      quantityLabel: tier.label?.trim() || `${tier.minQuantity}+ units`,
      price: String(tier.price ?? tier.unitPrice ?? "0"),
    }),
  );

  const wholesaleBase =
    tiers[0]?.price ||
    (variant ? String(variant.unitRetailPrice) : "0");

  return {
    variantId: variant?.id ?? null,
    initialStock: variant?.stockQuantity ?? 0,
    values: {
      name: product.name,
      description: product.description ?? "",
      sku: variant?.sku ?? "",
      autoSku: false,
      commercialModel: product.isWholesaleEligible ? "both" : "retail",
      retailPrice: variant ? String(variant.unitRetailPrice) : "",
      wholesaleBase,
      tiers,
      category: categoryName,
      origin: product.countryOfOrigin ?? "Nigeria",
      organic: Boolean(product.isOrganic),
      unitType: "unit",
      sizeWeight: variant?.label ?? "",
      stockQty: String(variant?.stockQuantity ?? 0),
      lowStockAlert: String(
        variant?.lowStockThreshold ?? product.lowStockThreshold ?? 10,
      ),
      warehouseLocation: "Warehouse A — Aisle 3",
      weightKg: variant?.weight != null ? String(variant.weight) : "",
      dimL: "",
      dimW: "",
      dimH: "",
      shippingClass: "Standard Shipping",
      previewImage: product.images?.[0] ?? null,
    },
  };
}
