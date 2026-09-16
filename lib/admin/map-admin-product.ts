import type { ApiProduct, ApiProductVariant } from "@/types/api";
import type {
  AdminProductRow,
  AdminProductStatus,
} from "@/lib/mocks/admin-products";

function parseMoney(value: string | number | null | undefined): number {
  if (value == null) return 0;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
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

function resolveImage(images: string[] | undefined): string | null {
  const first = images?.[0]?.trim();
  if (!first) return null;
  if (first.startsWith("http") || first.startsWith("/")) return first;
  return `/${first}`;
}

function resolveStatus(
  product: ApiProduct,
  variant: ApiProductVariant | undefined,
): AdminProductStatus {
  if (product.status === "hidden") return "draft-out-of-stock";
  const stock = variant?.stockQuantity ?? 0;
  if (stock <= 0) return "draft-out-of-stock";
  const threshold =
    variant?.lowStockThreshold ?? product.lowStockThreshold ?? 5;
  if (stock <= threshold) return "low-stock";
  return "active";
}

export function mapApiProductToAdminRow(
  product: ApiProduct,
  categoryNameById: Map<string, string>,
): AdminProductRow {
  const variant = pickVariant(product.variants);
  const price = variant ? parseMoney(variant.unitRetailPrice) : 0;

  return {
    id: product.id,
    name: product.name,
    category: categoryNameById.get(product.categoryId) ?? "Uncategorized",
    price: formatPrice(price),
    stock: variant?.stockQuantity ?? 0,
    status: resolveStatus(product, variant),
    origin: product.countryOfOrigin?.trim() || "Unknown",
    imageSrc: resolveImage(product.images),
  };
}

export function buildCategoryNameMap(
  categories: {
    id: string;
    name: string;
    children?: { id: string; name: string; children?: unknown[] }[];
  }[],
): Map<string, string> {
  const map = new Map<string, string>();

  function walk(
    nodes: {
      id: string;
      name: string;
      children?: { id: string; name: string; children?: unknown[] }[];
    }[],
  ) {
    for (const node of nodes) {
      map.set(node.id, node.name);
      if (node.children?.length) {
        walk(node.children as typeof nodes);
      }
    }
  }

  walk(categories);
  return map;
}
