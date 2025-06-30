import type { ApiResponse, CartItem } from '../types';

import apiClient from './api';

export const cartService = {
	getMyCart: async (): Promise<CartItem[]> => {
		const response =
			await apiClient.get<ApiResponse<CartItem[]>>('/cart/my-cart');
		return response.data.data;
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
