import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import React from 'react';

import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import theme from '@/theme/themeConfig';

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body>
				<React.StrictMode>
					<ConfigProvider theme={theme}>
						<AuthProvider>
							<AntdRegistry>{children}</AntdRegistry>
						</AuthProvider>
					</ConfigProvider>
				</React.StrictMode>
			</body>
		</html>
	);
};
export default RootLayout;
