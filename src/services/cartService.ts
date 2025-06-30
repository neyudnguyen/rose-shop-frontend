import type { ApiResponse, CartItem, CartResponse } from '../types';

import apiClient from './api';

export const cartService = {
	getMyCart: async (): Promise<CartResponse> => {
		try {
			const response =
				await apiClient.get<ApiResponse<CartResponse>>('/cart/my-cart');
			// Debug logging
			console.log('Cart API Response:', response.data);

			// Extract items and summary from the new API structure
			const data = response.data?.data;
			const items = Array.isArray(data?.items) ? data.items : [];
			const summary = {
				grandTotal: data?.summary?.grandTotal || 0,
				totalItems: data?.summary?.totalItems || 0,
				totalTypes: data?.summary?.totalTypes || 0,
				// Backward compatibility
				totalQuantity: data?.summary?.totalItems || 0,
				subtotal: data?.summary?.grandTotal || 0,
				total: data?.summary?.grandTotal || 0,
				tax: 0,
				discount: 0,
				shipping: 0,
			};

			return { items, summary };
		} catch (error) {
			console.error('Error fetching cart:', error);
			// Return empty cart response on error
			return {
				items: [],
				summary: {
					grandTotal: 0,
					totalItems: 0,
					totalTypes: 0,
					totalQuantity: 0,
					subtotal: 0,
					total: 0,
					tax: 0,
					discount: 0,
					shipping: 0,
				},
			};
		}
	},

	addToCart: async (flowerId: string, quantity: number): Promise<void> => {
		await apiClient.post('/cart/add', {
			flowerId: Number(flowerId),
			quantity,
		});
	},

	getCartCount: async (): Promise<number> => {
		const response = await apiClient.get<ApiResponse<number>>('/cart/count');
		return response.data.data;
	},

	updateCartItem: async (
		cartId: string,
		quantity: number,
	): Promise<CartItem> => {
		const response = await apiClient.put<ApiResponse<CartItem>>(
			`/cart/update/${cartId}`,
			{
				quantity,
			},
		);
		return response.data.data;
	},

	removeFromCart: async (cartId: string): Promise<void> => {
		await apiClient.delete(`/cart/remove/${cartId}`);
	},

	clearCart: async (): Promise<void> => {
		await apiClient.delete('/cart/clear');
	},
};
