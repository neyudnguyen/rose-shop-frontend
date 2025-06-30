import type { ApiResponse, User } from '../types';

import apiClient from './api';

export const authService = {
	login: async (
		username: string,
		password: string,
	): Promise<{ user: User; token: string }> => {
		const response = await apiClient.post<
			ApiResponse<{ user: User; token: string }>
		>('/auth/login', {
			username,
			password,
		});

		// Verify that the logged in user is NOT an admin
		if (response.data.data.user.type === 'admin') {
			throw new Error(
				'Admin accounts cannot login here. Please use the admin portal.',
			);
		}

		return response.data.data;
	},

	register: async (userData: {
		username: string;
		email: string;
		password: string;
	}): Promise<{ user: User; token: string }> => {
		const response = await apiClient.post<
			ApiResponse<{ user: User; token: string }>
		>('/auth/register', userData);
		return response.data.data;
	},
	getCurrentUser: async (): Promise<User> => {
		const response = await apiClient.get<ApiResponse<User>>('/user/profile');

		// Prevent admin users from accessing user context
		if (response.data.data.type === 'admin') {
			throw new Error(
				'Admin users cannot access user pages. Please use admin portal.',
			);
		}

		return response.data.data;
	},
	updateProfile: async (userData: FormData | Partial<User>): Promise<User> => {
		const response = await apiClient.put<ApiResponse<User>>(
			'/user/profile',
			userData,
			userData instanceof FormData
				? {
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				: undefined,
		);
		return response.data.data;
	},
};
