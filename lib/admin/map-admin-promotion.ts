import type { ApiPromotion } from "@/types/api";
import type {
  AdminPromotionMetric,
  AdminPromotionRow,
  AdminPromotionStatus,
} from "@/lib/mocks/admin-promotions";

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function parseAmount(value: string | number | undefined): number {
  const amount =
    typeof value === "number" ? value : Number.parseFloat(String(value ?? "0"));
  return Number.isFinite(amount) ? amount : 0;
}

export function derivePromotionStatus(
  promotion: ApiPromotion,
  now = new Date(),
): AdminPromotionStatus {
  const starts = new Date(promotion.startsAt);
  const ends = new Date(promotion.endsAt);
  if (!Number.isNaN(starts.getTime()) && now < starts) return "scheduled";
  if (!Number.isNaN(ends.getTime()) && now > ends) return "expired";
  return "active";
}

function formatDiscountType(type: string): string {
  switch (type) {
    case "percentage":
      return "Discount Code";
    case "fixed":
      return "Fixed Amount";
    case "free_shipping":
      return "Free Shipping";
    default:
      return type;
  }
}

function formatDiscountValue(promotion: ApiPromotion): string {
  if (promotion.discountType === "free_shipping") return "Free Delivery";
  const amount = parseAmount(promotion.discountValue);
  if (promotion.discountType === "percentage") return `${amount}% Off`;
  return `$${amount.toFixed(2)} Off`;
}

function toDateInput(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function normalizeDiscountType(
  type: string,
): AdminPromotionRow["discountType"] {
  if (type === "fixed" || type === "free_shipping" || type === "percentage") {
    return type;
  }
  return "percentage";
}

export function mapApiPromotionToAdminRow(
  promotion: ApiPromotion,
): AdminPromotionRow {
  return {
    id: promotion.id,
    name: promotion.code,
    type: formatDiscountType(promotion.discountType),
    discountValue: formatDiscountValue(promotion),
    startDate: formatDate(promotion.startsAt),
    endDate: formatDate(promotion.endsAt),
    status: derivePromotionStatus(promotion),
    code: promotion.code,
    discountType: normalizeDiscountType(promotion.discountType),
    discountValueNumber: parseAmount(promotion.discountValue),
    startsAtInput: toDateInput(promotion.startsAt),
    endsAtInput: toDateInput(promotion.endsAt),
    usageLimit: promotion.usageLimit,
  };
}

export function buildAdminPromotionMetrics(
  promotions: ApiPromotion[],
  rows: AdminPromotionRow[],
): AdminPromotionMetric[] {
  const activeCount = rows.filter((row) => row.status === "active").length;
  const redemptions = promotions.reduce(
    (sum, promo) => sum + (promo.usageCount ?? 0),
    0,
  );

  return [
    {
      id: "active",
      label: "Active Promotions",
      value: `${activeCount} Campaign Rule${activeCount === 1 ? "" : "s"}`,
      detail: "Currently live on store",
    },
    {
      id: "redemptions",
      label: "Redemptions",
      value: `${redemptions} Use${redemptions === 1 ? "" : "s"}`,
      detail: "Lifetime usage count",
    },
    {
      id: "revenue",
      label: "Promo Revenue",
      value: "—",
      detail: "Not exposed by API yet",
    },
  ];
}
