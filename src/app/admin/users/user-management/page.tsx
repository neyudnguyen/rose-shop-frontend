'use client';

import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'seller' | 'user';
  status: 'active' | 'blocked';
};

const initialUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'seller', status: 'blocked' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user', status: 'active' },
  { id: 4, name: 'David', email: 'david@example.com', role: 'user', status: 'blocked' },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<User['role']>('user');
  const [editStatus, setEditStatus] = useState<User['status']>('active');

  const filteredUsers = users.filter((user) => {
    if (filterRole !== 'all' && user.role !== filterRole) return false;
    if (filterStatus !== 'all' && user.status !== filterStatus) return false;
    if (!user.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const startEdit = (user: User) => {
    setEditUserId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status);
  };

  const cancelEdit = () => {
    setEditUserId(null);
  };

  const saveEdit = () => {
    if (!editUserId) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUserId
          ? { ...u, name: editName, email: editEmail, role: editRole, status: editStatus }
          : u
      )
    );
    setEditUserId(null);
  };

  const deleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const renderStatus = (status: User['status']) => {
    const styles =
      status === 'active'
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800';

    return (
      <span className={`${styles} px-2 py-1 rounded-full text-xs font-semibold capitalize`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="flex space-x-4 mb-4">
        <div>
          <label htmlFor="roleFilter" className="sr-only">Filter by role</label>
          <select
            id="roleFilter"
            className="border border-gray-300 rounded-md p-2"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="seller">Sellers</option>
            <option value="user">Regular Users</option>
          </select>
        </div>

        <div>
          <label htmlFor="statusFilter" className="sr-only">Filter by status</label>
          <select
            id="statusFilter"
            className="border border-gray-300 rounded-md p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          className="border border-gray-300 rounded-md p-2 flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search users"
        />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
          {filteredUsers.map((user) =>
            editUserId === user.id ? (
              <tr key={user.id} className="bg-yellow-50">
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-gray-300 rounded p-1 w-full"
                    aria-label="Edit user name"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="border border-gray-300 rounded p-1 w-full"
                    aria-label="Edit user email"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <label htmlFor="editRole" className="sr-only">Edit Role</label>
                  <select
                    id="editRole"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as User['role'])}
                    className="border border-gray-300 rounded p-1 w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="seller">Seller</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2">
                  <label htmlFor="editStatus" className="sr-only">Edit Status</label>
                  <select
                    id="editStatus"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as User['status'])}
                    className="border border-gray-300 rounded p-1 w-full"
                  >
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2 capitalize">{user.role}</td>
                <td className="border border-gray-300 p-2">{renderStatus(user.status)}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
											onClick={() => startEdit(user)}
											className="bg-blue-200 text-blue-800 px-3 py-1 rounded hover:bg-blue-300"
											aria-label={`Edit user ${user.name}`}
											>
											Edit
											</button>
											<button
											onClick={() => deleteUser(user.id)}
											className="bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
											aria-label={`Delete user ${user.name}`}
											>
											Delete
									</button>

                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
