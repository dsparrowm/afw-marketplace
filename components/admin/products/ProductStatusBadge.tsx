import { cn } from "@/lib/utils";
import type { AdminProductStatus } from "@/lib/mocks/admin-products";

const styles: Record<
  AdminProductStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  "low-stock": {
    label: "Low Stock",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
  "draft-out-of-stock": {
    label: "Draft / Out of Stock",
    className:
      "bg-admin-status-delayed text-admin-status-delayed-foreground",
  },
};

export type ProductStatusBadgeProps = {
  status: AdminProductStatus;
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  const style = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        style.className,
      )}
    >
      {style.label}
    </span>
  );
}
