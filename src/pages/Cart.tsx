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
			// Ensure items is always an array
			setCartItems(Array.isArray(items) ? items : []);
		} catch (err) {
			setError('Failed to load cart items. Please try again.');
			console.error('Error fetching cart:', err);
			setCartItems([]); // Set empty array on error
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

	const totalAmount = Array.isArray(cartItems)
		? cartItems.reduce((sum, item) => {
				return sum + (item.flower?.price || 0) * item.quantity;
			}, 0)
		: 0;

	const columns: ColumnsType<CartItem> = [
		{
			title: 'Product',
			dataIndex: 'flower',
			key: 'flower',
			render: (flower) => (
				<Space size={12}>
					<Image
						width={60}
						height={60}
						src={flower?.imageUrl}
						alt={flower?.flowerName}
						style={{ borderRadius: '8px', objectFit: 'cover' }}
					/>
					<div>
						<Link to={`/flowers/${flower?.flowerId}`}>
							<Text strong style={{ fontSize: '16px' }}>
								{flower?.flowerName}
							</Text>
						</Link>
						<div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
							{flower?.price?.toLocaleString('vi-VN')} VND
						</div>
					</div>
				</Space>
			),
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (quantity, record) => (
				<InputNumber
					min={1}
					max={record.flower?.availableQuantity || 1}
					value={quantity}
					onChange={(value) => value && handleQuantityChange(record.id, value)}
					disabled={updating === record.id}
					style={{ width: '80px' }}
				/>
			),
		},
		{
			title: 'Subtotal',
			key: 'subtotal',
			render: (_, record) => (
				<Text strong style={{ fontSize: '16px', color: '#52c41a' }}>
					{((record.flower?.price || 0) * record.quantity).toLocaleString(
						'vi-VN',
					)}{' '}
					VND
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
		<div
			style={{
				maxWidth: '1200px',
				margin: '0 auto',
				padding: '80px 16px 40px',
			}}
		>
			<Title level={2} style={{ marginBottom: '24px' }}>
				Shopping Cart
			</Title>

			{!Array.isArray(cartItems) || cartItems.length === 0 ? (
				<Card style={{ textAlign: 'center', padding: '60px 24px' }}>
					<Empty
						image="/images/picture/4.png"
						imageStyle={{ height: '160px' }}
						description={
							<div>
								<Text style={{ color: '#666', fontSize: '18px' }}>
									Your cart is empty
								</Text>
								<div style={{ marginTop: '16px' }}>
									<Link to="/">
										<Button
											type="primary"
											size="large"
											icon={<ShoppingOutlined />}
										>
											Continue Shopping
										</Button>
									</Link>
								</div>
							</div>
						}
					/>
				</Card>
			) : (
				<Space direction="vertical" size={24} style={{ width: '100%' }}>
					<Card>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: '16px',
							}}
						>
							<Text style={{ fontSize: '16px' }}>
								{Array.isArray(cartItems) ? cartItems.length : 0} item
								{(Array.isArray(cartItems) ? cartItems.length : 0) !== 1
									? 's'
									: ''}{' '}
								in your cart
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
							dataSource={Array.isArray(cartItems) ? cartItems : []}
							rowKey="id"
							pagination={false}
							scroll={{ x: 600 }}
						/>
					</Card>

					<Card>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Space direction="vertical" size="small">
								<Text style={{ fontSize: '18px', fontWeight: 'bold' }}>
									Order Summary
								</Text>
								<Text type="secondary">
									Total ({Array.isArray(cartItems) ? cartItems.length : 0} item
									{(Array.isArray(cartItems) ? cartItems.length : 0) !== 1
										? 's'
										: ''}
									)
								</Text>
							</Space>
							<div style={{ textAlign: 'right' }}>
								<Title level={3} style={{ color: '#52c41a', margin: 0 }}>
									{totalAmount.toLocaleString('vi-VN')} VND
								</Title>
							</div>
						</div>

						<div
							style={{
								marginTop: '24px',
								display: 'flex',
								justifyContent: 'flex-end',
								gap: '12px',
							}}
						>
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
				</Space>
			)}
		</div>
	);
};
