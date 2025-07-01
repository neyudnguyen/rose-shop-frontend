import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import { App } from 'antd';
import React from 'react';

// Hook for admin components to use notifications
export const useAdminNotification = () => {
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

	// Specific notifications for CRUD operations
	const created = (entityName: string, entityId?: string | number) => {
		success(
			`${entityName} Created`,
			entityId
				? `${entityName} #${entityId} has been created successfully`
				: `${entityName} has been created successfully`,
		);
	};

	const updated = (entityName: string, entityId?: string | number) => {
		success(
			`${entityName} Updated`,
			entityId
				? `${entityName} #${entityId} has been updated successfully`
				: `${entityName} has been updated successfully`,
		);
	};

	const deleted = (entityName: string, entityId?: string | number) => {
		success(
			`${entityName} Deleted`,
			entityId
				? `${entityName} #${entityId} has been deleted successfully`
				: `${entityName} has been deleted successfully`,
		);
	};

	const operationFailed = (
		operation: string,
		entityName: string,
		errorMessage?: string,
	) => {
		error(
			`Failed to ${operation} ${entityName}`,
			errorMessage ||
				'Please try again or contact support if the problem persists',
		);
	};

	return {
		success,
		error,
		warning,
		info,
		created,
		updated,
		deleted,
		operationFailed,
	};
};
