import { ProfileResponse } from '@/types/user';

import { authService } from './authService';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082/api';

class UserService {
	private async handleResponse<T>(response: Response): Promise<T> {
		const responseData = await response.json();

		if (!response.ok) {
			// Throw the full response data so we can handle it properly
			throw new Error(JSON.stringify(responseData));
		}

		return responseData;
	}

	async getProfile(): Promise<ProfileResponse> {
		try {
			const response = await fetch(`${API_BASE_URL}/user/profile`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					...authService.getAuthHeader(),
				},
			});

			return await this.handleResponse<ProfileResponse>(response);
		} catch (error) {
			console.error('Get profile error:', error);
			throw error;
		}
	}
	async updateProfile(profileData: {
		fullName: string;
		address: string;
		birthDate: string; // DateOnly format: YYYY-MM-DD
		sex: string;
		isSeller: boolean;
		avatar?: File;
	}): Promise<ProfileResponse> {
		try {
			const formData = new FormData();
			formData.append('FullName', profileData.fullName);
			formData.append('Address', profileData.address);
			formData.append('BirthDate', profileData.birthDate);
			formData.append('Sex', profileData.sex);
			formData.append('IsSeller', profileData.isSeller.toString());

			if (profileData.avatar) {
				formData.append('Avatar', profileData.avatar);
			}

			const response = await fetch(`${API_BASE_URL}/user/profile`, {
				method: 'PUT',
				headers: {
					...authService.getAuthHeader(),
				},
				body: formData,
			});

			return await this.handleResponse<ProfileResponse>(response);
		} catch (error) {
			console.error('Update profile error:', error);
			throw error;
		}
	}
}

export const userService = new UserService();
export default UserService;
