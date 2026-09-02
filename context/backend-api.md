# Backend API Reference

Staging marketplace backend for AFW. Use this doc before wiring live data in `lib/api/`.

## Quick reference

| Item | Value |
| --- | --- |
| Base URL | `http://104.251.212.74:3000` |
| Swagger UI | [http://104.251.212.74:3000/docs](http://104.251.212.74:3000/docs) |
| OpenAPI JSON | [http://104.251.212.74:3000/docs-json](http://104.251.212.74:3000/docs-json) |
| Local snapshot | `context/backend-openapi.json` (refresh with curl when contracts change) |

## Credentials (dev / integration testing)

**Stored in `.env.local`** (gitignored). Agents and developers should read that file for
current values. Template variables are in `.env.example`.

| Variable | Purpose |
| --- | --- |
| `MARKETPLACE_API_BASE_URL` | API origin |
| `MARKETPLACE_STAFF_EMAIL` | Staff login email |
| `MARKETPLACE_STAFF_PASSWORD` | Staff login password |

Staff account (staging, as of 2026-09-02):

- Email: `admin@africafoodwarehouse.local`
- Password: see `MARKETPLACE_STAFF_PASSWORD` in `.env.local`

Do **not** commit real passwords to git. `.env.local` is the source of truth for this workspace.

## Authentication

All `/admin/*` routes require a Bearer access token.

### Login

```http
POST /auth/login
Content-Type: application/json

{ "email": "<staff email>", "password": "<password>" }
```

**Response (200):**

```json
{
  "accessToken": "<JWT>",
  "refreshToken": "<opaque refresh token>"
}
```

Access tokens are short-lived (~15 min). Use refresh before expiry.

### Refresh

```http
POST /auth/refresh
Content-Type: application/json

{ "refreshToken": "<refresh token>" }
```

Returns a new `accessToken` + `refreshToken` pair (rotation).

### Logout

```http
POST /auth/logout
Content-Type: application/json

{ "refreshToken": "<refresh token>" }
```

**Response:** 204 No Content

### Example (curl)

```bash
# Load credentials from .env.local
source .env.local 2>/dev/null || export $(grep -v '^#' .env.local | xargs)

curl -sS -X POST "$MARKETPLACE_API_BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$MARKETPLACE_STAFF_EMAIL\",\"password\":\"$MARKETPLACE_STAFF_PASSWORD\"}"
```

Use the returned `accessToken` as `Authorization: Bearer <token>` on admin requests.

## Public vs admin endpoints

**Important:** The current OpenAPI spec (53 paths) exposes **staff/admin APIs only**.
There are no documented public storefront routes yet for:

- Anonymous catalog browse
- Customer registration / login
- Session cart
- Customer checkout
- Customer order history

Storefront-relevant data today lives under `/admin/*` and requires staff auth. Options
for Phase 2 integration:

1. **Wait for public customer API** — preferred for production storefront
2. **Next.js route handlers** (`app/api/`) proxy admin reads with a server-side staff
   token for dev/staging catalog seeding — never expose staff tokens to the browser
3. **Keep mocks** in `lib/mocks/` until public endpoints ship

Record new public routes here when the backend adds them.

## Endpoint map (storefront-relevant)

### Health

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/health` | No | Liveness + DB connectivity |

### Auth

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| POST | `/auth/login` | No | Staff login |
| POST | `/auth/refresh` | No | Token rotation |
| POST | `/auth/logout` | No | Revoke refresh token |

### Catalog (admin)

| Method | Path | Auth | Query params |
| --- | --- | --- | --- |
| GET | `/admin/products` | Bearer | `page`, `limit`, `search`, filters per OpenAPI |
| GET | `/admin/products/{id}` | Bearer | Full product + variants |
| POST | `/admin/products` | Bearer | Create product |
| PATCH | `/admin/products/{id}` | Bearer | Update product |
| GET | `/admin/products/low-stock` | Bearer | — |
| POST | `/admin/products/{productId}/variants` | Bearer | Add variant |
| PATCH | `/admin/products/variants/{id}` | Bearer | Update variant |
| PATCH | `/admin/products/variants/{id}/stock` | Bearer | Adjust stock |
| GET | `/admin/products/variants/{variantId}/price-tiers` | Bearer | Wholesale tiers |
| GET | `/admin/categories` | Bearer | `page`, `limit`, `parentId`, `rootOnly`, `isActive`, `search` |
| GET | `/admin/categories/tree` | Bearer | Nested category tree |
| GET | `/admin/categories/{id}` | Bearer | Single category |

**Product create shape (`CreateProductDto`):**

```typescript
{
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  images?: string[];
  countryOfOrigin?: string;
  brand?: string;
  isWholesaleEligible?: boolean; // default true
  lowStockThreshold?: number;
}
```

**Category create shape (`CreateCategoryDto`):**

```typescript
{
  name: string;
  slug: string;           // e.g. "fresh-produce"
  description?: string;
  parentId?: string;      // omit for root
  isActive?: boolean;     // default true
  sortOrder?: number;     // default 0
}
```

Catalog list responses use a paginated envelope — **confirmed 2026-09-02** from live staging:

```typescript
{
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}
```

Staging currently returns empty product lists (`total: 0`) — seed data may be needed before storefront wiring.

### Customers (admin)

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/admin/customers` | Bearer | Paginated list |
| GET | `/admin/customers/{id}` | Bearer | Customer profile |
| PATCH | `/admin/customers/{id}` | Bearer | Update customer |

### Orders (admin)

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/admin/orders` | Bearer | Paginated list |
| GET | `/admin/orders/{id}` | Bearer | Order detail |
| POST | `/admin/orders` | Bearer | Create order (staff-placed) |
| PATCH | `/admin/orders/{id}/status` | Bearer | Status transition |
| GET | `/admin/orders/{id}/packing-slip` | Bearer | PDF/export |

**Order create shape (`CreateOrderDto`):**

```typescript
{
  customerId: string;
  type: "retail" | "wholesale";
  placedVia: "phone" | "in_person";
  items: { variantId: string; quantity: number }[];
  deliveryMethod: "ship" | "local_delivery" | "pickup";
  deliveryAddressId?: string;  // required unless pickup
  discountTotal?: number;
}
```

Storefront checkout will likely differ (guest email, payment intent, etc.) when a public
API exists.

### Delivery, promotions, wholesale, reports

See `context/backend-openapi.json` for full paths:

- `/admin/delivery/zones`, `/admin/delivery/shipments`
- `/admin/promotions`
- `/admin/wholesale/accounts`, `/admin/wholesale/quotes`
- `/admin/reports/*`
- `/admin/settings`, `/admin/settings/tax-rates`, `/admin/settings/payment`

## Storefront mapping (planned)

| Storefront feature | Current backend | Status |
| --- | --- | --- |
| `/shop` catalog | `GET /admin/products` (staff) | Needs public API or server proxy |
| `/shop/[slug]` PDP | `GET /admin/products/{id}` by slug | Confirm slug lookup endpoint |
| Category nav / carousel | `GET /admin/categories/tree` | Needs public or proxied read |
| Cart | — | No session cart API documented |
| Checkout | `POST /admin/orders` (staff) | Different shape; needs customer API |
| Login / signup | — | No customer auth documented |
| Account orders | `GET /admin/orders` filtered by customer | Needs customer-scoped API |

**Product detail route:** Keep `/shop/[slug]` — backend products use `slug` on
`CreateProductDto`.

## Integration conventions

Follow `context/architecture.md`:

- Wrappers in `lib/api/` (e.g. `products.ts`, `categories.ts`, `orders.ts`)
- TanStack Query hooks in `lib/hooks/` (when client refetch is needed)
- Server-only staff token in `lib/api/staff-auth.ts` — never `NEXT_PUBLIC_*` for credentials
- Types in `types/api.ts`; storefront mapping in `lib/catalog/map-api-product.ts`
- Data orchestration in `lib/catalog/storefront-data.ts` with mock fallback (`CATALOG_FALLBACK_TO_MOCK`)

### Storefront wiring (2026-09-02)

| Route | Source |
| --- | --- |
| `/` homepage sections | `fetchStorefrontProductPool()` → `GET /admin/products` |
| `/` category carousel | `fetchStorefrontCategories()` → `GET /admin/categories/tree` |
| `/shop` | `queryCatalogAsync()` |
| `/shop/[slug]` | `getStorefrontProductDetail()` → `GET /admin/products/{id}` |

Cart, checkout, customer auth, and account orders remain on mocks until public customer APIs ship.

## Refreshing the OpenAPI snapshot

```bash
curl -sS "$MARKETPLACE_API_BASE_URL/docs-json" -o context/backend-openapi.json
```

Update this doc when new paths appear (especially public `/catalog`, `/cart`, `/auth/customer`).
