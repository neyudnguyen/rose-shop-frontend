import { COLORS } from '../constants/colors';
import { passwordResetService } from '../services/passwordResetService';
import { ArrowLeftOutlined, KeyOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface TokenForm {
	token: string;
}

export const EnterResetToken: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onFinish = async (values: TokenForm) => {
		setLoading(true);
		setError(null);

		try {
			// Validate token before redirecting
			const isValid = await passwordResetService.validateResetToken(
				values.token,
			);

			if (isValid) {
				// Redirect to reset password page with token
				navigate(`/reset-password/${values.token}`);
			} else {
				setError(
					'Invalid or expired token. Please check your email and try again.',
				);
			}
		} catch (err: unknown) {
			console.error('Token validation error:', err);
			setError(
				'Invalid or expired token. Please check your email and try again.',
			);
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
					<Link to="/forgot-password">
						<Button
							type="text"
							icon={<ArrowLeftOutlined />}
							style={{ color: COLORS.textPrimary }}
							className="hover:text-gray-800"
						>
							Back to Forgot Password
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
							Enter Reset Token
						</Title>
						<Text style={{ color: COLORS.textSecondary }}>
							Please enter the reset token from your email to continue
						</Text>
					</div>

					<div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
						<Text style={{ color: COLORS.textSecondary, fontSize: '14px' }}>
							<strong>Check your email</strong> for a message with your reset
							token. The token will look something like:{' '}
							<code
								style={{
									backgroundColor: '#f0f0f0',
									padding: '2px 4px',
									borderRadius: '3px',
								}}
							>
								XXXXXXXX
							</code>
						</Text>
					</div>

					{error && (
						<Alert message={error} type="error" className="mb-4" showIcon />
					)}

					<Form
						form={form}
						name="enter-token"
						onFinish={onFinish}
						layout="vertical"
						size="large"
					>
						<Form.Item
							name="token"
							label="Reset Token"
							rules={[
								{ required: true, message: 'Please enter your reset token!' },
								{ min: 6, message: 'Token must be at least 6 characters!' },
								{
									pattern: /^[A-Z0-9]+$/,
									message:
										'Token should contain only uppercase letters and numbers!',
								},
							]}
						>
							<Input
								prefix={<KeyOutlined style={{ color: COLORS.primary }} />}
								placeholder="Enter your reset token (e.g., XXXXXXXX)"
								style={{ textTransform: 'uppercase' }}
								onChange={(e) => {
									// Auto-convert to uppercase
									const value = e.target.value.toUpperCase();
									form.setFieldsValue({ token: value });
								}}
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
								Continue to Reset Password
							</Button>
						</Form.Item>
					</Form>

					<div className="text-center space-y-2">
						<div>
							<Text style={{ color: COLORS.textSecondary }}>
								Didn't receive an email?{' '}
								<Link
									to="/forgot-password"
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
									Send another one
								</Link>
							</Text>
						</div>
						<div>
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
					</div>
				</Card>
			</div>
		</div>
	);
};
