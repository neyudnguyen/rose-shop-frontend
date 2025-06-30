import { UserProfileCard } from '../../components/admin/UserProfileCard';
import { UserStatsCards } from '../../components/admin/UserStatsCards';
import { COLORS } from '../../constants/colors';
import { userManagementService } from '../../services/userManagementService';
import type { UserDetailResponse, UserListRequest } from '../../types';
import './AdminUsers.module.css';
import {
	CheckCircleOutlined,
	EyeOutlined,
	SearchOutlined,
	StopOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Badge,
	Button,
	Card,
	Col,
	Form,
	Input,
	Modal,
	Popconfirm,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Tooltip,
	Typography,
	message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface UserStats {
	totalUsers: number;
	activeUsers: number;
	inactiveUsers: number;
	adminUsers: number;
	regularUsers: number;
	activationRate: string;
}

export const AdminUsers: React.FC = () => {
	const [users, setUsers] = useState<UserListRequest[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserListRequest[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const [selectedUser, setSelectedUser] = useState<UserDetailResponse | null>(
		null,
	);
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const [statusModalVisible, setStatusModalVisible] = useState(false);
	const [userStats, setUserStats] = useState<UserStats | null>(null);
	const [form] = Form.useForm();

	const filterUsers = React.useCallback(() => {
		let filtered = users;

		// Search filter
		if (searchText) {
			filtered = filtered.filter(
				(user) =>
					user.username.toLowerCase().includes(searchText.toLowerCase()) ||
					user.email.toLowerCase().includes(searchText.toLowerCase()) ||
					user.userInfo?.fullName
						?.toLowerCase()
						.includes(searchText.toLowerCase()),
			);
		}

		// Status filter
		if (statusFilter !== 'all') {
			filtered = filtered.filter((user) =>
				statusFilter === 'active' ? user.isActive : !user.isActive,
			);
		}

		// Type filter
		if (typeFilter !== 'all') {
			filtered = filtered.filter((user) => user.type === typeFilter);
		}

		setFilteredUsers(filtered);
	}, [users, searchText, statusFilter, typeFilter]);

	useEffect(() => {
		fetchUsers();
		fetchUserStats();
	}, []);

	useEffect(() => {
		filterUsers();
	}, [filterUsers]);

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
			message.error('Failed to fetch users');
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
			message.error('Failed to fetch user details');
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

			message.success(
				`User ${selectedUser.isActive ? 'deactivated' : 'activated'} successfully`,
			);

			setStatusModalVisible(false);
			form.resetFields();
			await fetchUsers();
			await fetchUserStats();
		} catch (error) {
			message.error('Failed to update user status');
			console.error('Error updating user status:', error);
		} finally {
			setLoading(false);
		}
	};

	const getStatusText = (isActive: boolean) =>
		isActive ? 'Active' : 'Inactive';

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

	const formatDate = (dateString?: string) => {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('vi-VN');
	};

	const columns: ColumnsType<UserListRequest> = [
		{
			title: 'ID',
			dataIndex: 'userId',
			key: 'userId',
			width: 80,
			align: 'center',
			sorter: (a, b) => a.userId - b.userId,
			render: (userId: number) => (
				<span className="font-mono text-gray-600">#{userId}</span>
			),
		},
		{
			title: 'User Information',
			key: 'user',
			width: 280,
			align: 'center',
			sorter: (a, b) => {
				const nameA = a.userInfo?.fullName || a.username;
				const nameB = b.userInfo?.fullName || b.username;
				return nameA.localeCompare(nameB);
			},
			render: (_, record) => (
				<div className="flex items-center justify-center space-x-3">
					<Avatar
						size={40}
						src={record.userInfo?.avatar}
						icon={<UserOutlined />}
						style={{ backgroundColor: COLORS.primary }}
					/>
					<div className="text-center">
						<div className="font-medium text-gray-900">
							{record.userInfo?.fullName || record.username}
						</div>
						<div className="text-sm text-gray-500">@{record.username}</div>
						<div className="text-xs text-gray-400">{record.email}</div>
					</div>
				</div>
			),
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			width: 100,
			align: 'center',
			filters: [
				{ text: 'Admin', value: 'admin' },
				{ text: 'User', value: 'user' },
			],
			onFilter: (value, record) => record.type === value,
			sorter: (a, b) => a.type.localeCompare(b.type),
			render: (type: string) => (
				<div className="flex justify-center">
					<Tag color={getTypeColor(type)} className="capitalize">
						{type}
					</Tag>
				</div>
			),
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			key: 'status',
			width: 120,
			align: 'center',
			filters: [
				{ text: 'Active', value: true },
				{ text: 'Inactive', value: false },
			],
			onFilter: (value, record) => record.isActive === value,
			sorter: (a, b) => Number(b.isActive) - Number(a.isActive),
			render: (isActive: boolean) => (
				<div className="flex justify-center">
					<Badge
						status={isActive ? 'success' : 'error'}
						text={
							<span className={isActive ? 'text-green-600' : 'text-red-600'}>
								{getStatusText(isActive)}
							</span>
						}
					/>
				</div>
			),
		},
		{
			title: 'Contact',
			key: 'contact',
			width: 180,
			align: 'center',
			render: (_, record) => (
				<div className="text-center">
					{record.userInfo?.phone && (
						<div className="text-sm">📞 {record.userInfo.phone}</div>
					)}
					{record.userInfo?.address && (
						<div className="text-xs text-gray-500 truncate max-w-32">
							📍 {record.userInfo.address}
						</div>
					)}
					{!record.userInfo?.phone && !record.userInfo?.address && (
						<span className="text-gray-400 text-xs">No contact info</span>
					)}
				</div>
			),
		},
		{
			title: 'Created Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 130,
			align: 'center',
			sorter: (a, b) => {
				const dateA = new Date(a.createdAt || '').getTime();
				const dateB = new Date(b.createdAt || '').getTime();
				return dateB - dateA;
			},
			defaultSortOrder: 'descend',
			render: (date: string) => (
				<div className="text-sm text-gray-600 text-center">
					{formatDate(date)}
				</div>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			width: 120,
			align: 'center',
			render: (_, record) => (
				<div className="flex justify-center">
					<Space>
						<Tooltip title="View Details">
							<Button
								type="text"
								icon={<EyeOutlined />}
								onClick={() => handleViewDetails(record.userId)}
							/>
						</Tooltip>

						{record.type !== 'admin' && (
							<Popconfirm
								title={`${record.isActive ? 'Deactivate' : 'Activate'} User`}
								description={`Are you sure you want to ${record.isActive ? 'deactivate' : 'activate'} this user?`}
								onConfirm={() => handleToggleStatus(record)}
								okText="Yes"
								cancelText="No"
							>
								<Tooltip
									title={record.isActive ? 'Deactivate User' : 'Activate User'}
								>
									<Button
										type="text"
										danger={record.isActive}
										icon={
											record.isActive ? <StopOutlined /> : <CheckCircleOutlined />
										}
									/>
								</Tooltip>
							</Popconfirm>
						)}
					</Space>
				</div>
			),
		},
	];

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-6">
				<Title level={2} className="!mb-2">
					User Management
				</Title>
				<Text type="secondary">Manage and monitor user accounts</Text>
			</div>

			{/* Statistics Cards */}
			{userStats && <UserStatsCards stats={userStats} />}

			{/* Filters */}
			<Card className="mb-6">
				<Row gutter={[16, 16]} align="middle">
					<Col xs={24} sm={12} md={8}>
						<Input
							placeholder="Search users..."
							prefix={<SearchOutlined />}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							allowClear
						/>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Select
							placeholder="Status"
							value={statusFilter}
							onChange={setStatusFilter}
							style={{ width: '100%' }}
						>
							<Option value="all">All Status</Option>
							<Option value="active">Active</Option>
							<Option value="inactive">Inactive</Option>
						</Select>
					</Col>
					<Col xs={12} sm={6} md={4}>
						<Select
							placeholder="Type"
							value={typeFilter}
							onChange={setTypeFilter}
							style={{ width: '100%' }}
						>
							<Option value="all">All Types</Option>
							<Option value="admin">Admin</Option>
							<Option value="user">User</Option>
						</Select>
					</Col>
					<Col xs={24} sm={12} md={8} className="text-right">
						<Space>
							<Button onClick={fetchUsers} loading={loading}>
								Refresh
							</Button>
						</Space>
					</Col>
				</Row>
			</Card>

			{/* Users Table */}
			<Card>
				<Table
					columns={columns}
					dataSource={filteredUsers}
					rowKey="userId"
					loading={loading}
					pagination={{
						total: filteredUsers.length,
						pageSize: 10,
						showSizeChanger: true,
						pageSizeOptions: ['10', '20', '50', '100'],
						showQuickJumper: true,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} users`,
					}}
					scroll={{ x: 1300 }}
					size="middle"
					bordered
					className="custom-table"
				/>
			</Card>

			{/* User Detail Modal */}
			<Modal
				title="User Details"
				open={detailModalVisible}
				onCancel={() => setDetailModalVisible(false)}
				footer={null}
				width={700}
			>
				{selectedUser && <UserProfileCard user={selectedUser} />}
			</Modal>

			{/* Status Change Modal */}
			<Modal
				title={`${selectedUser?.isActive ? 'Deactivate' : 'Activate'} User`}
				open={statusModalVisible}
				onOk={handleStatusSubmit}
				onCancel={() => {
					setStatusModalVisible(false);
					form.resetFields();
				}}
				confirmLoading={loading}
			>
				<Form form={form} layout="vertical">
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
