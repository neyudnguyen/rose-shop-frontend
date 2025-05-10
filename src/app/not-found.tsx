import Link from 'next/link';

const NotFound = () => {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl font-bold text-[#FF6B81]">404 - Not Found</h1>
				<p className="mt-4 text-lg text-[#FF6B81]">
					The page you are looking for does not exist.
				</p>
				<Link
					href="/"
					className="mt-6 px-4 py-2 bg-[#FF6B81] text-white rounded hover:bg-[#FF9EAA] hover:text-white transition-colors"
				>
					Return Home
				</Link>
			</div>
		</>
	);
};

export default NotFound;
