import type { Metadata } from "next";
import { PolicyPage } from "@/components/storefront/PolicyPage";
import { returnsPolicy } from "@/lib/storefront/policies";

export const metadata: Metadata = {
  title: "Returns",
};

export default function ReturnsPage() {
  return <PolicyPage document={returnsPolicy} />;
}
