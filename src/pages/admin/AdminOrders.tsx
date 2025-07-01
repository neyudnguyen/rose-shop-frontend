import { adminOrderService } from '../../services/adminOrderService';
import type {
	AdminOrder,
	OrderStatistics,
} from '../../services/adminOrderService';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	DeleteOutlined,
	DollarOutlined,
	EditOutlined,
	EyeOutlined,
	FilterOutlined,
	MoreOutlined,
	ReloadOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Descriptions,
	Dropdown,
	Input,
	Menu,
	Modal,
	Popconfirm,
	Row,
	Select,
	Space,
	Statistic,
	Table,
	Tag,
	Typography,
	message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const statusColors = {
	PENDING: 'gold',
	CONFIRMED: 'blue',
	PROCESSING: 'purple',
	SHIPPED: 'cyan',
	DELIVERED: 'green',
	CANCELLED: 'red',
};

const statusLabels = {
	PENDING: 'Pending',
	CONFIRMED: 'Confirmed',
	PROCESSING: 'Processing',
	SHIPPED: 'Shipped',
	DELIVERED: 'Delivered',
	CANCELLED: 'Cancelled',
};

const paymentStatusColors = {
	PENDING: 'gold',
	PAID: 'green',
	FAILED: 'red',
	REFUNDED: 'orange',
};

export const AdminOrders: React.FC = () => {
	const [orders, setOrders] = useState<AdminOrder[]>([]);
	const [loading, setLoading] = useState(false);
	const [statistics, setStatistics] = useState<OrderStatistics | null>(null);
	const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
	const [showOrderDetail, setShowOrderDetail] = useState(false);
	const [showStatusModal, setShowStatusModal] = useState(false);
	const [newStatus, setNewStatus] = useState<string>('');
	const [statusReason, setStatusReason] = useState<string>('');
	const [filters, setFilters] = useState({
		status: '',
		search: '',
		startDate: '',
		endDate: '',
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const fetchOrders = React.useCallback(async () => {
		setLoading(true);
		try {
			const params = {
				page: pagination.current - 1,
				size: pagination.pageSize,
				status: filters.status || undefined,
				search: filters.search || undefined,
				startDate: filters.startDate || undefined,
				endDate: filters.endDate || undefined,
			};

			const response = await adminOrderService.getOrders(params);
			setOrders(response.content);
			setPagination((prev) => ({
				...prev,
				total: response.totalElements,
			}));
		} catch (error) {
			console.error('Failed to fetch orders:', error);
		} finally {
			setLoading(false);
		}
	}, [pagination, filters]);

	const fetchStatistics = React.useCallback(async () => {
		try {
			const stats = await adminOrderService.getOrderStatistics();
			setStatistics(stats);
		} catch (error) {
			console.error('Failed to fetch statistics:', error);
		}
	}, []);

	useEffect(() => {
		fetchOrders();
		fetchStatistics();
	}, []);

	const handleViewOrder = (order: AdminOrder) => {
		setSelectedOrder(order);
		setShowOrderDetail(true);
	};

	const handleUpdateStatus = (order: AdminOrder) => {
		setSelectedOrder(order);
		setNewStatus(order.status);
		setStatusReason('');
		setShowStatusModal(true);
	};

	const handleStatusUpdate = async () => {
		if (!selectedOrder) return;

		try {
			await adminOrderService.updateOrderStatus(
				selectedOrder.id,
				newStatus,
				statusReason,
			);
			setShowStatusModal(false);
			fetchOrders();
			fetchStatistics();
			message.success('Order status updated successfully');
		} catch (error) {
			console.error('Failed to update order status:', error);
		}
	};

	const handleCancelOrder = async (order: AdminOrder) => {
		try {
			await adminOrderService.cancelOrder(order.id, 'Cancelled by admin');
			fetchOrders();
			fetchStatistics();
			message.success('Order cancelled successfully');
		} catch (error) {
			console.error('Failed to cancel order:', error);
		}
	};

	const handleSearch = (value: string) => {
		setFilters((prev) => ({ ...prev, search: value }));
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	const handleFilterChange = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	const handleDateRangeChange = (
		dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
	) => {
		if (dates && dates[0] && dates[1]) {
			setFilters((prev) => ({
				...prev,
				startDate: dates[0]!.format('YYYY-MM-DD'),
				endDate: dates[1]!.format('YYYY-MM-DD'),
			}));
		} else {
			setFilters((prev) => ({
				...prev,
				startDate: '',
				endDate: '',
			}));
		}
		setPagination((prev) => ({ ...prev, current: 1 }));
	};

	const getActionMenu = (order: AdminOrder) => (
		<Menu>
			<Menu.Item
				key="view"
				icon={<EyeOutlined />}
				onClick={() => handleViewOrder(order)}
			>
				View Details
			</Menu.Item>
			<Menu.Item
				key="edit"
				icon={<EditOutlined />}
				onClick={() => handleUpdateStatus(order)}
			>
				Update Status
			</Menu.Item>
			{order.status !== 'CANCELLED' && (
				<Menu.Item key="cancel" icon={<DeleteOutlined />} danger>
					<Popconfirm
						title="Are you sure you want to cancel this order?"
						onConfirm={() => handleCancelOrder(order)}
						okText="Yes"
						cancelText="No"
					>
						Cancel Order
					</Popconfirm>
				</Menu.Item>
			)}
		</Menu>
	);

	const columns: ColumnsType<AdminOrder> = [
		{
			title: 'Order ID',
			dataIndex: 'id',
			key: 'id',
			width: 100,
			render: (id: number) => `#${id}`,
		},
		{
			title: 'Customer',
			key: 'customer',
			width: 200,
			render: (_, record) => (
				<div>
					<div className="font-medium">{record.userName}</div>
					<div className="text-sm text-gray-500">{record.userEmail}</div>
				</div>
			),
		},
		{
			title: 'Total Amount',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
			width: 120,
			render: (amount: number) => `$${amount.toFixed(2)}`,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			render: (status: string) => (
				<Tag color={statusColors[status as keyof typeof statusColors]}>
					{statusLabels[status as keyof typeof statusLabels]}
				</Tag>
			),
		},
		{
			title: 'Payment Status',
			dataIndex: 'paymentStatus',
			key: 'paymentStatus',
			width: 130,
			render: (status: string) => (
				<Tag
					color={
						paymentStatusColors[status as keyof typeof paymentStatusColors]
					}
				>
					{status}
				</Tag>
			),
		},
		{
			title: 'Delivery Date',
			dataIndex: 'deliveryDate',
			key: 'deliveryDate',
			width: 120,
			render: (date: string) => dayjs(date).format('MM/DD/YYYY'),
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 130,
			render: (date: string) => dayjs(date).format('MM/DD/YYYY HH:mm'),
		},
		{
			title: 'Actions',
			key: 'actions',
			width: 80,
			render: (_, record) => (
				<Dropdown overlay={getActionMenu(record)} trigger={['click']}>
					<Button type="text" icon={<MoreOutlined />} />
				</Dropdown>
			),
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
			{statistics && (
				<Row gutter={[16, 16]} className="mb-6">
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Total Orders"
								value={statistics.totalOrders}
								prefix={<ShoppingCartOutlined />}
								valueStyle={{ color: '#1890ff' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Pending Orders"
								value={statistics.pendingOrders}
								prefix={<ClockCircleOutlined />}
								valueStyle={{ color: '#faad14' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Delivered Orders"
								value={statistics.deliveredOrders}
								prefix={<CheckCircleOutlined />}
								valueStyle={{ color: '#52c41a' }}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={12} lg={6}>
						<Card>
							<Statistic
								title="Total Revenue"
								value={statistics.totalRevenue}
								prefix={<DollarOutlined />}
								precision={2}
								valueStyle={{ color: '#3f8600' }}
							/>
						</Card>
					</Col>
				</Row>
			)}

			{/* Filters */}
			<Card className="mb-6">
				<Row gutter={[16, 16]} align="middle">
					<Col xs={24} sm={12} md={6}>
						<Input.Search
							placeholder="Search orders..."
							allowClear
							onSearch={handleSearch}
							prefix={<SearchOutlined />}
						/>
					</Col>
					<Col xs={24} sm={12} md={4}>
						<Select
							placeholder="Filter by status"
							allowClear
							style={{ width: '100%' }}
							onChange={(value) => handleFilterChange('status', value || '')}
						>
							<Option value="">All Status</Option>
							<Option value="PENDING">Pending</Option>
							<Option value="CONFIRMED">Confirmed</Option>
							<Option value="PROCESSING">Processing</Option>
							<Option value="SHIPPED">Shipped</Option>
							<Option value="DELIVERED">Delivered</Option>
							<Option value="CANCELLED">Cancelled</Option>
						</Select>
					</Col>
					<Col xs={24} sm={12} md={6}>
						<RangePicker
							style={{ width: '100%' }}
							onChange={handleDateRangeChange}
							placeholder={['Start date', 'End date']}
						/>
					</Col>
					<Col xs={24} sm={12} md={4}>
						<Space>
							<Button
								type="primary"
								icon={<FilterOutlined />}
								onClick={fetchOrders}
								loading={loading}
							>
								Filter
							</Button>
							<Button
								icon={<ReloadOutlined />}
								onClick={fetchOrders}
								loading={loading}
							>
								Refresh
							</Button>
						</Space>
					</Col>
				</Row>
			</Card>

			{/* Orders Table */}
			<Card>
				<Table
					columns={columns}
					dataSource={orders}
					rowKey="id"
					loading={loading}
					pagination={{
						current: pagination.current,
						pageSize: pagination.pageSize,
						total: pagination.total,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} items`,
						onChange: (page, size) => {
							setPagination((prev) => ({
								...prev,
								current: page,
								pageSize: size || 10,
							}));
						},
					}}
					scroll={{ x: 1200 }}
				/>
			</Card>

			{/* Order Detail Modal */}
			<Modal
				title={`Order Details - #${selectedOrder?.id}`}
				open={showOrderDetail}
				onCancel={() => setShowOrderDetail(false)}
				footer={null}
				width={800}
			>
				{selectedOrder && (
					<div>
						<Descriptions column={2} bordered>
							<Descriptions.Item label="Order ID">
								#{selectedOrder.id}
							</Descriptions.Item>
							<Descriptions.Item label="Status">
								<Tag
									color={
										statusColors[
											selectedOrder.status as keyof typeof statusColors
										]
									}
								>
									{
										statusLabels[
											selectedOrder.status as keyof typeof statusLabels
										]
									}
								</Tag>
							</Descriptions.Item>
							<Descriptions.Item label="Customer Name">
								{selectedOrder.userName}
							</Descriptions.Item>
							<Descriptions.Item label="Customer Email">
								{selectedOrder.userEmail}
							</Descriptions.Item>
							<Descriptions.Item label="Customer Phone">
								{selectedOrder.userPhone}
							</Descriptions.Item>
							<Descriptions.Item label="Payment Method">
								{selectedOrder.paymentMethod}
							</Descriptions.Item>
							<Descriptions.Item label="Payment Status">
								<Tag
									color={
										paymentStatusColors[
											selectedOrder.paymentStatus as keyof typeof paymentStatusColors
										]
									}
								>
									{selectedOrder.paymentStatus}
								</Tag>
							</Descriptions.Item>
							<Descriptions.Item label="Total Amount">
								${selectedOrder.totalAmount.toFixed(2)}
							</Descriptions.Item>
							<Descriptions.Item label="Delivery Date">
								{dayjs(selectedOrder.deliveryDate).format('MMMM DD, YYYY')}
							</Descriptions.Item>
							<Descriptions.Item label="Created At">
								{dayjs(selectedOrder.createdAt).format('MMMM DD, YYYY HH:mm')}
							</Descriptions.Item>
							<Descriptions.Item label="Delivery Address" span={2}>
								{selectedOrder.deliveryAddress}
							</Descriptions.Item>
							{selectedOrder.note && (
								<Descriptions.Item label="Note" span={2}>
									{selectedOrder.note}
								</Descriptions.Item>
							)}
						</Descriptions>

						<Title level={4} className="mt-6 mb-4">
							Order Items
						</Title>
						<Table
							columns={[
								{
									title: 'Flower Name',
									dataIndex: 'flowerName',
									key: 'flowerName',
								},
								{
									title: 'Quantity',
									dataIndex: 'quantity',
									key: 'quantity',
								},
								{
									title: 'Unit Price',
									dataIndex: 'unitPrice',
									key: 'unitPrice',
									render: (price: number) => `$${price.toFixed(2)}`,
								},
								{
									title: 'Total Price',
									dataIndex: 'totalPrice',
									key: 'totalPrice',
									render: (price: number) => `$${price.toFixed(2)}`,
								},
							]}
							dataSource={selectedOrder.orderItems}
							rowKey="id"
							pagination={false}
							size="small"
						/>
					</div>
				)}
			</Modal>

			{/* Status Update Modal */}
			<Modal
				title="Update Order Status"
				open={showStatusModal}
				onOk={handleStatusUpdate}
				onCancel={() => setShowStatusModal(false)}
				okText="Update"
			>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							New Status
						</label>
						<Select
							value={newStatus}
							onChange={setNewStatus}
							style={{ width: '100%' }}
						>
							<Option value="PENDING">Pending</Option>
							<Option value="CONFIRMED">Confirmed</Option>
							<Option value="PROCESSING">Processing</Option>
							<Option value="SHIPPED">Shipped</Option>
							<Option value="DELIVERED">Delivered</Option>
							<Option value="CANCELLED">Cancelled</Option>
						</Select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Reason (Optional)
						</label>
						<Input.TextArea
							value={statusReason}
							onChange={(e) => setStatusReason(e.target.value)}
							rows={3}
							placeholder="Enter reason for status change..."
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};
