import { COLORS } from '../constants/colors';
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
		<AntFooter
			style={{
				backgroundColor: COLORS.backgroundDark,
				padding: '40px 20px 20px',
				color: COLORS.textLight,
			}}
		>
			<Row justify="center">
				<Col xs={24} md={20}>
					<Row gutter={[48, 32]}>
						<Col xs={24} sm={12} md={4}>
							{' '}
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								Contact Us
							</Title>
							<Space direction="vertical" size="small">
								<Text style={{ color: COLORS.textSecondary }}>Address</Text>
								<Space>
									<EnvironmentOutlined style={{ color: COLORS.primary }} />
									<Text style={{ color: COLORS.textLight }}>
										FPT Quy Nhơn University
									</Text>
								</Space>
								<Text style={{ color: COLORS.textSecondary }}>Phone</Text>
								<Space>
									<PhoneOutlined style={{ color: COLORS.primary }} />
									<Text style={{ color: COLORS.textLight }}>
										+84 123 456 789
									</Text>
								</Space>
								<Text style={{ color: COLORS.textSecondary }}>
									General Enquiry
								</Text>
								<Space>
									<MailOutlined style={{ color: COLORS.primary }} />
									<Text style={{ color: COLORS.textLight }}>
										Kiev.Florist.Studio@gmail.com
									</Text>
								</Space>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={4}>
							{' '}
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								Follow Us
							</Title>
							<Space size="middle">
								<AntLink
									href="#"
									className="social-link"
									style={{
										color: COLORS.primary,
										fontSize: '20px',
										transition: 'color 0.3s ease',
									}}
								>
									<FacebookOutlined />
								</AntLink>
								<AntLink
									href="#"
									className="social-link"
									style={{
										color: COLORS.primary,
										fontSize: '20px',
										transition: 'color 0.3s ease',
									}}
								>
									<InstagramOutlined />
								</AntLink>
								<AntLink
									href="#"
									className="social-link"
									style={{
										color: COLORS.primary,
										fontSize: '20px',
										transition: 'color 0.3s ease',
									}}
								>
									<TwitterOutlined />
								</AntLink>
								<AntLink
									href="#"
									className="social-link"
									style={{
										color: COLORS.primary,
										fontSize: '20px',
										transition: 'color 0.3s ease',
									}}
								>
									<PinterestOutlined />
								</AntLink>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={5}>
							{' '}
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								Shop
							</Title>
							<Space direction="vertical" size="small">
								<Link
									to="/flowers"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									All Products
								</Link>
								<Link
									to="/flowers?category=fresh"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Fresh Flowers
								</Link>
								<Link
									to="/flowers?category=dried"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Dried Flowers
								</Link>
								<Link
									to="/flowers?category=plants"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Live Plants
								</Link>{' '}
								<Link
									to="/flowers?category=vases"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Designer Vases
								</Link>
								<Link
									to="/flowers?category=candles"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Aroma Candles
								</Link>
								<Link
									to="/flowers?category=diffuser"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Freshener Diffuser
								</Link>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={5}>
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								Service
							</Title>
							<Space direction="vertical" size="small">
								<Link
									to="/services/subscription"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Flower Subscription
								</Link>
								<Link
									to="/services/wedding"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Wedding & Event Decor
								</Link>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={6}>
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								About Us
							</Title>
							<Space direction="vertical" size="small">
								<Link
									to="/about"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Our Story
								</Link>
								<Link
									to="/blog"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Blog
								</Link>
								<Link
									to="/shipping"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Shipping & Returns
								</Link>
								<Link
									to="/terms"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Terms & Conditions
								</Link>
								<Link
									to="/privacy"
									className="footer-link"
									style={{
										color: COLORS.textSecondary,
										transition: 'color 0.3s ease',
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.color = COLORS.primary)
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.color = COLORS.textSecondary)
									}
								>
									Privacy Policy
								</Link>
							</Space>
						</Col>
					</Row>{' '}
					<Divider
						style={{ borderColor: COLORS.textSecondary, margin: '32px 0 16px' }}
					/>
					<Row justify="center">
						<Col>
							<Text style={{ color: COLORS.textSecondary }}>
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
