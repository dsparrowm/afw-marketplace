# Figma Storefront Cache

Cached design assets from the **AFW Marketplace** Figma file for incremental storefront implementation.

**Source:** [AFW-Marketplace (Storefront canvas)](https://www.figma.com/design/TRHpdrWtpLm06UPtgHYDgB/AFW-Marketplace?node-id=0-1)

## Structure

```
figma-cache/
├── manifest.json          # Master index of all frames, node IDs, build order
├── cache.py               # Extract metadata & track pending fetches
├── storefront/
│   ├── metadata.xml       # Full Storefront canvas XML from Figma
│   ├── screenshot-overview.png
│   └── <frame-slug>/
│       ├── meta.json          # Frame metadata (nodeId, dimensions, status)
│       ├── metadata.xml       # Frame subtree extracted from canvas XML
│       ├── screenshot.png     # Visual reference (when fetched)
│       ├── design-context.tsx # React+Tailwind reference code (when fetched)
│       └── sections/
│           ├── <section>.json # Section node metadata
│           └── <section>.xml  # Section subtree XML
```

## Frames (16 total)

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

See `manifest.json` → `buildOrder`. Start with **homepage** sections (hero, header, categories), then shop flow, then account pages.

## Usage

```bash
# Extract per-frame metadata XML from the cached canvas
python3 figma-cache/cache.py extract

# List frames/sections still needing design-context fetch
python3 figma-cache/cache.py pending

# Show the next item to fetch from Figma MCP
python3 figma-cache/cache.py next

# List icons/logos pending export to public/
python3 figma-cache/fetch-assets.py pending

# After get_screenshot returns an asset URL:
python3 figma-cache/fetch-assets.py apply logo "https://www.figma.com/api/mcp/asset/....png"
```

## Icons and logos

Brand assets are tracked in `assets/manifest.json` (13 shell icons + logo). Human-readable
reference: `context/design-assets.md`. Code paths: `lib/brand/assets.ts`.

Export each node via Figma MCP `get_screenshot` (`fileKey` + `nodeId` from manifest), then
run `fetch-assets.py apply` to download into `public/brand/` and `public/icons/`.

**Blocked?** See `assets/EXPORT.md` for the full runbook (rate limit hit 2026-08-30).
Never crop icons from frame screenshots.

## Fetching design context

Large frames (e.g. Homepage at 5423px) exceed Figma MCP context limits. Fetch **sections** individually using node IDs from `manifest.json` or each frame's `sections/` folder.

For each fetch via Figma MCP `get_design_context`:
- `fileKey`: `TRHpdrWtpLm06UPtgHYDgB`
- `nodeId`: from `meta.json` or section JSON
- `skillNames`: `figma-design-to-code`

Save results to:
- Frame: `storefront/<slug>/design-context.tsx`
- Section: `storefront/<slug>/sections/<section-slug>.tsx`

Then update `status` in `manifest.json` (`metadata-only` → `partial` → `complete`).

## Notes

- Figma asset URLs expire in ~7 days — download images/icons into the project when implementing.
- Screenshots are visual references only; use `design-context.tsx` for implementation.
- The Homepage `Main` section (`2:7`) is very large — prefer fetching its child sections listed in the manifest.
