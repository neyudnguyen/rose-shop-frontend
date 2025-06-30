import { FlowerCard } from '../components/FlowerCard';
import { COLORS } from '../constants/colors';
import { cartService } from '../services/cartService';
import { flowerService } from '../services/flowerService';
import type { Flower } from '../types';
import {
	SafetyCertificateOutlined,
	ShoppingOutlined,
	StarOutlined,
	TruckOutlined,
} from '@ant-design/icons';
import {
	Alert,
	Button,
	Card,
	Carousel,
	Col,
	Row,
	Spin,
	Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const features = [
	{
		icon: <TruckOutlined style={{ fontSize: 48, color: COLORS.primary }} />,
		title: 'Fast Delivery',
		description:
			'Extremely fast shipping times and available across all cities and provinces nationwide.',
	},
	{
		icon: (
			<SafetyCertificateOutlined
				style={{ fontSize: 48, color: COLORS.primary }}
			/>
		),
		title: 'Free Shipping',
		description: 'Free shipping for first-time buyers and V.I.P. members.',
	},
	{
		icon: <StarOutlined style={{ fontSize: 48, color: COLORS.primary }} />,
		title: 'High Quality',
		description:
			'Safe quality, no additives, suitable for newborns and pregnant women.',
	},
];

export const Home: React.FC = () => {
	const [hotFlowers, setHotFlowers] = useState<Flower[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const flowersResponse = await flowerService.getFlowers();
				// Get first 8 flowers for hot flowers section
				setHotFlowers(flowersResponse.slice(0, 8) || []);
			} catch (err) {
				setError('Failed to load data. Please try again later.');
				console.error('Error fetching home data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleAddToCart = async (flowerId: string) => {
		try {
			await cartService.addToCart(flowerId, 1);
		} catch (err) {
			console.error('Error adding to cart:', err);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
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
		<div className="min-h-screen">
			{/* Hero Carousel */}
			<section className="relative">
				<div className="w-full max-w-[100vw] overflow-hidden">
					{' '}
					<Carousel
						autoplay
						autoplaySpeed={3500}
						effect="fade"
						className="w-full h-[60vh]"
					>
						<div className="w-full h-full relative">
							{' '}
							<div
								className="h-[60vh] bg-cover bg-center relative"
								style={{
									backgroundImage: 'url(/images/picture/hoahongdep.jpg)',
								}}
							>
								<div className="absolute inset-0 bg-opacity-100 flex items-center justify-center">
									<div className="text-white text-center p-8">
										<Title level={1} className="text-white !mb-4">
											Beautiful Flowers for Every Occasion
										</Title>
										<Text className="text-lg mb-6 block">
											Discover our stunning collection of fresh flowers
										</Text>
										<Link to="/flowers">
											<Button
												type="primary"
												size="large"
												icon={<ShoppingOutlined />}
											>
												Shop Now
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full h-full relative">
							{' '}
							<div
								className="h-[60vh] bg-cover bg-center relative"
								style={{
									backgroundImage: 'url(/images/picture/weddingflower.jpg)',
								}}
							>
								<div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
									<div className="text-white text-center p-8">
										<Title level={1} className="text-white !mb-4">
											Wedding Flowers
										</Title>
										<Text className="text-lg mb-6 block">
											Make your special day even more beautiful
										</Text>
										<Link to="/flowers?category=wedding">
											<Button
												type="primary"
												size="large"
												icon={<ShoppingOutlined />}
											>
												Explore Wedding Collection
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full h-full relative">
							<div
								className="h-[60vh] bg-cover bg-center relative"
								style={{
									backgroundImage: 'url(/images/picture/hoahuongduong.jpg)',
								}}
							>
								<div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
									<div className="text-white text-center p-8">
										<Title level={1} className="text-white !mb-4">
											Premium Quality
										</Title>
										<Text className="text-lg mb-6 block">
											Handpicked flowers with guaranteed freshness
										</Text>
										<Link to="/flowers">
											<Button
												type="primary"
												size="large"
												icon={<ShoppingOutlined />}
											>
												Browse Collection
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</Carousel>
				</div>
			</section>

			{/* Hot Flowers Section */}
			<section className="py-12 px-4">
				<div className="max-w-7xl mx-auto">
					<Title level={2} className="text-center mb-8 font-bold text-3xl">
						HOT FLOWERS IN SHOP
					</Title>
					{loading ? (
						<div className="flex justify-center items-center min-h-64">
							<Spin size="large" />
						</div>
					) : (
						<Row gutter={[24, 24]}>
							{hotFlowers.map((flower) => (
								<Col key={flower.flowerId} xs={12} sm={8} lg={6}>
									<FlowerCard flower={flower} onAddToCart={handleAddToCart} />
								</Col>
							))}
						</Row>
					)}
				</div>
			</section>

			{/* About Section */}
			<section className="py-12 px-4 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<Row align="middle" gutter={[32, 24]}>
						<Col xs={24} md={12}>
							<img
								src="/images/picture/pic1.png"
								alt="About us"
								className="rounded-lg w-full h-auto object-cover"
							/>
						</Col>
						<Col xs={24} md={12}>
							<Title level={4} className="mb-2 font-bold">
								Our Story
							</Title>
							<Title level={3} className="mb-2 font-bold">
								PlatformFlower Studio
							</Title>
							<Paragraph className="text-sm mb-4">
								We are a modern local floral studio specializing in the design
								and delivery of unique bouquets. We collaborate directly with
								farms to ensure fresh flowers at all times. Our collection
								includes fresh bouquets, dried flower arrangements, houseplants,
								and luxury scented candles to create the perfect atmosphere.
							</Paragraph>
							<Button type="primary" className="mt-4 border-none">
								Learn More
							</Button>
						</Col>
					</Row>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<Title level={2} className="font-bold">
							Why Choose Our Products
						</Title>
					</div>
					<Row gutter={[32, 24]}>
						{features.map((feature, index) => (
							<Col xs={24} sm={24} md={8} key={index}>
								{' '}
								<Card
									className="text-center h-full hover:shadow-md transition-shadow border rounded-lg"
									styles={{
										body: {
											padding: '24px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										},
									}}
								>
									<div className="mb-4">{feature.icon}</div>
									<Title level={5} className="mb-2 font-semibold">
										{feature.title}
									</Title>
									<Paragraph className="text-center">
										{feature.description}
									</Paragraph>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</section>
		</div>
	);
};
