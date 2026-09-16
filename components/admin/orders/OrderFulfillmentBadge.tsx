import { cn } from "@/lib/utils";
import type { AdminOrderFulfillment } from "@/lib/mocks/admin-orders";

const styles: Record<
  AdminOrderFulfillment,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
  processing: {
    label: "Processing",
    className:
      "bg-admin-status-packaging text-admin-status-packaging-foreground",
  },
  shipped: {
    label: "Shipped",
    className:
      "bg-admin-status-packaging text-admin-status-packaging-foreground",
  },
  delivered: {
    label: "Delivered",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-admin-status-delayed text-admin-status-delayed-foreground",
  },
};

export function OrderFulfillmentBadge({
  status,
}: {
  status: AdminOrderFulfillment;
}) {
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
