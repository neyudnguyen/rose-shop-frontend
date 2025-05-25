import React from 'react';

export default function ReportManagementPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Report Management</h1>

			<div className="mb-6">
				<div className="flex space-x-2">
					<button className="bg-purple-600 text-white px-4 py-2 rounded-md">
						All Reports
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Pending
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Resolved
					</button>
					<button className="bg-white text-gray-700 px-4 py-2 rounded-md border">
						Dismissed
					</button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-6 text-gray-500">No reports found.</div>
			</div>
		</div>
	);
}
