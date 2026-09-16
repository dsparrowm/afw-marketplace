import { cn } from "@/lib/utils";
import type {
  AdminInventoryTab,
  AdminInventoryTabMeta,
} from "@/lib/mocks/admin-inventory";

export type InventoryTabsProps = {
  tabs: AdminInventoryTabMeta[];
  active: AdminInventoryTab;
  onChange: (tab: AdminInventoryTab) => void;
};

export function InventoryTabs({ tabs, active, onChange }: InventoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Stock status">
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
              "inline-flex h-[33px] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-green bg-brand-green text-brand-green-foreground"
                : "border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                "inline-flex min-w-[1.75rem] items-center justify-center rounded-full px-1.5 py-0.5 text-xs",
                isActive
                  ? "bg-brand-green-foreground/20 text-brand-green-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
