import type { OrderStatus } from "@/types/account";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-muted text-muted-foreground",
  },
  processing: {
    label: "Processing",
    className: "bg-amber-100 text-amber-900",
  },
  shipped: {
    label: "Shipped",
    className: "bg-sky-100 text-sky-900",
  },
  delivered: {
    label: "Delivered",
    className: "bg-brand-green/15 text-brand-green",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive",
  },
};

export function OrderStatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
