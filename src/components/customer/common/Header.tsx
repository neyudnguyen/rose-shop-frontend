'use client';

import {
	AppstoreOutlined,
	HomeOutlined,
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
import Link from 'next/link';
import React, { useState } from 'react';

import LoginFormModal from '@/components/customer/common/header/LoginFormModal';
import RegisterFormModal from '@/components/customer/common/header/RegisterFormModal';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [loginModalVisible, setLoginModalVisible] = useState(false);
	const [registerModalVisible, setRegisterModalVisible] = useState(false);

	const showDrawer = () => setDrawerVisible(true);
	const onClose = () => setDrawerVisible(false);

	const showLoginModal = () => {
		setLoginModalVisible(true);
		setRegisterModalVisible(false);
	};

	const hideLoginModal = () => {
		setLoginModalVisible(false);
	};

	const showRegisterModal = () => {
		setRegisterModalVisible(true);
		setLoginModalVisible(false);
	};

	const hideRegisterModal = () => {
		setRegisterModalVisible(false);
	};
	const accountMenu = (
		<Menu>
			<Menu.Item key="login" onClick={showLoginModal}>
				Login
			</Menu.Item>
			<Menu.Item key="register" onClick={showRegisterModal}>
				Register
			</Menu.Item>
		</Menu>
	);

	const navigationMenu = (
		<Menu
			mode="horizontal"
			defaultSelectedKeys={['home']}
			style={{ backgroundColor: '#F0EEED' }}
		>
			<Menu.Item key="home" icon={<HomeOutlined />}>
				<Link href="/">Home</Link>
			</Menu.Item>
			<Menu.Item key="top-flow-1" icon={<AppstoreOutlined />}>
				<Link href="/flowers/top-flow-1">Flow 1</Link>
			</Menu.Item>
			<Menu.Item key="top-flow-2" icon={<AppstoreOutlined />}>
				<Link href="/flowers/top-flow-2">Flow 2</Link>
			</Menu.Item>
			<Menu.Item key="top-flow-3" icon={<AppstoreOutlined />}>
				<Link href="/flowers/top-flow-3">Flow 3</Link>
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
				backgroundColor: '#F0EEED',
				padding: '0 20px',
			}}
		>
			<Row justify="space-between" align="middle">
				<Col xs={6} sm={4} md={4} className="text-center">
					<Link href="/">
						<div style={{ fontWeight: 'bold' }}>Rose Shop</div>
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
								onSearch={(value) => console.log(value)}
								style={{ width: 200 }}
							/>
						</div>
						<div className="flex justify-center">
							<Dropdown overlay={accountMenu} placement="bottomRight">
								<Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
							</Dropdown>
						</div>
						<div className="flex justify-center">
							<Badge count={3} offset={[0, 0]}>
								<ShoppingCartOutlined
									style={{ fontSize: '1.5em', cursor: 'pointer' }}
								/>
							</Badge>
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
						onSearch={(value) => console.log(value)}
					/>
				</div>
				<div style={{ marginTop: 20 }}>
					<Dropdown overlay={accountMenu} placement="bottomLeft">
						<Button icon={<UserOutlined />} onClick={(e) => e.preventDefault()}>
							Account
						</Button>
					</Dropdown>
				</div>
				<div style={{ marginTop: 20 }}>
					<Badge count={3} offset={[0, 0]}>
						<ShoppingCartOutlined
							style={{ fontSize: '1.5em', cursor: 'pointer' }}
						/>
					</Badge>
				</div>
			</Drawer>{' '}
			{/* Login Modal */}
			<LoginFormModal
				isVisible={loginModalVisible}
				onCancel={hideLoginModal}
				onRegisterClick={showRegisterModal}
			/>
			{/* Register Modal */}
			<RegisterFormModal
				isVisible={registerModalVisible}
				onCancel={hideRegisterModal}
				onLoginClick={showLoginModal}
			/>
		</AntHeader>
	);
};

export default Header;
