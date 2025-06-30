import { adminAuthService } from '../services/adminAuthService';
import type { User } from '../types';
import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface AdminAuthContextType {
	user: User | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<User>;
	logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
	undefined,
);

export { AdminAuthContext };

interface AdminAuthProviderProps {
	children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = async () => {
			const token = localStorage.getItem('adminToken');
			if (token) {
				try {
					const userData = await adminAuthService.getCurrentUser();
					setUser(userData);
				} catch {
					localStorage.removeItem('adminToken');
					localStorage.removeItem('adminUser');
				}
			}
			setLoading(false);
		};

		initializeAuth();
	}, []);

	const login = async (username: string, password: string) => {
		const { user: userData, token } = await adminAuthService.login(
			username,
			password,
		);
		localStorage.setItem('adminToken', token);
		localStorage.setItem('adminUser', JSON.stringify(userData));
		setUser(userData);

		// Return user data for component to handle redirects
		return userData;
	};

	const logout = () => {
		localStorage.removeItem('adminToken');
		localStorage.removeItem('adminUser');
		setUser(null);
	};

	const value = {
		user,
		loading,
		login,
		logout,
	};

	return (
		<AdminAuthContext.Provider value={value}>
			{children}
		</AdminAuthContext.Provider>
	);
};
