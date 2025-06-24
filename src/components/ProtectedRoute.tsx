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
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (adminOnly && user.role !== 'ADMIN') {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};
