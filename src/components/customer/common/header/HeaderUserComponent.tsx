'use client';

import { useState } from 'react';
import { FiUser } from 'react-icons/fi';

import LoginAndRegisterModal from '@/components/customer/common/header/LoginAndRegisterModal';

const HeaderUserComponent = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsModalVisible(true)}
				className="px-4 py-2 text-[#594100] rounded-md"
			>
				<FiUser className="w-5 h-5 cursor-pointer" />
			</button>
			<LoginAndRegisterModal
				isVisible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			/>
		</>
	);
};

export default HeaderUserComponent;
