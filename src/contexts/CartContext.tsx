import { cartService } from '../services/cartService';
import React, { createContext, useEffect, useState } from 'react';

interface CartContextType {
	cartCount: number;
	refreshCartCount: () => Promise<void>;
	incrementCartCount: (quantity?: number) => void;
	decrementCartCount: (quantity?: number) => void;
	setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export { CartContext };

interface CartProviderProps {
	children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cartCount, setCartCount] = useState(0);

	const refreshCartCount = async () => {
		try {
			const count = await cartService.getCartCount();
			setCartCount(count || 0);
		} catch (error) {
			console.error('Error fetching cart count:', error);
			setCartCount(0);
		}
	};

	const incrementCartCount = (quantity: number = 1) => {
		setCartCount((prev) => prev + quantity);
	};

	const decrementCartCount = (quantity: number = 1) => {
		setCartCount((prev) => Math.max(0, prev - quantity));
	};

	// Load cart count on mount
	useEffect(() => {
		refreshCartCount();
	}, []);

	const value: CartContextType = {
		cartCount,
		refreshCartCount,
		incrementCartCount,
		decrementCartCount,
		setCartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
