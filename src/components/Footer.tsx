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
						</Col>

						<Col xs={24} sm={12} md={5}>
							<Title level={4}>Shop</Title>
							<Space direction="vertical" size="small">
								<AntLink className="footer-link">
									<Link to="/flowers">All Products</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/flowers?category=fresh">Fresh Flowers</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/flowers?category=dried">Dried Flowers</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/flowers?category=plants">Live Plants</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/flowers?category=vases">Designer Vases</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/flowers?category=candles">Aroma Candles</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/flowers?category=diffuser">
										Freshener Diffuser
									</Link>
								</AntLink>
							</Space>
						</Col>

						<Col xs={24} sm={12} md={5}>
							<Title level={4}>Service</Title>
							<Space direction="vertical" size="small">
								<AntLink className="footer-link">
									<Link to="/services/subscription">Flower Subscription</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/services/wedding">Wedding & Event Decor</Link>
								</AntLink>
							</Space>
						</Col>

						<Col xs={24} sm={12} md={6}>
							<Title level={4}>About Us</Title>
							<Space direction="vertical" size="small">
								<AntLink className="footer-link">
									<Link to="/about">Our Story</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/blog">Blog</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/shipping">Shipping & Returns</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/terms">Terms & Conditions</Link>
								</AntLink>
								<AntLink className="footer-link">
									<Link to="/privacy">Privacy Policy</Link>
								</AntLink>
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
