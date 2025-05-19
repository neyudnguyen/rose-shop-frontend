'use client';

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface LoginAndRegisterModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const LoginAndRegisterModal = ({
	isVisible,
	onClose,
}: LoginAndRegisterModalProps) => {
	const [isRegister, setIsRegister] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
	};

	const toggleForm = () => {
		setIsRegister(!isRegister);
		setFormData({
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
			<div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
				<button
					className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
					onClick={onClose}
				>
					<FaTimes size={20} />
				</button>
				<h2 className="text-2xl font-bold text-center text-[#644A07] mb-6">
					{isRegister ? 'Register' : 'Login'}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-[#594100] mb-1">
							Username
						</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
						/>
					</div>
					{isRegister && (
						<div>
							<label className="block text-sm font-medium text-[#594100] mb-1">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
							/>
						</div>
					)}
					<div>
						<label className="block text-sm font-medium text-[#594100] mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
						/>
					</div>
					{isRegister && (
						<div>
							<label className="block text-sm font-medium text-[#594100] mb-1">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-pink-200"
							/>
						</div>
					)}
					{!isRegister && (
						<div className="text-right">
							<button
								type="button"
								className="text-sm text-[#FF6B81] hover:underline"
								onClick={() => alert('Forgot password functionality')}
							>
								Forgot password?
							</button>
						</div>
					)}
					<button
						type="submit"
						className="w-full px-4 py-2 bg-[#FF6B81] text-white rounded-md hover:bg-[#FF9EAA] hover:text-white transition-colors"
					>
						{isRegister ? 'Register' : 'Login'}
					</button>
				</form>
				<div className="mt-4 text-center">
					<button
						type="button"
						className="text-sm text-[#FF6B81] hover:underline"
						onClick={toggleForm}
					>
						{isRegister
							? 'Already have an account? Login'
							: "Don't have an account? Register"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginAndRegisterModal;
