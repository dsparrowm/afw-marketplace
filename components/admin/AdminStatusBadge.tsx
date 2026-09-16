import { cn } from "@/lib/utils";
import type {
  AdminOrderAttentionStatus,
  AdminStockStatus,
} from "@/lib/mocks/admin-overview";

const orderStatusStyles: Record<
  AdminOrderAttentionStatus,
  { label: string; className: string }
> = {
  "pending-payment": {
    label: "Pending Payment",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
  "needs-packaging": {
    label: "Needs Packaging",
    className:
      "bg-admin-status-packaging text-admin-status-packaging-foreground",
  },
  "delayed-shipment": {
    label: "Delayed Shipment",
    className:
      "bg-admin-status-delayed text-admin-status-delayed-foreground",
  },
};

const stockStatusStyles: Record<
  AdminStockStatus,
  { label: string; className: string }
> = {
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

export type AdminStatusBadgeProps =
  | { kind: "order"; status: AdminOrderAttentionStatus }
  | { kind: "stock"; status: AdminStockStatus };

export function AdminStatusBadge(props: AdminStatusBadgeProps) {
  const style =
    props.kind === "order"
      ? orderStatusStyles[props.status]
      : stockStatusStyles[props.status];

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
