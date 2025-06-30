import { cartService } from '../services/cartService';
import { flowerService } from '../services/flowerService';
import type { Flower } from '../types';
import {
	CloseCircleOutlined,
	DollarOutlined,
	ExclamationCircleOutlined,
	FlagOutlined,
	HomeOutlined,
	MinusOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Breadcrumb,
	Button,
	Card,
	Descriptions,
	Divider,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Space,
	Spin,
	Typography,
	message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ReportFormValues {
	report_reason: string;
	report_description: string;
}

export const FlowerDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [flower, setFlower] = useState<Flower | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [addingToCart, setAddingToCart] = useState(false);
	const [reportModalVisible, setReportModalVisible] = useState(false);
	const [reportForm] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const fetchFlower = async () => {
			if (!id) return;

			try {
				const flowerData = await flowerService.getFlowerById(Number(id));
				setFlower(flowerData);
			} catch (err) {
				setError('Failed to load flower details. Please try again.');
				console.error('Error fetching flower:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchFlower();
	}, [id]);

	const handleAddToCart = async () => {
		if (!flower) return;

		setAddingToCart(true);
		try {
			await cartService.addToCart(flower.flowerId?.toString() || '', quantity);
			message.success('Added to cart successfully!');
		} catch (err) {
			console.error('Error adding to cart:', err);
			message.error('Failed to add to cart. Please try again.');
		} finally {
			setAddingToCart(false);
		}
	};

	const handleIncrement = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecrement = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const showReportModal = () => {
		setReportModalVisible(true);
	};

	const handleReportCancel = () => {
		setReportModalVisible(false);
		reportForm.resetFields();
	};

	const handleReportSubmit = async (values: ReportFormValues) => {
		setSubmitting(true);
		try {
			// Mock implementation - in real app, you would send to API
			const reportData = {
				flower_id: Number(id),
				report_reason: values.report_reason,
				report_description: values.report_description,
			};

			console.log('Report data to submit:', reportData);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			message.success('Report submitted successfully');
			setReportModalVisible(false);
			reportForm.resetFields();
		} catch (error) {
			console.error('Error submitting report:', error);
			message.error('Failed to submit report. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	const reportReasons = [
		'Inappropriate content',
		'Misleading information',
		'Counterfeit product',
		'Prohibited item',
		'Price issues',
		'Other',
	];

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-96">
				<Spin size="large" />
			</div>
		);
	}

	if (error || !flower) {
		return (
			<div className="p-4">
				<Alert
					message="Error"
					description={error || 'Flower not found'}
					type="error"
					showIcon
				/>
			</div>
		);
	}

	const isAvailable =
		flower.status === 'active' && flower.availableQuantity > 0;

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 lg:py-24">
			<Breadcrumb
				className="mb-6"
				items={[
					{
						title: (
							<Link to="/">
								<HomeOutlined />
							</Link>
						),
					},
					{
						title: <Link to="/flowers">Flowers</Link>,
					},
					{
						title: flower.categoryName || 'Category',
					},
					{
						title: flower.flowerName,
					},
				]}
			/>

			<div className="flex flex-col lg:flex-row gap-10">
				{/* Image Section */}
				<div className="flex-1">
					<Card className="h-full border-0 shadow-lg">
						<div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-lg">
							<img
								src={flower.imageUrl}
								alt={flower.flowerName}
								className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src = '/images/picture/hoa4.jpg';
								}}
							/>
							{!isAvailable && (
								<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
									<div className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
										Out of Stock
									</div>
								</div>
							)}
						</div>
					</Card>
				</div>

				{/* Details Section */}
				<div className="flex-1 flex flex-col justify-between space-y-6">
					<div>
						<Title level={2} style={{ color: '#644A07', marginBottom: '16px' }}>
							{flower.flowerName}
						</Title>
						<Title level={4} style={{ color: '#594100', marginBottom: '24px' }}>
							{flower.price.toLocaleString('vi-VN')} VND
						</Title>
						<Paragraph style={{ color: '#644A07', marginBottom: '24px' }}>
							{flower.flowerDescription}
						</Paragraph>

						<Descriptions column={1} size="small" className="mb-6">
							<Descriptions.Item label={<Text strong>Category</Text>}>
								{flower.categoryName || 'N/A'}
							</Descriptions.Item>
							<Descriptions.Item label={<Text strong>Stock</Text>}>
								<Text
									className={
										flower.availableQuantity > 0
											? 'text-green-600'
											: 'text-red-600'
									}
								>
									{flower.availableQuantity > 0
										? `${flower.availableQuantity} available`
										: 'Out of stock'}
								</Text>
							</Descriptions.Item>
							<Descriptions.Item label={<Text strong>Status</Text>}>
								<Text
									className={
										flower.status === 'active'
											? 'text-green-600'
											: 'text-red-600'
									}
								>
									{flower.status === 'active' ? 'Available' : 'Unavailable'}
								</Text>
							</Descriptions.Item>
						</Descriptions>
					</div>

					<Divider />

					{/* Quantity Selector */}
					<div className="flex items-center space-x-4">
						<Text strong style={{ color: '#644A07' }}>
							Quantity:
						</Text>
						<Space>
							<Button
								icon={<MinusOutlined />}
								onClick={handleDecrement}
								disabled={!isAvailable}
							/>
							<InputNumber
								min={1}
								max={flower.availableQuantity}
								value={quantity}
								onChange={(value) => setQuantity(Number(value) || 1)}
								controls={false}
								style={{ width: '60px' }}
								disabled={!isAvailable}
							/>
							<Button
								icon={<PlusOutlined />}
								onClick={handleIncrement}
								disabled={!isAvailable || quantity >= flower.availableQuantity}
							/>
						</Space>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
						<Button
							type="primary"
							size="large"
							icon={<ShoppingCartOutlined />}
							style={{
								backgroundColor: '#FFDBDB',
								color: '#644A07',
								borderColor: '#FFDBDB',
							}}
							onClick={handleAddToCart}
							loading={addingToCart}
							disabled={!isAvailable}
							className="hover:bg-pink-200"
						>
							Add to Cart
						</Button>
						<Button
							type="primary"
							size="large"
							icon={<DollarOutlined />}
							style={{
								backgroundColor: '#FFC6C6',
								color: '#644A07',
								borderColor: '#FFC6C6',
							}}
							disabled={!isAvailable}
							className="hover:bg-pink-300"
						>
							Buy Now
						</Button>
					</div>

					{/* Report Button */}
					<div>
						<Button
							icon={<FlagOutlined />}
							style={{ color: '#644A07', borderColor: '#644A07' }}
							onClick={showReportModal}
							className="hover:bg-yellow-50"
						>
							Report to Admin
						</Button>
					</div>

					{/* Additional Info Card */}
					<Card className="bg-gray-50 border-0 shadow-sm">
						<div className="space-y-2">
							<div className="flex justify-between">
								<Text>Delivery:</Text>
								<Text strong>Same day delivery available</Text>
							</div>
							<div className="flex justify-between">
								<Text>Care instructions:</Text>
								<Text>Included with purchase</Text>
							</div>
							<div className="flex justify-between">
								<Text>Guarantee:</Text>
								<Text>7-day freshness guarantee</Text>
							</div>
						</div>
					</Card>
				</div>
			</div>

			{/* Report Modal */}
			<Modal
				title={
					<div className="flex items-center text-[#644A07]">
						<ExclamationCircleOutlined className="mr-2" />
						Report this Product
					</div>
				}
				open={reportModalVisible}
				onCancel={handleReportCancel}
				footer={null}
				width={500}
				className="report-modal"
			>
				<Divider className="my-3" />
				<Form form={reportForm} layout="vertical" onFinish={handleReportSubmit}>
					<Form.Item
						name="report_reason"
						label={
							<span className="text-[#644A07] font-medium">
								Reason for Report
							</span>
						}
						rules={[{ required: true, message: 'Please select a reason' }]}
					>
						<Select
							placeholder="Select a reason"
							className="rounded-lg"
							style={{ width: '100%' }}
							dropdownStyle={{ borderRadius: '8px' }}
						>
							{reportReasons.map((reason) => (
								<Option key={reason} value={reason}>
									{reason}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="report_description"
						label={
							<span className="text-[#644A07] font-medium">Description</span>
						}
						rules={[
							{
								required: true,
								message: 'Please provide details about the issue',
							},
							{ max: 255, message: 'Description cannot exceed 255 characters' },
						]}
					>
						<TextArea
							rows={4}
							placeholder="Please provide more details about the issue..."
							maxLength={255}
							showCount
							className="rounded-lg"
							style={{ border: '1.5px solid #d9d9d9', borderRadius: '8px' }}
						/>
					</Form.Item>

					<div className="flex justify-end space-x-3 mt-4">
						<Button
							onClick={handleReportCancel}
							icon={<CloseCircleOutlined />}
							className="rounded-full"
						>
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							loading={submitting}
							icon={<FlagOutlined />}
							className="bg-gradient-to-r from-[#644A07] to-[#8B6914] hover:from-[#8B6914] hover:to-[#644A07] border-none rounded-full"
						>
							Submit Report
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};
