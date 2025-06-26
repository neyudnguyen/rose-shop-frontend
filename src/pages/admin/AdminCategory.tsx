import { COLORS } from '../../constants/colors';
import {
	type CategoryCreateRequest,
	type CategoryResponse,
	categoryService,
} from '../../services/categoryService';
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Form,
	Input,
	Modal,
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
			title: <div style={{ textAlign: 'center' }}>ID</div>,
			dataIndex: 'categoryId',
			key: 'categoryId',
			width: 80,
			sorter: (a, b) => a.categoryId - b.categoryId,
			align: 'center',
			render: (id: number) => <div style={{ textAlign: 'center' }}>#{id}</div>,
		},
		{
			title: <div style={{ textAlign: 'center' }}>Category Name</div>,
			dataIndex: 'categoryName',
			key: 'categoryName',
			width: 200,
			sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Status</div>,
			dataIndex: 'status',
			key: 'status',
			width: 120,
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
			title: <div style={{ textAlign: 'center' }}>Flower Count</div>,
			dataIndex: 'flowerCount',
			key: 'flowerCount',
			width: 120,
			sorter: (a, b) => a.flowerCount - b.flowerCount,
			align: 'center',
		},
		{
			title: <div style={{ textAlign: 'center' }}>Created Date</div>,
			dataIndex: 'createdAt',
			key: 'createdAt',
			width: 150,
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
				<div style={{ textAlign: 'center' }}>
					<Space size="small">
						<Button
							type="text"
							icon={<EditOutlined />}
							onClick={() => handleEdit(record)}
							style={{ color: COLORS.primary }}
						>
							Edit
						</Button>
					</Space>
				</div>
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
					</div>
				</div>

				{/* Categories table */}
				<Table
					columns={columns}
					dataSource={filteredCategories}
					rowKey="categoryId"
					loading={loading}
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
