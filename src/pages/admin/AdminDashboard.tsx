import { adminOrderService } from '../../services/adminOrderService';
import type { OrderStatistics } from '../../services/adminOrderService';
import {
	DollarOutlined,
	GiftOutlined,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Alert, Card, Col, Row, Spin, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
	const navigate = useNavigate();
	const [statistics, setStatistics] = useState<OrderStatistics | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchStatistics();
	}, []);

	const fetchStatistics = async () => {
		try {
			setLoading(true);
			const stats = await adminOrderService.getOrderStatistics();
			setStatistics(stats);
		} catch (err) {
			console.error('Error fetching statistics:', err);
			setError('Failed to load dashboard statistics');
		} finally {
			setLoading(false);
		}
	};

	const dashboardCards = [
		{
			title: 'Total Orders',
			value: statistics?.totalOrders || 0,
			prefix: <ShoppingOutlined />,
			color: '#1890ff',
			path: '/admin/orders',
			isRevenue: false,
		},
		{
			title: 'Pending Orders',
			value: statistics?.pendingOrders || 0,
			prefix: <ShoppingOutlined />,
			color: '#faad14',
			path: '/admin/orders?status=pending',
			isRevenue: false,
		},
		{
			title: 'Delivered Orders',
			value: statistics?.deliveredOrders || 0,
			prefix: <ShoppingOutlined />,
			color: '#52c41a',
			path: '/admin/orders?status=delivered',
			isRevenue: false,
		},
		{
			title: 'Total Revenue',
			value: statistics?.totalRevenue || 0,
			prefix: <DollarOutlined />,
			color: '#13c2c2',
			path: '/admin/orders',
			isRevenue: true,
		},
		{
			title: 'Monthly Revenue',
			value: statistics?.monthlyRevenue || 0,
			prefix: <DollarOutlined />,
			color: '#722ed1',
			path: '/admin/orders',
			isRevenue: true,
		},
		{
			title: 'Canceled Orders',
			value: statistics?.canceledOrders || 0,
			prefix: <ShoppingOutlined />,
			color: '#ff4d4f',
			path: '/admin/orders?status=canceled',
			isRevenue: false,
		},
	];

	const managementCards = [
		{
			title: 'Manage Flowers',
			description: 'Add, edit, and manage flower products',
			icon: <GiftOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />,
			path: '/admin/flowers',
			color: '#1890ff',
		},
		{
			title: 'Manage Categories',
			description: 'Organize flower categories',
			icon: <ShoppingOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
			path: '/admin/categories',
			color: '#52c41a',
		},
		{
			title: 'Manage Orders',
			description: 'Process and track customer orders',
			icon: <ShoppingOutlined style={{ fontSize: '2rem', color: '#faad14' }} />,
			path: '/admin/orders',
			color: '#faad14',
		},
		{
			title: 'Manage Users',
			description: 'View and manage user accounts',
			icon: <UserOutlined style={{ fontSize: '2rem', color: '#722ed1' }} />,
			path: '/admin/users',
			color: '#722ed1',
		},
		{
			title: 'Manage Vouchers',
			description: 'Create and manage discount vouchers',
			icon: <GiftOutlined style={{ fontSize: '2rem', color: '#13c2c2' }} />,
			path: '/admin/vouchers',
			color: '#13c2c2',
		},
	];

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert
				message="Error"
				description={error}
				type="error"
				showIcon
				className="mb-4"
			/>
		);
	}

	return (
		<div className="p-6">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					Admin Dashboard
				</h1>
				<p className="text-gray-600">Welcome to Rose Shop Admin Panel</p>
			</div>

			{/* Statistics Cards */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Statistics Overview
				</h2>
				<Row gutter={[16, 16]}>
					{dashboardCards.map((card, index) => (
						<Col xs={24} sm={12} lg={8} xl={6} key={index}>
							<Card
								hoverable
								className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
								onClick={() => navigate(card.path)}
								style={{ borderLeft: `4px solid ${card.color}` }}
							>
								<Statistic
									title={card.title}
									value={card.value}
									prefix={card.prefix}
									formatter={
										card.isRevenue
											? (value) => `${Number(value).toLocaleString('vi-VN')} ₫`
											: undefined
									}
									valueStyle={{ color: card.color }}
								/>
							</Card>
						</Col>
					))}
				</Row>
			</div>

			{/* Management Section */}
			<div>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Quick Actions
				</h2>
				<Row gutter={[16, 16]}>
					{managementCards.map((card, index) => (
						<Col xs={24} sm={12} lg={8} key={index}>
							<Card
								hoverable
								className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg"
								onClick={() => navigate(card.path)}
								style={{ borderTop: `4px solid ${card.color}` }}
							>
								<div className="text-center p-4">
									<div className="mb-3">{card.icon}</div>
									<h3 className="text-lg font-semibold text-gray-800 mb-2">
										{card.title}
									</h3>
									<p className="text-gray-600 text-sm">{card.description}</p>
								</div>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
};

export default AdminDashboard;
