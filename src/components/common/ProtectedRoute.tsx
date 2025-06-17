'use client';

import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;
}

const ProtectedRoute = ({
	children,
	redirectTo = '/login',
}: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push(redirectTo);
		}
	}, [isAuthenticated, isLoading, router, redirectTo]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spin size="large" />
			</div>
		);
	}

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
