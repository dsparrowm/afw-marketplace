import { cn } from "@/lib/utils";
import type {
  AdminSettingsNavItem,
  AdminSettingsSection,
} from "@/lib/mocks/admin-settings";

export type SettingsNavProps = {
  items: AdminSettingsNavItem[];
  active: AdminSettingsSection;
  onChange: (section: AdminSettingsSection) => void;
};

export function SettingsNav({ items, active, onChange }: SettingsNavProps) {
  return (
    <nav className="w-full max-w-[240px] shrink-0" aria-label="Settings sections">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange(item.id)}
                className={cn(
                  "flex h-[33px] w-full items-center rounded-md px-4 text-left text-sm transition-colors",
                  isActive
                    ? "bg-admin-nav-active font-medium text-admin-nav-active-foreground"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
