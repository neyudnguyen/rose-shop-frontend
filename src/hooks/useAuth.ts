import { useEffect, useState } from 'react';

import { authService } from '@/services/authService';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = () => {
			const authenticated = authService.isAuthenticated();
			setIsAuthenticated(authenticated);
			setIsLoading(false);
		};

		checkAuth();

		// Listen for storage changes (logout from other tabs)
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === 'auth_token') {
				checkAuth();
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const logout = () => {
		authService.logout();
		setIsAuthenticated(false);
	};

	return {
		isAuthenticated,
		isLoading,
		logout,
		user: authService.getUser(),
		token: authService.getToken(),
	};
};
