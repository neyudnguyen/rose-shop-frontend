import { COLORS } from '../constants/colors';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { useUserNotification } from '../services/userNotification';
import type { User } from '../types';
import {
	CalendarOutlined,
	CameraOutlined,
	CloudUploadOutlined,
	EditOutlined,
	EnvironmentOutlined,
	MailOutlined,
	ManOutlined,
	QuestionOutlined,
	UserOutlined,
	WomanOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Avatar,
	Button,
	Card,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	Row,
	Select,
	Space,
	Spin,
	Typography,
	Upload,
} from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

interface ProfileForm {
	fullName: string;
	address: string;
	birthDate: dayjs.Dayjs | null;
	sex: 'male' | 'female' | 'other';
}

const getBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const Profile: React.FC = () => {
	const { user, updateUser } = useAuth();
	const notification = useUserNotification();
	const navigate = useNavigate();
	const location = useLocation();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [avatarLoading, setAvatarLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [avatarFileList, setAvatarFileList] = useState<UploadFile[]>([]);
	const [previewImage, setPreviewImage] = useState<string>('');
	const [profileData, setProfileData] = useState<Partial<User> | null>(null);

	// Check if user came from checkout
	const from = (location.state as { from?: string })?.from;
	// Load profile data from API
	useEffect(() => {
		const loadProfile = async () => {
			if (user) {
				try {
					const profile = await authService.getCurrentUser();
					setProfileData(profile);
					// Set form initial values
					form.setFieldsValue({
						fullName: profile.userInfo?.fullName || profile.fullName || '',
						address: profile.userInfo?.address || profile.address || '',
						birthDate:
							profile.userInfo?.birthDate || profile.birthDate
								? dayjs(profile.userInfo?.birthDate || profile.birthDate)
								: null,
						sex: profile.userInfo?.sex || profile.sex || undefined,
					});
					// Set avatar preview if exists
					if (profile.userInfo?.avatar || profile.avatar) {
						setPreviewImage(profile.userInfo?.avatar || profile.avatar || '');
					}
				} catch (error) {
					console.error('Failed to load profile:', error);
				}
			}
		};
		loadProfile();
	}, [user, form]);

	const onFinish = async (values: ProfileForm) => {
		setLoading(true);
		setError(null);
		setSuccess(null);

		try {
			const formData = new FormData();

			// Append form data with exact field names matching API
			if (values.fullName) formData.append('FullName', values.fullName);
			if (values.address) formData.append('Address', values.address);
			if (values.birthDate) {
				formData.append('BirthDate', values.birthDate.format('YYYY-MM-DD'));
			}
			if (values.sex) formData.append('Sex', values.sex);
			await updateUser(formData);
			setSuccess('Profile updated successfully!');
			notification.updateProfileSuccess();

			// If user came from checkout, redirect back after successful update
			if (from === '/checkout') {
				setTimeout(() => {
					navigate('/checkout');
				}, 1500); // Small delay to show success message
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to update profile. Please try again.';
			setError(errorMessage);
			notification.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleAvatarUpdate = async () => {
		if (avatarFileList.length === 0 || !avatarFileList[0].originFileObj) {
			notification.warning('Please select an image first!');
			return;
		}

		setAvatarLoading(true);
		try {
			const formData = new FormData();
			formData.append('Avatar', avatarFileList[0].originFileObj);

			await updateUser(formData);
			notification.success('Avatar updated successfully!');
			setAvatarFileList([]); // Reload profile to get updated avatar
			const updatedProfile = await authService.getCurrentUser();
			setProfileData(updatedProfile);
			if (updatedProfile.userInfo?.avatar || updatedProfile.avatar) {
				setPreviewImage(
					updatedProfile.userInfo?.avatar || updatedProfile.avatar || '',
				);
			}
		} catch (err: unknown) {
			const errorMessage =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message || 'Failed to update avatar. Please try again.';
			notification.error(errorMessage);
		} finally {
			setAvatarLoading(false);
		}
	};

	const handleAvatarChange: UploadProps['onChange'] = async ({ fileList }) => {
		setAvatarFileList(fileList.slice(-1)); // Keep only the last file

		if (fileList.length > 0 && fileList[0].originFileObj) {
			try {
				const preview = await getBase64(fileList[0].originFileObj);
				setPreviewImage(preview);
			} catch (error) {
				console.error('Error generating preview:', error);
			}
		} else {
			setPreviewImage('');
		}
	};

	const uploadProps: UploadProps = {
		beforeUpload: (file) => {
			const isJpgOrPng =
				file.type === 'image/jpeg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				notification.error('You can only upload JPG/PNG files!');
				return false;
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				notification.error('Image must smaller than 2MB!');
				return false;
			}
			return false; // Prevent auto upload
		},
		fileList: avatarFileList,
		onChange: handleAvatarChange,
		listType: 'picture-card',
		showUploadList: false,
	};

	const getSexIcon = (sex?: string) => {
		switch (sex) {
			case 'male':
				return <ManOutlined style={{ color: COLORS.primary }} />;
			case 'female':
				return <WomanOutlined style={{ color: COLORS.primary }} />;
			default:
				return <QuestionOutlined style={{ color: COLORS.primary }} />;
		}
	};

	if (!user) {
		return (
			<div
				style={{
					paddingTop: '80px',
					textAlign: 'center',
					padding: '100px 20px',
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div
			style={{
				paddingTop: '80px',
				background: `linear-gradient(135deg, ${COLORS.background} 0%, #ffffff 100%)`,
				minHeight: 'calc(100vh - 80px)',
			}}
		>
			<div
				style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}
			>
				{/* Show alert if user came from checkout */}
				{from === '/checkout' && (
					<Alert
						message="Complete Your Profile"
						description="Please update your full name and address to continue with checkout."
						type="info"
						showIcon
						style={{
							marginBottom: '24px',
							borderRadius: '8px',
							border: `1px solid ${COLORS.primary}`,
							backgroundColor: '#f0f9ff',
						}}
					/>
				)}

				<Row gutter={[24, 24]}>
					{/* Profile Header */}
					<Col span={24}>
						<Card
							style={{
								borderRadius: '16px',
								boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
								border: 'none',
							}}
						>
							{' '}
							<div style={{ textAlign: 'center', padding: '20px 0' }}>
								<div
									style={{
										position: 'relative',
										display: 'inline-block',
										marginBottom: '24px',
									}}
								>
									{' '}
									<Avatar
										size={120}
										src={
											previewImage ||
											profileData?.userInfo?.avatar ||
											profileData?.avatar ||
											user?.userInfo?.avatar ||
											user?.avatar
										}
										icon={<UserOutlined />}
										style={{
											border: `4px solid ${COLORS.primary}`,
											boxShadow: '0 4px 16px rgba(247, 89, 171, 0.3)',
										}}
									/>
									<Upload {...uploadProps}>
										<Button
											type="primary"
											shape="circle"
											icon={<CameraOutlined />}
											size="large"
											style={{
												position: 'absolute',
												bottom: 0,
												right: 0,
												backgroundColor: COLORS.primary,
												borderColor: COLORS.primary,
												boxShadow: '0 2px 8px rgba(247, 89, 171, 0.5)',
											}}
										/>
									</Upload>
								</div>
								{/* Avatar Update Section */}
								{avatarFileList.length > 0 && (
									<div style={{ marginBottom: '16px' }}>
										<Button
											type="primary"
											icon={<CloudUploadOutlined />}
											loading={avatarLoading}
											onClick={handleAvatarUpdate}
											style={{
												backgroundColor: COLORS.success,
												borderColor: COLORS.success,
												marginRight: '8px',
											}}
										>
											Update Avatar
										</Button>{' '}
										<Button
											onClick={() => {
												setAvatarFileList([]);
												setPreviewImage(
													profileData?.userInfo?.avatar ||
														profileData?.avatar ||
														user?.userInfo?.avatar ||
														user?.avatar ||
														'',
												);
											}}
										>
											Cancel
										</Button>
									</div>
								)}{' '}
								<Title
									level={2}
									style={{ margin: '0 0 8px 0', color: COLORS.textPrimary }}
								>
									{profileData?.userInfo?.fullName ||
										profileData?.fullName ||
										user?.userInfo?.fullName ||
										user?.fullName ||
										user?.username}
								</Title>
								<Space>
									{' '}
									<Text
										style={{ color: COLORS.textSecondary, fontSize: '16px' }}
									>
										@{user?.username}
									</Text>
									<Divider type="vertical" />
									<Text
										style={{ color: COLORS.textSecondary, fontSize: '16px' }}
									>
										{user?.type || user?.role}
									</Text>
								</Space>
							</div>
						</Card>
					</Col>

					{/* Profile Form */}
					<Col span={24}>
						<Card
							title={
								<Space>
									<EditOutlined style={{ color: COLORS.primary }} />
									<span style={{ color: COLORS.textPrimary }}>
										Update Profile
									</span>
								</Space>
							}
							style={{
								borderRadius: '16px',
								boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
								border: 'none',
							}}
						>
							{success && (
								<Alert
									message={success}
									type="success"
									style={{ marginBottom: '24px', borderRadius: '8px' }}
									showIcon
									closable
									onClose={() => setSuccess(null)}
								/>
							)}
							{error && (
								<Alert
									message={error}
									type="error"
									style={{ marginBottom: '24px', borderRadius: '8px' }}
									showIcon
									closable
									onClose={() => setError(null)}
								/>
							)}{' '}
							<Form
								form={form}
								name="profile"
								onFinish={onFinish}
								layout="vertical"
								size="large"
							>
								<Row gutter={16}>
									<Col xs={24} md={12}>
										<Form.Item
											name="fullName"
											label={
												<span
													style={{ color: COLORS.textPrimary, fontWeight: 500 }}
												>
													Full Name
												</span>
											}
											rules={[
												{
													required: true,
													message: 'Please input your full name!',
												},
												{
													min: 2,
													message: 'Full name must be at least 2 characters!',
												},
											]}
										>
											<Input
												prefix={
													<UserOutlined style={{ color: COLORS.primary }} />
												}
												placeholder="Enter your full name"
												style={{ borderRadius: '8px' }}
											/>
										</Form.Item>
									</Col>
									<Col xs={24} md={12}>
										<Form.Item
											name="sex"
											label={
												<span
													style={{ color: COLORS.textPrimary, fontWeight: 500 }}
												>
													Gender
												</span>
											}
										>
											<Select
												placeholder="Select your gender"
												style={{ borderRadius: '8px' }}
												suffixIcon={getSexIcon()}
											>
												<Option value="male">
													<Space>
														<ManOutlined style={{ color: COLORS.primary }} />
														Male
													</Space>
												</Option>
												<Option value="female">
													<Space>
														<WomanOutlined style={{ color: COLORS.primary }} />
														Female
													</Space>
												</Option>
												<Option value="other">
													<Space>
														<QuestionOutlined
															style={{ color: COLORS.primary }}
														/>
														Other
													</Space>
												</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>

								<Form.Item
									name="address"
									label={
										<span
											style={{ color: COLORS.textPrimary, fontWeight: 500 }}
										>
											Address
										</span>
									}
								>
									<Input
										prefix={
											<EnvironmentOutlined style={{ color: COLORS.primary }} />
										}
										placeholder="Enter your address"
										style={{ borderRadius: '8px' }}
									/>
								</Form.Item>

								<Form.Item
									name="birthDate"
									label={
										<span
											style={{ color: COLORS.textPrimary, fontWeight: 500 }}
										>
											Birth Date
										</span>
									}
								>
									<DatePicker
										style={{ width: '100%', borderRadius: '8px' }}
										placeholder="Select your birth date"
										suffixIcon={
											<CalendarOutlined style={{ color: COLORS.primary }} />
										}
										disabledDate={(current) =>
											current && current > dayjs().endOf('day')
										}
									/>
								</Form.Item>

								<Form.Item style={{ marginTop: '32px', textAlign: 'right' }}>
									<Button
										type="primary"
										htmlType="submit"
										loading={loading}
										size="large"
										style={{
											backgroundColor: COLORS.primary,
											borderColor: COLORS.primary,
											borderRadius: '8px',
											paddingLeft: '32px',
											paddingRight: '32px',
											height: '48px',
											fontSize: '16px',
											fontWeight: 500,
											boxShadow: '0 4px 16px rgba(247, 89, 171, 0.3)',
										}}
									>
										Update Profile
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</Col>

					{/* Account Information */}
					<Col span={24}>
						<Card
							title={
								<span style={{ color: COLORS.textPrimary }}>
									Account Information
								</span>
							}
							style={{
								borderRadius: '16px',
								boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
								border: 'none',
							}}
						>
							<Row gutter={[16, 16]}>
								<Col xs={24} md={8}>
									<div style={{ textAlign: 'center', padding: '16px' }}>
										<MailOutlined
											style={{
												fontSize: '24px',
												color: COLORS.primary,
												marginBottom: '8px',
											}}
										/>
										<div
											style={{ color: COLORS.textSecondary, fontSize: '14px' }}
										>
											Email
										</div>
										<div
											style={{
												color: COLORS.textPrimary,
												fontSize: '16px',
												fontWeight: 500,
											}}
										>
											{user?.email}
										</div>
									</div>
								</Col>
								<Col xs={24} md={8}>
									<div style={{ textAlign: 'center', padding: '16px' }}>
										<UserOutlined
											style={{
												fontSize: '24px',
												color: COLORS.primary,
												marginBottom: '8px',
											}}
										/>
										<div
											style={{ color: COLORS.textSecondary, fontSize: '14px' }}
										>
											Account ID
										</div>
										<div
											style={{
												color: COLORS.textPrimary,
												fontSize: '16px',
												fontWeight: 500,
											}}
										>
											{user?.userId || user?.id}
										</div>
									</div>
								</Col>
								<Col xs={24} md={8}>
									<div style={{ textAlign: 'center', padding: '16px' }}>
										<div
											style={{
												width: '24px',
												height: '24px',
												borderRadius: '50%',
												backgroundColor:
													user?.status === 'Active' || user?.status === 'active'
														? COLORS.success
														: COLORS.error,
												margin: '0 auto 8px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<div
												style={{
													width: '8px',
													height: '8px',
													borderRadius: '50%',
													backgroundColor: 'white',
												}}
											/>
										</div>
										<div
											style={{ color: COLORS.textSecondary, fontSize: '14px' }}
										>
											Status
										</div>{' '}
										<div
											style={{
												color:
													user?.status === 'Active' || user?.status === 'active'
														? COLORS.success
														: COLORS.error,
												fontSize: '16px',
												fontWeight: 500,
											}}
										>
											{user?.status === 'Active' || user?.status === 'active'
												? 'Active'
												: 'Inactive'}
										</div>
									</div>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};
