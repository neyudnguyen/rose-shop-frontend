'use client';

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';
import { FC } from 'react';

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

	const handleRegister = (values: RegisterFormValues) => {
		console.log('Register form values:', values);
		// Here you would handle registration logic
		message.success(`Registration successful for ${values.username}!`);
		onCancel();
		form.resetFields();
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
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
						size="large"
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
