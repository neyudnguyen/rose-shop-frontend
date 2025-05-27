import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="w-64 bg-gradient-to-b from-purple-800 to-purple-900 text-white p-5">
				<div className="mb-8">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
				</div>{' '}
				<nav>
					<ul className="space-y-3">
						<li>
							<Link
								href="/admin"
								className="block p-2 hover:bg-purple-700 rounded-md"
							>
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								href="/admin/users"
								className="block p-2 hover:bg-purple-700 rounded-md"
							>
								User Management
							</Link>
						</li>
						<li>
							<Link
								href="/admin/categories"
								className="block p-2 hover:bg-purple-700 rounded-md"
							>
								Category Management
							</Link>
						</li>
						<li>
							<Link
								href="/admin/reports"
								className="block p-2 hover:bg-purple-700 rounded-md"
							>
								Report Management
							</Link>
						</li>
						<li>
							<Link
								href="/admin/statistics"
								className="block p-2 hover:bg-purple-700 rounded-md"
							>
								System Statistics
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<main className="flex-1 p-8 bg-gray-50">{children}</main>
		</div>
	);
}
