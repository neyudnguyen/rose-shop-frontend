import React from 'react';

export default function ProductManagementPage() {
	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Product Management</h1>
				<button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700">
					Add New Product
				</button>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-4 border-b">
					<h2 className="font-semibold">Your Products</h2>
				</div>

				<div className="p-6 text-gray-500">
					{"You haven't added any products yet."}
				</div>
			</div>
		</div>
	);
}
