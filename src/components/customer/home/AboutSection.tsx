import Image from 'next/image';

const AboutSection = () => {
	return (
		<section className="py-12 px-4 bg-[#FFDBDB]">
			<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
				<div className="w-full md:w-1/2">
					<Image
						src="/images/picture/pic1.png"
						alt="About us"
						width={600}
						height={400}
						className="rounded-lg w-full h-auto object-cover"
						priority
					/>
				</div>
				<div className="w-full md:w-1/2">
					<h2 className="text-xl font-bold text-[#594100] mb-2">Our Story</h2>
					<h3 className="text-2xl font-bold text-[#644A07] mb-2">
						Kyiv LuxeBouquets
					</h3>
					<p className="text-[#594100] text-sm mb-4">
						We are a modern local floral studio specializing in the design and
						delivery of unique bouquets. We collaborate directly with farms to
						ensure fresh flowers at all times. Our collection includes fresh
						bouquets, dried flower arrangements, houseplants, and luxury scented
						candles to create the perfect atmosphere.
					</p>
					<button className="mt-4 px-6 py-2 bg-[#644A07] text-[#FFC6C6] rounded hover:bg-[#FFDBDB] transition">
						Learn More
					</button>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
