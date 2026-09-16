"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCad } from "@/lib/utils";

export type MobileStickyCheckoutBarProps = {
  label: string;
  total: number;
  onClick: () => void;
  disabled?: boolean;
};

/** Fixed primary action above mobile bottom nav during checkout */
export function MobileStickyCheckoutBar({
  label,
  total,
  onClick,
  disabled = false,
}: MobileStickyCheckoutBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(76px+env(safe-area-inset-bottom))] z-40 border-t border-border bg-background px-4 py-3 lg:hidden">
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="h-12 w-full rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground hover:bg-brand-green/90"
      >
        {label} · {formatCad(total)}
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Button>
    </div>
  );
}
