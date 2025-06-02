'use client';

import {
	DeleteOutlined,
	MinusOutlined,
	PlusOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
import {
	Button,
	Empty,
	Image,
	InputNumber,
	Modal,
	Typography,
	message,
} from 'antd';
import React, { FC, useState } from 'react';

const { Title, Text } = Typography;

// Sample cart data based on your database structure
interface CartItem {
	cart_id: number;
	flower_id: number;
	flower_name: string;
	price: number;
	quantity: number;
	image_url: string;
	seller_name: string;
}

interface CartModalProps {
	isVisible: boolean;
	onCancel: () => void;
}

const CartModal: FC<CartModalProps> = ({ isVisible, onCancel }) => {
	// Hard-coded cart data for demonstration
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			cart_id: 1,
			flower_id: 101,
			flower_name: 'Red Rose Bouquet',
			price: 49.99,
			quantity: 1,
			image_url: '/images/roses/r1.jpg',
			seller_name: 'Premium Flower Shop',
		},
		{
			cart_id: 2,
			flower_id: 102,
			flower_name: 'Tulip Arrangement',
			price: 39.99,
			quantity: 2,
			image_url: '/images/picture/tulip.jpg',
			seller_name: 'Garden Blooms',
		},
		{
			cart_id: 3,
			flower_id: 103,
			flower_name: 'Orchid Elegance',
			price: 59.99,
			quantity: 1,
			image_url: '/images/orchid/o5.jpg',
			seller_name: 'Exotic Flowers',
		},
	]);

	// Calculate total price
	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	// Update quantity
	const updateQuantity = (cartId: number, newQuantity: number | null) => {
		if (newQuantity === null || newQuantity < 1) return;

		setCartItems(
			cartItems.map((item) =>
				item.cart_id === cartId ? { ...item, quantity: newQuantity } : item,
			),
		);
	};

	// Remove item from cart
	const removeItem = (cartId: number) => {
		setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
		message.success('Item removed from cart');
	};

	// Proceed to checkout
	const handleCheckout = () => {
		message.info('Proceeding to checkout...');
		// In a real app, you would redirect to checkout page here
		onCancel();
	};

	return (
		<Modal
			title={
				<div className="flex items-center justify-center text-2xl font-bold py-3 text-pink-700">
					<ShoppingOutlined className="mr-2" />
					Your Shopping Cart
				</div>
			}
			open={isVisible}
			onCancel={onCancel}
			footer={null}
			width={800}
		>
			{cartItems.length === 0 ? (
				<Empty
					description="Your cart is empty"
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					className="py-12"
				/>
			) : (
				<>
					<div className="max-h-96 overflow-y-auto">
						{cartItems.map((item) => (
							<div
								key={item.cart_id}
								className="flex items-center py-4 border-b"
							>
								<div className="flex-shrink-0 w-24 h-24">
									<Image
										src={item.image_url}
										alt={item.flower_name}
										width={96}
										height={96}
										className="object-cover rounded"
										fallback="data:image/png;base64,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"
									/>
								</div>
								<div className="ml-4 flex-grow">
									<Title level={5} className="mb-0">
										{item.flower_name}
									</Title>
									<Text type="secondary" className="block">
										Seller: {item.seller_name}
									</Text>
									<div className="flex items-center mt-2">
										<Text strong className="text-pink-600 text-lg">
											${item.price.toFixed(2)}
										</Text>
										<div className="ml-6 flex items-center">
											<Button
												icon={<MinusOutlined />}
												onClick={() =>
													updateQuantity(item.cart_id, item.quantity - 1)
												}
												disabled={item.quantity <= 1}
												size="small"
											/>
											<InputNumber
												min={1}
												value={item.quantity}
												onChange={(value) =>
													updateQuantity(item.cart_id, value)
												}
												className="mx-2 w-16"
												size="small"
											/>
											<Button
												icon={<PlusOutlined />}
												onClick={() =>
													updateQuantity(item.cart_id, item.quantity + 1)
												}
												size="small"
											/>
										</div>
									</div>
								</div>
								<Button
									danger
									type="text"
									icon={<DeleteOutlined />}
									onClick={() => removeItem(item.cart_id)}
									className="ml-2"
								/>
							</div>
						))}
					</div>

					<div className="mt-6 bg-gray-50 p-4 rounded-lg">
						<div className="flex justify-between mb-2">
							<Text>Subtotal:</Text>
							<Text>${totalPrice.toFixed(2)}</Text>
						</div>
						<div className="flex justify-between mb-2">
							<Text>Shipping:</Text>
							<Text>$5.00</Text>
						</div>
						<div className="flex justify-between font-bold text-lg">
							<Text strong>Total:</Text>
							<Text strong className="text-pink-600">
								${(totalPrice + 5).toFixed(2)}
							</Text>
						</div>
					</div>

					<div className="mt-6 flex justify-between">
						<Button onClick={onCancel} size="large">
							Continue Shopping
						</Button>
						<Button
							type="primary"
							size="large"
							onClick={handleCheckout}
							className="bg-pink-600 hover:bg-pink-700"
						>
							Proceed to Checkout
						</Button>
					</div>
				</>
			)}
		</Modal>
	);
};

export default CartModal;
