'use client';

import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { FaShippingFast, FaStar, FaTruck } from 'react-icons/fa';

const { Title, Paragraph } = Typography;

const features = [
	{
		icon: <FaShippingFast size={48} className="text-[#FF6B81]" />,
		title: 'Fast Delivery',
		description:
			'Extremely fast shipping times and available across all cities and provinces nationwide.',
	},
	{
		icon: <FaTruck size={48} className="text-[#FF6B81]" />,
		title: 'Free Shipping',
		description: 'Free shipping for first-time buyers and V.I.P. members.',
	},
	{
		icon: <FaStar size={48} className="text-[#FF6B81]" />,
		title: 'High Quality',
		description:
			'Safe quality, no additives, suitable for newborns and pregnant women.',
	},
];

const WhySection: React.FC = () => {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<Title level={2} className="font-bold">
						Why Choose Our Products
					</Title>
				</div>
				<Row gutter={[32, 24]}>
					{features.map((feature, index) => (
						<Col xs={24} sm={24} md={8} key={index}>
							<Card
								className="text-center h-full hover:shadow-md transition-shadow border rounded-lg"
								variant="outlined"
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
								<Paragraph className="text-gray-600">
									{feature.description}
								</Paragraph>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</section>
	);
};

export default WhySection;
