"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Package, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { formatOrderDate } from "@/lib/mocks/customer-orders";
import { mockReorderProducts } from "@/lib/mocks/reorder-products";
import { formatCad } from "@/lib/utils";

/** Reorder list table — Figma `dashboard-reorder-list` `29:349` */
export function ReorderList() {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(mockReorderProducts.map((item) => [item.productId, 1])),
  );

  function updateQuantity(productId: string, delta: number) {
    setQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, (current[productId] ?? 1) + delta),
    }));
  }

  function addProductToCart(productId: string) {
    const product = mockReorderProducts.find((item) => item.productId === productId);
    if (!product) return;

    addItem({
      productId: product.productId,
      slug: product.slug,
      name: product.name,
      unitPrice: product.unitPrice,
      sizeLabel: product.sizeLabel,
      imageUrl: product.imageUrl,
      quantity: quantities[productId] ?? 1,
    });
  }

  function addAllToCart() {
    for (const product of mockReorderProducts) {
      addItem({
        productId: product.productId,
        slug: product.slug,
        name: product.name,
        unitPrice: product.unitPrice,
        sizeLabel: product.sizeLabel,
        imageUrl: product.imageUrl,
        quantity: quantities[product.productId] ?? 1,
      });
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-foreground">
            Reorder List
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Quickly restock your most frequently ordered wholesale products
          </p>
        </div>
        <Button type="button" className="h-12 rounded-xl px-6" onClick={addAllToCart}>
          <ShoppingCart className="mr-2 h-[18px] w-[18px]" aria-hidden />
          Add All to Cart
        </Button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="hidden grid-cols-[minmax(0,1fr)_150px_120px_120px_140px] gap-4 border-b border-border px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
          <span>Product Details</span>
          <span>Last Ordered</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Action</span>
        </div>

        <ul>
          {mockReorderProducts.map((product) => (
            <li
              key={product.productId}
              className="border-b border-border px-6 py-5 last:border-b-0"
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_150px_120px_120px_140px] lg:items-center">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <Package className="h-5 w-5 text-muted-foreground" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sizeLabel}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground lg:text-foreground">
                  {formatOrderDate(product.lastOrdered)}
                </p>
                <p className="font-semibold text-foreground">{formatCad(product.unitPrice)}</p>

                <div className="inline-flex h-[30px] w-[61px] items-center justify-between rounded-md border border-border px-2">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => updateQuantity(product.productId, -1)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Minus className="h-3 w-3" aria-hidden />
                  </button>
                  <span className="text-sm font-medium">{quantities[product.productId] ?? 1}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateQuantity(product.productId, 1)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-3 w-3" aria-hidden />
                  </button>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-[33px] justify-self-start rounded-lg"
                  onClick={() => addProductToCart(product.productId)}
                >
                  Add to Cart
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
