import { FlowerCard } from '../components/FlowerCard';
import { COLORS } from '../constants/colors';
import apiClient from '../services/api';
import type { Flower } from '../types';
import {
	ArrowRightOutlined,
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

const hotFlowers = [
	{
		name: 'Lotus Flower',
		image: '/images/picture/hoasen.jpg',
		category: 'Traditional',
	},
	{
		name: 'Tulip',
		image: '/images/picture/tulip.jpg',
		category: 'Spring',
	},
	{
		name: 'Wedding Flower',
		image: '/images/picture/weddingflower.jpg',
		category: 'Wedding',
	},
	{
		name: 'Sunflower',
		image: '/images/picture/hoahuongduong.jpg',
		category: 'Summer',
	},
	{
		name: 'Decorative Flower',
		image: '/images/picture/hoacanh.png',
		category: 'Decorative',
	},
	{
		name: 'Rose',
		image: '/images/picture/hoa4.jpg',
		category: 'Classic',
	},
	{
		name: 'Peony',
		image: '/images/picture/peony.jpg',
		category: 'Elegant',
	},
	{
		name: 'Hydrangea',
		image: '/images/picture/hydrangea.jpg',
		category: 'Garden',
	},
];

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
	const [featuredFlowers, setFeaturedFlowers] = useState<Flower[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const flowersResponse = await apiClient.get('/flowers?limit=8');
				setFeaturedFlowers(flowersResponse.data.data || []);
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
			await apiClient.post('/cart/add', { flowerId, quantity: 1 });
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
					<Row gutter={[24, 24]}>
						{hotFlowers.map((flower, index) => (
							<Col key={index} xs={12} sm={8} lg={6}>
								<Card
									className="rounded-lg hover:shadow-xl transition-shadow h-full"
									cover={
										<div className="relative h-48 w-full overflow-hidden">
											<img
												src={flower.image}
												alt={flower.name}
												className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
											/>
										</div>
									}
									styles={{ body: { padding: '16px' } }}
								>
									<Title level={5} className="text-center font-semibold mb-2">
										{flower.name}
									</Title>
									<Text className="text-center text-gray-500 block mb-3">
										{flower.category}
									</Text>
									<Button
										type="primary"
										className="w-full border-none rounded-full"
									>
										View Details
									</Button>
								</Card>
							</Col>
						))}
					</Row>
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

			{/* Featured Flowers */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<Title level={2}>Featured Flowers</Title>
						<Text className="text-lg text-gray-600">
							Handpicked flowers just for you
						</Text>
					</div>

					<Row gutter={[24, 24]}>
						{featuredFlowers.map((flower) => (
							<Col xs={24} sm={12} md={8} lg={6} key={flower.id}>
								<FlowerCard flower={flower} onAddToCart={handleAddToCart} />
							</Col>
						))}
					</Row>

					<div className="text-center mt-8">
						<Link to="/flowers">
							<Button type="primary" size="large" icon={<ArrowRightOutlined />}>
								View All Flowers
							</Button>
						</Link>
					</div>
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
