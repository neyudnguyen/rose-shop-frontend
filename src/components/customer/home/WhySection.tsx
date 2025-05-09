import { FaShippingFast, FaStar, FaTruck } from 'react-icons/fa';

const features = [
	{
		icon: <FaShippingFast size={48} className="text-primary" />,
		title: 'Fast Delivery',
		description:
			'Extremely fast shipping times and available across all cities and provinces nationwide.',
	},
	{
		icon: <FaTruck size={48} className="text-primary" />,
		title: 'Free Shipping',
		description: 'Free shipping for first-time buyers and V.I.P. members.',
	},
	{
		icon: <FaStar size={48} className="text-primary" />,
		title: 'High Quality',
		description:
			'Safe quality, no additives, suitable for newborns and pregnant women.',
	},
];

const WhySection = () => {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold">Why Choose Our Products</h2>
				</div>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{features.map((feature, index) => (
						<div
							key={index}
							className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition"
						>
							<div className="mb-4">{feature.icon}</div>
							<h5 className="text-xl font-semibold mb-2">{feature.title}</h5>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhySection;
