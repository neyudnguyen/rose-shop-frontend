import React from 'react';

export default async function ReportProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Report Product #{id}</h1>
            <p>Report form will be implemented here</p>
        </div>
    );
}
