import type { Product } from "@/types/product";
import type { ProductDetail, ProductSizeOption } from "@/types/product-detail";
import { mockProducts } from "@/lib/mocks/products";
import { getCatalogProductBySlug } from "@/lib/mocks/catalog-products";

const catalogExtras: Record<string, Product> = {
  "smoked-crayfish": {
    id: "smoked-crayfish",
    slug: "smoked-crayfish",
    name: "Smoked Ground Crayfish",
    sizeLabel: "200g",
    origin: "Ghana",
    imageUrl: "/images/products/yellow-garri.png",
    retailPrice: 7.5,
    bulkPrice: 6.25,
    bulkLabel: "Bulk (20+)",
    stockStatus: "in-stock",
    category: "condiments-spices",
  },
};

function allCatalogProducts(): Product[] {
  const map = new Map<string, Product>();
  for (const product of Object.values(mockProducts)) {
    map.set(product.slug, product);
  }
  for (const product of Object.values(catalogExtras)) {
    map.set(product.slug, product);
  }

  const fromCatalog = getCatalogProductBySlug;
  for (const slug of [
    "pounded-yam-flour",
    "ground-egusi",
    "vanilla-chin-chin",
    "frozen-tilapia",
    "scotch-bonnet",
    "plantain-chips",
    "coconut-oil",
    "jollof-seasoning",
    "shea-butter",
    "brown-beans-2kg",
  ]) {
    const product = fromCatalog(slug);
    if (product) map.set(product.slug, product);
  }

  return Array.from(map.values());
}

function defaultSizeOptions(product: Product): ProductSizeOption[] {
  return [
    {
      id: "default",
      label: product.sizeLabel,
      retailPrice: product.retailPrice,
      bulkPrice: product.bulkPrice,
      bulkLabel: product.bulkLabel,
    },
  ];
}

function defaultAccordion(product: Product): ProductDetail["accordion"] {
  return {
    productDescription: `${product.name} is sourced from trusted producers in ${product.origin}. This listing reflects our standard retail and bulk pricing until full product copy is available from the marketplace API.`,
    ingredientsOrigin: `Origin: ${product.origin}. Size: ${product.sizeLabel}. Certified organic where indicated on the product badge.`,
    nutrition: "Nutrition information will be published per SKU when supplier data is connected.",
    shipping:
      "Orders ship from our Canadian fulfillment network. Free shipping applies on orders over $150. Estimated delivery windows vary by province.",
  };
}

const detailOverrides: Partial<Record<string, Partial<ProductDetail>>> = {
  "red-palm-oil": {
    displayName: "Organic Nigerian Palm Oil",
    description:
      "Sourced from traditional oil palm plantations in Southern Nigeria, our Grade A palm oil is cold-pressed to preserve its rich nutrients, antioxidants, and authentic nutty flavor. Perfect for soups, stews, and traditional West African dishes.",
    images: [
      "/images/products/red-palm-oil.png",
      "/images/products/red-palm-oil.png",
      "/images/products/red-palm-oil.png",
      "/images/products/red-palm-oil.png",
      "/images/products/red-palm-oil.png",
    ],
    reviewCount: 48,
    rating: 5,
    sizeOptions: [
      {
        id: "1l",
        label: "1 Litre",
        retailPrice: 18.99,
        bulkPrice: 16.99,
        bulkLabel: "Buy 10 or more",
      },
      {
        id: "2l",
        label: "2 Litre",
        retailPrice: 34.99,
        bulkPrice: 31.99,
        bulkLabel: "Buy 10 or more",
      },
      {
        id: "5l",
        label: "5 Litre",
        retailPrice: 79.99,
        bulkPrice: 72.5,
        bulkLabel: "Buy 10 or more",
      },
    ],
    accordion: {
      productDescription:
        "Our Grade A red palm oil is cold-pressed from sustainably harvested oil palm fruit in Southern Nigeria. The vibrant orange-red color and rich aroma are hallmarks of authentic West African palm oil, ideal for egusi soup, palm nut soup, jollof rice, and everyday cooking.",
      ingredientsOrigin:
        "100% pure red palm oil. Origin: Nigeria. No additives, preservatives, or artificial coloring.",
      nutrition:
        "Rich in vitamin E and beta-carotene. Serving size 1 tbsp (14g). Calories 120. Total fat 14g. Not a significant source of trans fat, cholesterol, or sodium.",
      shipping:
        "Ships within 1–2 business days from our Toronto warehouse. Estimated delivery to most Canadian addresses in 3–5 business days. Refrigeration not required; store in a cool, dark place.",
    },
    deliveryEstimate: "Estimated delivery: Sep 2–5 to Canada",
    relatedProductIds: [
      "ground-egusi",
      "honey-beans",
      "yellow-garri",
      "smoked-crayfish",
    ],
  },
};

function defaultRelatedIds(slug: string): string[] {
  const pool = allCatalogProducts()
    .map((product) => product.slug)
    .filter((id) => id !== slug);

  return pool.slice(0, 4);
}

export function getProductBySlug(slug: string): Product | undefined {
  return allCatalogProducts().find((product) => product.slug === slug);
}

export function getProductDetail(slug: string): ProductDetail | undefined {
  const product = getProductBySlug(slug);
  if (!product) return undefined;

  const override = detailOverrides[slug];
  const sizeOptions = override?.sizeOptions ?? defaultSizeOptions(product);
  const primarySize = sizeOptions[0];

  return {
    ...product,
    retailPrice: primarySize.retailPrice,
    bulkPrice: primarySize.bulkPrice,
    bulkLabel: primarySize.bulkLabel,
    displayName: override?.displayName,
    description:
      override?.description ??
      `${product.name} from ${product.origin} — ${product.sizeLabel}. Authentic African pantry staple available for retail and bulk purchase.`,
    images: override?.images ?? [product.imageUrl, product.imageUrl, product.imageUrl],
    reviewCount: override?.reviewCount ?? 12,
    rating: override?.rating ?? 5,
    sizeOptions,
    accordion: override?.accordion ?? defaultAccordion(product),
    deliveryEstimate:
      override?.deliveryEstimate ?? "Estimated delivery: Sep 2–5 to Canada",
    relatedProductIds: override?.relatedProductIds ?? defaultRelatedIds(slug),
  };
}

export function getRelatedProducts(slug: string): Product[] {
  const detail = getProductDetail(slug);
  if (!detail) return [];

  return detail.relatedProductIds
    .map((id) => getProductBySlug(id))
    .filter((product): product is Product => Boolean(product));
}
