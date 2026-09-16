# Figma Design Cache

Cached design assets from the **AFW Marketplace** Figma file for incremental implementation.

**Source:** [AFW-Marketplace](https://www.figma.com/design/TRHpdrWtpLm06UPtgHYDgB/AFW-Marketplace)

| Canvas | Page node | Path |
|--------|-----------|------|
| Storefront | `0:1` | `figma-cache/storefront/` |
| Admin | `71:2` | `figma-cache/admin/` — see [admin/PENDING.md](admin/PENDING.md) |

## Structure

```
figma-cache/
├── manifest.json          # Storefront + Admin frame indexes, node IDs, build order
├── cache.py               # Extract metadata & track pending fetches
├── storefront/
│   ├── metadata.xml       # Full Storefront canvas XML from Figma
│   ├── screenshot-overview.png
│   └── <frame-slug>/
│       ├── meta.json
│       ├── metadata.xml
│       ├── screenshot.png
│       ├── design-context.tsx
│       └── sections/
└── admin/
    ├── PENDING.md         # Fetch runbook (MCP rate-limit resume)
    ├── metadata.xml       # (pending) Admin page XML
    └── <frame-slug>/
        └── meta.json      # Indexed 2026-09-07; screenshot/xml pending
```

## Admin frames (13) — indexed 2026-09-07

| Slug | Node ID | Size | Status |
|------|---------|------|--------|
| `overview` | `72:8` | 1440×960 | indexed |
| `products` | `72:203` | 1440×960 | indexed |
| `inventory` | `72:400` | 1440×960 | indexed |
| `orders-and-delivery` | `72:578` | 1440×960 | indexed |
| `financials` | `72:789` | 1440×960 | indexed |
| `promotions` | `72:1238` | 1440×960 | indexed |
| `customers` | `72:1408` | 1440×960 | indexed |
| `access` | `72:1589` | 1440×960 | indexed |
| `settings` | `72:1734` | 1440×960 | indexed |
| `product-detail-admin` | `79:7` | 1440×1024 | indexed |
| `add-edit-product-form` | `79:146` | 1440×1429 | indexed |
| `delivery-tracking` | `79:348` | 1440×1024 | indexed |
| `transaction-receipt` | `79:482` | 1440×1024 | indexed |

Screenshots + page `metadata.xml` blocked by Figma MCP rate limit — resume with `admin/PENDING.md`.

## Storefront frames (16 total)

### Shopping flow (desktop)
| Slug | Node ID | Size | Status |
|------|---------|------|--------|
| `homepage` | `2:4` | 1440×5423 | partial (screenshot + sections) |
| `shop-catalog` | `2:239` | 1440×2462 | metadata |
| `product-detail` | `2:870` | 1440×2391 | partial (screenshot) |
| `cart-page` | `2:1184` | 1440×1895 | metadata |
| `checkout-page` | `2:1516` | 1440×1683 | metadata |
| `order-confirmation` | `2:1734` | 1440×1704 | metadata |

### Mobile
| Slug | Node ID | Size |
|------|---------|------|
| `mobile-homepage` | `2:1928` | 375×3093 |
| `mobile-shop-catalog` | `3:2189` | 375×1960 |

### Shared components
| Slug | Node ID | Size |
|------|---------|------|
| `footer` | `18:70` | 1440×471 |

### Account / dashboard
| Slug | Node ID | Size |
|------|---------|------|
| `auth-login` | `29:15` | 1200×1000 |
| `auth-signup` | `28:1161` | 1200×1434 |
| `dashboard-orders` | `29:86` | 1200×900 |
| `order-detail` | `29:192` | 1200×900 |
| `dashboard-addresses` | `29:279` | 1200×900 |
| `dashboard-reorder-list` | `29:329` | 1200×900 |
| `dashboard-profile` | `29:433` | 1200×900 |

## Recommended build order

See `manifest.json` → `buildOrder` (storefront) and `adminBuildOrder` (admin).

## Usage

```bash
# Extract per-frame metadata XML from the cached canvas
python3 figma-cache/cache.py extract              # storefront + admin
python3 figma-cache/cache.py extract admin

# List pending fetches
python3 figma-cache/cache.py pending
python3 figma-cache/cache.py pending admin

# Show the next item to fetch from Figma MCP
python3 figma-cache/cache.py next admin

# List icons/logos pending export to public/
python3 figma-cache/fetch-assets.py pending
```

## Fetching design context

Large frames exceed Figma MCP context limits. Fetch **sections** individually using node IDs from `manifest.json`.

- `fileKey`: `TRHpdrWtpLm06UPtgHYDgB`
- Storefront: `storefront/<slug>/`
- Admin: `admin/<slug>/`

Then update `status` in `manifest.json` (`indexed` → `metadata-only` → `partial` → `complete`).

## Notes

- Figma asset URLs expire in ~7 days — download images/icons into the project when implementing.
- Admin page must be loaded with `await figma.setCurrentPageAsync(adminPage)` before plugin enumeration (empty until activated).
