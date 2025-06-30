import { useAdminAuth } from '../../hooks/useAdminAuth';
import {
	AppstoreOutlined,
	BarChartOutlined,
	ShoppingOutlined,
	TagsOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const AdminDashboard: React.FC = () => {
	const { user } = useAdminAuth();

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
					<Card>
						<Statistic
							title="Total Flowers"
							value={0}
							prefix={<ShoppingOutlined />}
							valueStyle={{ color: '#3f8600' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Categories"
							value={0}
							prefix={<AppstoreOutlined />}
							valueStyle={{ color: '#cf1322' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Total Users"
							value={0}
							prefix={<UserOutlined />}
							valueStyle={{ color: '#1890ff' }}
						/>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<Statistic
							title="Active Vouchers"
							value={0}
							prefix={<TagsOutlined />}
							valueStyle={{ color: '#722ed1' }}
						/>
					</Card>
				</Col>
			</Row>

			{/* Quick Actions */}
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={12}>
					<Card
						title="Recent Orders"
						extra={<a href="#!">View All</a>}
						style={{ height: '300px' }}
					>
						<div className="flex items-center justify-center h-full text-gray-500">
							<div className="text-center">
								<BarChartOutlined className="text-4xl mb-2" />
								<p>No recent orders</p>
							</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} lg={12}>
					<Card title="Quick Actions" style={{ height: '300px' }}>
						<div className="space-y-4">
							<div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
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
							<div className="p-4 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer transition-colors">
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
							<div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 cursor-pointer transition-colors">
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
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
