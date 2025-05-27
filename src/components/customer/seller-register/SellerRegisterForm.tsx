'use client';

import { 
  Button, 
  Form, 
  Input, 
  Typography, 
  Radio, 
  Card, 
  Divider, 
  message, 
  Alert,
  Row,
  Col
} from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShopOutlined, UserOutlined, HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface SellerFormValues {
  ShopName: string;
  Introduction: string;
  AddressSeller: string;
  Role: 'individual' | 'enterprise';
}

const SellerRegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: SellerFormValues) => {
    setLoading(true);
    try {
      console.log('Form values:', values);
      // Here you would typically send the data to your API
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     shop_name: values.ShopName,
      //     introduction: values.Introduction,
      //     address_seller: values.AddressSeller,
      //     role: values.Role
      //   })
      // });
      
      // if (!response.ok) throw new Error('Registration failed');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success('Seller registration successful! You can now start selling products.');
      form.resetFields();
      
      // Redirect to seller dashboard or home page
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Custom styles for form inputs
  const inputStyle = {
    border: '1.5px solid #d9d9d9',
    borderRadius: '8px',
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Row gutter={[32, 24]} className="items-stretch">
        {/* Left Column - Title and Info */}
        <Col xs={24} lg={8}>
          <div className="h-full flex flex-col">
            <Card className="shadow-lg rounded-xl overflow-hidden flex-grow">
              <div className="bg-gradient-to-r from-[#ecb7eb] to-[#d5426e] h-24 -mx-6 -mt-6 mb-6 flex items-center justify-center">
                <Title level={2} style={{ marginBottom: '0', textAlign: 'center', color: 'white' }}>
                  Seller Registration
                </Title>
              </div>
              
              <Alert
                message="Become a Seller"
                description="Join our marketplace and start selling your flowers to customers all around the country. Fill in the details below to get started."
                type="info"
                showIcon
                icon={<ShopOutlined />}
                className="mb-6"
                style={{ borderRadius: '8px', backgroundColor: '#FFF1F0', border: '1px solid #FFCCC7' }}
              />
              
              <div className="mt-6">
                <img 
                  src="/images/picture/seller-illustration.png" 
                  alt="Become a Seller" 
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/300x200?text=Become+a+Seller";
                  }}
                />
              </div>
            </Card>
          </div>
        </Col>
        
        {/* Right Column - Form */}
        <Col xs={24} lg={16}>
          <Card className="shadow-lg rounded-xl overflow-hidden h-full">
            <Form
              form={form}
              name="seller-register-form"
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark="optional"
              className="seller-register-form"
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="ShopName"
                    label={<span className="text-[#644A07] font-medium">Shop Name</span>}
                    rules={[
                      { required: true, message: 'Please input your shop name!' },
                      { min: 3, message: 'Shop name must be at least 3 characters' },
                      { max: 255, message: 'Shop name cannot exceed 255 characters' }
                    ]}
                  >
                    <Input 
                      prefix={<ShopOutlined className="text-[#644A07]" />} 
                      placeholder="Enter your shop name" 
                      size="large"
                      style={inputStyle}
                      className="rounded-lg shadow-sm hover:shadow transition-shadow"
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="AddressSeller"
                    label={<span className="text-[#644A07] font-medium">Shop Address</span>}
                    rules={[
                      { required: true, message: 'Please input your shop address!' },
                      { max: 255, message: 'Address cannot exceed 255 characters' }
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined className="text-[#644A07]" />}
                      placeholder="Enter your shop address"
                      size="large"
                      style={inputStyle}
                      className="rounded-lg shadow-sm hover:shadow transition-shadow"
                    />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="Role"
                label={<span className="text-[#644A07] font-medium">Seller Type</span>}
                rules={[{ required: true, message: 'Please select seller type!' }]}
                initialValue="individual"
              >
                <Radio.Group size="large" className="w-full">
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-[#644A07] hover:bg-[#f9f5e8] h-full`}>
                        <Radio value="individual" className="w-full">
                          <div className="ml-2">
                            <Text strong className="text-[#644A07]">Individual</Text>
                            <div className="text-gray-500 text-sm">For personal sellers</div>
                          </div>
                        </Radio>
                      </div>
                    </Col>
                    <Col xs={24} sm={12}>
                      <div className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-[#644A07] hover:bg-[#f9f5e8] h-full`}>
                        <Radio value="enterprise" className="w-full">
                          <div className="ml-2">
                            <Text strong className="text-[#644A07]">Enterprise</Text>
                            <div className="text-gray-500 text-sm">For businesses</div>
                          </div>
                        </Radio>
                      </div>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="Introduction"
                label={<span className="text-[#644A07] font-medium">Introduction</span>}
                rules={[
                  { required: true, message: 'Please input your introduction!' },
                  { max: 1000, message: 'Introduction cannot exceed 1000 characters' }
                ]}
              >
                <TextArea
                  placeholder="Tell us about your shop and products"
                  rows={4}
                  style={inputStyle}
                  className="rounded-lg shadow-sm hover:shadow transition-shadow"
                  showCount
                  maxLength={1000}
                />
              </Form.Item>

              <Form.Item className="mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<ShopOutlined />}
                  className="bg-gradient-to-r from-[#644A07] to-[#8B6914] hover:from-[#8B6914] hover:to-[#644A07] border-none rounded-full shadow-md w-full h-12 text-base"
                >
                  Register as Seller
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SellerRegisterForm;
