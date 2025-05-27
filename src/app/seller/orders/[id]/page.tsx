import React from 'react';

export default function OrderDetailPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Order #1</h1>

			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<div className="flex justify-between items-center mb-4">
					<div>
						<h2 className="font-semibold text-lg">Order Information</h2>
						<p className="text-gray-600">Placed on: May 24, 2025</p>
					</div>
					<div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
						Pending
					</div>
				</div>

				<div className="border-t pt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium mb-2">Customer Information</h3>
							<p>Customer Name</p>
							<p>customer@example.com</p>
							<p>+1234567890</p>
						</div>
						<div>
							<h3 className="font-medium mb-2">Shipping Address</h3>
							<p>123 Main Street</p>
							<p>Apt 4B</p>
							<p>Cityville, State 12345</p>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 className="font-semibold text-lg mb-4">Order Items</h2>
				<div className="border-t pt-4">
					<p className="text-gray-500">No items in this order.</p>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="font-semibold text-lg mb-4">Order Actions</h2>
				<div className="flex space-x-2">
					<button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
						Accept Order
					</button>
					<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
						Mark as Delivered
					</button>
					<button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
						Cancel Order
					</button>
				</div>
			</div>
		</div>
	);
}
