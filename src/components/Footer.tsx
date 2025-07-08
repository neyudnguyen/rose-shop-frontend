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
										flowershopplatform@gmail.com
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
									All Flowers
								</Link>
								<Link
									to="/cart"
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
									Shopping Cart
								</Link>
								<Link
									to="/orders"
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
									My Orders
								</Link>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={5}>
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								Account
							</Title>
							<Space direction="vertical" size="small">
								<Link
									to="/login"
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
									Login
								</Link>
								<Link
									to="/register"
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
									Register
								</Link>
								<Link
									to="/profile"
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
									My Profile
								</Link>
							</Space>
						</Col>{' '}
						<Col xs={24} sm={12} md={6}>
							<Title
								level={4}
								style={{ color: COLORS.textLight, marginBottom: '16px' }}
							>
								Information
							</Title>
							<Space direction="vertical" size="small">
								<Link
									to="/"
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
									Home
								</Link>
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
									Browse Flowers
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
