import type {
	AddressResponse,
	ApiResponse,
	ManageAddressRequest,
} from '../types';

import apiClient from './api';

export const addressService = {
	getAddresses: async (): Promise<AddressResponse[]> => {
		const response =
			await apiClient.get<ApiResponse<AddressResponse[]>>('/user/addresses');
		return response.data.data;
	},

	getAddressById: async (addressId: number): Promise<AddressResponse> => {
		const response = await apiClient.get<ApiResponse<AddressResponse>>(
			`/user/addresses/${addressId}`,
		);
		return response.data.data;
	},

	manageAddress: async (
		addressData: ManageAddressRequest,
	): Promise<AddressResponse> => {
		const formData = new FormData();

		if (addressData.AddressId) {
			formData.append('AddressId', addressData.AddressId.toString());
		}
		formData.append('Description', addressData.Description);
		if (addressData.IsDeleted !== undefined) {
			formData.append('IsDeleted', addressData.IsDeleted.toString());
		}

		const response = await apiClient.post<ApiResponse<AddressResponse>>(
			'/user/addresses/manage',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return response.data.data;
	},
};
