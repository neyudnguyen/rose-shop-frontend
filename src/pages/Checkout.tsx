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
import { useNavigate } from 'react-router-dom';

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
	const [form] = Form.useForm();
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [addresses, setAddresses] = useState<AddressResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [newAddressModalVisible, setNewAddressModalVisible] = useState(false);
	const [newAddressForm] = Form.useForm();

	const fetchData = async () => {
		try {
			const [cartResponse, addressData] = await Promise.all([
				cartService.getMyCart(),
				addressService.getAddresses(),
			]);

			if (cartResponse.items.length === 0) {
				message.warning('Your cart is empty');
				navigate('/cart');
				return;
			}

			setCartItems(cartResponse.items);
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
			message.error('Your cart is empty');
			return;
		}

		setSubmitting(true);
		try {
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
		return sum + (item.flower?.price || 0) * item.quantity;
	}, 0);

	const shippingFee = 30000; // Fixed shipping fee
	const total = subtotal + shippingFee;

	const orderSummaryColumns: ColumnsType<CartItem> = [
		{
			title: 'Product',
			dataIndex: 'flower',
			key: 'flower',
			render: (flower) => (
				<Space size={12}>
					<Image
						width={50}
						height={50}
						src={flower?.imageUrl}
						alt={flower?.flowerName}
						style={{ borderRadius: '6px', objectFit: 'cover' }}
					/>
					<div>
						<Text strong style={{ fontSize: '14px' }}>
							{flower?.flowerName}
						</Text>
						<div style={{ color: '#666', fontSize: '12px' }}>
							{flower?.price?.toLocaleString('vi-VN')} VND
						</div>
					</div>
				</Space>
			),
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
			render: (_, record) => (
				<Text strong style={{ color: '#52c41a' }}>
					{((record.flower?.price || 0) * record.quantity).toLocaleString(
						'vi-VN',
					)}{' '}
					VND
				</Text>
			),
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
				Checkout
			</Title>

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
														3-5 business days - 30,000 VND
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
														1-2 business days - 50,000 VND
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
						title="Order Summary"
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
								<Text>{subtotal.toLocaleString('vi-VN')} VND</Text>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text>Shipping:</Text>
								<Text>{shippingFee.toLocaleString('vi-VN')} VND</Text>
							</div>
							<Divider style={{ margin: '12px 0' }} />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text strong style={{ fontSize: '16px' }}>
									Total:
								</Text>
								<Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
									{total.toLocaleString('vi-VN')} VND
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
