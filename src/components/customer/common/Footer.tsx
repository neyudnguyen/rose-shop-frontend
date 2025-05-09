import {
	FaFacebook,
	FaInstagram,
	FaPinterest,
	FaTwitter,
} from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
				{/* Contact Section */}
				<div className="footer-section">
					<h3 className="font-bold text-lg mb-4">Contact Us</h3>
					<p className="text-gray-400">Address</p>
					<p className="mb-2">FPT Quy Nhơn University</p>
					<p className="text-gray-400">Phone</p>
					<p className="mb-2">+380980099777</p>
					<p className="text-gray-400">General Enquiry</p>
					<p>Kiev.Florist.Studio@gmail.com</p>
				</div>

				{/* Follow Us Section */}
				<div className="footer-section">
					<h3 className="font-bold text-lg mb-4">Follow Us</h3>
					<div className="flex space-x-4">
						<a href="#" className="hover:text-pink-400 transition duration-300">
							<FaFacebook size={24} />
						</a>
						<a href="#" className="hover:text-pink-400 transition duration-300">
							<FaInstagram size={24} />
						</a>
						<a href="#" className="hover:text-pink-400 transition duration-300">
							<FaTwitter size={24} />
						</a>
						<a href="#" className="hover:text-pink-400 transition duration-300">
							<FaPinterest size={24} />
						</a>
					</div>
				</div>

				{/* Shop Section */}
				<div className="footer-section">
					<h3 className="font-bold text-lg mb-4">Shop</h3>
					<ul className="space-y-2">
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							All Products
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Fresh Flowers
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Dried Flowers
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Live Plants
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Designer Vases
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Aroma Candles
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Freshener Diffuser
						</li>
					</ul>
				</div>

				{/* Service Section */}
				<div className="footer-section">
					<h3 className="font-bold text-lg mb-4">Service</h3>
					<ul className="space-y-2">
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Flower Subscription
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Wedding & Event Decor
						</li>
					</ul>
				</div>

				{/* About Us Section */}
				<div className="footer-section">
					<h3 className="font-bold text-lg mb-4">About Us</h3>
					<ul className="space-y-2">
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Our Story
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Blog
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Shipping & Returns
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Terms & Conditions
						</li>
						<li className="hover:text-pink-400 cursor-pointer transition duration-300">
							Privacy Policy
						</li>
					</ul>
				</div>
			</div>

			{/* Copyright section */}
			<div className="container mx-auto text-center mt-8 pt-8 border-t border-gray-700">
				<p>&copy; {new Date().getFullYear()} Rose Shop. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
