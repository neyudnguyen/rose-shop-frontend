import { adminOrderService } from '../../services/adminOrderService';
import type { OrderResponse } from '../../types';
import {
	ArrowLeftOutlined,
	CalendarOutlined,
	CreditCardOutlined,
	EnvironmentOutlined,
	PhoneOutlined,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Descriptions,
	Divider,
	Row,
	Select,
	Space,
	Spin,
	Table,
	Tag,
	Typography,
	message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

interface OrderItem {
	orderDetailId: number;
	flowerId: number;
	flowerName: string;
	flowerImage: string;
	unitPrice: number;
	quantity: number;
	totalPrice: number;
	status: string;
}

export const AdminOrderDetail: React.FC = () => {
	const { orderId } = useParams<{ orderId: string }>();
	const navigate = useNavigate();
	const [order, setOrder] = useState<OrderResponse | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (orderId) {
			fetchOrder(parseInt(orderId));
		}
	}, [orderId]);

	const fetchOrder = async (id: number) => {
		try {
			setLoading(true);
			const data = await adminOrderService.getOrderById(id);
			setOrder(data);
		} catch (error) {
			message.error('Failed to fetch order details');
			console.error('Error fetching order:', error);
		} finally {
			setLoading(false);
		}
	};

	const getStatusColor = (status: string): string => {
		switch (status?.toLowerCase()) {
			case 'pending':
				return 'processing';
			case 'completed':
			case 'success':
				return 'success';
			case 'cancelled':
				return 'error';
			case 'failed':
				return 'error';
			default:
				return 'default';
		}
	};

	const handleStatusUpdate = async (newStatus: string) => {
		if (!order) return;

		try {
			await adminOrderService.updateOrderStatus(order.orderId, newStatus);
			message.success('Order status updated successfully');
			// Update local state
			setOrder({ ...order, statusPayment: newStatus });
		} catch (error) {
			message.error('Failed to update order status');
			console.error('Error updating order status:', error);
		}
	};

	const itemColumns: ColumnsType<OrderItem> = [
		{
			title: 'Product',
			key: 'product',
			render: (_, record) => (
				<Space>
					<img
						src={record.flowerImage}
						alt={record.flowerName}
						style={{
							width: 50,
							height: 50,
							objectFit: 'cover',
							borderRadius: 4,
						}}
					/>
					<div>
						<Text strong>{record.flowerName}</Text>
					</div>
				</Space>
			),
		},
		{
			title: 'Unit Price',
			dataIndex: 'unitPrice',
			key: 'unitPrice',
			render: (price) => <Text>{price?.toLocaleString('vi-VN')} ₫</Text>,
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (quantity) => <Text>{quantity}</Text>,
		},
		{
			title: 'Total',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (price) => (
				<Text strong style={{ color: '#52c41a' }}>
					{price?.toLocaleString('vi-VN')} ₫
				</Text>
			),
		},
	];

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Spin size="large" />
			</div>
		);
	}

	if (!order) {
		return (
			<div className="p-6">
				<Card>
					<div className="text-center">
						<Text>Order not found</Text>
						<div className="mt-4">
							<Button onClick={() => navigate('/admin/orders')}>
								Back to Orders
							</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-6">
			{/* Header */}
			<div className="mb-6">
				<Space className="mb-4">
					<Button
						icon={<ArrowLeftOutlined />}
						onClick={() => navigate('/admin/orders')}
					>
						Back to Orders
					</Button>
				</Space>
				<Title level={2}>Order #{order.orderId}</Title>
				<Space>
					<Text type="secondary">
						Created on {dayjs(order.createdDate).format('DD/MM/YYYY HH:mm')}
					</Text>
					<Tag color={getStatusColor(order.statusPayment)}>
						{order.statusPayment?.toUpperCase()}
					</Tag>
				</Space>
			</div>

			<Row gutter={[16, 16]}>
				{/* Order Information */}
				<Col xs={24} lg={16}>
					<Card title="Order Information" className="mb-4">
						<Descriptions column={2} bordered>
							<Descriptions.Item label="Order ID" span={1}>
								<Text strong>#{order.orderId}</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Status" span={1}>
								<Space>
									<Tag color={getStatusColor(order.statusPayment)}>
										{order.statusPayment?.toUpperCase()}
									</Tag>
									<Select
										size="small"
										defaultValue={order.statusPayment}
										style={{ width: 120 }}
										onChange={handleStatusUpdate}
										options={[
											{ label: 'Pending', value: 'pending' },
											{ label: 'Completed', value: 'completed' },
											{ label: 'Cancelled', value: 'cancelled' },
										]}
									/>
								</Space>
							</Descriptions.Item>
							<Descriptions.Item label="Customer" span={1}>
								<Space>
									<UserOutlined />
									<Text>User #{order.userId}</Text>
								</Space>
							</Descriptions.Item>
							<Descriptions.Item label="Phone" span={1}>
								<Space>
									<PhoneOutlined />
									<Text>{order.phoneNumber}</Text>
								</Space>
							</Descriptions.Item>
							<Descriptions.Item label="Payment Method" span={1}>
								<Space>
									<CreditCardOutlined />
									<Text>{order.paymentMethod}</Text>
								</Space>
							</Descriptions.Item>
							<Descriptions.Item label="Delivery Method" span={1}>
								<Text>{order.deliveryMethod}</Text>
							</Descriptions.Item>
							<Descriptions.Item label="Address" span={2}>
								<Space>
									<EnvironmentOutlined />
									<Text>{order.addressDescription}</Text>
								</Space>
							</Descriptions.Item>
							{order.voucherCode && (
								<Descriptions.Item label="Voucher" span={2}>
									<Space>
										<Text strong>{order.voucherCode}</Text>
										<Text type="success">
											-{order.voucherDiscount}% discount
										</Text>
									</Space>
								</Descriptions.Item>
							)}
						</Descriptions>
					</Card>

					{/* Order Items */}
					<Card title="Order Items">
						<Table
							columns={itemColumns}
							dataSource={order.items || []}
							rowKey="orderDetailId"
							pagination={false}
						/>
					</Card>
				</Col>

				{/* Order Summary */}
				<Col xs={24} lg={8}>
					<Card title="Order Summary">
						<div className="space-y-3">
							<div className="flex justify-between">
								<Text>Subtotal:</Text>
								<Text>{order.subTotal?.toLocaleString('vi-VN')} ₫</Text>
							</div>
							<div className="flex justify-between">
								<Text>Shipping Fee:</Text>
								<Text>{order.shippingFee?.toLocaleString('vi-VN')} ₫</Text>
							</div>
							{order.voucherDiscountAmount > 0 && (
								<div className="flex justify-between">
									<Text>Voucher Discount:</Text>
									<Text style={{ color: '#52c41a' }}>
										-{order.voucherDiscountAmount?.toLocaleString('vi-VN')} ₫
									</Text>
								</div>
							)}
							<Divider />
							<div className="flex justify-between">
								<Text strong style={{ fontSize: '16px' }}>
									Total:
								</Text>
								<Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
									{order.totalPrice?.toLocaleString('vi-VN')} ₫
								</Text>
							</div>
						</div>

						<Divider />

						{/* Order Actions */}
						<div className="space-y-2">
							<Text strong>Quick Actions:</Text>
							<div className="flex flex-col space-y-2">
								<Button
									type="primary"
									size="small"
									disabled={order.statusPayment?.toLowerCase() === 'completed'}
									onClick={() => handleStatusUpdate('completed')}
								>
									Mark as Completed
								</Button>
								<Button
									danger
									size="small"
									disabled={order.statusPayment?.toLowerCase() === 'cancelled'}
									onClick={() => handleStatusUpdate('cancelled')}
								>
									Cancel Order
								</Button>
							</div>
						</div>
					</Card>

					{/* Order Timeline */}
					<Card title="Order Timeline" className="mt-4">
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<CalendarOutlined />
								<div>
									<Text strong>Order Placed</Text>
									<br />
									<Text type="secondary" style={{ fontSize: '12px' }}>
										{dayjs(order.createdDate).format('DD/MM/YYYY HH:mm')}
									</Text>
								</div>
							</div>
							{order.statusPayment?.toLowerCase() === 'completed' && (
								<div className="flex items-center space-x-2">
									<ShoppingOutlined style={{ color: '#52c41a' }} />
									<div>
										<Text strong style={{ color: '#52c41a' }}>
											Order Completed
										</Text>
										<br />
										<Text type="secondary" style={{ fontSize: '12px' }}>
											Status updated
										</Text>
									</div>
								</div>
							)}
							{order.statusPayment?.toLowerCase() === 'cancelled' && (
								<div className="flex items-center space-x-2">
									<ShoppingOutlined style={{ color: '#ff4d4f' }} />
									<div>
										<Text strong style={{ color: '#ff4d4f' }}>
											Order Cancelled
										</Text>
										<br />
										<Text type="secondary" style={{ fontSize: '12px' }}>
											Status updated
										</Text>
									</div>
								</div>
							)}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
