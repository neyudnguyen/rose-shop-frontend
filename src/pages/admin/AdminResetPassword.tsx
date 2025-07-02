import { COLORS } from '../../constants/colors';
import { useAdminNotification } from '../../services/adminNotification';
import { adminPasswordResetService } from '../../services/adminPasswordResetService';
import {
	ArrowLeftOutlined,
	LockOutlined,
	SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

interface AdminResetPasswordForm {
	newPassword: string;
	confirmPassword: string;
}

export const AdminResetPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [validatingToken, setValidatingToken] = useState(true);
	const [form] = Form.useForm();
	const notification = useAdminNotification();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	// Validate token on component mount
	useEffect(() => {
		const validateToken = async () => {
			if (!token) {
				setError(
					'No reset token provided. Please start the password reset process again.',
				);
				setValidatingToken(false);
				return;
			}

			try {
				const isValid =
					await adminPasswordResetService.validateResetToken(token);
				if (!isValid) {
					setError('Invalid or expired reset token. Please request a new one.');
				}
			} catch (err: unknown) {
				const errorMessage =
					(err as { response?: { data?: { message?: string } } })?.response
						?.data?.message ||
					'Invalid or expired reset token. Please request a new one.';
				setError(errorMessage);
			} finally {
				setValidatingToken(false);
			}
		};

		validateToken();
	}, [token]);

	const onFinish = async (values: AdminResetPasswordForm) => {
		if (!token) {
			setError(
				'No reset token provided. Please start the password reset process again.',
			);
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await adminPasswordResetService.resetPassword({
				token,
				newPassword: values.newPassword,
				confirmPassword: values.confirmPassword,
			});

			if (response.success) {
				notification.success(
					'Password Reset Successful',
					'Your admin password has been reset successfully. You can now login with your new password.',
				);
				navigate('/admin/login', { replace: true });
			} else {
				setError(response.message || 'Failed to reset password');
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to reset password. Please try again.';
			setError(errorMessage);
			notification.operationFailed('reset password for', 'Admin', errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (validatingToken) {
		return (
			<div
				className="min-h-screen flex items-center justify-center py-12 px-4"
				style={{
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					position: 'relative',
				}}
			>
				<div className="max-w-md w-full relative z-10">
					<Card
						className="shadow-2xl border-0"
						style={{ borderRadius: '16px', overflow: 'hidden' }}
					>
						<div className="text-center py-8">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
							<Text style={{ color: COLORS.textSecondary }}>
								Validating reset token...
							</Text>
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
					<Link to="/admin/enter-reset-token">
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
							Back to Enter Token
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
							Set New Password
						</Title>
						<Text style={{ color: COLORS.white, opacity: 0.9 }}>
							Create a new secure password for your admin account
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
						name="admin-reset-password"
						onFinish={onFinish}
						layout="vertical"
						size="large"
						requiredMark={false}
					>
						<Form.Item
							name="newPassword"
							label={<Text strong>New Password</Text>}
							rules={[
								{ required: true, message: 'Please input your new password!' },
								{ min: 6, message: 'Password must be at least 6 characters!' },
								{
									pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
									message:
										'Password must contain at least one lowercase letter, one uppercase letter, and one number!',
								},
							]}
							extra={
								<Text type="secondary" className="text-sm">
									Must be at least 6 characters with uppercase, lowercase, and
									number
								</Text>
							}
						>
							<Input.Password
								prefix={<LockOutlined style={{ color: '#667eea' }} />}
								placeholder="Enter new password"
								style={{ borderRadius: '8px', padding: '12px' }}
							/>
						</Form.Item>

						<Form.Item
							name="confirmPassword"
							label={<Text strong>Confirm New Password</Text>}
							dependencies={['newPassword']}
							rules={[
								{
									required: true,
									message: 'Please confirm your new password!',
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('newPassword') === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error('Passwords do not match!'));
									},
								}),
							]}
						>
							<Input.Password
								prefix={<LockOutlined style={{ color: '#667eea' }} />}
								placeholder="Confirm new password"
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
								{loading ? 'Resetting Password...' : 'Reset Password'}
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
