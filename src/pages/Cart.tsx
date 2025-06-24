import { cartService } from '../services/cartService';
import type { CartItem } from '../types';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Empty,
	Image,
	InputNumber,
	Popconfirm,
	Space,
	Spin,
	Table,
	Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export const Cart: React.FC = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [updating, setUpdating] = useState<string | null>(null);

	useEffect(() => {
		fetchCartItems();
	}, []);

	const fetchCartItems = async () => {
		try {
			const items = await cartService.getMyCart();
			setCartItems(items);
		} catch (err) {
			setError('Failed to load cart items. Please try again.');
			console.error('Error fetching cart:', err);
		} finally {
			setLoading(false);
		}
	};

	const handleQuantityChange = async (cartId: string, quantity: number) => {
		setUpdating(cartId);
		try {
			await cartService.updateCartItem(cartId, quantity);
			setCartItems((items) =>
				items.map((item) =>
					item.id === cartId ? { ...item, quantity } : item,
				),
			);
		} catch (err) {
			console.error('Error updating cart item:', err);
		} finally {
			setUpdating(null);
		}
	};

	const handleRemoveItem = async (cartId: string) => {
		try {
			await cartService.removeFromCart(cartId);
			setCartItems((items) => items.filter((item) => item.id !== cartId));
		} catch (err) {
			console.error('Error removing cart item:', err);
		}
	};

	const handleClearCart = async () => {
		try {
			await cartService.clearCart();
			setCartItems([]);
		} catch (err) {
			console.error('Error clearing cart:', err);
		}
	};

	const totalAmount = cartItems.reduce((sum, item) => {
		return sum + (item.flower?.price || 0) * item.quantity;
	}, 0);

	const columns: ColumnsType<CartItem> = [
		{
			title: 'Product',
			dataIndex: 'flower',
			key: 'flower',
			render: (flower) => (
				<div className="flex items-center space-x-3">
					<Image
						width={60}
						height={60}
						src={flower?.imageUrl}
						alt={flower?.name}
						className="rounded object-cover"
					/>
					<div>
						<Link to={`/flowers/${flower?.id}`}>
							<Text strong className="hover:text-blue-600">
								{flower?.name}
							</Text>
						</Link>
						<div className="text-gray-500 text-sm">
							${flower?.price?.toFixed(2)}
						</div>
					</div>
				</div>
			),
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (quantity, record) => (
				<InputNumber
					min={1}
					max={record.flower?.stock || 1}
					value={quantity}
					onChange={(value) => value && handleQuantityChange(record.id, value)}
					disabled={updating === record.id}
				/>
			),
		},
		{
			title: 'Subtotal',
			key: 'subtotal',
			render: (_, record) => (
				<Text strong>
					${((record.flower?.price || 0) * record.quantity).toFixed(2)}
				</Text>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Popconfirm
					title="Remove this item?"
					description="Are you sure you want to remove this item from your cart?"
					onConfirm={() => handleRemoveItem(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<Button type="text" danger icon={<DeleteOutlined />}>
						Remove
					</Button>
				</Popconfirm>
			),
		},
	];

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-96">
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-4">
				<Alert message="Error" description={error} type="error" showIcon />
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<Title level={2} className="mb-6">
				Shopping Cart
			</Title>

			{cartItems.length === 0 ? (
				<Card>
					<Empty
						image="/images/picture/4.png"
						description={
							<div>
								<Text className="text-gray-500 text-lg">
									Your cart is empty
								</Text>
								<div className="mt-4">
									<Link to="/">
										<Button type="primary" icon={<ShoppingOutlined />}>
											Continue Shopping
										</Button>
									</Link>
								</div>
							</div>
						}
					/>
				</Card>
			) : (
				<div className="space-y-6">
					<Card>
						<div className="flex justify-between items-center mb-4">
							<Text className="text-lg">
								{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in
								your cart
							</Text>
							<Popconfirm
								title="Clear all items?"
								description="Are you sure you want to clear your entire cart?"
								onConfirm={handleClearCart}
								okText="Yes"
								cancelText="No"
							>
								<Button danger>Clear Cart</Button>
							</Popconfirm>
						</div>

						<Table
							columns={columns}
							dataSource={cartItems}
							rowKey="id"
							pagination={false}
							scroll={{ x: 600 }}
						/>
					</Card>

					<Card>
						<div className="flex justify-between items-center">
							<Space direction="vertical" size="small">
								<Text className="text-lg">Order Summary</Text>
								<Text type="secondary">
									Total ({cartItems.length} item
									{cartItems.length !== 1 ? 's' : ''})
								</Text>
							</Space>
							<div className="text-right">
								<Title level={3} className="text-red-600 !mb-0">
									${totalAmount.toFixed(2)}
								</Title>
							</div>
						</div>

						<div className="mt-6 flex justify-end space-x-3">
							<Link to="/">
								<Button size="large">Continue Shopping</Button>
							</Link>
							<Link to="/checkout">
								<Button type="primary" size="large">
									Proceed to Checkout
								</Button>
							</Link>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
};
