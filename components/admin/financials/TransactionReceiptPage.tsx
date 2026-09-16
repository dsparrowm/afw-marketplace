"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Download,
  Leaf,
  Mail,
  Printer,
  Search,
} from "lucide-react";
import type { AdminTransactionReceipt } from "@/lib/mocks/admin-transaction-receipt";

export type TransactionReceiptPageProps = {
  receipt: AdminTransactionReceipt;
};

/** Admin transaction receipt — Figma `79:482` / main `79:514` */
export function TransactionReceiptPage({
  receipt,
}: TransactionReceiptPageProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1180px] px-8 py-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            {receipt.breadcrumb.map((crumb, index) => (
              <li
                key={`${crumb.label}-${index}`}
                className="flex items-center gap-1.5"
              >
                {index > 0 ? <span aria-hidden>/</span> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          <label className="relative hidden w-[240px] sm:block">
            <span className="sr-only">Search inventory</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search inventory, shipments..."
              className="h-9 w-full rounded-md border border-border bg-card pr-3 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </label>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground">
            {receipt.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{receipt.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStatusMessage("Print is mock-only.")}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Printer className="size-4" aria-hidden />
            Print Receipt
          </button>
          <button
            type="button"
            onClick={() => setStatusMessage("PDF download is mock-only.")}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3.5 text-sm font-medium text-foreground hover:bg-muted"
          >
            <Download className="size-4" aria-hidden />
            Download PDF
          </button>
        </div>
      </div>

      <article className="mt-8 max-w-[800px] rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-admin-status-active text-admin-status-active-foreground">
              <Leaf className="size-3.5" aria-hidden />
            </span>
            <p className="text-base font-semibold text-foreground">
              {receipt.brandName}
            </p>
          </div>
          <span className="inline-flex items-center rounded-md bg-admin-status-active px-2.5 py-1 text-xs font-medium text-admin-status-active-foreground">
            {receipt.statusLabel}
          </span>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Billed To</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {receipt.billedTo.name}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {receipt.billedTo.address}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment Details</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {receipt.payment.method}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {receipt.payment.reference}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Order Number</p>
              <p className="mt-1 text-sm font-medium text-admin-status-positive">
                {receipt.order.number}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {receipt.order.placedAt}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-border bg-muted/40 text-muted-foreground">
                <th className="px-3 py-3 font-medium">Product Item</th>
                <th className="w-[60px] px-3 py-3 font-medium">Qty</th>
                <th className="w-[120px] px-3 py-3 font-medium">Unit Price</th>
                <th className="w-[120px] px-3 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {receipt.lineItems.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="px-3 py-3 text-foreground">{item.name}</td>
                  <td className="px-3 py-3 text-foreground">{item.qty}</td>
                  <td className="px-3 py-3 text-foreground">{item.unitPrice}</td>
                  <td className="px-3 py-3 text-foreground">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <dl className="w-full max-w-[320px] space-y-2.5 text-sm">
            <div className="flex justify-between gap-6">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium text-foreground">
                {receipt.totals.subtotal}
              </dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-muted-foreground">
                {receipt.totals.discountLabel}
              </dt>
              <dd className="font-medium text-admin-status-delayed-foreground">
                {receipt.totals.discount}
              </dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium text-foreground">
                {receipt.totals.shipping}
              </dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-muted-foreground">{receipt.totals.taxLabel}</dt>
              <dd className="font-medium text-foreground">{receipt.totals.tax}</dd>
            </div>
            <div className="mt-2 flex justify-between gap-6 border-t border-border pt-3">
              <dt className="text-base font-semibold text-foreground">
                Total Paid
              </dt>
              <dd className="text-xl font-semibold text-admin-status-positive">
                {receipt.totals.totalPaid}
              </dd>
            </div>
          </dl>
        </div>
      </article>

      <div className="mt-5 flex max-w-[800px] flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setStatusMessage("Receipt emailed locally (mock).")}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-green px-5 text-sm font-medium text-brand-green-foreground"
        >
          <Mail className="size-4" aria-hidden />
          Send to Customer
        </button>
        <button
          type="button"
          onClick={() => setStatusMessage("CSV export is mock-only.")}
          className="inline-flex h-10 items-center rounded-md border border-brand-green bg-card px-5 text-sm font-medium text-brand-green hover:bg-muted"
        >
          Export Receipt CSV
        </button>
        <button
          type="button"
          onClick={() => setStatusMessage("Refund is mock-only.")}
          className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium text-admin-status-delayed-foreground hover:bg-admin-status-delayed"
        >
          Refund Transaction
        </button>
      </div>

      {statusMessage ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
