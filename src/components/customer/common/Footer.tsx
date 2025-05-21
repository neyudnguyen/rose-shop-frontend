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

const Footer: React.FC = () => {
	return (
		<AntFooter
			style={{ background: '#001529', color: '#fff', padding: '40px 0 20px' }}
		>
			<Row justify="center">
				<Col xs={24} md={20}>
					<Row gutter={[48, 32]}>
						{/* Contact Section */}
						<Col xs={24} sm={12} md={4}>
							<Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
								Contact Us
							</Title>
							<Space direction="vertical" size="small">
								<Text type="secondary">Address</Text>
								<Space>
									<EnvironmentOutlined />
									<Text style={{ color: '#fff' }}>FPT Quy Nhơn University</Text>
								</Space>
								<Text type="secondary">Phone</Text>
								<Space>
									<PhoneOutlined />
									<Text style={{ color: '#fff' }}>+380980099777</Text>
								</Space>
								<Text type="secondary">General Enquiry</Text>
								<Space>
									<MailOutlined />
									<Text style={{ color: '#fff' }}>
										Kiev.Florist.Studio@gmail.com
									</Text>
								</Space>
							</Space>
						</Col>

						{/* Follow Us Section */}
						<Col xs={24} sm={12} md={4}>
							<Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
								Follow Us
							</Title>
							<Space size="middle">
								<Link
									href="#"
									style={{ color: '#fff', fontSize: '24px' }}
									className="social-link"
								>
									<FacebookOutlined />
								</Link>
								<Link
									href="#"
									style={{ color: '#fff', fontSize: '24px' }}
									className="social-link"
								>
									<InstagramOutlined />
								</Link>
								<Link
									href="#"
									style={{ color: '#fff', fontSize: '24px' }}
									className="social-link"
								>
									<TwitterOutlined />
								</Link>
								<Link
									href="#"
									style={{ color: '#fff', fontSize: '24px' }}
									className="social-link"
								>
									<PinterestOutlined />
								</Link>
							</Space>
						</Col>

						{/* Shop Section */}
						<Col xs={24} sm={12} md={5}>
							<Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
								Shop
							</Title>
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

						{/* Service Section */}
						<Col xs={24} sm={12} md={5}>
							<Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
								Service
							</Title>
							<Space direction="vertical" size="small">
								<Link className="footer-link">Flower Subscription</Link>
								<Link className="footer-link">Wedding & Event Decor</Link>
							</Space>
						</Col>

						{/* About Us Section */}
						<Col xs={24} sm={12} md={6}>
							<Title level={4} style={{ color: '#fff', marginBottom: 16 }}>
								About Us
							</Title>
							<Space direction="vertical" size="small">
								<Link className="footer-link">Our Story</Link>
								<Link className="footer-link">Blog</Link>
								<Link className="footer-link">Shipping & Returns</Link>
								<Link className="footer-link">Terms & Conditions</Link>
								<Link className="footer-link">Privacy Policy</Link>
							</Space>
						</Col>
					</Row>

					{/* Copyright Section */}
					<Divider
						style={{
							borderColor: 'rgba(255, 255, 255, 0.2)',
							margin: '32px 0 16px',
						}}
					/>
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

			<style jsx global>{`
				.footer-link {
					color: rgba(255, 255, 255, 0.8) !important;
				}
				.footer-link:hover {
					color: #ff85c0 !important;
				}
				.social-link:hover {
					color: #ff85c0 !important;
				}
			`}</style>
		</AntFooter>
	);
};

export default Footer;
