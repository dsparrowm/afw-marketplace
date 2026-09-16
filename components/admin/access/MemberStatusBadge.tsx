import { cn } from "@/lib/utils";
import type { AdminMemberStatus } from "@/lib/mocks/admin-access";

const styles: Record<
  AdminMemberStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-admin-status-active text-admin-status-active-foreground",
  },
  invited: {
    label: "Invited",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-admin-status-pending text-admin-status-pending-foreground",
  },
};

export function MemberStatusBadge({ status }: { status: AdminMemberStatus }) {
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
