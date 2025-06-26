import { cartService } from '../services/cartService';
import { flowerService } from '../services/flowerService';
import type { Flower } from '../types';
import {
	ArrowLeftOutlined,
	HeartOutlined,
	ShareAltOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Breadcrumb,
	Button,
	Card,
	Col,
	Image,
	InputNumber,
	Rate,
	Row,
	Spin,
	Tag,
	Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

export const FlowerDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [flower, setFlower] = useState<Flower | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [quantity, setQuantity] = useState(1);
	const [addingToCart, setAddingToCart] = useState(false);

	useEffect(() => {
		const fetchFlower = async () => {
			if (!id) return;

			try {
				const flowerData = await flowerService.getFlowerById(id);
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
			await cartService.addToCart(flower.id, quantity);
			// You might want to show a success message here
		} catch (err) {
			console.error('Error adding to cart:', err);
			// You might want to show an error message here
		} finally {
			setAddingToCart(false);
		}
	};

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
	return (
		<div className="max-w-7xl mx-auto px-4 py-8" style={{ paddingTop: '80px' }}>
			<Breadcrumb className="mb-6">
				<Breadcrumb.Item>
					<a onClick={() => navigate('/')}>Home</a>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<a onClick={() => navigate('/flowers')}>Flowers</a>
				</Breadcrumb.Item>
				{flower.category && (
					<Breadcrumb.Item>{flower.category.categoryName}</Breadcrumb.Item>
				)}
				<Breadcrumb.Item>{flower.name}</Breadcrumb.Item>
			</Breadcrumb>

			<Button
				icon={<ArrowLeftOutlined />}
				onClick={() => navigate(-1)}
				className="mb-6"
			>
				Back
			</Button>

			<Row gutter={[48, 32]}>
				<Col xs={24} md={12}>
					<Card className="overflow-hidden">
						<Image
							src={flower.imageUrl}
							alt={flower.name}
							className="w-full h-auto object-cover"
							preview={{
								mask: 'Click to preview',
							}}
						/>
					</Card>
				</Col>

				<Col xs={24} md={12}>
					<div className="space-y-6">
						<div>
							<Title level={1} className="!mb-2">
								{flower.name}
							</Title>

							<div className="flex items-center space-x-4 mb-4">
								<Rate disabled defaultValue={4.5} />
								<Text className="text-gray-500">(24 reviews)</Text>
								{flower.category && (
									<Tag color="blue">{flower.category.categoryName}</Tag>
								)}
							</div>

							<Title level={2} className="text-red-600 !mb-4">
								${flower.price.toFixed(2)}
							</Title>

							<div className="flex items-center space-x-2 mb-4">
								<Text strong>Stock:</Text>
								<Text
									className={
										flower.stock > 0 ? 'text-green-600' : 'text-red-600'
									}
								>
									{flower.stock > 0
										? `${flower.stock} available`
										: 'Out of stock'}
								</Text>
							</div>

							<div className="flex items-center space-x-2 mb-6">
								<Text strong>Status:</Text>
								<Tag color={flower.isAvailable ? 'green' : 'red'}>
									{flower.isAvailable ? 'Available' : 'Unavailable'}
								</Tag>
							</div>
						</div>

						<div>
							<Title level={4}>Description</Title>
							<Paragraph className="text-gray-700">
								{flower.description}
							</Paragraph>
						</div>

						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<Text strong>Quantity:</Text>
								<InputNumber
									min={1}
									max={flower.stock}
									value={quantity}
									onChange={(value) => setQuantity(value || 1)}
									disabled={!flower.isAvailable || flower.stock === 0}
								/>
							</div>

							<div className="flex space-x-3">
								<Button
									type="primary"
									size="large"
									icon={<ShoppingCartOutlined />}
									onClick={handleAddToCart}
									loading={addingToCart}
									disabled={!flower.isAvailable || flower.stock === 0}
									className="flex-1"
								>
									Add to Cart
								</Button>

								<Button size="large" icon={<HeartOutlined />} className="px-4">
									Wishlist
								</Button>

								<Button
									size="large"
									icon={<ShareAltOutlined />}
									className="px-4"
								>
									Share
								</Button>
							</div>
						</div>

						<Card className="bg-gray-50">
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
				</Col>
			</Row>
		</div>
	);
};
