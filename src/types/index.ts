export interface UserInfo {
	userInfoId: number;
	fullName?: string;
	address?: string;
	birthDate?: string;
	sex?: 'male' | 'female' | 'other';
	avatar?: string;
	createdDate?: string;
	updatedDate?: string;
}

export interface User {
	userId: number;
	username: string;
	email: string;
	type: string;
	createdDate?: string;
	status: string;
	userInfo?: UserInfo;
	// Backward compatibility fields
	id?: string;
	fullName?: string;
	address?: string;
	birthDate?: string;
	sex?: 'male' | 'female' | 'other';
	avatar?: string;
	role?: 'ADMIN' | 'USER';
}

export interface Category {
	id: string;
	name: string;
	description?: string;
	imageUrl?: string;
	isPopular: boolean;
}

export interface Flower {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	categoryId: string;
	category?: Category;
	stock: number;
	isAvailable: boolean;
}

export interface CartItem {
	id: string;
	flowerId: string;
	flower?: Flower;
	quantity: number;
	userId: string;
}

export interface Address {
	id: string;
	fullName: string;
	phone: string;
	address: string;
	ward: string;
	district: string;
	province: string;
	isDefault: boolean;
}

export interface Voucher {
	id: string;
	code: string;
	description: string;
	discountType: 'PERCENTAGE' | 'FIXED';
	discountValue: number;
	minOrderValue: number;
	maxDiscountAmount?: number;
	startDate: string;
	endDate: string;
	usageLimit: number;
	usedCount: number;
	isActive: boolean;
}

export interface Order {
	id: string;
	userId: string;
	orderItems: OrderItem[];
	totalAmount: number;
	discountAmount: number;
	finalAmount: number;
	deliveryAddress: Address;
	status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
	paymentMethod: 'COD' | 'VNPAY';
	paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
	createdAt: string;
	voucherCode?: string;
}

export interface OrderItem {
	id: string;
	flowerId: string;
	flower?: Flower;
	quantity: number;
	price: number;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message: string;
}
