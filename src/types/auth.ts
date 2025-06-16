export interface RegisterRequest {
	username: string;
	password: string;
	email: string;
}

export interface LoginRequest {
	username: string;
	password: string;
}

export interface User {
	userId: number;
	username: string;
	email: string;
	type: string;
	createdDate: string;
	status: string;
	userInfo: unknown | null;
}

export interface AuthToken {
	token: string;
	tokenType: string;
	expiresAt: string;
	expiresInMinutes: number;
}

export interface AuthResponse {
	success: boolean;
	message: string;
	data: {
		user: User;
		token: string;
		tokenType: string;
		expiresAt: string;
		expiresInMinutes: number;
	};
	errors: unknown | null;
}

export interface ApiError {
	success: boolean;
	message: string;
	errors: Record<string, string[]> | null;
}
