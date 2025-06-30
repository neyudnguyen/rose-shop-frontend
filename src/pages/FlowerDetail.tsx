import { FlowerCard } from '../components/FlowerCard';
import { cartService } from '../services/cartService';
import { flowerService } from '../services/flowerService';
import type { Flower } from '../types';
import {
	CloseCircleOutlined,
	DollarOutlined,
	ExclamationCircleOutlined,
	FlagOutlined,
	HeartOutlined,
	HomeOutlined,
	MinusOutlined,
	PlusOutlined,
	ShareAltOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Breadcrumb,
	Button,
	Card,
	Col,
	Descriptions,
	Divider,
	Form,
	Image,
	Input,
	InputNumber,
	Modal,
	Row,
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
	const [suggestedFlowers, setSuggestedFlowers] = useState<Flower[]>([]);
	const [loading, setLoading] = useState(true);
	const [suggestedLoading, setSuggestedLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [addingToCart, setAddingToCart] = useState(false);
	const [reportModalVisible, setReportModalVisible] = useState(false);
	const [reportForm] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const fetchFlower = async () => {
			if (!id) return;

			try {
				const flowerData = await flowerService.getFlowerById(Number(id));
				setFlower(flowerData);

				// Fetch suggested flowers after getting the main flower
				setSuggestedLoading(true);
				try {
					const allFlowers = await flowerService.getFlowers();
					// Filter out current flower and get random 4 flowers
					const filteredFlowers = allFlowers.filter(
						(f) => f.flowerId !== flowerData.flowerId && f.status === 'active',
					);
					const shuffled = filteredFlowers.sort(() => 0.5 - Math.random());
					setSuggestedFlowers(shuffled.slice(0, 4));
				} catch (suggestedError) {
					console.error('Error fetching suggested flowers:', suggestedError);
				} finally {
					setSuggestedLoading(false);
				}
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

	const handleAddToFavorites = () => {
		setIsFavorite(!isFavorite);
		message.success(
			isFavorite ? 'Removed from favorites' : 'Added to favorites',
		);
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: flower?.flowerName,
				text: flower?.flowerDescription,
				url: window.location.href,
			});
		} else {
			navigator.clipboard.writeText(window.location.href);
			message.success('Link copied to clipboard!');
		}
	};

	const handleSuggestedAddToCart = async (flowerId: string) => {
		try {
			await cartService.addToCart(flowerId, 1);
			message.success('Added to cart successfully!');
		} catch (err) {
			console.error('Error adding to cart:', err);
			message.error('Failed to add to cart. Please try again.');
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
			<div
				className="flex justify-center items-center min-h-96"
				style={{
					background:
						'linear-gradient(135deg, #FFF9E6 0%, #FFDBDB 50%, #FFC6C6 100%)',
				}}
			>
				<Spin size="large" style={{ color: '#644A07' }} />
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
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-6xl mx-auto px-4 py-8 lg:py-16">
				<Breadcrumb
					className="mb-8 bg-white px-4 py-2 rounded-lg shadow-sm"
					items={[
						{
							title: (
								<Link to="/" className="text-blue-600 hover:text-blue-800">
									<HomeOutlined />
								</Link>
							),
						},
						{
							title: (
								<Link
									to="/flowers"
									className="text-blue-600 hover:text-blue-800"
								>
									Flowers
								</Link>
							),
						},
						{
							title: (
								<span className="text-gray-600">
									{flower.categoryName || 'Category'}
								</span>
							),
						},
						{
							title: (
								<span className="text-gray-800 font-medium">
									{flower.flowerName}
								</span>
							),
						},
					]}
				/>

				<div className="flex flex-col lg:flex-row gap-10 mb-16">
					{/* Image Section */}
					<div className="flex-1">
						<Card className="h-full border-0 shadow-xl rounded-2xl overflow-hidden bg-white">
							<div className="relative w-full h-96 lg:h-[500px] overflow-hidden">
								<Image
									src={flower.imageUrl}
									alt={flower.flowerName}
									className="w-full h-full object-cover"
									style={{ borderRadius: '1rem' }}
									preview={{
										mask: (
											<div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
												Click to zoom
											</div>
										),
									}}
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = '/images/picture/hoa4.jpg';
									}}
								/>
								{!isAvailable && (
									<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
										<div className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
											Out of Stock
										</div>
									</div>
								)}
							</div>
						</Card>
					</div>

					{/* Details Section */}
					<div className="flex-1 flex flex-col justify-between space-y-6">
						<Card className="border-0 shadow-xl rounded-2xl bg-white p-6">
							<div>
								<Title level={2} className="!text-3xl !font-bold !mb-4">
									{flower.flowerName}
								</Title>
								<div className="flex items-center gap-4 mb-6">
									<Title level={3} className="!mb-0 !text-2xl text-green-600">
										{flower.price.toLocaleString('vi-VN')} VND
									</Title>
									<div className="flex gap-2">
										<Button
											icon={<HeartOutlined />}
											type={isFavorite ? 'primary' : 'default'}
											shape="circle"
											size="large"
											onClick={handleAddToFavorites}
										/>
										<Button
											icon={<ShareAltOutlined />}
											type="default"
											shape="circle"
											size="large"
											onClick={handleShare}
										/>
									</div>
								</div>
								<Paragraph className="text-gray-700 text-lg leading-relaxed mb-6">
									{flower.flowerDescription}
								</Paragraph>

								<Descriptions column={1} size="middle" className="mb-6">
									<Descriptions.Item
										label={
											<Text strong className="text-gray-700">
												Category
											</Text>
										}
									>
										<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
											{flower.categoryName || 'N/A'}
										</span>
									</Descriptions.Item>
									<Descriptions.Item
										label={
											<Text strong className="text-gray-700">
												Stock
											</Text>
										}
									>
										<Text
											className={`font-medium ${
												flower.availableQuantity > 0
													? 'text-green-600'
													: 'text-red-600'
											}`}
										>
											{flower.availableQuantity > 0
												? `${flower.availableQuantity} available`
												: 'Out of stock'}
										</Text>
									</Descriptions.Item>
									<Descriptions.Item
										label={
											<Text strong className="text-gray-700">
												Status
											</Text>
										}
									>
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${
												flower.status === 'active'
													? 'bg-green-100 text-green-800'
													: 'bg-red-100 text-red-800'
											}`}
										>
											{flower.status === 'active' ? 'Available' : 'Unavailable'}
										</span>
									</Descriptions.Item>
								</Descriptions>
							</div>

							<Divider className="my-6" />

							{/* Quantity Selector */}
							<div className="flex items-center justify-between mb-6">
								<Text strong className="text-lg">
									Quantity:
								</Text>
								<Space size="middle">
									<Button
										icon={<MinusOutlined />}
										onClick={handleDecrement}
										disabled={!isAvailable}
										size="large"
									/>
									<InputNumber
										min={1}
										max={flower.availableQuantity}
										value={quantity}
										onChange={(value) => setQuantity(Number(value) || 1)}
										controls={false}
										style={{ width: '80px' }}
										size="large"
										disabled={!isAvailable}
										className="text-center font-semibold"
									/>
									<Button
										icon={<PlusOutlined />}
										onClick={handleIncrement}
										disabled={
											!isAvailable || quantity >= flower.availableQuantity
										}
										size="large"
									/>
								</Space>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									type="primary"
									size="large"
									icon={<ShoppingCartOutlined />}
									onClick={handleAddToCart}
									loading={addingToCart}
									disabled={!isAvailable}
									className="flex-1 h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Add to Cart
								</Button>
								<Button
									type="primary"
									size="large"
									icon={<DollarOutlined />}
									disabled={!isAvailable}
									className="flex-1 h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
								>
									Buy Now
								</Button>
							</div>

							{/* Report Button */}
							<div className="mt-4">
								<Button
									icon={<FlagOutlined />}
									onClick={showReportModal}
									className="rounded-lg"
								>
									Report to Admin
								</Button>
							</div>
						</Card>

						{/* Additional Info Card */}
						<Card className="border-0 shadow-lg rounded-2xl bg-white">
							<div className="space-y-3">
								<div className="flex justify-between items-center">
									<Text className="text-gray-600">🚚 Delivery:</Text>
									<Text strong className="text-gray-800">
										Same day delivery available
									</Text>
								</div>
								<div className="flex justify-between items-center">
									<Text className="text-gray-600">📋 Care instructions:</Text>
									<Text strong className="text-gray-800">
										Included with purchase
									</Text>
								</div>
								<div className="flex justify-between items-center">
									<Text className="text-gray-600">✅ Guarantee:</Text>
									<Text strong className="text-gray-800">
										7-day freshness guarantee
									</Text>
								</div>
							</div>
						</Card>
					</div>
				</div>

				{/* Suggested Flowers Section */}
				<div className="mt-16">
					<Card className="border-0 shadow-xl rounded-2xl bg-white">
						<div className="text-center mb-8">
							<Title level={2} className="!text-2xl !font-bold !mb-2">
								You might also like
							</Title>
							<Text className="text-gray-600 text-lg">
								Discover more beautiful flowers from our collection
							</Text>
						</div>

						{suggestedLoading ? (
							<div className="flex justify-center items-center min-h-64">
								<Spin size="large" />
							</div>
						) : (
							<Row gutter={[24, 24]}>
								{suggestedFlowers.map((suggestedFlower) => (
									<Col xs={24} sm={12} md={6} key={suggestedFlower.flowerId}>
										<FlowerCard
											flower={suggestedFlower}
											onAddToCart={handleSuggestedAddToCart}
										/>
									</Col>
								))}
							</Row>
						)}
					</Card>
				</div>
			</div>

			{/* Report Modal */}
			<Modal
				title={
					<div className="flex items-center">
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
						label={<span className="font-medium">Reason for Report</span>}
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
						label={<span className="font-medium">Description</span>}
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
							className="rounded-full"
						>
							Submit Report
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};
