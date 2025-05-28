import React from 'react';

export default async function EditProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Edit Product #{id}</h1>

			<div className="bg-white rounded-lg shadow-md p-6">
				<form>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Flower Name
						</label>
						<input
							type="text"
							id="name"
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Enter flower name"
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Description
						</label>
						<textarea
							id="description"
							rows={4}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Enter flower description"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="price"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Price
							</label>
							<input
								type="number"
								id="price"
								className="w-full p-2 border border-gray-300 rounded-md"
								placeholder="0.00"
								step="0.01"
							/>
						</div>

						<div>
							<label
								htmlFor="quantity"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Available Quantity
							</label>
							<input
								type="number"
								id="quantity"
								className="w-full p-2 border border-gray-300 rounded-md"
								placeholder="0"
								min="0"
							/>
						</div>
					</div>

					<div className="mb-4">
						<label
							htmlFor="category"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Category
						</label>
						<select
							id="category"
							className="w-full p-2 border border-gray-300 rounded-md"
						>
							<option value="">Select a category</option>
						</select>
					</div>

					<div className="mb-6">
						<label
							htmlFor="image"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Product Image
						</label>
						<input
							type="file"
							id="image"
							className="w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
						>
							Update Product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
