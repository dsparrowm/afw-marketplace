"use client";

import { cn } from "@/lib/utils";
import type { AccountType } from "@/types/customer";

export type AccountTypeToggleProps = {
  value: AccountType;
  onChange: (value: AccountType) => void;
  personalLabel: string;
  businessLabel: string;
};

/** Personal / Business toggle — Figma `28:1199` */
export function AccountTypeToggle({
  value,
  onChange,
  personalLabel,
  businessLabel,
}: AccountTypeToggleProps) {
  return (
    <div
      className="grid grid-cols-2 rounded-xl bg-muted p-1"
      role="group"
      aria-label="Account type"
      data-figma-node="28:1199"
    >
      <button
        type="button"
        onClick={() => onChange("personal")}
        className={cn(
          "h-[33px] rounded-lg text-sm font-medium transition-colors",
          value === "personal"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {personalLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("business")}
        className={cn(
          "h-[33px] rounded-lg text-sm font-medium transition-colors",
          value === "business"
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {businessLabel}
      </button>
    </div>
  );
}
