import type {
	ApiResponse,
	CreateOrderRequest,
	OrderResponse,
	PaymentStatusResponse,
} from '../types';

import apiClient from './api';

export const orderService = {
	createOrder: async (
		orderData: CreateOrderRequest,
	): Promise<OrderResponse> => {
		const formData = new FormData();

		if (orderData.phoneNumber) {
			formData.append('PhoneNumber', orderData.phoneNumber);
		}
		if (orderData.paymentMethod) {
			formData.append('PaymentMethod', orderData.paymentMethod);
		}
		if (orderData.deliveryMethod) {
			formData.append('DeliveryMethod', orderData.deliveryMethod);
		}
		if (orderData.addressId) {
			formData.append('AddressId', orderData.addressId.toString());
		}
		if (orderData.userVoucherStatusId) {
			formData.append(
				'UserVoucherStatusId',
				orderData.userVoucherStatusId.toString(),
			);
		}

		const response = await apiClient.post<ApiResponse<OrderResponse>>(
			'/orders/create',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data.data;
	},

	getMyOrders: async (): Promise<OrderResponse[]> => {
		const response =
			await apiClient.get<ApiResponse<OrderResponse[]>>('/orders/my-orders');
		return response.data.data;
	},

	getOrderById: async (orderId: number): Promise<OrderResponse> => {
		const response = await apiClient.get<ApiResponse<OrderResponse>>(
			`/orders/${orderId}`,
		);
		return response.data.data;
	},

	getPaymentStatus: async (orderId: number): Promise<PaymentStatusResponse> => {
		const response = await apiClient.get(`/vnpay/payment-status/${orderId}`);
		return response.data;
	},
};
