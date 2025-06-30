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
	categoryId: number;
	categoryName: string;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	flowerCount: number;
}

export interface CategoryResponse {
	categoryId: number;
	categoryName: string;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	flowerCount: number;
}

export interface Flower {
	flowerId: number;
	flowerName: string;
	flowerDescription: string;
	price: number;
	imageUrl: string;
	availableQuantity: number;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	categoryId?: number;
	categoryName?: string;
	isDeleted: boolean;
	// Backward compatibility fields
	id?: string;
	name?: string;
	description?: string;
	stock?: number;
	isAvailable?: boolean;
	category?: Category;
}

export interface CartItem {
	id?: string;
	cartId: number;
	flowerId: number;
	flowerName: string;
	flowerDescription: string;
	imageUrl: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
	currentPrice: number;
	priceChanged: boolean;
	categoryName: string;
	availableQuantity: number;
	userId?: string;
	flower?: Flower; // Backward compatibility
}

export interface CartSummary {
	grandTotal: number;
	totalItems: number;
	totalTypes: number;
	// Backward compatibility fields
	totalQuantity?: number;
	subtotal?: number;
	tax?: number;
	discount?: number;
	shipping?: number;
	total?: number;
}

export interface CartResponse {
	items: CartItem[];
	summary: CartSummary;
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

// Voucher types
export interface VoucherResponse {
	userVoucherStatusId: number;
	voucherCode: string;
	discount: number;
	description: string;
	startDate: string;
	endDate: string;
	usageLimit?: number;
	usageCount?: number;
	remainingCount?: number;
	createdAt?: string;
	status: string;
	isDeleted: boolean;
	isExpired: boolean;
	isActive: boolean;
	canUse: boolean;
	displayStatus: string;
}

export interface VoucherManageRequest {
	UserVoucherStatusId?: number;
	VoucherCode: string;
	Discount: number;
	Description: string;
	StartDate: string;
	EndDate: string;
	UsageLimit: number;
	RemainingCount: number;
	Status: string;
	IsDeleted?: boolean;
}

export interface VoucherStatsResponse {
	voucherCode: string;
	totalUsers: number;
	usedCount: number;
	remainingCount: number;
	usagePercentage: number;
	userStats: VoucherUserStats[];
}

export interface VoucherUserStats {
	userInfoId: number;
	userName: string;
	email: string;
	usageCount?: number;
	remainingCount?: number;
	status: string;
	hasUsed: boolean;
}

// User Management types for Admin
export interface UserInfoManagement {
	fullName?: string;
	phone?: string;
	address?: string;
	dateOfBirth?: string;
	gender?: string;
	avatar?: string;
}

export interface UserListRequest {
	userId: number;
	username: string;
	email: string;
	type: string;
	createdAt?: string;
	updatedAt?: string;
	isActive: boolean;
	userInfo?: UserInfoManagement;
}

export interface UserDetailResponse {
	userId: number;
	username: string;
	email: string;
	type: string;
	createdAt?: string;
	updatedAt?: string;
	isActive: boolean;
	userInfo?: UserInfoManagement;
}

export interface UserStatusUpdate {
	reason: string;
}

export interface UserSearchParams {
	search?: string;
	type?: 'admin' | 'user';
	status?: 'active' | 'inactive';
	page?: number;
	limit?: number;
}

// Order types based on API schema
export interface CreateOrderRequest {
	phoneNumber?: string;
	paymentMethod: string;
	deliveryMethod: string;
	addressId?: number;
	userVoucherStatusId?: number;
}

export interface OrderItemResponse {
	orderDetailId: number;
	flowerId: number;
	flowerName: string;
	flowerImage: string;
	unitPrice: number;
	quantity: number;
	totalPrice: number;
	status: string;
}

export interface OrderResponse {
	orderId: number;
	userId: number;
	phoneNumber: string;
	paymentMethod: string;
	deliveryMethod: string;
	createdDate: string;
	userVoucherStatusId?: number;
	voucherCode?: string;
	voucherDiscount?: number;
	addressId: number;
	addressDescription: string;
	statusPayment: string;
	subTotal: number;
	shippingFee: number;
	voucherDiscountAmount: number;
	totalPrice: number;
	items: OrderItemResponse[];
	paymentUrl?: string;
}

// Address types based on API schema
export interface AddressResponse {
	addressId: number;
	userInfoId: number;
	description: string;
	userFullName: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface ManageAddressRequest {
	AddressId?: number;
	Description: string;
	IsDeleted?: boolean;
}

export interface PaymentStatusResponse {
	success: boolean;
	message: string;
	data: unknown;
}
