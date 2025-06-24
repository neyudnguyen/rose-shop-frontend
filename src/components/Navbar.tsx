import { COLORS } from '../constants/colors';
import { useAuth } from '../hooks/useAuth';
import {
	AppstoreOutlined,
	HomeOutlined,
	LogoutOutlined,
	MenuOutlined,
	ShoppingCartOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Badge,
	Button,
	Col,
	Drawer,
	Dropdown,
	Input,
	Layout,
	Menu,
	Row,
	Space,
} from 'antd';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Search } = Input;

export const Navbar: React.FC = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const showDrawer = () => setDrawerVisible(true);
	const onClose = () => setDrawerVisible(false);

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	const userMenu = (
		<Menu>
			<Menu.Item key="profile" icon={<UserOutlined />}>
				<Link to="/profile">Profile</Link>
			</Menu.Item>
			<Menu.Item key="orders" icon={<AppstoreOutlined />}>
				<Link to="/orders">My Orders</Link>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
				Logout
			</Menu.Item>
		</Menu>
	);

	const guestMenu = (
		<Menu>
			<Menu.Item key="login">
				<Link to="/login">Login</Link>
			</Menu.Item>
			<Menu.Item key="register">
				<Link to="/register">Register</Link>
			</Menu.Item>
		</Menu>
	);

	const navigationMenu = (
		<Menu
			mode="horizontal"
			selectedKeys={[location.pathname]}
			style={{ backgroundColor: COLORS.background }}
		>
			<Menu.Item key="/" icon={<HomeOutlined />}>
				<Link to="/">Home</Link>
			</Menu.Item>
			<Menu.Item key="/flowers" icon={<AppstoreOutlined />}>
				<Link to="/flowers">Flowers</Link>
			</Menu.Item>
		</Menu>
	);

	return (
		<AntHeader
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				zIndex: 1000,
				backgroundColor: COLORS.background,
				padding: '0 20px',
			}}
			className="shadow-md"
		>
			<Row justify="space-between" align="middle">
				{' '}
				<Col xs={6} sm={4} md={4} className="text-center">
					<Link to="/">
						<img
							src="/favicon.ico"
							alt="Rose Shop"
							className="h-10 w-auto mx-auto"
							style={{ maxHeight: 40 }}
						/>
					</Link>
				</Col>
				<Col xs={0} sm={0} md={12} className="flex justify-center">
					{navigationMenu}
				</Col>
				<Col xs={0} sm={0} md={8} className="text-center">
					<Space size="middle" direction="horizontal">
						<div className="flex justify-center">
							<Search
								placeholder="Search..."
								onSearch={(value) =>
									navigate(`/flowers?search=${encodeURIComponent(value)}`)
								}
								style={{ width: 200 }}
							/>
						</div>{' '}
						<div className="flex justify-center">
							<Dropdown
								overlay={user ? userMenu : guestMenu}
								placement="bottomRight"
							>
								<Avatar
									src={user?.userInfo?.avatar || user?.avatar}
									icon={<UserOutlined />}
									style={{ cursor: 'pointer' }}
								>
									{!user?.userInfo?.avatar &&
									!user?.avatar &&
									(user?.userInfo?.fullName || user?.fullName)
										? (user?.userInfo?.fullName || user?.fullName)
												?.charAt(0)
												.toUpperCase()
										: undefined}
								</Avatar>
							</Dropdown>
						</div>
						<div className="flex justify-center">
							<Link to="/cart">
								<Badge count={0} offset={[0, 0]}>
									<ShoppingCartOutlined
										style={{ fontSize: '1.5em', cursor: 'pointer' }}
									/>
								</Badge>
							</Link>
						</div>
					</Space>
				</Col>
				<Col xs={6} sm={4} md={0} style={{ textAlign: 'right' }}>
					<Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
				</Col>
			</Row>
			<Drawer
				title="Menu"
				placement="right"
				onClose={onClose}
				open={drawerVisible}
			>
				{navigationMenu}
				<div style={{ marginTop: 20 }}>
					<Search
						placeholder="Search..."
						onSearch={(value) => {
							navigate(`/flowers?search=${encodeURIComponent(value)}`);
							onClose();
						}}
					/>
				</div>
				<div style={{ marginTop: 20 }}>
					{user ? (
						<>
							<div style={{ marginBottom: 10 }}>
								<span>
									Welcome,{' '}
									{user?.userInfo?.fullName || user?.fullName || user?.username}
									!
								</span>
							</div>
							<Button
								icon={<UserOutlined />}
								block
								style={{ marginBottom: 10 }}
								onClick={() => {
									navigate('/profile');
									onClose();
								}}
							>
								Profile
							</Button>
							<Button icon={<LogoutOutlined />} block onClick={handleLogout}>
								Logout
							</Button>
						</>
					) : (
						<Dropdown overlay={guestMenu} placement="bottomLeft">
							<Button icon={<UserOutlined />}>Account</Button>
						</Dropdown>
					)}
				</div>
				<div style={{ marginTop: 20 }}>
					<Link to="/cart" onClick={onClose}>
						<Badge count={0} offset={[0, 0]}>
							<ShoppingCartOutlined
								style={{ fontSize: '1.5em', cursor: 'pointer' }}
							/>
						</Badge>
					</Link>
				</div>
			</Drawer>
		</AntHeader>
	);
};
