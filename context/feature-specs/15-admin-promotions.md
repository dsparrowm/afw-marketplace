# 15 — Admin Promotions

## Goal

Build the staff Promotions screen matching Figma frame `promotions` (`72:1238`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:1238` | `figma-cache/admin/promotions/` |
| Main | `72:1296` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/promotions/screenshot.png` |

## Components

```
components/admin/promotions/
  PromotionsPage.tsx
  PromotionsHeader.tsx
  PromotionsTabs.tsx
  PromotionsTable.tsx
  PromotionStatusBadge.tsx
  PromotionMetricCards.tsx

lib/mocks/admin-promotions.ts
```

## UI

- Header + Create Promotion (green)
- Tabs: Active · Scheduled · Expired · All (default **All** so full Figma table is visible)
- Table: name, type, discount, start/end, status, edit/more
- Three metric cards at bottom

## Acceptance

1. `/admin/promotions` matches Figma copy; Visual QA logged
