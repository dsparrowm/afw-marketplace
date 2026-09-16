import { productImages } from "@/lib/brand/assets";

export type CommercialModel = "retail" | "wholesale" | "both";

export type ProductFormTier = {
  id: string;
  quantityLabel: string;
  price: string;
};

export type ProductFormValues = {
  name: string;
  description: string;
  sku: string;
  autoSku: boolean;
  commercialModel: CommercialModel;
  retailPrice: string;
  wholesaleBase: string;
  tiers: ProductFormTier[];
  category: string;
  origin: string;
  organic: boolean;
  unitType: string;
  sizeWeight: string;
  stockQty: string;
  lowStockAlert: string;
  warehouseLocation: string;
  weightKg: string;
  dimL: string;
  dimW: string;
  dimH: string;
  shippingClass: string;
  previewImage: string | null;
};

export const adminProductCategories = [
  "Rice & Grains",
  "Spices & Seasonings",
  "Oils & Liquids",
  "Seeds & Grains",
  "Flours & Tubers",
  "Snacks",
] as const;

export const adminProductOrigins = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "Cameroon",
] as const;

export const adminUnitTypes = ["kg", "g", "L", "unit"] as const;

export const adminWarehouseLocations = [
  "Warehouse A — Aisle 3",
  "Warehouse A — Aisle 1",
  "Warehouse B — Cold Storage",
] as const;

export const adminShippingClasses = [
  "Standard Shipping",
  "Express Shipping",
  "Freight",
] as const;

/** Prefill from Figma `79:178` */
export const adminProductFormDefaults: ProductFormValues = {
  name: "Nigerian Jollof Rice Mix",
  description:
    "Authentic single-origin Nigerian Jollof Rice seasoning blend, crafted carefully with sun-dried red bell peppers...",
  sku: "AFW-PRD-1048",
  autoSku: true,
  commercialModel: "both",
  retailPrice: "12.99",
  wholesaleBase: "9.49",
  tiers: [
    { id: "t1", quantityLabel: "24+ units", price: "9.49" },
    { id: "t2", quantityLabel: "48+ units", price: "8.99" },
    { id: "t3", quantityLabel: "100+ units", price: "7.99" },
  ],
  category: "Rice & Grains",
  origin: "Nigeria",
  organic: true,
  unitType: "kg",
  sizeWeight: "1.2",
  stockQty: "342",
  lowStockAlert: "20",
  warehouseLocation: "Warehouse A — Aisle 3",
  weightKg: "1.2",
  dimL: "15",
  dimW: "10",
  dimH: "8",
  shippingClass: "Standard Shipping",
  previewImage: productImages.redPalmOil,
};
