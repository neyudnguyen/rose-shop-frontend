import { COLORS } from '../constants/colors';
import { useAdminAuth } from '../hooks/useAdminAuth';
import {
	GiftOutlined,
	LogoutOutlined,
	ShopOutlined,
	ShoppingOutlined,
	TagsOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './AdminSidebar.module.css';

const { Sider } = Layout;
const { Title, Text } = Typography;

export const AdminSidebar: React.FC = () => {
	const { user, logout } = useAdminAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/admin/login');
	};

	// Determine the selected key based on current path
	const getSelectedKey = () => {
		const path = location.pathname;
		// If on root admin path, select flowers
		if (path === '/admin' || path === '/admin/') {
			return '/admin/flowers';
		}
		return path;
	};

	const menuItems: MenuProps['items'] = [
		{
			key: '/admin/flowers',
			icon: <ShopOutlined style={{ color: COLORS.white }} />,
			label: (
				<Link
					to="/admin/flowers"
					style={{ color: COLORS.white, textDecoration: 'none' }}
				>
					Manage Flowers
				</Link>
			),
		},
		{
			key: '/admin/categories',
			icon: <TagsOutlined style={{ color: COLORS.white }} />,
			label: (
				<Link
					to="/admin/categories"
					style={{ color: COLORS.white, textDecoration: 'none' }}
				>
					Manage Categories
				</Link>
			),
		},
		{
			key: '/admin/vouchers',
			icon: <GiftOutlined style={{ color: COLORS.white }} />,
			label: (
				<Link
					to="/admin/vouchers"
					style={{ color: COLORS.white, textDecoration: 'none' }}
				>
					Manage Vouchers
				</Link>
			),
		},
		{
			key: '/admin/users',
			icon: <UserOutlined style={{ color: COLORS.white }} />,
			label: (
				<Link
					to="/admin/users"
					style={{ color: COLORS.white, textDecoration: 'none' }}
				>
					Manage Users
				</Link>
			),
		},
		{
			key: '/admin/orders',
			icon: <ShoppingOutlined style={{ color: COLORS.white }} />,
			label: (
				<Link
					to="/admin/orders"
					style={{ color: COLORS.white, textDecoration: 'none' }}
				>
					Manage Orders
				</Link>
			),
		},
	];

	return (
		<Sider
			width={250}
			className="min-h-screen shadow-lg admin-sidebar"
			style={{
				background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
				color: COLORS.white,
			}}
		>
			{/* Brand Header */}
			<div className="p-4 text-center border-b border-white/10">
				<div className="flex items-center justify-center space-x-2">
					<div
						className="w-8 h-8 rounded-full flex items-center justify-center"
						style={{ backgroundColor: COLORS.white }}
					>
						<span
							className="text-lg font-bold"
							style={{ color: COLORS.primary }}
						>
							🌸
						</span>
					</div>
					<Title
						level={4}
						className="!mb-0"
						style={{ color: COLORS.white, fontSize: '18px' }}
					>
						PlatformFlower
					</Title>
				</div>
				<Text
					className="text-xs block mt-1"
					style={{ color: COLORS.white, opacity: 0.7 }}
				>
					Admin Panel
				</Text>
			</div>

			{/* Header with admin info */}
			<div className="p-6 border-b border-white/20">
				<Space direction="vertical" className="w-full" size="middle">
					<div className="flex items-center space-x-4">
						<Avatar
							size={48}
							src={user?.userInfo?.avatar}
							icon={<UserOutlined />}
							style={{
								backgroundColor: COLORS.white,
								color: COLORS.primary,
								border: `2px solid ${COLORS.white}`,
							}}
						/>
						<div className="flex-1 ml-2">
							<Title
								level={5}
								className="!mb-1"
								style={{ color: COLORS.white, fontSize: '16px' }}
							>
								{user?.userInfo?.fullName || user?.username}
							</Title>
							<Text
								className="text-xs"
								style={{ color: COLORS.white, opacity: 0.8 }}
							>
								System Administrator
							</Text>
						</div>
					</div>

					{/* Logout Button */}
					<Button
						block
						icon={<LogoutOutlined />}
						onClick={handleLogout}
						size="middle"
						style={{
							backgroundColor: 'rgba(255, 255, 255, 0.15)',
							borderColor: 'rgba(255, 255, 255, 0.3)',
							color: COLORS.white,
							height: '36px',
							fontWeight: '500',
						}}
						className="hover:bg-white/25 hover:border-white/50 transition-all duration-300"
					>
						Logout
					</Button>
				</Space>
			</div>

			{/* Menu Items */}
			<div className="pt-4">
				<Menu
					mode="inline"
					selectedKeys={[getSelectedKey()]}
					items={menuItems}
					className="border-0 h-full admin-sidebar"
					style={{
						backgroundColor: 'transparent',
						color: COLORS.white,
						fontSize: '14px',
					}}
					theme="dark"
				/>
			</div>
		</Sider>
	);
};
