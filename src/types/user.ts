export interface UserInfo {
	userInfoId: number;
	fullName: string;
	address: string;
	birthDate: {
		year: number;
		month: number;
		day: number;
		dayOfWeek: number;
		dayOfYear: number;
		dayNumber: number;
	};
	sex: string;
	isSeller: boolean;
	avatar: string;
	points: number;
	createdDate: string;
	updatedDate: string;
}

export interface UserProfile {
	userId: number;
	username: string;
	email: string;
	type: string;
	createdDate: string;
	status: string;
	userInfo: UserInfo | null;
}

export interface ProfileResponse {
	success: boolean;
	message: string;
	data: UserProfile;
	errors: string | null;
}
