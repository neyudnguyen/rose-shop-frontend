import { notification } from 'antd';

import adminApiClient from './adminApi';

interface ApiError {
	response?: {
		data?: {
			message?: string;
		};
	};
}

export interface AdminOrderItem {
	id: number;
	flowerName: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

export interface AdminOrder {
	id: number;
	userId: number;
	userName: string;
	userEmail: string;
	userPhone: string;
	status:
		| 'PENDING'
		| 'CONFIRMED'
		| 'PROCESSING'
		| 'SHIPPED'
		| 'DELIVERED'
		| 'CANCELLED';
	totalAmount: number;
	deliveryAddress: string;
	deliveryDate: string;
	note?: string;
	paymentMethod: string;
	paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
	createdAt: string;
	updatedAt: string;
	orderItems: AdminOrderItem[];
}

export interface OrderStatistics {
	totalOrders: number;
	pendingOrders: number;
	confirmedOrders: number;
	processingOrders: number;
	deliveredOrders: number;
	cancelledOrders: number;
	totalRevenue: number;
	monthlyRevenue: number;
}

export interface OrderListParams {
	page?: number;
	size?: number;
	status?: string;
	search?: string;
	startDate?: string;
	endDate?: string;
}

export interface OrderListResponse {
	content: AdminOrder[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	first: boolean;
	last: boolean;
}

export const adminOrderService = {
	// Get all orders with pagination and filters
	async getOrders(params: OrderListParams = {}): Promise<OrderListResponse> {
		try {
			const response = await adminApiClient.get('/admin/orders', { params });
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage =
				apiError.response?.data?.message || 'Failed to fetch orders';
			notification.error({
				message: 'Error',
				description: errorMessage,
			});
			throw error;
		}
	},

	// Get order by ID
	async getOrderById(orderId: number): Promise<AdminOrder> {
		try {
			const response = await adminApiClient.get(`/admin/orders/${orderId}`);
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			notification.error({
				message: 'Error',
				description:
					apiError.response?.data?.message || 'Failed to fetch order details',
			});
			throw error;
		}
	},

	// Update order status
	async updateOrderStatus(
		orderId: number,
		status: string,
		reason?: string,
	): Promise<AdminOrder> {
		try {
			const response = await adminApiClient.put(
				`/admin/orders/${orderId}/status`,
				{
					status,
					reason,
				},
			);
			notification.success({
				message: 'Success',
				description: 'Order status updated successfully',
			});
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			notification.error({
				message: 'Error',
				description:
					apiError.response?.data?.message || 'Failed to update order status',
			});
			throw error;
		}
	},

	// Get order statistics
	async getOrderStatistics(): Promise<OrderStatistics> {
		try {
			const response = await adminApiClient.get('/admin/orders/statistics');
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			notification.error({
				message: 'Error',
				description:
					apiError.response?.data?.message ||
					'Failed to fetch order statistics',
			});
			throw error;
		}
	},

	// Get orders by status
	async getOrdersByStatus(
		status: string,
		page = 0,
		size = 20,
	): Promise<OrderListResponse> {
		try {
			const response = await adminApiClient.get('/admin/orders', {
				params: { status, page, size },
			});
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			notification.error({
				message: 'Error',
				description:
					apiError.response?.data?.message ||
					'Failed to fetch orders by status',
			});
			throw error;
		}
	},

	// Cancel order
	async cancelOrder(orderId: number, reason: string): Promise<AdminOrder> {
		try {
			const response = await adminApiClient.put(
				`/admin/orders/${orderId}/cancel`,
				{
					reason,
				},
			);
			notification.success({
				message: 'Success',
				description: 'Order cancelled successfully',
			});
			return response.data;
		} catch (error) {
			const apiError = error as ApiError;
			notification.error({
				message: 'Error',
				description:
					apiError.response?.data?.message || 'Failed to cancel order',
			});
			throw error;
		}
	},
};
