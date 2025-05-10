import DetailFlowerForm from '@/components/customer/flowers/DetaiFlowerForm';

interface PageProps {
	params: { id: string };
}
const DetailFlower = ({ params }: PageProps) => {
	return <DetailFlowerForm flowerId={params.id} />;
};

export default DetailFlower;
