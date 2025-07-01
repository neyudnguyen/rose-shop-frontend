import type { ApiResponse } from '../types';

import apiClient from './api';

export interface ForgotPasswordRequest {
	email: string;
}

export interface ForgotPasswordResponse {
	message: string;
	success: boolean;
}

export interface ResetPasswordRequest {
	token: string;
	newPassword: string;
	confirmPassword: string;
}

export const passwordResetService = {
	// Send forgot password email
	forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
		const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
			'/auth/forgot-password',
			{
				email,
			},
		);
		return response.data.data;
	},

	// Reset password with token
	resetPassword: async (
		data: ResetPasswordRequest,
	): Promise<ForgotPasswordResponse> => {
		const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
			'/auth/reset-password',
			data,
		);
		return response.data.data;
	},

	// Validate reset token
	validateResetToken: async (token: string): Promise<boolean> => {
		const response = await apiClient.get<ApiResponse<boolean>>(
			`/auth/validate-reset-token/${token}`,
		);
		return response.data.data;
	},
};
