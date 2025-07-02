import { COLORS } from '../../constants/colors';
import { useAdminNotification } from '../../services/adminNotification';
import { adminPasswordResetService } from '../../services/adminPasswordResetService';
import {
	ArrowLeftOutlined,
	KeyOutlined,
	SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Alert, Button, Card, Form, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

interface EnterResetTokenForm {
	token: string;
}

export const AdminEnterResetToken: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [form] = Form.useForm();
	const notification = useAdminNotification();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	// Auto-fill token if provided in URL
	useEffect(() => {
		const tokenFromUrl = searchParams.get('token');
		if (tokenFromUrl) {
			form.setFieldsValue({ token: tokenFromUrl });
		}
	}, [searchParams, form]);

	const onFinish = async (values: EnterResetTokenForm) => {
		setLoading(true);
		setError(null);

		try {
			const isValid = await adminPasswordResetService.validateResetToken(
				values.token,
			);

			if (isValid) {
				notification.success(
					'Token Verified',
					'Your reset token is valid. You can now reset your password.',
				);
				navigate(
					`/admin/reset-password?token=${encodeURIComponent(values.token)}`,
				);
			} else {
				setError('Invalid or expired reset token. Please request a new one.');
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message ||
				'Invalid or expired reset token. Please request a new one.';
			setError(errorMessage);
			notification.operationFailed(
				'validate reset token for',
				'Admin',
				errorMessage,
			);
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
					<Link to="/admin/forgot-password">
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
							Back to Send Email
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
							Enter Reset Token
						</Title>
						<Text style={{ color: COLORS.white, opacity: 0.9 }}>
							Enter the reset token sent to your admin email
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
						name="admin-enter-reset-token"
						onFinish={onFinish}
						layout="vertical"
						size="large"
						requiredMark={false}
					>
						<Form.Item
							name="token"
							label={<Text strong>Reset Token</Text>}
							rules={[
								{ required: true, message: 'Please input your reset token!' },
								{
									min: 6,
									message: 'Reset token must be at least 6 characters!',
								},
							]}
							extra={
								<Text type="secondary" className="text-sm">
									Check your admin email for the reset token
								</Text>
							}
						>
							<Input
								prefix={<KeyOutlined style={{ color: '#667eea' }} />}
								placeholder="Enter your reset token"
								style={{ borderRadius: '8px', padding: '12px' }}
								autoComplete="off"
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
								{loading ? 'Verifying...' : 'Verify Token'}
							</Button>
						</Form.Item>
					</Form>

					<div className="text-center space-y-2">
						<Text style={{ color: COLORS.textSecondary }}>
							Didn't receive the token?{' '}
							<Link
								to="/admin/forgot-password"
								style={{
									color: '#667eea',
									textDecoration: 'none',
									fontWeight: 500,
								}}
								onMouseEnter={(e) => (e.currentTarget.style.color = '#764ba2')}
								onMouseLeave={(e) => (e.currentTarget.style.color = '#667eea')}
							>
								Send again
							</Link>
						</Text>
						<br />
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
