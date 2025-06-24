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
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link: AntLink } = Typography;

export const Footer: React.FC = () => {
	return (
		<AntFooter>
			<Row justify="center">
				<Col xs={24} md={20}>
					<Row gutter={[48, 32]}>
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
									<Text>+84 123 456 789</Text>
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
								<AntLink href="#" className="social-link">
									<FacebookOutlined />
								</AntLink>
								<AntLink href="#" className="social-link">
									<InstagramOutlined />
								</AntLink>
								<AntLink href="#" className="social-link">
									<TwitterOutlined />
								</AntLink>
								<AntLink href="#" className="social-link">
									<PinterestOutlined />
								</AntLink>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={5}>
							<Title level={4}>Shop</Title>
							<Space direction="vertical" size="small">
								<Link to="/flowers" className="footer-link">
									All Products
								</Link>
								<Link to="/flowers?category=fresh" className="footer-link">
									Fresh Flowers
								</Link>
								<Link to="/flowers?category=dried" className="footer-link">
									Dried Flowers
								</Link>
								<Link to="/flowers?category=plants" className="footer-link">
									Live Plants
								</Link>
								<Link to="/flowers?category=vases" className="footer-link">
									Designer Vases
								</Link>
								<Link to="/flowers?category=candles" className="footer-link">
									Aroma Candles
								</Link>
								<Link to="/flowers?category=diffuser" className="footer-link">
									Freshener Diffuser
								</Link>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={5}>
							<Title level={4}>Service</Title>
							<Space direction="vertical" size="small">
								<Link to="/services/subscription" className="footer-link">
									Flower Subscription
								</Link>
								<Link to="/services/wedding" className="footer-link">
									Wedding & Event Decor
								</Link>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={6}>
							<Title level={4}>About Us</Title>
							<Space direction="vertical" size="small">
								<Link to="/about" className="footer-link">
									Our Story
								</Link>
								<Link to="/blog" className="footer-link">
									Blog
								</Link>
								<Link to="/shipping" className="footer-link">
									Shipping & Returns
								</Link>
								<Link to="/terms" className="footer-link">
									Terms & Conditions
								</Link>
								<Link to="/privacy" className="footer-link">
									Privacy Policy
								</Link>
							</Space>
						</Col>
					</Row>

					<Divider />
					<Row justify="center">
						<Col>
							<Text>
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
