'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { FC } from 'react';

interface LoginFormValues {
	username: string;
	password: string;
	remember: boolean;
}

interface LoginFormModalProps {
	isVisible: boolean;
	onCancel: () => void;
}

const LoginFormModal: FC<LoginFormModalProps> = ({ isVisible, onCancel }) => {
	const [form] = Form.useForm();

	const handleLogin = (values: LoginFormValues) => {
		console.log('Login form values:', values);
		// Here you would handle authentication logic
		message.success(`Welcome back, ${values.username}!`);
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
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: '100%' }}
						size="large"
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LoginFormModal;
