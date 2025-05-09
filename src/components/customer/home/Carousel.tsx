'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = () => {
	return (
		<div className="w-full max-w-[100vw] overflow-hidden">
			<Swiper
				modules={[Pagination, Autoplay]}
				spaceBetween={10}
				slidesPerView={1}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				pagination={true}
				loop
				className="w-full h-[60vh]"
			>
				<SwiperSlide className="w-full h-full relative">
					<Image
						src="/images/picture/1.jpg"
						alt="Hoa hồng đẹp"
						fill
						priority
						className="object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide className="w-full h-full relative">
					<Image
						src="/images/picture/2.jpg"
						alt="Hoa cánh tím"
						fill
						priority
						className="object-cover"
					/>
				</SwiperSlide>
				<SwiperSlide className="w-full h-full relative">
					<Image
						src="/images/picture/3.png"
						alt="Hoa năm sách"
						fill
						priority
						className="object-cover"
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Carousel;
