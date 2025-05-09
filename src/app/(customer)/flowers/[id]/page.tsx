import Image from 'next/image';
import {
	FaFlag,
	FaMinus,
	FaMoneyBillWave,
	FaPlus,
	FaShoppingCart,
} from 'react-icons/fa';

const DetailFlower = () => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-8 lg:py-24">
			<div className="flex flex-col lg:flex-row gap-10 pt-18">
				{/* Product Image */}
				<div className="flex-1">
					<div className="relative w-full h-96 lg:h-[500px]">
						<Image
							src="/images/picture/hoasen.jpg"
							alt="Lotus Flower"
							fill
							style={{ objectFit: 'cover' }}
							className="rounded-lg shadow-md"
						/>
					</div>
				</div>

				{/* Product Details */}
				<div className="flex-1 flex flex-col justify-between">
					<div>
						<h1 className="text-3xl font-bold text-[#644A07] mb-4">
							Lotus Flower
						</h1>
						<p className="text-xl text-[#594100] font-semibold mb-6">
							300,000 VND
						</p>
						<p className="text-[#644A07] mb-4">
							A symbol of purity and enlightenment, the lotus flower blooms in
							murky waters yet remains untouched by impurities. It is perfect
							for home decoration or as a spiritual gift.
						</p>
						<div className="text-sm text-[#594100] space-y-1">
							<p>
								<strong>Origin:</strong> Da Lat
							</p>
							<p>
								<strong>Category:</strong> Spiritual Flowers
							</p>
							<p>
								<strong>Shop:</strong> Floral Delight
							</p>
						</div>
					</div>

					{/* Quantity Selector */}
					<div className="mt-6 flex items-center space-x-4">
						<span className="text-[#644A07] font-medium">Quantity:</span>
						<div className="flex items-center border border-[#644A07] rounded">
							<button className="p-2 hover:bg-[#FFDBDB]">
								<FaMinus />
							</button>
							<input
								type="number"
								min="1"
								value="1"
								readOnly
								className="w-12 text-center border-l border-r border-[#644A07]"
							/>
							<button className="p-2 hover:bg-[#FFDBDB]">
								<FaPlus />
							</button>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
						<button className="flex items-center justify-center bg-[#FFDBDB] hover:bg-[#FFC6C6] text-[#644A07] px-6 py-3 rounded-md shadow-md transition">
							<FaShoppingCart className="mr-2" />
							Add to Cart
						</button>
						<button className="flex items-center justify-center bg-[#FFC6C6] hover:bg-[#FFDBDB] text-[#644A07] px-6 py-3 rounded-md shadow-md transition">
							<FaMoneyBillWave className="mr-2" />
							Buy Now
						</button>
					</div>

					{/* Report Button */}
					<div className="mt-8">
						<button className="flex items-center justify-center text-[#644A07] hover:text-[#594100] border border-[#644A07] hover:border-[#594100] px-4 py-2 rounded-md transition">
							<FaFlag className="mr-2" />
							Report to Admin
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailFlower;
