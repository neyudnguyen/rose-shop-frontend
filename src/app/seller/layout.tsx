import React from 'react';
import Link from 'next/link';

export default function SellerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="w-64 bg-gradient-to-b from-pink-500 to-pink-700 text-white p-5">
				<div className="mb-8">
					<h1 className="text-2xl font-bold">Seller Dashboard</h1>
				</div>
				<nav>
					<ul className="space-y-3">
						<li>
							<Link href="/seller" className="block p-2 hover:bg-pink-600 rounded-md">
								Dashboard
							</Link>
						</li>
						<li>
							<Link href="/seller/products" className="block p-2 hover:bg-pink-600 rounded-md">
								Product Management
							</Link>
						</li>
						<li>
							<Link href="/seller/orders" className="block p-2 hover:bg-pink-600 rounded-md">
								Manage Orders
							</Link>
						</li>
						<li>
							<Link href="/seller/distribute-vouchers" className="block p-2 hover:bg-pink-600 rounded-md">
								Distribute Vouchers
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<main className="flex-1 p-8 bg-gray-50">{children}</main>
		</div>
	);
}
