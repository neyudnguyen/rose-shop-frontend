import AboutSection from '@/components/customer/home/AboutSection';
import Carousel from '@/components/customer/home/Carousel';
import WhySection from '@/components/customer/home/WhySection';

const Home = () => {
	return (
		<div className="mx-auto py-8">
			<Carousel />
			<WhySection />
			<AboutSection />
		</div>
	);
};

export default Home;
