import type { Flower } from '../types';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Rate, Tag, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;
const { Meta } = Card;

interface FlowerCardProps {
	flower: Flower;
	onAddToCart?: (flowerId: string) => void;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({
	flower,
	onAddToCart,
}) => {
	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (onAddToCart) {
			onAddToCart(flower.flowerId?.toString() || flower.id || '');
		}
	};

	// Normalize flower data to handle different property names
	const flowerName = flower.flowerName || flower.name || '';
	const flowerDescription =
		flower.flowerDescription || flower.description || '';
	const flowerPrice = flower.price || 0;
	const flowerImage = flower.imageUrl || '';
	const flowerStock = flower.availableQuantity ?? flower.stock ?? 0;
	const isAvailable = flower.status === 'active' && flowerStock > 0;
	const flowerId = flower.flowerId || parseInt(flower.id || '0');

	return (
		<Card
			hoverable
			className="h-full"
			cover={
				<div className="relative overflow-hidden h-64">
					<img
						alt={flowerName}
						src={flowerImage}
						className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src = '/images/picture/hoa4.jpg'; // Use existing flower image as fallback
						}}
					/>
					{!isAvailable && (
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
							<Tag color="red">Out of Stock</Tag>
						</div>
					)}
				</div>
			}
			actions={[
				<Link to={`/flowers/${flowerId}`} key="view">
					<Button type="text" icon={<EyeOutlined />}>
						View Details
					</Button>
				</Link>,
				<Button
					key="cart"
					type="text"
					icon={<ShoppingCartOutlined />}
					onClick={handleAddToCart}
					disabled={!isAvailable}
				>
					Add to Cart
				</Button>,
			]}
		>
			<Meta
				title={
					<Title level={4} className="!mb-2 line-clamp-2">
						{flowerName}
					</Title>
				}
				description={
					<div className="space-y-2">
						<Text className="text-gray-600 line-clamp-2">
							{flowerDescription}
						</Text>
						<div className="flex items-center justify-between">
							<Text strong className="text-lg text-red-600">
								${flowerPrice.toFixed(2)}
							</Text>
							<Text type="secondary">Stock: {flowerStock}</Text>
						</div>
						<div className="flex items-center justify-between">
							<Rate disabled defaultValue={4.5} className="text-sm" />
							{flower.categoryName && (
								<Tag color="blue">{flower.categoryName}</Tag>
							)}
						</div>
					</div>
				}
			/>
		</Card>
	);
};
