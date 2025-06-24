// Color palette for Rose Shop
export const COLORS = {
	// Primary colors
	primary: '#F759AB', // Main pink/rose color
	primaryDark: '#D03386', // Darker shade of primary
	primaryLight: '#FFB3D6', // Lighter shade of primary

	// Neutral colors
	background: '#F0EEED', // Main background (navbar, cards)
	backgroundDark: '#2D2D2D', // Dark background (footer)
	white: '#FFFFFF',
	black: '#000000',

	// Text colors
	textPrimary: '#2D2D2D', // Main text color
	textSecondary: '#B8B8B8', // Secondary text color
	textLight: '#FFFFFF', // Light text for dark backgrounds

	// Status colors
	success: '#52C41A',
	warning: '#FAAD14',
	error: '#FF4D4F',
	info: '#1890FF',

	// Gradients
	gradient: {
		primary: 'linear-gradient(135deg, #F759AB 0%, #FFB3D6 100%)',
		dark: 'linear-gradient(135deg, #2D2D2D 0%, #4A4A4A 100%)',
	},
};

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number): string => {
	return `${color}${Math.round(opacity * 255)
		.toString(16)
		.padStart(2, '0')}`;
};
