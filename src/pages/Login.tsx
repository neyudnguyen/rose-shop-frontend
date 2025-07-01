import { COLORS } from '../constants/colors';
import { useAuth } from '../hooks/useAuth';
import { useUserNotification } from '../services/userNotification';
import {
	ArrowLeftOutlined,
	LockOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Divider, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface LoginForm {
	username: string;
	password: string;
}

export const Login: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();
	const notification = useUserNotification();
	const navigate = useNavigate();
	const location = useLocation();
	const from =
		(location.state as { from?: { pathname: string } })?.from?.pathname || '/';
	const onFinish = async (values: LoginForm) => {
		setLoading(true);
		setError(null);

		try {
			const response = await login(values.username, values.password);
			notification.loginSuccess(
				response?.userInfo?.fullName || response?.username || values.username,
			);
			navigate(from, { replace: true });
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Login failed. Please try again.';
			setError(errorMessage);
			notification.actionFailed('Login', errorMessage);
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
							Welcome Back
						</Title>
						<Text style={{ color: COLORS.textSecondary }}>
							Sign in to your account to continue
						</Text>
					</div>
					{error && (
						<Alert message={error} type="error" className="mb-4" showIcon />
					)}
					<Form name="login" onFinish={onFinish} layout="vertical" size="large">
						<Form.Item
							name="username"
							label="Username"
							rules={[
								{ required: true, message: 'Please input your username!' },
								{ min: 3, message: 'Username must be at least 3 characters!' },
							]}
						>
							<Input
								prefix={<UserOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your username"
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
								Sign In
							</Button>
						</Form.Item>
					</Form>
					<Divider>Or</Divider>
					<div className="text-center space-y-2">
						<div>
							<Text style={{ color: COLORS.textSecondary }}>
								Don't have an account?{' '}
								<Link
									to="/register"
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
									Sign up now
								</Link>
							</Text>
						</div>
						<div>
							<Text style={{ color: COLORS.textSecondary }}>
								Administrator?{' '}
								<Link
									to="/admin/login"
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
									Admin Portal
								</Link>
							</Text>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};
