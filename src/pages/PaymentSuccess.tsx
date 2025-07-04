import { cartService } from '../services/cartService';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const PaymentSuccess: React.FC = () => {
	const query = useQuery();
	const navigate = useNavigate();
	const orderId = query.get('orderId');
	const transactionNo = query.get('transactionNo');
	const amount = query.get('amount');

	// Clear cart after successful payment
	useEffect(() => {
		const clearCartAfterPayment = async () => {
			try {
				await cartService.clearCart();
				console.log('Cart cleared after successful payment');
			} catch (error) {
				console.warn('Failed to clear cart after payment:', error);
				// Don't show error to user as payment was successful
			}
		};

		// Only clear cart if we have order info (indicating successful payment)
		if (orderId && transactionNo) {
			clearCartAfterPayment();
		}
	}, [orderId, transactionNo]);

	return (
		<div
			style={{
				minHeight: '60vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: '88px', // Add padding top to prevent navbar overlap
			}}
		>
			<Card
				style={{
					maxWidth: 480,
					width: '100%',
					textAlign: 'center',
					padding: 32,
				}}
			>
				<Space direction="vertical" size="large" style={{ width: '100%' }}>
					<CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 64 }} />
					<Title level={2}>Payment Successful!</Title>
					<Text type="success">Thank you for shopping at Rose Shop.</Text>
					<div style={{ margin: '24px 0' }}>
						<Text strong>Order ID:</Text> <Text>{orderId}</Text>
						<br />
						<Text strong>Transaction No:</Text> <Text>{transactionNo}</Text>
						<br />
						<Text strong>Amount:</Text>{' '}
						<Text>
							{amount ? (Number(amount) / 100).toLocaleString('vi-VN') : 0} ₫
						</Text>
					</div>
					<Button type="primary" onClick={() => navigate('/orders')}>
						View My Orders
					</Button>
					<Button onClick={() => navigate('/')}>Back to Home</Button>
				</Space>
			</Card>
		</div>
	);
};

export default PaymentSuccess;
