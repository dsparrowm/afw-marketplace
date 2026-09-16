import { productImages } from "@/lib/brand/assets";

export type AdminProductStatus = "active" | "low-stock" | "draft-out-of-stock";

export type AdminProductRow = {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: AdminProductStatus;
  origin: string;
  imageSrc: string | null;
};

/** Page-1 rows from Figma `72:249` — total catalog size is decorative (284). */
export const ADMIN_PRODUCTS_TOTAL = 284;
export const ADMIN_PRODUCTS_PAGE_SIZE = 8;

export const adminProductRows: AdminProductRow[] = [
  {
    id: "jollof-spice",
    name: "Jollof Rice Spice Mix",
    category: "Spices & Seasonings",
    price: "$12.80",
    stock: 142,
    status: "active",
    origin: "Nigeria",
    imageSrc: productImages.honeyBeans,
  },
  {
    id: "palm-oil",
    name: "Organic Palm Oil (1L)",
    category: "Oils & Liquids",
    price: "$18.50",
    stock: 4,
    status: "low-stock",
    origin: "Nigeria",
    imageSrc: productImages.redPalmOil,
  },
  {
    id: "ogbono",
    name: "Dried Ogbono Seeds (500g)",
    category: "Seeds & Grains",
    price: "$24.00",
    stock: 2,
    status: "low-stock",
    origin: "Nigeria",
    imageSrc: productImages.whitePunaYam,
  },
  {
    id: "suya",
    name: "Suya Spice Blend (100g)",
    category: "Spices & Seasonings",
    price: "$8.00",
    stock: 0,
    status: "draft-out-of-stock",
    origin: "Nigeria",
    imageSrc: null,
  },
  {
    id: "cassava",
    name: "Cassava Flour (Gari) 2kg",
    category: "Flours & Tubers",
    price: "$14.50",
    stock: 89,
    status: "active",
    origin: "Nigeria",
    imageSrc: productImages.yellowGarri,
  },
  {
    id: "egusi",
    name: "Egusi Seeds (500g)",
    category: "Seeds & Grains",
    price: "$26.00",
    stock: 63,
    status: "active",
    origin: "Nigeria",
    imageSrc: productImages.honeyBeans,
  },
  {
    id: "crayfish",
    name: "Dried Crayfish (Large Bag)",
    category: "Seafood & Dried Fish",
    price: "$45.00",
    stock: 19,
    status: "active",
    origin: "Nigeria",
    imageSrc: productImages.whitePunaYam,
  },
  {
    id: "plantain",
    name: "Plantain Chips (Sweet Box)",
    category: "Snacks",
    price: "$3.00",
    stock: 210,
    status: "active",
    origin: "Nigeria",
    imageSrc: productImages.yellowGarri,
  },
];

export const adminProductCategories = [
  "All",
  ...Array.from(new Set(adminProductRows.map((row) => row.category))).sort(),
] as const;

export const adminProductStatuses = [
  { value: "All", label: "All" },
  { value: "active", label: "Active" },
  { value: "low-stock", label: "Low Stock" },
  { value: "draft-out-of-stock", label: "Draft / Out of Stock" },
] as const;

export const adminProductOrigins = ["Nigeria", "Ghana", "All"] as const;

export function filterAdminProducts(
  rows: AdminProductRow[],
  filters: {
    search: string;
    category: string;
    status: string;
    origin: string;
  },
): AdminProductRow[] {
  const q = filters.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (q && !row.name.toLowerCase().includes(q)) return false;
    if (filters.category !== "All" && row.category !== filters.category) {
      return false;
    }
    if (filters.status !== "All" && row.status !== filters.status) return false;
    if (filters.origin !== "All" && row.origin !== filters.origin) return false;
    return true;
  });
}
