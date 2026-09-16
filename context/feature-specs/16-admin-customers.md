# 16 — Admin Customers

## Goal

Build the staff Customers screen matching Figma frame `customers` (`72:1408`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:1408` | `figma-cache/admin/customers/` |
| Main | `72:1466` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/customers/screenshot.png` |

## Components

```
components/admin/customers/
  CustomersPage.tsx
  CustomersHeader.tsx
  CustomerMetricCards.tsx
  CustomersTable.tsx
  CustomerStatusBadge.tsx

lib/mocks/admin-customers.ts
```

Reuse `ProductsPagination` for footer controls.

## UI

- Header + search + Export List
- Four metric cards
- Table: name, email, orders, spent, last order, location, status
- “Showing 1-7 of 1,842 clients” + pagination

## Acceptance

1. `/admin/customers` matches Figma copy; Visual QA logged
