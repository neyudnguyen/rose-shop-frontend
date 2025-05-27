import React from 'react';
export default function AdminDashboard() {
  
  const stats = [
    { label: 'Total Users', value: 1345 },
    { label: 'Active Vouchers', value: 256 },
    { label: 'Revenue', value: '$12,345' },
    { label: 'New Signups', value: 43 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
