"use client";
import React, { useState } from 'react';

export default function ProductManagementPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Product Management</h1>
				<button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700" onClick={handleOpenModal}>
					Add New Product
				</button>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-4 border-b">
					<h2 className="font-semibold">Your Products</h2>
				</div>

				<div className="p-6 text-gray-500">
					You haven't added any products yet.
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white rounded-lg shadow-lg p-6 w-96">
						<h2 className="text-lg font-bold mb-4">Add New Product</h2>
						<form>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Product Images</label>
								<input type="file" className="w-full border border-gray-400 rounded-md p-2" />
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Product Name</label>
								<input type="text" className="w-full border border-gray-400 rounded-md p-2" />
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Description</label>
								<textarea className="w-full border border-gray-400 rounded-md p-2"></textarea>
							</div>
							<div className="mb-4 flex gap-4">
								<div>
									<label className="block text-sm font-medium mb-1">Price</label>
									<input type="number" className="w-full border border-gray-400 rounded-md p-2" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Quantity</label>
									<input type="number" className="w-full border border-gray-400 rounded-md p-2" />
								</div>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Category</label>
								<select className="w-full border border-gray-400 rounded-md p-2">
									<option>Single Flowers</option>
									<option>Bouquets</option>
									<option>Plants</option>
								</select>
							</div>
							<div className="flex justify-end gap-4">
								<button
									type="button"
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
									onClick={handleCloseModal}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
								>
									Add Product
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
