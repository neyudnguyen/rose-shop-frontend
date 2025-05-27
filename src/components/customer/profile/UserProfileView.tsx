'use client';

import { EditOutlined } from '@ant-design/icons';
import { Card, Typography, Descriptions, Button, Divider, Tag } from 'antd';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

const UserProfileView = () => {
  const router = useRouter();
  
  // In a real app, you would fetch user data here
  const userData = {
    full_name: 'John Doe',
    address: '123 Flower Street, Da Lat',
    birth_date: '1990-01-01',
    sex: 'Male',
    points: 100,
    is_seller: false,
    created_date: '2023-01-01',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="shadow-md">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
          <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-300 rounded-full flex items-center justify-center text-white text-4xl">
            {userData.full_name.charAt(0)}
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <Title level={2} className="text-[#eb8ee9] mb-1">
                {userData.full_name}
              </Title>
              <Tag color="#644A07" className="text-base px-3 py-1 md:ml-4">
                {userData.points} Points
              </Tag>
            </div>
            <Text className="text-gray-500 block mb-4">
              Member since {new Date(userData.created_date).toLocaleDateString()}
            </Text>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => router.push('/profile/edit')}
                className="bg-[#644A07] hover:bg-[#8B6914]"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        <Divider />
        
        <Descriptions 
          title="User Information" 
          bordered 
          column={{ xs: 1, sm: 2 }}
          labelStyle={{ fontWeight: 'bold', color: '#644A07' }}
        >
          <Descriptions.Item label="Full Name">{userData.full_name}</Descriptions.Item>
          <Descriptions.Item label="Gender">{userData.sex}</Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {new Date(userData.birth_date).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {userData.address}
          </Descriptions.Item>
          <Descriptions.Item label="Seller Status">
            {userData.is_seller ? 'Seller' : 'Customer'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default UserProfileView;


