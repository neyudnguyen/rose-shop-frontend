'use client';

import { Image as AntImage, Button, Col, Row, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const AboutSection = () => {
	return (
		<section className="py-12 px-4 flex justify-center">
			<Row className="max-w-6xl mx-auto items-center" gutter={[32, 24]}>
				<Col xs={24} md={12}>
					<AntImage
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
						Kyiv LuxeBouquets
					</Title>
					<Paragraph className="text-sm mb-4">
						We are a modern local floral studio specializing in the design and
						delivery of unique bouquets. We collaborate directly with farms to
						ensure fresh flowers at all times. Our collection includes fresh
						bouquets, dried flower arrangements, houseplants, and luxury scented
						candles to create the perfect atmosphere.
					</Paragraph>
					<Button type="primary" className="mt-4 border-none">
						Learn More
					</Button>
				</Col>
			</Row>
		</section>
	);
};

export default AboutSection;
