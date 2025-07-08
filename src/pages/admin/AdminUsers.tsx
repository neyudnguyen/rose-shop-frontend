import { UserProfileCard } from '../../components/admin/UserProfileCard';
import { UserStatsCards } from '../../components/admin/UserStatsCards';
import { COLORS } from '../../constants/colors';
import { useAdminNotification } from '../../services/adminNotification';
import { userManagementService } from '../../services/userManagementService';
import type { UserDetailResponse, UserListRequest } from '../../types';
import { getApiErrorMessage } from '../../utils/apiErrorHandler';
import {
	CheckCircleOutlined,
	EyeOutlined,
	SearchOutlined,
	StopOutlined,
} from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;

interface UserStats {
	totalUsers: number;
	activeUsers: number;
	inactiveUsers: number;
	adminUsers: number;
	regularUsers: number;
	activationRate: string;
}

export const AdminUsers: React.FC = () => {
	const notification = useAdminNotification();
	const [users, setUsers] = useState<UserListRequest[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [selectedUser, setSelectedUser] = useState<UserDetailResponse | null>(
		null,
	);
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [statusModalVisible, setStatusModalVisible] = useState(false);
	const [userStats, setUserStats] = useState<UserStats | null>(null);
	const [form] = Form.useForm();

	// Filter users based on search text
	const filteredUsers = users.filter(
		(user) =>
			user.username.toLowerCase().includes(searchText.toLowerCase()) ||
			user.email.toLowerCase().includes(searchText.toLowerCase()) ||
			user.userInfo?.fullName?.toLowerCase().includes(searchText.toLowerCase()),
	);

	useEffect(() => {
		fetchUsers();
		fetchUserStats();
	}, []);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const data = await userManagementService.getAllUsers();
			setUsers(
				data.sort(
					(a, b) =>
						new Date(b.createdAt || '').getTime() -
						new Date(a.createdAt || '').getTime(),
				),
			);
		} catch (error) {
			const errorMessage = getApiErrorMessage(error);
			notification.error('Failed to fetch users', errorMessage);
			console.error('Error fetching users:', error);
		} finally {
			setLoading(false);
		}
	};

	const fetchUserStats = async () => {
		try {
			const stats = await userManagementService.getUserStats();
			setUserStats(stats);
		} catch (err) {
			console.error('Error fetching user stats:', err);
		}
	};

	const handleViewDetails = async (userId: number) => {
		try {
			setLoading(true);
			const userDetail = await userManagementService.getUserById(userId);
			setSelectedUser(userDetail);
			setDetailModalVisible(true);
		} catch {
			notification.error('Failed to fetch user details');
		} finally {
			setLoading(false);
		}
	};

	const handleToggleStatus = (user: UserListRequest) => {
		setSelectedUser(user as UserDetailResponse);
		setStatusModalVisible(true);
	};

	const handleStatusSubmit = async () => {
		if (!selectedUser) return;

		try {
			const values = await form.validateFields();
			setLoading(true);

			await userManagementService.toggleUserStatus(
				selectedUser.userId,
				values.reason,
			);

			notification.success(
				`User ${selectedUser.isActive ? 'deactivated' : 'activated'} successfully`,
			);

			setStatusModalVisible(false);
			form.resetFields();
			await fetchUsers();
			await fetchUserStats();
		} catch (error) {
			const errorMessage = getApiErrorMessage(error);
			notification.error('Failed to update user status', errorMessage);
			console.error('Error updating user status:', error);
		} finally {
			setLoading(false);
		}
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case 'admin':
				return 'purple';
			case 'user':
				return 'blue';
			default:
				return 'default';
		}
	};

	// Table columns
	const columns: ColumnsType<UserListRequest> = [
		{
			title: <div style={{ textAlign: 'center' }}>ID</div>,
			dataIndex: 'userId',
			key: 'userId',
			width: 80,
			sorter: (a, b) => a.userId - b.userId,
			align: 'center',
			render: (id: number) => <div style={{ textAlign: 'center' }}>#{id}</div>,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Name</div>,
			dataIndex: 'userInfo',
			key: 'name',
			width: 180,
			sorter: (a, b) => {
				const nameA = a.userInfo?.fullName || a.username;
				const nameB = b.userInfo?.fullName || b.username;
				return nameA.localeCompare(nameB);
			},
			align: 'center',
			render: (
				userInfo: UserListRequest['userInfo'],
				record: UserListRequest,
			) => (
				<div style={{ textAlign: 'center' }}>
					{userInfo?.fullName || record.username}
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Email</div>,
			dataIndex: 'email',
			key: 'email',
			width: 220,
			sorter: (a, b) => a.email.localeCompare(b.email),
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Type</div>,
			dataIndex: 'type',
			key: 'type',
			width: 100,
			align: 'center',
			render: (type: string) => (
				<div style={{ textAlign: 'center' }}>
					<Tag color={getTypeColor(type)} className="capitalize">
						{type}
					</Tag>
				</div>
			),
			filters: [
				{ text: 'Admin', value: 'admin' },
				{ text: 'User', value: 'user' },
			],
			onFilter: (value, record) => record.type === value,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Status</div>,
			dataIndex: 'isActive',
			key: 'status',
			width: 100,
			align: 'center',
			render: (isActive: boolean) => (
				<div style={{ textAlign: 'center' }}>
					<Tag color={isActive ? 'green' : 'red'}>
						{isActive ? 'Active' : 'Inactive'}
					</Tag>
				</div>
			),
			filters: [
				{ text: 'Active', value: true },
				{ text: 'Inactive', value: false },
			],
			onFilter: (value, record) => record.isActive === value,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Created Date</div>,
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
			align: 'center',
			render: (date: string) => (
				<div style={{ textAlign: 'center' }}>
					{date ? new Date(date).toLocaleDateString('en-US') : '-'}
				</div>
			),
			sorter: (a, b) =>
				new Date(a.createdAt || 0).getTime() -
				new Date(b.createdAt || 0).getTime(),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Actions</div>,
			key: 'actions',
			width: 200,
			align: 'center',
			render: (_, record) => (
				<div style={{ textAlign: 'center' }}>
					<Space size="small">
						<Button
							type="text"
							icon={<EyeOutlined />}
							onClick={() => handleViewDetails(record.userId)}
							style={{ color: COLORS.info }}
						>
							View
						</Button>
						{record.type !== 'admin' && (
							<Button
								type="text"
								icon={
									record.isActive ? <StopOutlined /> : <CheckCircleOutlined />
								}
								onClick={() => handleToggleStatus(record)}
								style={{
									color: record.isActive ? COLORS.error : COLORS.success,
								}}
							>
								{record.isActive ? 'Deactivate' : 'Activate'}
							</Button>
						)}
					</Space>
				</div>
			),
		},
	];

	return (
		<div className="p-6">
			{/* Statistics Cards */}
			{userStats && <UserStatsCards stats={userStats} />}

			<Card
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-8 rounded"
							style={{ backgroundColor: COLORS.primary }}
						/>
						<h2 className="text-2xl font-bold mb-0">User Management</h2>
					</div>
				}
			>
				{/* Search */}
				<div className="mb-4">
					<Input
						placeholder="Search users..."
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 300 }}
						allowClear
					/>
				</div>

				{/* Users table */}
				<Table
					columns={columns}
					dataSource={filteredUsers}
					rowKey="userId"
					loading={loading}
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} users`,
					}}
					style={{
						borderRadius: 8,
						overflow: 'hidden',
					}}
				/>
			</Card>

			{/* User Detail Modal */}
			<Modal
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-6 rounded"
							style={{ backgroundColor: COLORS.info }}
						/>
						<span className="text-lg font-semibold">User Details</span>
					</div>
				}
				open={detailModalVisible}
				onCancel={() => setDetailModalVisible(false)}
				footer={null}
				width={700}
			>
				{selectedUser && <UserProfileCard user={selectedUser} />}
			</Modal>

			{/* Status Change Modal */}
			<Modal
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-6 rounded"
							style={{ backgroundColor: COLORS.primary }}
						/>
						<span className="text-lg font-semibold">
							{selectedUser?.isActive ? 'Deactivate' : 'Activate'} User
						</span>
					</div>
				}
				open={statusModalVisible}
				onOk={handleStatusSubmit}
				onCancel={() => {
					setStatusModalVisible(false);
					form.resetFields();
				}}
				confirmLoading={loading}
			>
				<Form form={form} layout="vertical" className="mt-4">
					<Form.Item
						name="reason"
						label="Reason"
						rules={[
							{ required: true, message: 'Please provide a reason' },
							{ min: 5, message: 'Reason must be at least 5 characters' },
							{ max: 500, message: 'Reason must not exceed 500 characters' },
						]}
					>
						<TextArea
							rows={4}
							placeholder={`Please provide a reason for ${selectedUser?.isActive ? 'deactivating' : 'activating'} this user...`}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};
