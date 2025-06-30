import { useAdminAuth } from '../hooks/useAdminAuth';
import { Spin } from 'antd';
import React from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminProtectedRouteProps {
	children: ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
	children,
}) => {
	const { user, loading } = useAdminAuth();
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spin size="large" />
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/admin/login" state={{ from: location }} replace />;
	}

	// Double check that user is admin
	if (user.type !== 'admin') {
		return <Navigate to="/admin/login" replace />;
	}

	return <>{children}</>;
};
