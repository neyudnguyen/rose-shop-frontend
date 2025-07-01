import { COLORS } from '../../constants/colors';
import { useAdminNotification } from '../../services/adminNotification';
import {
	type CategoryResponse,
	categoryService,
} from '../../services/categoryService';
import {
	type FlowerManageRequest,
	type FlowerResponse,
	flowerService,
} from '../../services/flowerService';
import {
	EditOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	Input,
	InputNumber,
	Modal,
	Row,
	Select,
	Space,
	Table,
	Tag,
	Upload,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;
const { Option } = Select;

export const AdminFlower: React.FC = () => {
	const notification = useAdminNotification();
	const [flowers, setFlowers] = useState<FlowerResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isViewModalVisible, setIsViewModalVisible] = useState(false);
	const [viewingFlower, setViewingFlower] = useState<FlowerResponse | null>(
		null,
	);
	const [editingFlower, setEditingFlower] = useState<FlowerResponse | null>(
		null,
	);
	const [searchText, setSearchText] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [form] = Form.useForm();

	// Load flowers and categories
	const loadFlowers = async () => {
		setLoading(true);
		try {
			const data = await flowerService.getAdminFlowers();
			setFlowers(data);
		} catch (error) {
			notification.error(
				'Failed to load flowers',
				'Please try refreshing the page or contact support if the problem persists',
			);
			console.error('Error loading flowers:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadCategories = async () => {
		try {
			const data = await categoryService.getCategories();
			setCategories(data);
		} catch (error) {
			console.error('Error loading categories:', error);
		}
	};

	useEffect(() => {
		loadFlowers();
		loadCategories();
	}, []);

	// Filter flowers based on search text
	const filteredFlowers = flowers.filter(
		(flower) =>
			flower.flowerName.toLowerCase().includes(searchText.toLowerCase()) ||
			flower.flowerDescription.toLowerCase().includes(searchText.toLowerCase()),
	);

	// Handle create/update flower
	const handleSubmit = async (values: {
		flowerName: string;
		flowerDescription: string;
		price: number;
		availableQuantity: number;
		categoryId: number;
		status?: string;
		imageUrl?: string;
	}) => {
		try {
			const requestData: FlowerManageRequest = {
				FlowerId: editingFlower?.flowerId,
				FlowerName: values.flowerName,
				FlowerDescription: values.flowerDescription,
				Price: values.price,
				AvailableQuantity: values.availableQuantity,
				CategoryId: values.categoryId,
				Status: values.status || 'active',
				ImageUrl: values.imageUrl,
			};

			// Add image file if uploaded
			if (fileList.length > 0 && fileList[0].originFileObj) {
				requestData.ImageFile = fileList[0].originFileObj as File;
			}

			await flowerService.manageFlower(requestData);

			if (editingFlower) {
				notification.updated('Flower', editingFlower.flowerId);
			} else {
				notification.created('Flower');
			}

			setIsModalVisible(false);
			setEditingFlower(null);
			setFileList([]);
			form.resetFields();
			loadFlowers();
		} catch (error) {
			notification.operationFailed(
				editingFlower ? 'update' : 'create',
				'Flower',
				error instanceof Error ? error.message : undefined,
			);
			console.error('Error saving flower:', error);
		}
	};

	// Handle edit flower
	const handleEdit = (flower: FlowerResponse) => {
		setEditingFlower(flower);
		form.setFieldsValue({
			flowerName: flower.flowerName,
			flowerDescription: flower.flowerDescription,
			price: flower.price,
			availableQuantity: flower.availableQuantity,
			categoryId: flower.categoryId,
			status: flower.status,
			imageUrl: flower.imageUrl,
		});
		setIsModalVisible(true);
	};

	// Handle view flower details
	const handleView = (flower: FlowerResponse) => {
		console.log('handleView called with:', flower); // Debug log
		setViewingFlower(flower);
		setIsViewModalVisible(true);
	};

	// Handle modal close
	const handleModalClose = () => {
		setIsModalVisible(false);
		setEditingFlower(null);
		setFileList([]);
		form.resetFields();
	};

	// Upload props
	const uploadProps = {
		fileList,
		onChange: ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
			setFileList(newFileList);
		},
		beforeUpload: () => false, // Prevent auto upload
		maxCount: 1,
		accept: 'image/*',
	};

	// Table columns
	const columns: ColumnsType<FlowerResponse> = [
		{
			title: <div style={{ textAlign: 'center' }}>ID</div>,
			dataIndex: 'flowerId',
			key: 'flowerId',
			width: 70,
			sorter: (a, b) => a.flowerId - b.flowerId,
			align: 'center',
			render: (id: number) => <div style={{ textAlign: 'center' }}>#{id}</div>,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Image</div>,
			dataIndex: 'imageUrl',
			key: 'imageUrl',
			width: 80,
			align: 'center',
			render: (imageUrl: string) => (
				<div style={{ textAlign: 'center' }}>
					{imageUrl ? (
						<Image
							src={imageUrl}
							alt="Flower"
							width={50}
							height={50}
							style={{ objectFit: 'cover', borderRadius: 4 }}
						/>
					) : (
						<div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center mx-auto">
							No Image
						</div>
					)}
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Name</div>,
			dataIndex: 'flowerName',
			key: 'flowerName',
			sorter: (a, b) => a.flowerName.localeCompare(b.flowerName),
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Price</div>,
			dataIndex: 'price',
			key: 'price',
			width: 100,
			sorter: (a, b) => a.price - b.price,
			align: 'center',
			render: (price: number) => (
				<div style={{ textAlign: 'center' }}>
					{price.toLocaleString('vi-VN')} ₫
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Stock</div>,
			dataIndex: 'availableQuantity',
			key: 'availableQuantity',
			width: 80,
			sorter: (a, b) => a.availableQuantity - b.availableQuantity,
			align: 'center',
			render: (quantity: number) => (
				<div style={{ textAlign: 'center' }}>
					<span className={quantity <= 10 ? 'text-red-500' : 'text-green-600'}>
						{quantity}
					</span>
				</div>
			),
		},
		{
			title: <div style={{ textAlign: 'center' }}>Category</div>,
			dataIndex: 'categoryName',
			key: 'categoryName',
			width: 120,
			align: 'center',
			filters: categories.map((cat) => ({
				text: cat.categoryName,
				value: cat.categoryName,
			})),
			onFilter: (value, record) => record.categoryName === value,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Status</div>,
			dataIndex: 'status',
			key: 'status',
			width: 100,
			align: 'center',
			render: (status: string) => (
				<div style={{ textAlign: 'center' }}>
					<Tag color={status === 'active' ? 'green' : 'red'}>
						{status === 'active' ? 'Active' : 'Inactive'}
					</Tag>
				</div>
			),
			filters: [
				{ text: 'Active', value: 'active' },
				{ text: 'Inactive', value: 'inactive' },
			],
			onFilter: (value, record) => record.status === value,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Created</div>,
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 120,
			align: 'center',
			render: (date: string) => (
				<div style={{ textAlign: 'center' }}>
					{date ? new Date(date).toLocaleDateString('en-US') : '-'}
				</div>
			),
			sorter: (a, b) =>
				new Date(a.createdAt || 0).getTime() -
				new Date(b.createdAt || 0).getTime(),
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
						<h2 className="text-2xl font-bold mb-0">Flower Management</h2>
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
						Add Flower
					</Button>
				}
			>
				{/* Search */}
				<div className="mb-4">
					<Input
						placeholder="Search flowers..."
						prefix={<SearchOutlined />}
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 300 }}
						allowClear
					/>
				</div>

				{/* Flowers table */}
				<Table
					columns={columns}
					dataSource={filteredFlowers}
					rowKey="flowerId"
					loading={loading}
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} flowers`,
					}}
					scroll={{ x: 1300 }}
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
							{editingFlower ? 'Edit Flower' : 'Add New Flower'}
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
								label="Flower Name"
								name="flowerName"
								rules={[
									{ required: true, message: 'Please enter flower name' },
									{ min: 2, message: 'Name must be at least 2 characters' },
								]}
							>
								<Input placeholder="Enter flower name..." />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Category"
								name="categoryId"
								rules={[{ required: true, message: 'Please select category' }]}
							>
								<Select placeholder="Select category">
									{categories.map((category) => (
										<Option
											key={category.categoryId}
											value={category.categoryId}
										>
											{category.categoryName}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						label="Description"
						name="flowerDescription"
						rules={[
							{ required: true, message: 'Please enter description' },
							{
								min: 10,
								message: 'Description must be at least 10 characters',
							},
						]}
					>
						<TextArea rows={4} placeholder="Enter flower description..." />
					</Form.Item>

					<Row gutter={16}>
						<Col span={8}>
							<Form.Item
								label="Price (₫)"
								name="price"
								rules={[
									{ required: true, message: 'Please enter price' },
									{
										type: 'number',
										min: 0.01,
										message: 'Price must be greater than 0',
									},
								]}
							>
								<InputNumber
									style={{ width: '100%' }}
									placeholder="0.00"
									precision={2}
									min={0.01}
								/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item
								label="Stock Quantity"
								name="availableQuantity"
								rules={[
									{ required: true, message: 'Please enter quantity' },
									{
										type: 'number',
										min: 0,
										message: 'Quantity must be 0 or greater',
									},
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

					<Form.Item label="Image URL (Optional)" name="imageUrl">
						<Input placeholder="Enter image URL..." />
					</Form.Item>

					<Form.Item label="Upload Image (Optional)">
						<Upload {...uploadProps}>
							<Button icon={<UploadOutlined />}>Select Image</Button>
						</Upload>
						{fileList.length > 0 && (
							<div className="mt-2 text-sm text-gray-500">
								Selected: {fileList[0].name}
							</div>
						)}
					</Form.Item>

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
							{editingFlower ? 'Update Flower' : 'Add Flower'}
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
							{viewingFlower?.flowerName || 'Flower Details'}
						</span>
					</div>
				}
				open={isViewModalVisible}
				onCancel={() => {
					setIsViewModalVisible(false);
					setViewingFlower(null);
				}}
				footer={null}
				width={700}
			>
				{viewingFlower && (
					<div className="mt-4">
						{viewingFlower.imageUrl && (
							<div className="mb-6 text-center">
								<Image
									src={viewingFlower.imageUrl}
									alt={viewingFlower.flowerName}
									style={{
										width: '100%',
										maxHeight: 400,
										objectFit: 'cover',
										borderRadius: 8,
									}}
								/>
							</div>
						)}
						<div className="space-y-4">
							<div>
								<strong className="text-gray-700">Description:</strong>
								<p className="mt-1 text-gray-600">
									{viewingFlower.flowerDescription}
								</p>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<strong className="text-gray-700">Price:</strong>
									<p className="mt-1 text-lg font-semibold text-green-600">
										{viewingFlower.price.toLocaleString('vi-VN')} ₫
									</p>
								</div>
								<div>
									<strong className="text-gray-700">Available Quantity:</strong>
									<p className="mt-1 text-lg font-semibold text-blue-600">
										{viewingFlower.availableQuantity}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<strong className="text-gray-700">Category:</strong>
									<p className="mt-1 text-gray-600">
										{viewingFlower.categoryName}
									</p>
								</div>
								<div>
									<strong className="text-gray-700">Status:</strong>
									<div className="mt-1">
										<Tag
											color={
												viewingFlower.status === 'active' ? 'green' : 'red'
											}
										>
											{viewingFlower.status === 'active'
												? 'Active'
												: 'Inactive'}
										</Tag>
									</div>
								</div>
							</div>
							{viewingFlower.createdAt && (
								<div>
									<strong className="text-gray-700">Created:</strong>
									<p className="mt-1 text-gray-600">
										{new Date(viewingFlower.createdAt).toLocaleDateString(
											'en-US',
											{
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											},
										)}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
};
