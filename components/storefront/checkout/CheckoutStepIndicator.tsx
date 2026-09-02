import { cn } from "@/lib/utils";
import type { CheckoutStep } from "@/lib/checkout/types";

const steps: { id: CheckoutStep; label: string; number: number }[] = [
  { id: "delivery", label: "Delivery", number: 1 },
  { id: "payment", label: "Payment", number: 2 },
  { id: "confirm", label: "Confirm", number: 3 },
];

export type CheckoutStepIndicatorProps = {
  currentStep: CheckoutStep;
};

export function CheckoutStepIndicator({ currentStep }: CheckoutStepIndicatorProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <ol className="flex items-center justify-center gap-4 sm:gap-8">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isComplete = index < currentIndex;

        return (
          <li key={step.id} className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  isActive || isComplete
                    ? "bg-brand-green text-brand-green-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {step.number}
              </span>
              <span
                className={cn(
                  "text-sm font-medium sm:text-base",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div className="hidden h-0.5 w-16 bg-border sm:block" aria-hidden />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
