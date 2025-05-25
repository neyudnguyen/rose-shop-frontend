import React from 'react';

export default function SellerOrdersPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

			<div className="mb-6">
				<div className="flex space-x-2">
					<button className="bg-pink-600 text-white px-4 py-2 rounded-md">
						All Orders
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Pending
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Accepted
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Delivered
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Canceled
					</button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-6 text-gray-500">No orders found.</div>
			</div>
		</div>
	);
}
