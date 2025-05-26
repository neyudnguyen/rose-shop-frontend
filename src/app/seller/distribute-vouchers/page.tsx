'use client';
import React, { useState } from 'react';

type Voucher = {
  id: string;
  code: string;
  description: string;
  status: 'available' | 'distributed';
};

type User = {
  id: string;
  name: string;
};

type FilterStatus = 'all' | 'available' | 'distributed';

const sampleVouchers: Voucher[] = [
  { id: 'v1', code: 'DISC10', description: '10% off', status: 'available' },
  { id: 'v2', code: 'FREESHIP', description: 'Free Shipping', status: 'distributed' },
  { id: 'v3', code: 'WELCOME5', description: '$5 off for new users', status: 'available' },
];

const sampleUsers: User[] = [
  { id: 'u1', name: 'Alice' },
  { id: 'u2', name: 'Bob' },
  { id: 'u3', name: 'Charlie' },
];

export default function DistributeVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(sampleVouchers);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [message, setMessage] = useState<string | null>(null);

  // State cho form thêm voucher
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState<'available' | 'distributed'>('available');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FilterStatus;
    setFilterStatus(value);
  };

  const filteredVouchers = vouchers.filter(v =>
    filterStatus === 'all' ? true : v.status === filterStatus
  );

  const handleDistribute = () => {
    if (!selectedVoucherId) {
      setMessage('Please select a voucher to distribute.');
      return;
    }
    if (!selectedUserId) {
      setMessage('Please select a user to receive the voucher.');
      return;
    }

    const voucherIndex = vouchers.findIndex(v => v.id === selectedVoucherId);
    if (voucherIndex === -1 || vouchers[voucherIndex].status === 'distributed') {
      setMessage('This voucher has already been distributed or not found.');
      return;
    }

    const newVouchers = [...vouchers];
    newVouchers[voucherIndex] = {
      ...newVouchers[voucherIndex],
      status: 'distributed',
    };
    setVouchers(newVouchers);

    const userName = sampleUsers.find(u => u.id === selectedUserId)?.name ?? 'Unknown User';
    setMessage(`Voucher "${newVouchers[voucherIndex].code}" distributed to ${userName}.`);

    setSelectedVoucherId('');
    setSelectedUserId('');
  };

  const handleAddVoucher = () => {
    if (!newCode.trim() || !newDescription.trim()) {
      setMessage('Please fill in both code and description to add a voucher.');
      return;
    }

    const newVoucher: Voucher = {
      id: `v${vouchers.length + 1}`,
      code: newCode,
      description: newDescription,
      status: newStatus,
    };
    setVouchers([...vouchers, newVoucher]);
    setMessage(`Voucher "${newCode}" added successfully.`);

    // Reset form
    setNewCode('');
    setNewDescription('');
    setNewStatus('available');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Distribute Vouchers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="filterStatus" className="block text-sm font-semibold text-gray-600 mb-2">
            Filter by status:
          </label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="distributed">Distributed</option>
          </select>
        </div>

        <div>
          <label htmlFor="selectUser" className="block text-sm font-semibold text-gray-600 mb-2">
            Select user to distribute:
          </label>
          <select
            id="selectUser"
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="">-- Select User --</option>
            {sampleUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Vouchers</h2>
        {filteredVouchers.length === 0 ? (
          <p className="text-gray-500 italic">No vouchers match the filter.</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map(voucher => (
                <tr key={voucher.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 font-mono font-semibold">{voucher.code}</td>
                  <td className="p-3">{voucher.description}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${
                        voucher.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {voucher.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {voucher.status === 'available' ? (
                      <input
                        type="radio"
                        name="selectedVoucher"
                        checked={selectedVoucherId === voucher.id}
                        onChange={() => setSelectedVoucherId(voucher.id)}
                        className="accent-blue-500"
                        title={`Select voucher ${voucher.code}`}
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={handleDistribute}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Distribute Voucher
        </button>
      </div>

      {/* FORM NHẬP VOUCHER MỚI */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Voucher</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="newCode" className="block text-sm font-medium text-gray-600 mb-1">
              Code
            </label>
            <input
              id="newCode"
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. SAVE15"
            />
          </div>
          <div>
            <label htmlFor="newDescription" className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <input
              id="newDescription"
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 15% discount"
            />
          </div>
          <div>
            <label htmlFor="newStatus" className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              id="newStatus"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as 'available' | 'distributed')}
              className="w-full border rounded px-3 py-2"
            >
              <option value="available">Available</option>
              <option value="distributed">Distributed</option>
            </select>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleAddVoucher}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Add Voucher
          </button>
        </div>
      </div>

      {message && (
        <div
          className="mt-4 p-4 bg-blue-100 border border-blue-300 text-blue-800 rounded-md text-center"
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}
