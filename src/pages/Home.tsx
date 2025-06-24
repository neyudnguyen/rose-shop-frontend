import { FlowerCard } from '../components/FlowerCard';
import apiClient from '../services/api';
import type { Category, Flower } from '../types';
import { ArrowRightOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Alert, Button, Carousel, Col, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export const Home: React.FC = () => {
	const [popularCategories, setPopularCategories] = useState<Category[]>([]);
	const [featuredFlowers, setFeaturedFlowers] = useState<Flower[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoriesResponse, flowersResponse] = await Promise.all([
					apiClient.get('/categories/top-popular'),
					apiClient.get('/flowers?limit=8'),
				]);

				setPopularCategories(categoriesResponse.data.data || []);
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
			// You might want to show a success message here
		} catch (err) {
			console.error('Error adding to cart:', err);
			// You might want to show an error message here
		}
	};

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
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative">
				<Carousel autoplay autoplaySpeed={4000} effect="fade" className="h-96">
					<div>
						<div
							className="h-96 bg-cover bg-center flex items-center justify-center"
							style={{ backgroundImage: 'url(/images/picture/1.jpg)' }}
						>
							<div className="bg-black bg-opacity-50 text-white text-center p-8 rounded-lg">
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
					<div>
						<div
							className="h-96 bg-cover bg-center flex items-center justify-center"
							style={{ backgroundImage: 'url(/images/picture/2.jpg)' }}
						>
							<div className="bg-black bg-opacity-50 text-white text-center p-8 rounded-lg">
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
				</Carousel>
			</section>

			{/* Popular Categories */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<Title level={2}>Popular Categories</Title>
						<Text className="text-lg text-gray-600">
							Explore our most loved flower categories
						</Text>
					</div>

					<Row gutter={[24, 24]}>
						{popularCategories.map((category) => (
							<Col xs={24} sm={12} md={6} key={category.id}>
								<Link to={`/flowers?category=${category.id}`}>
									<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
										<div
											className="h-48 bg-cover bg-center"
											style={{
												backgroundImage: `url(${category.imageUrl || '/images/picture/3.png'})`,
											}}
										></div>
										<div className="p-4 text-center">
											<Title level={4}>{category.name}</Title>
											<Text className="text-gray-600">
												{category.description}
											</Text>
										</div>
									</div>
								</Link>
							</Col>
						))}
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

			{/* Features Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4">
					<Row gutter={[32, 32]}>
						<Col xs={24} md={8}>
							<div className="text-center">
								<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<ShoppingOutlined className="text-2xl text-blue-600" />
								</div>
								<Title level={4}>Fresh Quality</Title>
								<Text className="text-gray-600">
									We ensure all our flowers are fresh and of the highest quality
								</Text>
							</div>
						</Col>
						<Col xs={24} md={8}>
							<div className="text-center">
								<div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<ShoppingOutlined className="text-2xl text-green-600" />
								</div>
								<Title level={4}>Fast Delivery</Title>
								<Text className="text-gray-600">
									Same day delivery available for orders placed before 2 PM
								</Text>
							</div>
						</Col>
						<Col xs={24} md={8}>
							<div className="text-center">
								<div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
									<ShoppingOutlined className="text-2xl text-purple-600" />
								</div>
								<Title level={4}>Expert Arrangement</Title>
								<Text className="text-gray-600">
									Our professional florists create beautiful arrangements
								</Text>
							</div>
						</Col>
					</Row>
				</div>
			</section>
		</div>
	);
};
