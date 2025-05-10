'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiMenu, FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';

import HeaderUserComponent from '@/components/customer/common/header/HeaderUserComponent';

const navItems = [
	{ label: 'HOME', path: '/' },
	{ label: 'ROSES', path: '/flowers/rose' },
	{ label: 'WEDDING FLOWERS', path: '/flowers/wedding' },
	{ label: 'CONGRATULATORY FLOWERS', path: '/flowers/congratulatory' },
	{ label: 'BIRTHDAY FLOWERS', path: '/flowers/birthday' },
	{ label: 'HOLIDAY FLOWERS', path: '/flowers/holiday' },
	{ label: 'ORCHIDS', path: '/flowers/orchids' },
	{ label: 'TABLE FLOWERS', path: '/flowers/table' },
];

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMobileMenuOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<header className="bg-[#FFDBDB] shadow-md fixed w-full z-50">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				{/* Logo */}
				<div className="flex items-center ms:hidden">
					<Link href="/">
						<Image
							src="/images/picture/logo2.png"
							width={80}
							height={40}
							alt="Logo"
							className="cursor-pointer"
						/>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:block">
					<ul className="flex space-x-6 text-[#644A07] font-semibold text-sm items-center">
						{navItems.map(({ label, path }) => (
							<li key={label}>
								<Link href={path} className="hover:text-[#000000]">
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Icons */}
				<div className="flex items-center space-x-4 text-[#594100]">
					<HeaderUserComponent />
					<FiShoppingCart className="w-5 h-5 cursor-pointer" />
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center pl-3">
							<FiSearch className="w-4 h-4" />
						</span>
						<input
							type="text"
							placeholder="Search..."
							className="pl-9 pr-4 py-1 rounded border border-[#FFC6C6] bg-[#FFFFFF] text-sm text-[#644A07]"
						/>
					</div>
				</div>

				{/* Mobile Menu Toggle */}
				<div className="md:hidden text-[#594100] cursor-pointer mx-4">
					{isMobileMenuOpen ? (
						<FiX
							className="w-6 h-6"
							onClick={() => setIsMobileMenuOpen(false)}
						/>
					) : (
						<FiMenu
							className="w-6 h-6"
							onClick={() => setIsMobileMenuOpen(true)}
						/>
					)}
				</div>
			</div>

			{/* Mobile Navigation */}
			<div
				className={`md:hidden bg-[#FFC6C6] text-[#644A07] font-semibold text-sm transition-all duration-300 ease-in-out overflow-hidden ${
					isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
				}`}
			>
				<ul className="flex flex-col items-center space-y-4">
					{navItems.map(({ label, path }) => (
						<li key={label}>
							<Link
								href={path}
								className="hover:text-[#000000]"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default Header;
