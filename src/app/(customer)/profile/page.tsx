import ProtectedRoute from '@/components/common/ProtectedRoute';
import UserProfileView from '@/components/customer/profile/UserProfileView';

const UserProfile = () => {
	return (
		<ProtectedRoute>
			<div className="mx-auto pt-24">
				<UserProfileView />
			</div>
		</ProtectedRoute>
	);
};

export default UserProfile;
