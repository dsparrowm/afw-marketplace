# 22 — Admin Transaction Receipt

## Goal

Build the staff Transaction Receipt detail matching Figma frame `transaction-receipt`
(`79:482`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `79:482` | `figma-cache/admin/transaction-receipt/` |
| Main | `79:514` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/transaction-receipt/screenshot.png` |

## Route

`/admin/financials/transactions/[id]` — uses Figma mock receipt for visual QA
(Transaction #TXN-10482). Financials nav stays active.

## Components

```
components/admin/financials/
  TransactionReceiptPage.tsx

lib/mocks/admin-transaction-receipt.ts
```

## UI

- Breadcrumb: Transactions / TXN-10482
- Title + settled subtitle + Print Receipt / Download PDF
- Receipt card: brand + Paid badge; Billed To / Payment / Order; line items; totals
- Actions: Send to Customer · Export Receipt CSV · Refund Transaction

## Acceptance

1. Page matches Figma copy/structure; Visual QA logged
2. TypeScript clean; mock-only (print/PDF/refund deferred)
