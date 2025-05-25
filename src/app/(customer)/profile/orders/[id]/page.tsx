import React from 'react';

export default function OrderDetailPage({
	params,
}: {
	params: { id: string };
}) {
	return (
		<div className="bg-white rounded-lg shadow p-6">
			<h1 className="text-2xl font-bold mb-6">Order #{params.id}</h1>
			<p>Order details will be displayed here</p>
		</div>
	);
}
