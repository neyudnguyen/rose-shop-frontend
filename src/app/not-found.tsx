import { Metadata } from 'next';

import NotFoundComponent from '@/components/404/NotFoundComponent';

export const metadata: Metadata = {
	title: 'Rose Shop | 404 - Not Found',
	description:
		'Discover the world of fresh flowers at Rose Shop - where the most beautiful bouquets are brought to you.',
};

const NotFound = () => {
	return <NotFoundComponent />;
};

export default NotFound;
