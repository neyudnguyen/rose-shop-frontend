import { COLORS } from '../../constants/colors';
import type { UserDetailResponse } from '../../types';
import {
	CalendarOutlined,
	HomeOutlined,
	MailOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Descriptions, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

interface UserProfileCardProps {
	user: UserDetailResponse;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
	const formatDate = (dateString?: string) => {
		if (!dateString) return 'Not provided';
		return new Date(dateString).toLocaleDateString('vi-VN');
	};

	const getTypeColor = (type: string) => {
		switch (type) {
			case 'admin':
				return 'purple';
			case 'user':
				return 'blue';
			default:
				return 'default';
		}
	};

	const getGenderIcon = (gender?: string) => {
		switch (gender?.toLowerCase()) {
			case 'male':
				return '👨';
			case 'female':
				return '👩';
			default:
				return '👤';
		}
	};

	return (
		<Card className="user-profile-card">
			<div className="flex items-start space-x-4">
				<Avatar
					size={80}
					src={user.userInfo?.avatar}
					icon={<UserOutlined />}
					style={{ backgroundColor: COLORS.primary }}
				/>
				<div className="flex-1">
					<div className="flex items-center space-x-2 mb-2">
						<Title level={4} className="!mb-0">
							{user.userInfo?.fullName || user.username}
						</Title>
						<Tag color={getTypeColor(user.type)} className="capitalize">
							{user.type}
						</Tag>
						<Tag color={user.isActive ? 'success' : 'error'}>
							{user.isActive ? 'Active' : 'Inactive'}
						</Tag>
					</div>

					<Text type="secondary" className="block mb-3">
						@{user.username}
					</Text>

					<Space direction="vertical" size="small" className="w-full">
						<div className="flex items-center space-x-2">
							<MailOutlined style={{ color: COLORS.primary }} />
							<Text>{user.email}</Text>
						</div>

						{user.userInfo?.phone && (
							<div className="flex items-center space-x-2">
								<PhoneOutlined style={{ color: COLORS.primary }} />
								<Text>{user.userInfo.phone}</Text>
							</div>
						)}

						{user.userInfo?.address && (
							<div className="flex items-center space-x-2">
								<HomeOutlined style={{ color: COLORS.primary }} />
								<Text className="text-sm">{user.userInfo.address}</Text>
							</div>
						)}

						{user.userInfo?.dateOfBirth && (
							<div className="flex items-center space-x-2">
								<CalendarOutlined style={{ color: COLORS.primary }} />
								<Text>{formatDate(user.userInfo.dateOfBirth)}</Text>
							</div>
						)}

						{user.userInfo?.gender && (
							<div className="flex items-center space-x-2">
								<span>{getGenderIcon(user.userInfo.gender)}</span>
								<Text className="capitalize">{user.userInfo.gender}</Text>
							</div>
						)}
					</Space>
				</div>
			</div>

			<div className="mt-4 pt-4 border-t border-gray-200">
				<Descriptions size="small" column={2}>
					<Descriptions.Item label="Created">
						{formatDate(user.createdAt)}
					</Descriptions.Item>
					<Descriptions.Item label="Last Updated">
						{formatDate(user.updatedAt)}
					</Descriptions.Item>
				</Descriptions>
			</div>
		</Card>
	);
};
