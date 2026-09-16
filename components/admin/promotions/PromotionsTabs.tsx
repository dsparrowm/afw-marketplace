import { cn } from "@/lib/utils";
import type {
  AdminPromotionTab,
  AdminPromotionTabMeta,
} from "@/lib/mocks/admin-promotions";

export type PromotionsTabsProps = {
  tabs: AdminPromotionTabMeta[];
  active: AdminPromotionTab;
  onChange: (tab: AdminPromotionTab) => void;
};

export function PromotionsTabs({
  tabs,
  active,
  onChange,
}: PromotionsTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3" role="tablist" aria-label="Promotion status">
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
              "inline-flex h-8 items-center rounded-full border px-4 text-sm font-medium transition-colors",
              isActive
                ? "border-brand-green bg-brand-green text-brand-green-foreground"
                : "border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
