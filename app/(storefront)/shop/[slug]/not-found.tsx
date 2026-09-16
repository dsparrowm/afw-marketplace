import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-20 text-center sm:px-10">
      <h1 className="text-3xl font-bold text-foreground">Product not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn&apos;t find that product. Browse the shop to discover African pantry staples.
      </p>
      <Button asChild className="mt-6">
        <Link href="/shop">Back to shop</Link>
      </Button>
    </div>
  );
}
