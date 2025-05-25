import React from 'react';

export default function SellerDashboardPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Total Products</h2>
					<p className="text-3xl font-bold text-pink-600">0</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
					<p className="text-3xl font-bold text-pink-600">0</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Total Sales</h2>
					<p className="text-3xl font-bold text-pink-600">$0</p>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
				<div className="bg-white rounded-lg shadow-md">
					<p className="p-6 text-gray-500">No recent orders</p>
				</div>
			</div>
		</div>
	);
}
