'use client';

import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { authService } from '@/services/authService';
import { User } from '@/types/auth';

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (user: User) => void;
	logout: () => void;
	updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Check for existing authentication on mount
		const initializeAuth = () => {
			const token = authService.getToken();
			const userData = authService.getUser();

			if (token && userData) {
				setUser(userData);
			}

			setIsLoading(false);
		};

		initializeAuth();
	}, []);
	const login = (userData: User) => {
		setUser(userData);
	};

	const logout = () => {
		authService.logout();
		setUser(null);
	};
	const updateUser = (userData: User) => {
		setUser(userData);
		if (typeof window !== 'undefined') {
			localStorage.setItem('user_data', JSON.stringify(userData));
		}
	};

	const value: AuthContextType = {
		user,
		isAuthenticated: !!user,
		isLoading,
		login,
		logout,
		updateUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
