'use client';

import { Button, Result, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const NotFoundComponent = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<Result
				status="404"
				title={<Title level={2}>404 - Not Found</Title>}
				subTitle={
					<Paragraph style={{ fontSize: '16px' }}>
						The page you are looking for does not exist.
					</Paragraph>
				}
				extra={
					<Link href="/" passHref>
						<Button type="primary" size="large">
							Return Home
						</Button>
					</Link>
				}
			/>
		</div>
	);
};

export default NotFoundComponent;
