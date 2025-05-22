'use client';

import {
	DollarOutlined,
	FlagOutlined,
	HomeOutlined,
	MinusOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import {
	Breadcrumb,
	Button,
	Card,
	Descriptions,
	Divider,
	InputNumber,
	Space,
	Typography,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface DetaiFlowerFormProps {
	flowerId: string | number;
}

const DetaiFlowerForm = ({ flowerId }: DetaiFlowerFormProps) => {
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		console.log(`Fetching details for flower ID: ${flowerId}`);
	}, [flowerId]);

	const handleIncrement = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecrement = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 lg:py-24">
			<Breadcrumb
				items={[
					{
						title: (
							<Link href="/">
								<HomeOutlined />
							</Link>
						),
					},
					{
						title: <Link href="/flowers">Flowers</Link>,
					},
					{
						title: <Link href="/flowers/spiritual">Spiritual Flowers</Link>,
					},
					{
						title: 'Lotus Flower',
					},
				]}
			/>
			<div className="flex flex-col lg:flex-row gap-10">
				<div className="flex-1">
					<Card variant="borderless" className="h-full">
						<div className="relative w-full h-96 lg:h-[500px]">
							<Image
								src="/images/picture/hoasen.jpg"
								alt="Lotus Flower"
								fill
								style={{ objectFit: 'cover' }}
								className="rounded-lg"
							/>
						</div>
					</Card>
				</div>

				<div className="flex-1 flex flex-col justify-between">
					<div>
						<Title level={2} style={{ color: '#644A07', marginBottom: '16px' }}>
							Lotus Flower
						</Title>
						<Title level={4} style={{ color: '#594100', marginBottom: '24px' }}>
							300,000 VND
						</Title>
						<Paragraph style={{ color: '#644A07', marginBottom: '16px' }}>
							A symbol of purity and enlightenment, the lotus flower blooms in
							murky waters yet remains untouched by impurities. It is perfect
							for home decoration or as a spiritual gift.
						</Paragraph>

						<Descriptions column={1} size="small">
							<Descriptions.Item label={<Text strong>Origin</Text>}>
								Da Lat
							</Descriptions.Item>
							<Descriptions.Item label={<Text strong>Category</Text>}>
								Spiritual Flowers
							</Descriptions.Item>
							<Descriptions.Item label={<Text strong>Shop</Text>}>
								Floral Delight
							</Descriptions.Item>
						</Descriptions>
					</div>

					<Divider />

					<div className="flex items-center space-x-4">
						<Text strong style={{ color: '#644A07' }}>
							Quantity:
						</Text>
						<Space>
							<Button icon={<MinusOutlined />} onClick={handleDecrement} />
							<InputNumber
								min={1}
								value={quantity}
								onChange={(value) => setQuantity(Number(value))}
								controls={false}
								style={{ width: '60px' }}
							/>
							<Button icon={<PlusOutlined />} onClick={handleIncrement} />
						</Space>
					</div>

					<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
						<Button
							type="primary"
							size="large"
							icon={<ShoppingCartOutlined />}
							style={{ backgroundColor: '#FFDBDB', color: '#644A07' }}
						>
							Add to Cart
						</Button>
						<Button
							type="primary"
							size="large"
							icon={<DollarOutlined />}
							style={{ backgroundColor: '#FFC6C6', color: '#644A07' }}
						>
							Buy Now
						</Button>
					</div>

					<div className="mt-8">
						<Button
							icon={<FlagOutlined />}
							style={{ color: '#644A07', borderColor: '#644A07' }}
						>
							Report to Admin
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetaiFlowerForm;
