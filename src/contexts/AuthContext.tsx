import { authService } from '../services/authService';
import type { User } from '../types';
import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<User>;
	register: (userData: {
		username: string;
		email: string;
		password: string;
	}) => Promise<void>;
	logout: () => void;
	updateUser: (userData: FormData | Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initializeAuth = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const userData = await authService.getCurrentUser();
					setUser(userData);
				} catch {
					// Clear invalid tokens or admin tokens
					localStorage.removeItem('token');
					localStorage.removeItem('user');
				}
			}
			setLoading(false);
		};

		initializeAuth();
	}, []);
	const login = async (username: string, password: string) => {
		const { user: userData, token } = await authService.login(
			username,
			password,
		);
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(userData));
		setUser(userData);

		// Return user data for component to handle redirects
		return userData;
	};
	const register = async (userData: {
		username: string;
		email: string;
		password: string;
	}) => {
		const { user: newUser, token } = await authService.register(userData);
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(newUser));
		setUser(newUser);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
	};
	const updateUser = async (userData: FormData | Partial<User>) => {
		const updatedUser = await authService.updateProfile(userData);
		setUser(updatedUser);
		localStorage.setItem('user', JSON.stringify(updatedUser));
	};

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		updateUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
