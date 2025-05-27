'use client';

import { 
  ShoppingOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  CarOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  ShopOutlined,
  EnvironmentOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { 
  Tabs, 
  Card, 
  Typography, 
  Tag, 
  Button, 
  Divider, 
  Steps, 
  Empty, 
  List, 
  Avatar, 
  Space, 
  Input,
  Tooltip,
  Modal,
  Descriptions,
  Row,
  Col
} from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Search } = Input;

// Mock data for orders
const mockOrders = [
  {
    order_id: 1001,
    created_date: '2023-06-15T10:30:00',
    total_price: 125.50,
    status_payment: 'paid',
    delivery_method: 'Standard Delivery',
    payment_method: 'Credit Card',
    phone_number: '0987654321',
    address: {
      address_id: 1,
      address_detail: '123 Flower Street, District 1, Ho Chi Minh City'
    },
    items: [
      {
        order_detail_id: 2001,
        flower_id: 101,
        flower_name: 'Red Rose Bouquet',
        image_url: '/images/picture/hoahong.jpg',
        price: 45.50,
        amount: 2,
        status: 'delivered',
        seller: {
          seller_id: 201,
          shop_name: 'Elegant Flowers'
        }
      },
      {
        order_detail_id: 2002,
        flower_id: 102,
        flower_name: 'Sunflower Arrangement',
        image_url: '/images/picture/hoahuongduong.jpg',
        price: 34.50,
        amount: 1,
        status: 'delivered',
        seller: {
          seller_id: 202,
          shop_name: 'Sunny Blooms'
        }
      }
    ]
  },
  {
    order_id: 1002,
    created_date: '2023-06-20T14:45:00',
    total_price: 89.90,
    status_payment: 'paid',
    delivery_method: 'Express Delivery',
    payment_method: 'PayPal',
    phone_number: '0987654322',
    address: {
      address_id: 2,
      address_detail: '456 Garden Road, District 2, Ho Chi Minh City'
    },
    items: [
      {
        order_detail_id: 2003,
        flower_id: 103,
        flower_name: 'Orchid Collection',
        image_url: '/images/picture/hoalan.jpg',
        price: 89.90,
        amount: 1,
        status: 'pending delivery',
        seller: {
          seller_id: 203,
          shop_name: 'Exotic Blooms'
        }
      }
    ]
  },
  {
    order_id: 1003,
    created_date: '2023-06-25T09:15:00',
    total_price: 67.25,
    status_payment: 'pending',
    delivery_method: 'Standard Delivery',
    payment_method: 'Cash on Delivery',
    phone_number: '0987654323',
    address: {
      address_id: 3,
      address_detail: '789 Blossom Avenue, District 3, Ho Chi Minh City'
    },
    items: [
      {
        order_detail_id: 2004,
        flower_id: 104,
        flower_name: 'Lily Bouquet',
        image_url: '/images/picture/hoaly.jpg',
        price: 42.25,
        amount: 1,
        status: 'pending',
        seller: {
          seller_id: 204,
          shop_name: 'Lily Paradise'
        }
      },
      {
        order_detail_id: 2005,
        flower_id: 105,
        flower_name: 'Daisy Arrangement',
        image_url: '/images/picture/hoacuc.jpg',
        price: 25.00,
        amount: 1,
        status: 'pending',
        seller: {
          seller_id: 205,
          shop_name: 'Daisy Chain'
        }
      }
    ]
  },
  {
    order_id: 1004,
    created_date: '2023-06-30T16:20:00',
    total_price: 110.75,
    status_payment: 'paid',
    delivery_method: 'Express Delivery',
    payment_method: 'Credit Card',
    phone_number: '0987654324',
    address: {
      address_id: 4,
      address_detail: '101 Tulip Street, District 4, Ho Chi Minh City'
    },
    items: [
      {
        order_detail_id: 2006,
        flower_id: 106,
        flower_name: 'Tulip Bouquet',
        image_url: '/images/picture/hoatulip.jpg',
        price: 55.75,
        amount: 1,
        status: 'canceled',
        seller: {
          seller_id: 206,
          shop_name: 'Tulip Time'
        }
      },
      {
        order_detail_id: 2007,
        flower_id: 107,
        flower_name: 'Carnation Mix',
        image_url: '/images/picture/hoacamchuong.jpg',
        price: 55.00,
        amount: 1,
        status: 'canceled',
        seller: {
          seller_id: 207,
          shop_name: 'Carnation Corner'
        }
      }
    ]
  }
];

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#faad14';
    case 'accepted':
      return '#1890ff';
    case 'pending delivery':
      return '#722ed1';
    case 'delivered':
      return '#52c41a';
    case 'canceled':
      return '#f5222d';
    default:
      return '#d9d9d9';
  }
};

// Helper function to get status text
const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'accepted':
      return 'Accepted';
    case 'pending delivery':
      return 'Out for Delivery';
    case 'delivered':
      return 'Delivered';
    case 'canceled':
      return 'Canceled';
    default:
      return 'Unknown';
  }
};

// Helper function to get current step based on status
const getCurrentStep = (status: string) => {
  switch (status) {
    case 'pending':
      return 0;
    case 'accepted':
      return 1;
    case 'pending delivery':
      return 2;
    case 'delivered':
      return 3;
    case 'canceled':
      return 4;
    default:
      return 0;
  }
};

const OrderTrackingPage = () => {
  const [searchText, setSearchText] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Filter orders based on search text
  const filteredOrders = mockOrders.filter(order => 
    order.order_id.toString().includes(searchText) ||
    order.items.some(item => 
      item.flower_name.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Group orders by status for tabs
  const allOrders = filteredOrders;
  const pendingOrders = filteredOrders.filter(order => 
    order.items.some(item => item.status === 'pending' || item.status === 'accepted')
  );
  const shippingOrders = filteredOrders.filter(order => 
    order.items.some(item => item.status === 'pending delivery')
  );
  const deliveredOrders = filteredOrders.filter(order => 
    order.items.every(item => item.status === 'delivered')
  );
  const canceledOrders = filteredOrders.filter(order => 
    order.items.every(item => item.status === 'canceled')
  );

  const showOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const renderOrderItems = (items: any[]) => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar 
                  shape="square" 
                  size={64} 
                  src={item.image_url}
                  style={{ borderRadius: '8px' }}
                />
              }
              title={
                <div className="flex justify-between">
                  <Text strong>{item.flower_name}</Text>
                  <Text>${item.price.toFixed(2)} x {item.amount}</Text>
                </div>
              }
              description={
                <div>
                  <div className="flex justify-between">
                    <Text type="secondary">Seller: {item.seller.shop_name}</Text>
                    <Text strong>${(item.price * item.amount).toFixed(2)}</Text>
                  </div>
                  <div className="mt-2">
                    <Tag color={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Tag>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    );
  };

  const renderOrderCard = (order: any) => {
    // Determine overall order status
    let overallStatus = 'pending';
    if (order.items.every(item => item.status === 'delivered')) {
      overallStatus = 'delivered';
    } else if (order.items.every(item => item.status === 'canceled')) {
      overallStatus = 'canceled';
    } else if (order.items.some(item => item.status === 'pending delivery')) {
      overallStatus = 'pending delivery';
    } else if (order.items.some(item => item.status === 'accepted')) {
      overallStatus = 'accepted';
    }

    return (
      <Card 
        key={order.order_id}
        className="mb-6 shadow-sm hover:shadow-md transition-shadow"
        style={{ borderRadius: '12px' }}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <Text strong className="text-lg">Order #{order.order_id}</Text>
            <div>
              <Text type="secondary">
                {new Date(order.created_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>
            </div>
          </div>
          <div className="text-right">
            <div>
              <Text strong className="text-lg text-[#644A07]">
                ${order.total_price.toFixed(2)}
              </Text>
            </div>
            <Tag color={getStatusColor(overallStatus)}>
              {getStatusText(overallStatus)}
            </Tag>
          </div>
        </div>

        <Divider className="my-3" />

        {renderOrderItems(order.items)}

        <Divider className="my-3" />

        <div className="flex justify-between items-center">
          <div>
            <Tag icon={<CarOutlined />} color="#644A07">
              {order.delivery_method}
            </Tag>
            <Tag color={order.status_payment === 'paid' ? 'green' : 'orange'}>
              {order.status_payment === 'paid' ? 'Paid' : 'Payment Pending'}
            </Tag>
          </div>
          <Button 
            type="primary" 
            onClick={() => showOrderDetail(order)}
            className="bg-[#644A07] hover:bg-[#8B6914] border-none"
          >
            View Details
          </Button>
        </div>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="No orders found"
      className="my-12"
    />
  );

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="mb-8">
        <Title level={2} className="text-[#644A07]">My Orders</Title>
        <Text className="text-gray-500">
          Track and manage all your flower orders
        </Text>
      </div>

      <div className="mb-6">
        <Search
          placeholder="Search by order number or product name"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-xl"
        />
      </div>

      <Tabs 
        defaultActiveKey="all" 
        className="order-tracking-tabs"
        tabBarStyle={{ marginBottom: '24px', borderBottom: '2px solid #f0f0f0' }}
      >
        <TabPane 
          tab={
            <span>
              <ShoppingOutlined />
              All Orders ({allOrders.length})
            </span>
          } 
          key="all"
        >
          {allOrders.length > 0 ? allOrders.map(renderOrderCard) : renderEmptyState()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <ClockCircleOutlined />
              Pending ({pendingOrders.length})
            </span>
          } 
          key="pending"
        >
          {pendingOrders.length > 0 ? pendingOrders.map(renderOrderCard) : renderEmptyState()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CarOutlined />
              Shipping ({shippingOrders.length})
            </span>
          } 
          key="shipping"
        >
          {shippingOrders.length > 0 ? shippingOrders.map(renderOrderCard) : renderEmptyState()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CheckCircleOutlined />
              Delivered ({deliveredOrders.length})
            </span>
          } 
          key="delivered"
        >
          {deliveredOrders.length > 0 ? deliveredOrders.map(renderOrderCard) : renderEmptyState()}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CloseCircleOutlined />
              Canceled ({canceledOrders.length})
            </span>
          } 
          key="canceled"
        >
          {canceledOrders.length > 0 ? canceledOrders.map(renderOrderCard) : renderEmptyState()}
        </TabPane>
      </Tabs>

      {/* Order Detail Modal */}
      <Modal
        title={selectedOrder ? `Order #${selectedOrder.order_id} Details` : 'Order Details'}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={12}>
                <Card title="Order Information" bordered={false}>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Order Date">
                      {new Date(selectedOrder.created_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Method">
                      {selectedOrder.payment_method}
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Status">
                      <Tag color={selectedOrder.status_payment === 'paid' ? 'green' : 'orange'}>
                        {selectedOrder.status_payment === 'paid' ? 'Paid' : 'Payment Pending'}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Delivery Method">
                      {selectedOrder.delivery_method}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Amount">
                      <Text strong className="text-[#644A07]">
                        ${selectedOrder.total_price.toFixed(2)}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              
              <Col xs={24} md={12}>
                <Card title="Shipping Information" bordered={false}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Space>
                        <EnvironmentOutlined />
                        <Text strong>Delivery Address:</Text>
                      </Space>
                      <div className="ml-6 mt-1">
                        {selectedOrder.address.address_detail}
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <Space>
                        <PhoneOutlined />
                        <Text strong>Contact Number:</Text>
                      </Space>
                      <div className="ml-6 mt-1">
                        {selectedOrder.phone_number}
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Card title="Order Items" className="mt-6">
              {renderOrderItems(selectedOrder.items)}
            </Card>

            <Card title="Order Timeline" className="mt-6">
              {selectedOrder.items.map((item: any) => (
                <div key={item.order_detail_id} className="mb-6">
                  <div className="flex items-center mb-3">
                    <Avatar 
                      shape="square" 
                      size={40} 
                      src={item.image_url}
                      style={{ borderRadius: '4px', marginRight: '12px' }}
                    />
                    <div>
                      <Text strong>{item.flower_name}</Text>
                      <div>
                        <Text type="secondary">
                          <ShopOutlined className="mr-1" /> 
                          {item.seller.shop_name}
                        </Text>
                      </div>
                    </div>
                  </div>
                  
                  <Steps 
                    current={getCurrentStep(item.status)} 
                    status={item.status === 'canceled' ? 'error' : 'process'}
                    size="small"
                    className="ml-2"
                  >
                    <Step title="Ordered" description="Order placed" />
                    <Step title="Accepted" description="Seller confirmed" />
                    <Step title="Shipping" description="Out for delivery" />
                    <Step title="Delivered" description="Order completed" />
                    {item.status === 'canceled' && (
                      <Step title="Canceled" description="Order canceled" status="error" />
                    )}
                  </Steps>
                </div>
              ))}
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderTrackingPage;