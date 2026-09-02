import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: "confirmed", label: "Order Confirmed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
] as const;

/** Order status timeline — Figma `2:1760` */
export function OrderStatusTimeline() {
  const activeIndex = 0;

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="relative">
        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand-green"
            style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
        <ol className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = index < activeIndex;

            return (
              <li key={step.id} className="flex w-[25%] flex-col items-center text-center">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    isActive || isComplete
                      ? "border-brand-green bg-brand-green text-brand-green-foreground shadow-sm"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {isActive || isComplete ? (
                    <Check className="h-4 w-4" aria-hidden />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
                  )}
                </span>
                <span
                  className={cn(
                    "mt-3 text-sm font-medium",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
