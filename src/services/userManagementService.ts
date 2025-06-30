import type {
	ApiResponse,
	UserDetailResponse,
	UserListRequest,
	UserStatusUpdate,
} from '../types';

import adminApiClient from './adminApi';

export const userManagementService = {
	// Get all users
	getAllUsers: async (): Promise<UserListRequest[]> => {
		const response =
			await adminApiClient.get<ApiResponse<UserListRequest[]>>('/admin/users');
		return response.data.data;
	},

	// Get user by ID
	getUserById: async (userId: number): Promise<UserDetailResponse> => {
		const response = await adminApiClient.get<ApiResponse<UserDetailResponse>>(
			`/admin/users/${userId}`,
		);
		return response.data.data;
	},

	// Toggle user status (activate/deactivate)
	toggleUserStatus: async (
		userId: number,
		reason: string,
	): Promise<UserDetailResponse> => {
		const statusUpdate: UserStatusUpdate = { reason };
		const response = await adminApiClient.put<ApiResponse<UserDetailResponse>>(
			`/admin/users/${userId}/toggle-status`,
			statusUpdate,
		);
		return response.data.data;
	},

	// Get user statistics
	getUserStats: async () => {
		try {
			const users = await userManagementService.getAllUsers();
			const totalUsers = users.length;
			const activeUsers = users.filter((user) => user.isActive).length;
			const inactiveUsers = totalUsers - activeUsers;
			const adminUsers = users.filter((user) => user.type === 'admin').length;
			const regularUsers = users.filter((user) => user.type === 'user').length;

			return {
				totalUsers,
				activeUsers,
				inactiveUsers,
				adminUsers,
				regularUsers,
				activationRate:
					totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : '0',
			};
		} catch (error) {
			console.error('Error fetching user stats:', error);
			throw error;
		}
	},
};
