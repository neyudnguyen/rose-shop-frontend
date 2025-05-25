import React from 'react';

export default function CategoryManagementPage() {
	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Category Management</h1>
				<button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
					Add New Category
				</button>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-4 border-b">
					<h2 className="font-semibold">All Categories</h2>
				</div>

				<div className="p-6 text-gray-500">No categories found.</div>
			</div>
		</div>
	);
}
