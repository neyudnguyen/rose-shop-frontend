import { COLORS } from '../../constants/colors';
import { useAdminNotification } from '../../services/adminNotification';
import {
	type VoucherManageRequest,
	type VoucherResponse,
	type VoucherStatsResponse,
	voucherService,
} from '../../services/voucherService';
import {
	BarChartOutlined,
	EditOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Progress,
	Row,
	Select,
	Space,
	Table,
	Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const AdminVoucher: React.FC = () => {
	const notification = useAdminNotification();
	const [vouchers, setVouchers] = useState<VoucherResponse[]>([]);
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isViewModalVisible, setIsViewModalVisible] = useState(false);
	const [isStatsModalVisible, setIsStatsModalVisible] = useState(false);
	const [editingVoucher, setEditingVoucher] = useState<VoucherResponse | null>(
		null,
	);
	const [viewingVoucher, setViewingVoucher] = useState<VoucherResponse | null>(
		null,
	);
	const [voucherStats, setVoucherStats] = useState<VoucherStatsResponse | null>(
		null,
	);
	const [searchText, setSearchText] = useState('');
	const [form] = Form.useForm();

	// Load vouchers
	const loadVouchers = React.useCallback(async () => {
		setLoading(true);
		try {
			const data = await voucherService.getAllVouchers();
			setVouchers(data);
		} catch (error) {
			notification.error('Failed to load vouchers');
			console.error('Error loading vouchers:', error);
		} finally {
			setLoading(false);
		}
	}, [notification]);

	useEffect(() => {
		loadVouchers();
	}, []);

	// Filter vouchers based on search text
	const filteredVouchers = vouchers.filter(
		(voucher) =>
			voucher.voucherCode.toLowerCase().includes(searchText.toLowerCase()) ||
			voucher.description.toLowerCase().includes(searchText.toLowerCase()),
	);

	// Handle create/update voucher
	const handleSubmit = async (values: {
		voucherCode: string;
		description: string;
		discount: number;
		usageLimit: number;
		remainingCount: number;
		status: string;
		dateRange: [dayjs.Dayjs, dayjs.Dayjs];
	}) => {
		try {
			const requestData: VoucherManageRequest = {
				UserVoucherStatusId: editingVoucher?.userVoucherStatusId,
				VoucherCode: values.voucherCode,
				Discount: values.discount,
				Description: values.description,
				StartDate: values.dateRange[0].toISOString(),
				EndDate: values.dateRange[1].toISOString(),
				UsageLimit: values.usageLimit,
				RemainingCount: values.remainingCount,
				Status: values.status,
			};

			await voucherService.manageVoucher(requestData);

			notification.success(
				editingVoucher
					? 'Voucher updated successfully'
					: 'Voucher created successfully',
			);

			setIsModalVisible(false);
			setEditingVoucher(null);
			form.resetFields();
			loadVouchers();
		} catch (error) {
			notification.error(
				editingVoucher
					? 'Failed to update voucher'
					: 'Failed to create voucher',
			);
			console.error('Error saving voucher:', error);
		}
	};

	// Handle edit voucher
	const handleEdit = (voucher: VoucherResponse) => {
		setEditingVoucher(voucher);
		form.setFieldsValue({
			voucherCode: voucher.voucherCode,
			description: voucher.description,
			discount: voucher.discount,
			usageLimit: voucher.usageLimit,
			remainingCount: voucher.remainingCount,
			status: voucher.status,
			dateRange: [dayjs(voucher.startDate), dayjs(voucher.endDate)],
		});
		setIsModalVisible(true);
	};

	// Handle view voucher details
	const handleView = (voucher: VoucherResponse) => {
		setViewingVoucher(voucher);
		setIsViewModalVisible(true);
	};

	// Handle view voucher stats
	const handleViewStats = async (voucher: VoucherResponse) => {
		try {
			const stats = await voucherService.getVoucherStats(voucher.voucherCode);
			setVoucherStats(stats);
			setIsStatsModalVisible(true);
		} catch (error) {
			notification.error('Failed to load voucher statistics');
			console.error('Error loading voucher stats:', error);
		}
	};

	// Handle modal close
	const handleModalClose = () => {
		setIsModalVisible(false);
		setEditingVoucher(null);
		form.resetFields();
	};

	// Table columns
	const columns: ColumnsType<VoucherResponse> = [
		{
			title: <div style={{ textAlign: 'center' }}>ID</div>,
			dataIndex: 'userVoucherStatusId',
			key: 'userVoucherStatusId',
			width: 80,
			sorter: (a, b) => a.userVoucherStatusId - b.userVoucherStatusId,
			align: 'center',
			render: (id: number) => <div style={{ textAlign: 'center' }}>#{id}</div>,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Voucher Code</div>,
			dataIndex: 'voucherCode',
			key: 'voucherCode',
			width: 150,
			sorter: (a, b) => a.voucherCode.localeCompare(b.voucherCode),
			align: 'center',
			render: (code: string) => (
				<div style={{ textAlign: 'center' }}>
					<Tag
						color="blue"
						style={{ fontFamily: 'monospace', fontSize: '12px' }}
					>
						{code}
					</Tag>
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Description</div>,
			dataIndex: 'description',
			key: 'description',
			width: 200,
			align: 'center',
			render: (description: string) => (
				<div style={{ textAlign: 'center' }}>
					{description.length > 50
						? `${description.substring(0, 50)}...`
						: description}
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Discount</div>,
			dataIndex: 'discount',
			key: 'discount',
			width: 100,
			sorter: (a, b) => a.discount - b.discount,
			align: 'center',
			render: (discount: number) => (
				<div style={{ textAlign: 'center' }}>
					<Tag color="green">{discount}%</Tag>
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Usage</div>,
			dataIndex: 'usageCount',
			key: 'usageCount',
			width: 120,
			align: 'center',
			render: (usageCount: number, record: VoucherResponse) => {
				const usageLimit = record.usageLimit || 0;
				const percentage = usageLimit > 0 ? (usageCount / usageLimit) * 100 : 0;
				return (
					<div style={{ textAlign: 'center' }}>
						<div>
							{usageCount || 0} / {usageLimit || 0}
						</div>
						<Progress
							percent={percentage}
							size="small"
							showInfo={false}
							strokeColor={percentage > 80 ? '#ff4d4f' : '#52c41a'}
						/>
					</div>
				);
			},
		},
		{
			title: <div style={{ textAlign: 'center' }}>Valid Period</div>,
			dataIndex: 'startDate',
			key: 'validPeriod',
			width: 180,
			align: 'center',
			render: (startDate: string, record: VoucherResponse) => (
				<div style={{ textAlign: 'center', fontSize: '12px' }}>
					<div>{dayjs(startDate).format('MMM DD, YYYY')}</div>
					<div style={{ color: '#666' }}>to</div>
					<div>{dayjs(record.endDate).format('MMM DD, YYYY')}</div>
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Status</div>,
			dataIndex: 'displayStatus',
			key: 'displayStatus',
			width: 120,
			align: 'center',
			render: (_, record: VoucherResponse) => {
				const status = record.status === 'active' ? 'Active' : 'Inactive';
				const color = record.status === 'active' ? 'green' : 'orange';

				return (
					<div style={{ textAlign: 'center' }}>
						<Tag color={color}>{status}</Tag>
					</div>
				);
			},
			filters: [
				{ text: 'Active', value: 'active' },
				{ text: 'Inactive', value: 'inactive' },
			],
			onFilter: (value, record) => {
				return record.status === value;
			},
		},
		{
			title: <div style={{ textAlign: 'center' }}>Actions</div>,
			key: 'actions',
			width: 200,
			align: 'center',
			render: (_, record) => (
				<Space
					size="small"
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<Button
						type="text"
						icon={<EyeOutlined />}
						onClick={() => handleView(record)}
						style={{ color: COLORS.info }}
					>
						View
					</Button>
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
						style={{ color: COLORS.primary }}
					>
						Edit
					</Button>
					<Button
						type="text"
						icon={<BarChartOutlined />}
						onClick={() => handleViewStats(record)}
						style={{ color: '#722ed1' }}
					>
						Stats
					</Button>
				</Space>
			),
		},
	];

	return (
		<div className="p-6">
			<Card
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-8 rounded"
							style={{ backgroundColor: COLORS.primary }}
						/>
						<h2 className="text-2xl font-bold mb-0">Voucher Management</h2>
					</div>
				}
				extra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => setIsModalVisible(true)}
						style={{
							background: COLORS.gradient.primary,
							border: 'none',
						}}
					>
						Add Voucher
					</Button>
				}
			>
				{/* Search */}
				<div className="mb-4">
					<Input
						placeholder="Search vouchers..."
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 300 }}
						allowClear
					/>
				</div>

				{/* Vouchers table */}
				<Table
					columns={columns}
					dataSource={filteredVouchers}
					rowKey="userVoucherStatusId"
					loading={loading}
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} vouchers`,
					}}
					scroll={{ x: 1400 }}
				/>
			</Card>

			{/* Create/Edit Modal */}
			<Modal
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-6 rounded"
							style={{ backgroundColor: COLORS.primary }}
						/>
						<span className="text-lg font-semibold">
							{editingVoucher ? 'Edit Voucher' : 'Add New Voucher'}
						</span>
					</div>
				}
				open={isModalVisible}
				onCancel={handleModalClose}
				footer={null}
				width={800}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					className="mt-4"
				>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Voucher Code"
								name="voucherCode"
								rules={[
									{ required: true, message: 'Please enter voucher code' },
									{ min: 3, message: 'Code must be at least 3 characters' },
									{ max: 20, message: 'Code cannot exceed 20 characters' },
								]}
							>
								<Input
									placeholder="Enter voucher code..."
									style={{ textTransform: 'uppercase' }}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Discount (%)"
								name="discount"
								rules={[
									{ required: true, message: 'Please enter discount' },
									{
										type: 'number',
										min: 1,
										max: 100,
										message: 'Discount must be between 1-100%',
									},
								]}
							>
								<InputNumber
									style={{ width: '100%' }}
									placeholder="0"
									min={1}
									max={100}
									addonAfter="%"
								/>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						label="Description"
						name="description"
						rules={[
							{ required: true, message: 'Please enter description' },
							{
								min: 10,
								message: 'Description must be at least 10 characters',
							},
						]}
					>
						<TextArea rows={3} placeholder="Enter voucher description..." />
					</Form.Item>

					<Form.Item
						label="Valid Period"
						name="dateRange"
						rules={[{ required: true, message: 'Please select valid period' }]}
					>
						<RangePicker
							style={{ width: '100%' }}
							showTime
							format="YYYY-MM-DD HH:mm:ss"
							disabledDate={(current) =>
								current && current < dayjs().startOf('day')
							}
						/>
					</Form.Item>

					<Row gutter={16}>
						<Col span={8}>
							<Form.Item
								label="Usage Limit"
								name="usageLimit"
								rules={[
									{ required: true, message: 'Please enter usage limit' },
									{ type: 'number', min: 1, message: 'Must be at least 1' },
								]}
							>
								<InputNumber
									style={{ width: '100%' }}
									placeholder="0"
									min={1}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Remaining Count"
								name="remainingCount"
								rules={[
									{ required: true, message: 'Please enter remaining count' },
									{ type: 'number', min: 0, message: 'Must be 0 or greater' },
								]}
							>
								<InputNumber
									style={{ width: '100%' }}
									placeholder="0"
									min={0}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="Status" name="status" initialValue="active">
								<Select>
									<Option value="active">Active</Option>
									<Option value="inactive">Inactive</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<div className="flex justify-end gap-3 mt-6">
						<Button onClick={handleModalClose} size="large">
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							style={{
								background: COLORS.gradient.primary,
								border: 'none',
							}}
						>
							{editingVoucher ? 'Update Voucher' : 'Add Voucher'}
						</Button>
					</div>
				</Form>
			</Modal>

			{/* View Modal */}
			<Modal
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-6 rounded"
							style={{ backgroundColor: COLORS.info }}
						/>
						<span className="text-lg font-semibold">
							{viewingVoucher?.voucherCode || 'Voucher Details'}
						</span>
					</div>
				}
				open={isViewModalVisible}
				onCancel={() => {
					setIsViewModalVisible(false);
					setViewingVoucher(null);
				}}
				footer={null}
				width={700}
			>
				{viewingVoucher && (
					<div className="mt-4">
						<div className="space-y-4">
							<div className="text-center mb-6">
								<Tag
									color="blue"
									style={{
										fontSize: '18px',
										padding: '8px 16px',
										fontFamily: 'monospace',
									}}
								>
									{viewingVoucher.voucherCode}
								</Tag>
							</div>

							<div>
								<strong className="text-gray-700">Description:</strong>
								<p className="mt-1 text-gray-600">
									{viewingVoucher.description}
								</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<strong className="text-gray-700">Discount:</strong>
									<p className="mt-1 text-lg font-semibold text-green-600">
										{viewingVoucher.discount}%
									</p>
								</div>
								<div>
									<strong className="text-gray-700">Status:</strong>
									<div className="mt-1">
										<Tag
											color={
												viewingVoucher.isActive && viewingVoucher.canUse
													? 'green'
													: 'red'
											}
										>
											{viewingVoucher.displayStatus}
										</Tag>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<strong className="text-gray-700">Valid From:</strong>
									<p className="mt-1 text-gray-600">
										{dayjs(viewingVoucher.startDate).format(
											'MMMM DD, YYYY HH:mm',
										)}
									</p>
								</div>
								<div>
									<strong className="text-gray-700">Valid Until:</strong>
									<p className="mt-1 text-gray-600">
										{dayjs(viewingVoucher.endDate).format(
											'MMMM DD, YYYY HH:mm',
										)}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div>
									<strong className="text-gray-700">Usage Limit:</strong>
									<p className="mt-1 text-lg font-semibold text-blue-600">
										{viewingVoucher.usageLimit || 0}
									</p>
								</div>
								<div>
									<strong className="text-gray-700">Used:</strong>
									<p className="mt-1 text-lg font-semibold text-orange-600">
										{viewingVoucher.usageCount || 0}
									</p>
								</div>
								<div>
									<strong className="text-gray-700">Remaining:</strong>
									<p className="mt-1 text-lg font-semibold text-green-600">
										{viewingVoucher.remainingCount || 0}
									</p>
								</div>
							</div>

							{viewingVoucher.usageLimit && (
								<div>
									<strong className="text-gray-700">Usage Progress:</strong>
									<div className="mt-2">
										<Progress
											percent={
												((viewingVoucher.usageCount || 0) /
													viewingVoucher.usageLimit) *
												100
											}
											strokeColor={
												(viewingVoucher.usageCount || 0) /
													viewingVoucher.usageLimit >
												0.8
													? '#ff4d4f'
													: '#52c41a'
											}
										/>
									</div>
								</div>
							)}

							{viewingVoucher.createdAt && (
								<div>
									<strong className="text-gray-700">Created:</strong>
									<p className="mt-1 text-gray-600">
										{dayjs(viewingVoucher.createdAt).format(
											'MMMM DD, YYYY HH:mm',
										)}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</Modal>

			{/* Stats Modal */}
			<Modal
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-6 rounded"
							style={{ backgroundColor: '#722ed1' }}
						/>
						<span className="text-lg font-semibold">
							Voucher Statistics: {voucherStats?.voucherCode}
						</span>
					</div>
				}
				open={isStatsModalVisible}
				onCancel={() => {
					setIsStatsModalVisible(false);
					setVoucherStats(null);
				}}
				footer={null}
				width={800}
			>
				{voucherStats && (
					<div className="mt-4">
						<div className="grid grid-cols-4 gap-4 mb-6">
							<div className="text-center">
								<div className="text-2xl font-bold text-blue-600">
									{voucherStats.totalUsers}
								</div>
								<div className="text-gray-600">Total Users</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-green-600">
									{voucherStats.usedCount}
								</div>
								<div className="text-gray-600">Used</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-orange-600">
									{voucherStats.remainingCount}
								</div>
								<div className="text-gray-600">Remaining</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-purple-600">
									{voucherStats.usagePercentage.toFixed(1)}%
								</div>
								<div className="text-gray-600">Usage Rate</div>
							</div>
						</div>

						<div className="mb-4">
							<Progress
								percent={voucherStats.usagePercentage}
								strokeColor="#722ed1"
								trailColor="#f0f0f0"
								strokeWidth={10}
							/>
						</div>

						{voucherStats.userStats && voucherStats.userStats.length > 0 && (
							<div>
								<h4 className="font-semibold mb-3">User Usage Details</h4>
								<Table
									dataSource={voucherStats.userStats}
									pagination={{ pageSize: 5 }}
									size="small"
									columns={[
										{
											title: 'User',
											dataIndex: 'userName',
											key: 'userName',
										},
										{
											title: 'Email',
											dataIndex: 'email',
											key: 'email',
										},
										{
											title: 'Used',
											dataIndex: 'usageCount',
											key: 'usageCount',
											align: 'center',
											render: (count: number) => count || 0,
										},
										{
											title: 'Remaining',
											dataIndex: 'remainingCount',
											key: 'remainingCount',
											align: 'center',
											render: (count: number) => count || 0,
										},
										{
											title: 'Status',
											dataIndex: 'hasUsed',
											key: 'hasUsed',
											align: 'center',
											render: (hasUsed: boolean) => (
												<Tag color={hasUsed ? 'green' : 'orange'}>
													{hasUsed ? 'Used' : 'Unused'}
												</Tag>
											),
										},
									]}
								/>
							</div>
						)}
					</div>
				)}
			</Modal>
		</div>
	);
};
