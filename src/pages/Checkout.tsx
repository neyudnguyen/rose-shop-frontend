import { addressService } from '../services/addressService';
import { cartService } from '../services/cartService';
import { orderService } from '../services/orderService';
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
	message,
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
	const [form] = Form.useForm();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [addresses, setAddresses] = useState<AddressResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [newAddressModalVisible, setNewAddressModalVisible] = useState(false);
	const [newAddressForm] = Form.useForm();
	const [isBuyNow, setIsBuyNow] = useState(false);

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
						message.error('Invalid purchase data');
						navigate('/flowers');
						return;
					}
				} else {
					console.log('No buy now item found in localStorage'); // Debug log
					message.error('No item found for purchase');
					navigate('/flowers');
					return;
				}
			} else {
				// Handle normal cart checkout flow
				const cartResponse = await cartService.getMyCart();

				if (cartResponse.items.length === 0) {
					message.warning('Your cart is empty');
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
			message.success('Address added successfully');
		} catch (err) {
			console.error('Error creating address:', err);
			message.error('Failed to create address');
		}
	};

	const handleSubmitOrder = async (values: CheckoutFormValues) => {
		if (cartItems.length === 0) {
			message.error('No items to order');
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
					message.error('Failed to process order. Please try again.');
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

			if (values.paymentMethod === 'VNPAY' && order.paymentUrl) {
				// Redirect to VNPay payment URL
				window.location.href = order.paymentUrl;
			} else {
				// COD payment - redirect to success page
				message.success('Order placed successfully!');
				navigate(`/orders/${order.orderId}`);
			}
		} catch (err) {
			console.error('Error creating order:', err);
			message.error('Failed to create order. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	const subtotal = cartItems.reduce((sum, item) => {
		// Handle both cart items and buy now items
		const price = item.unitPrice || item.flower?.price || 0;
		return sum + price * item.quantity;
	}, 0);

	const shippingFee = 30000; // Fixed shipping fee
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
								>
									{addresses.map((address) => (
										<Option key={address.addressId} value={address.addressId}>
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
								<Radio.Group>
									<Space direction="vertical">
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
										<Radio value="express">
											<Space>
												<TruckOutlined />
												<div>
													<Text strong>Express Delivery</Text>
													<div style={{ color: '#666', fontSize: '12px' }}>
														1-2 business days - 50,000 ₫
													</div>
												</div>
											</Space>
										</Radio>
									</Space>
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
									<Space direction="vertical">
										<Radio value="COD">
											<Space>
												<TruckOutlined />
												<div>
													<Text strong>Cash on Delivery (COD)</Text>
													<div style={{ color: '#666', fontSize: '12px' }}>
														Pay when you receive your order
													</div>
												</div>
											</Space>
										</Radio>
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
									</Space>
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
