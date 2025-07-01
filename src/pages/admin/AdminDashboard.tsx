import { useAdminAuth } from '../../hooks/useAdminAuth';
import { adminOrderService } from '../../services/adminOrderService';
import type { OrderStatistics } from '../../services/adminOrderService';
import {
	AppstoreOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
	DollarOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	TagsOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export const AdminDashboard: React.FC = () => {
	const { user } = useAdminAuth();
	const navigate = useNavigate();
	const [orderStats, setOrderStats] = useState<OrderStatistics | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchOrderStatistics();
	}, []);

	const fetchOrderStatistics = async () => {
		setLoading(true);
		try {
			const stats = await adminOrderService.getOrderStatistics();
			setOrderStats(stats);
		} catch (error) {
			console.error('Failed to fetch order statistics:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6">
			<div className="mb-6">
				<Title level={2}>Admin Dashboard</Title>
				<Text className="text-gray-600">
					Welcome back, {user?.userInfo?.fullName || user?.username}!
				</Text>
			</div>

			{/* Statistics Cards */}
			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} sm={12} lg={6}>
					<Card loading={loading}>
						<Statistic
							title="Total Orders"
							value={orderStats?.totalOrders || 0}
							prefix={<ShoppingCartOutlined />}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card loading={loading}>
						<Statistic
							title="Pending Orders"
							value={orderStats?.pendingOrders || 0}
							prefix={<ClockCircleOutlined />}
							valueStyle={{ color: '#faad14' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card loading={loading}>
						<Statistic
							title="Delivered Orders"
							value={orderStats?.deliveredOrders || 0}
							prefix={<CheckCircleOutlined />}
							valueStyle={{ color: '#52c41a' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card loading={loading}>
						<Statistic
							title="Total Revenue"
							value={orderStats?.totalRevenue || 0}
							prefix={<DollarOutlined />}
							precision={2}
							valueStyle={{ color: '#3f8600' }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Quick Actions */}
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card
						title="Recent Orders"
						extra={
							<a href="#!" onClick={() => navigate('/admin/orders')}>
								View All
							</a>
						}
						style={{ height: '300px' }}
					>
						<div className="flex items-center justify-center h-full text-gray-500">
							<div className="text-center">
								<ShoppingCartOutlined className="text-4xl mb-2" />
								<p>View and manage orders</p>
								<p className="text-sm">
									{orderStats?.pendingOrders || 0} orders pending
								</p>
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="Quick Actions" style={{ height: '300px' }}>
						<div className="space-y-4">
							<div
								className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
								onClick={() => navigate('/admin/flowers')}
							>
								<div className="flex items-center">
									<ShoppingOutlined className="text-blue-600 mr-3" />
									<div>
										<div className="font-medium">Add New Flower</div>
										<div className="text-sm text-gray-600">
											Create a new flower listing
										</div>
									</div>
								</div>
							</div>
							<div
								className="p-4 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors"
								onClick={() => navigate('/admin/categories')}
							>
								<div className="flex items-center">
									<AppstoreOutlined className="text-green-600 mr-3" />
									<div>
										<div className="font-medium">Manage Categories</div>
										<div className="text-sm text-gray-600">
											Add or edit flower categories
										</div>
									</div>
								</div>
							</div>
							<div
								className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors"
								onClick={() => navigate('/admin/vouchers')}
							>
								<div className="flex items-center">
									<TagsOutlined className="text-purple-600 mr-3" />
									<div>
										<div className="font-medium">Create Voucher</div>
										<div className="text-sm text-gray-600">
											Add discount vouchers
										</div>
									</div>
								</div>
							</div>
							<div
								className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 cursor-pointer transition-colors"
								onClick={() => navigate('/admin/orders')}
							>
								<div className="flex items-center">
									<ShoppingCartOutlined className="text-orange-600 mr-3" />
									<div>
										<div className="font-medium">Manage Orders</div>
										<div className="text-sm text-gray-600">
											View and process orders
										</div>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
