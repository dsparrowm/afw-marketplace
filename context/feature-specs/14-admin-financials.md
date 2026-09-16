# 14 — Admin Financials

## Goal

Build the staff Financials dashboard matching Figma frame `financials` (`72:789`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:789` | `figma-cache/admin/financials/` |
| Main | `72:835` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/financials/screenshot.png` |

## Components

```
components/admin/financials/
  FinancialsPage.tsx
  FinancialsHeader.tsx
  FinancialMetricCards.tsx
  RevenueTrendChart.tsx
  RecentTransactions.tsx
  PayoutHistory.tsx

lib/mocks/admin-financials.ts
```

## UI

- Header + September 2025 date chip + Download Ledger
- Four metric cards (Total Revenue, Expenses, Net Profit, Pending Payouts)
- Monthly Revenue Trend bar chart (Jan–Aug 2025; Aug highlighted)
- Recent transactions table + Payout history list

## Acceptance

1. `/admin/financials` matches Figma copy/structure; Visual QA logged
