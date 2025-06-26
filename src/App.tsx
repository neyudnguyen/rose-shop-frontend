import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AdminSidebar } from './components/AdminSidebar';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { Cart } from './pages/Cart';
import { FlowerDetail } from './pages/FlowerDetail';
import { FlowerList } from './pages/FlowerList';
// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLogin } from './pages/admin/AdminLogin';

const { Content } = Layout;

// Admin Layout Component
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<Layout style={{ minHeight: '100vh' }}>
		<AdminSidebar />
		<Layout>
			<Content className="p-6 bg-gray-50">{children}</Content>
		</Layout>
	</Layout>
);

// Main Layout Component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<Layout style={{ minHeight: '100vh' }}>
		<Navbar />
		<Content style={{ flex: 1 }}>{children}</Content>
		<Footer />
	</Layout>
);

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ff6b6b',
					borderRadius: 8,
				},
			}}
		>
			<AuthProvider>
				<Router>
					<Routes>
						{/* Public Routes */}
						<Route path="/login" element={<Login />} />
						<Route path="/admin/login" element={<AdminLogin />} />
						<Route path="/register" element={<Register />} />
						<Route path="/admin/login" element={<AdminLogin />} />
						{/* Main Layout Routes */}
						<Route
							path="/"
							element={
								<MainLayout>
									<Home />
								</MainLayout>
							}
						/>
						<Route
							path="/flowers"
							element={
								<MainLayout>
									<FlowerList />
								</MainLayout>
							}
						/>
						<Route
							path="/flowers/:id"
							element={
								<MainLayout>
									<FlowerDetail />
								</MainLayout>
							}
						/>
						{/* Protected Routes */}{' '}
						<Route
							path="/cart"
							element={
								<ProtectedRoute>
									<MainLayout>
										<Cart />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/checkout"
							element={
								<ProtectedRoute>
									<MainLayout>
										<div>Checkout Page - Coming Soon</div>
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orders"
							element={
								<ProtectedRoute>
									<MainLayout>
										<div>Orders Page - Coming Soon</div>
									</MainLayout>
								</ProtectedRoute>
							}
						/>{' '}
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<MainLayout>
										<Profile />
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/addresses"
							element={
								<ProtectedRoute>
									<MainLayout>
										<div>Address Book Page - Coming Soon</div>
									</MainLayout>
								</ProtectedRoute>
							}
						/>
						{/* Admin Routes */}
						<Route
							path="/admin/*"
							element={
								<ProtectedRoute adminOnly>
									<AdminLayout>
										<Routes>
											<Route path="/" element={<AdminDashboard />} />
											<Route
												path="/flowers"
												element={<div>Manage Flowers - Coming Soon</div>}
											/>
											<Route
												path="/categories"
												element={<div>Manage Categories - Coming Soon</div>}
											/>
											<Route
												path="/vouchers"
												element={<div>Manage Vouchers - Coming Soon</div>}
											/>
											<Route
												path="/vouchers/stats/:code"
												element={<div>Voucher Stats - Coming Soon</div>}
											/>
											<Route
												path="/users"
												element={<div>Manage Users - Coming Soon</div>}
											/>
										</Routes>
									</AdminLayout>
								</ProtectedRoute>
							}
						/>
						{/* 404 Route */}
						<Route
							path="*"
							element={
								<MainLayout>
									<div className="text-center py-16">
										<h1 className="text-4xl font-bold text-gray-800 mb-4">
											404 - Page Not Found
										</h1>
										<p className="text-gray-600">
											The page you're looking for doesn't exist.
										</p>
									</div>
								</MainLayout>
							}
						/>
					</Routes>
				</Router>
			</AuthProvider>
		</ConfigProvider>
	);
}

export default App;
