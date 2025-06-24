import type { ApiResponse, User } from '../types';

import apiClient from './api';

export const authService = {
	login: async (
		email: string,
		password: string,
	): Promise<{ user: User; token: string }> => {
		const response = await apiClient.post<
			ApiResponse<{ user: User; token: string }>
		>('/auth/login', {
			email,
			password,
		});
		return response.data.data;
	},

	register: async (userData: {
		email: string;
		password: string;
		fullName: string;
		phone?: string;
	}): Promise<{ user: User; token: string }> => {
		const response = await apiClient.post<
			ApiResponse<{ user: User; token: string }>
		>('/auth/register', userData);
		return response.data.data;
	},

	getCurrentUser: async (): Promise<User> => {
		const response = await apiClient.get<ApiResponse<User>>('/user/profile');
		return response.data.data;
	},

	updateProfile: async (userData: Partial<User>): Promise<User> => {
		const response = await apiClient.put<ApiResponse<User>>(
			'/user/profile',
			userData,
		);
		return response.data.data;
	},
};
