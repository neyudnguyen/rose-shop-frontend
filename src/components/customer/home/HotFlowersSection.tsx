import Image from 'next/image';

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
	<section className="py-12 px-4 bg-white">
		<h2 className="text-3xl font-bold text-center text-[#644A07] mb-8">
			HOT FLOWERS IN SHOP
		</h2>
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
			{products.map(({ src, alt, name }, index) => (
				<div
					key={index}
					className="bg-[#FFDBDB] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
				>
					<div className="relative w-full h-48">
						<Image
							src={src}
							alt={alt}
							layout="fill"
							objectFit="cover"
							className="rounded-t-lg"
							priority={index < 4} // Preload first 4 images
						/>
					</div>
					<h3 className="text-xl font-semibold text-[#644A07] mt-4 text-center">
						{name}
					</h3>
					<button className="mt-2 px-4 py-2 bg-[#FF6B81] text-white rounded-full w-full hover:bg-[#FF9EAA] hover:text-white transition-colors">
						View Details
					</button>
				</div>
			))}
		</div>
	</section>
);

export default HotFlowersSection;
