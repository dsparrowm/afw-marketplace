import { StorefrontCartShell } from "@/components/storefront/StorefrontCartShell";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StorefrontCartShell>{children}</StorefrontCartShell>;
}
