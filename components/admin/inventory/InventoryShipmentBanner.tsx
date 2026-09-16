"use client";

import { CircleHelp } from "lucide-react";
import { adminInventoryShipmentBanner } from "@/lib/mocks/admin-inventory";

export type InventoryShipmentBannerProps = {
  visible: boolean;
  onDismiss: () => void;
};

export function InventoryShipmentBanner({
  visible,
  onDismiss,
}: InventoryShipmentBannerProps) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-admin-banner-border bg-admin-banner px-4 py-4 text-admin-banner-foreground">
      <div className="flex min-w-0 items-start gap-3">
        <CircleHelp className="mt-0.5 size-[18px] shrink-0 opacity-80" aria-hidden />
        <p className="text-sm">
          {adminInventoryShipmentBanner.message}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-8 items-center rounded-md px-3.5 text-sm font-medium transition-colors hover:bg-brand-green/10"
        >
          Dismiss
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center rounded-md bg-brand-green px-3.5 text-sm font-medium text-brand-green-foreground transition-colors hover:bg-brand-green/90"
        >
          Process Shipment
        </button>
      </div>
    </div>
  );
}
