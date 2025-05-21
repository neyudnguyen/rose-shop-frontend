'use client';

import { Image as AntImage, Button, Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

const products = [
	{
		src: '/images/picture/hoasen.jpg',
		alt: 'Lotus Flower',
		name: 'Lotus Flower',
	},
	{ src: '/images/picture/tulip.jpg', alt: 'Tulip', name: 'Tulip' },
	{
		src: '/images/picture/weddingflower.jpg',
		alt: 'Wedding Flower',
		name: 'Wedding Flower',
	},
	{
		src: '/images/picture/hoahuongduong.jpg',
		alt: 'Sunflower',
		name: 'Sunflower',
	},
	{
		src: '/images/picture/hoacanh.png',
		alt: 'Decorative Flower',
		name: 'Decorative Flower',
	},
	{ src: '/images/picture/hoa4.jpg', alt: 'Rose', name: 'Rose' },
	{ src: '/images/picture/peony.jpg', alt: 'Peony', name: 'Peony' },
	{ src: '/images/picture/hydrangea.jpg', alt: 'Hydrangea', name: 'Hydrangea' },
];

const HotFlowersSection = () => (
	<section className="py-12 px-4">
		<Title level={2} className="text-center mb-8 font-bold text-3xl">
			HOT FLOWERS IN SHOP
		</Title>
		<Row gutter={[24, 24]}>
			{products.map(({ src, alt, name }, index) => (
				<Col key={index} xs={12} sm={8} lg={6}>
					<Card
						className="rounded-lg hover:shadow-xl transition-shadow h-full"
						cover={
							<div className="relative h-48 w-full overflow-hidden">
								<AntImage
									src={src}
									alt={alt}
									preview={true}
									height="100%"
									width="100%"
									style={{ objectFit: 'cover' }}
								/>
							</div>
						}
						variant={'outlined'}
						styles={{ body: { padding: '16px' } }}
					>
						<Title level={5} className="text-center font-semibold">
							{name}
						</Title>
						<Button
							type="primary"
							className="mt-2 w-full border-none rounded-full"
						>
							View Details
						</Button>
					</Card>
				</Col>
			))}
		</Row>
	</section>
);

export default HotFlowersSection;
