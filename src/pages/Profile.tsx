import { useAuth } from '../hooks/useAuth';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import {
	Alert,
	Avatar,
	Button,
	Card,
	Divider,
	Form,
	Input,
	Space,
	Typography,
} from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

interface ProfileForm {
	fullName: string;
	email: string;
	phone?: string;
}

export const Profile: React.FC = () => {
	const { user, updateUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onFinish = async (values: ProfileForm) => {
		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			await updateUser(values);
			setSuccess('Profile updated successfully!');
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to update profile. Please try again.';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (!user) {
		return null;
	}
	return (
		<div className="max-w-2xl mx-auto px-4 py-8" style={{ paddingTop: '80px' }}>
			<Card className="shadow-lg">
				<div className="text-center mb-6">
					<Avatar size={80} icon={<UserOutlined />} className="mb-4" />
					<Title level={2}>My Profile</Title>
					<Text className="text-gray-600">Manage your account information</Text>
				</div>

				<Divider />

				{success && (
					<Alert
						message={success}
						type="success"
						className="mb-4"
						showIcon
						closable
						onClose={() => setSuccess(null)}
					/>
				)}

				{error && (
					<Alert
						message={error}
						type="error"
						className="mb-4"
						showIcon
						closable
						onClose={() => setError(null)}
					/>
				)}

				<Form
					name="profile"
					onFinish={onFinish}
					layout="vertical"
					size="large"
					initialValues={{
						fullName: user.fullName,
						email: user.email,
						phone: user.phone || '',
					}}
				>
					<Form.Item
						name="fullName"
						label="Full Name"
						rules={[
							{ required: true, message: 'Please input your full name!' },
							{ min: 2, message: 'Full name must be at least 2 characters!' },
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Enter your full name"
						/>
					</Form.Item>

					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
					>
						<Input prefix={<MailOutlined />} placeholder="Enter your email" />
					</Form.Item>

					<Form.Item
						name="phone"
						label="Phone Number"
						rules={[
							{
								pattern: /^[0-9+\-\s()]+$/,
								message: 'Please enter a valid phone number!',
							},
						]}
					>
						<Input
							prefix={<PhoneOutlined />}
							placeholder="Enter your phone number"
						/>
					</Form.Item>

					<Form.Item>
						<Space className="w-full justify-end">
							<Button
								type="primary"
								htmlType="submit"
								loading={loading}
								size="large"
							>
								Update Profile
							</Button>
						</Space>
					</Form.Item>
				</Form>

				<Divider />

				<div className="bg-gray-50 p-4 rounded-lg">
					<Title level={5}>Account Information</Title>
					<Space direction="vertical" size="small">
						<Text>
							<strong>Account ID:</strong> {user.id}
						</Text>
						<Text>
							<strong>Role:</strong> {user.role}
						</Text>
						<Text>
							<strong>Status:</strong>
							<span className={user.status ? 'text-green-600' : 'text-red-600'}>
								{user.status ? ' Active' : ' Inactive'}
							</span>
						</Text>
					</Space>
				</div>
			</Card>
		</div>
	);
};
