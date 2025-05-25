import React from 'react';

export default function UserManagementPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">User Management</h1>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-4 border-b flex justify-between items-center">
					<h2 className="font-semibold">All Users</h2>
					<div className="flex space-x-2">
						<select className="border border-gray-300 rounded-md p-2">
							<option value="all">All Users</option>
							<option value="admin">Admins</option>
							<option value="seller">Sellers</option>
							<option value="user">Regular Users</option>
						</select>
						<input
							type="text"
							placeholder="Search users..."
							className="border border-gray-300 rounded-md p-2"
						/>
					</div>
				</div>

				<div className="p-6 text-gray-500">No users found.</div>
			</div>
		</div>
	);
}
