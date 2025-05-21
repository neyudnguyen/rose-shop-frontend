import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import React from 'react';

import '@/app/globals.css';
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
						<AntdRegistry>{children}</AntdRegistry>
					</ConfigProvider>
				</React.StrictMode>
			</body>
		</html>
	);
};
export default RootLayout;
