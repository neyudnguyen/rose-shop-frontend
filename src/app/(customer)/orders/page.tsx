import OrderTrackingPage from '@/components/customer/orders/OrderTrackingPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | Rose Shop',
  description: 'Track and manage your flower orders from Rose Shop.',
};

const OrdersPage = () => {
  return (
    <div className="mx-auto pt-24 pb-16">
      <OrderTrackingPage />
    </div>
  );
};

export default OrdersPage;