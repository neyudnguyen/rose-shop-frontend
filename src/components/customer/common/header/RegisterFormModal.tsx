'use client';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { FC, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { RegisterRequest } from '@/types/auth';
import { handleAPIError } from '@/utils/errorHandler';

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface RegisterFormModalProps {
	isVisible: boolean;
	onCancel: () => void;
	onLoginClick?: () => void;
}

const RegisterFormModal: FC<RegisterFormModalProps> = ({
	isVisible,
	onCancel,
	onLoginClick,
}) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const handleRegister = async (values: RegisterFormValues) => {
		setLoading(true);
		try {
			// Prepare the data in the format expected by the API
			const registerData: RegisterRequest = {
				username: values.username,
				email: values.email,
				password: values.password,
			};

			// Call the registration API
			const response = await authService.register(registerData);

			if (response.success) {
				message.success(response.message || 'Registration successful!');

				// Log the user in automatically
				login(response.data.user);

				// Close modal and reset form
				onCancel();
				form.resetFields();
			} else {
				message.error(response.message || 'Registration failed');
			}
		} catch (error) {
			console.error('Registration error:', error);
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
					Register to Rose Shop
				</div>
			}
			open={isVisible}
			onCancel={onCancel}
			footer={null}
		>
			<Form
				form={form}
				name="register"
				onFinish={handleRegister}
				scrollToFirstError
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
						{
							min: 3,
							message: 'Username must be at least 3 characters!',
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="email"
					rules={[
						{
							type: 'email',
							message: 'Please enter a valid email address!',
						},
						{
							required: true,
							message: 'Please input your email!',
						},
					]}
				>
					<Input
						prefix={<MailOutlined className="site-form-item-icon" />}
						placeholder="Email"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
						{
							min: 6,
							message: 'Password must be at least 6 characters!',
						},
					]}
					hasFeedback
				>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="Password"
						size="large"
					/>
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
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
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="Confirm Password"
						size="large"
					/>
				</Form.Item>{' '}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
						size="large"
						loading={loading}
					>
						Register
					</Button>
					<div style={{ textAlign: 'center', marginTop: 16 }}>
						Already have an account?{' '}
						<Button
							type="link"
							onClick={() => {
								onCancel();
								if (onLoginClick) onLoginClick();
							}}
							style={{ padding: 0 }}
						>
							Login now
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RegisterFormModal;
