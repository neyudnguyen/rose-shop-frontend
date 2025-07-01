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
	orderDetailId: number;
	flowerId: number;
	flowerName: string;
	flowerImage: string;
	unitPrice: number;
	quantity: number;
	totalPrice: number;
	status: string;
	createdAt: string;
	categoryName: string;
}

export interface AdminOrder {
	orderId: number;
	userId: number;
	username: string;
	customerName: string;
	customerEmail: string;
	phoneNumber: string;
	paymentMethod: string;
	deliveryMethod: string;
	createdDate: string;
	userVoucherStatusId?: number;
	voucherCode?: string;
	voucherDiscount?: number;
	addressId: number;
	addressDescription: string;
	status: string;
	statusPayment: string;
	subTotal: number;
	shippingFee: number;
	voucherDiscountAmount: number;
	totalPrice: number;
	items: AdminOrderItem[];
	customer: {
		userId: number;
		username: string;
		email: string;
		fullName: string;
		address: string;
		birthDate: string;
		sex: string;
		createdDate: string;
		status: string;
	};
}

export interface OrderStatistics {
	totalOrders: number;
	pendingOrders: number;
	acceptedOrders: number;
	pendingDeliveryOrders: number;
	deliveredOrders: number;
	canceledOrders: number;
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
	success: boolean;
	message: string;
	data: AdminOrder[];
	errors?: string[] | null;
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
			const formData = new FormData();
			formData.append('Status', status);
			if (reason) {
				formData.append('reason', reason);
			}

			const response = await adminApiClient.put(
				`/admin/orders/${orderId}/status`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
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
	async getOrderStatistics(
		params: { startDate?: string; endDate?: string } = {},
	): Promise<OrderStatistics> {
		try {
			// Call the statistics API with optional date parameters
			const response = await adminApiClient.get('/admin/orders/statistics', {
				params,
			});

			// If the API returns statistics directly, use them
			if (response.data.totalOrders !== undefined) {
				return response.data;
			}

			// Fallback: Get all orders and calculate statistics client-side
			const ordersResponse = await adminApiClient.get('/admin/orders', {
				params,
			});
			const orders = ordersResponse.data.data as AdminOrder[];

			// Calculate statistics from orders
			const totalOrders = orders.length;
			const pendingOrders = orders.filter(
				(order) => order.status === 'pending',
			).length;
			const acceptedOrders = orders.filter(
				(order) => order.status === 'accepted',
			).length;
			const pendingDeliveryOrders = orders.filter(
				(order) => order.status === 'pending delivery',
			).length;
			const deliveredOrders = orders.filter(
				(order) => order.status === 'delivered',
			).length;
			const canceledOrders = orders.filter(
				(order) => order.status === 'canceled',
			).length;
			const totalRevenue = orders
				.filter((order) => order.statusPayment === 'paid')
				.reduce((sum, order) => sum + order.totalPrice, 0);
			const currentDate = new Date();
			const monthlyRevenue = orders
				.filter((order) => {
					const orderDate = new Date(order.createdDate);
					return (
						orderDate.getMonth() === currentDate.getMonth() &&
						orderDate.getFullYear() === currentDate.getFullYear() &&
						order.statusPayment === 'paid'
					);
				})
				.reduce((sum, order) => sum + order.totalPrice, 0);

			return {
				totalOrders,
				pendingOrders,
				acceptedOrders,
				pendingDeliveryOrders,
				deliveredOrders,
				canceledOrders,
				totalRevenue,
				monthlyRevenue,
			};
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
