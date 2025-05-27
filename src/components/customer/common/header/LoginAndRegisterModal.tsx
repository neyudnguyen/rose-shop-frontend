'use client';

import { useRouter } from 'next/navigation';
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
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	const [isRegister, setIsRegister] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailRegex.test(email);
	};
	const validateForm = (): boolean => {
		setErrorMessage(null);

		if (isRegister) {
			// Check email format
			if (!validateEmail(formData.email)) {
				setErrorMessage('Please enter a valid email address');
				return false;
			}

			// Check password match
			if (formData.password !== formData.confirmPassword) {
				setErrorMessage('Passwords do not match');
				return false;
			}

			// Check password length
			if (formData.password.length < 6) {
				setErrorMessage('Password must be at least 6 characters');
				return false;
			}
		}

		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const url = isRegister ? `${backendUrl}/register` : `${backendUrl}/login`;
		console.log('URL:', url);

		const data = new FormData();
		data.append('username', formData.username);
		if (isRegister) {
			data.append('email', formData.email);
		}
		data.append('password', formData.password);

		try {
			setIsLoading(true);
			const response = await fetch(url, {
				method: 'POST',
				body: data,
			});

			if (!response.ok) {
				try {
					const errorJson = await response.json();
					setErrorMessage(
						errorJson.message || 'An error occurred with your request',
					);
				} catch {
					// If response is not JSON, use status text
					setErrorMessage(
						`Error: ${response.statusText || 'Something went wrong'}`,
					);
				}
				throw new Error(`HTTP Error! Status: ${response.status}`);
			}

			const result = await response.json();
			console.log('Result:', result);

			if (isRegister) {
				toggleForm();

				setFormData({
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				});

				setErrorMessage('Registration successful! Please log in.');

				setTimeout(() => {
					onClose();
					// window.location.href = '/';
					router.push('/');
				}, 500);
			}
		} catch (error) {
			console.error('Error during authentication:', error);
			if (!errorMessage) {
				setErrorMessage('An error occurred. Please try again later.');
			}
		} finally {
			setIsLoading(false);
		}
	};
	const toggleForm = () => {
		setIsRegister(!isRegister);
		setErrorMessage(null);
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
					)}{' '}
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
					)}{' '}
					{errorMessage && (
						<div className="px-3 py-2 text-sm text-white bg-red-500 rounded-md">
							{errorMessage}
						</div>
					)}
					<button
						type="submit"
						className="w-full px-4 py-2 bg-[#FF6B81] text-white rounded-md hover:bg-[#FF9EAA] hover:text-white transition-colors relative"
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
								<span>Loading...</span>
							</div>
						) : isRegister ? (
							'Register'
						) : (
							'Login'
						)}
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
