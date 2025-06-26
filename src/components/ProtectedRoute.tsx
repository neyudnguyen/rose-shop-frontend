import { useAuth } from '../hooks/useAuth';
import { Spin } from 'antd';
import React from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
	children: ReactNode;
	adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	adminOnly = false,
}) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spin size="large" />
			</div>
		);
	}

	if (!user) {
		// Redirect to admin login if trying to access admin routes
		const redirectPath = adminOnly ? '/admin/login' : '/login';
		return <Navigate to={redirectPath} state={{ from: location }} replace />;
	}

	// Check admin access using the 'type' field from the API
	if (adminOnly && user.type !== 'admin') {
		return <Navigate to="/admin/login" replace />;
	}

	return <>{children}</>;
};
