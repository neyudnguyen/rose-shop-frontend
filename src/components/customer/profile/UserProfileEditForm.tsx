'use client';

import { UserOutlined, SaveOutlined, UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Select, Upload, message, Card, Avatar, Typography, Divider } from 'antd';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface UserProfileFormValues {
  full_name: string;
  address: string;
  birth_date: dayjs.Dayjs;
  sex: 'male' | 'female' | 'other';
  avatar?: any;
}

const UserProfileEditForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('/images/default-avatar.jpg');
  const router = useRouter();

  // In a real app, you would fetch user data here
  const initialValues: Partial<UserProfileFormValues> = {
    full_name: 'John Doe',
    address: '123 Flower Street, Da Lat',
    birth_date: dayjs('1990-01-01'),
    sex: 'male',
  };

  const handleSubmit = async (values: UserProfileFormValues) => {
    setLoading(true);
    try {
      console.log('Form values:', values);
      // Here you would send the data to your backend API
      // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values)
      // });
      
      // if (!response.ok) throw new Error('Failed to update profile');
      
      message.success('Profile updated successfully!');
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'done') {
      // In a real app, you would get the URL from the server response
      // setAvatarUrl(info.file.response.url);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  // Custom styles for form inputs
  const inputStyle = {
    border: '1.5px solid #d9d9d9',
    borderRadius: '8px',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#f7afdc] to-[#ee47e5] h-32 -mx-6 -mt-6 mb-6"></div>
        
        <div className="flex justify-center -mt-20 mb-8">
          <div className="text-center">
            <div className="bg-white p-2 rounded-full shadow-lg inline-block">
              <Avatar 
                size={120} 
                src={avatarUrl} 
                icon={<UserOutlined />} 
                className="border-4 border-white"
              />
            </div>
            <div className="mt-6">
              <Upload
                name="avatar"
                showUploadList={false}
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" // Replace with your actual upload endpoint
                onChange={handleAvatarChange}
              >
                <Button 
                  icon={<UploadOutlined />} 
                  className="rounded-full shadow-sm hover:shadow px-4"
                >
                  Change Avatar
                </Button>
              </Upload>
            </div>
          </div>
        </div>
        
        <Title level={2} className="text-center text-[#644A07] mb-6">
          Edit Profile
        </Title>
        
        <Divider className="my-6" />
        
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSubmit}
          className="px-2"
        >
          <Form.Item
            name="full_name"
            label={<span className="text-[#644A07] font-medium">Full Name</span>}
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input 
              size="large" 
              placeholder="Enter your full name" 
              className="rounded-lg shadow-sm hover:shadow transition-shadow"
              style={inputStyle}
            />
          </Form.Item>
          
          <Form.Item
            name="address"
            label={<span className="text-[#644A07] font-medium">Address</span>}
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input.TextArea 
              rows={2} 
              placeholder="Enter your address" 
              className="rounded-lg shadow-sm hover:shadow transition-shadow"
              style={inputStyle}
            />
          </Form.Item>
          
          <Form.Item
            name="birth_date"
            label={<span className="text-[#644A07] font-medium">Birth Date</span>}
            rules={[{ required: true, message: 'Please select your birth date' }]}
          >
            <DatePicker 
              size="large" 
              style={{ width: '100%', ...inputStyle }} 
              className="rounded-lg shadow-sm hover:shadow transition-shadow"
            />
          </Form.Item>
          
          <Form.Item
            name="sex"
            label={<span className="text-[#644A07] font-medium">Gender</span>}
            rules={[{ required: true, message: 'Please select your gender' }]}
          >
            <Select 
              size="large" 
              placeholder="Select your gender"
              className="rounded-lg shadow-sm hover:shadow transition-shadow"
              style={inputStyle}
              dropdownStyle={{ borderRadius: '8px' }}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          
          <Form.Item className="text-center mt-8">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SaveOutlined />}
              loading={loading}
              className="bg-gradient-to-r from-[#644A07] to-[#8B6914] hover:from-[#8B6914] hover:to-[#644A07] border-none rounded-full shadow-md px-6 mr-4"
            >
              Save Changes
            </Button>
            <Button 
              size="large" 
              onClick={() => router.push('/profile')}
              className="rounded-full shadow-sm hover:shadow px-6"
              icon={<ArrowLeftOutlined />}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfileEditForm;


