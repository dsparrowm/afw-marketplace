import type { Metadata } from "next";
import { PolicyPage } from "@/components/storefront/PolicyPage";
import { shippingPolicy } from "@/lib/storefront/policies";

export const metadata: Metadata = {
  title: "Shipping Policy",
};

export default function ShippingPolicyPage() {
  return <PolicyPage document={shippingPolicy} />;
}
