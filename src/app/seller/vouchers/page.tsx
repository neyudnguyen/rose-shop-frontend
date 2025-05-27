"use client";
import React, { useState } from 'react';

export default function SellerVouchersPage() {
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
				<h1 className="text-2xl font-bold">Distribute Vouchers</h1>
				<button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700" onClick={handleOpenModal}>
					Create New Voucher
				</button>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-4 border-b">
					<h2 className="font-semibold">Your Vouchers</h2>
				</div>

				<div className="p-6 text-gray-500">
					You have not created any vouchers yet.
				</div>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
						<h1 className="text-2xl font-bold mb-6">Create New Voucher</h1>
						<form>
							<div className="mb-4">
								<label
									htmlFor="code"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Voucher Code
								</label>
								<input
									type="text"
									id="code"
									className="w-full p-2 border border-gray-300 rounded-md"
									placeholder="e.g., SUMMER2025"
								/>
							</div>

							<div className="mb-4">
								<label
									htmlFor="discount"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Discount Percentage
								</label>
								<input
									type="number"
									id="discount"
									className="w-full p-2 border border-gray-300 rounded-md"
									placeholder="e.g., 10"
									min="0"
									max="100"
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
									rows={3}
									className="w-full p-2 border border-gray-300 rounded-md"
									placeholder="Enter voucher description"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<label
										htmlFor="startDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Start Date
									</label>
									<input
										type="date"
										id="startDate"
										className="w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
								<div>
									<label
										htmlFor="endDate"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										End Date
									</label>
									<input
										type="date"
										id="endDate"
										className="w-full p-2 border border-gray-300 rounded-md"
									/>
								</div>
							</div>
							<div className="mb-6">
								<label
									htmlFor="usageLimit"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Usage Limit
								</label>
								<input
									type="number"
									id="usageLimit"
									className="w-full p-2 border border-gray-300 rounded-md"
									placeholder="Enter usage limit"
									min="1"
								/>
							</div>
							<div className="flex justify-end">
								<button
									type="button"
									className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
									onClick={handleCloseModal}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
								>
									Create Voucher
								</button>
							</div>
						</form>
					</div>
				</div>
			)}


		</div>
	);


}
