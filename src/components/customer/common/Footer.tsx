'use client';

import {
	EnvironmentOutlined,
	FacebookOutlined,
	InstagramOutlined,
	MailOutlined,
	PhoneOutlined,
	PinterestOutlined,
	TwitterOutlined,
} from '@ant-design/icons';
import { Col, Divider, Layout, Row, Space, Typography } from 'antd';
import React from 'react';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
	return (
		<AntFooter>
			<Row justify="center">
				<Col xs={24} md={20}>
					<Row gutter={[48, 32]}>
						{/* Contact Section */}
						<Col xs={24} sm={12} md={4}>
							<Title level={4}>Contact Us</Title>
							<Space direction="vertical" size="small">
								<Text type="secondary">Address</Text>
								<Space>
									<EnvironmentOutlined />
									<Text>FPT Quy Nhơn University</Text>
								</Space>
								<Text type="secondary">Phone</Text>
								<Space>
									<PhoneOutlined />
									<Text>+380980099777</Text>
								</Space>
								<Text type="secondary">General Enquiry</Text>
								<Space>
									<MailOutlined />
									<Text>Kiev.Florist.Studio@gmail.com</Text>
								</Space>
							</Space>
						</Col>

						<Col xs={24} sm={12} md={4}>
							<Title level={4}>Follow Us</Title>
							<Space size="middle">
								<Link href="#" className="social-link">
									<FacebookOutlined />
								</Link>
								<Link href="#" className="social-link">
									<InstagramOutlined />
								</Link>
								<Link href="#" className="social-link">
									<TwitterOutlined />
								</Link>
								<Link href="#" className="social-link">
									<PinterestOutlined />
								</Link>
							</Space>
						</Col>

						<Col xs={24} sm={12} md={5}>
							<Title level={4}>Shop</Title>
							<Space direction="vertical" size="small">
								<Link className="footer-link">All Products</Link>
								<Link className="footer-link">Fresh Flowers</Link>
								<Link className="footer-link">Dried Flowers</Link>
								<Link className="footer-link">Live Plants</Link>
								<Link className="footer-link">Designer Vases</Link>
								<Link className="footer-link">Aroma Candles</Link>
								<Link className="footer-link">Freshener Diffuser</Link>
							</Space>
						</Col>

						<Col xs={24} sm={12} md={5}>
							<Title level={4}>Service</Title>
							<Space direction="vertical" size="small">
								<Link className="footer-link">Flower Subscription</Link>
								<Link className="footer-link">Wedding & Event Decor</Link>
							</Space>
						</Col>

						<Col xs={24} sm={12} md={6}>
							<Title level={4}>About Us</Title>
							<Space direction="vertical" size="small">
								<Link className="footer-link">Our Story</Link>
								<Link className="footer-link">Blog</Link>
								<Link className="footer-link">Shipping & Returns</Link>
								<Link className="footer-link">Terms & Conditions</Link>
								<Link className="footer-link">Privacy Policy</Link>
							</Space>
						</Col>
					</Row>

					<Divider />
					<Row justify="center">
						<Col>
							<Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
								&copy; {new Date().getFullYear()} Rose Shop. All rights
								reserved.
							</Text>
						</Col>
					</Row>
				</Col>
			</Row>
		</AntFooter>
	);
};

export default Footer;
