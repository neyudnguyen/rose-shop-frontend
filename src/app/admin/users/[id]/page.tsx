import React from 'react';

export default function UserDetailPage({ params }: { params: { id: string } }) {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">User Details #{params.id}</h1>

			<div className="bg-white rounded-lg shadow-md p-6 mb-6">
				<div className="flex items-start">
					<div className="w-32 h-32 bg-gray-200 rounded-full mr-6 flex items-center justify-center">
						<span className="text-gray-500">No Image</span>
					</div>

					<div className="flex-1">
						<h2 className="text-xl font-semibold mb-2">User Name</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="text-gray-600">Email: user@example.com</p>
								<p className="text-gray-600">Role: User</p>
								<p className="text-gray-600">Status: Active</p>
							</div>
							<div>
								<p className="text-gray-600">Joined: May 1, 2025</p>
								<p className="text-gray-600">Orders: 0</p>
								<p className="text-gray-600">Points: 100</p>
							</div>
						</div>

						<div className="mt-4 flex space-x-2">
							{/* Status buttons */}
							<button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
								Deactivate User
							</button>
							<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
								Edit User
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold mb-4">User Activity</h2>

				<div className="border-t pt-4">
					<div className="mb-4">
						<h3 className="font-medium mb-2">Recent Orders</h3>
						<p className="text-gray-500">No recent orders found.</p>
					</div>

					<div>
						<h3 className="font-medium mb-2">Recent Reports</h3>
						<p className="text-gray-500">No reports submitted by this user.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
