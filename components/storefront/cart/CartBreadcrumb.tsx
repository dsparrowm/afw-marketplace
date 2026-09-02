import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CartBreadcrumb() {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="transition-colors hover:text-brand-green">
        Home
      </Link>
      <ChevronRight className="h-2.5 w-2.5 opacity-60" aria-hidden />
      <span className="font-medium text-foreground">Cart</span>
    </nav>
  );
}
