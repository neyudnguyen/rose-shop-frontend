import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082/api';

class AuthService {
	private async handleResponse<T>(response: Response): Promise<T> {
		const responseData = await response.json();

		if (!response.ok) {
			// Throw the full response data so we can handle it properly
			throw new Error(JSON.stringify(responseData));
		}

		return responseData;
	}

	async register(data: RegisterRequest): Promise<AuthResponse> {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await this.handleResponse<AuthResponse>(response);

			// Store token if registration is successful
			if (result.success && result.data.token) {
				this.setToken(result.data.token);
				this.setUser(result.data.user);
			}

			return result;
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		}
	}

	async login(data: LoginRequest): Promise<AuthResponse> {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await this.handleResponse<AuthResponse>(response);

			// Store token if login is successful
			if (result.success && result.data.token) {
				this.setToken(result.data.token);
				this.setUser(result.data.user);
			}

			return result;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	}

	logout(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('auth_token');
			localStorage.removeItem('user_data');
		}
	}

	private setToken(token: string): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('auth_token', token);
		}
	}

	private setUser(user: AuthResponse['data']['user']): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('user_data', JSON.stringify(user));
		}
	}

	getToken(): string | null {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('auth_token');
		}
		return null;
	}

	getUser(): AuthResponse['data']['user'] | null {
		if (typeof window !== 'undefined') {
			const userData = localStorage.getItem('user_data');
			if (userData) {
				try {
					return JSON.parse(userData);
				} catch {
					return null;
				}
			}
		}
		return null;
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		return token !== null;
	}

	// Helper method to get authorization header
	getAuthHeader(): Record<string, string> {
		const token = this.getToken();
		if (token) {
			return {
				Authorization: `Bearer ${token}`,
			};
		}
		return {};
	}
}

export const authService = new AuthService();
export default AuthService;
