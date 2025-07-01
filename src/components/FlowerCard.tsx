import { useCart } from '../hooks/useCart';
import type { Flower } from '../types';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Tag, Typography, message } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Text, Title } = Typography;

interface FlowerCardProps {
	flower: Flower;
	onAddToCart?: (flowerId: string) => void;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({
	flower,
	onAddToCart,
}) => {
	const { incrementCartCount } = useCart();

	const handleAddToCart = async (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();

		try {
			if (onAddToCart) {
				await onAddToCart(flower.flowerId?.toString() || flower.id || '');
				// Update cart count in context
				incrementCartCount(1);
				message.success('Added to cart successfully!');
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
			message.error('Failed to add to cart');
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
			className="h-full shadow-sm border-0 rounded-xl overflow-hidden bg-white"
			cover={
				<div className="relative overflow-hidden h-60">
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
							<Tag color="red" className="text-white font-medium">
								Out of Stock
							</Tag>
						</div>
					)}
				</div>
			}
			styles={{
				body: {
					padding: '20px',
				},
			}}
		>
			<div className="space-y-3">
				<Title level={4} className="!mb-2 line-clamp-2 text-gray-800">
					{flowerName}
				</Title>

				<Text className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
					{flowerDescription}
				</Text>

				<div className="flex items-center justify-between pt-2">
					<div className="flex flex-col">
						<Text strong className="text-xl text-red-500 font-bold">
							{flowerPrice.toLocaleString('vi-VN')} ₫
						</Text>
						<Text type="secondary" className="text-xs">
							Stock: {flowerStock}
						</Text>
					</div>
					{flower.categoryName && (
						<Tag color="blue" className="rounded-full px-3">
							{flower.categoryName}
						</Tag>
					)}
				</div>

				<div className="flex gap-2 pt-3">
					<Link to={`/flowers/${flowerId}`} className="flex-1">
						<Button
							type="default"
							icon={<EyeOutlined />}
							className="w-full border-gray-300 hover:border-blue-500 hover:text-blue-500"
						>
							View
						</Button>
					</Link>
					<Button
						type="primary"
						icon={<ShoppingCartOutlined />}
						onClick={handleAddToCart}
						disabled={!isAvailable}
						className="flex-1 bg-gradient-to-r from-rose-400 to-pink-400 border-0 hover:from-rose-500 hover:to-pink-500"
					>
						Add to Cart
					</Button>
				</div>
			</div>
		</Card>
	);
};
