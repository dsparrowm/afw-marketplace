"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ProductDetail } from "@/types/product-detail";
import { cn } from "@/lib/utils";

type AccordionItem = {
  id: string;
  title: string;
  content: string;
};

export type ProductDetailAccordionsProps = {
  product: ProductDetail;
};

export function ProductDetailAccordions({ product }: ProductDetailAccordionsProps) {
  const items: AccordionItem[] = [
    {
      id: "description",
      title: "Product Description",
      content: product.accordion.productDescription,
    },
    {
      id: "ingredients",
      title: "Ingredients & Origin",
      content: product.accordion.ingredientsOrigin,
    },
    {
      id: "nutrition",
      title: "Nutrition Information",
      content: product.accordion.nutrition,
    },
    {
      id: "shipping",
      title: "Shipping & Delivery Policy",
      content: product.accordion.shipping,
    },
  ];

  const [openId, setOpenId] = useState<string>("description");

  return (
    <div className="mt-10 border-t border-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? "" : item.id)}
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-foreground">{item.title}</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" aria-hidden />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
              )}
            </button>
            <div
              className={cn(
                "overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all",
                isOpen ? "max-h-96 pb-4" : "max-h-0",
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
