#!/usr/bin/env node
/**
 * Idempotent staging catalog seed — homepage categories + featured products.
 *
 * Usage (from repo root, with .env.local staff credentials):
 *   node scripts/seed-staging-catalog.mjs
 *
 * Creates missing categories/products/variants/price-tiers only; skips existing slugs.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  const text = readFileSync(path, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const eq = trimmed.indexOf("=");
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const baseUrl = (process.env.MARKETPLACE_API_BASE_URL || "").replace(/\/$/, "");
const email = process.env.MARKETPLACE_STAFF_EMAIL || "";
const password = process.env.MARKETPLACE_STAFF_PASSWORD || "";

if (!baseUrl || !email || !password) {
  console.error(
    "Missing MARKETPLACE_API_BASE_URL / MARKETPLACE_STAFF_EMAIL / MARKETPLACE_STAFF_PASSWORD",
  );
  process.exit(1);
}

const CATEGORIES = [
  { name: "Fresh Produce", slug: "fresh-produce", sortOrder: 1 },
  { name: "Frozen Proteins", slug: "frozen-proteins", sortOrder: 2 },
  { name: "Grains & Flour", slug: "grains-flour", sortOrder: 3 },
  { name: "Condiments & Spices", slug: "condiments-spices", sortOrder: 4 },
  { name: "Snacks & Drinks", slug: "snacks-drinks", sortOrder: 5 },
  { name: "Beauty", slug: "beauty", sortOrder: 6 },
];

const PRODUCTS = [
  {
    name: "Honey Beans (Oloyin)",
    slug: "honey-beans",
    categorySlug: "grains-flour",
    description:
      "Sweet Nigerian honey beans (oloyin), cleaned and ready for classic stews.",
    countryOfOrigin: "Nigeria",
    brand: "African Food Warehouse",
    images: ["/images/products/honey-beans.png"],
    lowStockThreshold: 10,
    variant: {
      label: "1kg",
      sku: "AFW-HB-1KG",
      unitRetailPrice: 14.99,
      stockQuantity: 120,
      lowStockThreshold: 10,
      weight: 1,
      tier: { minQuantity: 10, price: 12.5, label: "Bulk (10+)" },
    },
  },
  {
    name: "Premium Yellow Garri",
    slug: "yellow-garri",
    categorySlug: "grains-flour",
    description: "Fine yellow garri milled for eba and everyday African meals.",
    countryOfOrigin: "Nigeria",
    brand: "African Food Warehouse",
    images: ["/images/products/yellow-garri.png"],
    lowStockThreshold: 8,
    variant: {
      label: "2kg",
      sku: "AFW-YG-2KG",
      unitRetailPrice: 18.99,
      stockQuantity: 85,
      lowStockThreshold: 8,
      weight: 2,
      tier: { minQuantity: 5, price: 16.99, label: "Bulk (5+)" },
    },
  },
  {
    name: "Premium White Puna Yam",
    slug: "white-puna-yam",
    categorySlug: "fresh-produce",
    description: "Large white puna yam tubers from Ghana — firm and earthy.",
    countryOfOrigin: "Ghana",
    brand: "African Food Warehouse",
    images: ["/images/products/white-puna-yam.png"],
    lowStockThreshold: 5,
    variant: {
      label: "Large Tuber",
      sku: "AFW-WPY-LG",
      unitRetailPrice: 22.99,
      stockQuantity: 3,
      lowStockThreshold: 5,
      weight: 3,
      tier: { minQuantity: 3, price: 20, label: "Bulk (3+)" },
    },
  },
  {
    name: "Grade A Red Palm Oil",
    slug: "red-palm-oil",
    categorySlug: "condiments-spices",
    description:
      "Cold-pressed red palm oil with deep color for traditional Nigerian cooking.",
    countryOfOrigin: "Nigeria",
    brand: "African Food Warehouse",
    images: ["/images/products/red-palm-oil.png"],
    lowStockThreshold: 12,
    variant: {
      label: "1L Bottle",
      sku: "AFW-RPO-1L",
      unitRetailPrice: 16.5,
      stockQuantity: 200,
      lowStockThreshold: 12,
      weight: 1.1,
      tier: { minQuantity: 12, price: 14, label: "Bulk (12+)" },
    },
  },
  {
    name: "Nigerian Jollof Rice Mix",
    slug: "nigerian-jollof-rice-mix",
    categorySlug: "condiments-spices",
    description:
      "Authentic single-origin Nigerian Jollof Rice seasoning blend, crafted carefully with sun-dried red bell peppers.",
    countryOfOrigin: "Nigeria",
    brand: "African Food Warehouse",
    images: ["/images/products/red-palm-oil.png"],
    lowStockThreshold: 20,
    variant: {
      label: "1.2kg",
      sku: "AFW-PRD-1048",
      unitRetailPrice: 12.99,
      stockQuantity: 342,
      lowStockThreshold: 20,
      weight: 1.2,
      tier: { minQuantity: 24, price: 9.49, label: "24+ units" },
    },
  },
];

async function api(path, { token, method = "GET", body } = {}) {
  const headers = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  if (!response.ok) {
    throw new Error(
      `${method} ${path} → ${response.status}: ${typeof data === "string" ? data.slice(0, 240) : JSON.stringify(data).slice(0, 240)}`,
    );
  }
  return data;
}

async function login() {
  const data = await api("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  if (!data?.accessToken) throw new Error("Login response missing accessToken");
  return data.accessToken;
}

async function ensureCategories(token) {
  const tree = await api("/admin/categories/tree", { token });
  const bySlug = new Map();
  function walk(nodes = []) {
    for (const node of nodes) {
      bySlug.set(node.slug, node);
      if (node.children?.length) walk(node.children);
    }
  }
  walk(Array.isArray(tree) ? tree : []);

  const ids = {};
  for (const category of CATEGORIES) {
    const existing = bySlug.get(category.slug);
    if (existing) {
      console.log(`category skip  ${category.slug} (${existing.id})`);
      ids[category.slug] = existing.id;
      continue;
    }
    const created = await api("/admin/categories", {
      token,
      method: "POST",
      body: {
        name: category.name,
        slug: category.slug,
        isActive: true,
        sortOrder: category.sortOrder,
      },
    });
    console.log(`category create ${category.slug} (${created.id})`);
    ids[category.slug] = created.id;
  }
  return ids;
}

async function findProductBySlug(token, slug) {
  // Prefer exact slug match across pages — search query is not always slug-exact.
  let page = 1;
  while (page <= 20) {
    const listed = await api(`/admin/products?page=${page}&limit=50`, { token });
    const rows = listed?.data ?? [];
    const hit = rows.find((row) => row.slug === slug);
    if (hit) {
      return api(`/admin/products/${hit.id}`, { token });
    }
    const totalPages = listed?.meta?.totalPages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }
  return null;
}

async function ensureProducts(token, categoryIds) {
  const failures = [];

  for (const product of PRODUCTS) {
    try {
      const categoryId = categoryIds[product.categorySlug];
      if (!categoryId) {
        throw new Error(`Missing category id for ${product.categorySlug}`);
      }

      let existing = await findProductBySlug(token, product.slug);
      if (existing) {
        console.log(`product  skip  ${product.slug} (${existing.id})`);
      } else {
        existing = await api("/admin/products", {
          token,
          method: "POST",
          body: {
            name: product.name,
            slug: product.slug,
            categoryId,
            description: product.description,
            images: product.images,
            countryOfOrigin: product.countryOfOrigin,
            brand: product.brand,
            isWholesaleEligible: true,
            lowStockThreshold: product.lowStockThreshold,
          },
        });
        console.log(`product  create ${product.slug} (${existing.id})`);
      }

      const detail = existing.variants
        ? existing
        : await api(`/admin/products/${existing.id}`, { token });
      const hasVariant = (detail.variants ?? []).some(
        (variant) => variant.sku === product.variant.sku,
      );
      if (hasVariant) {
        console.log(`variant  skip  ${product.variant.sku}`);
        continue;
      }

      const variant = await api(`/admin/products/${existing.id}/variants`, {
        token,
        method: "POST",
        body: {
          label: product.variant.label,
          sku: product.variant.sku,
          unitRetailPrice: product.variant.unitRetailPrice,
          stockQuantity: product.variant.stockQuantity,
          lowStockThreshold: product.variant.lowStockThreshold,
          weight: product.variant.weight,
        },
      });
      console.log(`variant  create ${product.variant.sku} (${variant.id})`);

      if (product.variant.tier) {
        await api(`/admin/products/variants/${variant.id}/price-tiers`, {
          token,
          method: "POST",
          body: product.variant.tier,
        });
        console.log(
          `tier     create ${product.variant.sku} @ ${product.variant.tier.minQuantity}+`,
        );
      }
    } catch (error) {
      const message = error.message || String(error);
      console.error(`product  FAIL  ${product.slug}: ${message}`);
      failures.push(product.slug);
    }
  }

  return failures;
}

async function main() {
  console.log(`Seeding catalog against ${baseUrl}`);
  const token = await login();
  const categoryIds = await ensureCategories(token);
  const failures = await ensureProducts(token, categoryIds);

  const products = await api("/admin/products?limit=20&status=active", { token });
  console.log(
    `Done. Active products reported: ${products?.meta?.total ?? products?.data?.length ?? 0}`,
  );
  if (failures.length) {
    console.error(`Failed products: ${failures.join(", ")}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
