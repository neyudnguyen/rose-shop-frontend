import type { ApiResponse, User } from '../types';

import adminApiClient from './adminApi';

export const adminAuthService = {
	login: async (
		username: string,
		password: string,
	): Promise<{ user: User; token: string }> => {
		const response = await adminApiClient.post<
			ApiResponse<{ user: User; token: string }>
		>('/auth/login', {
			username,
			password,
		});

		// Verify that the logged in user is actually an admin
		if (response.data.data.user.type !== 'admin') {
			throw new Error('Access denied. This portal is for administrators only.');
		}

		return response.data.data;
	},

	getCurrentUser: async (): Promise<User> => {
		const response =
			await adminApiClient.get<ApiResponse<User>>('/auth/profile');

		// Verify that the current user is still an admin
		if (response.data.data.type !== 'admin') {
			throw new Error('Access denied. Admin privileges required.');
		}

		return response.data.data;
	},
};
