import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <ShoppingBag className="h-8 w-8" aria-hidden />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-foreground">Your cart is empty</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        Discover authentic African pantry staples and add items to your cart before checkout.
      </p>
      <Button asChild className="mt-8 bg-brand-green text-brand-green-foreground hover:bg-brand-green/90">
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>
  );
}
