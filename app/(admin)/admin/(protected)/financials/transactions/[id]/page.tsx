import type { Metadata } from "next";
import { TransactionReceiptPage } from "@/components/admin/financials/TransactionReceiptPage";
import { getAdminTransactionReceipt } from "@/lib/mocks/admin-transaction-receipt";

export const metadata: Metadata = {
  title: "Transaction Receipt · Admin · AFW Marketplace",
};

export default async function AdminTransactionReceiptRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const receipt = getAdminTransactionReceipt(id);
  return <TransactionReceiptPage receipt={receipt} />;
}
