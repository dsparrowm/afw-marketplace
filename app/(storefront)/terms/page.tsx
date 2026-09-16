import type { Metadata } from "next";
import { PolicyPage } from "@/components/storefront/PolicyPage";
import { termsOfService } from "@/lib/storefront/policies";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return <PolicyPage document={termsOfService} />;
}
