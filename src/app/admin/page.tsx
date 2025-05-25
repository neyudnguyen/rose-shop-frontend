import React from 'react';

export default function AdminDashboardPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Total Users</h2>
					<p className="text-3xl font-bold text-purple-600">0</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Total Sellers</h2>
					<p className="text-3xl font-bold text-purple-600">0</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Total Products</h2>
					<p className="text-3xl font-bold text-purple-600">0</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-lg font-semibold mb-2">Pending Reports</h2>
					<p className="text-3xl font-bold text-purple-600">0</p>
				</div>
			</div>

			<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
					<div className="text-gray-500">No recent orders</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">Recent Users</h2>
					<div className="text-gray-500">No recent users</div>
				</div>
			</div>
		</div>
	);
}
