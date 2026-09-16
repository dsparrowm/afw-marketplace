# 12 — Admin Inventory

## Goal

Build the staff Inventory screen matching Figma Admin frame `inventory` (`72:400`).

## Figma References

| Area | Node ID | Cache path |
| --- | --- | --- |
| Frame | `72:400` | `figma-cache/admin/inventory/` |
| Main | `72:446` | `…/sections/main.xml` |
| Screenshot | — | `figma-cache/admin/inventory/screenshot.png` |

## Components

```
components/admin/inventory/
  InventoryPage.tsx
  InventoryHeader.tsx
  InventoryTabs.tsx
  InventoryTable.tsx
  InventoryShipmentBanner.tsx
  InventoryStatusBadge.tsx

lib/mocks/admin-inventory.ts
```

## UI

- Header: title + subtitle; search “Search SKU or product…”; green **Update Stock**
- Tabs: All Products (284) · In Stock (247) · Low Stock (25) · Out of Stock (12)
- Table: Product Name, SKU, Current Stock, Reorder Level, Status, Last Updated, Restock
- Status chips: In Stock · Low Stock · Out of Stock
- Bottom banner: Lagos Port bulk import + Dismiss / Process Shipment

## Data

- Mock rows from `main.xml` (7 products). Tab counts from Figma.
- Client-side search + tab filter on the mock set.

## Acceptance

1. `/admin/inventory` matches screenshot structure and Figma copy
2. Inventory nav active; Visual QA logged
