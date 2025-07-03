import { useAuth } from '../hooks/useAuth';
import { addressService } from '../services/addressService';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
import { useUserNotification } from '../services/userNotification';
import type {
	AddressResponse,
	CartItem,
	CreateOrderRequest,
	OrderResponse,
} from '../types';
import {
	CreditCardOutlined,
	EnvironmentOutlined,
	GiftOutlined,
	PhoneOutlined,
	ShoppingCartOutlined,
	TruckOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Col,
	Divider,
	Form,
	Image,
	Input,
	Modal,
	Radio,
	Row,
	Select,
	Space,
	Spin,
	Steps,
	Table,
	Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface CheckoutFormValues {
	phoneNumber: string;
	paymentMethod: string;
	deliveryMethod: string;
	addressId?: number;
	newAddress?: string;
	voucherCode?: string;
}

export const Checkout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const notification = useUserNotification();
	const { user } = useAuth();
	const [form] = Form.useForm();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [addresses, setAddresses] = useState<AddressResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [newAddressModalVisible, setNewAddressModalVisible] = useState(false);
	const [newAddressForm] = Form.useForm();
	const [isBuyNow, setIsBuyNow] = useState(false);
	const [shippingFee, setShippingFee] = useState(30000); // Default to standard

	// Check if user has complete profile information
	useEffect(() => {
		if (user) {
			// Check if user has userInfo and required fields
			const hasCompleteInfo =
				user.userInfo &&
				user.userInfo.fullName &&
				user.userInfo.fullName.trim() !== '' &&
				user.userInfo.address &&
				user.userInfo.address.trim() !== '';

			if (!hasCompleteInfo) {
				notification.warning(
					'Complete Profile Required',
					'Please update your full name and address in your profile before checkout',
				);
				navigate('/profile', {
					replace: true,
					state: { from: location.pathname },
				});
				return;
			}
		}
	}, [user, navigate, notification, location.pathname]);

	// Set default delivery method to 'standard' and payment method to 'COD' on mount
	useEffect(() => {
		form.setFieldsValue({ deliveryMethod: 'standard', paymentMethod: 'COD' });
		setShippingFee(30000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchData = async () => {
		try {
			// Check if this is a "Buy Now" flow
			const urlParams = new URLSearchParams(location.search);
			const buyNowFlag = urlParams.get('buyNow') === 'true';

			if (buyNowFlag) {
				// Handle Buy Now flow
				console.log('Buy now flow detected'); // Debug log
				const buyNowItemData = localStorage.getItem('buyNowItem');
				console.log('Buy now item data:', buyNowItemData); // Debug log

				if (buyNowItemData) {
					try {
						const buyNowItem = JSON.parse(buyNowItemData);
						console.log('Parsed buy now item:', buyNowItem); // Debug log
						setCartItems([buyNowItem]);
						setIsBuyNow(true);

						// Clear the buy now item from localStorage
						localStorage.removeItem('buyNowItem');
					} catch (parseError) {
						console.error('Error parsing buy now item:', parseError);
						notification.error('Invalid purchase data');
						navigate('/flowers');
						return;
					}
				} else {
					console.log('No buy now item found in localStorage'); // Debug log
					notification.error('No item found for purchase');
					navigate('/flowers');
					return;
				}
			} else {
				// Handle normal cart checkout flow
				const cartResponse = await cartService.getMyCart();

				if (cartResponse.items.length === 0) {
					notification.warning('Your cart is empty');
					navigate('/cart');
					return;
				}

				setCartItems(cartResponse.items);
				setIsBuyNow(false);
			}

			// Fetch addresses for both flows
			const addressData = await addressService.getAddresses();
			setAddresses(addressData);
		} catch (err) {
			setError('Failed to load checkout data. Please try again.');
			console.error('Error fetching checkout data:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCreateAddress = async (values: { description: string }) => {
		try {
			const newAddress = await addressService.manageAddress({
				Description: values.description,
			});
			setAddresses([...addresses, newAddress]);
			form.setFieldsValue({ addressId: newAddress.addressId });
			setNewAddressModalVisible(false);
			newAddressForm.resetFields();
			notification.success('Address added successfully');
		} catch (err) {
			console.error('Error creating address:', err);
			notification.actionFailed('Create address', 'Failed to create address');
		}
	};

	const handleSubmitOrder = async (values: CheckoutFormValues) => {
		if (cartItems.length === 0) {
			notification.error('No items to order');
			return;
		}

		setSubmitting(true);
		try {
			// If this is a "Buy Now" order, we need to add the item to cart first
			if (isBuyNow && cartItems.length > 0) {
				const buyNowItem = cartItems[0];
				try {
					await cartService.addToCart(
						buyNowItem.flowerId?.toString() || '',
						buyNowItem.quantity,
					);
				} catch (cartError) {
					console.error('Error adding buy now item to cart:', cartError);
					notification.actionFailed(
						'Process order',
						'Failed to process order. Please try again.',
					);
					return;
				}
			}
			const orderData: CreateOrderRequest = {
				phoneNumber: values.phoneNumber,
				paymentMethod: values.paymentMethod,
				deliveryMethod: values.deliveryMethod,
				addressId: values.addressId,
			};

			const order: OrderResponse = await orderService.createOrder(orderData);

			// Handle different payment methods
			if (values.paymentMethod === 'VNPAY' && order.paymentUrl) {
				// VNPay payment - redirect to payment URL
				// For Buy Now: cart will be cleared in PaymentSuccess page
				// For regular checkout: cart will be cleared in PaymentSuccess page
				window.location.href = order.paymentUrl;
			} else if (values.paymentMethod === 'COD') {
				// COD payment - clear cart immediately and show success message
				try {
					if (isBuyNow) {
						// For Buy Now, clear the temporarily added item
						await cartService.clearCart();
					} else {
						// For regular checkout, clear the cart
						await cartService.clearCart();
					}
				} catch (clearError) {
					console.warn('Failed to clear cart after COD order:', clearError);
					// Don't throw error here as the order was already created successfully
				}

				notification.success(
					'Order Placed Successfully',
					'Your order has been placed. You will pay cash on delivery.',
				);
				navigate(`/orders/${order.orderId}`);
			} else {
				// Fallback for other cases - clear cart immediately
				try {
					await cartService.clearCart();
				} catch (clearError) {
					console.warn('Failed to clear cart after order:', clearError);
				}

				notification.orderSuccess(order.orderId);
				navigate(`/orders/${order.orderId}`);
			}
		} catch (err) {
			console.error('Error creating order:', err);
			notification.actionFailed(
				'Create order',
				'Failed to create order. Please try again.',
			);
		} finally {
			setSubmitting(false);
		}
	};

	const subtotal = cartItems.reduce((sum, item) => {
		// Handle both cart items and buy now items
		const price = item.unitPrice || item.flower?.price || 0;
		return sum + price * item.quantity;
	}, 0);

	const total = subtotal + shippingFee;

	const orderSummaryColumns: ColumnsType<CartItem> = [
		{
			title: 'Product',
			dataIndex: 'flower',
			key: 'flower',
			render: (flower, record) => {
				// Handle both cart items and buy now items
				const name = record.flowerName || flower?.flowerName;
				const imageUrl = record.imageUrl || flower?.imageUrl;
				const price = record.unitPrice || flower?.price || 0;

				return (
					<Space size={12}>
						<Image
							width={50}
							height={50}
							src={imageUrl}
							alt={name}
							style={{ borderRadius: '6px', objectFit: 'cover' }}
						/>
						<div>
							<Text strong style={{ fontSize: '14px' }}>
								{name}
							</Text>
							<div style={{ color: '#666', fontSize: '12px' }}>
								{price.toLocaleString('vi-VN')} ₫
							</div>
						</div>
					</Space>
				);
			},
		},
		{
			title: 'Qty',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 60,
			render: (quantity) => <Text>×{quantity}</Text>,
		},
		{
			title: 'Total',
			key: 'total',
			width: 100,
			render: (_, record) => {
				// Handle both cart items and buy now items
				const price = record.unitPrice || record.flower?.price || 0;
				return (
					<Text strong style={{ color: '#52c41a' }}>
						{(price * record.quantity).toLocaleString('vi-VN')} ₫
					</Text>
				);
			},
		},
	];

	const steps = [
		{
			title: 'Shipping Info',
			icon: <EnvironmentOutlined />,
		},
		{
			title: 'Payment',
			icon: <CreditCardOutlined />,
		},
		{
			title: 'Review',
			icon: <ShoppingCartOutlined />,
		},
	];

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '400px',
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: '16px' }}>
				<Alert message="Error" description={error} type="error" showIcon />
			</div>
		);
	}

	return (
		<div
			style={{
				maxWidth: '1200px',
				margin: '0 auto',
				padding: '80px 16px 40px',
			}}
		>
			<Title level={2} style={{ marginBottom: '32px' }}>
				{isBuyNow ? 'Quick Purchase' : 'Checkout'}
			</Title>

			{isBuyNow && (
				<Alert
					message="Quick Purchase"
					description="You are purchasing this item directly. It will be temporarily added to your cart for processing."
					type="info"
					showIcon
					style={{ marginBottom: '24px' }}
				/>
			)}

			<Steps current={0} items={steps} style={{ marginBottom: '32px' }} />

			<Row gutter={[32, 32]}>
				<Col xs={24} lg={16}>
					<Form
						form={form}
						layout="vertical"
						onFinish={handleSubmitOrder}
						size="large"
					>
						{/* Shipping Information */}
						<Card
							title={
								<Space>
									<EnvironmentOutlined />
									<span>Shipping Information</span>
								</Space>
							}
							style={{ marginBottom: '24px' }}
						>
							<Form.Item
								name="phoneNumber"
								label="Phone Number"
								rules={[
									{ required: true, message: 'Please enter your phone number' },
									{
										pattern: /^[0-9+\-\s()]+$/,
										message: 'Please enter a valid phone number',
									},
								]}
							>
								<Input
									prefix={<PhoneOutlined />}
									placeholder="Enter your phone number"
								/>
							</Form.Item>

							<Form.Item
								name="addressId"
								label="Delivery Address"
								rules={[
									{
										required: true,
										message: 'Please select a delivery address',
									},
								]}
							>
								<Select
									placeholder="Select delivery address"
									dropdownRender={(menu) => (
										<>
											{menu}
											<Divider style={{ margin: '8px 0' }} />
											<Space style={{ padding: '0 8px 4px' }}>
												<Button
													type="text"
													icon={<EnvironmentOutlined />}
													onClick={() => setNewAddressModalVisible(true)}
												>
													Add new address
												</Button>
											</Space>
										</>
									)}
									optionLabelProp="label"
								>
									{addresses.map((address) => (
										<Option
											key={address.addressId}
											value={address.addressId}
											label={
												<span>
													{address.userFullName} - {address.description}
												</span>
											}
										>
											<div>
												<Text strong>{address.userFullName}</Text>
												<div style={{ color: '#666', fontSize: '12px' }}>
													{address.description}
												</div>
											</div>
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								name="deliveryMethod"
								label="Delivery Method"
								rules={[
									{
										required: true,
										message: 'Please select a delivery method',
									},
								]}
							>
								<Radio.Group
									onChange={() => {
										// Always set to standard delivery fee
										setShippingFee(30000);
									}}
								>
									<Radio value="standard">
										<Space>
											<TruckOutlined />
											<div>
												<Text strong>Standard Delivery</Text>
												<div style={{ color: '#666', fontSize: '12px' }}>
													3-5 business days - 30,000 ₫
												</div>
											</div>
										</Space>
									</Radio>
								</Radio.Group>
							</Form.Item>
						</Card>

						{/* Payment Information */}
						<Card
							title={
								<Space>
									<CreditCardOutlined />
									<span>Payment Method</span>
								</Space>
							}
							style={{ marginBottom: '24px' }}
						>
							<Form.Item
								name="paymentMethod"
								rules={[
									{ required: true, message: 'Please select a payment method' },
								]}
							>
								<Radio.Group>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '16px',
										}}
									>
										<Radio value="VNPAY">
											<Space>
												<CreditCardOutlined />
												<div>
													<Text strong>VNPay</Text>
													<div style={{ color: '#666', fontSize: '12px' }}>
														Pay online with VNPay
													</div>
												</div>
											</Space>
										</Radio>
										<Radio value="COD">
											<Space>
												<TruckOutlined />
												<div>
													<Text strong>Cash on Delivery (COD)</Text>
													<div style={{ color: '#666', fontSize: '12px' }}>
														Pay with cash when you receive your order
													</div>
												</div>
											</Space>
										</Radio>
									</div>
								</Radio.Group>
							</Form.Item>
						</Card>

						{/* Voucher Section */}
						<Card
							title={
								<Space>
									<GiftOutlined />
									<span>Discount Code</span>
								</Space>
							}
							style={{ marginBottom: '24px' }}
						>
							<Form.Item name="voucherCode" label="Voucher Code">
								<Input.Group compact>
									<Input
										style={{ width: 'calc(100% - 100px)' }}
										placeholder="Enter voucher code"
									/>
									<Button type="primary">Apply</Button>
								</Input.Group>
							</Form.Item>
						</Card>
					</Form>
				</Col>

				<Col xs={24} lg={8}>
					{/* Order Summary */}
					<Card
						title={isBuyNow ? 'Purchase Summary' : 'Order Summary'}
						style={{ position: 'sticky', top: '100px' }}
					>
						<Table
							columns={orderSummaryColumns}
							dataSource={cartItems}
							rowKey="id"
							pagination={false}
							showHeader={false}
							size="small"
						/>

						<Divider />

						<Space direction="vertical" size="small" style={{ width: '100%' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text>Subtotal:</Text>
								<Text>{subtotal.toLocaleString('vi-VN')} ₫</Text>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text>Shipping:</Text>
								<Text>{shippingFee.toLocaleString('vi-VN')} ₫</Text>
							</div>
							<Divider style={{ margin: '12px 0' }} />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text strong style={{ fontSize: '16px' }}>
									Total:
								</Text>
								<Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
									{total.toLocaleString('vi-VN')} ₫
								</Text>
							</div>
						</Space>

						<Button
							type="primary"
							size="large"
							loading={submitting}
							onClick={() => form.submit()}
							style={{ width: '100%', marginTop: '24px', height: '48px' }}
						>
							Place Order
						</Button>
					</Card>
				</Col>
			</Row>

			{/* New Address Modal */}
			<Modal
				title="Add New Address"
				open={newAddressModalVisible}
				onCancel={() => {
					setNewAddressModalVisible(false);
					newAddressForm.resetFields();
				}}
				footer={null}
			>
				<Form
					form={newAddressForm}
					layout="vertical"
					onFinish={handleCreateAddress}
				>
					<Form.Item
						name="description"
						label="Address"
						rules={[
							{ required: true, message: 'Please enter the address' },
							{ min: 10, message: 'Address must be at least 10 characters' },
						]}
					>
						<TextArea
							rows={3}
							placeholder="Enter full address (street, district, city, province)"
						/>
					</Form.Item>

					<div
						style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}
					>
						<Button
							onClick={() => {
								setNewAddressModalVisible(false);
								newAddressForm.resetFields();
							}}
						>
							Cancel
						</Button>
						<Button type="primary" htmlType="submit">
							Add Address
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};
