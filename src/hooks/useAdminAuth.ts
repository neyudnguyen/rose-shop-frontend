import { AdminAuthContext } from '../contexts/AdminAuthContext';
import { useContext } from 'react';

export const useAdminAuth = () => {
	const context = useContext(AdminAuthContext);
	if (context === undefined) {
		throw new Error('useAdminAuth must be used within an AdminAuthProvider');
	}
	return context;
};
