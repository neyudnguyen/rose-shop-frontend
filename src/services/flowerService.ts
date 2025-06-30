import type { ApiResponse } from '../types';

import adminApiClient from './adminApi';
import apiClient from './api';

// Based on OpenAPI spec FlowerResponse
export interface FlowerResponse {
	flowerId: number;
	flowerName: string;
	flowerDescription: string;
	price: number;
	imageUrl: string;
	availableQuantity: number;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	categoryId?: number;
	categoryName?: string;
	isDeleted: boolean;
}

// Request interface for creating/updating flowers
export interface FlowerManageRequest {
	FlowerId?: number;
	FlowerName: string;
	FlowerDescription: string;
	Price: number;
	ImageUrl?: string;
	ImageFile?: File;
	AvailableQuantity: number;
	Status?: string;
	CategoryId: number;
	IsDeleted?: boolean;
}

class FlowerService {
	private baseUrl = '/admin/flowers';

	// Get all flowers for admin
	async getAdminFlowers(): Promise<FlowerResponse[]> {
		const response = await adminApiClient.get<ApiResponse<FlowerResponse[]>>(
			`${this.baseUrl}/all`,
		);
		return response.data.data;
	}

	// Get flower by ID for admin
	async getAdminFlowerById(flowerId: number): Promise<FlowerResponse> {
		const response = await adminApiClient.get<ApiResponse<FlowerResponse>>(
			`${this.baseUrl}/${flowerId}`,
		);
		return response.data.data;
	}

	// Create or update flower using multipart/form-data
	async manageFlower(data: FlowerManageRequest): Promise<FlowerResponse> {
		const formData = new FormData();

		if (data.FlowerId) formData.append('FlowerId', data.FlowerId.toString());
		formData.append('FlowerName', data.FlowerName);
		formData.append('FlowerDescription', data.FlowerDescription);
		formData.append('Price', data.Price.toString());
		if (data.ImageUrl) formData.append('ImageUrl', data.ImageUrl);
		if (data.ImageFile) formData.append('ImageFile', data.ImageFile);
		formData.append('AvailableQuantity', data.AvailableQuantity.toString());
		if (data.Status) formData.append('Status', data.Status);
		formData.append('CategoryId', data.CategoryId.toString());
		if (data.IsDeleted !== undefined)
			formData.append('IsDeleted', data.IsDeleted.toString());

		const response = await adminApiClient.post<ApiResponse<FlowerResponse>>(
			`${this.baseUrl}/manage`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data.data;
	}

	// Delete flower (soft delete)
	async deleteFlower(flowerId: number): Promise<void> {
		await this.manageFlower({
			FlowerId: flowerId,
			FlowerName: '',
			FlowerDescription: '',
			Price: 0,
			AvailableQuantity: 0,
			CategoryId: 0,
			IsDeleted: true,
		});
	}

	// Get public flowers (for customers)
	async getFlowers(): Promise<FlowerResponse[]> {
		const response =
			await apiClient.get<ApiResponse<FlowerResponse[]>>('/flowers');
		return response.data.data;
	}

	// Get public flower by ID
	async getFlowerById(flowerId: number): Promise<FlowerResponse> {
		const response = await apiClient.get<ApiResponse<FlowerResponse>>(
			`/flowers/${flowerId}`,
		);
		return response.data.data;
	}

	// Get flowers by category
	async getFlowersByCategory(categoryId: number): Promise<FlowerResponse[]> {
		const response = await apiClient.get<ApiResponse<FlowerResponse[]>>(
			`/flowers/category/${categoryId}`,
		);
		return response.data.data;
	}
}

export const flowerService = new FlowerService();
