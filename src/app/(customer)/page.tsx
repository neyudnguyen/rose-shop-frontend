import AboutSection from '@/components/customer/home/AboutSection';
import Carousel from '@/components/customer/home/Carousel';
import HotFlowersSection from '@/components/customer/home/HotFlowersSection';
import WhySection from '@/components/customer/home/WhySection';

const Home = () => {
	return (
		<div className="mx-auto py-8">
			<Carousel />
			<WhySection />
			<AboutSection />
			<HotFlowersSection />
		</div>
	);
};

export default Home;
