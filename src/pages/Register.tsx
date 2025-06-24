import { useAuth } from '../hooks/useAuth';
import {
	ArrowLeftOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Divider, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface RegisterForm {
	email: string;
	password: string;
	confirmPassword: string;
	fullName: string;
	phone?: string;
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
				email: values.email,
				password: values.password,
				fullName: values.fullName,
				phone: values.phone,
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
						<Title level={2}>Create Account</Title>
						<Text className="text-gray-600">
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
							name="fullName"
							label="Full Name"
							rules={[
								{ required: true, message: 'Please input your full name!' },
								{ min: 2, message: 'Full name must be at least 2 characters!' },
							]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Enter your full name"
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
							<Input prefix={<MailOutlined />} placeholder="Enter your email" />
						</Form.Item>

						<Form.Item
							name="phone"
							label="Phone Number (Optional)"
							rules={[
								{
									pattern: /^[0-9+\-\s()]+$/,
									message: 'Please enter a valid phone number!',
								},
							]}
						>
							<Input
								prefix={<PhoneOutlined />}
								placeholder="Enter your phone number"
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
								prefix={<LockOutlined />}
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
								prefix={<LockOutlined />}
								placeholder="Confirm your password"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								className="w-full"
								loading={loading}
							>
								Create Account
							</Button>
						</Form.Item>
					</Form>
					<Divider>Or</Divider>
					<div className="text-center">
						<Text>
							Already have an account?{' '}
							<Link to="/login" className="text-blue-600 hover:text-blue-800">
								Sign in
							</Link>
						</Text>
					</div>
				</Card>
			</div>
		</div>
	);
};
