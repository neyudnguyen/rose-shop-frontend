import { COLORS } from '../constants/colors';
import { passwordResetService } from '../services/passwordResetService';
import { useUserNotification } from '../services/userNotification';
import { CheckCircleOutlined, LockOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

interface ResetPasswordForm {
	newPassword: string;
	confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [validatingToken, setValidatingToken] = useState(true);
	const [tokenValid, setTokenValid] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [form] = Form.useForm();
	const notification = useUserNotification();
	const navigate = useNavigate();
	const { token } = useParams<{ token: string }>();

	// Validate token on component mount
	useEffect(() => {
		const validateToken = async () => {
			if (!token) {
				setError('Invalid reset link');
				setValidatingToken(false);
				return;
			}

			try {
				const isValid = await passwordResetService.validateResetToken(token);
				setTokenValid(isValid);
				if (!isValid) {
					setError('This reset link is invalid or has expired');
				}
			} catch (err: unknown) {
				console.error('Token validation error:', err);
				setTokenValid(false);
				setError('This reset link is invalid or has expired');
			} finally {
				setValidatingToken(false);
			}
		};

		validateToken();
	}, [token]);

	const onFinish = async (values: ResetPasswordForm) => {
		if (!token) {
			setError('Invalid reset token');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await passwordResetService.resetPassword({
				token,
				newPassword: values.newPassword,
				confirmPassword: values.confirmPassword,
			});

			if (response.success) {
				setSuccess(true);
				notification.success(
					'Password Reset Successful',
					'Your password has been reset successfully. You can now login with your new password.',
				);
			} else {
				setError(response.message || 'Failed to reset password');
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to reset password. Please try again.';
			setError(errorMessage);
			notification.actionFailed('Reset password', errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// Show loading while validating token
	if (validatingToken) {
		return (
			<div
				className="min-h-screen flex items-center justify-center py-12 px-4"
				style={{ backgroundColor: COLORS.background }}
			>
				<div className="text-center">
					<Spin size="large" />
					<div className="mt-4">
						<Text style={{ color: COLORS.textSecondary }}>
							Validating reset link...
						</Text>
					</div>
				</div>
			</div>
		);
	}

	// Show success message
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
									<CheckCircleOutlined
										style={{ fontSize: '24px', color: COLORS.success }}
									/>
								</div>
								<Title level={2} style={{ color: COLORS.textPrimary }}>
									Password Reset Successful
								</Title>
								<Text style={{ color: COLORS.textSecondary }}>
									Your password has been reset successfully. You can now login
									with your new password.
								</Text>
							</div>
							<Button
								type="primary"
								onClick={() => navigate('/login')}
								className="w-full"
								style={{
									backgroundColor: COLORS.primary,
									borderColor: COLORS.primary,
									height: '40px',
								}}
							>
								Go to Login
							</Button>
						</div>
					</Card>
				</div>
			</div>
		);
	}

	// Show error if token is invalid
	if (!tokenValid) {
		return (
			<div
				className="min-h-screen flex items-center justify-center py-12 px-4"
				style={{ backgroundColor: COLORS.background }}
			>
				<div className="max-w-md w-full">
					<Card className="shadow-lg">
						<div className="text-center">
							<Title level={2} style={{ color: COLORS.textPrimary }}>
								Invalid Reset Link
							</Title>
							<Text
								style={{ color: COLORS.textSecondary, marginBottom: '24px' }}
							>
								This password reset link is invalid or has expired. Please
								request a new one.
							</Text>
							{error && (
								<Alert message={error} type="error" className="mb-4" showIcon />
							)}
							<div className="space-y-2">
								<Button
									type="primary"
									onClick={() => navigate('/forgot-password')}
									className="w-full"
									style={{
										backgroundColor: COLORS.primary,
										borderColor: COLORS.primary,
										height: '40px',
									}}
								>
									Request New Reset Link
								</Button>
								<Button
									type="default"
									onClick={() => navigate('/login')}
									className="w-full"
									style={{ height: '40px' }}
								>
									Back to Login
								</Button>
							</div>
						</div>
					</Card>
				</div>
			</div>
		);
	}

	// Show reset password form
	return (
		<div
			className="min-h-screen flex items-center justify-center py-12 px-4"
			style={{ backgroundColor: COLORS.background }}
		>
			<div className="max-w-md w-full">
				<Card className="shadow-lg">
					<div className="text-center mb-6">
						<img
							src="/favicon.ico"
							alt="Rose Shop"
							className="h-16 w-auto mx-auto mb-4"
						/>
						<Title level={2} style={{ color: COLORS.textPrimary }}>
							Reset Password
						</Title>
						<Text style={{ color: COLORS.textSecondary }}>
							Enter your new password below
						</Text>
					</div>

					{error && (
						<Alert message={error} type="error" className="mb-4" showIcon />
					)}

					<Form
						form={form}
						name="reset-password"
						onFinish={onFinish}
						layout="vertical"
						size="large"
					>
						<Form.Item
							name="newPassword"
							label="New Password"
							rules={[
								{ required: true, message: 'Please input your new password!' },
								{ min: 6, message: 'Password must be at least 6 characters!' },
							]}
						>
							<Input.Password
								prefix={<LockOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your new password"
							/>
						</Form.Item>

						<Form.Item
							name="confirmPassword"
							label="Confirm New Password"
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
								prefix={<LockOutlined style={{ color: COLORS.primary }} />}
								placeholder="Confirm your new password"
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
								Reset Password
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
