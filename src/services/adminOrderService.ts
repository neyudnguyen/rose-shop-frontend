import type { OrderResponse } from '../types';

import apiClient from './api';

export interface AdminOrderStats {
	totalOrders: number;
	totalRevenue: number;
	pendingOrders: number;
	completedOrders: number;
	cancelledOrders: number;
}

export interface AdminDashboardStats {
	totalFlowers: number;
	totalCategories: number;
	totalUsers: number;
	totalVouchers: number;
	orderStats: AdminOrderStats;
	recentOrders: OrderResponse[];
}

export const adminOrderService = {
	// Get all orders for admin
	getAllOrders: async (): Promise<OrderResponse[]> => {
		try {
			// Since there's no specific admin orders endpoint, we'll use a workaround
			// In real implementation, there should be /api/admin/orders endpoint
			const response = await apiClient.get('/api/orders/my-orders');
			return response.data.data || [];
		} catch (error) {
			console.error('Error fetching admin orders:', error);
			throw error;
		}
	},

	// Get order by ID
	getOrderById: async (orderId: number): Promise<OrderResponse> => {
		try {
			const response = await apiClient.get(`/api/orders/${orderId}`);
			return response.data.data;
		} catch (error) {
			console.error('Error fetching order:', error);
			throw error;
		}
	},

	// Update order status (would need new API endpoint)
	updateOrderStatus: async (orderId: number, status: string): Promise<void> => {
		try {
			// This endpoint doesn't exist in current API, would need to be added
			// await apiClient.put(`/api/admin/orders/${orderId}/status`, { status });
			console.log(`Update order ${orderId} status to ${status}`);
			// For now, just log - in real app, this would call the API
		} catch (error) {
			console.error('Error updating order status:', error);
			throw error;
		}
	},

	// Get dashboard statistics
	getDashboardStats: async (): Promise<AdminDashboardStats> => {
		try {
			// Fetch data from multiple endpoints
			const [flowersRes, categoriesRes, usersRes, vouchersRes, ordersRes] =
				await Promise.all([
					apiClient.get('/api/admin/flowers/all'),
					apiClient.get('/api/admin/categories'),
					apiClient.get('/api/admin/users'),
					apiClient.get('/api/admin/vouchers/all'),
					apiClient.get('/api/orders/my-orders'), // This would be /api/admin/orders in real app
				]);

			const flowers = flowersRes.data.data || [];
			const categories = categoriesRes.data.data || [];
			const users = usersRes.data.data || [];
			const vouchers = vouchersRes.data.data || [];
			const orders = ordersRes.data.data || [];

			// Calculate order statistics
			const totalRevenue = orders.reduce(
				(sum: number, order: OrderResponse) => sum + (order.totalPrice || 0),
				0,
			);

			const pendingOrders = orders.filter(
				(order: OrderResponse) =>
					order.statusPayment?.toLowerCase() === 'pending',
			).length;

			const completedOrders = orders.filter(
				(order: OrderResponse) =>
					order.statusPayment?.toLowerCase() === 'completed' ||
					order.statusPayment?.toLowerCase() === 'success',
			).length;

			const cancelledOrders = orders.filter(
				(order: OrderResponse) =>
					order.statusPayment?.toLowerCase() === 'cancelled',
			).length;

			// Get recent orders (last 5)
			const recentOrders = orders
				.sort(
					(a: OrderResponse, b: OrderResponse) =>
						new Date(b.createdDate).getTime() -
						new Date(a.createdDate).getTime(),
				)
				.slice(0, 5);

			return {
				totalFlowers: flowers.length,
				totalCategories: categories.length,
				totalUsers: users.length,
				totalVouchers: vouchers.filter(
					(v: { status?: string }) => v.status?.toLowerCase() === 'active',
				).length,
				orderStats: {
					totalOrders: orders.length,
					totalRevenue,
					pendingOrders,
					completedOrders,
					cancelledOrders,
				},
				recentOrders,
			};
		} catch (error) {
			console.error('Error fetching dashboard stats:', error);
			throw error;
		}
	},
};
