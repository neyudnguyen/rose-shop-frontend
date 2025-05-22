'use client';

import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

interface SellerFormValues {
	ShopName: string;
	Introduction: string;
	AddressSeller: string;
}

const SellerRegisterForm = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: SellerFormValues) => {
		setLoading(true);
		try {
			console.log('Form values:', values);
			// Here you would typically send the data to your API
			// await yourApiService.registerSeller(values);
			form.resetFields();
			// Show success message
		} catch (error) {
			console.error('Registration failed:', error);
			// Show error message
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>
				Seller Registration
			</Title>

			<Form
				form={form}
				name="seller-register-form"
				onFinish={handleSubmit}
				layout="vertical"
				requiredMark="optional"
				className="seller-register-form"
			>
				<Form.Item
					name="ShopName"
					label="Shop Name"
					rules={[{ required: true, message: 'Please input your shop name!' }]}
				>
					<Input placeholder="Enter your shop name" />
				</Form.Item>

				<Form.Item
					name="Introduction"
					label="Introduction"
					rules={[
						{ required: true, message: 'Please input your introduction!' },
					]}
				>
					<Input.TextArea
						placeholder="Tell us about your shop and products"
						rows={4}
					/>
				</Form.Item>

				<Form.Item
					name="AddressSeller"
					label="Address"
					rules={[
						{ required: true, message: 'Please input your shop address!' },
					]}
				>
					<Input placeholder="Enter your shop address" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						style={{
							width: '100%',
							marginTop: '12px',
						}}
					>
						Register as Seller
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default SellerRegisterForm;
