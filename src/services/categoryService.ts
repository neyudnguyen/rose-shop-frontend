import type { ApiResponse } from '../types';

import apiClient from './api';

// Based on the OpenAPI spec, the API expects this structure
export interface CategoryCreateRequest {
	categoryName: string;
}

export interface CategoryUpdateRequest {
	categoryId: number;
	categoryName: string;
}

export interface CategoryDeleteRequest {
	categoryId: number;
	isDeleted: boolean;
}

export interface CategoryResponse {
	categoryId: number;
	categoryName: string;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	flowerCount: number;
}

export interface CategoryListResponse {
	success: boolean;
	message: string;
	data: CategoryResponse[];
	errors?: unknown;
}

class CategoryService {
	private baseUrl = '/admin/categories';

	// Get all categories
	async getCategories(): Promise<CategoryResponse[]> {
		const response = await apiClient.get<ApiResponse<CategoryResponse[]>>(
			this.baseUrl,
		);
		return response.data.data;
	}

	// Get category by ID
	async getCategoryById(id: number): Promise<CategoryResponse> {
		const response = await apiClient.get<ApiResponse<CategoryResponse>>(
			`${this.baseUrl}/${id}`,
		);
		return response.data.data;
	}

	// Create new category - matches the API spec exactly
	async createCategory(data: CategoryCreateRequest): Promise<CategoryResponse> {
		const response = await apiClient.post<ApiResponse<CategoryResponse>>(
			`${this.baseUrl}/manage`,
			data,
		);
		return response.data.data;
	}

	// Update category
	async updateCategory(
		id: number,
		data: CategoryCreateRequest,
	): Promise<CategoryResponse> {
		const updateData: CategoryUpdateRequest = {
			categoryId: id,
			categoryName: data.categoryName,
		};
		const response = await apiClient.post<ApiResponse<CategoryResponse>>(
			`${this.baseUrl}/manage`,
			updateData,
		);
		return response.data.data;
	}

	// Delete category (soft delete by setting isDeleted = true)
	async deleteCategory(id: number): Promise<void> {
		const deleteData: CategoryDeleteRequest = {
			categoryId: id,
			isDeleted: true,
		};
		await apiClient.post(`${this.baseUrl}/manage`, deleteData);
	}

	// Get public categories (for customers)
	async getPublicCategories(): Promise<CategoryResponse[]> {
		const response =
			await apiClient.get<ApiResponse<CategoryResponse[]>>('/categories');
		return response.data.data;
	}
}

export const categoryService = new CategoryService();
