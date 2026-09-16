import {
  adjustVariantStock,
  createProduct,
  createProductVariant,
  createVariantPriceTier,
  updateProduct,
  updateProductStatus,
  updateProductVariant,
} from "@/lib/api/products";
import {
  parseMoneyInput,
  parseTierMinQuantity,
  slugifyProductName,
} from "@/lib/admin/product-form-mappers";
import type { ProductFormValues } from "@/lib/mocks/admin-product-form";

export type SaveAdminProductInput = {
  mode: "add" | "edit";
  draft: boolean;
  values: ProductFormValues;
  categoryId: string;
  productId?: string | null;
  variantId?: string | null;
  initialStock?: number;
};

export type SaveAdminProductResult =
  | { ok: true; productId: string }
  | { ok: false; error: string };

export async function saveAdminProduct(
  input: SaveAdminProductInput,
): Promise<SaveAdminProductResult> {
  const { values, categoryId, draft } = input;
  const name = values.name.trim();
  if (!name) return { ok: false, error: "Product name is required." };
  if (!categoryId) return { ok: false, error: "Category is required." };

  const retailPrice = parseMoneyInput(values.retailPrice);
  if (retailPrice <= 0) {
    return { ok: false, error: "Retail price must be greater than zero." };
  }

  const lowStock = Number.parseInt(values.lowStockAlert, 10);
  const stockQty = Number.parseInt(values.stockQty, 10);
  const weight = parseMoneyInput(values.weightKg || values.sizeWeight);
  const sku =
    values.sku.trim() ||
    `AFW-${slugifyProductName(name).slice(0, 12).toUpperCase()}-${Date.now()
      .toString(36)
      .slice(-4)
      .toUpperCase()}`;
  const label =
    values.sizeWeight.trim() ||
    (values.unitType ? `1 ${values.unitType}` : "Standard");
  const images = values.previewImage ? [values.previewImage] : [];
  const isWholesaleEligible = values.commercialModel !== "retail";

  try {
    if (input.mode === "add") {
      const slug = `${slugifyProductName(name)}-${Date.now().toString(36)}`;
      const product = await createProduct(
        {
          name,
          slug,
          categoryId,
          description: values.description.trim(),
          images,
          countryOfOrigin: values.origin,
          brand: "African Food Warehouse",
          isWholesaleEligible,
          lowStockThreshold: Number.isFinite(lowStock) ? lowStock : 10,
        },
        { auth: "session" },
      );

      const variant = await createProductVariant(
        product.id,
        {
          label,
          sku,
          unitRetailPrice: retailPrice,
          stockQuantity: Number.isFinite(stockQty) ? stockQty : 0,
          lowStockThreshold: Number.isFinite(lowStock) ? lowStock : 10,
          weight: weight > 0 ? weight : undefined,
        },
        { auth: "session" },
      );

      const tiers =
        values.tiers.length > 0
          ? values.tiers
          : values.wholesaleBase
            ? [
                {
                  id: "base",
                  quantityLabel: "10+ units",
                  price: values.wholesaleBase,
                },
              ]
            : [];

      for (const tier of tiers) {
        const minQuantity = parseTierMinQuantity(tier.quantityLabel);
        const price = parseMoneyInput(tier.price);
        if (price <= 0) continue;
        await createVariantPriceTier(
          variant.id,
          {
            minQuantity,
            price,
            label: tier.quantityLabel.trim() || `${minQuantity}+ units`,
          },
          { auth: "session" },
        );
      }

      if (draft) {
        await updateProductStatus(
          product.id,
          { status: "hidden" },
          { auth: "session" },
        );
      }

      return { ok: true, productId: product.id };
    }

    const productId = input.productId;
    if (!productId) return { ok: false, error: "Missing product id for edit." };

    await updateProduct(
      productId,
      {
        name,
        description: values.description.trim(),
        categoryId,
        images,
        countryOfOrigin: values.origin,
        isWholesaleEligible,
        lowStockThreshold: Number.isFinite(lowStock) ? lowStock : undefined,
      },
      { auth: "session" },
    );

    if (input.variantId) {
      await updateProductVariant(
        input.variantId,
        {
          label,
          sku,
          unitRetailPrice: retailPrice,
          lowStockThreshold: Number.isFinite(lowStock) ? lowStock : undefined,
          weight: weight > 0 ? weight : undefined,
        },
        { auth: "session" },
      );

      const nextStock = Number.isFinite(stockQty) ? stockQty : 0;
      const prevStock = input.initialStock ?? 0;
      const delta = nextStock - prevStock;
      if (delta !== 0) {
        await adjustVariantStock(
          input.variantId,
          { delta },
          { auth: "session" },
        );
      }
    } else {
      await createProductVariant(
        productId,
        {
          label,
          sku,
          unitRetailPrice: retailPrice,
          stockQuantity: Number.isFinite(stockQty) ? stockQty : 0,
          lowStockThreshold: Number.isFinite(lowStock) ? lowStock : 10,
          weight: weight > 0 ? weight : undefined,
        },
        { auth: "session" },
      );
    }

    await updateProductStatus(
      productId,
      { status: draft ? "hidden" : "active" },
      { auth: "session" },
    );

    return { ok: true, productId };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save product.";
    return { ok: false, error: message };
  }
}
