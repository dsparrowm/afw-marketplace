"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createTaxRateAction,
  deleteTaxRateAction,
  setTaxRateActiveAction,
} from "@/lib/admin/tax-rate-actions";
import {
  adminProvinceOptions,
  type AdminTaxRate,
} from "@/lib/mocks/admin-settings";

const fieldClassName =
  "h-[37px] w-full rounded-md border border-border bg-muted/40 px-3.5 text-sm text-foreground focus-visible:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

type TaxesPanelProps = {
  initialRates: AdminTaxRate[];
  loadError?: string | null;
};

export function TaxesPanel({
  initialRates,
  loadError = null,
}: TaxesPanelProps) {
  const router = useRouter();
  const [province, setProvince] = useState("ON");
  const [gstPercent, setGstPercent] = useState("13");
  const [pstPercent, setPstPercent] = useState("0");
  const [error, setError] = useState<string | null>(loadError);
  const [message, setMessage] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function refresh() {
    router.refresh();
  }

  return (
    <section className="min-w-0 flex-1 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Taxes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Provincial GST/HST and PST rates as decimal fractions on the API;
        enter percentages here (e.g. 13 for 13%).
      </p>

      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="mt-4 text-sm text-admin-status-positive" role="status">
          {message}
        </p>
      ) : null}

      <div className="mt-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="px-3 py-3 font-medium">Province</th>
              <th className="px-3 py-3 font-medium">GST/HST</th>
              <th className="px-3 py-3 font-medium">PST</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialRates.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-8 text-center text-muted-foreground"
                >
                  No tax rates configured yet.
                </td>
              </tr>
            ) : (
              initialRates.map((rate) => {
                const busy = busyId === rate.id && pending;
                return (
                  <tr
                    key={rate.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-3 py-3 font-medium">{rate.province}</td>
                    <td className="px-3 py-3">{rate.gstPercent}%</td>
                    <td className="px-3 py-3">{rate.pstPercent}%</td>
                    <td className="px-3 py-3">
                      {rate.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          type="button"
                          disabled={busy}
                          className="text-sm font-medium underline-offset-4 hover:underline disabled:opacity-60"
                          onClick={() => {
                            setError(null);
                            setMessage(null);
                            setBusyId(rate.id);
                            startTransition(async () => {
                              const result = await setTaxRateActiveAction({
                                id: rate.id,
                                isActive: !rate.isActive,
                              });
                              setBusyId(null);
                              if (!result.ok) {
                                setError(result.error);
                                return;
                              }
                              setMessage(
                                rate.isActive
                                  ? `${rate.province} deactivated.`
                                  : `${rate.province} activated.`,
                              );
                              refresh();
                            });
                          }}
                        >
                          {rate.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          className="text-sm font-medium text-destructive underline-offset-4 hover:underline disabled:opacity-60"
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Delete tax rate for ${rate.province}?`,
                            );
                            if (!confirmed) return;
                            setError(null);
                            setMessage(null);
                            setBusyId(rate.id);
                            startTransition(async () => {
                              const result = await deleteTaxRateAction(rate.id);
                              setBusyId(null);
                              if (!result.ok) {
                                setError(result.error);
                                return;
                              }
                              setMessage(`${rate.province} tax rate deleted.`);
                              refresh();
                            });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <form
        className="mt-6 space-y-4 rounded-lg border border-border bg-muted/20 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          setMessage(null);
          startTransition(async () => {
            const result = await createTaxRateAction({
              province,
              gstPercent: Number(gstPercent),
              pstPercent: Number(pstPercent),
            });
            if (!result.ok) {
              setError(result.error);
              return;
            }
            setMessage(`Tax rate for ${province} added.`);
            setGstPercent("13");
            setPstPercent("0");
            refresh();
          });
        }}
      >
        <h3 className="text-sm font-semibold text-foreground">Add tax rate</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">Province</span>
            <select
              className={fieldClassName}
              value={province}
              onChange={(event) => setProvince(event.target.value)}
              required
            >
              {adminProvinceOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">GST/HST %</span>
            <input
              type="number"
              min={0}
              step={0.01}
              className={fieldClassName}
              value={gstPercent}
              onChange={(event) => setGstPercent(event.target.value)}
              required
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm text-muted-foreground">PST %</span>
            <input
              type="number"
              min={0}
              step={0.01}
              className={fieldClassName}
              value={pstPercent}
              onChange={(event) => setPstPercent(event.target.value)}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-9 items-center rounded-md bg-brand-green px-4 text-sm font-medium text-brand-green-foreground hover:bg-brand-green/90 disabled:opacity-60"
        >
          {pending && !busyId ? "Saving…" : "Add Rate"}
        </button>
      </form>
    </section>
  );
}
