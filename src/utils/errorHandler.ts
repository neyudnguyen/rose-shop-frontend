import { message } from 'antd';

export interface APIError {
	message: string;
	errors?: Record<string, string[]>;
}

export const handleAPIError = (error: unknown): string => {
	if (error instanceof Error) {
		try {
			// Try to parse error message as JSON if it contains API error format
			const errorData = JSON.parse(error.message);
			if (errorData.errors) {
				// Extract first error message from validation errors
				const firstError = Object.values(errorData.errors)[0] as string[];
				return firstError[0] || errorData.message || 'An error occurred';
			}
			return errorData.message || error.message;
		} catch {
			return error.message;
		}
	}

	if (typeof error === 'string') {
		return error;
	}

	return 'An unexpected error occurred';
};

export const showErrorMessage = (error: unknown): void => {
	const errorMessage = handleAPIError(error);
	message.error(errorMessage);
};

export const showSuccessMessage = (msg: string): void => {
	message.success(msg);
};
