import React from 'react';

export default function StatisticsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">System Statistics</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">User Statistics</h2>
					<div className="h-64 flex items-center justify-center bg-gray-100 rounded">
						<p className="text-gray-500">
							User growth chart will be displayed here
						</p>
					</div>
					<div className="mt-4 grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium">Total Users</h3>
							<p className="text-2xl font-bold text-purple-600">0</p>
						</div>
						<div>
							<h3 className="font-medium">New Users (Last 30 days)</h3>
							<p className="text-2xl font-bold text-purple-600">0</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">Sales Statistics</h2>
					<div className="h-64 flex items-center justify-center bg-gray-100 rounded">
						<p className="text-gray-500">Sales chart will be displayed here</p>
					</div>
					<div className="mt-4 grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium">Total Sales</h3>
							<p className="text-2xl font-bold text-purple-600">$0</p>
						</div>
						<div>
							<h3 className="font-medium">Monthly Sales</h3>
							<p className="text-2xl font-bold text-purple-600">$0</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">Product Statistics</h2>
					<div className="h-64 flex items-center justify-center bg-gray-100 rounded">
						<p className="text-gray-500">
							Product statistics chart will be displayed here
						</p>
					</div>
					<div className="mt-4 grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium">Total Products</h3>
							<p className="text-2xl font-bold text-purple-600">0</p>
						</div>
						<div>
							<h3 className="font-medium">Top Category</h3>
							<p className="text-2xl font-bold text-purple-600">None</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h2 className="text-xl font-semibold mb-4">Order Statistics</h2>
					<div className="h-64 flex items-center justify-center bg-gray-100 rounded">
						<p className="text-gray-500">
							Order statistics chart will be displayed here
						</p>
					</div>
					<div className="mt-4 grid grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium">Total Orders</h3>
							<p className="text-2xl font-bold text-purple-600">0</p>
						</div>
						<div>
							<h3 className="font-medium">Average Order Value</h3>
							<p className="text-2xl font-bold text-purple-600">$0</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
