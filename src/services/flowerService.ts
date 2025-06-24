import type { ApiResponse, Flower } from '../types';

import apiClient from './api';

export const flowerService = {
	getFlowers: async (params?: {
		page?: number;
		limit?: number;
		category?: string;
		search?: string;
	}): Promise<{ flowers: Flower[]; total: number }> => {
		const response = await apiClient.get<
			ApiResponse<{ flowers: Flower[]; total: number }>
		>('/flowers', {
			params,
		});
		return response.data.data;
	},

	getFlowerById: async (id: string): Promise<Flower> => {
		const response = await apiClient.get<ApiResponse<Flower>>(`/flowers/${id}`);
		return response.data.data;
	},

	getFeaturedFlowers: async (): Promise<Flower[]> => {
		const response =
			await apiClient.get<ApiResponse<Flower[]>>('/flowers/featured');
		return response.data.data;
	},
};
