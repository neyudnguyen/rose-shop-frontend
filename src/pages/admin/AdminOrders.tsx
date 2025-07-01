import { adminOrderService } from '../../services/adminOrderService';
import type { OrderResponse } from '../../types';
import {
	CalendarOutlined,
	CreditCardOutlined,
	DollarOutlined,
	EyeOutlined,
	PhoneOutlined,
	SearchOutlined,
	ShoppingOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Input,
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
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const AdminOrders: React.FC = () => {
	const [orders, setOrders] = useState<OrderResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
		null,
	);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const data = await adminOrderService.getAllOrders();
			setOrders(data);
		} catch (error) {
			message.error('Failed to fetch orders');
			console.error('Error fetching orders:', error);
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

	const getStatusIcon = (status: string) => {
		switch (status?.toLowerCase()) {
			case 'pending':
				return <CalendarOutlined />;
			case 'completed':
			case 'success':
				return <ShoppingOutlined />;
			case 'cancelled':
			case 'failed':
				return <EyeOutlined />;
			default:
				return <CalendarOutlined />;
		}
	};

	const handleStatusUpdate = async (orderId: number, newStatus: string) => {
		try {
			await adminOrderService.updateOrderStatus(orderId, newStatus);
			message.success('Order status updated successfully');
			fetchOrders(); // Refresh the list
		} catch (error) {
			message.error('Failed to update order status');
			console.error('Error updating order status:', error);
		}
	};

	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			order.orderId.toString().includes(searchText) ||
			order.phoneNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
			order.addressDescription
				?.toLowerCase()
				.includes(searchText.toLowerCase());

		const matchesStatus =
			statusFilter === 'all' ||
			order.statusPayment?.toLowerCase() === statusFilter;

		const matchesDate =
			!dateRange ||
			(dayjs(order.createdDate).isAfter(dateRange[0].startOf('day')) &&
				dayjs(order.createdDate).isBefore(dateRange[1].endOf('day')));

		return matchesSearch && matchesStatus && matchesDate;
	});

	const columns: ColumnsType<OrderResponse> = [
		{
			title: 'Order ID',
			dataIndex: 'orderId',
			key: 'orderId',
			render: (orderId) => (
				<Text strong style={{ color: '#1890ff' }}>
					#{orderId}
				</Text>
			),
			width: 100,
		},
		{
			title: 'Date',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (date) => (
				<Space direction="vertical" size="small">
					<Text>{dayjs(date).format('DD/MM/YYYY')}</Text>
					<Text type="secondary" style={{ fontSize: '12px' }}>
						{dayjs(date).format('HH:mm')}
					</Text>
				</Space>
			),
			width: 120,
		},
		{
			title: 'Customer',
			key: 'customer',
			render: (_, record) => (
				<Space direction="vertical" size="small">
					<Space>
						<UserOutlined />
						<Text>User #{record.userId}</Text>
					</Space>
					<Space>
						<PhoneOutlined />
						<Text>{record.phoneNumber}</Text>
					</Space>
				</Space>
			),
			width: 180,
		},
		{
			title: 'Items',
			dataIndex: 'items',
			key: 'items',
			render: (items) => (
				<Space direction="vertical" size="small">
					<Text strong>
						{items?.length || 0} item{(items?.length || 0) !== 1 ? 's' : ''}
					</Text>
					<Text type="secondary" style={{ fontSize: '12px' }}>
						{items
							?.slice(0, 2)
							.map((item: { flowerName: string }) => item.flowerName)
							.join(', ')}
						{items?.length > 2 && '...'}
					</Text>
				</Space>
			),
			width: 200,
		},
		{
			title: 'Payment',
			key: 'payment',
			render: (_, record) => (
				<Space direction="vertical" size="small">
					<Space>
						<CreditCardOutlined />
						<Text>{record.paymentMethod}</Text>
					</Space>
					<Space>
						<DollarOutlined />
						<Text strong style={{ color: '#52c41a' }}>
							{record.totalPrice?.toLocaleString('vi-VN')} ₫
						</Text>
					</Space>
				</Space>
			),
			width: 150,
		},
		{
			title: 'Address',
			dataIndex: 'addressDescription',
			key: 'addressDescription',
			render: (address) => (
				<Text ellipsis={{ tooltip: address }}>{address || 'N/A'}</Text>
			),
			width: 200,
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
			width: 120,
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Space>
					<Link to={`/admin/orders/${record.orderId}`}>
						<Button type="primary" size="small" icon={<EyeOutlined />}>
							View
						</Button>
					</Link>
					<Select
						size="small"
						defaultValue={record.statusPayment}
						style={{ width: 100 }}
						onChange={(value) => handleStatusUpdate(record.orderId, value)}
						options={[
							{ label: 'Pending', value: 'pending' },
							{ label: 'Completed', value: 'completed' },
							{ label: 'Cancelled', value: 'cancelled' },
						]}
					/>
				</Space>
			),
			width: 200,
			fixed: 'right',
		},
	];

	return (
		<div className="p-6">
			<div className="mb-6">
				<Title level={2}>Order Management</Title>
				<Text className="text-gray-600">
					Manage and track all customer orders
				</Text>
			</div>

			{/* Statistics Cards */}
			<Row gutter={[16, 16]} className="mb-6">
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">
								{orders.length}
							</div>
							<div className="text-gray-600">Total Orders</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<div className="text-center">
							<div className="text-2xl font-bold text-orange-600">
								{
									orders.filter(
										(o) => o.statusPayment?.toLowerCase() === 'pending',
									).length
								}
							</div>
							<div className="text-gray-600">Pending</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">
								{
									orders.filter(
										(o) =>
											o.statusPayment?.toLowerCase() === 'completed' ||
											o.statusPayment?.toLowerCase() === 'success',
									).length
								}
							</div>
							<div className="text-gray-600">Completed</div>
						</div>
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card>
						<div className="text-center">
							<div className="text-2xl font-bold text-red-600">
								{
									orders.filter(
										(o) => o.statusPayment?.toLowerCase() === 'cancelled',
									).length
								}
							</div>
							<div className="text-gray-600">Cancelled</div>
						</div>
					</Card>
				</Col>
			</Row>

			{/* Filters */}
			<Card className="mb-6">
				<Row gutter={[16, 16]}>
					<Col xs={24} sm={12} lg={6}>
						<Input
							placeholder="Search by Order ID, Phone, Address..."
							prefix={<SearchOutlined />}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Select
							placeholder="Filter by status"
							value={statusFilter}
							onChange={setStatusFilter}
							style={{ width: '100%' }}
						>
							<Option value="all">All Status</Option>
							<Option value="pending">Pending</Option>
							<Option value="completed">Completed</Option>
							<Option value="success">Success</Option>
							<Option value="cancelled">Cancelled</Option>
						</Select>
					</Col>
					<Col xs={24} sm={12} lg={8}>
						<RangePicker
							style={{ width: '100%' }}
							value={dateRange}
							onChange={(dates) =>
								setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
							}
							format="DD/MM/YYYY"
						/>
					</Col>
					<Col xs={24} sm={12} lg={4}>
						<Button
							onClick={() => {
								setSearchText('');
								setStatusFilter('all');
								setDateRange(null);
							}}
						>
							Clear Filters
						</Button>
					</Col>
				</Row>
			</Card>

			{/* Orders Table */}
			<Card>
				<Spin spinning={loading}>
					<Table
						columns={columns}
						dataSource={filteredOrders}
						rowKey="orderId"
						pagination={{
							pageSize: 10,
							showSizeChanger: true,
							showTotal: (total, range) =>
								`${range[0]}-${range[1]} of ${total} orders`,
						}}
						scroll={{ x: 1400 }}
					/>
				</Spin>
			</Card>
		</div>
	);
};
