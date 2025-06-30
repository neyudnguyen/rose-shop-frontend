import { orderService } from '../services/orderService';
import type { OrderItemResponse, OrderResponse } from '../types';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CreditCardOutlined,
	EnvironmentOutlined,
	PhoneOutlined,
	ShoppingOutlined,
	TruckOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Descriptions,
	Image,
	Space,
	Spin,
	Table,
	Tag,
	Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

export const OrderDetail: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const [order, setOrder] = useState<OrderResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrder = async () => {
			if (!orderId) return;

			try {
				const orderData = await orderService.getOrderById(Number(orderId));
				setOrder(orderData);
			} catch (err) {
				setError('Failed to load order details. Please try again.');
				console.error('Error fetching order:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [orderId]);

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'pending':
				return 'orange';
			case 'paid':
				return 'green';
			case 'delivered':
				return 'blue';
			case 'cancelled':
				return 'red';
			default:
				return 'default';
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status.toLowerCase()) {
			case 'pending':
				return <ClockCircleOutlined />;
			case 'paid':
				return <CheckCircleOutlined />;
			case 'delivered':
				return <CheckCircleOutlined />;
			default:
				return <ClockCircleOutlined />;
		}
	};

	const orderItemColumns: ColumnsType<OrderItemResponse> = [
		{
			title: 'Product',
			key: 'product',
			render: (_, record) => (
				<Space size={12}>
					<Image
						width={60}
						height={60}
						src={record.flowerImage}
						alt={record.flowerName}
						style={{ borderRadius: '8px', objectFit: 'cover' }}
					/>
					<div>
						<Text strong style={{ fontSize: '16px' }}>
							{record.flowerName}
						</Text>
						<div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
							{record.unitPrice?.toLocaleString('vi-VN')} VND each
						</div>
					</div>
				</Space>
			),
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 100,
			render: (quantity) => (
				<Text style={{ fontSize: '16px' }}>×{quantity}</Text>
			),
		},
		{
			title: 'Total',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			width: 150,
			render: (totalPrice) => (
				<Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
					{totalPrice?.toLocaleString('vi-VN')} VND
				</Text>
			),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			render: (status) => (
				<Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
					{status?.toUpperCase()}
				</Tag>
			),
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

	if (error || !order) {
		return (
			<div style={{ padding: '16px' }}>
				<Alert
					message="Error"
					description={error || 'Order not found'}
					type="error"
					showIcon
				/>
				<div style={{ marginTop: '16px' }}>
					<Link to="/orders">
						<Button type="primary">Back to Orders</Button>
					</Link>
				</div>
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
			<div style={{ marginBottom: '24px' }}>
				<Link to="/orders">
					<Button>← Back to Orders</Button>
				</Link>
			</div>

			<Title level={2} style={{ marginBottom: '8px' }}>
				Order #{order.orderId}
			</Title>
			<Text type="secondary" style={{ fontSize: '16px' }}>
				Placed on {new Date(order.createdDate).toLocaleDateString('vi-VN')}
			</Text>

			<Space
				direction="vertical"
				size={24}
				style={{ width: '100%', marginTop: '32px' }}
			>
				{/* Order Status */}
				<Card>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Space size={16}>
							<Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
								Order Status:
							</Text>
							<Tag
								color={getStatusColor(order.statusPayment)}
								icon={getStatusIcon(order.statusPayment)}
								style={{ fontSize: '14px', padding: '4px 12px' }}
							>
								{order.statusPayment?.toUpperCase()}
							</Tag>
						</Space>
						{order.statusPayment?.toLowerCase() === 'pending' &&
							order.paymentMethod === 'VNPAY' &&
							order.paymentUrl && (
								<Button type="primary" href={order.paymentUrl}>
									Complete Payment
								</Button>
							)}
					</div>
				</Card>

				{/* Order Details */}
				<Card title="Order Information">
					<Descriptions column={2} bordered>
						<Descriptions.Item
							label={
								<>
									<PhoneOutlined /> Phone Number
								</>
							}
						>
							{order.phoneNumber || 'N/A'}
						</Descriptions.Item>
						<Descriptions.Item
							label={
								<>
									<CreditCardOutlined /> Payment Method
								</>
							}
						>
							{order.paymentMethod}
						</Descriptions.Item>
						<Descriptions.Item
							label={
								<>
									<TruckOutlined /> Delivery Method
								</>
							}
						>
							{order.deliveryMethod}
						</Descriptions.Item>
						<Descriptions.Item
							label={
								<>
									<EnvironmentOutlined /> Delivery Address
								</>
							}
						>
							{order.addressDescription || 'N/A'}
						</Descriptions.Item>
						{order.voucherCode && (
							<Descriptions.Item label="Voucher Applied">
								<Space>
									<Text strong>{order.voucherCode}</Text>
									<Text type="success">
										-{order.voucherDiscountAmount?.toLocaleString('vi-VN')} VND
									</Text>
								</Space>
							</Descriptions.Item>
						)}
					</Descriptions>
				</Card>

				{/* Order Items */}
				<Card title="Order Items">
					<Table
						columns={orderItemColumns}
						dataSource={order.items}
						rowKey="orderDetailId"
						pagination={false}
						scroll={{ x: 600 }}
					/>
				</Card>

				{/* Order Summary */}
				<Card title="Order Summary">
					<div style={{ maxWidth: '400px', marginLeft: 'auto' }}>
						<Space direction="vertical" size="small" style={{ width: '100%' }}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text>Subtotal:</Text>
								<Text>{order.subTotal?.toLocaleString('vi-VN')} VND</Text>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Text>Shipping Fee:</Text>
								<Text>{order.shippingFee?.toLocaleString('vi-VN')} VND</Text>
							</div>
							{order.voucherDiscountAmount > 0 && (
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<Text>Voucher Discount:</Text>
									<Text type="success">
										-{order.voucherDiscountAmount?.toLocaleString('vi-VN')} VND
									</Text>
								</div>
							)}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									paddingTop: '16px',
									borderTop: '1px solid #f0f0f0',
								}}
							>
								<Text strong style={{ fontSize: '18px' }}>
									Total:
								</Text>
								<Text strong style={{ fontSize: '18px', color: '#52c41a' }}>
									{order.totalPrice?.toLocaleString('vi-VN')} VND
								</Text>
							</div>
						</Space>
					</div>
				</Card>

				{/* Actions */}
				<Card>
					<Space>
						<Link to="/orders">
							<Button icon={<ShoppingOutlined />}>View All Orders</Button>
						</Link>
						<Link to="/">
							<Button type="primary" icon={<ShoppingOutlined />}>
								Continue Shopping
							</Button>
						</Link>
					</Space>
				</Card>
			</Space>
		</div>
	);
};
