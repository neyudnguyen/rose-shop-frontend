import { useAdminAuth } from '../../hooks/useAdminAuth';
import { adminOrderService } from '../../services/adminOrderService';
import type { AdminDashboardStats } from '../../services/adminOrderService';
import type { OrderResponse } from '../../types';
import {
	AppstoreOutlined,
	BarChartOutlined,
	DollarOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	TagsOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Row,
	Spin,
	Statistic,
	Table,
	Typography,
	message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export const AdminDashboard: React.FC = () => {
	const { user } = useAdminAuth();
	const [stats, setStats] = useState<AdminDashboardStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchDashboardStats();
	}, []);

	const fetchDashboardStats = async () => {
		try {
			setLoading(true);
			const data = await adminOrderService.getDashboardStats();
			setStats(data);
		} catch (error) {
			message.error('Failed to fetch dashboard statistics');
			console.error('Error fetching dashboard stats:', error);
		} finally {
			setLoading(false);
		}
	};

	const recentOrderColumns: ColumnsType<OrderResponse> = [
		{
			title: 'Order ID',
			dataIndex: 'orderId',
			key: 'orderId',
			render: (orderId) => <Text strong>#{orderId}</Text>,
		},
		{
			title: 'Date',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
		},
		{
			title: 'Total',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (price) => (
				<Text strong style={{ color: '#52c41a' }}>
					{price?.toLocaleString('vi-VN')} ₫
				</Text>
			),
		},
		{
			title: 'Status',
			dataIndex: 'statusPayment',
			key: 'statusPayment',
			render: (status) => (
				<Text
					style={{
						color:
							status?.toLowerCase() === 'completed' ? '#52c41a' : '#1890ff',
					}}
				>
					{status?.toUpperCase()}
				</Text>
			),
		},
	];

	return (
		<div className="p-6">
			<div className="mb-6">
				<Title level={2}>Admin Dashboard</Title>
				<Text className="text-gray-600">
					Welcome back, {user?.userInfo?.fullName || user?.username}!
				</Text>
			</div>

			<Spin spinning={loading}>
				{/* Statistics Cards */}
				<Row gutter={[16, 16]} className="mb-6">
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Total Flowers"
								value={stats?.totalFlowers || 0}
								prefix={<ShoppingOutlined />}
								valueStyle={{ color: '#3f8600' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Categories"
								value={stats?.totalCategories || 0}
								prefix={<AppstoreOutlined />}
								valueStyle={{ color: '#cf1322' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Total Users"
								value={stats?.totalUsers || 0}
								prefix={<UserOutlined />}
								valueStyle={{ color: '#1890ff' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Active Vouchers"
								value={stats?.totalVouchers || 0}
								prefix={<TagsOutlined />}
								valueStyle={{ color: '#722ed1' }}
							/>
						</Card>
					</Col>
				</Row>

				{/* Order Statistics */}
				<Row gutter={[16, 16]} className="mb-6">
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Total Orders"
								value={stats?.orderStats.totalOrders || 0}
								prefix={<ShoppingCartOutlined />}
								valueStyle={{ color: '#1890ff' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Total Revenue"
								value={stats?.orderStats.totalRevenue || 0}
								prefix={<DollarOutlined />}
								valueStyle={{ color: '#52c41a' }}
								formatter={(value) => `${value?.toLocaleString('vi-VN')} ₫`}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Pending Orders"
								value={stats?.orderStats.pendingOrders || 0}
								prefix={<BarChartOutlined />}
								valueStyle={{ color: '#fa8c16' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Completed Orders"
								value={stats?.orderStats.completedOrders || 0}
								prefix={<BarChartOutlined />}
								valueStyle={{ color: '#52c41a' }}
							/>
						</Card>
					</Col>
				</Row>

				{/* Quick Actions and Recent Orders */}
				<Row gutter={[16, 16]}>
					<Col xs={24} lg={12}>
						<Card
							title="Recent Orders"
							extra={
								<Link to="/admin/orders">
									<Button type="link">View All</Button>
								</Link>
							}
							style={{ height: '400px' }}
						>
							{stats?.recentOrders && stats.recentOrders.length > 0 ? (
								<Table
									columns={recentOrderColumns}
									dataSource={stats.recentOrders}
									rowKey="orderId"
									pagination={false}
									size="small"
								/>
							) : (
								<div className="flex items-center justify-center h-full text-gray-500">
									<div className="text-center">
										<BarChartOutlined className="text-4xl mb-2" />
										<p>No recent orders</p>
									</div>
								</div>
							)}
						</Card>
					</Col>
					<Col xs={24} lg={12}>
						<Card title="Quick Actions" style={{ height: '400px' }}>
							<div className="space-y-4">
								<Link to="/admin/flowers">
									<div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
										<div className="flex items-center">
											<ShoppingOutlined className="text-blue-600 mr-3" />
											<div>
												<div className="font-medium">Add New Flower</div>
												<div className="text-sm text-gray-600">
													Create a new flower listing
												</div>
											</div>
											<PlusOutlined className="ml-auto text-blue-600" />
										</div>
									</div>
								</Link>
								<Link to="/admin/categories">
									<div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors">
										<div className="flex items-center">
											<AppstoreOutlined className="text-green-600 mr-3" />
											<div>
												<div className="font-medium">Manage Categories</div>
												<div className="text-sm text-gray-600">
													Add or edit flower categories
												</div>
											</div>
											<PlusOutlined className="ml-auto text-green-600" />
										</div>
									</div>
								</Link>
								<Link to="/admin/vouchers">
									<div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
										<div className="flex items-center">
											<TagsOutlined className="text-purple-600 mr-3" />
											<div>
												<div className="font-medium">Create Voucher</div>
												<div className="text-sm text-gray-600">
													Add discount vouchers
												</div>
											</div>
											<PlusOutlined className="ml-auto text-purple-600" />
										</div>
									</div>
								</Link>
								<Link to="/admin/orders">
									<div className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-colors">
										<div className="flex items-center">
											<ShoppingCartOutlined className="text-orange-600 mr-3" />
											<div>
												<div className="font-medium">Manage Orders</div>
												<div className="text-sm text-gray-600">
													View and manage customer orders
												</div>
											</div>
											<PlusOutlined className="ml-auto text-orange-600" />
										</div>
									</div>
								</Link>
							</div>
						</Card>
					</Col>
				</Row>
			</Spin>
		</div>
	);
};
