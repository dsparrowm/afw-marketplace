import { cn } from "@/lib/utils";
import type { AdminInventoryStatus } from "@/lib/mocks/admin-inventory";

const styles: Record<
  AdminInventoryStatus,
  { label: string; className: string }
> = {
  "in-stock": {
    label: "In Stock",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  "low-stock": {
    label: "Low Stock",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
  "out-of-stock": {
    label: "Out of Stock",
    className:
      "bg-admin-status-delayed text-admin-status-delayed-foreground",
  },
};

export type InventoryStatusBadgeProps = {
  status: AdminInventoryStatus;
};

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
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
