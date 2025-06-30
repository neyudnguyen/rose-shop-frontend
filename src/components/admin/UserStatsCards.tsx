import { COLORS } from '../../constants/colors';
import {
	PercentageOutlined,
	TeamOutlined,
	UserAddOutlined,
	UserDeleteOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

interface UserStatsProps {
	stats: {
		totalUsers: number;
		activeUsers: number;
		inactiveUsers: number;
		adminUsers: number;
		regularUsers: number;
		activationRate: string;
	};
}

export const UserStatsCards: React.FC<UserStatsProps> = ({ stats }) => {
	const statsConfig = [
		{
			title: 'Total Users',
			value: stats.totalUsers,
			icon: <TeamOutlined style={{ color: COLORS.primary }} />,
			color: COLORS.primary,
		},
		{
			title: 'Active Users',
			value: stats.activeUsers,
			icon: <UserAddOutlined style={{ color: '#52c41a' }} />,
			color: '#52c41a',
		},
		{
			title: 'Inactive Users',
			value: stats.inactiveUsers,
			icon: <UserDeleteOutlined style={{ color: '#ff4d4f' }} />,
			color: '#ff4d4f',
		},
		{
			title: 'Administrators',
			value: stats.adminUsers,
			icon: <UserOutlined style={{ color: '#722ed1' }} />,
			color: '#722ed1',
		},
		{
			title: 'Regular Users',
			value: stats.regularUsers,
			icon: <TeamOutlined style={{ color: '#1890ff' }} />,
			color: '#1890ff',
		},
		{
			title: 'Active Rate',
			value: stats.activationRate,
			suffix: '%',
			icon: <PercentageOutlined style={{ color: '#fa8c16' }} />,
			color: '#fa8c16',
		},
	];

	return (
		<Row gutter={[16, 16]}>
			{statsConfig.map((stat, index) => (
				<Col xs={12} sm={8} lg={4} key={index}>
					<Card
						className="stats-card hover:shadow-lg transition-shadow duration-300"
						style={{ borderTop: `3px solid ${stat.color}` }}
					>
						<Statistic
							title={stat.title}
							value={stat.value}
							suffix={stat.suffix}
							prefix={stat.icon}
							valueStyle={{
								color: stat.color,
								fontSize: '1.5rem',
								fontWeight: 'bold',
							}}
						/>
					</Card>
				</Col>
			))}
		</Row>
	);
};
