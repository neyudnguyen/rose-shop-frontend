import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import React from 'react';

// Hook for user components to use notifications
export const useUserNotification = () => {
	const { notification } = App.useApp();

	const success = (message: string, description?: string) => {
		notification.success({
			message,
			description,
			placement: 'topRight',
			duration: 4,
			icon: React.createElement(CheckCircleOutlined, {
				style: { color: '#52c41a' },
			}),
			style: {
				borderLeft: '4px solid #52c41a',
			},
		});
	};

	const error = (message: string, description?: string) => {
		notification.error({
			message,
			description,
			placement: 'topRight',
			duration: 5,
			icon: React.createElement(CloseCircleOutlined, {
				style: { color: '#ff4d4f' },
			}),
			style: {
				borderLeft: '4px solid #ff4d4f',
			},
		});
	};

	const warning = (message: string, description?: string) => {
		notification.warning({
			message,
			description,
			placement: 'topRight',
			duration: 4,
			icon: React.createElement(ExclamationCircleOutlined, {
				style: { color: '#faad14' },
			}),
			style: {
				borderLeft: '4px solid #faad14',
			},
		});
	};

	const info = (message: string, description?: string) => {
		notification.info({
			message,
			description,
			placement: 'topRight',
			duration: 4,
			icon: React.createElement(InfoCircleOutlined, {
				style: { color: '#1890ff' },
			}),
			style: {
				borderLeft: '4px solid #1890ff',
			},
		});
	};

	// Specific notifications for user actions
	const loginSuccess = (userName?: string) => {
		success(
			'Login Successful',
			userName ? `Welcome back, ${userName}!` : 'Welcome back!',
		);
	};

	const registerSuccess = (userName?: string) => {
		success(
			'Registration Successful',
			userName ? `Welcome to Rose Shop, ${userName}!` : 'Welcome to Rose Shop!',
		);
	};

	const logoutSuccess = () => {
		info('Logged Out', 'You have been logged out successfully. See you again!');
	};

	const addToCartSuccess = (itemName?: string) => {
		success(
			'Added to Cart',
			itemName
				? `${itemName} has been added to your cart`
				: 'Item added to cart successfully',
		);
	};

	const orderSuccess = (orderId?: string | number) => {
		success(
			'Order Placed Successfully',
			orderId
				? `Your order #${orderId} has been placed successfully`
				: 'Your order has been placed successfully',
		);
	};

	const updateProfileSuccess = () => {
		success('Profile Updated', 'Your profile has been updated successfully');
	};

	const actionFailed = (action: string, reason?: string) => {
		error(
			`${action} Failed`,
			reason || 'Please try again or contact support if the problem persists',
		);
	};

	return {
		success,
		error,
		warning,
		info,
		loginSuccess,
		registerSuccess,
		logoutSuccess,
		addToCartSuccess,
		orderSuccess,
		updateProfileSuccess,
		actionFailed,
	};
};
