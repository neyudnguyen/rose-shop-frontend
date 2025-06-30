import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import React from 'react';
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

	return (
		<div
			style={{
				minHeight: '60vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
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
