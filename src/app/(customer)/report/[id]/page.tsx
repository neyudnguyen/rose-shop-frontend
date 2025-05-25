import React from 'react';

export default function ReportProductPage({
	params,
}: {
	params: { id: string };
}) {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl font-bold mb-6">Report Product #{params.id}</h1>
			<p>Report form will be implemented here</p>
		</div>
	);
}
