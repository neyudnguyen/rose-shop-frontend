'use client';

import { EditOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Descriptions,
	Divider,
	Image,
	Spin,
	Tag,
	Typography,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { userService } from '@/services/userService';
import { UserProfile } from '@/types/user';

const { Title } = Typography;

const UserProfileView = () => {
	const router = useRouter();
	const [profileData, setProfileData] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await userService.getProfile();

				if (response.success) {
					setProfileData(response.data);
				} else {
					setError(response.message || 'Failed to fetch profile');
				}
			} catch (err) {
				console.error('Error fetching profile:', err);

				// Parse error message if it's a JSON string
				let errorMessage = 'Failed to fetch profile data';
				try {
					const parsedError = JSON.parse((err as Error).message);
					if (parsedError.message) {
						errorMessage = parsedError.message;
					}
				} catch {
					// If not JSON, use the original error message
					errorMessage = (err as Error).message || errorMessage;
				}

				setError(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	if (loading) {
		return (
			<div className="max-w-3xl mx-auto px-4 py-8 flex justify-center items-center min-h-64">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-3xl mx-auto px-4 py-8">
				<Alert
					message="Error"
					description={error}
					type="error"
					showIcon
					action={
						<Button
							size="small"
							type="primary"
							onClick={() => window.location.reload()}
						>
							Retry
						</Button>
					}
				/>
			</div>
		);
	}

	if (!profileData) {
		return (
			<div className="max-w-3xl mx-auto px-4 py-8">
				<Alert
					message="No Data"
					description="No profile data available"
					type="warning"
					showIcon
				/>
			</div>
		);
	}
	const formatBirthDate = (birthDate?: {
		year: number;
		month: number;
		day: number;
		dayOfWeek: number;
		dayOfYear: number;
		dayNumber: number;
	}) => {
		if (!birthDate || typeof birthDate !== 'object') return 'Not specified';

		try {
			const { year, month, day } = birthDate;
			if (year && month && day) {
				return new Date(year, month - 1, day).toLocaleDateString();
			}
			return 'Not specified';
		} catch {
			return 'Not specified';
		}
	};
	return (
		<div className="w-full">
			<Card className="shadow-md">
				<div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
					<div className="w-24 h-24 md:w-28 md:h-28 bg-gray-300 rounded-full flex items-center justify-center text-white text-4xl overflow-hidden">
						{profileData.userInfo?.avatar ? (
							<Image
								src={profileData.userInfo.avatar}
								alt="Avatar"
								width={112}
								height={112}
								className="rounded-full object-cover"
								style={{ width: '100%', height: '100%' }}
							/>
						) : (
							<span>
								{profileData.userInfo?.fullName?.charAt(0) ||
									profileData.username.charAt(0)}
							</span>
						)}
					</div>
					<div className="flex-1 text-center md:text-left">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
							<Title level={2} className="text-[#eb8ee9] mb-1">
								{profileData.userInfo?.fullName || profileData.username}
							</Title>
							{profileData.userInfo && (
								<Tag color="#644A07" className="text-base px-3 py-1 md:ml-4">
									{profileData.userInfo.points} Points
								</Tag>
							)}
						</div>
						<Typography.Text className="text-gray-500 block mb-4">
							Member since{' '}
							{new Date(profileData.createdDate).toLocaleDateString()}
						</Typography.Text>
						<div className="flex flex-wrap gap-2 justify-center md:justify-start">
							<Button
								type="primary"
								icon={<EditOutlined />}
								onClick={() => router.push('/profile/edit')}
								className="bg-[#644A07] hover:bg-[#8B6914]"
							>
								Edit Profile
							</Button>
						</div>
					</div>
				</div>
				<Divider />{' '}
				<Descriptions
					title="User Information"
					bordered
					column={1}
					labelStyle={{ fontWeight: 'bold', color: '#644A07' }}
				>
					<Descriptions.Item label="Username">
						{profileData.username}
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						{profileData.email}
					</Descriptions.Item>
					<Descriptions.Item label="Full Name">
						{profileData.userInfo?.fullName || 'Not specified'}
					</Descriptions.Item>
					<Descriptions.Item label="Gender">
						{profileData.userInfo?.sex || 'Not specified'}
					</Descriptions.Item>
					<Descriptions.Item label="Birth Date">
						{formatBirthDate(profileData.userInfo?.birthDate)}
					</Descriptions.Item>
					<Descriptions.Item label="Account Type">
						<Tag color="blue">{profileData.type}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Address">
						{profileData.userInfo?.address || 'Not specified'}
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag color={profileData.status === 'active' ? 'green' : 'red'}>
							{profileData.status}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Seller Status">
						<Tag color={profileData.userInfo?.isSeller ? 'gold' : 'default'}>
							{profileData.userInfo?.isSeller ? 'Seller' : 'Customer'}
						</Tag>
					</Descriptions.Item>
					{profileData.userInfo && (
						<Descriptions.Item label="Points">
							<Tag color="#644A07">{profileData.userInfo.points} Points</Tag>
						</Descriptions.Item>
					)}
				</Descriptions>
			</Card>
		</div>
	);
};

export default UserProfileView;
