import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type PaymentFields = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

export type PaymentSectionProps = {
  fields: PaymentFields;
  errors: Partial<Record<keyof PaymentFields, string>>;
  onChange: (field: keyof PaymentFields, value: string) => void;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-foreground">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-primary">{message}</p>;
}

export function PaymentSection({ fields, errors, onChange }: PaymentSectionProps) {
  const inputClass = "h-[54px] rounded-xl";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Payment Details</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          All transactions are secure and encrypted.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <FieldLabel>Name on Card</FieldLabel>
          <Input
            className={cn(inputClass, "mt-2")}
            value={fields.cardName}
            onChange={(event) => onChange("cardName", event.target.value)}
            autoComplete="cc-name"
          />
          <FieldError message={errors.cardName} />
        </div>
        <div>
          <FieldLabel>Card Number</FieldLabel>
          <Input
            className={cn(inputClass, "mt-2")}
            value={fields.cardNumber}
            onChange={(event) => onChange("cardNumber", event.target.value)}
            autoComplete="cc-number"
            placeholder="4242 4242 4242 4242"
          />
          <FieldError message={errors.cardNumber} />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel>Expiry (MM/YY)</FieldLabel>
            <Input
              className={cn(inputClass, "mt-2")}
              value={fields.expiry}
              onChange={(event) => onChange("expiry", event.target.value)}
              autoComplete="cc-exp"
              placeholder="12/28"
            />
            <FieldError message={errors.expiry} />
          </div>
          <div>
            <FieldLabel>CVC</FieldLabel>
            <Input
              className={cn(inputClass, "mt-2")}
              value={fields.cvc}
              onChange={(event) => onChange("cvc", event.target.value)}
              autoComplete="cc-csc"
              placeholder="123"
            />
            <FieldError message={errors.cvc} />
          </div>
        </div>
      </div>
    </div>
  );
}
