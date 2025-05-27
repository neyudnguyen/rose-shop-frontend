'use client';

import {
	DollarOutlined,
	FlagOutlined,
	HomeOutlined,
	MinusOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
	ExclamationCircleOutlined,
	CloseCircleOutlined,
} from '@ant-design/icons';
import {
	Breadcrumb,
	Button,
	Card,
	Descriptions,
	Divider,
	InputNumber,
	Space,
	Typography,
	Modal,
	Form,
	Input,
	Select,
	message,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface DetaiFlowerFormProps {
	flowerId: string | number;
}

interface ReportFormValues {
	report_reason: string;
	report_description: string;
}

const DetaiFlowerForm = ({ flowerId }: DetaiFlowerFormProps) => {
	const [quantity, setQuantity] = useState(1);
	const [reportModalVisible, setReportModalVisible] = useState(false);
	const [reportForm] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		console.log(`Fetching details for flower ID: ${flowerId}`);
	}, [flowerId]);

	const handleIncrement = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecrement = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const showReportModal = () => {
		setReportModalVisible(true);
	};

	const handleReportCancel = () => {
		setReportModalVisible(false);
		reportForm.resetFields();
	};

	const handleReportSubmit = async (values: ReportFormValues) => {
		setSubmitting(true);
		try {
			// Mock data - in a real app, you would get these from context/state
			const mockUserId = 1;
			const mockSellerId = 2;
			
			// In a real app, you would send this data to your API
			const reportData = {
				user_id: mockUserId,
				flower_id: Number(flowerId),
				seller_id: mockSellerId,
				report_reason: values.report_reason,
				report_description: values.report_description,
			};
			
			console.log('Report data to submit:', reportData);
			
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			message.success('Report submitted successfully');
			setReportModalVisible(false);
			reportForm.resetFields();
		} catch (error) {
			console.error('Error submitting report:', error);
			message.error('Failed to submit report. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	const reportReasons = [
		'Inappropriate content',
		'Misleading information',
		'Counterfeit product',
		'Prohibited item',
		'Price issues',
		'Other',
	];

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 lg:py-24">
			<Breadcrumb
				items={[
					{
						title: (
							<Link href="/">
								<HomeOutlined />
							</Link>
						),
					},
					{
						title: <Link href="/flowers">Flowers</Link>,
					},
					{
						title: <Link href="/flowers/spiritual">Spiritual Flowers</Link>,
					},
					{
						title: 'Lotus Flower',
					},
				]}
			/>
			<div className="flex flex-col lg:flex-row gap-10">
				<div className="flex-1">
					<Card variant="borderless" className="h-full">
						<div className="relative w-full h-96 lg:h-[500px]">
							<Image
								src="/images/picture/hoasen.jpg"
								alt="Lotus Flower"
								fill
								style={{ objectFit: 'cover' }}
								className="rounded-lg"
							/>
						</div>
					</Card>
				</div>

				<div className="flex-1 flex flex-col justify-between">
					<div>
						<Title level={2} style={{ color: '#644A07', marginBottom: '16px' }}>
							Lotus Flower
						</Title>
						<Title level={4} style={{ color: '#594100', marginBottom: '24px' }}>
							300,000 VND
						</Title>
						<Paragraph style={{ color: '#644A07', marginBottom: '16px' }}>
							A symbol of purity and enlightenment, the lotus flower blooms in
							murky waters yet remains untouched by impurities. It is perfect
							for home decoration or as a spiritual gift.
						</Paragraph>

						<Descriptions column={1} size="small">
							<Descriptions.Item label={<Text strong>Origin</Text>}>
								Da Lat
							</Descriptions.Item>
							<Descriptions.Item label={<Text strong>Category</Text>}>
								Spiritual Flowers
							</Descriptions.Item>
							<Descriptions.Item label={<Text strong>Shop</Text>}>
								Floral Delight
							</Descriptions.Item>
						</Descriptions>
					</div>

					<Divider />

					<div className="flex items-center space-x-4">
						<Text strong style={{ color: '#644A07' }}>
							Quantity:
						</Text>
						<Space>
							<Button icon={<MinusOutlined />} onClick={handleDecrement} />
							<InputNumber
								min={1}
								value={quantity}
								onChange={(value) => setQuantity(Number(value))}
								controls={false}
								style={{ width: '60px' }}
							/>
							<Button icon={<PlusOutlined />} onClick={handleIncrement} />
						</Space>
					</div>

					<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
						<Button
							type="primary"
							size="large"
							icon={<ShoppingCartOutlined />}
							style={{ backgroundColor: '#FFDBDB', color: '#644A07' }}
						>
							Add to Cart
						</Button>
						<Button
							type="primary"
							size="large"
							icon={<DollarOutlined />}
							style={{ backgroundColor: '#FFC6C6', color: '#644A07' }}
						>
							Buy Now
						</Button>
					</div>

					<div className="mt-8">
						<Button
							icon={<FlagOutlined />}
							style={{ color: '#644A07', borderColor: '#644A07' }}
							onClick={showReportModal}
						>
							Report to Admin
						</Button>
					</div>
				</div>
			</div>

			{/* Report Modal */}
			<Modal
				title={
					<div className="flex items-center text-[#644A07]">
						<ExclamationCircleOutlined className="mr-2" />
						Report this Product
					</div>
				}
				open={reportModalVisible}
				onCancel={handleReportCancel}
				footer={null}
				width={500}
				className="report-modal"
			>
				<Divider className="my-3" />
				<Form
					form={reportForm}
					layout="vertical"
					onFinish={handleReportSubmit}
				>
					<Form.Item
						name="report_reason"
						label={<span className="text-[#644A07] font-medium">Reason for Report</span>}
						rules={[{ required: true, message: 'Please select a reason' }]}
					>
						<Select 
							placeholder="Select a reason" 
							className="rounded-lg"
							style={{ width: '100%' }}
							dropdownStyle={{ borderRadius: '8px' }}
						>
							{reportReasons.map((reason) => (
								<Option key={reason} value={reason}>
									{reason}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="report_description"
						label={<span className="text-[#644A07] font-medium">Description</span>}
						rules={[
							{ required: true, message: 'Please provide details about the issue' },
							{ max: 255, message: 'Description cannot exceed 255 characters' }
						]}
					>
						<TextArea
							rows={4}
							placeholder="Please provide more details about the issue..."
							maxLength={255}
							showCount
							className="rounded-lg"
							style={{ border: '1.5px solid #d9d9d9', borderRadius: '8px' }}
						/>
					</Form.Item>

					<div className="flex justify-end space-x-3 mt-4">
						<Button 
							onClick={handleReportCancel}
							icon={<CloseCircleOutlined />}
							className="rounded-full"
						>
							Cancel
						</Button>
						<Button
							type="primary"
							htmlType="submit"
							loading={submitting}
							icon={<FlagOutlined />}
							className="bg-gradient-to-r from-[#644A07] to-[#8B6914] hover:from-[#8B6914] hover:to-[#644A07] border-none rounded-full"
						>
							Submit Report
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default DetaiFlowerForm;
