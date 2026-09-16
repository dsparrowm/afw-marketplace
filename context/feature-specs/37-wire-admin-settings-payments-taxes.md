# 37 — Wire Admin Settings Payments & Taxes

## Goal

Replace Payments and Taxes placeholders on `/admin/settings` with live data:

- Payments: read-only `GET /admin/settings/payment`
- Taxes: list + create/update/delete via `/admin/settings/tax-rates*`

## Auth

- `marketplaceFetch(..., { auth: "session" })`

## Modules

```
types/api.ts
lib/api/settings.ts
lib/admin/map-admin-settings.ts   ← tax/payment mappers
lib/admin/load-admin-settings.ts  ← load payment + tax rates
lib/admin/tax-rate-actions.ts
components/admin/settings/PaymentsPanel.tsx
components/admin/settings/TaxesPanel.tsx
components/admin/settings/SettingsPage.tsx
app/(admin)/admin/(protected)/settings/page.tsx
```

## Behavior

| Section | API |
| --- | --- |
| Payments | Show provider + live flag; note credentials are env-only |
| Taxes | Table of province / GST / PST / active; add rate; toggle active; delete |

Rates use decimal fractions (e.g. `0.05` = 5%); UI shows percentages.

## Out of Scope

- Shipping / notifications / legal
- Payment credential editing (not in API by design)

## Acceptance

1. Payments shows staging provider status
2. Taxes list reflects API; can add/toggle/delete a rate
3. Visual QA + TypeScript clean
