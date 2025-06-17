'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { FC, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { LoginRequest } from '@/types/auth';
import { handleAPIError } from '@/utils/errorHandler';

interface LoginFormValues {
	username: string;
	password: string;
	remember: boolean;
}

interface LoginFormModalProps {
	isVisible: boolean;
	onCancel: () => void;
	onRegisterClick?: () => void;
}

const LoginFormModal: FC<LoginFormModalProps> = ({
	isVisible,
	onCancel,
	onRegisterClick,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const handleLogin = async (values: LoginFormValues) => {
		setLoading(true);
		try {
			// Prepare the data in the format expected by the API
			const loginData: LoginRequest = {
				username: values.username,
				password: values.password,
			};

			// Call the login API
			const response = await authService.login(loginData);

			if (response.success) {
				message.success(response.message || 'Login successful!');

				// Log the user in
				login(response.data.user);

				// Close modal and reset form
				onCancel();
				form.resetFields();
			} else {
				message.error(response.message || 'Login failed');
			}
		} catch (error) {
			console.error('Login error:', error);
			const errorMessage = handleAPIError(error);
			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			title={
				<div
					style={{
						textAlign: 'center',
						fontSize: '24px',
						fontWeight: 'bold',
						padding: '12px 0',
						color: '#644A07',
					}}
				>
					Login to Rose Shop
				</div>
			}
			open={isVisible}
			onCancel={onCancel}
			footer={null}
		>
			<Form
				form={form}
				name="login"
				initialValues={{ remember: true }}
				onFinish={handleLogin}
			>
				<Form.Item
					name="username"
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="Password"
						size="large"
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<a href="#" style={{ float: 'right' }}>
						Forgot password
					</a>
				</Form.Item>{' '}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
						size="large"
						loading={loading}
					>
						Log in
					</Button>
					<div style={{ textAlign: 'center', marginTop: 16 }}>
						Don&apos;t have an account?{' '}
						<Button
							type="link"
							onClick={() => {
								onCancel();
								if (onRegisterClick) onRegisterClick();
							}}
							style={{ padding: 0 }}
						>
							Register now
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LoginFormModal;
