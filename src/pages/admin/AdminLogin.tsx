import { useAuth } from '../../hooks/useAuth';
import {
	ArrowLeftOutlined,
	LockOutlined,
	SafetyCertificateOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface AdminLoginForm {
	username: string;
	password: string;
}

export const AdminLogin: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login, user } = useAuth();
	const navigate = useNavigate();

	// Redirect if already logged in as admin
	useEffect(() => {
		if (user && user.type === 'admin') {
			navigate('/admin', { replace: true });
		} else if (user && user.type !== 'admin') {
			// If logged in as regular user, redirect to regular login
			navigate('/login', { replace: true });
		}
	}, [user, navigate]);

	const onFinish = async (values: AdminLoginForm) => {
		setLoading(true);
		setError(null);

		try {
			const userData = await login(values.username, values.password);

			// Check if the logged in user is an admin
			if (userData.type === 'admin') {
				navigate('/admin', { replace: true });
			} else {
				setError('Access denied. This portal is for administrators only.');
				// Optionally logout the user if they're not admin
				// logout();
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Login failed. Please check your credentials.';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center py-12 px-4"
			style={{
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				position: 'relative',
			}}
		>
			{/* Background decoration */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-20"></div>
				<div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-15"></div>
				<div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-25"></div>
			</div>

			<div className="max-w-md w-full relative z-10">
				<div className="mb-6">
					<Link to="/">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							className="text-white hover:text-gray-200 border-none"
							size="large"
						>
							Back to Home
						</Button>
					</Link>
				</div>

				<Card
					className="shadow-2xl border-0"
					style={{ borderRadius: '16px', overflow: 'hidden' }}
				>
					{/* Header with gradient */}
					<div
						className="text-center mb-8 -mx-6 -mt-6 px-6 pt-8 pb-6"
						style={{
							background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
						}}
					>
						<div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
							<SafetyCertificateOutlined
								className="text-4xl"
								style={{ color: '#667eea' }}
							/>
						</div>
						<Title level={2} className="text-white mb-2">
							Admin Portal
						</Title>
						<Text className="text-gray-100">
							Secure access for administrators only
						</Text>
					</div>

					{error && (
						<Alert
							message={error}
							type="error"
							className="mb-6"
							showIcon
							style={{ borderRadius: '8px' }}
						/>
					)}

					<Form
						name="adminLogin"
						onFinish={onFinish}
						layout="vertical"
						size="large"
						requiredMark={false}
					>
						<Form.Item
							name="username"
							label={<Text strong>Administrator Username</Text>}
							rules={[
								{
									required: true,
									message: 'Please input your admin username!',
								},
								{ min: 3, message: 'Username must be at least 3 characters!' },
							]}
						>
							<Input
								prefix={<UserOutlined style={{ color: '#667eea' }} />}
								placeholder="Enter admin username"
								style={{ borderRadius: '8px', padding: '12px' }}
							/>
						</Form.Item>

						<Form.Item
							name="password"
							label={<Text strong>Password</Text>}
							rules={[
								{ required: true, message: 'Please input your password!' },
								{ min: 6, message: 'Password must be at least 6 characters!' },
							]}
						>
							<Input.Password
								prefix={<LockOutlined style={{ color: '#667eea' }} />}
								placeholder="Enter admin password"
								style={{ borderRadius: '8px', padding: '12px' }}
							/>
						</Form.Item>

						<Form.Item className="mb-4">
							<Button
								type="primary"
								htmlType="submit"
								className="w-full font-semibold"
								loading={loading}
								size="large"
								style={{
									background:
										'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									borderColor: 'transparent',
									borderRadius: '8px',
									height: '48px',
									border: 'none',
								}}
							>
								{loading ? 'Signing In...' : 'Access Admin Panel'}
							</Button>
						</Form.Item>
					</Form>

					{/* Security notice */}
					<div className="text-center mt-6 p-4 bg-gray-50 rounded-lg">
						<Text className="text-gray-600 text-sm">
							🔒 This is a secure area. All access attempts are logged and
							monitored.
						</Text>
					</div>

					{/* Footer */}
					<div className="text-center mt-4">
						<Text className="text-gray-500 text-xs">
							PlatformFlower Admin Portal v1.0
						</Text>
					</div>
				</Card>

				{/* Additional info card */}
				<Card className="mt-4 bg-white/10 backdrop-blur-sm border-white/20">
					<div className="text-center">
						<Text className="text-white">
							Need help? Contact system administrator
						</Text>
					</div>
				</Card>
			</div>
		</div>
	);
};
