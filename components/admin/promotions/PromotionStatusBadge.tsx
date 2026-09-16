import { cn } from "@/lib/utils";
import type { AdminPromotionStatus } from "@/lib/mocks/admin-promotions";

const styles: Record<
  AdminPromotionStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  scheduled: {
    label: "Scheduled",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
  expired: {
    label: "Expired",
    className:
      "bg-admin-status-delayed text-admin-status-delayed-foreground",
  },
};

export function PromotionStatusBadge({
  status,
}: {
  status: AdminPromotionStatus;
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
