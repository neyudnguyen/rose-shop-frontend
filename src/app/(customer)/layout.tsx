import type { Metadata } from 'next';

import Header from '@/components/customer/common/Header';

export const metadata: Metadata = {
	title: 'Rose Shop | #1 Flower Shop at FPT',
	description:
		'Discover the world of fresh flowers at Rose Shop - where the most beautiful bouquets are brought to you.',
};

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};
export default Layout;
