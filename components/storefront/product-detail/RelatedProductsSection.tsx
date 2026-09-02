import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatCadParts } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type RelatedProductCardProps = {
  product: Product;
};

export function RelatedProductCard({ product }: RelatedProductCardProps) {
  const price = formatCadParts(product.retailPrice);

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="flex h-48 items-center justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={266}
            height={192}
            className="h-full w-full object-contain"
          />
        </div>
      </Link>
      <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
        {product.sizeLabel} • {product.origin}
      </p>
      <Link href={`/shop/${product.slug}`}>
        <h3 className="mt-1 text-base font-semibold text-foreground hover:text-brand-green">
          {product.name}
        </h3>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xl font-bold text-foreground">{price.amount}</span>
        <Button
          type="button"
          size="icon"
          className="h-10 w-10 rounded-xl bg-brand-green text-brand-green-foreground hover:bg-brand-green/90"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </article>
  );
}

export type RelatedProductsSectionProps = {
  products: Product[];
  category?: string;
};

export function RelatedProductsSection({
  products,
  category,
}: RelatedProductsSectionProps) {
  if (products.length === 0) return null;

  const viewAllHref = category ? `/shop?category=${category}` : "/shop";

  return (
    <section className="mt-16 border-t border-border pt-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green/90"
        >
          View All Related
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
