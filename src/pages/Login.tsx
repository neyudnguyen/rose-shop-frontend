import { useAuth } from '../hooks/useAuth';
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
	email: string;
	password: string;
}

export const Login: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from =
		(location.state as { from?: { pathname: string } })?.from?.pathname || '/';

	const onFinish = async (values: LoginForm) => {
		setLoading(true);
		setError(null);

		try {
			await login(values.email, values.password);
			navigate(from, { replace: true });
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Login failed. Please try again.';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
			<div className="max-w-md w-full">
				<div className="mb-4">
					<Link to="/">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							className="text-gray-600 hover:text-gray-800"
						>
							Back to Home
						</Button>
					</Link>
				</div>
				<Card className="shadow-lg">
					{' '}
					<div className="text-center mb-6">
						<img
							src="/favicon.ico"
							alt="PlatformFlower"
							className="h-16 w-auto mx-auto mb-4"
						/>
						<Title level={2}>Welcome Back</Title>
						<Text className="text-gray-600">
							Sign in to your account to continue
						</Text>
					</div>
					{error && (
						<Alert message={error} type="error" className="mb-4" showIcon />
					)}
					<Form name="login" onFinish={onFinish} layout="vertical" size="large">
						<Form.Item
							name="email"
							label="Email"
							rules={[
								{ required: true, message: 'Please input your email!' },
								{ type: 'email', message: 'Please enter a valid email!' },
							]}
						>
							<Input prefix={<UserOutlined />} placeholder="Enter your email" />
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
								prefix={<LockOutlined />}
								placeholder="Enter your password"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="w-full"
								loading={loading}
							>
								Sign In
							</Button>
						</Form.Item>
					</Form>
					<Divider>Or</Divider>
					<div className="text-center">
						<Text>
							Don't have an account?{' '}
							<Link
								to="/register"
								className="text-blue-600 hover:text-blue-800"
							>
								Sign up now
							</Link>
						</Text>
					</div>
				</Card>
			</div>
		</div>
	);
};
