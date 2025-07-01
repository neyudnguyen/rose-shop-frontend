import { COLORS } from '../../constants/colors';
import { adminOrderService } from '../../services/adminOrderService';
import type {
	AdminOrder,
	OrderStatistics,
} from '../../services/adminOrderService';
import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	DollarOutlined,
	EditOutlined,
	EyeOutlined,
	ReloadOutlined,
	SearchOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	// DatePicker, // Commented out for now
	Descriptions,
	Input,
	Modal,
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
// const { RangePicker } = DatePicker; // Commented out for now
const { Option } = Select;

const statusColors = {
	pending: 'gold',
	confirmed: 'blue',
	processing: 'purple',
	shipped: 'cyan',
	delivered: 'green',
	cancelled: 'red',
};

const statusLabels = {
	pending: 'Pending',
	confirmed: 'Confirmed',
	processing: 'Processing',
	shipped: 'Shipped',
	delivered: 'Delivered',
	cancelled: 'Cancelled',
};

const paymentStatusColors = {
	pending: 'gold',
	paid: 'green',
	failed: 'red',
	refunded: 'orange',
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
		search: '',
		// startDate: '',
		// endDate: '',
	});

	// Separate functions to avoid useCallback issues
	const fetchOrders = async () => {
		setLoading(true);
		try {
			// Get all orders without search parameter
			const response = await adminOrderService.getOrders({});
			setOrders(response.data);
		} catch (error) {
			console.error('Failed to fetch orders:', error);
		} finally {
			setLoading(false);
		}
	};

	const fetchStatistics = async () => {
		try {
			// Get statistics without parameters
			const stats = await adminOrderService.getOrderStatistics({});
			setStatistics(stats);
		} catch (error) {
			console.error('Failed to fetch statistics:', error);
		}
	};

	// Effect for initial load only
	useEffect(() => {
		fetchOrders();
		fetchStatistics();
	}, []);

	// Filter orders based on search term (local filtering)
	const filteredOrders = orders.filter((order) => {
		if (!filters.search) return true;

		const searchTerm = filters.search.toLowerCase();
		const orderId = order.orderId.toString();
		const customerName = order.customerName.toLowerCase();
		const customerEmail = order.customerEmail.toLowerCase();

		return (
			orderId.includes(searchTerm) ||
			customerName.includes(searchTerm) ||
			customerEmail.includes(searchTerm)
		);
	});

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
				selectedOrder.orderId,
				newStatus,
				statusReason,
			);
			setShowStatusModal(false);
			// Refresh both orders and statistics after update
			await fetchOrders();
			await fetchStatistics();
			message.success('Order status updated successfully');
		} catch (error) {
			console.error('Failed to update order status:', error);
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({ search: e.target.value });
	};

	// Comment out date range handler
	// const handleDateRangeChange = (
	// 	dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
	// ) => {
	// 	if (dates && dates[0] && dates[1]) {
	// 		setFilters({
	// 			startDate: dates[0]!.format('YYYY-MM-DD'),
	// 			endDate: dates[1]!.format('YYYY-MM-DD'),
	// 		});
	// 	} else {
	// 		setFilters({
	// 			startDate: '',
	// 			endDate: '',
	// 		});
	// 	}
	// };

	const columns: ColumnsType<AdminOrder> = [
		{
			title: 'Order ID',
			dataIndex: 'orderId',
			key: 'orderId',
			width: 100,
			render: (id: number) => `#${id}`,
		},
		{
			title: 'Customer',
			key: 'customer',
			width: 200,
			render: (_, record) => (
				<div>
					<div className="font-medium">{record.customerName}</div>
					<div className="text-sm text-gray-500">{record.customerEmail}</div>
				</div>
			),
		},
		{
			title: 'Total Amount',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			width: 120,
			render: (amount: number) => `${amount.toLocaleString('vi-VN')} ₫`,
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
			dataIndex: 'statusPayment',
			key: 'statusPayment',
			width: 130,
			render: (status: string) => (
				<Tag
					color={
						paymentStatusColors[status as keyof typeof paymentStatusColors]
					}
				>
					{status.toUpperCase()}
				</Tag>
			),
		},
		{
			title: 'Payment Method',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			width: 120,
		},
		{
			title: 'Created At',
			dataIndex: 'createdDate',
			key: 'createdDate',
			width: 130,
			render: (date: string) => dayjs(date).format('MM/DD/YYYY HH:mm'),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Actions</div>,
			key: 'actions',
			width: 150,
			align: 'center',
			render: (_, record) => (
				<Space
					size="small"
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Button
						type="text"
						icon={<EyeOutlined />}
						onClick={() => handleViewOrder(record)}
						style={{ color: COLORS.info }}
					>
						View
					</Button>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => handleUpdateStatus(record)}
						style={{ color: COLORS.primary }}
					>
						Update
					</Button>
				</Space>
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
								valueStyle={{ color: '#3f8600' }}
								formatter={(value) =>
									`${Number(value).toLocaleString('vi-VN')} ₫`
								}
							/>
						</Card>
					</Col>
				</Row>
			)}

			{/* Filters */}
			<Card className="mb-6">
				<Row gutter={[16, 16]} align="middle">
					<Col xs={24} sm={12} md={8}>
						<Input
							placeholder="Search orders by customer name, email, or order ID..."
							allowClear
							onChange={handleSearch}
							value={filters.search}
							prefix={<SearchOutlined />}
							style={{ width: '100%' }}
						/>
					</Col>
					{/* Comment out date range picker */}
					{/* <Col xs={24} sm={12} md={8}>
						<RangePicker
							style={{ width: '100%' }}
							onChange={handleDateRangeChange}
							placeholder={['Start date', 'End date']}
						/>
					</Col> */}
					<Col xs={24} sm={12} md={4}>
						<Space>
							<Button
								icon={<ReloadOutlined />}
								onClick={async () => {
									await fetchOrders();
									await fetchStatistics();
								}}
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
					dataSource={filteredOrders}
					rowKey="orderId"
					loading={loading}
					scroll={{ x: 1200 }}
				/>
			</Card>

			{/* Order Detail Modal */}
			<Modal
				title={`Order Details - #${selectedOrder?.orderId}`}
				open={showOrderDetail}
				onCancel={() => setShowOrderDetail(false)}
				footer={null}
				width={800}
			>
				{selectedOrder && (
					<div>
						<Descriptions column={2} bordered>
							<Descriptions.Item label="Order ID">
								#{selectedOrder.orderId}
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
								{selectedOrder.customerName}
							</Descriptions.Item>
							<Descriptions.Item label="Customer Email">
								{selectedOrder.customerEmail}
							</Descriptions.Item>
							<Descriptions.Item label="Customer Phone">
								{selectedOrder.phoneNumber}
							</Descriptions.Item>
							<Descriptions.Item label="Payment Method">
								{selectedOrder.paymentMethod}
							</Descriptions.Item>
							<Descriptions.Item label="Payment Status">
								<Tag
									color={
										paymentStatusColors[
											selectedOrder.statusPayment as keyof typeof paymentStatusColors
										]
									}
								>
									{selectedOrder.statusPayment.toUpperCase()}
								</Tag>
							</Descriptions.Item>
							<Descriptions.Item label="Total Amount">
								{selectedOrder.totalPrice.toLocaleString('vi-VN')} ₫
							</Descriptions.Item>
							<Descriptions.Item label="Subtotal">
								{selectedOrder.subTotal.toLocaleString('vi-VN')} ₫
							</Descriptions.Item>
							<Descriptions.Item label="Shipping Fee">
								{selectedOrder.shippingFee.toLocaleString('vi-VN')} ₫
							</Descriptions.Item>
							<Descriptions.Item label="Created At">
								{dayjs(selectedOrder.createdDate).format('MMMM DD, YYYY HH:mm')}
							</Descriptions.Item>
							<Descriptions.Item label="Delivery Address" span={2}>
								{selectedOrder.addressDescription}
							</Descriptions.Item>
							{selectedOrder.voucherCode && (
								<Descriptions.Item label="Voucher Code" span={2}>
									{selectedOrder.voucherCode} (-
									{selectedOrder.voucherDiscountAmount.toLocaleString(
										'vi-VN',
									)}{' '}
									₫)
								</Descriptions.Item>
							)}
						</Descriptions>

						<Title level={4} className="mt-6 mb-4">
							Order Items
						</Title>
						<Table
							columns={[
								{
									title: 'Image',
									dataIndex: 'flowerImage',
									key: 'flowerImage',
									width: 80,
									render: (image: string) => (
										<img
											src={image}
											alt="Flower"
											style={{
												width: 50,
												height: 50,
												objectFit: 'cover',
												borderRadius: 4,
											}}
										/>
									),
								},
								{
									title: 'Flower Name',
									dataIndex: 'flowerName',
									key: 'flowerName',
								},
								{
									title: 'Category',
									dataIndex: 'categoryName',
									key: 'categoryName',
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
									render: (price: number) =>
										`${price.toLocaleString('vi-VN')} ₫`,
								},
								{
									title: 'Total Price',
									dataIndex: 'totalPrice',
									key: 'totalPrice',
									render: (price: number) =>
										`${price.toLocaleString('vi-VN')} ₫`,
								},
							]}
							dataSource={selectedOrder.items}
							rowKey="orderDetailId"
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
							<Option value="pending">Pending</Option>
							<Option value="confirmed">Confirmed</Option>
							<Option value="processing">Processing</Option>
							<Option value="shipped">Shipped</Option>
							<Option value="delivered">Delivered</Option>
							<Option value="cancelled">Cancelled</Option>
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
