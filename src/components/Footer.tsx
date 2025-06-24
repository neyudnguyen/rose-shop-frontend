import {
	EnvironmentOutlined,
	FacebookOutlined,
	InstagramOutlined,
	MailOutlined,
	PhoneOutlined,
	TwitterOutlined,
} from '@ant-design/icons';
import { Col, Divider, Layout, Row, Space, Typography } from 'antd';
import React from 'react';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

export const Footer: React.FC = () => {
	return (
		<AntFooter className="bg-gray-800 text-white mt-auto">
			<div className="max-w-7xl mx-auto px-4 py-8">
				<Row gutter={[32, 32]}>
					<Col xs={24} sm={12} md={6}>
						<Title level={4} className="text-white">
							PlatformFlower
						</Title>
						<Text className="text-gray-300">
							Your trusted partner for beautiful flowers and memorable moments.
						</Text>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Title level={5} className="text-white">
							Quick Links
						</Title>
						<Space direction="vertical">
							<Link href="/" className="text-gray-300 hover:text-white">
								Home
							</Link>
							<Link href="/flowers" className="text-gray-300 hover:text-white">
								Flowers
							</Link>
							<Link href="/about" className="text-gray-300 hover:text-white">
								About Us
							</Link>
							<Link href="/contact" className="text-gray-300 hover:text-white">
								Contact
							</Link>
						</Space>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Title level={5} className="text-white">
							Categories
						</Title>
						<Space direction="vertical">
							<Link
								href="/flowers?category=roses"
								className="text-gray-300 hover:text-white"
							>
								Roses
							</Link>
							<Link
								href="/flowers?category=wedding"
								className="text-gray-300 hover:text-white"
							>
								Wedding Flowers
							</Link>
							<Link
								href="/flowers?category=birthday"
								className="text-gray-300 hover:text-white"
							>
								Birthday Flowers
							</Link>
							<Link
								href="/flowers?category=orchid"
								className="text-gray-300 hover:text-white"
							>
								Orchids
							</Link>
						</Space>
					</Col>

					<Col xs={24} sm={12} md={6}>
						<Title level={5} className="text-white">
							Contact Info
						</Title>
						<Space direction="vertical">
							<Space>
								<PhoneOutlined />
								<Text className="text-gray-300">+84 123 456 789</Text>
							</Space>
							<Space>
								<MailOutlined />
								<Text className="text-gray-300">info@platformflower.com</Text>
							</Space>
							<Space>
								<EnvironmentOutlined />
								<Text className="text-gray-300">Ho Chi Minh City, Vietnam</Text>
							</Space>
						</Space>

						<div className="mt-4">
							<Space size="middle">
								<FacebookOutlined className="text-xl text-gray-300 hover:text-white cursor-pointer" />
								<TwitterOutlined className="text-xl text-gray-300 hover:text-white cursor-pointer" />
								<InstagramOutlined className="text-xl text-gray-300 hover:text-white cursor-pointer" />
							</Space>
						</div>
					</Col>
				</Row>

				<Divider className="border-gray-600" />

				<div className="text-center">
					<Text className="text-gray-400">
						© 2025 PlatformFlower. All rights reserved.
					</Text>
				</div>
			</div>
		</AntFooter>
	);
};
