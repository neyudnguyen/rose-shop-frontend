import { orderService } from '../services/orderService';
import type { OrderResponse } from '../types';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CreditCardOutlined,
	EyeOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Empty,
	Space,
	Spin,
	Table,
	Tag,
	Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export const Orders: React.FC = () => {
	const [orders, setOrders] = useState<OrderResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const ordersData = await orderService.getMyOrders();
				setOrders(ordersData);
			} catch (err) {
				setError('Failed to load orders. Please try again.');
				console.error('Error fetching orders:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	const getStatusColor = (status: string) => {
		switch (status?.toLowerCase()) {
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
		switch (status?.toLowerCase()) {
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

	const columns: ColumnsType<OrderResponse> = [
		{
			title: 'Order ID',
			dataIndex: 'orderId',
			key: 'orderId',
			render: (orderId) => (
				<Text strong style={{ fontSize: '16px' }}>
					#{orderId}
				</Text>
			),
		},
		{
			title: 'Date',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (createdDate) => (
				<Text>
					{new Date(createdDate).toLocaleDateString('vi-VN', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})}
				</Text>
			),
		},
		{
			title: 'Items',
			dataIndex: 'items',
			key: 'items',
			render: (items) => (
				<Text>
					{items?.length || 0} item{(items?.length || 0) !== 1 ? 's' : ''}
				</Text>
			),
		},
		{
			title: 'Payment Method',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			render: (paymentMethod) => (
				<Space>
					<CreditCardOutlined />
					<Text>{paymentMethod}</Text>
				</Space>
			),
		},
		{
			title: 'Total',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (totalPrice) => (
				<Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
					{totalPrice?.toLocaleString('vi-VN')} VND
				</Text>
			),
		},
		{
			title: 'Status',
			dataIndex: 'statusPayment',
			key: 'statusPayment',
			render: (status) => (
				<Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
					{status?.toUpperCase()}
				</Tag>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Space>
					<Link to={`/orders/${record.orderId}`}>
						<Button type="primary" size="small" icon={<EyeOutlined />}>
							View Details
						</Button>
					</Link>
					{record.statusPayment?.toLowerCase() === 'pending' &&
						record.paymentMethod === 'VNPAY' &&
						record.paymentUrl && (
							<Button type="default" size="small" href={record.paymentUrl}>
								Pay Now
							</Button>
						)}
				</Space>
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
			<Title level={2} style={{ marginBottom: '24px' }}>
				My Orders
			</Title>

			{orders.length === 0 ? (
				<Card style={{ textAlign: 'center', padding: '60px 24px' }}>
					<Empty
						image="/images/picture/4.png"
						imageStyle={{ height: '160px' }}
						description={
							<div>
								<Text style={{ color: '#666', fontSize: '18px' }}>
									You haven't placed any orders yet
								</Text>
								<div style={{ marginTop: '16px' }}>
									<Link to="/">
										<Button
											type="primary"
											size="large"
											icon={<ShoppingOutlined />}
										>
											Start Shopping
										</Button>
									</Link>
								</div>
							</div>
						}
					/>
				</Card>
			) : (
				<Card>
					<Table
						columns={columns}
						dataSource={orders}
						rowKey="orderId"
						pagination={{
							pageSize: 10,
							showSizeChanger: false,
							showTotal: (total, range) =>
								`${range[0]}-${range[1]} of ${total} orders`,
						}}
						scroll={{ x: 900 }}
					/>
				</Card>
			)}

			<div style={{ textAlign: 'center', marginTop: '32px' }}>
				<Link to="/">
					<Button type="primary" size="large" icon={<ShoppingOutlined />}>
						Continue Shopping
					</Button>
				</Link>
			</div>
		</div>
	);
};
