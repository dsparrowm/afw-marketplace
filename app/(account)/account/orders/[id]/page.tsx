import { OrderDetailView } from "@/components/account/OrderDetailView";

type AccountOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AccountOrderDetailPage({
  params,
}: AccountOrderDetailPageProps) {
  const { id } = await params;
  return <OrderDetailView orderId={id} />;
}
