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
			onAddToCart(flower.id);
		}
	};

	return (
		<Card
			hoverable
			className="h-full"
			cover={
				<div className="relative overflow-hidden h-64">
					<img
						alt={flower.name}
						src={flower.imageUrl}
						className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
					/>
					{!flower.isAvailable && (
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
							<Tag color="red">Out of Stock</Tag>
						</div>
					)}
				</div>
			}
			actions={[
				<Link to={`/flowers/${flower.id}`} key="view">
					<Button type="text" icon={<EyeOutlined />}>
						View Details
					</Button>
				</Link>,
				<Button
					key="cart"
					type="text"
					icon={<ShoppingCartOutlined />}
					onClick={handleAddToCart}
					disabled={!flower.isAvailable || flower.stock === 0}
				>
					Add to Cart
				</Button>,
			]}
		>
			<Meta
				title={
					<Title level={4} className="!mb-2 line-clamp-2">
						{flower.name}
					</Title>
				}
				description={
					<div className="space-y-2">
						<Text className="text-gray-600 line-clamp-2">
							{flower.description}
						</Text>
						<div className="flex items-center justify-between">
							<Text strong className="text-lg text-red-600">
								${flower.price.toFixed(2)}
							</Text>
							<Text type="secondary">Stock: {flower.stock}</Text>
						</div>
						<div className="flex items-center justify-between">
							<Rate disabled defaultValue={4.5} className="text-sm" />
							{flower.category && (
								<Tag color="blue">{flower.category.categoryName}</Tag>
							)}
						</div>
					</div>
				}
			/>
		</Card>
	);
};
