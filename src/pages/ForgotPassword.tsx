import { COLORS } from '../constants/colors';
import { passwordResetService } from '../services/passwordResetService';
import { useUserNotification } from '../services/userNotification';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface ForgotPasswordForm {
	email: string;
}

export const ForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [form] = Form.useForm();
	const notification = useUserNotification();
	const navigate = useNavigate();

	const onFinish = async (values: ForgotPasswordForm) => {
		setLoading(true);
		setError(null);

		try {
			const response = await passwordResetService.forgotPassword(values.email);

			if (response.success) {
				setSuccess(true);
				notification.success(
					'Email Sent',
					'Password reset instructions have been sent to your email address.',
				);
			} else {
				setError(response.message || 'Failed to send reset email');
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to send reset email. Please try again.';
			setError(errorMessage);
			notification.actionFailed('Send reset email', errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div
				className="min-h-screen flex items-center justify-center py-12 px-4"
				style={{ backgroundColor: COLORS.background }}
			>
				<div className="max-w-md w-full">
					<Card className="shadow-lg">
						<div className="text-center">
							<div className="mb-6">
								<div
									className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
									style={{ backgroundColor: `${COLORS.success}20` }}
								>
									<MailOutlined
										style={{ fontSize: '24px', color: COLORS.success }}
									/>
								</div>
								<Title level={2} style={{ color: COLORS.textPrimary }}>
									Check Your Email
								</Title>
								<Text style={{ color: COLORS.textSecondary }}>
									We've sent a reset token to your email address. Please check
									your inbox for the token and use it below to reset your
									password.
								</Text>
							</div>
							<div className="space-y-4">
								<Button
									type="primary"
									onClick={() => navigate('/enter-reset-token')}
									className="w-full"
									style={{
										backgroundColor: COLORS.primary,
										borderColor: COLORS.primary,
										height: '40px',
									}}
								>
									Enter Reset Token
								</Button>
								<Button
									type="default"
									onClick={() => navigate('/login')}
									className="w-full"
									style={{
										backgroundColor: COLORS.primary,
										borderColor: COLORS.primary,
										height: '40px',
									}}
								>
									Back to Login
								</Button>
								<Button
									type="default"
									onClick={() => {
										setSuccess(false);
										form.resetFields();
									}}
									className="w-full"
									style={{ height: '40px' }}
								>
									Send Another Email
								</Button>
							</div>
						</div>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div
			className="min-h-screen flex items-center justify-center py-12 px-4"
			style={{ backgroundColor: COLORS.background }}
		>
			<div className="max-w-md w-full">
				<div className="mb-4">
					<Link to="/login">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							style={{ color: COLORS.textPrimary }}
							className="hover:text-gray-800"
						>
							Back to Login
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
							Forgot Password
						</Title>
						<Text style={{ color: COLORS.textSecondary }}>
							Enter your email address and we'll send you instructions to reset
							your password.
						</Text>
					</div>

					{error && (
						<Alert message={error} type="error" className="mb-4" showIcon />
					)}

					<Form
						form={form}
						name="forgot-password"
						onFinish={onFinish}
						layout="vertical"
						size="large"
					>
						<Form.Item
							name="email"
							label="Email Address"
							rules={[
								{ required: true, message: 'Please input your email address!' },
								{
									type: 'email',
									message: 'Please enter a valid email address!',
								},
							]}
						>
							<Input
								prefix={<MailOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your email address"
								type="email"
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
								Send Reset Instructions
							</Button>
						</Form.Item>
					</Form>

					<div className="text-center">
						<Text style={{ color: COLORS.textSecondary }}>
							Remember your password?{' '}
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
