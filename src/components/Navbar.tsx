import { useAuth } from '../hooks/useAuth';
import {
	HistoryOutlined,
	HomeOutlined,
	LogoutOutlined,
	SettingOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Header } = Layout;

export const Navbar: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const userMenuItems: MenuProps['items'] = [
		{
			key: 'profile',
			icon: <UserOutlined />,
			label: <Link to="/profile">Profile</Link>,
		},
		{
			key: 'orders',
			icon: <HistoryOutlined />,
			label: <Link to="/orders">My Orders</Link>,
		},
		{
			key: 'addresses',
			icon: <SettingOutlined />,
			label: <Link to="/addresses">Address Book</Link>,
		},
		{
			type: 'divider',
		},
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Logout',
			onClick: handleLogout,
		},
	];

	const mainMenuItems: MenuProps['items'] = [
		{
			key: '/',
			icon: <HomeOutlined />,
			label: <Link to="/">Home</Link>,
		},
		{
			key: '/flowers',
			icon: <ShopOutlined />,
			label: <Link to="/flowers">Flowers</Link>,
		},
	];

	return (
		<Header className="bg-white shadow-md px-4 sticky top-0 z-50">
			<div className="flex items-center justify-between max-w-7xl mx-auto">
				<div className="flex items-center">
					<Link to="/" className="mr-8">
						<img
							src="/images/image/logo.jpg"
							alt="PlatformFlower"
							className="h-10 w-auto"
						/>
					</Link>
					<Menu
						mode="horizontal"
						selectedKeys={[location.pathname]}
						items={mainMenuItems}
						className="border-0 bg-transparent"
					/>
				</div>

				<div className="flex items-center space-x-4">
					{user && (
						<Link to="/cart">
							<Badge count={0} showZero={false}>
								<Button
									type="text"
									icon={<ShoppingCartOutlined />}
									size="large"
								/>
							</Badge>
						</Link>
					)}

					{user ? (
						<Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
							<Space className="cursor-pointer">
								<Avatar icon={<UserOutlined />} />
								<span>{user.fullName}</span>
							</Space>
						</Dropdown>
					) : (
						<Space>
							<Link to="/login">
								<Button type="default">Login</Button>
							</Link>
							<Link to="/register">
								<Button type="primary">Register</Button>
							</Link>
						</Space>
					)}
				</div>
			</div>
		</Header>
	);
};
