# 10 — Admin Shell + Overview

## Goal

Build the shared staff admin layout (sidebar shell) and the Overview dashboard page,
matching Figma Admin canvas frame `overview` (`72:8`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:8` | `figma-cache/admin/overview/` |
| Sidebar | `72:9` | `…/sections/sidebar.xml` |
| Main | `72:54` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/overview/screenshot.png` |

Design-context `.tsx` is optional; implement from screenshot + metadata until MCP
quota allows `get_design_context`.

## Components to Create

```
components/admin/
  AdminShell.tsx
  AdminSidebar.tsx
  AdminStatusBadge.tsx
  AdminPlaceholderPage.tsx
  overview/
    OverviewDashboard.tsx
    OverviewHeader.tsx
    MetricCards.tsx
    OrdersAttentionTable.tsx
    LowStockTable.tsx
    RecentSales.tsx

lib/admin/nav.ts
lib/mocks/admin-overview.ts
```

## AdminSidebar (`72:9`)

- Fixed width **260px**, full viewport height
- Logo (header wordmark) linking to `/admin`
- Nav items (icons via Lucide matching Figma icon frame names until Figma exports exist):
  Overview, Products, Inventory, Orders & Delivery, Financials, Promotions,
  Customers, Access, Settings
- Active item: light green fill + brand-green text
- Bottom: Help & Support, divider, profile (name + role + logout affordance)

## Overview main (`72:54`)

- Header: time-of-day greeting + first name; subtitle; Live Storefront + Export Daily Summary
- Four metric cards in a row
- Left column: Orders needing attention + Low stock alerts tables
- Right column: Recent sales list
- Copy and row data from `main.xml` / mock fixture (no invented metrics)

## Layout

```
app/(admin)/layout.tsx
  └── AdminShell
        ├── AdminSidebar
        └── {children}

app/(admin)/admin/page.tsx              → Overview
app/(admin)/admin/<section>/page.tsx    → placeholders until later specs
```

## Data

- Mock fixture `lib/mocks/admin-overview.ts` aligned to Figma copy
- No staff auth gate in this unit (open question — wire when admin session helper exists)
- Live Storefront → `/` (new tab). Export is UI-only until export API exists.

## Out of Scope

- Other admin screens beyond placeholder shells
- Staff login / token proxy
- Real metrics from staging APIs

## Acceptance

1. `/admin` renders sidebar + overview matching screenshot structure and Figma copy
2. Nav links reach placeholder routes without 404
3. Tokens used for colors (no raw hex in components except documented CSS vars)
4. Visual QA logged in `progress-tracker.md`
