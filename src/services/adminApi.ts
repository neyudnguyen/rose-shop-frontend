import axios from 'axios';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const adminApiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor to add admin auth token
adminApiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('adminToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor to handle admin auth errors
adminApiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('adminToken');
			localStorage.removeItem('adminUser');
			window.location.href = '/admin/login';
		}
		// Let the error bubble up with the full response for proper error handling
		return Promise.reject(error);
	},
);

export default adminApiClient;
