import type { AdminPaymentSettings } from "@/lib/mocks/admin-settings";

type PaymentsPanelProps = {
  payment: AdminPaymentSettings | null;
  loadError?: string | null;
};

export function PaymentsPanel({
  payment,
  loadError = null,
}: PaymentsPanelProps) {
  return (
    <section className="min-w-0 flex-1 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Payments</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Provider status is read-only. Credentials are configured in environment
        variables, not through this admin API.
      </p>

      {loadError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {loadError}
        </p>
      ) : payment ? (
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Provider
            </dt>
            <dd className="mt-1 text-base font-semibold capitalize text-foreground">
              {payment.provider}
            </dd>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Mode
            </dt>
            <dd className="mt-1 text-base font-semibold text-foreground">
              {payment.live ? "Live" : "Test / mock"}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No payment provider status available.
        </p>
      )}
    </section>
  );
}
