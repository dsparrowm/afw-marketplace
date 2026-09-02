import type { ShippingMethodId } from "@/lib/cart/calculations";
import { shippingMethods } from "@/lib/cart/calculations";
import { formatCad } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type DeliveryMethodSelectProps = {
  value: ShippingMethodId;
  onChange: (value: ShippingMethodId) => void;
};

export function DeliveryMethodSelect({ value, onChange }: DeliveryMethodSelectProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Delivery Method</h2>
      <div className="space-y-4">
        {shippingMethods.map((method) => (
          <label
            key={method.id}
            className={cn(
              "flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-colors",
              value === method.id
                ? "border-brand-green bg-section-badge/30"
                : "border-border hover:border-brand-green/40",
            )}
          >
            <input
              type="radio"
              name="checkout-shipping"
              value={method.id}
              checked={value === method.id}
              onChange={() => onChange(method.id)}
              className="mt-1 accent-brand-green"
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{method.label}</p>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
            <span className="text-lg font-semibold text-foreground">
              {method.price === 0 ? "Free" : formatCad(method.price)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
