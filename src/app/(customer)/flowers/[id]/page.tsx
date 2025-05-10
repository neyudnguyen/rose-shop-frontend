import DetailFlowerForm from '@/components/customer/flowers/DetaiFlowerForm';

type PageParams = Promise<{ id: string }>;

const DetailFlower = async ({ params }: { params: PageParams }) => {
	const { id } = await params;

	return <DetailFlowerForm flowerId={id} />;
};

export default DetailFlower;
