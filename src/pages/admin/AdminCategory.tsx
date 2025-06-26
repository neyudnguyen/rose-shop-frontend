import { COLORS } from '../../constants/colors';
import {
	type CategoryCreateRequest,
	type CategoryResponse,
	categoryService,
} from '../../services/categoryService';
import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import {
	Button,
	Card,
	Form,
	Input,
	Modal,
	Popconfirm,
	Space,
	Table,
	Tag,
	message,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

export const AdminCategory: React.FC = () => {
	const [categories, setCategories] = useState<CategoryResponse[]>([]);
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingCategory, setEditingCategory] =
		useState<CategoryResponse | null>(null);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [searchText, setSearchText] = useState('');
	const [form] = Form.useForm();

	// Load categories
	const loadCategories = async () => {
		setLoading(true);
		try {
			const data = await categoryService.getCategories();
			setCategories(data);
		} catch (error) {
			message.error('Failed to load categories');
			console.error('Error loading categories:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	// Filter categories based on search text
	const filteredCategories = categories.filter((category) =>
		category.categoryName.toLowerCase().includes(searchText.toLowerCase()),
	);

	// Handle create/update category
	const handleSubmit = async (values: { categoryName: string }) => {
		try {
			const requestData: CategoryCreateRequest = {
				categoryName: values.categoryName,
			};

			if (editingCategory) {
				// Update category
				await categoryService.updateCategory(
					editingCategory.categoryId,
					requestData,
				);
				message.success('Category updated successfully');
			} else {
				// Create category
				await categoryService.createCategory(requestData);
				message.success('Category created successfully');
			}

			setIsModalVisible(false);
			setEditingCategory(null);
			form.resetFields();
			loadCategories();
		} catch (error) {
			message.error(
				editingCategory
					? 'Failed to update category'
					: 'Failed to create category',
			);
			console.error('Error saving category:', error);
		}
	};

	// Handle delete category
	const handleDelete = async (categoryId: number) => {
		try {
			await categoryService.deleteCategory(categoryId);
			message.success('Category deleted successfully');
			loadCategories();
		} catch (error) {
			message.error('Failed to delete category');
			console.error('Error deleting category:', error);
		}
	};

	// Handle bulk delete
	const handleBulkDelete = async () => {
		if (selectedRowKeys.length === 0) {
			message.warning('Please select at least one category to delete');
			return;
		}

		try {
			setLoading(true);
			// Delete each selected category
			await Promise.all(
				selectedRowKeys.map((key) =>
					categoryService.deleteCategory(Number(key)),
				),
			);
			message.success(`Deleted ${selectedRowKeys.length} categories`);
			setSelectedRowKeys([]);
			loadCategories();
		} catch (error) {
			message.error('Failed to delete selected categories');
			console.error('Error bulk deleting categories:', error);
		} finally {
			setLoading(false);
		}
	};

	// Handle edit category
	const handleEdit = (category: CategoryResponse) => {
		setEditingCategory(category);
		form.setFieldsValue({
			categoryName: category.categoryName,
		});
		setIsModalVisible(true);
	};

	// Handle modal close
	const handleModalClose = () => {
		setIsModalVisible(false);
		setEditingCategory(null);
		form.resetFields();
	};

	// Table columns
	const columns: ColumnsType<CategoryResponse> = [
		{
			title: 'ID',
			dataIndex: 'categoryId',
			key: 'categoryId',
			width: 80,
			sorter: (a, b) => a.categoryId - b.categoryId,
		},
		{
			title: 'Category Name',
			dataIndex: 'categoryName',
			key: 'categoryName',
			sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			width: 120,
			render: (status: string) => (
				<Tag color={status === 'active' ? 'green' : 'red'}>
					{status === 'active' ? 'Active' : 'Inactive'}
				</Tag>
			),
			filters: [
				{ text: 'Active', value: 'active' },
				{ text: 'Inactive', value: 'inactive' },
			],
			onFilter: (value, record) => record.status === value,
		},
		{
			title: 'Flower Count',
			dataIndex: 'flowerCount',
			key: 'flowerCount',
			width: 120,
			sorter: (a, b) => a.flowerCount - b.flowerCount,
		},
		{
			title: 'Created Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
			render: (date: string) =>
				date ? new Date(date).toLocaleDateString('en-US') : '-',
			sorter: (a, b) =>
				new Date(a.createdAt || 0).getTime() -
				new Date(b.createdAt || 0).getTime(),
		},
		{
			title: 'Actions',
			key: 'actions',
			width: 150,
			render: (_, record) => (
				<Space size="small">
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => handleEdit(record)}
						style={{ color: COLORS.primary }}
					>
						Edit
					</Button>
					<Popconfirm
						title="Confirm Delete"
						description="Are you sure you want to delete this category?"
						onConfirm={() => handleDelete(record.categoryId)}
						okText="Delete"
						cancelText="Cancel"
						okButtonProps={{ danger: true }}
					>
						<Button type="text" icon={<DeleteOutlined />} danger>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	// Row selection
	const rowSelection = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys);
		},
	};

	return (
		<div className="p-6">
			<Card
				title={
					<div className="flex items-center gap-3">
						<div
							className="w-1 h-8 rounded"
							style={{ backgroundColor: COLORS.primary }}
						/>
						<h2 className="text-2xl font-bold mb-0">Category Management</h2>
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
						Add Category
					</Button>
				}
			>
				{/* Search and bulk actions */}
				<div className="mb-4 flex justify-between items-center">
					<div className="flex gap-3">
						<Input
							placeholder="Search categories..."
							prefix={<SearchOutlined />}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							style={{ width: 300 }}
							allowClear
						/>
						{selectedRowKeys.length > 0 && (
							<Popconfirm
								title="Confirm Delete"
								description={`Are you sure you want to delete ${selectedRowKeys.length} selected categories?`}
								onConfirm={handleBulkDelete}
								okText="Delete"
								cancelText="Cancel"
								okButtonProps={{ danger: true }}
							>
								<Button danger icon={<DeleteOutlined />}>
									Delete Selected ({selectedRowKeys.length})
								</Button>
							</Popconfirm>
						)}
					</div>
				</div>

				{/* Categories table */}
				<Table
					columns={columns}
					dataSource={filteredCategories}
					rowKey="categoryId"
					loading={loading}
					rowSelection={rowSelection}
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} of ${total} categories`,
					}}
					style={{
						borderRadius: 8,
						overflow: 'hidden',
					}}
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
							{editingCategory ? 'Edit Category' : 'Add New Category'}
						</span>
					</div>
				}
				open={isModalVisible}
				onCancel={handleModalClose}
				footer={null}
				width={500}
			>
				<Form
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					className="mt-4"
				>
					<Form.Item
						label="Category Name"
						name="categoryName"
						rules={[
							{ required: true, message: 'Please enter category name' },
							{
								min: 2,
								message: 'Category name must be at least 2 characters',
							},
							{
								max: 100,
								message: 'Category name cannot exceed 100 characters',
							},
						]}
					>
						<Input placeholder="Enter category name..." size="large" />
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
							{editingCategory ? 'Update' : 'Add Category'}
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};
