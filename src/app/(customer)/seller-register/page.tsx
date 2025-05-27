import SellerRegisterForm from '@/components/customer/seller-register/SellerRegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Seller | Rose Shop',
  description: 'Register as a seller on Rose Shop and start selling your flowers to customers nationwide.',
};

const SellerRegister = () => {
  return (
    <div className="mx-auto pt-24 pb-16 bg-[#fffaf0]">
      <SellerRegisterForm />
    </div>
  );
};

export default SellerRegister;
