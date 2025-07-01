import apiClient from './api';

export interface VoucherValidationResponse {
	userVoucherStatusId: number;
	voucherCode: string;
	discount: number;
	description: string;
	startDate: string;
	endDate: string;
	usageLimit?: number;
	usageCount?: number;
	remainingCount?: number;
	status: string;
	isDeleted: boolean;
	isExpired: boolean;
	isActive: boolean;
	canUse: boolean;
	displayStatus: string;
}

export const customerVoucherService = {
	// Validate voucher by code for customer use
	validateVoucherByCode: async (
		code: string,
	): Promise<VoucherValidationResponse> => {
		try {
			// Try using the admin endpoint first since it's available in the API spec
			const response = await apiClient.get(`/admin/vouchers/code/${code}`);
			return response.data.data;
		} catch (error) {
			console.error('Error validating voucher:', error);
			throw error;
		}
	},
};
