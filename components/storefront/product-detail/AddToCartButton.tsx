"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AddToCartButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export function AddToCartButton({
  onClick,
  disabled = false,
  className,
}: AddToCartButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-16 flex-1 rounded-xl bg-brand-green text-base font-semibold text-brand-green-foreground hover:bg-brand-green/90",
        className,
      )}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      Add to Cart
    </Button>
  );
}
