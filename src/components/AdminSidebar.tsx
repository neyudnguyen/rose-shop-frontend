import { useAuth } from '../hooks/useAuth';
import {
	BarChartOutlined,
	DashboardOutlined,
	GiftOutlined,
	LogoutOutlined,
	SettingOutlined,
	ShopOutlined,
	TagsOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;

export const AdminSidebar: React.FC = () => {
	const { user, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/admin/login');
	};

	const menuItems: MenuProps['items'] = [
		{
			key: '/admin',
			icon: <DashboardOutlined />,
			label: <Link to="/admin">Dashboard</Link>,
		},
		{
			key: '/admin/flowers',
			icon: <ShopOutlined />,
			label: <Link to="/admin/flowers">Manage Flowers</Link>,
		},
		{
			key: '/admin/categories',
			icon: <TagsOutlined />,
			label: <Link to="/admin/categories">Manage Categories</Link>,
		},
		{
			key: '/admin/vouchers',
			icon: <GiftOutlined />,
			label: <Link to="/admin/vouchers">Manage Vouchers</Link>,
		},
		{
			key: '/admin/users',
			icon: <UserOutlined />,
			label: <Link to="/admin/users">Manage Users</Link>,
		},
		{
			key: '/admin/orders',
			icon: <BarChartOutlined />,
			label: <Link to="/admin/orders">Orders</Link>,
		},
		{
			key: '/admin/settings',
			icon: <SettingOutlined />,
			label: <Link to="/admin/settings">Settings</Link>,
		},
	];

	return (
		<Sider width={250} className="min-h-screen bg-white shadow-lg">
			<div className="p-4 border-b">
				<Space direction="vertical" className="w-full">
					<div className="flex items-center space-x-3">
						<Avatar
							size="large"
							src={user?.userInfo?.avatar}
							icon={<UserOutlined />}
						/>
						<div>
							<Title level={5} className="!mb-0">
								{user?.userInfo?.fullName || user?.username}
							</Title>
							<Text type="secondary" className="text-xs">
								Administrator
							</Text>
						</div>
					</div>
					<Button
						type="primary"
						danger
						block
						icon={<LogoutOutlined />}
						onClick={handleLogout}
						size="small"
					>
						Logout
					</Button>
				</Space>
			</div>

			<Menu
				mode="inline"
				selectedKeys={[location.pathname]}
				items={menuItems}
				className="border-0 h-full"
			/>
		</Sider>
	);
};
