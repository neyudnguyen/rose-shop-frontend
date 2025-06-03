'use client';

import {
	BankOutlined,
	CreditCardOutlined,
	EnvironmentOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	MobileOutlined,
	ShoppingOutlined,
	TagOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Checkbox,
	Col,
	Divider,
	Form,
	Image,
	Input,
	Radio,
	Row,
	Space,
	Steps,
	Typography,
	message,
} from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

// Sample cart items based on your database structure
const cartItems = [
	{
		cart_id: 1,
		flower_id: 101,
		flower_name: 'Red Rose Bouquet',
		price: 49.99,
		quantity: 1,
		image_url: '/images/roses/r1.jpg',
		seller_name: 'Premium Flower Shop',
	},
	{
		cart_id: 2,
		flower_id: 102,
		flower_name: 'Tulip Arrangement',
		price: 39.99,
		quantity: 2,
		image_url: '/images/picture/tulip.jpg',
		seller_name: 'Garden Blooms',
	},
];

// Sample address data
const userAddresses = [
	{
		address_id: 1,
		description: 'Home Address',
		address: '123 Flower Street, Garden City, FL 33101',
	},
	{
		address_id: 2,
		description: 'Work Address',
		address: '456 Petal Avenue, Blossom Town, FL 33102',
	},
];

// Sample vouchers
const userVouchers = [
	{
		user_voucher_status_id: 1,
		voucher_code: 'SUMMER25',
		discount: 25, // 25% discount
		description: '25% off your order',
		shop_id: null, // null means applicable to all shops
	},
	{
		user_voucher_status_id: 2,
		voucher_code: 'ROSE15',
		discount: 15, // 15% discount
		description: '15% off rose products',
		shop_id: 1, // specific shop ID
	},
];

export default function CheckoutPage() {
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
	const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
	const [deliveryMethod, setDeliveryMethod] = useState('standard');
	const [paymentMethod, setPaymentMethod] = useState('cod');
	const [agreedToTerms, setAgreedToTerms] = useState(false);

	// Calculate order summary
	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shippingCost = deliveryMethod === 'express' ? 10 : 5;
	const discountAmount = selectedVoucher
		? (subtotal *
				(userVouchers.find((v) => v.user_voucher_status_id === selectedVoucher)
					?.discount || 0)) /
			100
		: 0;
	const totalAmount = subtotal + shippingCost - discountAmount;

	const nextStep = () => {
		if (currentStep === 0 && !selectedAddress) {
			message.error('Please select a delivery address');
			return;
		}
		if (currentStep === 2 && !agreedToTerms) {
			message.error('Please agree to the terms and conditions');
			return;
		}
		setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const handleSubmit = () => {
		message.success('Order placed successfully!');
		// In a real application, you would send the order data to your backend
	};
	const renderAddressStep = () => (
		<div className="mt-2">
			<Title level={4} className="mb-4">
				Delivery Information
			</Title>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Radio.Group
						onChange={(e) => setSelectedAddress(e.target.value)}
						value={selectedAddress}
						className="w-full"
					>
						<Row gutter={[16, 16]}>
							{userAddresses.map((address) => (
								<Col xs={24} md={12} key={address.address_id}>
									<Card
										hoverable
										className={`${
											selectedAddress === address.address_id
												? 'border-pink-500'
												: ''
										}`}
										size="small"
									>
										<Radio value={address.address_id}>
											<div>
												<Text strong>{address.description}</Text>
												<Text className="block">{address.address}</Text>
											</div>
										</Radio>
									</Card>
								</Col>
							))}
						</Row>
					</Radio.Group>
				</Col>
				<Col span={24}>
					<Button
						type="dashed"
						icon={<EnvironmentOutlined />}
						block
						size="middle"
					>
						Add New Address
					</Button>
				</Col>
			</Row>
			<div className="flex justify-end mt-4">
				<Button type="primary" onClick={nextStep}>
					Continue
				</Button>
			</div>
		</div>
	);
	const renderDeliveryStep = () => (
		<div className="mt-2">
			<Row gutter={[16, 16]}>
				<Col xs={24} md={12}>
					<Title level={5} className="mb-3">
						Delivery Method
					</Title>
					<Radio.Group
						onChange={(e) => setDeliveryMethod(e.target.value)}
						value={deliveryMethod}
						className="w-full"
					>
						<Row gutter={[16, 8]}>
							<Col span={24}>
								<Card
									hoverable
									size="small"
									className={`${
										deliveryMethod === 'standard' ? 'border-pink-500' : ''
									}`}
								>
									<Radio value="standard">
										<div>
											<Text strong>Standard Delivery</Text>
											<Text className="block text-xs">3-5 business days</Text>
											<Text type="success">$5.00</Text>
										</div>
									</Radio>
								</Card>
							</Col>
							<Col span={24}>
								<Card
									hoverable
									size="small"
									className={`${
										deliveryMethod === 'express' ? 'border-pink-500' : ''
									}`}
								>
									<Radio value="express">
										<div>
											<Text strong>Express Delivery</Text>
											<Text className="block text-xs">Within 24 hours</Text>
											<Text type="success">$10.00</Text>
										</div>
									</Radio>
								</Card>
							</Col>
						</Row>
					</Radio.Group>
				</Col>

				<Col xs={24} md={12}>
					<Title level={5} className="mb-3">
						Vouchers
					</Title>
					<Radio.Group
						onChange={(e) => setSelectedVoucher(e.target.value)}
						value={selectedVoucher}
						className="w-full"
					>
						<Row gutter={[16, 8]}>
							<Col span={24}>
								<Card
									hoverable
									size="small"
									className={`${
										selectedVoucher === null ? 'border-pink-500' : ''
									}`}
								>
									<Radio value={null}>
										<Text>No voucher</Text>
									</Radio>
								</Card>
							</Col>
							{userVouchers.map((voucher) => (
								<Col span={24} key={voucher.user_voucher_status_id}>
									<Card
										hoverable
										size="small"
										className={`${
											selectedVoucher === voucher.user_voucher_status_id
												? 'border-pink-500'
												: ''
										}`}
									>
										<Radio value={voucher.user_voucher_status_id}>
											<div>
												<div className="flex items-center">
													<TagOutlined className="text-pink-500 mr-2" />
													<Text strong>{voucher.voucher_code}</Text>
												</div>
												<Text className="block text-xs">
													{voucher.description}
												</Text>
												<Text type="success">{voucher.discount}% off</Text>
											</div>
										</Radio>
									</Card>
								</Col>
							))}
						</Row>
					</Radio.Group>
				</Col>
			</Row>

			<div className="flex justify-between mt-4">
				<Button onClick={prevStep}>Back</Button>
				<Button type="primary" onClick={nextStep}>
					Continue
				</Button>
			</div>
		</div>
	);

	const renderPaymentStep = () => (
		<div className="mt-6">
			<Title level={4}>Payment Method</Title>
			<Card className="mb-4">
				<Radio.Group
					onChange={(e) => setPaymentMethod(e.target.value)}
					value={paymentMethod}
				>
					<Space direction="vertical" style={{ width: '100%' }}>
						<Card
							className={`mb-2 ${
								paymentMethod === 'cod' ? 'border-pink-500' : ''
							}`}
							hoverable
						>
							<Radio value="cod">
								<div className="flex items-center">
									<MobileOutlined className="text-pink-500 mr-2 text-xl" />
									<div>
										<Text strong>Cash on Delivery</Text>
										<Text className="block">Pay with cash upon delivery</Text>
									</div>
								</div>
							</Radio>
						</Card>
						<Card
							className={`mb-2 ${
								paymentMethod === 'credit_card' ? 'border-pink-500' : ''
							}`}
							hoverable
						>
							<Radio value="credit_card">
								<div className="flex items-center">
									<CreditCardOutlined className="text-pink-500 mr-2 text-xl" />
									<div>
										<Text strong>Credit Card</Text>
										<Text className="block">
											Pay with Visa, Mastercard, etc.
										</Text>
									</div>
								</div>
							</Radio>
						</Card>
						<Card
							className={`mb-2 ${
								paymentMethod === 'bank_transfer' ? 'border-pink-500' : ''
							}`}
							hoverable
						>
							<Radio value="bank_transfer">
								<div className="flex items-center">
									<BankOutlined className="text-pink-500 mr-2 text-xl" />
									<div>
										<Text strong>Bank Transfer</Text>
										<Text className="block">Pay via bank transfer</Text>
									</div>
								</div>
							</Radio>
						</Card>
					</Space>
				</Radio.Group>
			</Card>

			<Title level={4} className="mt-6">
				Contact Information
			</Title>
			<Card className="mb-4">
				<Form layout="vertical">
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Full Name"
								name="fullName"
								rules={[
									{ required: true, message: 'Please enter your full name' },
								]}
							>
								<Input prefix={<UserOutlined />} placeholder="John Doe" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Phone Number"
								name="phoneNumber"
								rules={[
									{
										required: true,
										message: 'Please enter your phone number',
									},
								]}
							>
								<Input
									prefix={<MobileOutlined />}
									placeholder="(555) 123-4567"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>

			<Card className="mb-4">
				<Checkbox
					checked={agreedToTerms}
					onChange={(e) => setAgreedToTerms(e.target.checked)}
				>
					I agree to the{' '}
					<a href="#" className="text-pink-600">
						terms and conditions
					</a>
				</Checkbox>
			</Card>

			<div className="flex justify-between">
				<Button onClick={prevStep}>Back</Button>
				<Button type="primary" onClick={nextStep} disabled={!agreedToTerms}>
					Review Order
				</Button>
			</div>
		</div>
	);

	const renderReviewStep = () => (
		<div className="mt-6">
			<Title level={4}>Order Review</Title>

			<Card className="mb-4">
				<Title level={5}>
					<ShoppingOutlined className="mr-2" />
					Items in Your Order
				</Title>
				<div className="max-h-60 overflow-y-auto">
					{cartItems.map((item) => (
						<div
							key={item.cart_id}
							className="flex items-center py-3 border-b last:border-b-0"
						>
							<div className="flex-shrink-0 w-16 h-16">
								<Image
									src={item.image_url}
									alt={item.flower_name}
									width={64}
									height={64}
									className="object-cover rounded"
									fallback="data:image/png;base64,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"
								/>
							</div>
							<div className="ml-4 flex-grow">
								<Text strong>{item.flower_name}</Text>
								<Text type="secondary" className="block">
									Seller: {item.seller_name}
								</Text>
								<div className="flex justify-between mt-1">
									<Text>
										${item.price.toFixed(2)} x {item.quantity}
									</Text>
									<Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
								</div>
							</div>
						</div>
					))}
				</div>
			</Card>

			<Row gutter={16}>
				<Col span={12}>
					<Card className="mb-4">
						<Title level={5}>
							<EnvironmentOutlined className="mr-2" />
							Delivery Address
						</Title>
						{selectedAddress && (
							<div>
								<Text strong>
									{
										userAddresses.find((a) => a.address_id === selectedAddress)
											?.description
									}
								</Text>
								<Text className="block">
									{
										userAddresses.find((a) => a.address_id === selectedAddress)
											?.address
									}
								</Text>
							</div>
						)}
					</Card>
				</Col>
				<Col span={12}>
					<Card className="mb-4">
						<Title level={5}>
							<InfoCircleOutlined className="mr-2" />
							Delivery Method
						</Title>
						<Text>
							{deliveryMethod === 'express'
								? 'Express Delivery (24 hours)'
								: 'Standard Delivery (3-5 business days)'}
						</Text>
					</Card>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Card className="mb-4">
						<Title level={5}>
							<CreditCardOutlined className="mr-2" />
							Payment Method
						</Title>
						<Text>
							{paymentMethod === 'cod'
								? 'Cash on Delivery'
								: paymentMethod === 'credit_card'
									? 'Credit Card'
									: 'Bank Transfer'}
						</Text>
					</Card>
				</Col>
				<Col span={12}>
					{selectedVoucher && (
						<Card className="mb-4">
							<Title level={5}>
								<TagOutlined className="mr-2" />
								Applied Voucher
							</Title>
							<Text strong>
								{
									userVouchers.find(
										(v) => v.user_voucher_status_id === selectedVoucher,
									)?.voucher_code
								}{' '}
								(
								{
									userVouchers.find(
										(v) => v.user_voucher_status_id === selectedVoucher,
									)?.discount
								}
								% off)
							</Text>
						</Card>
					)}
				</Col>
			</Row>

			<Card className="mb-4">
				<Title level={5}>Order Summary</Title>
				<div className="flex justify-between mb-2">
					<Text>Subtotal:</Text>
					<Text>${subtotal.toFixed(2)}</Text>
				</div>
				<div className="flex justify-between mb-2">
					<Text>Shipping:</Text>
					<Text>${shippingCost.toFixed(2)}</Text>
				</div>
				{selectedVoucher && (
					<div className="flex justify-between mb-2 text-pink-600">
						<Text>Discount:</Text>
						<Text>-${discountAmount.toFixed(2)}</Text>
					</div>
				)}
				<Divider />
				<div className="flex justify-between font-bold text-lg">
					<Text strong>Total:</Text>
					<Text strong className="text-pink-600">
						${totalAmount.toFixed(2)}
					</Text>
				</div>
			</Card>

			<div className="flex justify-between">
				<Button onClick={prevStep}>Back</Button>
				<Button type="primary" onClick={handleSubmit}>
					Place Order
				</Button>
			</div>
		</div>
	);

	const steps = [
		{
			title: 'Address',
			icon: <HomeOutlined />,
			content: renderAddressStep(),
		},
		{
			title: 'Delivery',
			icon: <ShoppingOutlined />,
			content: renderDeliveryStep(),
		},
		{
			title: 'Payment',
			icon: <CreditCardOutlined />,
			content: renderPaymentStep(),
		},
		{
			title: 'Review',
			icon: <InfoCircleOutlined />,
			content: renderReviewStep(),
		},
	];
	return (
		<div className="container mx-auto py-6 px-4">
			<Card className="shadow-md">
				<div className="mb-6">
					<Steps
						current={currentStep}
						items={steps.map((step) => ({
							title: step.title,
							icon: step.icon,
						}))}
						size="small"
						responsive={true}
					/>
				</div>
				<div className="px-2">{steps[currentStep].content}</div>
			</Card>
		</div>
	);
}
