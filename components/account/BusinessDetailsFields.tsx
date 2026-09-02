"use client";

import { AlertTriangle, ChevronDown } from "lucide-react";
import { AuthField } from "@/components/account/AuthLayout";
import { Input } from "@/components/ui/input";
import { authContent } from "@/lib/storefront/auth-content";
import { cn } from "@/lib/utils";
import type { OrderVolume } from "@/types/customer";

export type BusinessDetailsFieldsProps = {
  businessName: string;
  businessType: string;
  orderVolume: OrderVolume | "";
  onBusinessNameChange: (value: string) => void;
  onBusinessTypeChange: (value: string) => void;
  onOrderVolumeChange: (value: OrderVolume) => void;
  errors?: {
    businessName?: string;
    businessType?: string;
    orderVolume?: string;
  };
};

/** Business signup fields — Figma `28:1204` */
export function BusinessDetailsFields({
  businessName,
  businessType,
  orderVolume,
  onBusinessNameChange,
  onBusinessTypeChange,
  onOrderVolumeChange,
  errors,
}: BusinessDetailsFieldsProps) {
  return (
    <div className="space-y-4 border-t border-border pt-4" data-figma-node="28:1204">
      <AuthField label={authContent.signup.businessNameLabel} htmlFor="businessName" error={errors?.businessName}>
        <Input
          id="businessName"
          value={businessName}
          onChange={(event) => onBusinessNameChange(event.target.value)}
          placeholder={authContent.signup.businessNamePlaceholder}
          className="h-11"
        />
      </AuthField>

      <AuthField label={authContent.signup.businessTypeLabel} htmlFor="businessType" error={errors?.businessType}>
        <div className="relative">
          <select
            id="businessType"
            value={businessType}
            onChange={(event) => onBusinessTypeChange(event.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-input bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select business type</option>
            {authContent.businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
        </div>
      </AuthField>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          {authContent.signup.orderVolumeLabel}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {authContent.orderVolumes.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onOrderVolumeChange(option.value)}
              className={cn(
                "min-h-[36px] rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                orderVolume === option.value
                  ? "border-brand-green bg-secondary text-foreground"
                  : "border-border bg-card text-foreground/85 hover:border-brand-green/40",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {errors?.orderVolume ? (
          <p className="text-xs text-destructive">{errors.orderVolume}</p>
        ) : null}
      </div>

      <div className="flex gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" aria-hidden />
        <p>{authContent.signup.businessInfo}</p>
      </div>
    </div>
  );
}
