import { cn } from "@/lib/utils";
import type {
  AdminOrderTab,
  AdminOrderTabMeta,
} from "@/lib/mocks/admin-orders";

export type OrdersTabsProps = {
  tabs: AdminOrderTabMeta[];
  active: AdminOrderTab;
  onChange: (tab: AdminOrderTab) => void;
};

export function OrdersTabs({ tabs, active, onChange }: OrdersTabsProps) {
  return (
    <div
      className="flex flex-wrap items-end gap-6 border-b border-border"
      role="tablist"
      aria-label="Order fulfillment"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "-mb-px border-b-2 pb-2 text-sm transition-colors",
              isActive
                ? "border-brand-green font-semibold text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}{" "}
            <span className="font-normal text-muted-foreground">
              ({tab.count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
