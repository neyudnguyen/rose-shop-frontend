import { AxiosError } from 'axios';

// Interface for API error response
interface ApiErrorResponse {
	success: boolean;
	message: string;
	data?: unknown;
	errors?: string | string[] | Record<string, string | string[]>;
}

/**
 * Extract error message from API response
 * @param error - The error object from axios or other sources
 * @returns The error message to display to user
 */
export const getApiErrorMessage = (error: unknown): string => {
	// If it's an axios error with response
	if (error instanceof Error && 'response' in error) {
		const axiosError = error as AxiosError<ApiErrorResponse>;

		// Check if response has API error format
		if (axiosError.response?.data?.message) {
			return axiosError.response.data.message;
		}

		// Check for validation errors
		if (axiosError.response?.data?.errors) {
			const errors = axiosError.response.data.errors;
			if (typeof errors === 'string') {
				return errors;
			}
			if (Array.isArray(errors) && errors.length > 0) {
				return errors[0];
			}
			if (typeof errors === 'object') {
				const firstError = Object.values(errors)[0];
				if (typeof firstError === 'string') {
					return firstError;
				}
				if (Array.isArray(firstError) && firstError.length > 0) {
					return firstError[0];
				}
			}
		}

		// Fallback to status text
		if (axiosError.response?.statusText) {
			return axiosError.response.statusText;
		}
	}

	// If it's a regular Error object
	if (error instanceof Error) {
		return error.message;
	}

	// Fallback for unknown error types
	if (typeof error === 'string') {
		return error;
	}

	return 'An unexpected error occurred';
};

/**
 * Get a user-friendly error message for common HTTP status codes
 * @param statusCode - HTTP status code
 * @returns User-friendly error message
 */
export const getStatusCodeMessage = (statusCode: number): string => {
	switch (statusCode) {
		case 400:
			return 'Invalid request. Please check your input and try again.';
		case 401:
			return 'You are not authorized to perform this action.';
		case 403:
			return 'You do not have permission to perform this action.';
		case 404:
			return 'The requested resource was not found.';
		case 409:
			return 'This operation conflicts with existing data.';
		case 422:
			return 'The provided data is invalid.';
		case 500:
			return 'Internal server error. Please try again later.';
		case 502:
			return 'Server is temporarily unavailable. Please try again later.';
		case 503:
			return 'Service is temporarily unavailable. Please try again later.';
		default:
			return 'An unexpected error occurred. Please try again.';
	}
};
