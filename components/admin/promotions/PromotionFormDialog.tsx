"use client";

import { useEffect, useId, useState, useTransition } from "react";
import { X } from "lucide-react";
import type { PromotionFormInput } from "@/lib/admin/promotion-actions";
import type { AdminPromotionRow } from "@/lib/mocks/admin-promotions";

const fieldClassName =
  "h-[37px] w-full rounded-md border border-border bg-muted/40 px-3.5 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

type PromotionFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  initial?: AdminPromotionRow | null;
  onClose: () => void;
  onSubmit: (
    form: PromotionFormInput,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
};

function defaultDates() {
  const today = new Date();
  const end = new Date();
  end.setDate(today.getDate() + 30);
  return {
    startsAt: today.toISOString().slice(0, 10),
    endsAt: end.toISOString().slice(0, 10),
  };
}

export function PromotionFormDialog({
  open,
  mode,
  initial = null,
  onClose,
  onSubmit,
}: PromotionFormDialogProps) {
  const titleId = useId();
  const defaults = defaultDates();
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] =
    useState<PromotionFormInput["discountType"]>("percentage");
  const [discountValue, setDiscountValue] = useState("15");
  const [startsAt, setStartsAt] = useState(defaults.startsAt);
  const [endsAt, setEndsAt] = useState(defaults.endsAt);
  const [usageLimit, setUsageLimit] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (mode === "edit" && initial) {
      setCode(initial.code);
      setDiscountType(initial.discountType);
      setDiscountValue(String(initial.discountValueNumber || 0));
      setStartsAt(initial.startsAtInput || defaults.startsAt);
      setEndsAt(initial.endsAtInput || defaults.endsAt);
      setUsageLimit(
        initial.usageLimit != null ? String(initial.usageLimit) : "",
      );
      return;
    }
    const next = defaultDates();
    setCode("");
    setDiscountType("percentage");
    setDiscountValue("15");
    setStartsAt(next.startsAt);
    setEndsAt(next.endsAt);
    setUsageLimit("");
  }, [open, mode, initial]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold text-foreground"
            >
              {mode === "create" ? "Create Promotion" : "Edit Promotion"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Store-wide discount code. Category/product scopes are not in this
              form yet.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <form
          className="mt-5 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            const limitRaw = usageLimit.trim();
            const form: PromotionFormInput = {
              code,
              discountType,
              discountValue: Number(discountValue),
              startsAt,
              endsAt,
              usageLimit: limitRaw ? Number(limitRaw) : null,
            };
            startTransition(async () => {
              const result = await onSubmit(form);
              if (!result.ok) {
                setError(result.error);
                return;
              }
              onClose();
            });
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">Code</span>
            <input
              className={fieldClassName}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
              autoComplete="off"
              placeholder="e.g. SAVE15"
            />
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm text-muted-foreground">Type</span>
              <select
                className={fieldClassName}
                value={discountType}
                onChange={(event) =>
                  setDiscountType(
                    event.target.value as PromotionFormInput["discountType"],
                  )
                }
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed amount</option>
                <option value="free_shipping">Free shipping</option>
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm text-muted-foreground">
                {discountType === "percentage"
                  ? "Percent"
                  : discountType === "fixed"
                    ? "Amount ($)"
                    : "Value (ignored)"}
              </span>
              <input
                type="number"
                min={0}
                step={discountType === "percentage" ? 1 : 0.01}
                className={fieldClassName}
                value={discountValue}
                onChange={(event) => setDiscountValue(event.target.value)}
                disabled={discountType === "free_shipping"}
                required={discountType !== "free_shipping"}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm text-muted-foreground">Starts</span>
              <input
                type="date"
                className={fieldClassName}
                value={startsAt}
                onChange={(event) => setStartsAt(event.target.value)}
                required
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm text-muted-foreground">Ends</span>
              <input
                type="date"
                className={fieldClassName}
                value={endsAt}
                onChange={(event) => setEndsAt(event.target.value)}
                required
              />
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">
              Usage limit (optional)
            </span>
            <input
              type="number"
              min={1}
              step={1}
              className={fieldClassName}
              value={usageLimit}
              onChange={(event) => setUsageLimit(event.target.value)}
              placeholder="Unlimited"
            />
          </label>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-9 items-center rounded-md bg-brand-green px-4 text-sm font-medium text-brand-green-foreground hover:bg-brand-green/90 disabled:opacity-60"
            >
              {pending
                ? "Saving…"
                : mode === "create"
                  ? "Create Promotion"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
