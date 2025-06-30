export const USER_TYPES = {
	ADMIN: 'admin',
	USER: 'user',
} as const;

export const USER_STATUS = {
	ACTIVE: 'active',
	INACTIVE: 'inactive',
} as const;

export const USER_GENDER = {
	MALE: 'male',
	FEMALE: 'female',
	OTHER: 'other',
} as const;

export const PAGINATION_CONFIG = {
	DEFAULT_PAGE_SIZE: 10,
	PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
	SHOW_SIZE_CHANGER: true,
	SHOW_QUICK_JUMPER: true,
} as const;
