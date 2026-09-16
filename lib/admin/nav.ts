import type { LucideIcon } from "lucide-react";
import {
  Archive,
  CircleHelp,
  KeySquare,
  LayoutGrid,
  Percent,
  ReceiptText,
  Settings,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/** Primary sidebar nav — Figma `72:15` nav-rack */
export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/products", label: "Products", icon: Archive },
  { href: "/admin/inventory", label: "Inventory", icon: Warehouse },
  { href: "/admin/orders", label: "Orders & Delivery", icon: Truck },
  { href: "/admin/financials", label: "Financials", icon: ReceiptText },
  { href: "/admin/promotions", label: "Promotions", icon: Percent },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/access", label: "Access", icon: KeySquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export const adminHelpItem = {
  href: "/admin/help",
  label: "Help & Support",
  icon: CircleHelp,
} as const;

export function isAdminNavActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
