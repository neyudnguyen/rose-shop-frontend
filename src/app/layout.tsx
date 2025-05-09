import type { Metadata } from 'next';

import '@/app/globals.css';

export const metadata: Metadata = {
	title: 'Rose Shop | Shop hoa #1 tại FPT',
	description:
		'Khám phá thế giới hoa tươi tại Rose Shop - nơi mang đến những bó hoa đẹp nhất cho bạn.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
