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
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);

	const showDrawer = () => setDrawerVisible(true);
	const onClose = () => setDrawerVisible(false);

	const accountMenu = (
		<Menu>
			<Menu.Item key="login">Login</Menu.Item>
			<Menu.Item key="register">Register</Menu.Item>
		</Menu>
	);

	const navigationMenu = (
		<Menu
			mode="horizontal"
			defaultSelectedKeys={['home']}
			style={{ backgroundColor: '#F0EEED' }}
		>
			<Menu.Item key="home" icon={<HomeOutlined />}>
				Home
			</Menu.Item>
			<Menu.Item key="top-flow-1" icon={<AppstoreOutlined />}>
				Flow 1
			</Menu.Item>
			<Menu.Item key="top-flow-2" icon={<AppstoreOutlined />}>
				Flow 2
			</Menu.Item>
			<Menu.Item key="top-flow-3" icon={<AppstoreOutlined />}>
				Flow 3
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
				visible={drawerVisible}
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
						<Button icon={<UserOutlined />}>Account</Button>
					</Dropdown>
				</div>
				<div style={{ marginTop: 20 }}>
					<Badge count={3} offset={[0, 0]}>
						<ShoppingCartOutlined
							style={{ fontSize: '1.5em', cursor: 'pointer' }}
						/>
					</Badge>
				</div>
			</Drawer>
		</AntHeader>
	);
};

export default Header;
