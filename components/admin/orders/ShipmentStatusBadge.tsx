import { cn } from "@/lib/utils";
import type { AdminShipmentStatus } from "@/lib/mocks/admin-orders";

const styles: Record<
  AdminShipmentStatus,
  { label: string; className: string }
> = {
  "out-for-delivery": {
    label: "Out for Delivery",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  "in-transit": {
    label: "In Transit",
    className:
      "bg-admin-status-packaging text-admin-status-packaging-foreground",
  },
  "origin-scan": {
    label: "Origin Scan",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
};

export function ShipmentStatusBadge({
  status,
}: {
  status: AdminShipmentStatus;
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
