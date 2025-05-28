'use client';

import { 
  ShoppingOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  CarOutlined,
  SearchOutlined,
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
  Modal,
  Descriptions,
  Row,
  Col
} from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Search } = Input;

interface Seller {
  seller_id: number;
  shop_name: string;
}

interface Address {
  address_id: number;
  address_detail: string;
}

interface OrderItem {
  order_detail_id: number;
  flower_id: number;
  flower_name: string;
  image_url: string;
  price: number;
  amount: number;
  status: 'pending' | 'accepted' | 'pending delivery' | 'delivered' | 'canceled';
  seller: Seller;
}

interface Order {
  order_id: number;
  created_date: string;
  total_price: number;
  status_payment: 'paid' | 'pending';
  delivery_method: string;
  payment_method: string;
  phone_number: string;
  address: Address;
  items: OrderItem[];
}

// Mock data for orders
const mockOrders: Order[] = [
  // ... (keep all the mock data the same)
];

const OrderTrackingPage = () => {
  const [searchText, setSearchText] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  // Helper function to get status color
  const getStatusColor = (status: OrderItem['status']) => {
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
  const getStatusText = (status: OrderItem['status']) => {
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
  const getCurrentStep = (status: OrderItem['status']) => {
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

  const showOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  const renderOrderItems = (items: OrderItem[]) => {
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

  const renderOrderCard = (order: Order) => {
    // Determine overall order status
    let overallStatus: OrderItem['status'] = 'pending';
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

  const tabItems = [
    {
      key: 'all',
      label: (
        <span>
          <ShoppingOutlined />
          All Orders ({allOrders.length})
        </span>
      ),
      children: allOrders.length > 0 ? allOrders.map(renderOrderCard) : renderEmptyState()
    },
    {
      key: 'pending',
      label: (
        <span>
          <ClockCircleOutlined />
          Pending ({pendingOrders.length})
        </span>
      ),
      children: pendingOrders.length > 0 ? pendingOrders.map(renderOrderCard) : renderEmptyState()
    },
    {
      key: 'shipping',
      label: (
        <span>
          <CarOutlined />
          Shipping ({shippingOrders.length})
        </span>
      ),
      children: shippingOrders.length > 0 ? shippingOrders.map(renderOrderCard) : renderEmptyState()
    },
    {
      key: 'delivered',
      label: (
        <span>
          <CheckCircleOutlined />
          Delivered ({deliveredOrders.length})
        </span>
      ),
      children: deliveredOrders.length > 0 ? deliveredOrders.map(renderOrderCard) : renderEmptyState()
    },
    {
      key: 'canceled',
      label: (
        <span>
          <CloseCircleOutlined />
          Canceled ({canceledOrders.length})
        </span>
      ),
      children: canceledOrders.length > 0 ? canceledOrders.map(renderOrderCard) : renderEmptyState()
    }
  ];

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
        items={tabItems}
      />

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
              {selectedOrder.items.map((item) => (
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
