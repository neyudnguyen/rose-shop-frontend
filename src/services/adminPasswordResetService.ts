import type { ApiResponse } from '../types';

import adminApiClient from './adminApi';

export interface AdminForgotPasswordRequest {
	email: string;
}

export interface AdminForgotPasswordResponse {
	message: string;
	success: boolean;
}

export interface AdminResetPasswordRequest {
	token: string;
	newPassword: string;
	confirmPassword: string;
}

export const adminPasswordResetService = {
	// Send forgot password email for admin
	forgotPassword: async (
		email: string,
	): Promise<AdminForgotPasswordResponse> => {
		const response = await adminApiClient.post<
			ApiResponse<AdminForgotPasswordResponse>
		>('/auth/forgot-password', {
			email,
		});
		return response.data.data;
	},

	// Reset password with token for admin
	resetPassword: async (
		data: AdminResetPasswordRequest,
	): Promise<AdminForgotPasswordResponse> => {
		const response = await adminApiClient.post<
			ApiResponse<AdminForgotPasswordResponse>
		>('/auth/reset-password', data);
		return response.data.data;
	},

	// Validate reset token for admin
	validateResetToken: async (token: string): Promise<boolean> => {
		const response = await adminApiClient.get<ApiResponse<boolean>>(
			`/auth/validate-reset-token/${token}`,
		);
		return response.data.data;
	},
};
