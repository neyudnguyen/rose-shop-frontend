import Link from 'next/link';
import React from 'react';

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-wrap">
				<div className="w-full md:w-1/4 p-4">
					<div className="bg-white rounded-lg shadow p-4">
						<h3 className="text-lg font-semibold mb-4">Profile Menu</h3>{' '}
						<ul className="space-y-2">
							<li>
								<Link href="/profile" className="block hover:text-pink-500">
									Personal Information
								</Link>
							</li>
							<li>
								<Link
									href="/profile/addresses"
									className="block hover:text-pink-500"
								>
									My Addresses
								</Link>
							</li>
							<li>
								<Link
									href="/profile/orders"
									className="block hover:text-pink-500"
								>
									Order History
								</Link>
							</li>
							<li>
								<Link
									href="/profile/vouchers"
									className="block hover:text-pink-500"
								>
									My Vouchers
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="w-full md:w-3/4 p-4">{children}</div>
			</div>
		</div>
	);
}
