import { OrderConfirmationPage } from "@/components/storefront/OrderConfirmationPage";

type OrderConfirmationRouteProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderConfirmationRoute({
  params,
}: OrderConfirmationRouteProps) {
  const { id } = await params;
  return <OrderConfirmationPage orderId={id} />;
}
