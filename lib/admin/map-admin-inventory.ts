import type { ApiProduct, ApiProductVariant } from "@/types/api";
import type {
  AdminInventoryRow,
  AdminInventoryStatus,
  AdminInventoryTabMeta,
} from "@/lib/mocks/admin-inventory";

function pickVariant(
  variants: ApiProductVariant[] | undefined,
): ApiProductVariant | undefined {
  if (!variants?.length) return undefined;
  return variants.find((variant) => variant.status === "active") ?? variants[0];
}

function resolveStatus(
  stock: number,
  threshold: number,
): AdminInventoryStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock <= threshold) return "low-stock";
  return "in-stock";
}

function formatRelativeUpdated(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function mapApiProductToInventoryRow(
  product: ApiProduct,
): AdminInventoryRow {
  const variant = pickVariant(product.variants);
  const stock = variant?.stockQuantity ?? 0;
  const reorderLevel =
    variant?.lowStockThreshold ?? product.lowStockThreshold ?? 5;

  return {
    id: product.id,
    name: product.name,
    sku: variant?.sku ?? "—",
    currentStock: stock,
    reorderLevel,
    status: resolveStatus(stock, reorderLevel),
    lastUpdated: formatRelativeUpdated(product.updatedAt),
  };
}

export function buildInventoryTabs(
  rows: AdminInventoryRow[],
): AdminInventoryTabMeta[] {
  return [
    { id: "all", label: "All Products", count: rows.length },
    {
      id: "in-stock",
      label: "In Stock",
      count: rows.filter((row) => row.status === "in-stock").length,
    },
    {
      id: "low-stock",
      label: "Low Stock",
      count: rows.filter((row) => row.status === "low-stock").length,
    },
    {
      id: "out-of-stock",
      label: "Out of Stock",
      count: rows.filter((row) => row.status === "out-of-stock").length,
    },
  ];
}
