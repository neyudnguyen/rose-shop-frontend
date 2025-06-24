import { COLORS } from '../constants/colors';
import { useAuth } from '../hooks/useAuth';
import {
	ArrowLeftOutlined,
	LockOutlined,
	MailOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Divider, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface RegisterForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const Register: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { register } = useAuth();
	const navigate = useNavigate();
	const onFinish = async (values: RegisterForm) => {
		setLoading(true);
		setError(null);

		try {
			await register({
				username: values.username,
				email: values.email,
				password: values.password,
			});
			navigate('/');
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Registration failed. Please try again.';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div
			className="min-h-screen flex items-center justify-center py-12 px-4"
			style={{ backgroundColor: COLORS.background }}
		>
			<div className="max-w-md w-full">
				<div className="mb-4">
					<Link to="/">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							style={{ color: COLORS.textPrimary }}
							className="hover:text-gray-800"
						>
							Back to Home
						</Button>
					</Link>
				</div>
				<Card className="shadow-lg">
					<div className="text-center mb-6">
						<img
							src="/favicon.ico"
							alt="Rose Shop"
							className="h-16 w-auto mx-auto mb-4"
						/>
						<Title level={2} style={{ color: COLORS.textPrimary }}>
							Create Account
						</Title>
						<Text style={{ color: COLORS.textSecondary }}>
							Join us to discover beautiful flowers
						</Text>
					</div>
					{error && (
						<Alert message={error} type="error" className="mb-4" showIcon />
					)}
					<Form
						name="register"
						onFinish={onFinish}
						layout="vertical"
						size="large"
					>
						<Form.Item
							name="username"
							label="Username"
							rules={[
								{ required: true, message: 'Please input your username!' },
								{ min: 3, message: 'Username must be at least 3 characters!' },
								{ max: 20, message: 'Username must not exceed 20 characters!' },
								{
									pattern: /^[a-zA-Z0-9_]+$/,
									message:
										'Username can only contain letters, numbers, and underscores!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your username"
							/>
						</Form.Item>

						<Form.Item
							name="email"
							label="Email"
							rules={[
								{ required: true, message: 'Please input your email!' },
								{ type: 'email', message: 'Please enter a valid email!' },
							]}
						>
							<Input
								prefix={<MailOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your email"
							/>
						</Form.Item>

						<Form.Item
							name="password"
							label="Password"
							rules={[
								{ required: true, message: 'Please input your password!' },
								{ min: 6, message: 'Password must be at least 6 characters!' },
							]}
						>
							<Input.Password
								prefix={<LockOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your password"
							/>
						</Form.Item>

						<Form.Item
							name="confirmPassword"
							label="Confirm Password"
							dependencies={['password']}
							rules={[
								{ required: true, message: 'Please confirm your password!' },
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error('The two passwords do not match!'),
										);
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined style={{ color: COLORS.primary }} />}
								placeholder="Confirm your password"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="w-full"
								loading={loading}
								style={{
									backgroundColor: COLORS.primary,
									borderColor: COLORS.primary,
									height: '40px',
								}}
							>
								Create Account
							</Button>
						</Form.Item>
					</Form>
					<Divider>Or</Divider>
					<div className="text-center">
						<Text style={{ color: COLORS.textSecondary }}>
							Already have an account?{' '}
							<Link
								to="/login"
								style={{
									color: COLORS.primary,
									textDecoration: 'none',
								}}
								onMouseEnter={(e) =>
									(e.currentTarget.style.color = COLORS.primaryDark)
								}
								onMouseLeave={(e) =>
									(e.currentTarget.style.color = COLORS.primary)
								}
							>
								Sign in
							</Link>
						</Text>
					</div>
				</Card>
			</div>
		</div>
	);
};
