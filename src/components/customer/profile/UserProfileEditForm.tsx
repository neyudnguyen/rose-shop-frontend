'use client';

import {
	ArrowLeftOutlined,
	SaveOutlined,
	UploadOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	DatePicker,
	Divider,
	Form,
	Image,
	Input,
	Select,
	Spin,
	Switch,
	Typography,
	Upload,
	message,
} from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';

import { userService } from '@/services/userService';

const { Title } = Typography;
const { Option } = Select;

interface UserProfileFormValues {
	fullName: string;
	address: string;
	birthDate: dayjs.Dayjs;
	sex: string;
	isSeller: boolean;
	avatar?: File;
}

const UserProfileEditForm = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState<string>('');
	const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
	const [fetchLoading, setFetchLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setFetchLoading(true);
				const response = await userService.getProfile();
				if (response.success) {
					if (response.data.userInfo?.avatar) {
						setAvatarUrl(response.data.userInfo.avatar);
					} // Set initial form values
					const initialValues = {
						fullName: response.data.userInfo?.fullName || '',
						address: response.data.userInfo?.address || '',
						birthDate: response.data.userInfo?.birthDate
							? dayjs()
									.year(response.data.userInfo.birthDate.year)
									.month(response.data.userInfo.birthDate.month - 1)
									.date(response.data.userInfo.birthDate.day)
							: undefined,
						sex: response.data.userInfo?.sex
							? response.data.userInfo.sex.toLowerCase()
							: '',
						isSeller: response.data.userInfo?.isSeller || false,
					};
					console.log('Setting initial form values:', initialValues);
					form.setFieldsValue(initialValues);
				}
			} catch (error) {
				console.error('Error fetching profile:', error);
				message.error('Failed to load profile data');
			} finally {
				setFetchLoading(false);
			}
		};

		fetchProfile();
	}, [form]);

	const handleSubmit = async (values: UserProfileFormValues) => {
		console.log('Form submitted with values:', values);
		setLoading(true);
		try {
			const birthDate = values.birthDate;
			const profileUpdateData = {
				fullName: values.fullName,
				address: values.address,
				birthDate: birthDate.format('YYYY-MM-DD'), // DateOnly format
				sex: values.sex,
				isSeller: values.isSeller,
				avatar: avatarFile,
			};

			const response = await userService.updateProfile(profileUpdateData);
			if (response.success) {
				message.success('Profile updated successfully!');
				NProgress.start();
				router.push('/profile');
			} else {
				message.error(response.message || 'Failed to update profile');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			let errorMessage = 'Failed to update profile. Please try again.';
			try {
				const parsedError = JSON.parse((error as Error).message);
				if (parsedError.message) {
					errorMessage = parsedError.message;
				}
			} catch {
				errorMessage = (error as Error).message || errorMessage;
			}
			message.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};
	const handleAvatarChange = (info: {
		file: { status?: string; originFileObj?: File };
	}) => {
		if (info.file.status === 'uploading') {
			return;
		}

		if (info.file.originFileObj) {
			setAvatarFile(info.file.originFileObj);
			// Create preview URL
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarUrl(e.target?.result as string);
			};
			reader.readAsDataURL(info.file.originFileObj);
		}
	};

	const uploadProps = {
		name: 'avatar',
		beforeUpload: () => false, // Prevent auto upload
		onChange: handleAvatarChange,
		showUploadList: false,
		accept: 'image/*',
	};

	if (fetchLoading) {
		return (
			<div className="w-full flex justify-center items-center min-h-64">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="w-full">
			<Card className="shadow-md">
				<div className="flex flex-col items-center text-center mb-6">
					<div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-white text-5xl overflow-hidden mb-4 relative">
						{avatarUrl ? (
							<Image
								src={avatarUrl}
								alt="Avatar"
								width={128}
								height={128}
								className="rounded-full object-cover"
								style={{ width: '100%', height: '100%' }}
								preview={false}
							/>
						) : (
							<UserOutlined style={{ fontSize: '64px', color: '#fff' }} />
						)}
					</div>
					<Upload {...uploadProps}>
						<Button
							icon={<UploadOutlined />}
							className="rounded-full shadow-sm hover:shadow px-4"
						>
							Change Avatar
						</Button>
					</Upload>
				</div>
				<Title level={2} className="text-center text-[#644A07] mb-6">
					Edit Profile
				</Title>
				<Divider />{' '}
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					className="w-full"
				>
					<Form.Item
						name="fullName"
						label={
							<span className="text-[#644A07] font-medium">Full Name</span>
						}
						rules={[{ required: true, message: 'Please enter your full name' }]}
					>
						<Input
							size="large"
							placeholder="Enter your full name"
							className="rounded-lg"
						/>
					</Form.Item>
					<Form.Item
						name="address"
						label={<span className="text-[#644A07] font-medium">Address</span>}
						rules={[{ required: true, message: 'Please enter your address' }]}
					>
						<Input.TextArea
							rows={3}
							placeholder="Enter your address"
							className="rounded-lg"
						/>
					</Form.Item>
					<Form.Item
						name="birthDate"
						label={
							<span className="text-[#644A07] font-medium">Birth Date</span>
						}
						rules={[
							{ required: true, message: 'Please select your birth date' },
						]}
					>
						<DatePicker
							size="large"
							style={{ width: '100%' }}
							className="rounded-lg"
							placeholder="Select your birth date"
						/>
					</Form.Item>{' '}
					<Form.Item
						name="sex"
						label={<span className="text-[#644A07] font-medium">Gender</span>}
						rules={[
							{ required: true, message: 'Please select your gender' },
							{
								validator: (_, value) => {
									if (!value || ['male', 'female', 'other'].includes(value)) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error('Please select a valid gender'),
									);
								},
							},
						]}
					>
						<Select
							size="large"
							placeholder="Select your gender"
							className="rounded-lg"
							allowClear
						>
							<Option value="male">Male</Option>
							<Option value="female">Female</Option>
							<Option value="other">Other</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="isSeller"
						label={
							<span className="text-[#644A07] font-medium">Seller Account</span>
						}
						valuePropName="checked"
					>
						<Switch checkedChildren="Yes" unCheckedChildren="No" />
					</Form.Item>
					<Form.Item className="text-center mt-8">
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							icon={<SaveOutlined />}
							loading={loading}
							className="bg-[#644A07] hover:bg-[#8B6914] border-none rounded-lg px-8 mr-4"
						>
							Save Changes
						</Button>{' '}
						<Button
							size="large"
							onClick={() => {
								NProgress.start();
								router.push('/profile');
							}}
							className="rounded-lg px-8"
							icon={<ArrowLeftOutlined />}
						>
							Cancel
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default UserProfileEditForm;
