import { COLORS } from '../../constants/colors';
import { useAdminNotification } from '../../services/adminNotification';
import { adminPasswordResetService } from '../../services/adminPasswordResetService';
import {
	ArrowLeftOutlined,
	MailOutlined,
	SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface AdminForgotPasswordForm {
	email: string;
}

export const AdminForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [form] = Form.useForm();
	const notification = useAdminNotification();
	const navigate = useNavigate();

	const onFinish = async (values: AdminForgotPasswordForm) => {
		setLoading(true);
		setError(null);

		try {
			const response = await adminPasswordResetService.forgotPassword(
				values.email,
			);

			if (response.success) {
				setSuccess(true);
				notification.success(
					'Email Sent',
					'Password reset instructions have been sent to your admin email address.',
				);
			} else {
				setError(response.message || 'Failed to send reset email');
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to send reset email. Please try again.';
			setError(errorMessage);
			notification.operationFailed(
				'send reset email to',
				'Admin',
				errorMessage,
			);
		} finally {
			setLoading(false);
		}
	};

	if (success) {
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
					<Card
						className="shadow-2xl border-0"
						style={{ borderRadius: '16px', overflow: 'hidden' }}
					>
						<div className="text-center">
							<div className="mb-6">
								<div
									className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
									style={{
										background:
											'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									}}
								>
									<MailOutlined
										style={{ fontSize: '24px', color: COLORS.white }}
									/>
								</div>
								<Title level={2} style={{ color: COLORS.textPrimary }}>
									Check Your Email
								</Title>
								<Text style={{ color: COLORS.textSecondary }}>
									We've sent a reset token to your admin email address. Please
									check your inbox for the token and use it below to reset your
									password.
								</Text>
							</div>
							<div className="space-y-4">
								<Button
									type="primary"
									onClick={() => navigate('/admin/enter-reset-token')}
									className="w-full font-semibold"
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
									Enter Reset Token
								</Button>
								<Button
									type="default"
									onClick={() => navigate('/admin/login')}
									className="w-full"
									size="large"
									style={{
										borderRadius: '8px',
										height: '48px',
									}}
								>
									Back to Admin Login
								</Button>
								<Button
									type="text"
									onClick={() => {
										setSuccess(false);
										form.resetFields();
									}}
									className="w-full"
									style={{
										color: '#667eea',
										height: '48px',
									}}
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
					<Link to="/admin/login">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							style={{
								color: COLORS.white,
								borderColor: 'transparent',
							}}
							className="hover:text-gray-200 border-none"
							size="large"
						>
							Back to Admin Login
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
						<Title level={2} style={{ color: COLORS.white }} className="mb-2">
							Admin Password Reset
						</Title>
						<Text style={{ color: COLORS.white, opacity: 0.9 }}>
							Enter your admin email address to reset password
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
						form={form}
						name="admin-forgot-password"
						onFinish={onFinish}
						layout="vertical"
						size="large"
						requiredMark={false}
					>
						<Form.Item
							name="email"
							label={<Text strong>Administrator Email Address</Text>}
							rules={[
								{
									required: true,
									message: 'Please input your admin email address!',
								},
								{
									type: 'email',
									message: 'Please enter a valid email address!',
								},
							]}
						>
							<Input
								prefix={<MailOutlined style={{ color: '#667eea' }} />}
								placeholder="Enter your admin email address"
								type="email"
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
								{loading ? 'Sending...' : 'Send Reset Instructions'}
							</Button>
						</Form.Item>
					</Form>

					<div className="text-center">
						<Text style={{ color: COLORS.textSecondary }}>
							Remember your password?{' '}
							<Link
								to="/admin/login"
								style={{
									color: '#667eea',
									textDecoration: 'none',
									fontWeight: 500,
								}}
								onMouseEnter={(e) => (e.currentTarget.style.color = '#764ba2')}
								onMouseLeave={(e) => (e.currentTarget.style.color = '#667eea')}
							>
								Back to Login
							</Link>
						</Text>
					</div>

					{/* Footer */}
					<div className="text-center mt-6">
						<Text className="text-gray-500 text-xs">
							PlatformFlower Admin Portal v1.0
						</Text>
					</div>
				</Card>
			</div>
		</div>
	);
};
