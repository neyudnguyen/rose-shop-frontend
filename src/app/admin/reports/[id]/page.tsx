import React from 'react';

export default async function ReportDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Report #{id}</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="font-semibold text-lg">Report Information</h2>
                        <p className="text-gray-600">Submitted on: May 24, 2025</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                        Pending
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h3 className="font-medium mb-2">Reporter Information</h3>
                            <p>User ID: 1</p>
                            <p>Username: User123</p>
                            <p>Email: user@example.com</p>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Reported Content</h3>
                            <p>Product ID: 1</p>
                            <p>Product Name: Sample Flower</p>
                            <p>Seller ID: 1</p>
                            <p>Seller: Sample Shop</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-medium mb-2">Report Reason</h3>
                        <p>Invalid description</p>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Report Description</h3>
                        <p>The product description does not match the actual product.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="font-semibold text-lg mb-4">Report Actions</h2>
                <div className="flex space-x-2">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Mark as Resolved
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Dismiss Report
                    </button>
                </div>
            </div>
        </div>
    );
}
