import { cn } from "@/lib/utils";
import type { AdminCustomerStatus } from "@/lib/mocks/admin-customers";

const styles: Record<
  AdminCustomerStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  inactive: {
    label: "Inactive",
    className: "bg-muted text-muted-foreground",
  },
};

export function CustomerStatusBadge({
  status,
}: {
  status: AdminCustomerStatus;
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
