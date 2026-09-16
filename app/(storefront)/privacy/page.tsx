import type { Metadata } from "next";
import { PolicyPage } from "@/components/storefront/PolicyPage";
import { privacyPolicy } from "@/lib/storefront/policies";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return <PolicyPage document={privacyPolicy} />;
}
